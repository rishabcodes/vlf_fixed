import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './locales/en.json';
import esTranslations from './locales/es.json';

export const defaultNS = 'common';
export const resources = {
  en: {
    common: enTranslations,
  },
  es: {
    common: esTranslations,
  },
} as const;

const initOptions = {
  resources,
  lng: 'es',
  fallbackLng: 'es',
  defaultNS,
  ns: ['common'],
  interpolation: {
    escapeValue: false, // React already escapes values
  },
  detection: {
    order: ['cookie', 'navigator', 'htmlTag'],
    caches: ['cookie'],
    cookieName: 'preferred-language',
  },
  react: {
    useSuspense: false, // Disable suspense for SSR
  },
};

i18n.use(LanguageDetector).use(initReactI18next).init(initOptions);

export default i18n;

// Helper function to get translations for server components
export function getTranslations(locale: 'en' | 'es' = 'en') {
  return resources[locale].common;
}

// Type-safe translation keys
export type TranslationKeys = keyof typeof enTranslations;
