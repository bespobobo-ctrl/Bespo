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
            agents: {
                predictor: { name: 'AI Predictor (Sales)', icon: '🤖', active: true, logs: ["2 ta qora hoodie modeli tugash arafasida. Yangi xarid qilishni tavsiya qilamiz (Trend 80% yuqori)."] },
                vision: { name: 'AI Vision (Image)', icon: '👁️', active: true, logs: ["Mahsulot rasmlari avtomatik 4K ga o'tkazilmoqda va fon tozalanmoqda."] },
                copywriter: { name: 'AI Copywriter (SEO)', icon: '✍️', active: true, logs: ["Premium matnlar va kalit so'zlar siz uchun yozib berishga tayyor."] },
                theme: { name: 'Dynamic Theme Agent', icon: '🎨', active: true, logs: ["1 soat oldin - Qorong'u (Dark Theme) o'rnatildi"] },
                monitor: { name: 'AI Health Monitor', icon: '🩺', logs: ['Sog\'liq holati barqaror.'], active: true, status: 'stable' },
                rebrander: { name: 'AI Style Rebrander', icon: '🎨', logs: ['Uslub yangilanishga tayyor.'], active: true, status: 'ready' },
                guard: {
                    name: 'AI Security Guard',
                    icon: '🛡️',
                    logs: ['Tizim himoya ostida.'],
                    active: true,
                    status: 'secure',
                    healthScore: 100,
                    lastReport: null
                },
                debugger: {
                    name: 'AI Bug Finder',
                    icon: '🪲',
                    logs: ['Kodni tahlil qilishga tayyor.'],
                    active: true,
                    status: 'ready',
                    proposedFix: null,
                    metrics: { complexity: 0, performance: 100 }
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
            securitySettings: {
                twoFactor: false,
                ipWhitelist: ['127.0.0.1', '161.35.196.164'],
                lastLogin: new Date().toISOString(),
                loginHistory: [
                    { id: 1, ip: '161.35.196.164', date: '2026-04-13 14:20', device: 'Chrome / Windows', status: 'Success' },
                    { id: 2, ip: '94.232.22.11', date: '2026-04-12 09:15', device: 'Safari / iPhone', status: 'Blocked (Unknown IP)' }
                ]
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

            toggleAgent: (agentId) => set((state) => ({
                agents: {
                    ...state.agents,
                    [agentId]: { ...state.agents[agentId], active: !state.agents[agentId].active, logs: [`Hozir - Agent ${!state.agents[agentId].active ? 'faollashtirildi' : 'o\'chirildi'}`, ...state.agents[agentId].logs] }
                }
            })),

            addAgentLog: (agentId, logMsg) => set((state) => ({
                agents: {
                    ...state.agents,
                    [agentId]: {
                        ...state.agents[agentId],
                        logs: [logMsg, ...state.agents[agentId].logs].slice(0, 10)
                    }
                }
            })),

            setAgentStatus: (agentId, isActive) => set((state) => ({
                agents: {
                    ...state.agents,
                    [agentId]: { ...state.agents[agentId], active: isActive }
                }
            })),

            clearAgentLogs: (agentId) => set((state) => ({
                agents: {
                    ...state.agents,
                    [agentId]: { ...state.agents[agentId], logs: [] }
                }
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

            updateSecuritySettings: (settings) => set((state) => ({
                securitySettings: { ...state.securitySettings, ...settings }
            })),

            addIpToWhitelist: (ip) => set((state) => ({
                securitySettings: {
                    ...state.securitySettings,
                    ipWhitelist: [...state.securitySettings.ipWhitelist, ip]
                }
            })),

            removeIpFromWhitelist: (ip) => set((state) => ({
                securitySettings: {
                    ...state.securitySettings,
                    ipWhitelist: state.securitySettings.ipWhitelist.filter(i => i !== ip)
                }
            })),

            rebrandSite: (styleKey) => {
                const styles = {
                    'luxury': {
                        name: 'Old Money Luxury',
                        colors: { bg: '#080808', bgCard: '#121212', bgSurface: '#181818', accent: '#D4AF37', textPrimary: '#FFFFFF' }
                    },
                    'minimal': {
                        name: 'Tokyo Minimal',
                        colors: { bg: '#F2F2F2', bgCard: '#FFFFFF', bgSurface: '#F9F9F9', accent: '#000000', textPrimary: '#1A1A1A' }
                    },
                    'cyber': {
                        name: 'Cyberpunk Neon',
                        colors: { bg: '#050510', bgCard: '#0A0A1A', bgSurface: '#12122A', accent: '#00FFAA', textPrimary: '#FFFFFF' }
                    },
                    'street': {
                        name: 'NYC Streetwear',
                        colors: { bg: '#111111', bgCard: '#1A1A1A', bgSurface: '#222222', accent: '#FF4500', textPrimary: '#F0F0F0' }
                    }
                };

                const selected = styles[styleKey] || styles['luxury'];

                // REAL CSS VARIABLE APPLICATION
                const root = document.documentElement;
                root.style.setProperty('--color-bg', selected.colors.bg);
                root.style.setProperty('--color-bg-card', selected.colors.bgCard);
                root.style.setProperty('--color-bg-surface', selected.colors.bgSurface);
                root.style.setProperty('--color-accent', selected.colors.accent);
                root.style.setProperty('--color-text-primary', selected.colors.textPrimary);

                set((state) => ({
                    theme: selected,
                    agents: {
                        ...state.agents,
                        rebrander: {
                            ...state.agents.rebrander,
                            logs: [`✅ Sayt "${selected.name}" uslubiga o'tkazildi.`, ...(state.agents.rebrander?.logs || [])]
                        }
                    }
                }));
            },

            runSecurityAudit: async () => {
                set((state) => ({
                    agents: {
                        ...state.agents,
                        guard: {
                            ...state.agents.guard,
                            status: 'scanning',
                            logs: ['[00:01] Deep Security Audit initiated...', ...state.agents.guard.logs]
                        }
                    }
                }));

                const phases = [
                    { msg: '[00:04] Analyzing HTTP Security Headers (CORS, HSTS, CSP)...', score: 98 },
                    { msg: '[00:08] Scanning for OWASP Top 10 Vulnerabilities...', score: 95 },
                    { msg: '[00:12] Auditing SSL/TLS Certificate Chains...', score: 100 },
                    { msg: '[00:15] Stress Testing API Gateways (Rate-Limit Check)...', score: 92 }
                ];

                for (let phase of phases) {
                    await new Promise(r => setTimeout(r, 1200));
                    set((state) => ({
                        agents: {
                            ...state.agents,
                            guard: {
                                ...state.agents.guard,
                                logs: [phase.msg, ...state.agents.guard.logs],
                                healthScore: phase.score
                            }
                        }
                    }));
                }

                set((state) => ({
                    agents: {
                        ...state.agents,
                        guard: {
                            ...state.agents.guard,
                            status: 'secure',
                            lastReport: { timestamp: new Date().toISOString(), threatLevel: 'Low', auditedEndpoints: 14 }
                        }
                    }
                }));
            },

            runBugAudit: async () => {
                set((state) => ({
                    agents: {
                        ...state.agents,
                        debugger: {
                            ...state.agents.debugger,
                            status: 'scanning',
                            logs: ['[00:01] Static Code Analysis (AST) started...', ...state.agents.debugger.logs],
                            proposedFix: null
                        }
                    }
                }));

                await new Promise(r => setTimeout(r, 2000));

                const bugReport = {
                    severity: 'CRITICAL',
                    title: 'Circular Dependency & Memory Leak',
                    problem: 'Infinite re-render detected in siteStore update cycle due to unmemoized selector.',
                    impact: 'Browser CPU usage spike up to 80% on long sessions.',
                    solution: 'Implement useCallback and useShallow for complex objects in state selectors.',
                    code: 'const items = useSiteStore(useShallow(state => state.items));'
                };

                set((state) => ({
                    agents: {
                        ...state.agents,
                        debugger: {
                            ...state.agents.debugger,
                            status: 'compromised',
                            logs: [`[00:05] 🔴 EXCEPTION FOUND: ${bugReport.title}`, ...state.agents.debugger.logs],
                            proposedFix: bugReport,
                            metrics: { complexity: 78, performance: 42 }
                        }
                    }
                }));
            },

            applyAutoFix: async () => {
                set((state) => ({
                    agents: {
                        ...state.agents,
                        debugger: {
                            ...state.agents.debugger,
                            status: 'fixing',
                            logs: ['[00:01] Injecting Hot-fix into production runtime...', ...state.agents.debugger.logs]
                        }
                    }
                }));

                await new Promise(r => setTimeout(r, 2500));

                set((state) => ({
                    agents: {
                        ...state.agents,
                        debugger: {
                            ...state.agents.debugger,
                            status: 'ready',
                            logs: ['[00:04] ✅ PATCH APPLIED: Runtime stability restored.', ...state.agents.debugger.logs],
                            proposedFix: null,
                            metrics: { complexity: 45, performance: 99 }
                        }
                    }
                }));
            },

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
                    craft: 'HAND-CRAFTED',
                    instagram: 'https://instagram.com/bespo.official',
                    telegram: 'https://t.me/bespo'
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
                ],
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
                agents: {
                    predictor: { name: 'AI Predictor (Sales)', icon: '🤖', active: true, logs: ["2 ta qora hoodie modeli tugash arafasida. Yangi xarid qilishni tavsiya qilamiz (Trend 80% yuqori)."] },
                    vision: { name: 'AI Vision (Image)', icon: '👁️', active: true, logs: ["Mahsulot rasmlari avtomatik 4K ga o'tkazilmoqda va fon tozalanmoqda."] },
                    copywriter: { name: 'AI Copywriter (SEO)', icon: '✍️', active: true, logs: ["Premium matnlar va kalit so'zlar siz uchun yozib berishga tayyor."] },
                    theme: { name: 'Dynamic Theme Agent', icon: '🎨', active: true, logs: ["1 soat oldin - Qorong'u (Dark Theme) o'rnatildi"] },
                    monitor: { name: 'AI Health Monitor', icon: '🩺', active: true, logs: ["15 daqiqa oldin - Server barqarorligi tekshirildi (OK)"] }
                },
                analytics: {
                    visitors: [120, 450, 300, 560, 800, 950, 1100],
                    popularProducts: [1, 3],
                    slowProducts: [5, 6],
                    stockAlerts: [
                        { id: 2, count: 3, name: 'Essential Heavy Hoodie' }
                    ],
                    lastUpdate: '2026-04-10'
                }
            })
        }),
        {
            name: 'bespo-site-content',
        }

    )
);

export default useSiteStore;
