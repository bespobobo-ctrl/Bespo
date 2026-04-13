import { motion } from 'framer-motion';
import { useT } from '../../hooks/useTranslation';
import './CategoryGrid.css';

const cats = [
    {
        key: 'men',
        img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800',
        code: 'MOD.261-B',
        labelKey: 'streetCore'
    },
    {
        key: 'women',
        img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
        code: 'MOD.264-T',
        labelKey: 'urbanNomad'
    },
    {
        key: 'unisex',
        img: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=800',
        code: 'MOD.268-X',
        labelKey: 'techSeries'
    },
];

const CategoryGrid = () => {
    const { tr, t } = useT();

    return (
        <section className="cat-v2" id="category-grid">
            <div className="cat-v2__info-bar">
                <div className="cat-v2__info-wrap">
                    <span className="cat-v2__info-item">{tr(t.hero.catV2.forHimHer)}</span>
                    <span className="cat-v2__info-tag">#BESPOSTUDIO</span>
                    <span className="cat-v2__info-item">{tr(t.hero.catV2.everyStyle)}</span>
                </div>
            </div>

            <div className="cat-v2__grid">
                {cats.map((c, i) => (
                    <motion.div
                        key={c.key}
                        className="cat-v2__card"
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                    >
                        <div className="cat-v2__img-container">
                            <img src={c.img} alt={tr(t.categories[c.key])} className="cat-v2__img" />
                            <div className="cat-v2__img-overlay" />
                        </div>

                        <div className="cat-v2__details">
                            <div className="cat-v2__meta">
                                <span className="cat-v2__code">{c.code}</span>
                                <h3 className="cat-v2__title">{tr(t.categories[c.key])}</h3>
                            </div>
                            <div className="cat-v2__sub-details">
                                <span className="cat-v2__label">{tr(t.hero.catV2[c.labelKey])}</span>
                                <div className="cat-v2__arrow">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M7 17L17 7M17 7H7M17 7V17" />
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
