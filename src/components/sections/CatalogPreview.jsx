import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useT } from '../../hooks/useTranslation';
import { products } from '../../data/products';
import ProductCard from '../product/ProductCard';
import './CatalogPreview.css';

const CatalogPreview = () => {
    const { tr, t } = useT();
    const featured = products.filter((p) => p.featured).slice(0, 4);

    return (
        <section className="catalog-v2 section" id="catalog-preview">
            <div className="container">
                <div className="catalog-v2__header">
                    <div className="catalog-v2__title-wrap">
                        <span className="catalog-v2__tag">[ UNIT_COUNT / 26 ]</span>
                        <h2 className="catalog-v2__title">{tr(t.catalog.title)}</h2>
                    </div>
                    <div className="catalog-v2__links">
                        <p className="catalog-v2__desc">Curated selection of our latest urban performance gear.</p>
                        <Link to="/catalog" className="catalog-v2__browse-btn">
                            <span>{tr(t.nav.products)}</span>
                            <div className="catalog-v2__btn-icon">→</div>
                        </Link>
                    </div>
                </div>

                <div className="catalog-v2__grid">
                    {featured.map((p) => (<ProductCard key={p.id} product={p} />))}
                </div>
            </div>
        </section>
    );
};

export default CatalogPreview;
