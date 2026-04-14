import { motion } from 'framer-motion';
import useSiteStore from '../../store/siteStore';
import './GalleryGrid.css';

const GalleryGrid = () => {
    const galleryImages = useSiteStore(state => state.galleryImages);

    // Layout configuration
    const sizes = ['large', 'small', 'medium', 'medium', 'small', 'tall'];

    return (
        <section className="gallery-v2 section" id="gallery-section">
            <div className="container">
                <div className="gallery-v2__header">
                    <span className="text-label">[ COLLECTION_GALLERY / 26 ]</span>
                    <h2 className="text-h2 gallery-v2__title">VISUAL ARCHIVE.</h2>
                </div>

                <div className="gallery-v2__mosaic">
                    {galleryImages.map((img, i) => (
                        <motion.div
                            key={i}
                            className={`gallery-v2__item gallery-v2__item--${sizes[i % sizes.length]}`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ delay: i * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="gallery-v2__img-wrap">
                                <img src={img} alt="" className="gallery-v2__img" loading="lazy" />
                                <div className="gallery-v2__overlay">
                                    <div className="gallery-v2__item-meta">
                                        <span className="gallery-v2__cat">EDITORIAL</span>
                                        <h4 className="gallery-v2__name">BESPO_SHOT_{i + 1}</h4>
                                    </div>
                                    <span className="gallery-v2__id">SHOT_0{i + 1}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GalleryGrid;
