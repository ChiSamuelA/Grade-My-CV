import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import enTranslations from './translations/en.json';
import frTranslations from './translations/fr.json';

export type Language = 'en' | 'fr';

export interface LanguageStore {
  currentLanguage: Language;
  translations: Record<string, any>;
  isInitialized: boolean;
  setLanguage: (lang: Language) => void;
  initializeLanguage: () => void;
}

const translationsMap = {
  en: enTranslations,
  fr: frTranslations,
};

// Get browser language with fallback
const getBrowserLanguage = (): Language => {
  if (typeof window === 'undefined') return 'en';
  
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('fr')) return 'fr';
  return 'en';
};

// Get initial language synchronously
const getInitialLanguage = (): Language => {
  if (typeof window === 'undefined') return 'en';
  
  try {
    const stored = localStorage.getItem('language-store');
    if (stored) {
      const parsed = JSON.parse(stored);
      const lang = parsed?.state?.currentLanguage;
      if (lang && (lang === 'en' || lang === 'fr')) {
        return lang;
      }
    }
  } catch (error) {
    console.warn('Failed to parse stored language:', error);
  }
  
  return getBrowserLanguage();
};

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set, get) => ({
      currentLanguage: getInitialLanguage(),
      translations: translationsMap[getInitialLanguage()],
      isInitialized: false,

      setLanguage: (lang: Language) => {
        set({
          currentLanguage: lang,
          translations: translationsMap[lang],
        });
      },

      initializeLanguage: () => {
        const currentLang = get().currentLanguage;
        set({
          isInitialized: true,
          translations: translationsMap[currentLang],
        });
      },
    }),
    {
      name: 'language-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        currentLanguage: state.currentLanguage 
      }),
    }
  )
);