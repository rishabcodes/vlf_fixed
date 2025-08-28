export interface OfficeLocation {
  id: string;
  name: string;
  city: string;
  state: string;
  address: string;
  fullAddress: string;
  lat: number;
  lng: number;
  phone: string;
  fax?: string;
  hours: string;
  mapUrl: string;
  slug: string;
  image?: string; // Static image path (for backward compatibility)
  imageId?: string; // Database image ID
}

export const officeLocations: OfficeLocation[] = [
  {
    id: 'smithfield',
    name: 'Vasquez Law Firm - Smithfield',
    city: 'Smithfield',
    state: 'NC',
    address: '612 S Brightleaf Blvd',
    fullAddress: '612 S Brightleaf Blvd, Smithfield, NC 27577',
    lat: 35.5085,
    lng: -78.3394,
    phone: '(919) 989-3000',
    fax: '(919) 261-1707',
    hours: 'Mon-Fri: 8:30 AM - 5:30 PM, Sat: 9:00 AM - 2:00 PM',
    mapUrl: 'https://maps.google.com/?q=612+S+Brightleaf+Blvd+Smithfield+NC+27577',
    slug: 'smithfield-office-location',
    image: '/images/offices/smithfield-office.jpg',
    imageId: 'cmeublo88000vsfmzxlg2enmk', // smithfield-office.jpg
  },
  {
    id: 'raleigh',
    name: 'Vasquez Law Firm - Raleigh',
    city: 'Raleigh',
    state: 'NC',
    address: '4426 Louisburg Road',
    fullAddress: '4426 Louisburg Road, Raleigh, NC 27616',
    lat: 35.8438,
    lng: -78.7206,
    phone: '(919) 533-7000',
    fax: '(919) 261-1707',
    hours: 'Mon-Fri: 8:30 AM - 5:30 PM, Sat: 9:00 AM - 2:00 PM',
    mapUrl: 'https://maps.google.com/?q=4426+Louisburg+Road+Raleigh+NC+27616',
    slug: 'raleigh-nc-office-location',
    image: '/images/offices/raleigh-office.jpg',
    imageId: 'cmeublnbz000tsfmzuejkqrqj', // raleigh-office.jpg
  },
  {
    id: 'charlotte',
    name: 'Vasquez Law Firm - Charlotte',
    city: 'Charlotte',
    state: 'NC',
    address: '5701 Executive Center Dr, Ste 103',
    fullAddress: '5701 Executive Center Dr, Ste 103, Charlotte, NC 28212',
    lat: 35.2271,
    lng: -80.8431,
    phone: '(704) 533-7000',
    fax: '(704) 800-6779',
    hours: 'Mon-Fri: 8:00 AM - 5:00 PM',
    mapUrl: 'https://maps.google.com/?q=5701+Executive+Center+Dr+Charlotte+NC+28212',
    slug: 'charlotte-nc-office-location',
    image: '/images/offices/charlotte-office.jpg',
    imageId: 'cmeubllhu000psfmzxf2ssygx', // charlotte-office.jpg
  },
  {
    id: 'orlando',
    name: 'Vasquez Law Firm - Orlando',
    city: 'Orlando',
    state: 'FL',
    address: '1111 E Amelia Street',
    fullAddress: '1111 E Amelia Street, Orlando, FL 32803',
    lat: 28.5383,
    lng: -81.3792,
    phone: '(407) 955-5000',
    hours: 'Mon-Fri: 9:00 AM - 6:00 PM',
    mapUrl: 'https://maps.google.com/?q=1111+E+Amelia+Street+Orlando+FL+32803',
    slug: 'orlando-fl-office-location',
    image: '/images/offices/orlando-office.jpg',
    imageId: 'cmeublmet000rsfmzurgsnwmb', // orlando-office.jpg
  },
];

export const getOfficeBySlug = (slug: string): OfficeLocation | undefined => {
  return officeLocations.find(office => office.slug === slug);
};

export const getOfficeById = (id: string): OfficeLocation | undefined => {
  return officeLocations.find(office => office.id === id);
};
