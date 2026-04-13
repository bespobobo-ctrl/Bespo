export const formatPrice = (price) => `$${price}`;

export const getDiscount = (original, current) => {
    if (!original) return 0;
    return Math.round(((original - current) / original) * 100);
};
