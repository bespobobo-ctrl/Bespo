import { Link } from 'react-router-dom';
import { formatPrice, getDiscount } from '../../utils/formatPrice';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const discount = getDiscount(product.originalPrice, product.price);

    return (
        <div className="product-card" id={`product-${product.id}`}>
            <Link to={`/product/${product.id}`} className="product-card__link">
                <div className="product-card__img-wrap">
                    <img src={product.image} alt={product.name} className="product-card__img" loading="lazy" />

                    {/* Badges */}
                    <div className="product-card__badges">
                        {product.badge && (
                            <span className="product-card__badge">{product.badge}</span>
                        )}
                        {discount > 0 && (
                            <span className="product-card__badge product-card__badge--sale">-{discount}%</span>
                        )}
                    </div>

                    {/* Quick View */}
                    <div className="product-card__quick">
                        <span>QUICK VIEW</span>
                    </div>
                </div>

                <div className="product-card__info">
                    <div className="product-card__meta-top">
                        <p className="product-card__subtitle text-label">{product.subtitle}</p>
                        <span className="product-card__unit-no">[ UNIT_{String(product.id).padStart(2, '0')} ]</span>
                    </div>
                    <h3 className="product-card__name">{product.name}</h3>
                    <div className="product-card__price-row">
                        <span className="product-card__price">{formatPrice(product.price)}</span>
                        {product.originalPrice && (
                            <span className="product-card__original-price">{formatPrice(product.originalPrice)}</span>
                        )}
                    </div>

                    {/* Colors */}
                    {product.colors && (
                        <div className="product-card__colors">
                            {product.colors.map((color, i) => (
                                <span
                                    key={i}
                                    className="product-card__color-dot"
                                    style={{ background: color }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
