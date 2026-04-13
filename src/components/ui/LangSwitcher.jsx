import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useLangStore, { LANGUAGES } from '../../store/langStore';
import './LangSwitcher.css';

const LangSwitcher = ({ variant = 'default' }) => {
    const [open, setOpen] = useState(false);
    const lang = useLangStore((s) => s.lang);
    const setLang = useLangStore((s) => s.setLang);
    const ref = useRef(null);

    const currentIndex = LANGUAGES.findIndex((l) => l.code === lang);
    const current = LANGUAGES[currentIndex] || LANGUAGES[0];

    useEffect(() => {
        const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    if (variant === 'sidebar') {
        // Show 3 languages in a vertical list
        // Window of 3 starting from currentIndex (or adjusted so current is visible)
        // For simplicity: [current, next, next-next]
        const displayIndices = [
            currentIndex % LANGUAGES.length,
            (currentIndex + 1) % LANGUAGES.length,
            (currentIndex + 2) % LANGUAGES.length
        ];
        const displayLangs = displayIndices.map(i => LANGUAGES[i]);

        return (
            <div className="lang-switcher lang-switcher--sidebar" ref={ref}>
                <div className="lang-sidebar-list">
                    {displayLangs.map((l, i) => (
                        <button
                            key={l.code}
                            className={`lang-sidebar-item ${l.code === lang ? 'lang-sidebar-item--active' : ''}`}
                            onClick={() => setLang(l.code)}
                        >
                            <span className="lang-sidebar-code">
                                {l.code === 'uz_cyr' ? 'УЗ' : l.code.toUpperCase()}
                            </span>
                            {l.code === lang && <motion.div layoutId="active-dot" className="lang-sidebar-dot" />}
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className={`lang-switcher lang-switcher--${variant}`} ref={ref}>
            <button className="lang-switcher__trigger" onClick={() => setOpen(!open)} id="lang-switcher">
                <span className="lang-switcher__flag">{current.flag}</span>
                <span className="lang-switcher__code">{current.code === 'uz_cyr' ? 'УЗ' : current.code.toUpperCase()}</span>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" className={`lang-switcher__arrow ${open ? 'lang-switcher__arrow--open' : ''}`}>
                    <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="lang-switcher__dropdown"
                        initial={{ opacity: 0, y: -8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.96 }}
                        transition={{ duration: 0.2 }}
                    >
                        {LANGUAGES.map((l) => (
                            <button
                                key={l.code}
                                className={`lang-switcher__option ${l.code === lang ? 'lang-switcher__option--active' : ''}`}
                                onClick={() => { setLang(l.code); setOpen(false); }}
                            >
                                <span>{l.flag}</span>
                                <span>{l.label}</span>
                                {l.code === lang && <span className="lang-switcher__check">✓</span>}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LangSwitcher;
