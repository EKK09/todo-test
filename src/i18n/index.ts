import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enUSResource from './en-US.json';
import zhTWResource from './zh-TW.json';

export enum Lang {
    EN_US = 'en-US',
    ZH_TW = 'zh-TW',
}

export const LANG_OPTION = {
  [Lang.EN_US]: 'English',
  [Lang.ZH_TW]: '中文',
};

const resources = {
  [Lang.EN_US]: {
    translation: enUSResource,
  },
  [Lang.ZH_TW]: {
    translation: zhTWResource,
  },
};

const getDefaultLang = (locale: string): Lang => {
  switch (locale) {
    case Lang.EN_US:
      return Lang.EN_US;

    case Lang.ZH_TW:
      return Lang.ZH_TW;

    default:
      return Lang.EN_US;
  }
};

const locale = window.navigator.language;

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getDefaultLang(locale),
  });

export default i18n;
