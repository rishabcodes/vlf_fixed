import { headers } from 'next/headers';

export async function getServerLanguage(): Promise<'en' | 'es'> {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';

  // Check if the pathname starts with /es
  if (pathname.startsWith('/es')) {
    return 'es';
  }

  // Check for preferred language cookie
  const cookieHeader = headersList.get('cookie') || '';
  const preferredLangMatch = cookieHeader.match(/preferred-language=(\w+)/);
  if (preferredLangMatch && preferredLangMatch[1] === 'es') {
    return 'es';
  }

  // Default to Spanish
  return 'es';
}
