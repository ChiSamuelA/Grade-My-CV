import { useTranslation } from './hooks';

// Hook for dynamic meta tags with translations
export function useTranslatedMeta() {
  const { t } = useTranslation();

  const getHomeMeta = () => [
    { title: t('meta.homeTitle') },
    { name: "description", content: t('meta.homeDescription') },
  ];

  const getUploadMeta = () => [
    { title: `${t('common.uploadResume')} | ${t('navbar.appName')}` },
    { name: "description", content: t('meta.homeDescription') },
  ];

  return {
    getHomeMeta,
    getUploadMeta,
  };
}

// Utility function for getting translated meta outside of components
export function getTranslatedMeta(language: 'en' | 'fr', page: string) {
  const translations = {
    en: {
      'meta.homeTitle': 'Grade My CV',
      'meta.homeDescription': 'Get Excellent Feedback For Your Dream Job!',
      'navbar.appName': 'grade my cv',
      'common.uploadResume': 'upload resume',
    },
    fr: {
      'meta.homeTitle': 'Grade My CV',
      'meta.homeDescription': 'Obtenez d\'excellents commentaires pour l\'emploi de vos rêves!',
      'navbar.appName': 'grade my cv',
      'common.uploadResume': 'télécharger CV',
    }
  };

  const t = (key: string) => translations[language][key as keyof typeof translations[typeof language]] || key;

  switch (page) {
    case 'home':
      return [
        { title: t('meta.homeTitle') },
        { name: "description", content: t('meta.homeDescription') },
      ];
    case 'upload':
      return [
        { title: `${t('common.uploadResume')} | ${t('navbar.appName')}` },
        { name: "description", content: t('meta.homeDescription') },
      ];
    default:
      return [
        { title: t('meta.homeTitle') },
        { name: "description", content: t('meta.homeDescription') },
      ];
  }
}