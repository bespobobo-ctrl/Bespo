import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import useSiteStore from '../store/siteStore';
import './CatalogPage.css';

const categories = ['Barchasi', 'Erkaklar', 'Ayollar', 'Bollar'];

const CatalogPage = () => {
    const { products } = useSiteStore();
    const [activeCategory, setActiveCategory] = useState('Barchasi');

    const filteredProducts = useMemo(() => {
        return activeCategory === 'Barchasi'
            ? products
            : products.filter(p => p.category === activeCategory);
    }, [activeCategory, products]);

    return (
        <main className="catalog-v2">
            <header className="catalog-v2__header">
                <div className="header-meta">/ EXTREME COLD LINE / 2026</div>
                <h1>NEW <span className="accent">COLLECTION</span></h1>
                <nav className="catalog-v2__filters">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={activeCategory === cat ? 'active' : ''}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </nav>
            </header>

            <section className="catalog-v2__grid">
                <AnimatePresence mode="popLayout">
                    {filteredProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            layout
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.6, delay: index * 0.05 }}
                            className={`product-card-v2 ${product.isFeatured ? 'featured' : ''}`}
                        >
                            <Link to={`/product/${product.id}`} className="card-inner">
                                <div className="card-image-wrapper">
                                    <img src={product.images ? product.images[0] : product.image} alt={product.name} />
                                    {product.isFeatured && (
                                        <div className="featured-overlay">
                                            <span className="featured-tag">AURORA™</span>
                                            <div className="featured-action">ADD TO CART - ${product.price}</div>
                                        </div>
                                    )}
                                    {product.badge && <span className="card-badge">{product.badge}</span>}
                                </div>
                                <div className="card-info">
                                    <div className="card-meta">
                                        <span className="subtitle">{product.subtitle}</span>
                                        <div className="dots">
                                            {product.colors?.map(c => <span key={c} className="dot" style={{ background: c }}></span>)}
                                        </div>
                                    </div>
                                    <h3>{product.name}</h3>
                                    <span className="price">${product.price}</span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </section>
        </main>
    );
};

export default CatalogPage;
