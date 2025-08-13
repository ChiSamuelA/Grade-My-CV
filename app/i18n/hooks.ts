import { useEffect } from 'react';
import { useLanguageStore } from './store';

export function useTranslation() {
  const { currentLanguage, translations, isInitialized, setLanguage, initializeLanguage } = useLanguageStore();

  // Initialize on first use
  useEffect(() => {
    if (!isInitialized) {
      initializeLanguage();
    }
  }, [isInitialized, initializeLanguage]);

  // Translation function with nested key support
  const t = (key: string, fallback?: string): string => {
    if (!translations || !isInitialized) {
      return fallback || key;
    }

    try {
      const keys = key.split('.');
      let value: any = translations;
      
      for (const k of keys) {
        value = value?.[k];
        if (value === undefined) break;
      }
      
      return typeof value === 'string' ? value : fallback || key;
    } catch (error) {
      console.warn(`Translation error for key "${key}":`, error);
      return fallback || key;
    }
  };

  return {
    t,
    currentLanguage,
    setLanguage,
    isInitialized,
  };
}

// Utility hook for language switching
export function useLanguageSwitcher() {
  const { currentLanguage, setLanguage } = useLanguageStore();

  const switchLanguage = () => {
    const newLang = currentLanguage === 'en' ? 'fr' : 'en';
    setLanguage(newLang);
  };

  const isEnglish = currentLanguage === 'en';
  const isFrench = currentLanguage === 'fr';

  return {
    currentLanguage,
    setLanguage,
    switchLanguage,
    isEnglish,
    isFrench,
  };
}