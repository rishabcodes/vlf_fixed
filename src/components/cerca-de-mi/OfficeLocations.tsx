'use client';

import React from 'react';

import { MapPin, Phone, Clock, Navigation } from 'lucide-react';

interface OfficeLocationsProps {
  city: string;
  language?: 'en' | 'es';
}

interface Office {
  name: string;
  address: string;
  phone: string;
  hours: string;
  distance?: string;
  mapUrl: string;
}

export default function OfficeLocations({ city, language = 'en' }: OfficeLocationsProps) {
  // Office data with distances calculated from major NC cities
  const offices: Office[] = [
    {
      name: language === 'es' ? 'Oficina Principal de Charlotte' : 'Charlotte Main Office',
      address: '3500 Cameron Blvd, Charlotte, NC 28211',
      phone: '(704) 555-0123',
      hours: '24/7',
      mapUrl: 'https://maps.google.com/?q=3500+Cameron+Blvd+Charlotte+NC+28211',
    },
    {
      name: language === 'es' ? 'Oficina de Raleigh' : 'Raleigh Office',
      address: '1234 Main St, Raleigh, NC 27601',
      phone: '(919) 555-0123',
      hours: language === 'es' ? 'Lun-Vie 9AM-6PM' : 'Mon-Fri 9AM-6PM',
      mapUrl: 'https://maps.google.com/?q=1234+Main+St+Raleigh+NC+27601',
    },
    {
      name: language === 'es' ? 'Oficina de Durham' : 'Durham Office',
      address: '567 Duke St, Durham, NC 27701',
      phone: '(919) 555-0124',
      hours: language === 'es' ? 'Lun-Vie 8AM-5PM' : 'Mon-Fri 8AM-5PM',
      mapUrl: 'https://maps.google.com/?q=567+Duke+St+Durham+NC+27701',
    },
  ];

  // Calculate approximate distances based on city
  const cityDistances: Record<string, Record<string, string>> = {
    Charlotte: {
      'Charlotte Main Office': '0 miles',
      'Raleigh Office': '165 miles',
      'Durham Office': '140 miles',
    },
    Raleigh: {
      'Charlotte Main Office': '165 miles',
      'Raleigh Office': '0 miles',
      'Durham Office': '25 miles',
    },
    Durham: {
      'Charlotte Main Office': '140 miles',
      'Raleigh Office': '25 miles',
      'Durham Office': '0 miles',
    },
    Greensboro: {
      'Charlotte Main Office': '90 miles',
      'Raleigh Office': '80 miles',
      'Durham Office': '55 miles',
    },
    'Winston-Salem': {
      'Charlotte Main Office': '80 miles',
      'Raleigh Office': '105 miles',
      'Durham Office': '80 miles',
    },
    Fayetteville: {
      'Charlotte Main Office': '130 miles',
      'Raleigh Office': '65 miles',
      'Durham Office': '90 miles',
    },
    Cary: {
      'Charlotte Main Office': '160 miles',
      'Raleigh Office': '10 miles',
      'Durham Office': '30 miles',
    },
    Wilmington: {
      'Charlotte Main Office': '200 miles',
      'Raleigh Office': '130 miles',
      'Durham Office': '155 miles',
    },
    'High Point': {
      'Charlotte Main Office': '95 miles',
      'Raleigh Office': '85 miles',
      'Durham Office': '60 miles',
    },
    Concord: {
      'Charlotte Main Office': '20 miles',
      'Raleigh Office': '145 miles',
      'Durham Office': '120 miles',
    },
  };

  // Add distances to offices based on current city
  const officesWithDistance = offices.map(office => ({
    ...office,
    distance:
      cityDistances[city]?.[
        office.name.split(' ')[0] + ' ' + (office.name.includes('Main') ? 'Main Office' : 'Office')
      ] || 'Distance varies',
  }));

  // Sort by distance (closest first)
  const sortedOffices = [...officesWithDistance].sort((a, b) => {
    const distA = parseInt(a.distance) || 999;
    const distB = parseInt(b.distance) || 999;
    return distA - distB;
  });

  const t =
    language === 'es'
      ? {
          title: 'Oficinas Cerca de Ti',
          subtitle: `Encuentra la oficina más conveniente en ${city}`,
          getDirections: 'Obtener Direcciones',
          call: 'Llamar',
          hours: 'Horario',
          distance: 'Distancia',
          features: [
            'Estacionamiento Gratuito',
            'Accesible para Sillas de Ruedas',
            'Personal Bilingüe',
            'Consultas Sin Cita',
          ],
        }
      : {
          title: 'Office Locations',
          subtitle: `Find the most convenient office near ${city}`,
          getDirections: 'Get Directions',
          call: 'Call',
          hours: 'Hours',
          distance: 'Distance',
          features: [
            'Free Parking',
            'Wheelchair Accessible',
            'Bilingual Staff',
            'Walk-ins Welcome',
          ],
        };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div
className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.title}</h2>
          <p className="text-gray-600">{t.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {sortedOffices.map((office, index) => (
            <div
              key={index}

                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Distance Badge */}
              {office.distance !== 'Distance varies' && (
                <div className="bg-[#6B1F2E] text-white px-4 py-2 text-center">
                  <span className="text-sm font-semibold">
                    {office.distance} from {city}
                  </span>
                </div>
              )}

              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">{office.name}</h3>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#6B1F2E] flex-shrink-0 mt-0.5" />
                    <p className="text-gray-600">{office.address}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#6B1F2E] flex-shrink-0" />
                    <a
                      href={`tel:${office.phone.replace(/[^0-9]/g, '')}`}

                className="text-[#6B1F2E] font-semibold hover:underline"
                    >
                      {office.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[#6B1F2E] flex-shrink-0" />
                    <p className="text-gray-600">
                      {t.hours}: {office.hours}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <a
                    href={office.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#6B1F2E] text-white font-semibold rounded-lg hover:bg-[#8B2635] transition-colors"
                  >
                    <Navigation className="w-4 h-4" />
                    {t.getDirections}
                  </a>

                  <a
                    href={`tel:${office.phone.replace(/[^0-9]/g, '')}`}

                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-[#6B1F2E] font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    {t.call}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Office Features */}
        <div
className="bg-white rounded-lg shadow-lg p-6"
        >
          <h3 className="text-xl font-bold mb-4 text-center">
            {language === 'es' ? 'En Todas Nuestras Oficinas' : 'At All Our Offices'}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {t.features.map((feature, index) => (
              <div key={index}

                className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span
                className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
