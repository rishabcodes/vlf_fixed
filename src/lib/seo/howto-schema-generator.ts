// HowTo schema generator for legal process guides
import { HowTo, WithContext, HowToStep, HowToSupply, MonetaryAmount } from 'schema-dts';

interface HowToGuideData {
  name: string;
  description: string;
  totalTime?: string; // ISO 8601 duration format (e.g., "PT30M" for 30 minutes)
  estimatedCost?: {
    value: string;
    currency: string;
  };
  supply?: Array<{
    name: string;
    description?: string;
  }>;
  tool?: Array<{
    name: string;
    description?: string;
  }>;
  steps: Array<{
    name: string;
    text: string;
    image?: string;
    url?: string;
    tip?: string;
    warning?: string;
  }>;
  image?: string;
  video?: {
    name: string;
    description: string;
    thumbnailUrl: string;
    uploadDate: string;
    duration: string;
  };
}

// Generate HowTo schema for legal processes
export function generateHowToSchema(data: HowToGuideData): WithContext<HowTo> {
  const schema: WithContext<HowTo> = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: data.name,
    description: data.description,
    totalTime: data.totalTime,
    estimatedCost: data.estimatedCost
      ? {
          '@type': 'MonetaryAmount',
          currency: data.estimatedCost.currency,
          value: data.estimatedCost.value,
        }
      : undefined,
    supply: data.supply?.map(item => ({
      '@type': 'HowToSupply' as const,
      name: item.name,
      description: item.description,
    })),
    tool: data.tool?.map(item => ({
      '@type': 'HowToTool',
      name: item.name,
      description: item.description,
    })),
    step: data.steps.map((step, index) => ({
      '@type': 'HowToStep' as const,
      name: step.name,
      text: step.text,
      position: index + 1,
      image: step.image,
      url: step.url,
    })),
    image: data.image,
    video: data.video
      ? {
          '@type': 'VideoObject',
          name: data.video.name,
          description: data.video.description,
          thumbnailUrl: data.video.thumbnailUrl,
          uploadDate: data.video.uploadDate,
          duration: data.video.duration,
        }
      : undefined,
  };

  return schema;
}

// Pre-configured legal process guides
export const LEGAL_PROCESS_GUIDES = {
  greenCardApplication: {
    name: 'How to Apply for a Green Card - Complete Step-by-Step Guide',
    description:
      'Learn how to apply for a green card (permanent residency) in the United States. This comprehensive guide covers family-based and employment-based green card applications with expert tips from immigration attorneys.',
    totalTime: 'PT6M', // 6 months typical processing
    estimatedCost: {
      value: '1225-2750',
      currency: 'USD',
    },
    supply: [
      { name: 'Valid passport', description: 'Current passport from your country of citizenship' },
      {
        name: 'Birth certificate',
        description: 'Official birth certificate with English translation',
      },
      {
        name: 'Marriage certificate (if applicable)',
        description: 'For family-based applications',
      },
      {
        name: 'Police certificates',
        description: 'From all countries where you lived for 6+ months',
      },
      { name: 'Medical examination results', description: 'From USCIS-approved physician' },
      {
        name: 'Financial documents',
        description: 'Tax returns, bank statements, employment letters',
      },
      {
        name: 'Passport photos',
        description: 'Two passport-style photos meeting USCIS requirements',
      },
    ],
    steps: [
      {
        name: 'Determine Your Eligibility Category',
        text: 'First, determine which green card category you qualify for: family-based, employment-based, refugee/asylee, or other special categories. Each has different requirements and processing times.',
        tip: 'Most people qualify through family (spouse, parent, child) or employment sponsorship.',
      },
      {
        name: 'File the Immigrant Petition',
        text: 'Your sponsor must file Form I-130 (family) or Form I-140 (employment) with USCIS. Include all required evidence and pay the filing fee.',
        warning: 'Incomplete petitions cause delays. Double-check all documents before filing.',
      },
      {
        name: 'Wait for Priority Date',
        text: 'Once approved, wait for your priority date to become current. Check the Visa Bulletin monthly. This can take months to years depending on your category and country.',
        tip: 'Use this waiting time to gather all required documents.',
      },
      {
        name: 'File Form I-485 (Adjustment of Status)',
        text: "When your priority date is current, file Form I-485 if you're in the US, or go through consular processing if abroad. Include all supporting documents.",
        warning: 'Filing too early can result in rejection. Ensure your priority date is current.',
      },
      {
        name: 'Complete Biometrics Appointment',
        text: 'Attend your biometrics appointment at a USCIS Application Support Center. They will take your fingerprints, photo, and signature.',
        tip: 'Arrive early and bring your appointment notice and photo ID.',
      },
      {
        name: 'Attend Green Card Interview',
        text: 'Prepare for and attend your green card interview. Bring all original documents and be ready to answer questions about your application.',
        warning: 'Missing the interview can result in case denial. Reschedule if necessary.',
      },
      {
        name: 'Receive Decision',
        text: "After the interview, you'll receive a decision. If approved, your green card will arrive by mail within 2-3 weeks.",
        tip: 'If denied, consult an immigration attorney immediately about appeal options.',
      },
    ],
  },

  personalInjuryClaim: {
    name: 'How to File a Personal Injury Claim After an Accident',
    description:
      'Step-by-step guide to filing a personal injury claim and maximizing your compensation. Learn what to do immediately after an accident and how to build a strong case.',
    totalTime: 'PT30M', // 30 minutes to complete initial steps
    estimatedCost: {
      value: '0',
      currency: 'USD',
    },
    supply: [
      { name: 'Police report', description: 'Official accident report from law enforcement' },
      { name: 'Medical records', description: 'All documentation of injuries and treatment' },
      {
        name: 'Insurance information',
        description: "Your policy and the at-fault party's information",
      },
      { name: 'Photos/videos', description: 'Evidence from the accident scene' },
      { name: 'Witness information', description: 'Names and contact details of witnesses' },
    ],
    steps: [
      {
        name: 'Ensure Safety and Call 911',
        text: 'First, check for injuries and move to safety if possible. Call 911 immediately to report the accident and request medical assistance if needed.',
        warning: 'Never admit fault or discuss the accident details with anyone except police.',
      },
      {
        name: 'Document the Accident Scene',
        text: 'Take photos and videos of all vehicles, injuries, road conditions, traffic signs, and skid marks. Get contact information from all parties and witnesses.',
        tip: "Use your phone to record a voice memo describing what happened while it's fresh.",
      },
      {
        name: 'Seek Medical Attention',
        text: "Get medical treatment immediately, even if you feel fine. Some injuries don't show symptoms right away. Follow all treatment recommendations.",
        warning: "Gaps in treatment can hurt your claim. Don't skip appointments.",
      },
      {
        name: 'Report to Your Insurance',
        text: "Notify your insurance company about the accident. Stick to facts only - don't speculate about fault or injuries.",
        tip: 'Record all conversations and keep copies of all correspondence.',
      },
      {
        name: 'Contact a Personal Injury Attorney',
        text: 'Call an experienced personal injury lawyer before accepting any settlement offers. Most offer free consultations and work on contingency.',
        warning:
          "Insurance companies often offer lowball settlements. Don't accept without legal advice.",
      },
      {
        name: 'Gather and Preserve Evidence',
        text: 'Collect all documents: medical bills, lost wage statements, repair estimates, and receipts. Keep a daily journal of pain and limitations.',
        tip: 'Create a dedicated folder (physical or digital) for all accident-related documents.',
      },
      {
        name: 'File Your Claim and Negotiate',
        text: "Your attorney will file the claim and negotiate with insurance companies. This may take several months. Stay patient and follow your lawyer's advice.",
        tip: 'Most cases settle without going to court, but be prepared for litigation if needed.',
      },
    ],
  },

  expungementProcess: {
    name: 'How to Get Your Criminal Record Expunged in North Carolina',
    description:
      'Complete guide to expunging criminal records in NC. Learn eligibility requirements, required forms, and the step-by-step process to clear your record.',
    totalTime: 'PT3M', // 3 months typical processing
    estimatedCost: {
      value: '175',
      currency: 'USD',
    },
    supply: [
      { name: 'Criminal record', description: 'Complete criminal history from NC courts' },
      { name: 'Court documents', description: 'All documents from your criminal case' },
      {
        name: 'Affidavit of good character',
        description: 'Two character affidavits from non-relatives',
      },
      { name: 'Fingerprint card', description: 'Official fingerprint card for background check' },
    ],
    steps: [
      {
        name: 'Check Your Eligibility',
        text: 'Verify you meet NC expungement requirements: waiting period completed, no subsequent convictions, and charge type is eligible for expungement.',
        warning: 'Not all convictions can be expunged. Violent felonies are typically ineligible.',
      },
      {
        name: 'Obtain Your Criminal Record',
        text: 'Get certified copies of your criminal record from the clerk of court in the county where you were charged. You may need records from multiple counties.',
        tip: "Request multiple certified copies - you'll need them for different agencies.",
      },
      {
        name: 'Complete the Petition Forms',
        text: 'Fill out the appropriate AOC expungement forms based on your conviction type. Be completely honest and thorough in your responses.',
        warning: 'Using the wrong form will result in denial. Consult an attorney if unsure.',
      },
      {
        name: 'Get Character Affidavits',
        text: 'Obtain two affidavits of good character from people who know you well but are not related to you. They must be notarized.',
        tip: 'Choose employers, teachers, clergy, or community leaders as references.',
      },
      {
        name: 'File with the Court',
        text: 'File your petition with the clerk of court in the county of conviction. Pay the $175 filing fee (may be waived for indigent petitioners).',
        tip: 'Make copies of everything before filing. Keep originals for your records.',
      },
      {
        name: 'Complete Background Check',
        text: "Get fingerprinted at your local sheriff's office for the required state and national background check. This verifies no subsequent convictions.",
        warning: 'Background check expires after 90 days. Time your filing accordingly.',
      },
      {
        name: 'Await Court Decision',
        text: 'The court will review your petition, which typically takes 3-6 months. You may need to attend a hearing. If approved, your record will be expunged.',
        tip: 'If denied, you can refile after addressing the reason for denial.',
      },
    ],
  },

  workersCompClaim: {
    name: 'How to File a Workers Compensation Claim in North Carolina',
    description:
      'Essential guide for injured workers to file a workers comp claim, get medical treatment, and receive benefits. Protect your rights and avoid common mistakes.',
    totalTime: 'PT1H', // 1 hour for initial steps
    estimatedCost: {
      value: '0',
      currency: 'USD',
    },
    supply: [
      { name: 'Incident report', description: 'Written report of your workplace injury' },
      { name: 'Medical records', description: 'All treatment documentation' },
      {
        name: 'Witness statements',
        description: 'Written statements from coworkers who saw the injury',
      },
      { name: 'Employment records', description: 'Pay stubs and work schedule' },
    ],
    steps: [
      {
        name: 'Report Injury Immediately',
        text: 'Tell your supervisor about your injury immediately, even if it seems minor. NC law requires reporting within 30 days, but sooner is better.',
        warning: 'Late reporting can result in claim denial. Report the same day if possible.',
      },
      {
        name: 'Seek Medical Treatment',
        text: 'Get medical care right away. Your employer may direct you to a specific doctor. Follow all treatment plans and keep all appointments.',
        tip: 'Tell the doctor this is a work injury so they bill workers comp, not your insurance.',
      },
      {
        name: 'Complete Written Report',
        text: "Fill out your employer's injury report form (Form 18) completely. Include all body parts injured and describe exactly how the injury occurred.",
        warning: "Be thorough - you can't add injuries later that weren't initially reported.",
      },
      {
        name: 'File Form 18 with NC Industrial Commission',
        text: "File Form 18 with the NC Industrial Commission within 2 years. Your employer should do this, but follow up to ensure it's filed.",
        tip: 'Keep copies of everything. Send forms by certified mail for proof of filing.',
      },
      {
        name: 'Cooperate with the Investigation',
        text: "The insurance company will investigate your claim. Be honest but don't give recorded statements without consulting an attorney first.",
        warning: 'Insurance adjusters work for the employer, not you. Be cautious.',
      },
      {
        name: 'Track Your Benefits',
        text: "You're entitled to medical treatment, lost wages (2/3 of average weekly wage), and possibly permanent disability benefits. Keep detailed records.",
        tip: 'Create a journal documenting pain levels, limitations, and missed work.',
      },
      {
        name: 'Appeal if Denied',
        text: 'If your claim is denied, you have 2 years to appeal. Contact a workers comp attorney immediately - most work on contingency.',
        warning: "Don't return to work without medical clearance, even if pressured.",
      },
    ],
  },
};

// Generate HowTo schema for a specific legal process
export function generateLegalProcessSchema(
  processType: keyof typeof LEGAL_PROCESS_GUIDES,
  customizations?: Partial<HowToGuideData>
): WithContext<HowTo> {
  const baseGuide = LEGAL_PROCESS_GUIDES[processType];
  const guide = { ...baseGuide, ...customizations };

  return generateHowToSchema(guide);
}

// Generate multiple HowTo schemas for a practice area
export function generatePracticeAreaHowToSchemas(
  practiceArea: 'immigration' | 'personalInjury' | 'criminalDefense' | 'workersComp'
): WithContext<HowTo>[] {
  const schemas: WithContext<HowTo>[] = [];

  switch (practiceArea) {
    case 'immigration':
      schemas.push(generateLegalProcessSchema('greenCardApplication'));
      // Add more immigration guides as needed
      break;
    case 'personalInjury':
      schemas.push(generateLegalProcessSchema('personalInjuryClaim'));
      break;
    case 'criminalDefense':
      schemas.push(generateLegalProcessSchema('expungementProcess'));
      break;
    case 'workersComp':
      schemas.push(generateLegalProcessSchema('workersCompClaim'));
      break;
  }

  return schemas;
}

// Create custom HowTo for specific scenarios
export function createCustomHowToSchema(
  title: string,
  description: string,
  steps: string[],
  options?: {
    totalTime?: string;
    cost?: { value: string; currency: string };
    supplies?: string[];
    warnings?: string[];
  }
): WithContext<HowTo> {
  const guide: HowToGuideData = {
    name: title,
    description: description,
    totalTime: options?.totalTime,
    estimatedCost: options?.cost,
    supply: options?.supplies?.map(s => ({ name: s })),
    steps: steps.map((step, index) => ({
      name: `Step ${index + 1}`,
      text: step,
      warning: options?.warnings?.[index],
    })),
  };

  return generateHowToSchema(guide);
}
