import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useSiteStore from '../store/siteStore';
import { formatPrice } from '../utils/formatPrice';
import useCartStore from '../store/cartStore';
import ProductCard from '../components/product/ProductCard';
import { useT } from '../hooks/useTranslation';
import Product360 from '../components/product/Product360';
import './ProductPage.css';

const ProductPage = () => {
    const { products } = useSiteStore();
    const { id } = useParams();
    const product = products.find((p) => p.id === parseInt(id));
    const addItem = useCartStore((s) => s.addItem);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [added, setAdded] = useState(false);
    const [show360, setShow360] = useState(false);
    const { tr, t } = useT();

    if (!product) return (
        <main className="product-page"><div className="container" style={{ paddingTop: '200px', textAlign: 'center' }}>
            <h1 className="text-h1">404</h1><Link to="/catalog" className="text-label-accent">← {tr(t.nav.products)}</Link>
        </div></main>
    );

    const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);
    if (related.length < 4) related.push(...products.filter((p) => p.id !== product.id && !related.includes(p)).slice(0, 4 - related.length));

    const handleAdd = () => { if (!selectedSize) return; addItem(product, selectedSize, selectedColor || product.colors?.[0]); setAdded(true); setTimeout(() => setAdded(false), 2000); };

    return (
        <main className="product-page"><div className="container">
            <motion.div className="product-page__breadcrumb" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Link to="/">{tr(t.nav.home)}</Link><span>/</span><Link to="/catalog">{tr(t.nav.products)}</Link><span>/</span><span className="text-accent-color">{product.name}</span>
            </motion.div>
            <div className="product-page__main">
                <motion.div className="product-page__gallery" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                    <div className="product-page__gallery-actions">
                        <button
                            className={`view-mode-btn ${!show360 ? 'active' : ''}`}
                            onClick={() => setShow360(false)}
                        >
                            FOTO
                        </button>
                        <button
                            className={`view-mode-btn ${show360 ? 'active' : ''}`}
                            onClick={() => setShow360(true)}
                        >
                            360° MODE
                        </button>
                    </div>

                    {show360 ? (
                        <Product360 images={product.images} />
                    ) : (
                        <div className="product-page__image-wrapper">
                            <motion.img
                                key={product.id}
                                src={product.images ? product.images[0] : product.image}
                                alt={product.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="product-page__main-img"
                            />
                        </div>
                    )}

                    <div className="product-page__extra-actions">
                        <button className="ai-tryon-btn">
                            <span className="sparkle">✨</span> AI VIRTUAL TRY-ON
                        </button>
                        <div className="texture-preview">
                            <img src={product.images ? product.images[3] : product.image} alt="texture" />
                            <span>MATO SIFATI (DETAL)</span>
                        </div>
                    </div>
                </motion.div>
                <motion.div className="product-page__info" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
                    <p className="text-label product-page__subtitle">{product.subtitle}</p>
                    <h1 className="text-h1 product-page__name">{product.name}</h1>
                    <p className="text-price product-page__price">{formatPrice(product.price)}</p>
                    {product.colors && (<div className="product-page__section"><p className="text-label">{tr(t.product.color)}</p>
                        <div className="product-page__colors">{product.colors.map((c, i) => (<button key={i} className={`product-page__color ${selectedColor === c ? 'product-page__color--active' : ''}`} style={{ background: c }} onClick={() => setSelectedColor(c)} />))}</div>
                    </div>)}
                    <div className="product-page__section"><p className="text-label">{tr(t.product.size)}</p>
                        <div className="product-page__sizes">{product.sizes.map((s) => (<button key={s} className={`product-page__size ${selectedSize === s ? 'product-page__size--active' : ''}`} onClick={() => setSelectedSize(s)}>{s}</button>))}</div>
                    </div>
                    <div className="product-page__actions">
                        <button className={`product-page__add-btn ${added ? 'product-page__add-btn--added' : ''}`} onClick={handleAdd} disabled={!selectedSize} id="add-to-cart">{added ? tr(t.product.addedToCart) : tr(t.product.addToCart)}</button>
                        <button className="product-page__buy-btn" onClick={handleAdd} disabled={!selectedSize} id="buy-now">{tr(t.product.buyNow)}</button>
                    </div>
                    {!selectedSize && <p className="product-page__hint text-body-sm">{tr(t.product.selectSize)}</p>}
                    <div className="product-page__description"><h3 className="text-label" style={{ marginBottom: 'var(--space-md)' }}>{tr(t.product.description)}</h3><p className="text-body">{product.description}</p></div>
                </motion.div>
            </div>
            <motion.div className="product-page__related" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-h2" style={{ marginBottom: 'var(--space-2xl)' }}>{tr(t.product.youMayLike)}</h2>
                <div className="product-page__related-grid">{related.map((p) => (<ProductCard key={p.id} product={p} />))}</div>
            </motion.div>
            <div className="product-page__info-cards">
                <div className="product-page__info-card"><h3 className="text-h3">{tr(t.product.delivery)}</h3><p className="text-body-sm">{tr(t.footer.shipping)}</p></div>
                <div className="product-page__info-card"><h3 className="text-h3">{tr(t.product.helpCenter)}</h3><p className="text-body-sm">{tr(t.footer.faq)}</p></div>
            </div>
        </div></main>
    );
};

export default ProductPage;
