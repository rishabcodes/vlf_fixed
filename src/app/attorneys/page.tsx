import { Metadata } from 'next';
import AttorneysPageWrapper from '@/components/AttorneysPageWrapper';
export const metadata: Metadata = {
  title: 'Our Attorneys | Immigration & Personal Injury Lawyers | Vasquez Law Firm',
  description:
    'Meet our experienced team of attorneys specializing in immigration law, personal injury, workers compensation, and criminal defense. Serving NC & FL.',
  keywords:
    'immigration attorney, personal injury lawyer, workers compensation attorney, criminal defense lawyer, North Carolina attorneys, Florida lawyers',
};

export default function AttorneysPage() {
  return (
    <AttorneysPageWrapper language="en" />
  );
}
