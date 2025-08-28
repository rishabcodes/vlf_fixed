import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Emergency Vehicle Accident Abogado NC | Fire Truck, Ambulance & Police Car Accidents',
  description:
    'Injured in an accident with an ambulance, fire truck, or police car in North Carolina? Our emergency vehicle accident attorneys fight for maximum compensation.',
  keywords: [
    'emergency vehicle accident lawyer NC',
    'ambulance accident attorney North Carolina',
    'fire truck accident lawyer',
    'police car accident attorney',
    'emergency vehicle collision NC',
    'Charlotte emergency vehicle lawyer',
  ],
  openGraph: {
    title: 'NC Emergency Vehicle Accident Abogado | Ambulance & Fire Truck Accidents',
    description:
      'Injured by an emergency vehicle? Get experienced legal representation for accidents involving ambulances, fire trucks, and police cars.',
    images: [
      {
        url: '/images/emergency-vehicle-accidents-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Emergency Vehicle Accident Abogado North Carolina',
      },
    ],
  },
};

export default function EmergencyVehicleAccidentsPage() {
  return (
    <PracticeAreaWrapper
      practiceArea="personal-injury"
      subArea="emergency-vehicle-accidents"
      language="en"
    />
  );
}
