import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useT } from '../../hooks/useTranslation';
import useSiteStore from '../../store/siteStore';
import './AboutSection.css';

const AboutSection = () => {
    const { tr, t } = useT();
    const aboutSettings = useSiteStore(state => state.aboutSettings);
    const sectionRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const yVal1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const yVal2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const opacityVal = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section className="about-v3" id="about-section" ref={sectionRef}>
            <motion.div className="about-v3__bg-text" style={{ y: yVal1, opacity: 0.03 }}>
                {aboutSettings.title}
            </motion.div>

            <div className="container about-v3__container">
                <div className="about-v3__main-grid">
                    {/* Left: Dramatic Typography */}
                    <motion.div
                        className="about-v3__text-content"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="about-v3__subheading-wrap">
                            <span className="about-v3__index">[ 01 ]</span>
                            <span className="about-v3__tagline">ESTABLISHED — 2026</span>
                        </div>

                        <h2 className="about-v3__title">
                            {tr(t.about.title).split(' ').map((word, i) => (
                                <span key={i} className="about-v3__title-word">{word}</span>
                            ))}
                        </h2>

                        <div className="about-v3__content-body">
                            <h3 className="about-v3__headline">{tr(t.about.p1)}</h3>
                            <div className="about-v3__divider" />
                            <p className="about-v3__description">{tr(t.about.p2)}</p>

                            <div className="about-v3__specs">
                                <div className="about-v3__spec-item">
                                    <span className="about-v3__spec-label">LOCATION</span>
                                    <span className="about-v3__spec-val">{aboutSettings.location}</span>
                                </div>
                                <div className="about-v3__spec-item">
                                    <span className="about-v3__spec-label">CRAFT</span>
                                    <span className="about-v3__spec-val">{aboutSettings.craft}</span>
                                </div>
                            </div>

                            <a href="#catalog" className="about-v3__link">
                                <span>{tr(t.hero.readMore)}</span>
                                <div className="about-v3__link-dot" />
                            </a>
                        </div>
                    </motion.div>

                    {/* Right: Asymmetric Image Composition */}
                    <div className="about-v3__visuals">
                        <motion.div
                            className="about-v3__img-frame about-v3__img-frame--large"
                            style={{ y: yVal2 }}
                        >
                            <img
                                src={aboutSettings.image1}
                                alt="Editorial 1"
                                className="about-v3__image"
                            />
                            <div className="about-v3__img-caption">[ 35.6580° N, 139.7016° E ]</div>
                        </motion.div>

                        <motion.div
                            className="about-v3__img-frame about-v3__img-frame--small"
                            style={{ y: yVal1 }}
                        >
                            <img
                                src={aboutSettings.image2}
                                alt="Editorial 2"
                                className="about-v3__image"
                            />
                            <div className="about-v3__float-badge">PREMIUM</div>
                        </motion.div>

                        <div className="about-v3__accent-box" />
                    </div>
                </div>
            </div>

            {/* Bottom Marquee Line */}
            <div className="about-v3__footer-line">
                <div className="about-v3__footer-inner">
                    <span>DESIGNED IN JAPAN</span>
                    <span className="dot">•</span>
                    <span>MADE FOR THE WORLD</span>
                    <span className="dot">•</span>
                    <span>SINCE 2026</span>
                    <span className="dot">•</span>
                    <span>BESPO STUDIO</span>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
