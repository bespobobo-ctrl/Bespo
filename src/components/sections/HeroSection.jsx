import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useT } from '../../hooks/useTranslation';
import useSiteStore from '../../store/siteStore';
import './HeroSection.css';

const HeroSection = () => {
    const { heroSettings } = useSiteStore();
    const slideImages = heroSettings.slides;
    const [currentSlide, setCurrentSlide] = useState(0);
    const { tr, t } = useT();

    // Avtomatik almashinish
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slideImages.length);
        }, 10000);
        return () => clearInterval(timer);
    }, [slideImages.length]);

    if (!slideImages || slideImages.length === 0) return null;

    const currentData = slideImages[currentSlide];

    return (
        <section className={`hero-v4-root layout-${currentData.layout || 'standard'}`}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={`${currentSlide}-${currentData.layout}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hero-v4-container"
                >
                    {/* LAYOUT: BACKGROUND */}
                    <div className="v4-bg-overlay">
                        <img src={currentData.image} alt="" className="v4-main-bg-img" />
                        <div className="v4-glass-mask" />
                    </div>

                    {/* LAYOUT: SIDE META */}
                    <aside className="v4-side-meta">
                        <div className="v4-rot-label">BESPO_STUDIO // SS26</div>
                        <div className="v4-social-min">
                            <a href="#">IG</a>
                            <a href="#">TW</a>
                        </div>
                    </aside>

                    {/* DYNAMIC CONTENT VIEWPORT */}
                    <div className="v4-main-viewport">

                        {/* 1. AVANT-GARDE LAYOUT */}
                        {currentData.layout === 'avant-garde' && (
                            <div className="layout-wrap avant-garde">
                                <div className="ag-left-tags">
                                    <span className="tag-blob">〔 SERIES: STAGES P4 〕</span>
                                    <span className="tag-blob">〔 STATUS: ACTIVE 〕</span>
                                </div>
                                <div className="ag-main-content">
                                    <motion.h1 initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                                        {currentData.title}
                                    </motion.h1>
                                    <div className="ag-specs">
                                        <div className="spec-row"><span>SIZE</span> <span>S M L XL</span></div>
                                        <div className="spec-row"><span>COLOUR</span> <span className="gold-text">SILVER</span></div>
                                    </div>
                                    <button className="ag-buy-btn">ADD TO CART — ${currentData.price}</button>
                                </div>
                                <div className="ag-img-portal">
                                    <img src={currentData.image} alt="" />
                                    <div className="portal-overlay" />
                                </div>
                            </div>
                        )}

                        {/* 2. EDITORIAL LAYOUT */}
                        {currentData.layout === 'editorial' && (
                            <div className="layout-wrap editorial">
                                <div className="ed-header">
                                    <span className="brand-l">BESPO</span>
                                    <div className="nav-min"><span>products</span><span>story</span></div>
                                </div>
                                <div className="ed-body">
                                    <div className="ed-text-hero">
                                        <motion.h2 initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                                            {currentData.title}
                                        </motion.h2>
                                        <p>{currentData.description}</p>
                                        <button className="ed-btn-dark">Watch Intro</button>
                                    </div>
                                    <div className="ed-img-hero">
                                        <img src={currentData.image} alt="" />
                                        <div className="ed-badge-float">01 / 02</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 3. TECH LAYOUT */}
                        {currentData.layout === 'tech' && (
                            <div className="layout-wrap tech">
                                <div className="tech-glitch-header">
                                    <h3>{currentData.subtitle}</h3>
                                    <div className="tech-id">SYSTEM_ID: 9942-X</div>
                                </div>
                                <div className="tech-main-grid">
                                    <div className="tech-visual">
                                        <img src={currentData.image} alt="" />
                                        <div className="scan-line" />
                                    </div>
                                    <div className="tech-info-panel">
                                        <h1>{currentData.title}</h1>
                                        <div className="tech-stats">
                                            <div className="stat-node"><span>DENSITY</span> <span>HIGH</span></div>
                                            <div className="stat-node"><span>THERMAL</span> <span>ACTIVE</span></div>
                                        </div>
                                        <p>{currentData.description}</p>
                                        <button className="tech-btn-neon">DEPLOY_SYSTEM (${currentData.price})</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 4. STANDARD FALLBACK */}
                        {(!currentData.layout || currentData.layout === 'standard') && (
                            <div className="layout-wrap standard">
                                <div className="std-content">
                                    <motion.h6 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{currentData.subtitle}</motion.h6>
                                    <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>{currentData.title}</motion.h1>
                                    <p className="std-price">${currentData.price}</p>
                                    <Link to="/catalog" className="std-btn">Shop Collection</Link>
                                </div>
                                <div className="std-img">
                                    <img src={currentData.image} alt="" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* UI NAVIGATION CONTROLS */}
                    <div className="v4-bottom-nav">
                        <div className="v4-progress-dots">
                            {slideImages.map((_, i) => (
                                <div
                                    key={i}
                                    className={`dot ${currentSlide === i ? 'active' : ''}`}
                                    onClick={() => setCurrentSlide(i)}
                                />
                            ))}
                        </div>
                        <div className="v4-slide-count">
                            <span>{String(currentSlide + 1).padStart(2, '0')}</span>
                            <div className="sep-line" />
                            <span>{String(slideImages.length).padStart(2, '0')}</span>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </section>
    );
};

export default HeroSection;
