import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-xhr-backend'
const localStorage = window.localStorage
const defaultLanguage = localStorage.getItem('language')

i18n
  // learn more: https://github.com/i18next/i18next-xhr-backend
  .use(Backend)
  // connect with React
  .use(initReactI18next)
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    lng: 'cn',
    fallbackLng: 'cn',
    whitelist: [
      'en',
      'cn',
      'ja',
      'de',
      'es',
      'fr',
      'ko',
      'it',
      'pl',
      'ru',
      'vi'
    ],
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },
    backend: {
      loadPath:
        (process.env.REACT_APP_IPFS === 'True' ? '.' : '') +
        '/locales/{{lng}}.json'
    }
  })

export default i18n
