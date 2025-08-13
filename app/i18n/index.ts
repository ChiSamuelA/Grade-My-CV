// Main exports for i18n system
export { useTranslation, useLanguageSwitcher } from './hooks';
export { useLanguageStore } from './store';
export type { Language, LanguageStore } from './store';

// Utility functions
export function getLanguageFromPath(pathname: string): 'en' | 'fr' | null {
  if (pathname.startsWith('/fr')) return 'fr';
  if (pathname.startsWith('/en')) return 'en';
  return null;
}

export function getLocalizedPath(pathname: string, language: 'en' | 'fr'): string {
  // Remove existing language prefix
  const cleanPath = pathname.replace(/^\/(en|fr)/, '') || '/';
  
  // Don't add prefix for English (default)
  if (language === 'en') return cleanPath;
  
  // Add French prefix
  return `/fr${cleanPath}`;
}

export const SUPPORTED_LANGUAGES = ['en', 'fr'] as const;

export const LANGUAGE_NAMES = {
  en: 'English',
  fr: 'Français',
} as const;