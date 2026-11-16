import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { TOPBAR_CONFIG } from '../config/navigation';

export const LANGUAGES = [
  { code: 'UK', label: 'English (UK)', flag: '🇬🇧', locale: 'en-GB', langCode: 'en' },
  { code: 'AR', label: 'Arabic', flag: '🇸🇦', locale: 'ar-SA', langCode: 'ar' },
  { code: 'PT', label: 'Portuguese (Brazilian)', flag: '🇧🇷', locale: 'pt-BR', langCode: 'pt' },
  { code: 'FR', label: 'French', flag: '🇫🇷', locale: 'fr-FR', langCode: 'fr' },
  { code: 'ES', label: 'Spanish', flag: '🇪🇸', locale: 'es-ES', langCode: 'es' },
  { code: 'RO', label: 'Romanian', flag: '🇷🇴', locale: 'ro-RO', langCode: 'ro' },
  { code: 'PL', label: 'Polish', flag: '🇵🇱', locale: 'pl-PL', langCode: 'pl' },
  { code: 'BN', label: 'Bengali', flag: '🇧🇩', locale: 'bn-BD', langCode: 'bn' },
];

function applyGoogleTranslation(targetLang) {
  if (typeof document === 'undefined') return;

  const hostname = window.location.hostname;
  const isEn = !targetLang || targetLang === 'en';

  const setCookie = (value) => {
    document.cookie = `googtrans=${value}; path=/;`;
    if (hostname && hostname !== 'localhost') {
      document.cookie = `googtrans=${value}; path=/; domain=.${hostname};`;
      document.cookie = `googtrans=${value}; path=/; domain=${hostname};`;
    }
  };

  const clearCookie = () => {
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    if (hostname && hostname !== 'localhost') {
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${hostname};`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${hostname};`;
    }
  };

  if (isEn) {
    clearCookie();
    setCookie('/en/en');
  } else {
    setCookie(`/en/${targetLang}`);
  }

  const triggerCombo = () => {
    const select = document.querySelector('.goog-te-combo');
    if (select) {
      select.value = isEn ? 'en' : targetLang;
      select.dispatchEvent(new Event('change'));
      return true;
    }
    return false;
  };

  if (!triggerCombo()) {
    let retries = 0;
    const interval = setInterval(() => {
      retries += 1;
      if (triggerCombo() || retries >= 10) {
        clearInterval(interval);
      }
    }, 300);
  }
}

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [selectedLanguage, setSelectedLanguageState] = useState(() => {
    try {
      const match = document.cookie.match(/googtrans=\/en\/([a-z]{2})/i);
      const cookieLang = match ? match[1].toLowerCase() : null;
      if (cookieLang && cookieLang !== 'en') {
        const foundByLangCode = LANGUAGES.find((l) => l.langCode?.toLowerCase() === cookieLang);
        if (foundByLangCode) return foundByLangCode;
      }
      const saved = localStorage.getItem('selected_language');
      if (saved) {
        const found = LANGUAGES.find(
          (l) =>
            l.code.toUpperCase() === saved.toUpperCase() ||
            l.label.toLowerCase() === saved.toLowerCase() ||
            l.langCode.toLowerCase() === saved.toLowerCase() ||
            (saved.toUpperCase() === 'EN' && l.code === 'UK')
        );
        if (found) return found;
      }
    } catch {
      // ignore
    }
    const defaultCode = (TOPBAR_CONFIG.location || 'UK').toUpperCase();
    return (
      LANGUAGES.find((l) => l.code === defaultCode || l.langCode === defaultCode.toLowerCase() || (defaultCode === 'EN' && l.code === 'UK')) ||
      LANGUAGES[0]
    );
  });

  const setSelectedLanguage = useCallback((langOrCode) => {
    const langObj =
      typeof langOrCode === 'string'
        ? LANGUAGES.find(
            (l) =>
              l.code.toUpperCase() === langOrCode.toUpperCase() ||
              l.langCode.toUpperCase() === langOrCode.toUpperCase() ||
              (langOrCode.toUpperCase() === 'EN' && l.code === 'UK')
          ) || LANGUAGES[0]
        : langOrCode;

    setSelectedLanguageState(langObj);

    try {
      localStorage.setItem('selected_language', langObj.code);
    } catch {
      // ignore
    }

    if (typeof document !== 'undefined') {
      if (!langObj.langCode || langObj.langCode === 'en') {
        document.documentElement.lang = 'en';
        document.documentElement.classList.remove('translated-ltr', 'translated-rtl');
        if (document.body) document.body.classList.remove('translated-ltr', 'translated-rtl');
      } else if (langObj.locale) {
        document.documentElement.lang = langObj.locale.split('-')[0];
      }
      applyGoogleTranslation(langObj.langCode || 'en');
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('languageChange', { detail: langObj }));
    }
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (selectedLanguage?.langCode && selectedLanguage.langCode !== 'en') {
        document.documentElement.lang = selectedLanguage.langCode;
        applyGoogleTranslation(selectedLanguage.langCode);
      } else {
        document.documentElement.lang = 'en';
        document.documentElement.classList.remove('translated-ltr', 'translated-rtl');
        if (document.body) document.body.classList.remove('translated-ltr', 'translated-rtl');
      }
    }
  }, [selectedLanguage]);

  return (
    <LanguageContext.Provider
      value={{
        selectedLanguage,
        setSelectedLanguage,
        availableLanguages: LANGUAGES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    const defaultCode = (TOPBAR_CONFIG.location || 'UK').toUpperCase();
    const defaultLang =
      LANGUAGES.find((l) => l.code === defaultCode || l.langCode === defaultCode.toLowerCase() || (defaultCode === 'EN' && l.code === 'UK')) ||
      LANGUAGES[0];
    return {
      selectedLanguage: defaultLang,
      setSelectedLanguage: () => {},
      availableLanguages: LANGUAGES,
    };
  }
  return context;
}
