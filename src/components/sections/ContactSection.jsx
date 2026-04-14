import { motion } from 'framer-motion';
import useSiteStore from '../../store/siteStore';
import { useT } from '../../hooks/useTranslation';
import './ContactSection.css';

const ContactSection = () => {
    const { tr, t } = useT();
    const { aboutSettings } = useSiteStore();

    return (
        <section className="contact-v4" id="contact">
            <div className="container">
                <div className="contact-v4__grid">
                    {/* Left side: Info */}
                    <motion.div
                        className="contact-v4__info"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="contact-v4__index">[ CONTACT_US ]</span>
                        <h2 className="contact-v4__title">Siz bilan aloqadamiz</h2>

                        <div className="contact-v4__items">
                            <div className="contact-v4__item">
                                <label>DO'KON MANZILI</label>
                                <p>{aboutSettings.location}</p>
                            </div>
                            <div className="contact-v4__item">
                                <label>BOG'LANISH</label>
                                <div className="contact-v4__links">
                                    <a href={`tel:${aboutSettings.phone}`} className="c-link">{aboutSettings.phone}</a>
                                    <a href={`mailto:${aboutSettings.email}`} className="c-link">{aboutSettings.email}</a>
                                </div>
                            </div>
                            <div className="contact-v4__item">
                                <label>IJTIMOIY TARMOQLAR</label>
                                <div className="contact-v4__socials">
                                    <a href={aboutSettings.instagram} target="_blank">INSTAGRAM</a>
                                    <span>/</span>
                                    <a href={aboutSettings.telegram} target="_blank">TELEGRAM</a>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right side: Map */}
                    <motion.div
                        className="contact-v4__map-frame"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="map-wrapper">
                            {aboutSettings.mapUrl ? (
                                <iframe
                                    src={aboutSettings.mapUrl}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                ></iframe>
                            ) : (
                                <div className="map-placeholder">MAP_INITIALIZING...</div>
                            )}
                            <div className="map-overlay-glow"></div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
