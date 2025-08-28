import * as bcrypt from 'bcryptjs';

/**
 * Hash a password using bcrypt algorithm
 * @param password - The plain text password to hash
 * @returns The hashed password
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

/**
 * Verify a password against a hash
 * @param hash - The password hash
 * @param password - The plain text password to verify
 * @returns Whether the password matches
 */
export async function verifyPassword(hash: string, password: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Check if a password hash needs migration
 * @param hash - The password hash to check
 * @returns Whether the hash needs migration
 */
export function needsPasswordMigration(hash: string): boolean {
  // For now, no migration needed since we're using bcrypt
  return false;
}
