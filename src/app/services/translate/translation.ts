import { InjectionToken } from '@angular/core';

// import translations
import { LANG_ZH_CN_NAME, LANG_ZH_CN_TRANS } from './lang-zh-cn';
import { LANG_ZH_HK_NAME, LANG_ZH_HK_TRANS } from './lang-zh-hk';
import { LANG_EN_NAME, LANG_EN_TRANS } from './lang-en';
// translation token
export const TRANSLATIONS = new InjectionToken('translations');

// all translations
export const dictionary = {
    [LANG_ZH_CN_NAME]: LANG_ZH_CN_TRANS,
    [LANG_ZH_HK_NAME]: LANG_ZH_HK_TRANS,
    [LANG_EN_NAME]: LANG_EN_TRANS,
};

// providers
export const TRANSLATION_PROVIDERS = [
    { provide: TRANSLATIONS, useValue: dictionary },
];
