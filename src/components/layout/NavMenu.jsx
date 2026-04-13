import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useT } from '../../hooks/useTranslation';
import LangSwitcher from '../ui/LangSwitcher';
import './NavMenu.css';

const menuImages = {
    '/': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800',
    '/catalog': 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=800',
    '/about': 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800',
};

const NavMenu = ({ isOpen, onClose, navLinks }) => {
    const [hoveredPath, setHoveredPath] = useState(null);
    const { tr, t } = useT();
    const location = useLocation();

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="nav-menu">
                    {/* Background Grain/Noise */}
                    <motion.div className="nav-menu__bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />

                    {/* Close Area */}
                    <div className="nav-menu__overlay" onClick={onClose} />

                    <motion.div className="nav-menu__panel"
                        initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>

                        <div className="nav-menu__inner">
                            <div className="nav-menu__grid">
                                {/* Navigation Side */}
                                <div className="nav-menu__nav">
                                    <div className="nav-menu__header">
                                        <span className="nav-menu__label">[{tr(t.nav.home)}]</span>
                                    </div>

                                    <div className="nav-menu__links">
                                        {navLinks.map((link, i) => (
                                            <motion.div key={link.path} className="nav-menu__link-item"
                                                initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.2 + i * 0.1 }}>
                                                <Link to={link.path} className={`nav-menu__link ${location.pathname === link.path ? 'nav-menu__link--active' : ''}`}
                                                    onMouseEnter={() => setHoveredPath(link.path)}
                                                    onMouseLeave={() => setHoveredPath(null)}
                                                    onClick={onClose}>
                                                    <span className="nav-menu__num">0{i + 1}</span>
                                                    <span className="nav-menu__text">{link.label}</span>
                                                    <div className="nav-menu__link-line" />
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </div>

                                    <div className="nav-menu__footer">
                                        <div className="nav-menu__footer-group">
                                            <span className="nav-menu__footer-label">SOCIALS</span>
                                            <div className="nav-menu__socials">
                                                <a href="#">Instagram</a><a href="#">Twitter</a><a href="#">Facebook</a>
                                            </div>
                                        </div>
                                        <div className="nav-menu__footer-group">
                                            <span className="nav-menu__footer-label">LANGUAGE</span>
                                            <LangSwitcher variant="default" />
                                        </div>
                                    </div>
                                </div>

                                {/* Featured Content Side (2026 Trend) */}
                                <div className="nav-menu__featured">
                                    <div className="nav-menu__visual-container">
                                        <AnimatePresence mode="wait">
                                            <motion.div key={hoveredPath || 'default'}
                                                initial={{ opacity: 0, scale: 1.1, rotate: 2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="nav-menu__visual">
                                                <img src={menuImages[hoveredPath] || menuImages['/']} alt="Featured" />
                                                <div className="nav-menu__visual-overlay" />
                                                <div className="nav-menu__visual-text">
                                                    <span>BESPO DESIGN STUDIO</span>
                                                    <span>EST. 2026</span>
                                                </div>
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>

                                    <div className="nav-menu__contact">
                                        <p className="nav-menu__email">INFO@BESPO.COM</p>
                                        <p className="nav-menu__address">TOKYO SHIBUYA, 2-24-12</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Close Button Inside Panel */}
                        <button className="nav-menu__close" onClick={onClose}>
                            <div className="nav-menu__close-circle" />
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default NavMenu;
