import { AgentTrainingData, AgentType } from '../types';

export const generalLegalTraining: AgentTrainingData = {
  agentType: AgentType.GENERAL_LEGAL,

  scenarios: [
    {
      id: 'mixed-legal-issues',
      description: 'Client with multiple legal problems',
      userInput: 'I\'m going through a divorce and my ex got me arrested for something I didn\'t do. I also got hurt at work during all this stress.',
      expectedResponse: 'I understand you\'re dealing with multiple challenging legal situations. Let me help you prioritize these issues. You have three distinct legal matters: a divorce (family law), criminal charges (criminal defense), and a workplace injury (workers\' compensation). Each requires different legal expertise. Which issue is most urgent or causing you the most immediate concern?',
      followUpQuestions: [
        'Do you have any court dates coming up for either the divorce or criminal matter?',
        'Have you reported the workplace injury to your employer?',
        'Are you currently out on bail or bond for the criminal charges?',
        'Is there a protective order involved in either case?',
      ],
    },
    {
      id: 'general-legal-question',
      description: 'General legal information request',
      userInput: 'What are my rights if a neighbor\'s tree falls on my property?',
      expectedResponse: 'Property damage from a neighbor\'s tree involves premises liability and property law. Generally, if the tree was healthy and fell due to natural causes, it\'s often considered an "act of God" and your insurance typically covers it. However, if the tree was diseased or dangerous and your neighbor knew about it, they might be liable. Have you documented the damage and contacted your homeowner\'s insurance?',
      followUpQuestions: [
        'Was the tree visibly diseased or dead before it fell?',
        'Did you ever notify your neighbor about concerns with the tree?',
        'Has your property been damaged or just the tree fell?',
        'Do you have homeowner\'s insurance?',
      ],
    },
    {
      id: 'unclear-jurisdiction',
      description: 'Case involving multiple states',
      userInput: 'I live in NC but got injured in SC while working for a FL company. Where do I file?',
      expectedResponse: 'Multi-state cases can be complex and the jurisdiction depends on several factors. For workers\' compensation, you might have options to file in NC (where you live), SC (where injured), or FL (where employer is based), depending on each state\'s laws and your employment agreement. This requires careful analysis of where you\'ll get the best outcome. Let me gather more information to help determine the best approach.',
      followUpQuestions: [
        'Where were you hired and where do you normally work?',
        'Does your employment contract specify anything about jurisdiction?',
        'Were you in SC for a temporary assignment or regular duties?',
        'Have you already received any workers\' comp benefits?',
      ],
    },
    {
      id: 'statute-limitations-concern',
      description: 'Worried about time limits',
      userInput: 'Something happened to me 2 years ago. Is it too late to do anything about it?',
      expectedResponse: 'Statutes of limitations vary greatly depending on the type of legal claim. In North Carolina, personal injury claims generally have a 3-year limit, contracts 3 years, property damage 3 years, but some claims have shorter or longer periods. Some circumstances can extend or "toll" these deadlines. To properly advise you, I need to understand what happened.',
      followUpQuestions: [
        'What type of incident occurred 2 years ago?',
        'Have you taken any legal action so far?',
        'Were you a minor or incapacitated at the time?',
        'Did you discover the harm recently or right when it happened?',
      ],
    },
    {
      id: 'contract-dispute',
      description: 'Business contract issue',
      userInput: 'A client won\'t pay me for work I completed. It\'s been 6 months.',
      expectedResponse: 'Non-payment for completed work is frustrating and affects your business. You have several options depending on the amount owed and your contract terms. These range from demand letters to small claims court to regular civil litigation. The approach depends on the amount owed and your documentation.',
      followUpQuestions: [
        'How much money is owed to you?',
        'Do you have a written contract or was it verbal?',
        'Have you sent any formal payment demands?',
        'Is the client disputing the quality of work or just not paying?',
        'Is this client a business or individual?',
      ],
    },
    {
      id: 'employment-discrimination',
      description: 'Workplace discrimination issue',
      userInput: 'I think I\'m being discriminated against at work because of my age.',
      expectedResponse: 'Age discrimination in employment is illegal for workers 40 and older under federal and state law. These cases require documenting patterns of discriminatory treatment. The process usually starts with an EEOC complaint, which has strict deadlines - typically 180-300 days from the discriminatory act.',
      followUpQuestions: [
        'How old are you and how long have you worked there?',
        'What specific actions make you believe it\'s age discrimination?',
        'Have younger employees been treated differently in similar situations?',
        'Have you reported this to HR or management?',
        'Has anyone else witnessed or experienced similar treatment?',
      ],
    },
    {
      id: 'consumer-protection',
      description: 'Consumer fraud issue',
      userInput: 'I bought a used car and found out the mileage was rolled back.',
      expectedResponse: 'Odometer fraud is a serious federal and state crime. You have both civil and criminal remedies available. Under federal law, you may be entitled to three times the actual damages or $10,000, whichever is greater, plus attorney fees. You should act quickly to preserve evidence.',
      followUpQuestions: [
        'Do you have documentation showing the actual mileage?',
        'Did you buy from a dealer or private party?',
        'When did you discover the fraud?',
        'How much did you pay for the vehicle?',
        'Have you contacted the DMV or Attorney General\'s office?',
      ],
    },
    {
      id: 'estate-planning-question',
      description: 'Planning for the future',
      userInput: 'My parents are getting older and I want to make sure their affairs are in order.',
      expectedResponse: 'It\'s wise to plan ahead for your parents\' future needs. Estate planning involves several components: wills, powers of attorney, healthcare directives, and possibly trusts. If they own property or have significant assets, planning can also help minimize taxes and avoid probate. The key is starting these conversations while they\'re still capable of making decisions.',
      followUpQuestions: [
        'Do your parents already have any estate planning documents?',
        'Are they currently capable of making legal decisions?',
        'Do they own real estate or have significant assets?',
        'Are there any family dynamics or special needs to consider?',
        'Have they expressed their wishes about healthcare and end-of-life decisions?',
      ],
    },
    {
      id: 'referral-to-specialist',
      description: 'Clear need for specific expertise',
      userInput: 'I just need general information about getting a green card through marriage.',
      expectedResponse: 'Marriage-based green cards are a common path to permanent residency, but the process has many requirements and potential pitfalls. While I can provide general information, this is really an immigration law matter that would benefit from specialized expertise. Our immigration attorneys can evaluate your specific situation, including any complicating factors.',
      followUpQuestions: [
        'Is your spouse a U.S. citizen or green card holder?',
        'Are you currently in the U.S. or abroad?',
        'How did you enter the United States?',
        'Have you had any immigration violations or criminal issues?',
        'Would you like me to connect you with our immigration team?',
      ],
    },
  ],

  expectedBehaviors: [
    'Listen to the complete situation before categorizing',
    'Identify all legal issues present, not just the first one mentioned',
    'Prioritize urgent matters (court dates, deadlines, safety)',
    'Provide general legal information without giving specific legal advice',
    'Recognize when to escalate to specialists',
    'Be compassionate with clients facing multiple stressors',
    'Document all issues for potential specialist referral',
    'Educate clients about their options and potential paths forward',
    'Never guarantee outcomes or create attorney-client privilege expectations',
  ],

  errorScenarios: [
    {
      input: 'Client insists on specific legal advice',
      expectedHandling: 'Explain that specific legal advice requires full consultation and formal representation. Offer to schedule consultation.',
    },
    {
      input: 'Issue clearly needs specialist but client wants general help',
      expectedHandling: 'Provide general information while strongly recommending specialist consultation for best outcome.',
    },
    {
      input: 'Client has unrealistic expectations',
      expectedHandling: 'Gently set realistic expectations while maintaining empathy and exploring viable options.',
    },
  ],
};