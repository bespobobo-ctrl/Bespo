import { motion } from 'framer-motion';
import useSiteStore from '../../store/siteStore';
import './GalleryGrid.css';

const GalleryGrid = () => {
    const { products } = useSiteStore();
    // We map products to specific grid layouts
    const galleryItems = [
        { ...products[0], size: 'large' },
        { ...products[1], size: 'small' },
        { ...products[2], size: 'medium' },
        { ...products[3], size: 'medium' },
        { ...products[4], size: 'small' },
        { ...products[5], size: 'tall' }
    ];

    return (
        <section className="gallery-v2 section" id="gallery-section">
            <div className="container">
                <div className="gallery-v2__header">
                    <span className="text-label">[ COLLECTION_GALLERY / 26 ]</span>
                    <h2 className="text-h2 gallery-v2__title">VISUAL ARCHIVE.</h2>
                </div>

                <div className="gallery-v2__mosaic">
                    {galleryItems.map((item, i) => (
                        <motion.div
                            key={item.id}
                            className={`gallery-v2__item gallery-v2__item--${item.size}`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ delay: i * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="gallery-v2__img-wrap">
                                <img src={item.image} alt={item.name} className="gallery-v2__img" loading="lazy" />
                                <div className="gallery-v2__overlay">
                                    <div className="gallery-v2__item-meta">
                                        <span className="gallery-v2__cat">{item.category}</span>
                                        <h4 className="gallery-v2__name">{item.name}</h4>
                                    </div>
                                    <span className="gallery-v2__id">S_{item.id}</span>
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
