export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  service: string;
  content: string;
  caseType: string;
  language?: 'en' | 'es';
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'M. Rodriguez',
    location: 'Charlotte, NC',
    rating: 5,
    date: 'January 2024',
    service: 'Immigration - Family Petition',
    caseType: 'I-130 Petition',
    content:
      'After waiting for years to bring my wife to the United States, I contacted Vasquez Law Firm. They guided us through the entire I-130 petition process. Their attention to detail and constant communication made all the difference. My wife is finally here with me thanks to their hard work.',
  },
  {
    id: '2',
    name: 'J. Garcia',
    location: 'Raleigh, NC',
    rating: 5,
    date: 'December 2023',
    service: 'Deportation Defense',
    caseType: 'Cancellation of Removal',
    content:
      'I was facing deportation after 15 years in the U.S. Mr. Vasquez personally handled my case and presented a strong argument for cancellation of removal. His knowledge of immigration law and dedication to my case saved my life in America. I can now stay with my children who are U.S. citizens.',
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    location: 'Durham, NC',
    rating: 5,
    date: 'November 2023',
    service: 'Personal Injury',
    caseType: 'Truck Accident',
    content:
      'A commercial truck hit my car on I-85, leaving me with serious injuries. The insurance company offered me pennies. Vasquez Law Firm fought for me and got me a settlement that covered all my medical bills, physical therapy, and lost wages. They truly cared about my recovery.',
  },
  {
    id: '4',
    name: 'A. Martinez',
    location: 'Winston-Salem, NC',
    rating: 5,
    date: 'October 2023',
    service: 'Workers Compensation',
    caseType: 'Construction Injury',
    content:
      'I fell from scaffolding at a construction site and broke my leg. My employer tried to say I was at fault. The attorneys at Vasquez Law Firm proved otherwise and secured my workers comp benefits. They also helped me get additional compensation through a third-party claim against the equipment manufacturer.',
  },
  {
    id: '5',
    name: 'L. Chen',
    location: 'Orlando, FL',
    rating: 5,
    date: 'September 2023',
    service: 'Immigration - Employment',
    caseType: 'EB-2 Green Card',
    content:
      'As a software engineer, I needed help with my EB-2 green card application. The team expertly handled my PERM labor certification and I-140 petition. They made a complex process manageable and kept me informed at every step. I received my green card in record time.',
  },
  {
    id: '6',
    name: 'T. Williams',
    location: 'Charlotte, NC',
    rating: 5,
    date: 'August 2023',
    service: 'Criminal Defense',
    caseType: 'DUI with Immigration Consequences',
    content:
      'I made a mistake and got a DUI, which put my green card at risk. Mr. Vasquez understood both the criminal and immigration aspects of my case. He negotiated a plea that avoided deportation consequences. His dual expertise in criminal and immigration law saved my status.',
  },
  {
    id: '7',
    name: 'P. Hernandez',
    location: 'Smithfield, NC',
    rating: 5,
    date: 'July 2023',
    service: 'Immigration - Asylum',
    caseType: 'Political Asylum',
    content:
      'I fled persecution in my home country and needed asylum. The attorneys at Vasquez Law Firm helped me prepare a detailed case with supporting evidence. They prepared me thoroughly for my interview. I was granted asylum and can now live safely in the United States.',
  },
  {
    id: '8',
    name: 'Robert Davis',
    location: 'Raleigh, NC',
    rating: 5,
    date: 'June 2023',
    service: 'Personal Injury',
    caseType: 'Motorcycle Accident',
    content:
      "After a car pulled out in front of my motorcycle, I was severely injured. The other driver's insurance tried to blame me. Vasquez Law Firm investigated the accident, found witnesses, and proved the other driver was at fault. They got me full compensation for my injuries and bike damage.",
  },
  {
    id: '9',
    name: 'M. Patel',
    location: 'Charlotte, NC',
    rating: 5,
    date: 'May 2023',
    service: 'Immigration - Business',
    caseType: 'L-1A Visa',
    content:
      'I needed to transfer to our U.S. office as an executive. Vasquez Law Firm prepared a comprehensive L-1A petition that was approved without any issues. They also advised on the path to permanent residence through EB-1C. Very knowledgeable about business immigration.',
  },
  {
    id: '10',
    name: 'E. Gonzalez',
    location: 'Orlando, FL',
    rating: 5,
    date: 'April 2023',
    service: 'Immigration - Citizenship',
    caseType: 'N-400 Naturalization',
    content:
      'After being a permanent resident for 5 years, I wanted to become a citizen. The team helped me with my N-400 application and prepared me for the civics test and interview. When I took my oath of citizenship, they celebrated with me. It was a dream come true!',
  },
  {
    id: '11',
    name: 'K. Thompson',
    location: 'Durham, NC',
    rating: 5,
    date: 'March 2023',
    service: 'Personal Injury',
    caseType: 'Slip and Fall',
    content:
      'I slipped on a wet floor at a grocery store with no warning sign. I suffered a back injury that required surgery. Vasquez Law Firm held the store accountable and secured compensation for my medical bills, pain and suffering, and ongoing treatment. They handled everything professionally.',
  },
  {
    id: '12',
    name: 'Carlos M.',
    location: 'Charlotte, NC',
    rating: 5,
    date: 'February 2023',
    service: 'Immigration - VAWA',
    caseType: 'VAWA Self-Petition',
    language: 'es',
    content:
      'Sufrí abuso doméstico y tenía miedo de reportarlo por mi estatus migratorio. Los abogados de Vasquez Law Firm me ayudaron con mi petición VAWA. Me trataron con respeto y compasión durante todo el proceso. Ahora tengo mi green card y estoy libre del abuso.',
  },
  {
    id: '13',
    name: 'D. Brown',
    location: 'Winston-Salem, NC',
    rating: 5,
    date: 'January 2023',
    service: 'Workers Compensation',
    caseType: 'Repetitive Stress Injury',
    content:
      'Years of factory work caused severe carpal tunnel syndrome in both hands. My employer denied it was work-related. Vasquez Law Firm fought for me and proved my case. I received the surgery I needed and compensation for my permanent partial disability.',
  },
  {
    id: '14',
    name: 'V. Nguyen',
    location: 'Raleigh, NC',
    rating: 5,
    date: 'December 2022',
    service: 'Immigration - Investment',
    caseType: 'EB-5 Investor Visa',
    content:
      'I wanted to invest in a business and immigrate to the U.S. The attorneys guided me through the complex EB-5 process, helped me choose a qualifying investment, and prepared all documentation. My family and I now have our green cards and our business is thriving.',
  },
  {
    id: '15',
    name: 'Maria S.',
    location: 'Orlando, FL',
    rating: 5,
    date: 'November 2022',
    service: 'Immigration - U Visa',
    caseType: 'U Visa Crime Victim',
    language: 'es',
    content:
      'Fui víctima de un crimen violento y tenía miedo de ir a la policía por no tener papeles. Vasquez Law Firm me ayudó a obtener una visa U. Me dieron la confianza para cooperar con la policía y ahora tengo un camino hacia la residencia permanente. Están verdaderamente dedicados a ayudar a la comunidad inmigrante.',
  },
];

// Get testimonials by service type
export function getTestimonialsByService(service: string): Testimonial[] {
  return testimonials.filter(t => t.service.toLowerCase().includes(service.toLowerCase()));
}

// Get testimonials by language
export function getTestimonialsByLanguage(language: 'en' | 'es'): Testimonial[] {
  return testimonials.filter(t => (t.language || 'en') === language);
}

// Get recent testimonials
export function getRecentTestimonials(count: number = 5): Testimonial[] {
  return testimonials.slice(0, count);
}

// Get testimonials for homepage
export function getHomepageTestimonials(): Testimonial[] {
  // Return a diverse set of testimonials for the homepage
  return [
    testimonials.find(t => t.caseType === 'I-130 Petition')!,
    testimonials.find(t => t.caseType === 'Truck Accident')!,
    testimonials.find(t => t.caseType === 'Cancellation of Removal')!,
    testimonials.find(t => t.caseType === 'Construction Injury')!,
    testimonials.find(t => t.caseType === 'N-400 Naturalization')!,
  ].filter(Boolean);
}
