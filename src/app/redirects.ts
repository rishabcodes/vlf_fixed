// Redirect configuration for removed duplicate pages
export const redirects = [
  // Spanish practice areas
  { source: '/compensacion-laboral', destination: '/es/areas-de-practica/compensacion-laboral', permanent: true },
  { source: '/defensa-criminal', destination: '/es/areas-de-practica/defensa-criminal', permanent: true },
  { source: '/derecho-familia', destination: '/es/areas-de-practica/derecho-familia', permanent: true },
  { source: '/inmigracion', destination: '/es/areas-de-practica/inmigracion', permanent: true },
  { source: '/lesiones-personales', destination: '/es/areas-de-practica/lesiones-personales', permanent: true },
  
  // Payment pages
  { source: '/make-payment', destination: '/payment', permanent: true },
  { source: '/hacer-pago', destination: '/es/pago', permanent: true },
  { source: '/es/make-payment', destination: '/es/pago', permanent: true },
  { source: '/es/payment', destination: '/es/pago', permanent: true },
  
  // Appointment pages
  { source: '/es/appointments/:path*', destination: '/es/appointment/:path*', permanent: true },
  
  // Category pages
  { source: '/es/criminal-defense/:path*', destination: '/es/areas-de-practica/defensa-criminal/:path*', permanent: true },
  { source: '/es/immigration/:path*', destination: '/es/areas-de-practica/inmigracion/:path*', permanent: true },
  { source: '/es/family-law/:path*', destination: '/es/areas-de-practica/derecho-familia/:path*', permanent: true },
  { source: '/es/personal-injury/:path*', destination: '/es/areas-de-practica/lesiones-personales/:path*', permanent: true },
  { source: '/es/workers-compensation/:path*', destination: '/es/areas-de-practica/compensacion-laboral/:path*', permanent: true },
];
