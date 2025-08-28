import { NextRequest, NextResponse } from 'next/server';
import { apiLogger as logger } from '@/lib/safe-logger';
import { legalCalculatorEngine } from '@/services/legal-calculators/calculator-engine';
import { z } from 'zod';

// GET /api/calculators/[type] - Get calculator form schema
export async function GET(request: NextRequest, { params }: { params: { type: string } }) {
  try {
    const calculatorType = params.type;

    const schemas = getCalculatorSchemas();
    const schema = schemas[calculatorType as keyof typeof schemas];

    if (!schema) {
      return NextResponse.json({ error: 'Calculator type not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      calculatorType,
      schema,
      metadata: getCalculatorMetadata(calculatorType),
    });
  } catch (error) {
    logger.error('Failed to get calculator schema:', error);
    return NextResponse.json({ error: 'Failed to get calculator schema' }, { status: 500 });
  }
}

// POST /api/calculators/[type] - Calculate results
export async function POST(request: NextRequest, { params }: { params: { type: string } }) {
  try {
    const calculatorType = params.type;
    const body = await request.json();

    let result;

    switch (calculatorType) {
      case 'personal-injury':
        result = await legalCalculatorEngine.calculatePersonalInjury(body);
        break;
      case 'immigration':
        result = await legalCalculatorEngine.calculateImmigration(body);
        break;
      case 'workers-compensation':
        result = await legalCalculatorEngine.calculateWorkersComp(body);
        break;
      case 'criminal-defense':
        result = await legalCalculatorEngine.calculateCriminalDefense(body);
        break;
      case 'family-law':
        result = await legalCalculatorEngine.calculateFamilyLaw(body);
        break;
      default:
        return NextResponse.json({ error: 'Unknown calculator type' }, { status: 400 });
    }

    // Store result for analytics
    await legalCalculatorEngine.storeCalculationResult(result);

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    logger.error('Calculator error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Invalid input data',
          details: error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: 'Calculation failed' }, { status: 500 });
  }
}

function getCalculatorSchemas() {
  return {
    'personal-injury': {
      medicalExpenses: { type: 'number', label: 'Medical Expenses ($)', required: true, min: 0 },
      lostWages: { type: 'number', label: 'Lost Wages ($)', required: true, min: 0 },
      painAndSuffering: {
        type: 'select',
        label: 'Pain & Suffering Level',
        required: true,
        options: [
          { value: 'minimal', label: 'Minimal - Minor discomfort' },
          { value: 'moderate', label: 'Moderate - Significant pain' },
          { value: 'severe', label: 'Severe - Substantial suffering' },
          { value: 'extreme', label: 'Extreme - Life-altering pain' },
        ],
      },
      injuryType: {
        type: 'select',
        label: 'Type of Injury',
        required: true,
        options: [
          { value: 'soft_tissue', label: 'Soft Tissue (sprains, strains)' },
          { value: 'fracture', label: 'Fracture/Broken Bone' },
          { value: 'head_injury', label: 'Head/Brain Injury' },
          { value: 'spinal_injury', label: 'Spinal Injury' },
          { value: 'burns', label: 'Burns' },
          { value: 'other', label: 'Other' },
        ],
      },
      accidentType: {
        type: 'select',
        label: 'Type of Accident',
        required: true,
        options: [
          { value: 'car_accident', label: 'Car Accident' },
          { value: 'slip_and_fall', label: 'Slip and Fall' },
          { value: 'workplace', label: 'Workplace Accident' },
          { value: 'medical_malpractice', label: 'Medical Malpractice' },
          { value: 'other', label: 'Other' },
        ],
      },
      duration: { type: 'number', label: 'Treatment Duration (weeks)', required: true, min: 0 },
      permanentDisability: { type: 'boolean', label: 'Permanent Disability?', required: false },
      futureExpenses: {
        type: 'number',
        label: 'Future Medical Expenses ($)',
        required: false,
        min: 0,
      },
      propertyDamage: { type: 'number', label: 'Property Damage ($)', required: false, min: 0 },
      faultPercentage: {
        type: 'range',
        label: 'Your Fault Percentage (%)',
        required: false,
        min: 0,
        max: 100,
        default: 0,
      },
    },

    immigration: {
      visaType: {
        type: 'select',
        label: 'Visa Type',
        required: true,
        options: [
          { value: 'family', label: 'Family-Based' },
          { value: 'employment', label: 'Employment-Based' },
          { value: 'asylum', label: 'Asylum' },
          { value: 'student', label: 'Student Visa' },
          { value: 'visitor', label: 'Visitor Visa' },
          { value: 'green_card', label: 'Green Card' },
        ],
      },
      countryOfBirth: { type: 'text', label: 'Country of Birth', required: true },
      relationshipToSponsor: {
        type: 'select',
        label: 'Relationship to Sponsor',
        required: false,
        options: [
          { value: 'spouse', label: 'Spouse' },
          { value: 'child', label: 'Child' },
          { value: 'parent', label: 'Parent' },
          { value: 'sibling', label: 'Sibling' },
          { value: 'other', label: 'Other Relative' },
          { value: 'none', label: 'No Sponsor' },
        ],
      },
      sponsorCitizenship: {
        type: 'select',
        label: 'Sponsor Status',
        required: false,
        options: [
          { value: 'us_citizen', label: 'U.S. Citizen' },
          { value: 'permanent_resident', label: 'Permanent Resident' },
          { value: 'none', label: 'No Sponsor' },
        ],
      },
      currentStatus: {
        type: 'select',
        label: 'Current Status',
        required: true,
        options: [
          { value: 'tourist', label: 'Tourist/Visitor' },
          { value: 'student', label: 'Student' },
          { value: 'work_visa', label: 'Work Visa' },
          { value: 'asylum_seeker', label: 'Asylum Seeker' },
          { value: 'undocumented', label: 'Undocumented' },
          { value: 'other', label: 'Other' },
        ],
      },
      criminalHistory: { type: 'boolean', label: 'Any Criminal History?', required: true },
      previousDenials: { type: 'boolean', label: 'Previous Visa Denials?', required: true },
      englishProficiency: {
        type: 'select',
        label: 'English Proficiency',
        required: true,
        options: [
          { value: 'fluent', label: 'Fluent' },
          { value: 'intermediate', label: 'Intermediate' },
          { value: 'basic', label: 'Basic' },
          { value: 'none', label: 'None' },
        ],
      },
      education: {
        type: 'select',
        label: 'Education Level',
        required: true,
        options: [
          { value: 'phd', label: 'PhD/Doctorate' },
          { value: 'masters', label: "Master's Degree" },
          { value: 'bachelors', label: "Bachelor's Degree" },
          { value: 'high_school', label: 'High School' },
          { value: 'less_than_high_school', label: 'Less than High School' },
        ],
      },
    },

    'workers-compensation': {
      injuryType: {
        type: 'select',
        label: 'Type of Disability',
        required: true,
        options: [
          { value: 'temporary_partial', label: 'Temporary Partial Disability' },
          { value: 'temporary_total', label: 'Temporary Total Disability' },
          { value: 'permanent_partial', label: 'Permanent Partial Disability' },
          { value: 'permanent_total', label: 'Permanent Total Disability' },
          { value: 'death', label: 'Death Benefits' },
        ],
      },
      weeklyWage: { type: 'number', label: 'Average Weekly Wage ($)', required: true, min: 0 },
      weeksDisabled: { type: 'number', label: 'Weeks Disabled', required: true, min: 0 },
      medicalExpenses: { type: 'number', label: 'Medical Expenses ($)', required: true, min: 0 },
      disabilityRating: {
        type: 'range',
        label: 'Disability Rating (%)',
        required: false,
        min: 0,
        max: 100,
      },
      dependents: { type: 'number', label: 'Number of Dependents', required: false, min: 0 },
      stateOfInjury: { type: 'text', label: 'State Where Injury Occurred', required: true },
      ageAtInjury: {
        type: 'number',
        label: 'Age at Time of Injury',
        required: true,
        min: 16,
        max: 100,
      },
      returnToWorkStatus: {
        type: 'select',
        label: 'Return to Work Status',
        required: true,
        options: [
          { value: 'full_duty', label: 'Returned to Full Duty' },
          { value: 'light_duty', label: 'Light Duty Only' },
          { value: 'cannot_return', label: 'Cannot Return to Work' },
          { value: 'unknown', label: 'Unknown' },
        ],
      },
    },

    'criminal-defense': {
      chargeType: {
        type: 'select',
        label: 'Charge Type',
        required: true,
        options: [
          { value: 'misdemeanor', label: 'Misdemeanor' },
          { value: 'felony', label: 'Felony' },
        ],
      },
      chargeClass: { type: 'text', label: 'Charge Class (A, B, C, etc.)', required: true },
      priorConvictions: { type: 'number', label: 'Prior Convictions', required: true, min: 0 },
      circumstances: {
        type: 'select',
        label: 'Aggravating/Mitigating Factors',
        required: true,
        options: [
          { value: 'aggravating', label: 'Aggravating Circumstances' },
          { value: 'neutral', label: 'Neutral' },
          { value: 'mitigating', label: 'Mitigating Circumstances' },
        ],
      },
      pleaType: {
        type: 'select',
        label: 'Anticipated Plea',
        required: true,
        options: [
          { value: 'guilty', label: 'Guilty' },
          { value: 'not_guilty', label: 'Not Guilty' },
          { value: 'no_contest', label: 'No Contest' },
        ],
      },
      cooperationLevel: {
        type: 'select',
        label: 'Cooperation with Authorities',
        required: true,
        options: [
          { value: 'full', label: 'Full Cooperation' },
          { value: 'partial', label: 'Partial Cooperation' },
          { value: 'none', label: 'No Cooperation' },
        ],
      },
      evidenceStrength: {
        type: 'select',
        label: 'Strength of Evidence',
        required: true,
        options: [
          { value: 'strong', label: 'Strong Against Defendant' },
          { value: 'moderate', label: 'Moderate' },
          { value: 'weak', label: 'Weak Against Defendant' },
        ],
      },
      publicDefender: { type: 'boolean', label: 'Using Public Defender?', required: true },
    },

    'family-law': {
      calculationType: {
        type: 'select',
        label: 'Calculation Type',
        required: true,
        options: [
          { value: 'child_support', label: 'Child Support' },
          { value: 'spousal_support', label: 'Spousal Support/Alimony' },
          { value: 'property_division', label: 'Property Division' },
        ],
      },
      grossIncome1: { type: 'number', label: 'Party 1 Gross Income ($)', required: true, min: 0 },
      grossIncome2: { type: 'number', label: 'Party 2 Gross Income ($)', required: true, min: 0 },
      childrenCount: { type: 'number', label: 'Number of Children', required: false, min: 0 },
      custodyArrangement: {
        type: 'select',
        label: 'Custody Arrangement',
        required: false,
        options: [
          { value: 'sole', label: 'Sole Custody' },
          { value: 'joint', label: 'Joint Custody' },
          { value: 'primary', label: 'Primary Custody' },
          { value: 'supervised', label: 'Supervised Visitation' },
        ],
      },
      marriageDuration: {
        type: 'number',
        label: 'Marriage Duration (years)',
        required: true,
        min: 0,
      },
      propertyValue: { type: 'number', label: 'Total Property Value ($)', required: false, min: 0 },
      debt: { type: 'number', label: 'Total Debt ($)', required: false, min: 0 },
      stateOfResidence: { type: 'text', label: 'State of Residence', required: true },
    },
  };
}

function getCalculatorMetadata(calculatorType: string) {
  const metadata = {
    'personal-injury': {
      title: 'Personal Injury Settlement Calculator',
      description: 'Estimate potential compensation for your personal injury case',
      disclaimer:
        'This calculator provides estimates only. Actual settlement amounts vary significantly based on specific case facts, jurisdiction, and many other factors.',
      practiceArea: 'Personal Injury',
      processingTime: '2-4 years typical',
    },
    immigration: {
      title: 'Immigration Case Assessment',
      description: 'Assess your immigration case timeline, costs, and success probability',
      disclaimer:
        'Immigration law is complex and constantly changing. This estimate is based on current processing times and typical cases.',
      practiceArea: 'Immigration',
      processingTime: '6 months - 10+ years',
    },
    'workers-compensation': {
      title: "Workers' Compensation Calculator",
      description: "Calculate potential workers' compensation benefits",
      disclaimer:
        "Workers' compensation benefits are governed by state law and individual case circumstances.",
      practiceArea: "Workers' Compensation",
      processingTime: '6 months - 2 years',
    },
    'criminal-defense': {
      title: 'Criminal Sentencing Estimator',
      description: 'Estimate potential sentences and costs for criminal charges',
      disclaimer:
        'Criminal sentencing involves many variables and judicial discretion. This estimate is based on general guidelines.',
      practiceArea: 'Criminal Defense',
      processingTime: '3 months - 2 years',
    },
    'family-law': {
      title: 'Family Law Calculator',
      description: 'Calculate child support, spousal support, and property division estimates',
      disclaimer: 'Family law calculations vary by jurisdiction and individual circumstances.',
      practiceArea: 'Family Law',
      processingTime: '6 months - 2 years',
    },
  };

  return metadata[calculatorType as keyof typeof metadata] || {};
}
