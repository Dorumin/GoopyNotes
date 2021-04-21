import i18nStorage from './i18nStorage';

import { ChangeLang } from './i18n';

export default class I18nScoped {
    lang: string;
    component: string;
    onChangeLang: ChangeLang;

    constructor(component: string, lang: string, onChangeLang: ChangeLang) {
        this.lang = lang;
        this.component = component;
        this.onChangeLang = onChangeLang;
    }

    msg(message: string) {
        return i18nStorage.get([this.component, this.lang, message]);
    }

    setLang(lang: string) {
        if (lang === this.lang) return;

        this.onChangeLang(lang);
    }
}
