import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';
export const metadata: Metadata = {
  title: 'Product Liability | Vasquez Law Firm',
  description: 'Claims for injuries caused by defective products',
  keywords: 'product liability, personal injury, legal services, attorney, lawyer',
};

export default function ProductLiabilityPage() {
  return (
    <PracticeAreaWrapper practiceArea="personal-injury" subArea="product-liability" language="en" />
  );
}
