import { motion } from 'framer-motion';
import { useT } from '../../hooks/useTranslation';
import './MaterialSection.css';

const MaterialSection = () => {
    const { tr, t } = useT();

    return (
        <section className="material-v2" id="material-section">
            <div className="material-v2__grid-lines">
                <div className="material-v2__line material-v2__line--v" />
                <div className="material-v2__line material-v2__line--h" />
            </div>

            <div className="container material-v2__container">
                <div className="material-v2__content">
                    <motion.div
                        className="material-v2__left"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="material-v2__tag">[ TECH-SPEC / 2026 ]</span>
                        <h2 className="material-v2__headline">{tr(t.material.headline)}</h2>
                        <div className="material-v2__details">
                            <p className="material-v2__desc">
                                We prioritize organic sources and technical precision in every fiber.
                                Each garment undergoes a multi-layer verification process for density and durability.
                            </p>
                            <a href="#" className="material-v2__cta-btn">
                                <span>{tr(t.material.readMore)}</span>
                                <div className="material-v2__cta-arrow">→</div>
                            </a>
                        </div>
                    </motion.div>

                    <div className="material-v2__right">
                        <div className="material-v2__stats">
                            {[
                                { val: '85%', label: tr(t.material.cotton), code: 'ORG-CTN', desc: 'Grade-A Organic Long Staple' },
                                { val: '15%', label: tr(t.material.polyester), code: 'RCY-PLY', desc: 'Recycled Ocean Plastic Polymer' }
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    className="material-v2__stat-row"
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <div className="material-v2__stat-header">
                                        <div className="material-v2__stat-label-wrap">
                                            <span className="material-v2__stat-code">{stat.code}</span>
                                            <span className="material-v2__stat-label">{stat.label}</span>
                                        </div>
                                        <span className="material-v2__stat-val">{stat.val}</span>
                                    </div>
                                    <div className="material-v2__stat-bar-bg">
                                        <motion.div
                                            className="material-v2__stat-bar-fill"
                                            initial={{ width: 0 }}
                                            whileInView={{ width: stat.val }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.5 + i * 0.2, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                                        >
                                            <div className="material-v2__stat-bar-glow" />
                                        </motion.div>
                                    </div>
                                    <p className="material-v2__stat-desc">{stat.desc}</p>
                                </motion.div>
                            ))}
                        </div>

                        <div className="material-v2__badges">
                            {[
                                { icon: '🚚', text: tr(t.material.freeDelivery) },
                                { icon: '🇯🇵', text: tr(t.material.madeIn) },
                                { icon: '↩️', text: tr(t.material.easyReturns) }
                            ].map((b, i) => (
                                <motion.div
                                    key={i}
                                    className="material-v2__badge"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 + i * 0.1 }}
                                >
                                    <span className="material-v2__badge-icon">{b.icon}</span>
                                    <span className="material-v2__badge-text">{b.text}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MaterialSection;
