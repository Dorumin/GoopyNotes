import { createContext } from 'react';
import I18nScoped from './i18nScoped';

export type ChangeLang = (lang: string) => void;

export class I18n {
    lang: string;
    onChangeLang?: ChangeLang;

    constructor(lang: string) {
        this.lang = lang;
    }

    for(component: string) {
        return new I18nScoped(component, this.lang, this.onChangeLang);
    }

    setLang(lang: string) {
        if (lang === this.lang) return;

        this.onChangeLang(lang);
    }
}

export const I18nContext = createContext(new I18n('en'));
