import { motion } from 'framer-motion';
import { useT } from '../../hooks/useTranslation';
import './CategoryGrid.css';

import useSiteStore from '../../store/siteStore';

const CategoryGrid = () => {
    const { tr, t } = useT();
    const categorySettings = useSiteStore(state => state.categorySettings);

    return (
        <section className="cat-v2" id="category-grid">
            <div className="cat-v2__info-bar">
                <div className="cat-v2__info-wrap">
                    <span className="cat-v2__info-item">NEW_SEASON_26</span>
                    <span className="cat-v2__info-tag">#BESPOSTUDIO</span>
                    <span className="cat-v2__info-item">CURATED_EDITORIAL</span>
                </div>
            </div>

            <div className="cat-v2__grid">
                {categorySettings.map((c, i) => (
                    <motion.div
                        key={c.id}
                        className="cat-v2__card"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                    >
                        <div className="cat-v2__img-container">
                            <img src={c.image} alt={c.name} className="cat-v2__img" />
                            <div className="cat-v2__img-overlay" />
                        </div>

                        <div className="cat-v2__details">
                            <div className="cat-v2__meta">
                                <span className="cat-v2__code">WORLDWIDE</span>
                                <h3 className="cat-v2__title">{c.name}</h3>
                            </div>
                            <div className="cat-v2__sub-details">
                                <div className="cat-v2__arrow">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M12 8l4 4-4 4M8 12h8" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default CategoryGrid;
