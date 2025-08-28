import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Appointment Management - Vasquez Law Firm',
  description: 'Manage your legal appointments with Vasquez Law Firm. View, reschedule, and cancel appointments online.',
};

export default function AppointmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
