import { create } from 'zustand';

const useCartStore = create((set, get) => ({
    items: [],
    isCartOpen: false,

    addItem: (product, size, color) => {
        const items = get().items;
        const existingIndex = items.findIndex(
            (item) => item.id === product.id && item.size === size && item.color === color
        );
        if (existingIndex > -1) {
            const newItems = [...items];
            newItems[existingIndex].quantity += 1;
            set({ items: newItems });
        } else {
            set({
                items: [...items, { ...product, size, color, quantity: 1 }],
            });
        }
    },

    removeItem: (id, size, color) => {
        set({
            items: get().items.filter(
                (item) => !(item.id === id && item.size === size && item.color === color)
            ),
        });
    },

    updateQuantity: (id, size, color, quantity) => {
        if (quantity < 1) return;
        set({
            items: get().items.map((item) =>
                item.id === id && item.size === size && item.color === color
                    ? { ...item, quantity }
                    : item
            ),
        });
    },

    getTotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
    },

    getCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
    },

    toggleCart: () => set({ isCartOpen: !get().isCartOpen }),
    closeCart: () => set({ isCartOpen: false }),
    clearCart: () => set({ items: [] }),
}));

export default useCartStore;
