import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useCartStore from '../../store/cartStore';
import NavMenu from './NavMenu';
import { useT } from '../../hooks/useTranslation';
import LangSwitcher from '../ui/LangSwitcher';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const cartCount = useCartStore((s) => s.getCount());
    const toggleCart = useCartStore((s) => s.toggleCart);
    const { tr, t } = useT();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => { setMenuOpen(false); }, [location]);

    const navLinks = [
        { path: '/', label: tr(t.nav.home) },
        { path: '/catalog', label: tr(t.nav.products) },
        { path: '/about', label: tr(t.nav.about) },
    ];

    return (
        <>
            <motion.nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
                initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                <div className="navbar__inner container-wide">
                    <div className="navbar__left">
                        <button className={`navbar__burger ${menuOpen ? 'navbar__burger--open' : ''}`}
                            onClick={() => setMenuOpen(!menuOpen)} id="menu-toggle" aria-label="Toggle menu">
                            <span /><span /><span />
                        </button>
                    </div>
                    <Link to="/" className="navbar__logo">
                        <span className="navbar__logo-accent">B</span><span className="navbar__logo-text">ESPO</span>
                    </Link>
                    <div className="navbar__right">
                        <div className="navbar__links">
                            {navLinks.map((link) => (
                                <Link key={link.path} to={link.path}
                                    className={`navbar__link ${location.pathname === link.path ? 'navbar__link--active' : ''}`}>
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                        <div className="navbar__actions">
                            <LangSwitcher variant="minimal" />

                            <button className="navbar__cart" onClick={toggleCart} id="cart-button" aria-label="Open cart">
                                {tr(t.nav.cart)}
                                {cartCount > 0 && (
                                    <motion.span className="navbar__cart-badge" initial={{ scale: 0 }} animate={{ scale: 1 }} key={cartCount}>
                                        {cartCount}
                                    </motion.span>
                                )}
                            </button>

                            <button className="navbar__search" aria-label="Search" id="search-button">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                                </svg>
                            </button>

                            <Link to="/admin" className="navbar__admin" aria-label="Admin Panel" id="admin-button">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    <circle cx="12" cy="11" r="3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Premium 2026 Menu Overlay */}
            <NavMenu
                isOpen={menuOpen}
                onClose={() => setMenuOpen(false)}
                navLinks={navLinks}
            />
        </>
    );
};

export default Navbar;
