import { create } from 'zustand';

const useLangStore = create((set) => ({
    lang: 'en',
    setLang: (lang) => set({ lang }),
}));

export const LANGUAGES = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'uz', label: "O'zbekcha", flag: '🇺🇿' },
    { code: 'uz_cyr', label: 'Ўзбекча', flag: '🇺🇿' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'tj', label: 'Тоҷикӣ', flag: '🇹🇯' },
    { code: 'kz', label: 'Қазақша', flag: '🇰🇿' },
    { code: 'kg', label: 'Кыргызча', flag: '🇰🇬' },
    { code: 'tm', label: 'Türkmen', flag: '🇹🇲' },
    { code: 'zh', label: '中文', flag: '🇨🇳' },
    { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
];

export default useLangStore;
