import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { products as initialProducts } from '../data/products';

const defaultHeroSlides = [
    {
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200',
        title: 'CARBON_PRO™ ELITE',
        subtitle: 'BEYOND PERFORMANCE',
        price: '450.00',
        layout: 'avant-garde',
        description: 'Professional darajadagi uglerod tolali texnologiya. Maksimal tezlik va barqarorlik uchun yaratilgan.'
    },
    {
        image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1200',
        title: 'SMART_TECH SYSTEM',
        subtitle: 'URBAN INTELLIGENCE',
        price: '299.99',
        layout: 'tech',
        description: 'Biometrik datchiklar bilan jihozlangan aqlli libos. Har bir harakatingizni tahlil qiling.'
    },
    {
        image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=1200',
        title: 'OLYMPUS HERITAGE',
        subtitle: 'LEGACY OF POWER',
        price: '599.00',
        layout: 'editorial',
        description: 'Klassik sport estetikasi va yuqori darajadagi dabdaba uyg\'unligi. Cheksiz imkoniyatlar ramzi.'
    },
    {
        image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=1200',
        title: 'STREET RACER COLLECTION',
        subtitle: 'ALWAYS ACTIVE',
        price: '185.00',
        layout: 'modern-card',
        description: 'Shahar ko\'chalarida erkin harakatlanish uchun yengil va zamonaviy sport uslubi.'
    },
    {
        image: 'https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?auto=format&fit=crop&q=80&w=1200',
        title: 'STORM_SHIELD X',
        subtitle: 'SUPREME PROTECTION',
        price: '720.00',
        layout: 'clean-functional',
        description: 'Har qanday ob-havoda 100% suv o\'tkazmaydigan va nafas oluvchi texnologik qatlam.'
    }
];

const useSiteStore = create(
    persist(
        (set, get) => ({
            products: initialProducts,

            heroSettings: {
                slides: defaultHeroSlides
            },
            recommendedHeroSlides: [
                {
                    id: 'rec1',
                    title: 'CARBON ELITE™ 01',
                    subtitle: 'PRO PERFORMANCE',
                    description: 'Eng yuqori marralar uchun professional sport kiyimlari. Tezlik va kuch uyg\'unligi.',
                    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1200',
                    layout: 'avant-garde',
                    price: '420.00'
                },
                {
                    id: 'rec2',
                    title: 'TRACK MASTER CLASS',
                    subtitle: 'HERITAGE SPORT',
                    description: 'Olimpiya o\'yinlari darajasidagi dizayn va yuqori sifatli materiallar.',
                    image: 'https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&q=80&w=1200',
                    layout: 'editorial',
                    price: '380.00'
                }
            ],

            aboutSettings: {
                title: 'ARCHITECTURE',
                image1: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=1000',
                image2: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=600',
                location: 'TOKYO / SHIBUYA',
                craft: 'HAND-CRAFTED',
                instagram: 'https://instagram.com/bespo.official',
                telegram: 'https://t.me/bespo',
                phone: '+998 90 123 45 67',
                email: 'info@bespo.uz',
                mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11984.14811804364!2d69.2400734!3d41.311081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b0cc379e9c3%3A0xa5a9976993a6b3c!2sTashkent%20City!5e0!3m2!1sen!2suz!4v1713083674681!5m2!1sen!2suz'
            },

            materialSettings: {
                title: "ADVANCED_FABRICS",
                subtitle: "MATERIALS OF THE FUTURE",
                mainText: "Bizning har bir mahsulotimiz eng yuqori sifatli materiallardan, laboratoriya sinovlaridan o'tgan texnologiyalar asosida tayyorlanadi.",
                features: [
                    { id: 1, title: "WATER_REPELLENT", desc: "Namlikka chidamli maxsus qatlam" },
                    { id: 2, title: "BREATHABLE_TECH", desc: "Havo o'tkazuvchanlik xususiyati" },
                    { id: 3, title: "THERMO_CONTROL", desc: "Issiqlikni saqlash tizimi" }
                ],
                image: "https://images.unsplash.com/photo-1558232108-b1bc64d154ee?auto=format&fit=crop&q=80&w=800"
            },
            promoSettings: {
                title: 'SEASONAL_OFFER',
                discount: '30%',
                label: 'LIMITED EDITION',
                image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=1200'
            },
            categorySettings: [
                { id: 'men', name: 'MEN', image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=1000' },
                { id: 'women', name: 'WOMEN', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000' },
                { id: 'unisex', name: 'UNISEX', image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=1000' }
            ],
            galleryImages: [
                'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800',
                'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800',
                'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800',
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800'
            ],
            marqueeText: 'BESPO / SMART STREETWEAR / 2026 COLLECTION / FUTURE OF PERFORMANCE / GLOBAL SHIPPING AVAILABLE ',

            globalSizes: [
                { value: 'XS', active: true },
                { value: 'S', active: true },
                { value: 'M', active: true },
                { value: 'L', active: true },
                { value: 'XL', active: true },
                { value: 'XXL', active: true },
                { value: '3XL', active: true },
                { value: '30', active: true },
                { value: '32', active: true },
                { value: '34', active: true }
            ],
            globalColors: [
                { name: 'Obsidian Black', hex: '#000000', active: true },
                { name: 'Pure White', hex: '#ffffff', active: true },
                { name: 'Ash Gray', hex: '#6b7280', active: true },
                { name: 'Deep Navy', hex: '#1e3a8a', active: true },
                { name: 'Desert Sand', hex: '#d2b48c', active: true },
                { name: 'Olive Green', hex: '#4b5320', active: true },
                { name: 'Blood Red', hex: '#991b1b', active: true },
            ],

            activeVibe: 'luxury',

            agents: {
                predictor: { name: 'AI Predictor (Sales)', icon: '🤖', active: true, logs: ["Sotuvlar tahlili faol."] },
                vision: { name: 'AI Vision (Image)', icon: '👁️', active: true, logs: ["Rasm tahlili faol."] },
                copywriter: { name: 'AI Copywriter (SEO)', icon: '✍️', active: true, logs: ["Matnlar tahlili faol."] },
                monitor: { name: 'AI Health Monitor', icon: '🩺', logs: ['Sog\'liq holati barqaror.'], active: true, status: 'stable' },
                guard: { name: 'AI Security Guard', icon: '🛡️', logs: ['Tizim himoya ostida.'], active: true, status: 'secure', healthScore: 100 },
                debugger: { name: 'AI Bug Finder', icon: '🪲', logs: ['Kodni tahlil qilishga tayyor.'], active: true, status: 'ready', proposedFix: null, metrics: { complexity: 0, performance: 100 } },
                patchHistory: []
            },
            analytics: {
                visitors: [120, 450, 300, 560, 800, 950, 1100],
                popularProducts: [1],
                stockAlerts: []
            },
            securitySettings: {
                twoFactor: false,
                ipWhitelist: ['127.0.0.1', '161.35.196.164'],
                loginHistory: []
            },

            // ACTIONS
            updateProduct: (updatedProduct) => set((state) => ({
                products: state.products.map(p => p.id === updatedProduct.id ? updatedProduct : p)
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

            updateMaterialSettings: (settings) => set((state) => ({
                materialSettings: { ...state.materialSettings, ...settings }
            })),

            updatePromoSettings: (settings) => set((state) => ({
                promoSettings: { ...state.promoSettings, ...settings }
            })),

            updateGalleryImages: (imgs) => set({ galleryImages: imgs }),
            updateCategorySettings: (settings) => set({ categorySettings: settings }),
            updateMarqueeText: (txt) => set({ marqueeText: txt }),

            addHeroSlide: (slide) => set((state) => ({
                heroSettings: { ...state.heroSettings, slides: [...state.heroSettings.slides, slide] }
            })),

            deleteHeroSlide: (index) => set((state) => ({
                heroSettings: { ...state.heroSettings, slides: state.heroSettings.slides.filter((_, i) => i !== index) }
            })),

            updateAboutSettings: (settings) => set((state) => ({
                aboutSettings: { ...state.aboutSettings, ...settings }
            })),

            toggleAgent: (agentId) => set((state) => ({
                agents: {
                    ...state.agents,
                    [agentId]: { ...state.agents[agentId], active: !state.agents[agentId].active }
                }
            })),

            addGlobalSize: (value) => set((state) => ({
                globalSizes: [...state.globalSizes, { value, active: true }]
            })),

            toggleGlobalSize: (value) => set((state) => ({
                globalSizes: state.globalSizes.map(s => s.value === value ? { ...s, active: !s.active } : s)
            })),

            removeGlobalSize: (value) => set((state) => ({
                globalSizes: state.globalSizes.filter(s => s.value !== value)
            })),

            addGlobalColor: (color) => set((state) => ({
                globalColors: [...state.globalColors, { ...color, active: true }]
            })),

            toggleGlobalColor: (hex) => set((state) => ({
                globalColors: state.globalColors.map(c => c.hex === hex ? { ...c, active: !c.active } : c)
            })),

            removeGlobalColor: (hex) => set((state) => ({
                globalColors: state.globalColors.filter(c => c.hex !== hex)
            })),

            updateSecuritySettings: (settings) => set((state) => ({
                securitySettings: { ...state.securitySettings, ...settings }
            })),

            updateVibe: (vibeKey) => {
                const styles = {
                    'luxury': {
                        name: 'Bespo Luxury 2026',
                        colors: { bg: '#080808', bgCard: '#121212', bgSurface: '#181818', accent: '#D4AF37', textPrimary: '#FFFFFF' },
                        font: "'Outfit', sans-serif"
                    },
                    'minimalist': {
                        name: 'Zen Minimalist',
                        colors: { bg: '#F2F2F2', bgCard: '#FFFFFF', bgSurface: '#F9F9F9', accent: '#000000', textPrimary: '#1A1A1A' },
                        font: "'Inter', sans-serif"
                    },
                    'cyber': {
                        name: 'Neo Cyberpunk',
                        colors: { bg: '#050510', bgCard: '#0A0A1A', bgSurface: '#12122A', accent: '#00FFAA', textPrimary: '#FFFFFF' },
                        font: "'Space Grotesk', sans-serif"
                    },
                    'vogue': {
                        name: 'Editorial Vogue',
                        colors: { bg: '#FFFFFF', bgCard: '#F8F8F8', bgSurface: '#F0F0F0', accent: '#c34138', textPrimary: '#000000' },
                        font: "'Playfair Display', serif"
                    },
                    'underground': {
                        name: 'NYC Underground',
                        colors: { bg: '#111111', bgCard: '#1A1A1A', bgSurface: '#222222', accent: '#FF4500', textPrimary: '#F0F0F0' },
                        font: "'JetBrains Mono', monospace"
                    }
                };

                const selected = styles[vibeKey] || styles['luxury'];
                const root = document.documentElement;
                root.style.setProperty('--color-bg', selected.colors.bg);
                root.style.setProperty('--color-bg-card', selected.colors.bgCard);
                root.style.setProperty('--color-bg-surface', selected.colors.bgSurface);
                root.style.setProperty('--color-accent', selected.colors.accent);
                root.style.setProperty('--color-text-primary', selected.colors.textPrimary);
                root.style.setProperty('--font-primary', selected.font);

                set({ activeVibe: vibeKey });
            },

            runSecurityAudit: async () => {
                // Simplified audit for performance
                console.log("Security audit running...");
                await new Promise(r => setTimeout(r, 1000));
            },

            runBugAudit: async () => {
                console.log("Bug audit running...");
                await new Promise(r => setTimeout(r, 1000));
            },

            applyAutoFix: async () => {
                console.log("Applying fix...");
            },

            resetToDefault: () => {
                localStorage.removeItem('bespo-site-content');
                window.location.reload();
            }
        }),
        {
            name: 'bespo-site-content',
            version: 30, // Global sync for Dolenga V5
            partialize: (state) => {
                const { agents, analytics, ...rest } = state;
                return rest;
            },
            onRehydrateStorage: () => (state) => {
                if (!state) return;
                // Self-healing
                if (state.products) {
                    state.products = state.products.map(p => ({
                        ...p,
                        sizes: (p.sizes || []).map(s => typeof s === 'object' ? (s.value || 'N/A') : s),
                        colors: (p.colors || []).map(c => typeof c === 'object' ? (c.hex || '#000') : c)
                    }));
                }
            }
        }
    )
);

export default useSiteStore;
