import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useT } from '../../hooks/useTranslation';
import LangSwitcher from '../ui/LangSwitcher';
import useSiteStore from '../../store/siteStore';
import './HeroSection.css';

const HeroSection = () => {
    const { heroSettings } = useSiteStore();
    const slideImages = heroSettings.slides;
    const [currentSlide, setCurrentSlide] = useState(0);
    const { tr, t } = useT();

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slideImages.length);
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 8000);
        return () => clearInterval(timer);
    }, [slideImages.length]);

    // Handle case where slides might be empty or index out of bounds after deletion
    useEffect(() => {
        if (currentSlide >= slideImages.length) {
            setCurrentSlide(0);
        }
    }, [slideImages.length, currentSlide]);

    if (!slideImages || slideImages.length === 0) return null;

    const currentData = slideImages[currentSlide];

    return (
        <section className="hero-v2">
            <div className="hero-v2__bg-decor">
                <span className="hero-v2__bg-text">BESPO</span>
                <div className="hero-v2__bg-mesh" />
            </div>

            <aside className="hero-v2__sidebar">
                <div className="hero-v2__sidebar-lang">
                    <LangSwitcher variant="sidebar" />
                </div>
                <div className="hero-v2__sidebar-social">
                    <div className="hero-v2__social-label">{tr(t.hero.follow)}</div>
                    <div className="hero-v2__social-line" />
                    <div className="hero-v2__social-links">
                        <a href="#" aria-label="Instagram">IG</a>
                        <a href="#" aria-label="Twitter">TW</a>
                    </div>
                </div>
            </aside>

            <div className="hero-v2__content">
                <div className="hero-v2__top-bar">
                    <div className="hero-v2__top-left">
                        <div className="hero-v2__status">
                            <span className="hero-v2__status-dot" />
                            <span className="hero-v2__status-text">ONLINE</span>
                        </div>
                    </div>

                    <div className="hero-v2__top-center">
                        <div className="hero-v2__main-info">
                            <div className="hero-v2__counter-pill">
                                <span className="hero-v2__count-val">{String(currentSlide + 1).padStart(2, '0')}</span>
                                <span className="hero-v2__count-sep">/</span>
                                <span className="hero-v2__count-total">{String(slideImages.length).padStart(2, '0')}</span>
                            </div>
                        </div>
                    </div>

                    <div className="hero-v2__top-right">
                        <div className="hero-v2__header-coll">
                            <AnimatePresence mode="wait">
                                <motion.div key={currentSlide} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}>
                                    <h4 className="hero-v2__header-title">{currentData.subtitle}</h4>
                                    <p className="hero-v2__header-edition">SS26 EDITION • ${currentData.price}</p>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                <div className="hero-v2__center">
                    <div className="hero-v2__image-container">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSlide}
                                initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                                animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                                exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
                                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                                className="hero-v2__image-wrap"
                            >
                                <img src={currentData.image} alt="Collection" className="hero-v2__image" />
                                <div className="hero-v2__image-overlay" />
                            </motion.div>
                        </AnimatePresence>

                        <motion.div
                            className="hero__text-content"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            key={`text-${currentSlide}`}
                        >
                            <span className="hero__subtitle text-label">{currentData.subtitle}</span>
                            <h2 className="hero__title">
                                {currentData.title.split(' ').map((word, i) => (
                                    <span key={i} className="hero__title-word">{word} </span>
                                ))}
                            </h2>
                            <p className="hero__desc">{tr(t.hero.subtitle)}</p>

                            <div className="hero__actions">
                                <Link to="/catalog" className="hero__cta-btn">
                                    <span className="hero__cta-text">
                                        {tr(t.hero.addToCart)} — ${currentData.price}
                                    </span>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="hero-v2__bottom-bar">
                    <div className="hero-v2__bars">
                        {slideImages.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentSlide(i)}
                                className={`hero-v2__bar-item ${currentSlide === i ? 'hero-v2__bar-item--active' : ''}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
