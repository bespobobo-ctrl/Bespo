import { useCallback } from 'react';
import useLangStore from '../store/langStore';
import t from '../data/translations';

export const useT = () => {
    const lang = useLangStore((s) => s.lang);

    const tr = useCallback((obj) => {
        if (!obj) return '';
        if (typeof obj === 'string') return obj;
        return obj?.[lang] || obj?.['en'] || '';
    }, [lang]);

    return { tr, lang, t };
};
