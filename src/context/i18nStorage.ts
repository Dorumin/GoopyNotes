// This module exports a singleton instance of an I18nStorage class
// Singletons are frowned upon, but ehh, they're convenient

// @ts-expect-error We use a Babel plugin that transforms this folder import
// into an object, with the keys as the filename, and value as the JSON
import * as i18nData from '../components/i18n';
import I18nMessage from './i18nMessage';

type ComponentI18n = {
    [lang: string]: Record<string, string>;
};

class I18nStorage {
    data: Record<string, ComponentI18n>;

    constructor(data: Record<string, ComponentI18n>) {
        // console.log(data);

        this.data = data;
    }

    get(path: Array<string>) {
        let data: Record<string, any> = this.data;

        for (const component of path) {
            data = data[component];
        }

        // dipshit `as` casts because typescript is dumb
        return new I18nMessage(data as unknown as string);
    }
}

export default new I18nStorage(i18nData);
