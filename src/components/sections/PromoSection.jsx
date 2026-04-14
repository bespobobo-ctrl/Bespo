import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useT } from '../../hooks/useTranslation';
import './PromoSection.css';

import useSiteStore from '../../store/siteStore';

const PromoSection = () => {
    const { tr, t } = useT();
    const promoSettings = useSiteStore(state => state.promoSettings);

    return (
        <section className="promo-v2" id="promo-section">
            <div className="promo-v2__inner">
                <div className="promo-v2__bg-wrap">
                    <img
                        src={promoSettings.image}
                        alt="Promo Background"
                        className="promo-v2__bg"
                    />
                    <div className="promo-v2__overlay" />
                </div>

                <div className="container promo-v2__container">
                    <motion.div
                        className="promo-v2__content"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="promo-v2__head">
                            <span className="promo-v2__badge">[ {promoSettings.label} ]</span>
                            <div className="promo-v2__line" />
                        </div>

                        <h2 className="promo-v2__title">
                            {promoSettings.title} <br />
                            <span style={{ color: 'var(--color-accent)' }}>-{promoSettings.discount} OFF</span>
                        </h2>

                        <div className="promo-v2__footer">
                            <Link to="/catalog" className="promo-v2__cta">
                                <span className="promo-v2__cta-text">{tr(t.promo.cta)}</span>
                                <div className="promo-v2__cta-circle">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                                    </svg>
                                </div>
                            </Link>

                            <div className="promo-v2__tech-meta">
                                <div className="promo-v2__meta-item">
                                    <span className="promo-v2__meta-label">BATT.</span>
                                    <span className="promo-v2__meta-val">100%</span>
                                </div>
                                <div className="promo-v2__meta-item">
                                    <span className="promo-v2__meta-label">LOC.</span>
                                    <span className="promo-v2__meta-val">SHIBUYA_HQ</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default PromoSection;
