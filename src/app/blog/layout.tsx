export default function BlogLayout({ children }: { children: React.ReactNode }) {
  // Layout components (Header/Footer) are handled by MasterLayout in individual pages
  return <>{children}</>;
}
