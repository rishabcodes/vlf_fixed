/**
 * Topic Bank for Blog Generation
 * 20-30 unique topics per practice area
 * Designed to avoid repetition for 2-3 months
 */

export interface TopicTemplate {
  template: string;
  keywords: string[];
  contentType: 'guide' | 'news-reaction' | 'how-to' | 'faq' | 'case-study' | 'comparison' | 'checklist';
}

export const TOPIC_BANK: Record<string, TopicTemplate[]> = {
  'immigration': [
    // Guides
    { template: "Complete Guide to {year} H-1B Visa Cap Season", keywords: ["H1B visa", "work visa", "immigration"], contentType: "guide" },
    { template: "Emergency Travel Documents: What to Do When You Lose Your Green Card Abroad", keywords: ["green card", "travel", "emergency"], contentType: "how-to" },
    { template: "{month} USCIS Processing Time Updates for {location}", keywords: ["USCIS", "processing times", "immigration"], contentType: "news-reaction" },
    { template: "Marriage-Based Green Card Interview: {year} Question Checklist", keywords: ["marriage green card", "interview", "USCIS"], contentType: "checklist" },
    { template: "Student Visa to Work Visa: Navigating F-1 to H-1B Transition", keywords: ["F1 visa", "H1B", "student visa"], contentType: "guide" },
    
    // Current Events
    { template: "How Recent Federal Court Decisions Impact {location} Immigration Cases", keywords: ["immigration law", "court decisions"], contentType: "news-reaction" },
    { template: "DACA Updates {season} {year}: What {location} Dreamers Need to Know", keywords: ["DACA", "dreamers", "immigration"], contentType: "news-reaction" },
    { template: "New I-9 Compliance Rules for {location} Employers Starting {month}", keywords: ["I-9", "employment", "compliance"], contentType: "guide" },
    { template: "Asylum Application Changes: {year} Policy Updates", keywords: ["asylum", "refugee", "immigration"], contentType: "news-reaction" },
    { template: "Priority Dates Movement for {month} {year} Visa Bulletin", keywords: ["visa bulletin", "priority dates", "green card"], contentType: "news-reaction" },
    
    // How-To
    { template: "How to Expedite Your Immigration Case in {year}", keywords: ["expedite", "USCIS", "processing"], contentType: "how-to" },
    { template: "Responding to a Request for Evidence (RFE) from USCIS", keywords: ["RFE", "USCIS", "evidence"], contentType: "how-to" },
    { template: "How to Check Your USCIS Case Status: {year} Complete Guide", keywords: ["case status", "USCIS", "tracking"], contentType: "how-to" },
    { template: "Preparing for Your Naturalization Test in {location}", keywords: ["citizenship", "naturalization", "test"], contentType: "guide" },
    { template: "How to Obtain Police Clearance Certificates for Immigration", keywords: ["police clearance", "background check"], contentType: "how-to" },
    
    // FAQs
    { template: "Top 10 Immigration Questions {location} Residents Ask in {season}", keywords: ["immigration FAQ", "common questions"], contentType: "faq" },
    { template: "Can You Travel While Your Green Card Application Is Pending?", keywords: ["travel", "pending application", "advance parole"], contentType: "faq" },
    { template: "What Happens If Your Work Visa Expires While Changing Jobs?", keywords: ["visa expiry", "job change", "H1B"], contentType: "faq" },
    { template: "Immigration Options for Parents of US Citizens", keywords: ["family immigration", "parents", "green card"], contentType: "guide" },
    { template: "Understanding the Public Charge Rule in {year}", keywords: ["public charge", "immigration", "benefits"], contentType: "guide" },
    
    // Local Focus
    { template: "{location} Immigration Court: Wait Times and What to Expect", keywords: ["immigration court", "local", "wait times"], contentType: "guide" },
    { template: "Best USCIS Field Offices Near {location}: A Comparison", keywords: ["USCIS office", "local", "field office"], contentType: "comparison" },
    { template: "Immigration Lawyers vs DIY: When {location} Residents Need Legal Help", keywords: ["immigration lawyer", "DIY", "legal help"], contentType: "comparison" },
    { template: "Cost of Immigration Services in {location}: {year} Price Guide", keywords: ["immigration cost", "fees", "pricing"], contentType: "guide" },
    { template: "Emergency Immigration Services Available in {location} During {season}", keywords: ["emergency", "immigration", "urgent"], contentType: "guide" }
  ],
  
  'personal-injury': [
    // Accident Types
    { template: "{season} Weather-Related Accidents in {location}: Your Legal Rights", keywords: ["weather accidents", "personal injury", "liability"], contentType: "guide" },
    { template: "Uber/Lyft Accident Claims in {location}: {year} Legal Guide", keywords: ["rideshare accident", "Uber", "Lyft"], contentType: "guide" },
    { template: "Construction Site Accidents: {location} Worker Rights and Compensation", keywords: ["construction accident", "workplace injury"], contentType: "guide" },
    { template: "Pedestrian Accident Statistics in {location} for {year}", keywords: ["pedestrian accident", "statistics", "safety"], contentType: "news-reaction" },
    { template: "Motorcycle Accident Claims: Why {season} Is the Most Dangerous Time", keywords: ["motorcycle accident", "seasonal", "claims"], contentType: "guide" },
    
    // Medical & Damages
    { template: "Calculating Pain and Suffering Damages in {location} Courts", keywords: ["pain and suffering", "damages", "compensation"], contentType: "guide" },
    { template: "Medical Malpractice vs Personal Injury: Understanding the Difference", keywords: ["medical malpractice", "personal injury"], contentType: "comparison" },
    { template: "Long-Term Care Costs After Serious Injuries in {location}", keywords: ["long-term care", "injury costs", "compensation"], contentType: "guide" },
    { template: "Traumatic Brain Injury Cases: {year} Settlement Trends", keywords: ["TBI", "brain injury", "settlement"], contentType: "guide" },
    { template: "Spinal Cord Injury Compensation in {location}: What to Expect", keywords: ["spinal injury", "compensation", "paralysis"], contentType: "guide" },
    
    // Insurance Issues
    { template: "Dealing with Insurance Adjusters After a {location} Car Accident", keywords: ["insurance adjuster", "car accident", "claims"], contentType: "how-to" },
    { template: "Uninsured Motorist Claims in North Carolina: {year} Guide", keywords: ["uninsured motorist", "UM coverage", "claims"], contentType: "guide" },
    { template: "Why Insurance Companies Deny Claims and How to Fight Back", keywords: ["insurance denial", "appeal", "claims"], contentType: "how-to" },
    { template: "Hit and Run Accidents in {location}: Your Legal Options", keywords: ["hit and run", "uninsured", "legal options"], contentType: "guide" },
    { template: "Understanding PIP Coverage in North Carolina Accidents", keywords: ["PIP", "personal injury protection", "insurance"], contentType: "guide" },
    
    // Legal Process
    { template: "Personal Injury Lawsuit Timeline in {location} Courts", keywords: ["lawsuit timeline", "court process", "litigation"], contentType: "guide" },
    { template: "Should You Accept the First Settlement Offer? {year} Statistics Say No", keywords: ["settlement offer", "negotiation", "statistics"], contentType: "guide" },
    { template: "Statute of Limitations for Personal Injury in NC: Don't Miss Your Deadline", keywords: ["statute of limitations", "deadline", "filing"], contentType: "guide" },
    { template: "How Social Media Can Hurt Your Personal Injury Case", keywords: ["social media", "evidence", "case impact"], contentType: "how-to" },
    { template: "Choosing Between Settlement and Trial in {location}", keywords: ["settlement", "trial", "litigation"], contentType: "comparison" },
    
    // Specific Situations
    { template: "Dog Bite Laws in {location}: Owner Liability in {year}", keywords: ["dog bite", "animal attack", "liability"], contentType: "guide" },
    { template: "Slip and Fall Accidents at {location} Businesses: Your Rights", keywords: ["slip and fall", "premises liability", "business"], contentType: "guide" },
    { template: "Product Liability Cases: Recent {location} Recalls and Lawsuits", keywords: ["product liability", "defective product", "recall"], contentType: "news-reaction" },
    { template: "Nursing Home Abuse in {location}: Warning Signs and Legal Action", keywords: ["nursing home", "elder abuse", "neglect"], contentType: "guide" },
    { template: "School Bus Accidents in {location}: Complex Liability Issues", keywords: ["school bus", "accident", "children"], contentType: "guide" }
  ],
  
  'criminal-defense': [
    // DUI/DWI
    { template: "DWI Checkpoints in {location} During {season}: Your Rights", keywords: ["DWI checkpoint", "rights", "police"], contentType: "guide" },
    { template: "First-Time DUI Offense in {location}: {year} Penalties and Options", keywords: ["first DUI", "penalties", "options"], contentType: "guide" },
    { template: "Refusing a Breathalyzer in North Carolina: Consequences and Rights", keywords: ["breathalyzer", "refusal", "implied consent"], contentType: "guide" },
    { template: "DWI with a CDL in {location}: Career-Ending Consequences", keywords: ["CDL", "commercial license", "DWI"], contentType: "guide" },
    { template: "Underage DUI in {location}: How It Affects College and Future", keywords: ["underage DUI", "college", "future impact"], contentType: "guide" },
    
    // Drug Charges
    { template: "Marijuana Laws in {location}: {year} Updates and Changes", keywords: ["marijuana", "cannabis", "drug laws"], contentType: "news-reaction" },
    { template: "Drug Possession vs Distribution: Penalties in {location}", keywords: ["drug possession", "distribution", "trafficking"], contentType: "comparison" },
    { template: "Prescription Drug Charges: When Legal Medications Become Illegal", keywords: ["prescription drugs", "illegal possession"], contentType: "guide" },
    { template: "Drug Court Programs in {location}: Alternative to Prison", keywords: ["drug court", "diversion", "rehabilitation"], contentType: "guide" },
    { template: "Federal vs State Drug Charges in North Carolina", keywords: ["federal charges", "state charges", "drugs"], contentType: "comparison" },
    
    // Violent Crimes
    { template: "Self-Defense Laws in {location}: When Force Is Justified", keywords: ["self-defense", "castle doctrine", "stand your ground"], contentType: "guide" },
    { template: "Domestic Violence Charges: Impact on Gun Rights and Employment", keywords: ["domestic violence", "gun rights", "employment"], contentType: "guide" },
    { template: "Assault vs Battery in North Carolina: Understanding the Difference", keywords: ["assault", "battery", "charges"], contentType: "comparison" },
    { template: "Weapons Charges in {location}: {year} Law Updates", keywords: ["weapons charges", "gun laws", "concealed carry"], contentType: "news-reaction" },
    { template: "Juvenile Criminal Charges: Protecting Your Child's Future", keywords: ["juvenile", "criminal", "youth"], contentType: "guide" },
    
    // White Collar
    { template: "Embezzlement Charges in {location}: Defenses and Penalties", keywords: ["embezzlement", "white collar", "theft"], contentType: "guide" },
    { template: "Identity Theft Accusations: Defending Against False Claims", keywords: ["identity theft", "fraud", "false accusation"], contentType: "guide" },
    { template: "Tax Fraud vs Tax Mistakes: When IRS Issues Become Criminal", keywords: ["tax fraud", "IRS", "criminal charges"], contentType: "comparison" },
    { template: "Computer Crimes in {year}: New Laws and Penalties", keywords: ["computer crime", "cyber crime", "hacking"], contentType: "news-reaction" },
    { template: "Money Laundering Charges: Federal vs State Prosecution", keywords: ["money laundering", "federal crime", "financial crime"], contentType: "guide" },
    
    // Legal Process
    { template: "Bail and Bond in {location}: Getting Out of Jail Fast", keywords: ["bail", "bond", "pretrial release"], contentType: "how-to" },
    { template: "Public Defender vs Private Attorney in {location}", keywords: ["public defender", "private attorney", "legal representation"], contentType: "comparison" },
    { template: "Expungement in North Carolina: Clearing Your Record in {year}", keywords: ["expungement", "criminal record", "clean slate"], contentType: "how-to" },
    { template: "Plea Bargains: When to Accept and When to Fight", keywords: ["plea bargain", "plea deal", "negotiation"], contentType: "guide" },
    { template: "Criminal Court Process in {location}: From Arrest to Trial", keywords: ["court process", "criminal procedure", "trial"], contentType: "guide" }
  ],
  
  'workers-compensation': [
    // Injury Types
    { template: "Repetitive Stress Injuries: Getting Workers' Comp in {location}", keywords: ["RSI", "repetitive stress", "carpal tunnel"], contentType: "guide" },
    { template: "Back Injuries at Work: {year} Compensation Rates in NC", keywords: ["back injury", "workplace injury", "compensation"], contentType: "guide" },
    { template: "Mental Health and Workers' Comp: PTSD Claims in {location}", keywords: ["PTSD", "mental health", "workers comp"], contentType: "guide" },
    { template: "Construction Worker Injuries in {location}: Common Claims", keywords: ["construction", "workplace injury", "claims"], contentType: "guide" },
    { template: "Heat-Related Workplace Injuries During {location} {season}", keywords: ["heat injury", "heat stroke", "workplace safety"], contentType: "guide" },
    
    // Claims Process
    { template: "Workers' Comp Claim Denied? {year} Appeal Strategies", keywords: ["denied claim", "appeal", "workers comp"], contentType: "how-to" },
    { template: "Reporting Workplace Injuries: {location} Deadline Requirements", keywords: ["reporting injury", "deadline", "notification"], contentType: "guide" },
    { template: "IME (Independent Medical Exam): What to Expect and How to Prepare", keywords: ["IME", "medical exam", "workers comp"], contentType: "how-to" },
    { template: "Light Duty Work: Your Rights and Compensation in {location}", keywords: ["light duty", "modified work", "restrictions"], contentType: "guide" },
    { template: "Workers' Comp Settlement Calculator for {location} Injuries", keywords: ["settlement", "calculator", "compensation"], contentType: "guide" },
    
    // Specific Industries
    { template: "Healthcare Worker Injuries in {location}: COVID and Beyond", keywords: ["healthcare", "COVID", "workplace injury"], contentType: "guide" },
    { template: "Truck Driver Injuries: Interstate Commerce and NC Workers' Comp", keywords: ["truck driver", "interstate", "commercial driving"], contentType: "guide" },
    { template: "Restaurant Worker Injuries: Burns, Cuts, and Comp Claims", keywords: ["restaurant", "food service", "injury"], contentType: "guide" },
    { template: "Office Worker Injuries: Ergonomics and Compensation Rights", keywords: ["office injury", "ergonomics", "desk job"], contentType: "guide" },
    { template: "Agricultural Worker Rights in {location}: {season} Safety", keywords: ["farm worker", "agricultural", "seasonal"], contentType: "guide" },
    
    // Benefits
    { template: "Calculating Lost Wages in {location} Workers' Comp Cases", keywords: ["lost wages", "wage replacement", "benefits"], contentType: "guide" },
    { template: "Medical Treatment Under Workers' Comp: Choosing Your Doctor", keywords: ["medical treatment", "doctor choice", "healthcare"], contentType: "guide" },
    { template: "Permanent Disability Ratings in North Carolina: {year} Guide", keywords: ["permanent disability", "disability rating", "impairment"], contentType: "guide" },
    { template: "Vocational Rehabilitation: Getting Back to Work After Injury", keywords: ["vocational rehab", "job training", "return to work"], contentType: "guide" },
    { template: "Death Benefits: Workers' Comp for {location} Families", keywords: ["death benefits", "fatal injury", "survivor benefits"], contentType: "guide" },
    
    // Legal Issues
    { template: "Third-Party Claims Beyond Workers' Comp in {location}", keywords: ["third party", "lawsuit", "additional compensation"], contentType: "guide" },
    { template: "Fired After Filing Workers' Comp? Retaliation Laws in NC", keywords: ["retaliation", "wrongful termination", "fired"], contentType: "guide" },
    { template: "Pre-Existing Conditions and Workers' Comp Claims", keywords: ["pre-existing", "aggravation", "medical history"], contentType: "guide" },
    { template: "Independent Contractor vs Employee: Workers' Comp Rights", keywords: ["independent contractor", "employee", "classification"], contentType: "comparison" },
    { template: "Workers' Comp Fraud: Consequences for False Claims in {year}", keywords: ["fraud", "false claim", "consequences"], contentType: "guide" }
  ],
  
  'family-law': [
    // Divorce
    { template: "Divorce in {location}: How Long Does It Really Take in {year}?", keywords: ["divorce timeline", "process", "duration"], contentType: "guide" },
    { template: "High-Asset Divorce in {location}: Protecting Your Wealth", keywords: ["high asset", "property division", "wealth"], contentType: "guide" },
    { template: "Military Divorce in North Carolina: Unique Considerations", keywords: ["military divorce", "deployment", "benefits"], contentType: "guide" },
    { template: "Collaborative Divorce vs Litigation in {location}", keywords: ["collaborative divorce", "mediation", "litigation"], contentType: "comparison" },
    { template: "Gray Divorce: Over-50 Separations in {location} Rising", keywords: ["gray divorce", "senior", "retirement"], contentType: "news-reaction" },
    
    // Child Custody
    { template: "Child Custody Factors: What {location} Judges Consider in {year}", keywords: ["child custody", "best interests", "factors"], contentType: "guide" },
    { template: "Joint vs Sole Custody in North Carolina: Pros and Cons", keywords: ["joint custody", "sole custody", "parenting"], contentType: "comparison" },
    { template: "Modifying Child Custody Orders: When and How in {location}", keywords: ["custody modification", "change", "court order"], contentType: "how-to" },
    { template: "Grandparents' Rights in {location}: Visitation and Custody", keywords: ["grandparents rights", "visitation", "third party"], contentType: "guide" },
    { template: "Parental Alienation: Recognition and Legal Remedies", keywords: ["parental alienation", "custody", "manipulation"], contentType: "guide" },
    
    // Child Support
    { template: "Child Support Calculator for {location}: {year} Guidelines", keywords: ["child support", "calculator", "guidelines"], contentType: "guide" },
    { template: "Modifying Child Support When Income Changes", keywords: ["support modification", "income change", "adjustment"], contentType: "how-to" },
    { template: "College Expenses and Child Support in North Carolina", keywords: ["college", "education expenses", "support"], contentType: "guide" },
    { template: "Enforcing Child Support Orders: {location} Collection Methods", keywords: ["enforcement", "collection", "unpaid support"], contentType: "guide" },
    { template: "Self-Employed Parents and Child Support Calculations", keywords: ["self-employed", "business owner", "income"], contentType: "guide" },
    
    // Alimony
    { template: "Alimony in {location}: Types and {year} Trends", keywords: ["alimony", "spousal support", "maintenance"], contentType: "guide" },
    { template: "How Adultery Affects Alimony in North Carolina", keywords: ["adultery", "infidelity", "alimony impact"], contentType: "guide" },
    { template: "Temporary vs Permanent Alimony: Understanding the Difference", keywords: ["temporary alimony", "permanent alimony", "duration"], contentType: "comparison" },
    { template: "Cohabitation and Alimony Termination in {location}", keywords: ["cohabitation", "living together", "alimony termination"], contentType: "guide" },
    { template: "Tax Implications of Alimony in {year}: New Rules", keywords: ["alimony tax", "deduction", "income"], contentType: "news-reaction" },
    
    // Other Family Issues
    { template: "Prenuptial Agreements in {location}: Worth It in {year}?", keywords: ["prenup", "prenuptial", "marriage contract"], contentType: "guide" },
    { template: "Domestic Violence and Protective Orders in {location}", keywords: ["domestic violence", "protective order", "restraining order"], contentType: "guide" },
    { template: "Adoption in {location}: Process and {year} Requirements", keywords: ["adoption", "family expansion", "legal process"], contentType: "guide" },
    { template: "Paternity Cases: Establishing Fatherhood in North Carolina", keywords: ["paternity", "DNA test", "father rights"], contentType: "guide" },
    { template: "Same-Sex Divorce in {location}: Unique Considerations", keywords: ["same-sex divorce", "LGBTQ", "marriage equality"], contentType: "guide" }
  ]
};

// Location variations to add to topics
export const LOCATIONS = [
  'Charlotte',
  'Raleigh',
  'Durham',
  'Greensboro',
  'Winston-Salem',
  'Fayetteville',
  'Cary',
  'Wilmington',
  'Asheville',
  'North Carolina'
];

// Time-based variables for dynamic content
export function getTimeVariables(): Record<string, string> {
  const now = new Date();
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                  'July', 'August', 'September', 'October', 'November', 'December'];
  const seasons = {
    0: 'Winter', 1: 'Winter', 2: 'Spring', 3: 'Spring', 4: 'Spring', 5: 'Summer',
    6: 'Summer', 7: 'Summer', 8: 'Fall', 9: 'Fall', 10: 'Fall', 11: 'Winter'
  };
  
  return {
    year: now.getFullYear().toString(),
    month: months[now.getMonth()] || 'January',
    season: seasons[now.getMonth() as keyof typeof seasons] || 'Winter',
    quarter: `Q${Math.floor(now.getMonth() / 3) + 1}`
  };
}

// Get a random location
export function getRandomLocation(): string {
  return LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)] || 'New York';
}

// Format topic with variables
export function formatTopic(template: string, location?: string): string {
  const vars = getTimeVariables();
  let formatted = template
    .replace(/{year}/g, vars.year)
    .replace(/{month}/g, vars.month)
    .replace(/{season}/g, vars.season)
    .replace(/{location}/g, location || getRandomLocation());
  
  return formatted;
}
