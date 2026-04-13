import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { products as initialProducts } from '../data/products';

const defaultHeroSlides = [
    {
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=1200',
        title: 'Wear Anywhere',
        subtitle: 'STREET COLLECTION',
        price: '120.00'
    },
    {
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1200',
        title: 'Urban Style',
        subtitle: 'LIMITED EDITION',
        price: '85.00'
    },
    {
        image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=1200',
        title: 'Pure Comfort',
        subtitle: 'SIGNATURE LINE',
        price: '95.00'
    },
    {
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=1200',
        title: 'True Vision',
        subtitle: 'MODERN CLASSIC',
        price: '110.00'
    }
];

const useSiteStore = create(
    persist(
        (set, get) => ({
            products: [
                {
                    id: 1,
                    name: 'AURORA™ REFLECTIVE PUFFER',
                    price: 999.99,
                    category: 'Erkaklar',
                    subCategory: 'Sportivka',
                    images: [
                        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800',
                        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800'
                    ],
                    description: 'Aurora Reflective texnologiyasi bilan tayyorlangan puffer. Tun-kun barqaror himoya.',
                    subtitle: 'EXTREME COLD LINE',
                    sizes: ['M', 'L', 'XL'],
                    colors: ['#fff', '#000'],
                    isFeatured: true
                },
                {
                    id: 2,
                    name: 'STEALTH BLACK HEAVY SHIELD',
                    price: 1199.99,
                    category: 'Erkaklar',
                    subCategory: 'Troyka',
                    images: [
                        'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800',
                        'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&rot=180'
                    ],
                    description: 'Og\'ir vaznli himoya qatlami. Sportivka, troyka va triko jamlanmasi.',
                    subtitle: 'TECHWEAR SERIES',
                    sizes: ['L', 'XL'],
                    colors: ['#000', '#111'],
                    badge: 'BESTSELLER'
                },
                {
                    id: 3,
                    name: 'ICEFIELD BLUE TECH PUFFER',
                    price: 1299.99,
                    category: 'Ayollar',
                    subCategory: 'Sportivka',
                    images: [
                        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800'
                    ],
                    description: 'Ayollar uchun maxsus techwear uslubidagi issiq kurtka.',
                    subtitle: 'ARCTIC LINE',
                    sizes: ['S', 'M', 'L'],
                    colors: ['#1e3a8a', '#fff']
                },
                {
                    id: 4,
                    name: 'JUNIOR SHIELD SPORT SET',
                    price: 499.00,
                    category: 'Bollar',
                    subCategory: 'Sportivka',
                    images: [
                        'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?auto=format&fit=crop&w=800'
                    ],
                    description: 'Yosh bolalar uchun sportivka va triko jamlanmasi.',
                    subtitle: 'KIDS TECH',
                    sizes: ['30', '32', '34'],
                    colors: ['#333', '#fff']
                }
            ],

            heroSettings: {
                slides: defaultHeroSlides
            },

            aboutSettings: {
                title: 'ARCHITECTURE',
                image1: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=1000',
                image2: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=600',
                location: 'TOKYO / SHIBUYA',
                craft: 'HAND-CRAFTED',
                instagram: 'https://instagram.com/bespo.official',
                telegram: 'https://t.me/bespo'
            },

            // Global Attributes
            globalSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '30', '32', '34'],
            globalColors: [
                { name: 'Obsidian Black', hex: '#000000' },
                { name: 'Pure White', hex: '#ffffff' },
                { name: 'Ash Gray', hex: '#6b7280' },
                { name: 'Deep Navy', hex: '#1e3a8a' },
                { name: 'Desert Sand', hex: '#d2b48c' },
                { name: 'Olive Green', hex: '#4b5320' },
                { name: 'Blood Red', hex: '#991b1b' },
            ],

            // New Analytics & AI State
            theme: {
                name: 'Warm Earth Luxury',
                colors: {
                    bg: '#0A0A0A',
                    bgCard: '#141416',
                    bgSurface: '#1E1E22',
                    accent: '#C8A87C',
                    textPrimary: '#F5F0E8'
                }
            },
            analytics: {
                visitors: [120, 450, 300, 560, 800, 950, 1100],
                popularProducts: [1, 3],
                slowProducts: [5, 6], // IDs of slow products
                stockAlerts: [
                    { id: 2, count: 3, name: 'Essential Heavy Hoodie' }
                ],
                lastUpdate: '2026-04-10'
            },

            // Actions
            updateProduct: (updatedProduct) => set((state) => ({
                products: state.products.map(p => p.id === updatedProduct.id ? updatedProduct : p)
            })),

            setProductDiscount: (id, discountPrice) => set((state) => ({
                products: state.products.map(p => p.id === id ? { ...p, originalPrice: p.price, price: discountPrice, badge: 'SALE' } : p)
            })),

            addProduct: (newProduct) => set((state) => ({
                products: [...state.products, { ...newProduct, id: Date.now() }]
            })),

            deleteProduct: (id) => set((state) => ({
                products: state.products.filter(p => p.id !== id)
            })),

            toggleSoldOut: (id) => set((state) => ({
                products: state.products.map(p => p.id === id ? { ...p, isSoldOut: !p.isSoldOut } : p)
            })),

            updateHeroSettings: (settings) => set((state) => ({
                heroSettings: { ...state.heroSettings, ...settings }
            })),

            addHeroSlide: (slide) => set((state) => ({
                heroSettings: {
                    ...state.heroSettings,
                    slides: [...state.heroSettings.slides, slide]
                }
            })),

            deleteHeroSlide: (index) => set((state) => ({
                heroSettings: {
                    ...state.heroSettings,
                    slides: state.heroSettings.slides.filter((_, i) => i !== index)
                }
            })),

            updateAboutSettings: (settings) => set((state) => ({
                aboutSettings: { ...state.aboutSettings, ...settings }
            })),

            updateTheme: (themePayload) => set((state) => ({
                theme: { ...state.theme, ...themePayload }
            })),

            // Global Attribute Actions
            addGlobalSize: (size) => set((state) => ({
                globalSizes: [...new Set([...state.globalSizes, size])]
            })),

            removeGlobalSize: (size) => set((state) => ({
                globalSizes: state.globalSizes.filter(s => s !== size)
            })),

            addGlobalColor: (color) => set((state) => ({
                globalColors: [...state.globalColors, color]
            })),

            removeGlobalColor: (colorHex) => set((state) => ({
                globalColors: state.globalColors.filter(c => c.hex !== colorHex)
            })),

            resetToDefault: () => set({
                products: initialProducts,
                heroSettings: {
                    slides: defaultHeroSlides
                },
                aboutSettings: {
                    title: 'ARCHITECTURE',
                    image1: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=1000',
                    image2: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=600',
                    location: 'TOKYO / SHIBUYA',
                    craft: 'HAND-CRAFTED'
                },
                globalSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '30', '32', '34'],
                globalColors: [
                    { name: 'Obsidian Black', hex: '#000000' },
                    { name: 'Pure White', hex: '#ffffff' },
                    { name: 'Ash Gray', hex: '#6b7280' },
                    { name: 'Deep Navy', hex: '#1e3a8a' },
                    { name: 'Desert Sand', hex: '#d2b48c' },
                    { name: 'Olive Green', hex: '#4b5320' },
                    { name: 'Blood Red', hex: '#991b1b' },
                ]
            })
        }),
        {
            name: 'bespo-site-content',
        }

    )
);

export default useSiteStore;
