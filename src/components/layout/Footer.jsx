import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useT } from '../../hooks/useTranslation';
import useSiteStore from '../../store/siteStore';
import Marquee from './Marquee';
import './Footer.css';

const Footer = () => {
    const { tr, t } = useT();
    const { aboutSettings } = useSiteStore();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <footer className="footer-v2">
            <div className="footer-v2__marquee"><Marquee variant="large" /></div>

            <div className="container footer-v2__container">
                <motion.div
                    className="footer-v2__grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {/* Brand Info */}
                    <motion.div className="footer-v2__col footer-v2__col--brand" variants={itemVariants}>
                        <Link to="/" className="footer-v2__logo">
                            <span className="accent">B</span>ESPO
                        </Link>
                        <p className="footer-v2__tagline">{tr(t.footer.tagline)}</p>
                        <div className="footer-v2__social">
                            <a href={aboutSettings.instagram} target="_blank" rel="noreferrer" className="footer-v2__social-link" aria-label="Instagram">IG</a>
                            <a href={aboutSettings.telegram} target="_blank" rel="noreferrer" className="footer-v2__social-link" aria-label="Telegram">TG</a>
                            <a href="#" className="footer-v2__social-link" aria-label="Pinterest">PI</a>
                        </div>
                    </motion.div>

                    {/* Navigation */}
                    <motion.div className="footer-v2__col" variants={itemVariants}>
                        <h4 className="footer-v2__col-title text-label">{tr(t.footer.quickLinks)}</h4>
                        <nav className="footer-v2__links">
                            <Link to="/">{tr(t.nav.home)}</Link>
                            <Link to="/catalog">{tr(t.nav.products)}</Link>
                            <Link to="/about">{tr(t.nav.about)}</Link>
                            <a href="#">{tr(t.footer.faq)}</a>
                        </nav>
                    </motion.div>

                    {/* Info */}
                    <motion.div className="footer-v2__col" variants={itemVariants}>
                        <h4 className="footer-v2__col-title text-label">{tr(t.footer.madeInfo)}</h4>
                        <nav className="footer-v2__links">
                            <a href="#">{tr(t.footer.shipping)}</a>
                            <a href="#">{tr(t.footer.returns)}</a>
                            <a href="#">{tr(t.footer.sizeGuide)}</a>
                            <a href="#">{tr(t.footer.terms)}</a>
                        </nav>
                    </motion.div>

                    {/* Newsletter */}
                    <motion.div className="footer-v2__col footer-v2__col--newsletter" variants={itemVariants}>
                        <h4 className="footer-v2__col-title text-label">{tr(t.footer.newsletter)}</h4>
                        <p className="footer-v2__newsletter-desc">{tr(t.footer.newsletterDesc)}</p>
                        <form className="footer-v2__form" onSubmit={(e) => e.preventDefault()}>
                            <div className="footer-v2__input-wrap">
                                <input type="email" placeholder={tr(t.footer.yourEmail)} className="footer-v2__input" />
                                <button type="submit" className="footer-v2__submit-btn">→</button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>

                {/* Back to Top Floating Action */}
                <div className="footer-v2__scroll-up" onClick={scrollToTop}>
                    <div className="footer-v2__scroll-text">BACK TO TOP</div>
                    <div className="footer-v2__scroll-line" />
                </div>

                <div className="footer-v2__bottom">
                    <div className="footer-v2__bottom-left">
                        <p className="footer-v2__copy">{tr(t.footer.copyright)}</p>
                        <span className="footer-v2__location">TOKYO / GLOBAL</span>
                    </div>
                    <div className="footer-v2__bottom-right">
                        <Link to="/admin" className="admin-link">ADMIN</Link>
                        <span className="dot">•</span>
                        <a href="#">{tr(t.footer.privacy)}</a>
                        <span className="dot">•</span>
                        <a href="#">{tr(t.footer.terms)}</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

