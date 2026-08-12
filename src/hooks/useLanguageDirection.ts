import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Hook to manage language direction (LTR/RTL) based on current i18n language.
 * Updates <html> dir and lang attributes.
 */
export const useLanguageDirection = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', i18n.language);
    localStorage.setItem('ncgr-language', i18n.language);
  }, [i18n.language]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  return {
    language: i18n.language,
    isRTL: i18n.language === 'ar',
    toggleLanguage,
  };
};
