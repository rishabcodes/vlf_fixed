import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NC Equipment Accident Workers Comp Abogado | Machinery Injury Abogado',
  description:
    'Injured by workplace equipment in North Carolina? Our workers comp attorneys fight for maximum benefits for forklift, crane, and industrial accidents.',
  keywords: [
    'equipment accident lawyer NC',
    'machinery injury workers comp attorney',
    'forklift accident lawyer',
    'crane accident workers compensation',
    'industrial equipment injury NC',
    'workplace machinery accident attorney',
  ],
};

export default function EquipmentAccidentsPage() {
  return (
    <PracticeAreaWrapper
      practiceArea="workers-compensation"
      subArea="equipment-accidents"
      language="en"
    />
  );
}
