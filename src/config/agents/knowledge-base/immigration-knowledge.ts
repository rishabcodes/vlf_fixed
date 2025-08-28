export const immigrationKnowledgeBase = {
  removal_defense: {
    bond_hearings: {
      factors: [
        'Flight risk assessment',
        'Danger to community',
        'Family ties in the US',
        'Employment history',
        'Property ownership',
        'Criminal history impact',
        'Length of residence',
        'Relief eligibility',
      ],
      strategies: [
        'Prepare comprehensive documentation packet',
        'Obtain support letters from community',
        'Document rehabilitation if criminal history',
        'Show ability to pay reasonable bond',
        'Demonstrate strong equities',
        'Address negative factors head-on',
      ],
      typical_amounts: {
        no_criminal_history: '$1,500 - $5,000',
        minor_criminal_history: '$5,000 - $15,000',
        serious_criminal_history: '$15,000 - $25,000+',
        flight_risk_factors: 'Often no bond or $25,000+',
      },
    },

    cancellation_of_removal: {
      non_lpr_requirements: [
        '10 years continuous physical presence',
        'Good moral character',
        'No disqualifying crimes',
        'Exceptional and extremely unusual hardship to USC/LPR family',
      ],
      lpr_requirements: [
        '7 years as LPR',
        '5 years continuous residence after admission',
        'No aggravated felony convictions',
      ],
      hardship_factors: [
        'Medical conditions requiring US treatment',
        'Educational needs of children',
        'Country conditions',
        'Length of residence',
        'Family ties',
        'Economic impact',
        'Psychological evaluations',
      ],
    },

    asylum_withholding_cat: {
      asylum_requirements: [
        'Persecution on account of protected ground',
        'Race, religion, nationality, political opinion, PSG',
        'Government persecution or unwilling/unable to protect',
        'One year filing deadline (with exceptions)',
        'Not firmly resettled',
        'No serious criminal bars',
      ],
      withholding_requirements: [
        'More likely than not to face persecution',
        'Higher standard than asylum',
        'No one year deadline',
        'Mandatory bars for particularly serious crimes',
      ],
      cat_protection: [
        'More likely than not to be tortured',
        'By or with acquiescence of government',
        'No requirement of protected ground',
        'Cannot be returned to country of torture',
      ],
    },

    appeals_process: {
      bia_appeals: [
        '30 days to file Notice of Appeal',
        'Brief due within 21 days of briefing schedule',
        'Single Board Member vs 3-member panel',
        'Standards of review vary by issue',
        'Can file motion to remand for new evidence',
      ],
      circuit_court: [
        '30 days to file Petition for Review',
        'Venue based on removal proceedings location',
        'Administrative exhaustion required',
        'Stay of removal must be requested separately',
        'Limited to issues raised before BIA',
      ],
    },
  },

  business_immigration: {
    h1b_process: {
      requirements: [
        'Specialty occupation position',
        "Bachelor's degree or equivalent required",
        'Degree must be related to position',
        'Prevailing wage must be paid',
        'Employer-employee relationship',
      ],
      cap_process: [
        'Registration in March',
        'Lottery selection',
        '65,000 regular cap + 20,000 masters cap',
        'Cap-exempt: universities, non-profits, government',
        'October 1 start date for cap-subject',
      ],
      rfe_common_issues: [
        'Specialty occupation not established',
        'Beneficiary qualifications',
        'Employer-employee relationship',
        'Availability of work/itinerary',
        'Maintenance of status',
      ],
    },

    perm_process: {
      steps: [
        'Prevailing Wage Determination (2-4 months)',
        'Recruitment (30-60 days minimum)',
        'Quiet period (30 days)',
        'File ETA 9089',
        'DOL processing (6-12 months)',
        'Audit response if selected',
      ],
      recruitment_requirements: [
        'Job order with SWA (30 days)',
        'Two Sunday newspaper ads',
        'Three additional steps for professionals',
        'Internal posting (10 business days)',
        'Document all resumes and reasons for rejection',
      ],
      audit_triggers: [
        'High prevailing wage',
        'Requirements tailored to foreign worker',
        'Family relationship',
        'Small company size',
        'Recent layoffs',
      ],
    },

    employment_categories: {
      eb1: {
        types: [
          'Extraordinary Ability',
          'Outstanding Professor/Researcher',
          'Multinational Manager',
        ],
        advantages: 'Current priority dates, no PERM required (except EB1-2)',
        evidence: 'Awards, publications, memberships, judging, original contributions',
      },
      eb2: {
        types: ['Advanced Degree', 'Exceptional Ability', 'National Interest Waiver'],
        requirements: "Master's or Bachelor's + 5 years",
        niw_factors: 'Substantial merit, national importance, waiver benefits US',
      },
      eb3: {
        types: ['Professional', 'Skilled Worker', 'Other Worker'],
        requirements: "Bachelor's, 2 years experience, or less than 2 years",
        processing: 'Longest wait times, especially for Other Workers',
      },
    },
  },

  family_immigration: {
    immediate_relatives: {
      categories: ['Spouse of USC', 'Parent of USC (21+)', 'Unmarried child under 21 of USC'],
      benefits: 'No numerical limits, no priority date wait',
      processing: 'I-130 approval then adjustment or consular processing',
    },

    preference_categories: {
      f1: 'Unmarried sons/daughters of USC',
      f2a: 'Spouses and unmarried children under 21 of LPR',
      f2b: 'Unmarried sons/daughters 21+ of LPR',
      f3: 'Married sons/daughters of USC',
      f4: 'Siblings of USC',
    },

    adjustment_vs_consular: {
      adjustment_benefits: [
        'Remain in US during processing',
        'Can work with EAD',
        'Travel with advance parole',
        'Interview at local USCIS office',
      ],
      consular_process: [
        'Must leave US for interview',
        'Risk of inadmissibility findings',
        'No appeal rights if denied',
        'Faster for immediate relatives abroad',
      ],
    },

    waivers: {
      i601: {
        grounds: 'Unlawful presence, misrepresentation, certain crimes',
        standard: 'Extreme hardship to USC/LPR spouse or parent',
        factors: 'Medical, financial, educational, psychological, country conditions',
      },
      i601a: {
        grounds: 'Unlawful presence only',
        benefit: 'Can be filed before leaving US',
        requirement: 'Approved I-130 and case at NVC',
      },
    },
  },

  practice_management: {
    client_communication: [
      'Set clear expectations on timeline',
      'Regular status updates',
      'Explain potential issues upfront',
      'Document all advice given',
      'Confirm receipt of documents',
    ],

    case_management: [
      'Centralized deadline calendar',
      'Tickler system for follow-ups',
      'Standard checklists for case types',
      'Regular case status reviews',
      'Backup systems for all files',
    ],

    ethics_considerations: [
      'Competence in practice area',
      'Conflicts of interest checks',
      'Client fund management',
      'Confidentiality obligations',
      'Withdrawal procedures',
    ],
  },
};
