import { useContext, useMemo } from "react";
import { I18nContext } from "../context/i18n";

export default function useI18n(component: string) {
    const globalI18n = useContext(I18nContext);

    // Memoize .for call while component and globalI18n don't change
    // `component` should NEVER change, but this is the safe thing to do
    const i18n = useMemo(() => {
        return globalI18n.for(component);
    }, [component, globalI18n]);

    return i18n;
}
