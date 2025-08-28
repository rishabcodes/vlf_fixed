import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

// Force Node.js runtime for this route as NextAuth requires it
export const runtime = 'nodejs';
// Mark this route as dynamic to prevent static generation
// Create the NextAuth handler
const handler = NextAuth(authOptions);

// Export as named exports for the app router
export { handler as GET, handler as POST };
