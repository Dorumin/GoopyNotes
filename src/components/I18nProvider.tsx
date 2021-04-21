import { ReactNode, useState } from 'react';

import { I18nContext, I18n } from '../context/i18n';

type I18nProviderProps = {
    children: ReactNode
};

export default function I18nProvider({ children }: I18nProviderProps) {
    const [i18n, setI18n] = useState(() => {
        return new I18n('en');
    });

    // This must be run after every re-render
    // As `i18n` is a state variable
    // So the init closure is not appropriate and onChangeLang will not be set
    i18n.onChangeLang = lang => setI18n(new I18n(lang));

    return (
        <I18nContext.Provider value={i18n}>
            {children}
        </I18nContext.Provider>
    );
}
