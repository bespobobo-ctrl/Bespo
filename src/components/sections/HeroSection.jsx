import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useT } from '../../hooks/useTranslation';
import useSiteStore from '../../store/siteStore';
import LangSwitcher from '../ui/LangSwitcher';
import './HeroSection.css';

const HeroSection = () => {
    const { t, tr } = useT();
    const heroSettings = useSiteStore(state => state.heroSettings);
    const [currentSlide, setCurrentSlide] = useState(0);

    const slideImages = heroSettings.slides && heroSettings.slides.length > 0
        ? heroSettings.slides
        : [{ image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=2000', title: 'Loading...', layout: 'avant-garde' }];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slideImages.length);
        }, 8000);
        return () => clearInterval(timer);
    }, [slideImages.length]);

    const currentData = slideImages[currentSlide] || slideImages[0];

    return (
        <section className="hero-v4-root">
            {/* 2. DYNAMIC BACKGROUND ENGINE */}
            <div className="v4-bg-overlay">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentData.image}
                        src={currentData.image}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
                        className="v4-main-bg-img"
                    />
                </AnimatePresence>
                <div className="v4-glass-mask" />
            </div>

            {/* 3. MULTI-LAYOUT RENDER ENGINE */}
            <div className="hero-v4-container">
                <div className="v4-main-viewport">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`${currentSlide}-${currentData.layout}`}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="v4-layout-manager"
                            style={{ height: '100%', width: '100%' }}
                        >
                            {/* --- LAYOUTS --- */}
                            {currentData.layout === 'avant-garde' && (
                                <div className="layout-wrap avant-garde">
                                    <div className="ag-main-content">
                                        <motion.h4 initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 0.2 }}>{currentData.subtitle}</motion.h4>
                                        <h1>{currentData.title}</h1>
                                        <button className="ag-buy-btn">SHOP NOW — ${currentData.price}</button>
                                    </div>
                                </div>
                            )}

                            {currentData.layout === 'editorial' && (
                                <div className="layout-wrap editorial">
                                    <div className="ed-text-hero">
                                        <h2>{currentData.title}</h2>
                                        <p style={{ color: '#fff', opacity: 0.6, maxWidth: '400px' }}>{currentData.description}</p>
                                    </div>
                                    <div className="ed-img-hero">
                                        <img src={currentData.image} alt="" />
                                    </div>
                                </div>
                            )}

                            {currentData.layout === 'tech' && (
                                <div className="layout-wrap tech">
                                    <div className="tech-info-panel">
                                        <div className="tech-tag">SYSTEM_ACTIVE // {currentData.subtitle}</div>
                                        <h1>{currentData.title}</h1>
                                        <p style={{ color: '#E2FF00', opacity: 0.8 }}>{currentData.description}</p>
                                        <button className="tech-btn-neon">INITIALIZE_ORDER</button>
                                    </div>
                                </div>
                            )}

                            {currentData.layout === 'modern-card' && (
                                <div className="layout-wrap modern-card">
                                    <div className="mc-card-box">
                                        <div className="mc-left">
                                            <span style={{ fontWeight: 800, color: '#888' }}>{currentData.subtitle}</span>
                                            <h1>{currentData.title}</h1>
                                            <p>{currentData.description}</p>
                                            <button className="mc-pill-btn" style={{ background: '#000', color: '#fff', border: 'none', padding: '15px 30px', borderRadius: '40px' }}>
                                                VIEW COLLECTION
                                            </button>
                                        </div>
                                        <div className="mc-right">
                                            <img src={currentData.image} alt="" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {currentData.layout === 'clean-functional' && (
                                <div className="layout-wrap clean-functional">
                                    <div className="cf-sidebar">
                                        <span className="cf-cat">TECHNICAL GEAR</span>
                                        <h1>{currentData.title}</h1>
                                        <div className="cf-price" style={{ fontSize: '2rem', margin: '20px 0' }}>${currentData.price}</div>
                                        <p>{currentData.description}</p>
                                        <button className="cf-add-btn" style={{ width: '100%', marginTop: '30px', padding: '20px', background: '#000', color: '#fff', border: 'none', fontWeight: 900 }}>
                                            ADD_TO_BAG
                                        </button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* 4. NAVIGATION TOOLS */}
            <div className="v4-bottom-nav">
                <div className="v4-progress-dots">
                    {slideImages.map((_, idx) => (
                        <div
                            key={idx}
                            className={`dot ${idx === currentSlide ? 'active' : ''}`}
                            onClick={() => setCurrentSlide(idx)}
                        />
                    ))}
                </div>
                <div className="v4-slide-count">
                    <span>{String(currentSlide + 1).padStart(2, '0')}</span>
                    <div className="sep-line" />
                    <span>{String(slideImages.length).padStart(2, '0')}</span>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
