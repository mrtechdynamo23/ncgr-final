import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// EN namespaces
import enCommon from './en/common.json';
import enOperations from './en/operations.json';
import enTechnology from './en/technology.json';
import enGovernance from './en/governance.json';
import enReporting from './en/reporting.json';
import enKnowledge from './en/knowledge.json';

// AR namespaces
import arCommon from './ar/common.json';
import arOperations from './ar/operations.json';
import arTechnology from './ar/technology.json';
import arGovernance from './ar/governance.json';
import arReporting from './ar/reporting.json';
import arKnowledge from './ar/knowledge.json';

const resources = {
  en: {
    common: enCommon,
    operations: enOperations,
    technology: enTechnology,
    governance: enGovernance,
    reporting: enReporting,
    knowledge: enKnowledge,
  },
  ar: {
    common: arCommon,
    operations: arOperations,
    technology: arTechnology,
    governance: arGovernance,
    reporting: arReporting,
    knowledge: arKnowledge,
  },
};

const savedLanguage = localStorage.getItem('ncgr-language') || 'en';

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage,
  fallbackLng: 'en',
  defaultNS: 'common',
  ns: ['common', 'operations', 'technology', 'governance', 'reporting', 'knowledge'],
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
