import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import useCartStore from '../../store/cartStore';
import { formatPrice } from '../../utils/formatPrice';
import { useT } from '../../hooks/useTranslation';
import './CartSidebar.css';

const CartSidebar = () => {
    const items = useCartStore((s) => s.items);
    const isOpen = useCartStore((s) => s.isCartOpen);
    const closeCart = useCartStore((s) => s.closeCart);
    const removeItem = useCartStore((s) => s.removeItem);
    const updateQuantity = useCartStore((s) => s.updateQuantity);
    const getTotal = useCartStore((s) => s.getTotal);
    const { tr, t } = useT();

    return (
        <AnimatePresence>
            {isOpen && (<>
                <motion.div className="cart-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeCart} />
                <motion.div className="cart-sidebar" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
                    <div className="cart-sidebar__header">
                        <h2 className="text-h3">{tr(t.cartSidebar.yourCart)}</h2>
                        <button className="cart-sidebar__close" onClick={closeCart} id="close-cart">✕</button>
                    </div>
                    {items.length === 0 ? (
                        <div className="cart-sidebar__empty"><p className="text-body">{tr(t.cartSidebar.empty)}</p>
                            <Link to="/catalog" className="cart-sidebar__shop-btn" onClick={closeCart}>{tr(t.cartSidebar.browseCatalog)}</Link>
                        </div>
                    ) : (<>
                        <div className="cart-sidebar__items">
                            {items.map((item, i) => (
                                <motion.div key={`${item.id}-${item.size}-${item.color}`} className="cart-sidebar__item" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                                    <img src={item.image} alt={item.name} className="cart-sidebar__item-img" />
                                    <div className="cart-sidebar__item-info">
                                        <h4 className="cart-sidebar__item-name">{item.name}</h4>
                                        <p className="text-label">{tr(t.product.size)}: {item.size}</p>
                                        <p className="cart-sidebar__item-price">{formatPrice(item.price)}</p>
                                        <div className="cart-sidebar__item-qty">
                                            <button onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}>−</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}>+</button>
                                        </div>
                                    </div>
                                    <button className="cart-sidebar__item-remove" onClick={() => removeItem(item.id, item.size, item.color)}>✕</button>
                                </motion.div>
                            ))}
                        </div>
                        <div className="cart-sidebar__footer">
                            <div className="cart-sidebar__total"><span className="text-label">{tr(t.cartSidebar.total)}</span><span className="text-price">{formatPrice(getTotal())}</span></div>
                            <button className="cart-sidebar__checkout" id="checkout-btn">{tr(t.cartSidebar.checkout)}</button>
                        </div>
                    </>)}
                </motion.div>
            </>)}
        </AnimatePresence>
    );
};

export default CartSidebar;
