import { NextAuthOptions } from 'next-auth';
import { securityLogger } from '@/lib/safe-logger';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { getPrismaClient, isDatabaseConnected, safeDbOperation } from '@/lib/prisma';
import * as bcrypt from 'bcryptjs';
import { emailService } from '@/services/email.service';
import { env } from '@/lib/env';

// Use a simple console logger in edge runtime
const logger = {
  info: (message: string, ...args: unknown[]) => securityLogger.info(`[INFO] ${message}`, ...args),
  error: (message: string, ...args: unknown[]) =>
    securityLogger.error(`[ERROR] ${message}`, ...args),
  warn: (message: string, ...args: unknown[]) => securityLogger.warn(`[WARN] ${message}`, ...args),
};

// Helper function to get client IP from request headers
function getClientIp(headers?: Record<string, string | string[] | undefined>): string {
  if (!headers) return 'unknown';

  // Check various headers that might contain the IP
  const forwardedFor = headers['x-forwarded-for'];
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, get the first one
    const ips = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor;
    if (!ips) return 'unknown';
    const firstIp = ips.split(',')[0];
    return firstIp ? firstIp.trim() : 'unknown';
  }

  const realIp = headers['x-real-ip'];
  if (realIp) {
    const ip = Array.isArray(realIp) ? realIp[0] : realIp;
    return ip || 'unknown';
  }

  const clientIp = headers['x-client-ip'];
  if (clientIp) {
    const ip = Array.isArray(clientIp) ? clientIp[0] : clientIp;
    return ip || 'unknown';
  }

  return 'unknown';
}

// Create a safe adapter that won't crash if database is unavailable
const createSafeAdapter = () => {
  try {
    const client = getPrismaClient();
    // Check if it's a mock client by checking for specific methods
    if (!client.$queryRaw) {
      logger.warn('Using mock Prisma client, NextAuth adapter disabled');
      return undefined;
    }
    return PrismaAdapter(client);
  } catch (error) {
    logger.error('Failed to create Prisma adapter:', error instanceof Error ? error.message : String(error));
    return undefined;
    }
};

export const authOptions: NextAuthOptions = {
  secret: env.NEXTAUTH_SECRET,
  adapter: createSafeAdapter(),
  providers: [
    // Email/Password authentication
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        // Check if database is connected
        const dbConnected = await isDatabaseConnected();

        if (!dbConnected) {
          logger.warn('Database not available for authentication');
          // Return a mock user in development without database
          if (env.NODE_ENV === 'development' || env.NODE_ENV === 'test') {
            // Check for default dev credentials
            if (
              credentials.email === 'admin@vasquezlaw.com' &&
              credentials.password === 'admin123'
            ) {
              return {
                id: 'dev-admin',
                email: credentials.email,
                name: 'Development Admin',
                role: 'ADMIN',
                language: 'en',
              };
            }
            if (credentials.email === 'test@example.com' && credentials.password === 'test123') {
              return {
                id: 'dev-user',
                email: credentials.email,
                name: 'Test User',
                role: 'CLIENT',
                language: 'en',
              };
            }
          }
          return null;
        }

        try {
          const user = await safeDbOperation(
            async () => {
              const prisma = getPrismaClient();
              return await prisma.user.findUnique({
                where: { email: credentials.email },
              });
            },
            null,
            'user-auth-lookup'
          );

          if (!user || !user.password) {
            throw new Error('User not found');
          }

          // Check password with bcrypt
          let isPasswordValid = false;

          // Check if password is hashed with bcrypt
          if (user.password.startsWith('$2')) {
            isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          } else {
            // Try as plain bcrypt (for older hashes)
            isPasswordValid = await bcrypt.compare(credentials.password, user.password);

            // Password is valid
            if (isPasswordValid && dbConnected) {
              try {
                const newHash = await bcrypt.hash(credentials.password, 10);

                await safeDbOperation(
                  async () => {
                    const prisma = getPrismaClient();
                    return await prisma.user.update({
                      where: { id: user.id },
                      data: { password: newHash },
                    });
                  },
                  null,
                  'password-migration'
                );

                logger.info(`Password updated for user: ${user.email}`);
              } catch (error) {
                logger.warn('Failed to update password:', error instanceof Error ? error.message : String(error));
                // Continue with login even if migration fails
              }
            }
          }

          if (!isPasswordValid) {
            throw new Error('Invalid password');
          }

          logger.info(`User logged in: ${user.email}`);

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            language: user.language,
          };
        } catch (error) {
          logger.error('Authentication error:', error instanceof Error ? error.message : String(error));
          return null;
        }
      },
    }),

    // Google OAuth (only if configured)
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            profile(profile) {
              return {
                id: profile.sub,
                name: profile.name,
                email: profile.email,
                image: profile.picture,
                role: 'CLIENT',
                language: 'en',
              };
            },
          }),
        ]
      : []),
  ],

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/dashboard',
  },

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.language = user.language;
      }

      // Handle OAuth account linking
      if (account && account.provider !== 'credentials') {
        const dbConnected = await isDatabaseConnected();
        if (dbConnected) {
          try {
            const existingUser = await safeDbOperation(
              async () => {
                const prisma = getPrismaClient();
                return await prisma.user.findUnique({
                  where: { email: token.email! },
                });
              },
              null,
              'oauth-user-lookup'
            );

            if (!existingUser) {
              // Create new user from OAuth
              const newUser = await safeDbOperation(
                async () => {
                  const prisma = getPrismaClient();
                  return await prisma.user.create({
                    data: {
                      email: token.email!,
                      name: token.name!,
                      role: 'CLIENT',
                      language: 'en',
                      image: token.picture,
                    },
                  });
                },
                {
                  id: `oauth-${Date.now()}`,
                  email: token.email!,
                  name: token.name!,
                  password: null,
                  image: null,
                  role: 'CLIENT',
                  language: 'en',
                  phone: null,
                  blocked: false,
                  emailVerified: null,
                  lastActive: null,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                },
                'oauth-user-create'
              );
              token.id = newUser.id;
              token.role = newUser.role;
              token.language = newUser.language;
            } else {
              token.id = existingUser.id;
              token.role = existingUser.role;
              token.language = existingUser.language;
            }
          } catch (error) {
            logger.warn('Database error during OAuth linking:', error instanceof Error ? error.message : String(error));
            // Set default values for OAuth users when DB is unavailable
            token.id = `oauth-${token.email}`;
            token.role = 'CLIENT';
            token.language = 'en';
          }
        } else {
          // Database not connected, use defaults
          token.id = `oauth-${token.email}`;
          token.role = 'CLIENT';
          token.language = 'en';
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.language = token.language as string;
      }

      return session;
    },

    async signIn({ user, account }) {
      // Log sign-in attempts
      logger.info(`Sign-in attempt: ${user.email} via ${account?.provider}`);

      // Check if user is blocked
      if (user.email) {
        const dbConnected = await isDatabaseConnected();
        if (dbConnected) {
          const dbUser = await safeDbOperation(
            async () => {
              const prisma = getPrismaClient();
              return await prisma.user.findUnique({
                where: { email: user.email },
              });
            },
            null,
            'blocked-user-check'
          );

          if (dbUser?.blocked) {
            logger.warn(`Blocked user attempted sign-in: ${user.email}`);
            return false;
          }
        }
      }

      return true;
    },
  },

  events: {
    async signIn(message) {
      const { user, account, profile, isNewUser } = message;
      logger.info(`User signed in: ${user.email} via ${account?.provider}`);

      // Track sign-in for analytics
      if (user.id) {
        const dbConnected = await isDatabaseConnected();
        if (dbConnected) {
          // Get IP address from the request headers passed from the route handler
          const headers = (message as { __headers?: Headers }).__headers;
          const clientIp = getClientIp(headers ? Object.fromEntries(headers.entries()) : undefined);

          await safeDbOperation(
            async () => {
              const prisma = getPrismaClient();
              return await prisma.userActivity.create({
                data: {
                  userId: user.id,
                  type: 'SIGN_IN',
                  metadata: {
                    provider: account?.provider,
                    ip: clientIp,
                  },
                },
              });
            },
            null,
            'track-sign-in'
          );
        }
      }
    },

    async signOut({ token }) {
      logger.info(`User signed out: ${token.email}`);
    },

    async createUser({ user }) {
      logger.info(`New user created: ${user.email}`);

      // Send welcome email
      try {
        await emailService.sendEmail({
          to: user.email!,
          subject: 'Welcome to Vasquez Law Firm',
          template: 'user-welcome',
          data: {
            name: user.name || 'Valued Client',
            email: user.email,
          },
        });
        logger.info(`Welcome email sent to: ${user.email}`);
      } catch (error) {
        logger.error('Failed to send welcome email:', error instanceof Error ? error.message : String(error));
        // Don't throw error to prevent user creation from failing
      }
    },

    async linkAccount({ user, account }) {
      logger.info(`Account linked: ${user.email} with ${account.provider}`);
    },

    async session({ token }) {
      // Update last active timestamp
      if (token.id) {
        const dbConnected = await isDatabaseConnected();
        if (dbConnected) {
          await safeDbOperation(
            async () => {
              const prisma = getPrismaClient();
              return await prisma.user.update({
                where: { id: token.id as string },
                data: { lastActive: new Date() },
              });
            },
            null,
            'update-last-active'
          );
        }
      }
    },
  },

  debug: env.NODE_ENV === 'development',
  // Add proper error handling for production
  logger: {
    error: (code, metadata) => {
      logger.error('NextAuth error:', { code, metadata });
    },
    warn: code => {
      logger.warn('NextAuth warning:', code);
    },
    debug: (code, metadata) => {
      if (env.NODE_ENV === 'development') {
        logger.info('NextAuth debug:', { code, metadata });
      }
    },
  },
};

// Type extensions for TypeScript
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      role: string;
      language: string;
    };
  }

  interface User {
    id: string;
    email: string;
    name?: string | null;
    role: string;
    language: string;
    blocked?: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: string;
    language: string;
  }
}
