import { AgentTrainingData, AgentType } from '../types';

export const removalDefenseTraining: AgentTrainingData = {
  agentType: AgentType.REMOVAL_DEFENSE,

  scenarios: [
    {
      id: 'ice-detention',
      description: 'Family member detained by ICE',
      userInput: "ICE took my wife from our home this morning. She's at Stewart Detention Center.",
      expectedResponse:
        'I understand how frightening this is. Stewart Detention Center is about 2 hours from Atlanta. First, has she been able to call you? Detained individuals usually get one phone call within 24 hours.',
      followUpQuestions: [
        'What is her full name and A-number if you have it?',
        'Does she have any prior deportation orders?',
        'How long has she been in the US?',
        'Does she have US citizen children or a green card spouse?',
        'Has she ever been arrested before?',
      ],
    },
    {
      id: 'notice-to-appear',
      description: 'Received NTA in mail',
      userInput: 'I got papers from immigration court saying I have to appear next month',
      expectedResponse:
        "You've received a Notice to Appear (NTA). This starts removal proceedings. The most important thing is that you MUST attend that hearing. Missing it results in automatic deportation. What date is listed for your hearing?",
      followUpQuestions: [
        'Which immigration court is listed?',
        'What are the charges listed on the NTA?',
        'Have you ever had any criminal arrests?',
        'How did you enter the United States?',
        'Do you have family members who are citizens or green card holders?',
      ],
    },
    {
      id: 'bond-hearing',
      description: 'Need bond for detained person',
      userInput: 'My brother is detained and they said bond is $15,000. Is that normal?',
      expectedResponse:
        'Immigration bonds typically range from $1,500 to $25,000 or more. $15,000 is on the higher side but not unusual. We can request a bond reduction hearing. How long has your brother been detained?',
      followUpQuestions: [
        'Does he have any criminal history?',
        'Is he the primary financial provider for his family?',
        'Does he own property or have strong community ties?',
        'Has he appeared for all previous immigration appointments?',
        'Can the family gather the bond amount if reduced?',
      ],
    },
    {
      id: 'prior-removal-order',
      description: 'Old deportation order discovered',
      userInput: "I just found out I have a deportation order from 2010 that I didn't know about",
      expectedResponse:
        'An old removal order is serious - you can be deported immediately if encountered by ICE. We need to look at reopening your case. Did you move addresses around 2010? You may not have received the court notice.',
      followUpQuestions: [
        'Have you had any contact with immigration since 2010?',
        'Did you ever have an attorney representing you?',
        'Why do you think you missed the court date?',
        'Have you been arrested or had any police contact recently?',
        'Do you have new evidence or circumstances since 2010?',
      ],
    },
    {
      id: 'cancellation-eligibility',
      description: 'Exploring cancellation of removal',
      userInput: "I've been here 15 years and have US citizen kids. Can I fight deportation?",
      expectedResponse:
        "You might qualify for Cancellation of Removal. For non-green card holders, you need 10+ years in the US, good moral character, no serious crimes, and US citizen or LPR family who would suffer exceptional hardship if you're deported.",
      followUpQuestions: [
        'Can you prove continuous presence for 10+ years?',
        'Have you ever been arrested or convicted of anything?',
        'Would your children face hardship beyond normal separation?',
        'Do any family members have special medical or educational needs?',
        'Have you filed tax returns and maintained employment?',
      ],
    },
    {
      id: 'asylum-in-removal',
      description: 'Claiming fear of return',
      userInput:
        "I'm in deportation proceedings but I'm scared to go back to Honduras. The gangs threatened to kill me.",
      expectedResponse:
        'You may be able to apply for asylum as a defense to removal. Gang threats can qualify if connected to a protected ground. When were you threatened and have you reported it to police?',
      followUpQuestions: [
        'Why specifically were you targeted by gangs?',
        'Are you part of any particular social group they oppose?',
        'Did you report threats to police in Honduras?',
        'Have family members been harmed?',
        'When did you enter the United States?',
      ],
    },
    {
      id: 'criminal-conviction-impact',
      description: 'Criminal history affecting case',
      userInput:
        'I have a removal hearing but I was convicted of DUI last year. Will this hurt my case?',
      expectedResponse:
        "A single DUI typically isn't an aggravated felony, but it can affect discretionary relief and bond. The judge will consider it for moral character. Were there any aggravating factors like injury or property damage?",
      followUpQuestions: [
        'Was unknownone injured in the DUI incident?',
        'What was your blood alcohol level?',
        'Have you completed all court requirements?',
        'Do you have any other arrests or convictions?',
        'Have you completed alcohol treatment programs?',
      ],
    },
  ],

  knowledge: [
    {
      id: 'detention-centers',
      category: 'facilities',
      topic: 'Regional ICE Detention Centers',
      content:
        'Major detention centers near NC include: Stewart Detention Center (GA), Irwin County Detention Center (GA), and various county jails with ICE contracts. Each has different visitation rules and attorney access procedures.',
      relatedTopics: ['visitation', 'bond-process', 'attorney-access'],
    },
    {
      id: 'removal-defenses',
      category: 'legal-strategies',
      topic: 'Common Defenses to Removal',
      content:
        'Main defenses include: Cancellation of Removal (LPR and non-LPR), Asylum/Withholding/CAT, Adjustment of Status, Prosecutorial Discretion, Termination for defective NTA, and various waivers (212(h), 212(c), 237(a)(1)(H)).',
      relatedTopics: ['eligibility-requirements', 'evidence-needed', 'success-rates'],
    },
    {
      id: 'bond-factors',
      category: 'detention',
      topic: 'Immigration Bond Determination Factors',
      content:
        'Judges consider: flight risk, danger to community, family ties, employment history, property ownership, criminal record, immigration violations, and appearance at past proceedings. No bond for certain crimes or arriving aliens.',
      relatedTopics: ['bond-motion', 'evidence-gathering', 'bond-companies'],
    },
    {
      id: 'court-process',
      category: 'procedures',
      topic: 'Immigration Court Proceedings Timeline',
      content:
        'Typical process: Master Calendar Hearing (pleadings) -> Multiple Master Calendars (motions/applications) -> Individual Hearing (merits) -> Decision -> Appeal to BIA -> Circuit Court. Can take 2-5 years if not detained.',
      relatedTopics: ['hearing-preparation', 'evidence-deadlines', 'interpreter-services'],
    },
    {
      id: 'emergency-stays',
      category: 'urgent-relief',
      topic: 'Emergency Stays of Removal',
      content:
        'Can file emergency stay with ICE, BIA, or Circuit Court. Need to show: likelihood of success on appeal, irreparable harm, harm to government, and public interest. Must act immediately - often within hours.',
      relatedTopics: ['appeal-deadlines', 'motion-requirements', 'federal-court'],
    },
    {
      id: 'prosecutorial-discretion',
      category: 'alternatives',
      topic: 'ICE Prosecutorial Discretion',
      content:
        'ICE can exercise PD to close cases. Factors: community ties, criminal history, immigration history, age, health, family in military, victim of crime. Must present compelling case to ICE trial attorney.',
      relatedTopics: ['pd-request', 'supporting-evidence', 'timing'],
    },
  ],

  responses: [
    {
      id: 'detained-emergency',
      scenario: 'ice-detention',
      template:
        "I know you're frightened about {family_member} being detained. First, write down this A-number: {a_number} - you'll need it for everything. They should get a phone call within 24 hours. We can file for an emergency bond hearing.",
      variables: ['family_member', 'a_number'],
    },
    {
      id: 'court-warning',
      scenario: 'upcoming-hearing',
      template:
        'Your hearing on {court_date} is absolutely critical. Missing it means automatic deportation. Come to our office by {prep_date} so we can prepare. Bring all immigration documents and any criminal records.',
      variables: ['court_date', 'prep_date'],
    },
    {
      id: 'bond-explanation',
      scenario: 'bond-inquiry',
      template:
        "The current bond of ${bond_amount} can potentially be lowered. We'll need to show {positive_factors}. The judge will also consider {risk_factors}. Bond hearings usually happen within 1-2 weeks of request.",
      variables: ['bond_amount', 'positive_factors', 'risk_factors'],
    },
    {
      id: 'relief-assessment',
      scenario: 'eligibility-check',
      template:
        "Based on your {years_present} years here and {family_status}, you may qualify for {relief_type}. The main challenge will be proving {key_requirement}. We'll need documentation showing {evidence_needed}.",
      variables: [
        'years_present',
        'family_status',
        'relief_type',
        'key_requirement',
        'evidence_needed',
      ],
    },
    {
      id: 'criminal-impact',
      scenario: 'criminal-consultation',
      template:
        'Your conviction for {offense} is classified as a {crime_type} under immigration law. This {impact_description}. We can explore {possible_strategies} to minimize the immigration consequences.',
      variables: ['offense', 'crime_type', 'impact_description', 'possible_strategies'],
    },
    {
      id: 'urgent-action',
      scenario: 'immediate-deportation-risk',
      template:
        'This is urgent - {risk_description}. We need to file {urgent_filing} within {time_limit}. Can you come to our office immediately? Bring {required_documents}. Do not speak to ICE without an attorney.',
      variables: ['risk_description', 'urgent_filing', 'time_limit', 'required_documents'],
    },
  ],
};
