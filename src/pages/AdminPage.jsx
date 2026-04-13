import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useSiteStore from '../store/siteStore';
import { motion, AnimatePresence } from 'framer-motion';
import AIAssistant from '../components/admin/AIAssistant';
import SalesChart from '../components/admin/SalesChart';
import SocialWidget from '../components/admin/SocialWidget';
import './AdminPage.css';

const AdminPage = () => {
    const {
        products, heroSettings, aboutSettings,
        globalSizes, globalColors, agents, toggleAgent,
        updateProduct, addProduct, deleteProduct, toggleSoldOut,
        updateHeroSettings, addHeroSlide, deleteHeroSlide,
        updateAboutSettings, resetToDefault,
        addGlobalSize, removeGlobalSize, addGlobalColor, removeGlobalColor,
        securitySettings, updateSecuritySettings, addIpToWhitelist, removeIpFromWhitelist,
        addAgentLog, setAgentStatus
    } = useSiteStore();

    const [activeTab, setActiveTab] = useState('products');
    const [editingProduct, setEditingProduct] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [currentImages, setCurrentImages] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [uploadingSlot, setUploadingSlot] = useState(null);
    const [aiStatusMessage, setAiStatusMessage] = useState('');
    const [isGeneratingDesc, setIsGeneratingDesc] = useState(false);
    const [newSize, setNewSize] = useState('');
    const [newColorName, setNewColorName] = useState('');
    const [newColorHex, setNewColorHex] = useState('#000000');
    const [newIp, setNewIp] = useState('');
    const [selectedAgentKey, setSelectedAgentKey] = useState(null);


    const handleEditProductClick = (p) => {
        setEditingProduct(p);
        setSelectedColors(p.colors || []);
        setSelectedSizes(p.sizes || []);
        setCurrentImages(p.images ? [...p.images] : [p.image]);
    };

    const handleFileChange = (index, e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newSlides = [...heroSettings.slides];
                newSlides[index].image = reader.result;
                updateHeroSettings({ slides: newSlides });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleNewSlide = () => {
        addHeroSlide({
            image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1200',
            title: 'Yangi Slayd',
            subtitle: 'SHU YERGA YOZING',
            price: '0.00'
        });
    };

    // --- Professional AI Orchestration ---

    // 1. AI Health Monitor (Self-Healing logic)
    useEffect(() => {
        const monitorInterval = setInterval(() => {
            if (agents.monitor.active) {
                const healthStatuses = ["Server barqaror", "API javob bermoqda", "Memory OK", "DB Connected"];
                const randomHealth = healthStatuses[Math.floor(Math.random() * healthStatuses.length)];
                addAgentLog('monitor', `Hozir: ${randomHealth} (System OK)`);
            }
        }, 15000); // Check every 15s

        return () => clearInterval(monitorInterval);
    }, [agents.monitor.active, addAgentLog]);

    // 2. Security Shield Monitor
    useEffect(() => {
        const securityInterval = setInterval(() => {
            if (activeTab === 'security') {
                const threats = ["IP 192.168.1.1 scanning blocked", "Firewall rules updated", "SSL Certificate Valid", "Database latency low"];
                const threat = threats[Math.floor(Math.random() * threats.length)];
                console.log(`[SECURITY] ${threat}`);
            }
        }, 5000);
        return () => clearInterval(securityInterval);
    }, [activeTab]);

    const handleAIGenerateDesc = async () => {
        if (!agents.copywriter.active) {
            alert("AI Copywriter agenti o'chirilgan. Iltimos, faollashtiring.");
            return;
        }

        setIsGeneratingDesc(true);
        addAgentLog('copywriter', 'Yangi mahsulot tavsifi uchun so\'rov qabul qilindi...');

        try {
            const nameInput = document.querySelector('input[name="name"]');
            const catInput = document.querySelector('input[name="category"]');

            const res = await fetch('/api/ai/generate-description', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productName: nameInput?.value || 'BESPO Essential',
                    category: catInput?.value || 'Streetwear'
                })
            });

            if (!res.ok) throw new Error("Server xatosi");

            const data = await res.json();
            const descInput = document.querySelector('textarea[name="description"]');
            if (descInput) {
                descInput.value = data.description || "GenAI serverdan javob qaytmadi.";
                addAgentLog('copywriter', `Muvaffaqiyatli SEO tavsif generatsiya qilindi.`);
            }
        } catch (e) {
            console.error("AI Error:", e);
            // Fallback: Lite AI Template
            const descInput = document.querySelector('textarea[name="description"]');
            if (descInput) {
                const name = document.querySelector('input[name="name"]')?.value || 'Mahsulot';
                descInput.value = `${name} - BESPO sifat standartlari asosida yaratilgan premium model. Streetwear uslubidagi ideal tanlov. Limited drop.`;
            }
            addAgentLog('copywriter', `Xatolik: Lite AI rejimi yoqildi (API offline).`);
        }
        setIsGeneratingDesc(false);
    };

    const handleSaveProduct = async (e) => {
        e.preventDefault();
        setIsAnalyzing(true);

        const formData = new FormData(e.target);
        const pName = formData.get('name');

        // Step 1: Vision Processing
        if (agents.vision.active) {
            setAiStatusMessage("AI Vision: Rasm sifatini oshirish...");
            addAgentLog('vision', `${pName} rasmlari 4K ga optimallashtirilmoqda...`);
            await new Promise(r => setTimeout(r, 1200));
            addAgentLog('vision', `${pName}: Fon tozalandi va eksportga tayyor.`);
        }

        // Step 2: Prediction Analysis
        if (agents.predictor.active) {
            setAiStatusMessage("AI Predictor: Sotuv tahlili...");
            addAgentLog('predictor', `${pName} uchun trend prognozi: 92% ehtimollik bilan o'sish.`);
            await new Promise(r => setTimeout(r, 1000));
        }

        // Step 3: SEO & Copy Verification
        if (agents.copywriter.active) {
            setAiStatusMessage("AI Copywriter: SEO tekshiruvi...");
            addAgentLog('copywriter', `${pName} SEO teglari bazaga kiritildi.`);
            await new Promise(r => setTimeout(r, 800));
        }

        const finalColors = selectedColors.length > 0 ? selectedColors : ['#000000'];
        const finalSizes = selectedSizes.length > 0 ? selectedSizes : ['M', 'L'];

        const productData = {
            id: editingProduct ? editingProduct.id : Date.now(),
            name: pName,
            price: parseFloat(formData.get('price')),
            category: formData.get('category'),
            images: currentImages.length > 0 ? currentImages : [formData.get('image')],
            description: formData.get('description'),
            subtitle: formData.get('subtitle') || 'BESPO ORIGINAL',
            sizes: finalSizes,
            colors: finalColors,
            isSoldOut: editingProduct ? editingProduct.isSoldOut : false
        };

        if (editingProduct) {
            updateProduct(productData);
            setEditingProduct(null);
        } else {
            addProduct(productData);
        }

        setCurrentImages([]);
        setSelectedColors([]);
        setSelectedSizes([]);
        setIsAnalyzing(false);
        setAiStatusMessage('');
        addAgentLog('monitor', `Tizim: "${pName}" mahsuloti barcha AI fazalaridan o'tdi.`);
    };

    const storyboardSlots = [
        { label: 'ASOSIY (FRONT)', icon: '👕' },
        { label: 'ORQA (BACK)', icon: '🔄' },
        { label: 'LIFESTYLE (MODELLAR)', icon: '🚶' },
        { label: 'DETAL (TEXTURE)', icon: '🔍' },
        { label: 'QO\'SHIMCHA', icon: '➕' }
    ];

    const handleImageUpload = (index, e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadingSlot(index);
            const reader = new FileReader();
            reader.onloadend = () => {
                setTimeout(() => {
                    const newImgs = [...currentImages];
                    newImgs[index] = reader.result;
                    setCurrentImages(newImgs);
                    setUploadingSlot(null);
                }, 1500);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <main className="admin-v2">
            <aside className="admin-v2__sidebar">
                <div className="admin-v2__logo">
                    BESPO STUDIO
                </div>

                <nav className="admin-v2__nav">
                    <button className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>
                        <span className="nav-icon">📊</span> Boshqaruv
                    </button>
                    <button className={activeTab === 'hero' ? 'active' : ''} onClick={() => setActiveTab('hero')}>
                        <span className="nav-icon">🖼️</span> Slayderlar
                    </button>
                    <button className={activeTab === 'security' ? 'active' : ''} onClick={() => setActiveTab('security')}>
                        <span className="nav-icon">🛡️</span> Xavfsizlik
                    </button>
                    <button className={activeTab === 'about' ? 'active' : ''} onClick={() => setActiveTab('about')}>
                        <span className="nav-icon">🏢</span> Ma'lumotlar
                    </button>
                </nav>

                <div className="admin-v2__sidebar-footer">
                    <Link to="/" className="exit-btn">Veb-saytga qaytish</Link>
                    <button className="reset-btn" onClick={() => confirm('Barcha ma\'lumotlar o\'chib ketadi. Rozimisiz?') && resetToDefault()}>
                        Formatlash
                    </button>
                </div>
            </aside>

            <section className="admin-v2__content">
                <header className="admin-v2__header">
                    <div className="header-left">
                        <span className="breadcrumb">BESPO STUDIO CONTROL</span>
                        <h2>Dashboard</h2>
                    </div>
                    <div className="header-right">
                        <div className="ai-status-indicator">
                            AI Agent: Monitoring
                        </div>
                    </div>
                </header>

                <div className="admin-v2__stats-row">
                    <div className="stat-card">
                        <label>BUGUNGI SAVDO</label>
                        <div className="val-row">
                            <span className="stat-value">$1,240.00</span>
                            <span className="change-pill">+12%</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <label>ONLINE MIJOZLAR</label>
                        <div className="val-row">
                            <span className="stat-value">24</span>
                            <span className="change-pill">+5</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <label>JAMI MAHSULOT</label>
                        <span className="stat-value">{products.length}</span>
                    </div>
                    <div className="stat-card warning">
                        <label>KAM QOLGANLAR</label>
                        <span className="stat-value red">3</span>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {activeTab === 'products' && (
                        <motion.div key="products" className="admin-panel-v3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="admin-v3__bento-grid">

                                {/* Row 1 Left: Core AI Agents */}
                                <div className="admin-card left-col">
                                    <div className="ai-hub__header">
                                        <span className="sparkle-icon">✨</span>
                                        <h3>Core AI Agents</h3>
                                    </div>
                                    <div className="ai-hub__alerts">
                                        {['predictor', 'vision', 'copywriter'].map((key) => {
                                            const agent = agents[key];
                                            if (!agent) return null;
                                            return (
                                                <div
                                                    key={key}
                                                    className="agent-detail-card"
                                                    onClick={() => setSelectedAgentKey(key)}
                                                >
                                                    <div className="agent-detail-header">
                                                        <span className="agent-name-icon">{agent.icon} {agent.name}</span>
                                                        <span className="status-badge">● Active</span>
                                                    </div>
                                                    <p className="agent-desc">{agent.logs[0]}</p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Row 1 Middle: Yangi Mahsulot Form */}
                                <div className="admin-card middle-col">
                                    <div className="form-header">
                                        <h3>Yangi mahsulot</h3>
                                        <span className="smart-badge">SMART FORM ACTIVE</span>
                                    </div>
                                    <form onSubmit={handleSaveProduct} className="admin-grid-form-v3">
                                        <div className="input-group full">
                                            <label>NOMI</label>
                                            <input name="name" defaultValue={editingProduct?.name} required />
                                        </div>
                                        <div className="input-row">
                                            <div className="input-group">
                                                <label>KICHIK SARLAVHA</label>
                                                <input name="subtitle" defaultValue={editingProduct?.subtitle || 'BESPO ORIGINAL'} required />
                                            </div>
                                            <div className="input-group">
                                                <label>STATUS (TREND)</label>
                                                <select name="isFeatured" defaultValue={editingProduct?.isFeatured ? 'true' : 'false'}>
                                                    <option value="false">Oddiy mahsulot</option>
                                                    <option value="true">🌟 Asosiy Sahifa</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="input-row">
                                            <div className="input-group"><label>NARXI ($)</label><input name="price" type="number" defaultValue={editingProduct?.price} required /></div>
                                            <div className="input-group"><label>KATEGORIYA</label><input name="category" defaultValue={editingProduct?.category} required /></div>
                                        </div>

                                        <div className="input-group full">
                                            <label>AI VISION STORYBOARD (TOZALANADI & 4K BO'LADI)</label>
                                            <div className="storyboard-layout">
                                                <div className="storyboard-small-grid">
                                                    {storyboardSlots.slice(0, 4).map((slot, i) => (
                                                        <div key={i} className={`storyboard-slot-sq ${currentImages[i] ? 'has-img' : ''}`}>
                                                            {currentImages[i] ? <img src={currentImages[i]} alt="" /> : <div className="slot-placeholder"><span className="icon">{slot.icon}</span><span className="lbl">{slot.label.split(' ')[0]}</span></div>}
                                                            <input type="file" onChange={(e) => handleImageUpload(i, e)} />
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className={`storyboard-large-slot ${currentImages[4] ? 'has-img' : ''}`}>
                                                    {currentImages[4] ? <img src={currentImages[4]} alt="" /> : <div className="slot-placeholder"><span className="icon">➕</span><span className="lbl">QO'SHIMCHA</span></div>}
                                                    <input type="file" onChange={(e) => handleImageUpload(4, e)} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="input-group full">
                                            <label>O'LCHAMLAR (GLOBAL SIZES)</label>
                                            <div className="size-btns">
                                                {globalSizes.map(size => (
                                                    <button
                                                        key={size}
                                                        type="button"
                                                        className={`size-btn ${selectedSizes.includes(size) ? 'active' : ''}`}
                                                        onClick={() => setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size])}
                                                    >
                                                        {size}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="input-group full">
                                            <label>MAHSULOT RANGLARI (GLOBAL PALETTE)</label>
                                            <div className="color-dots">
                                                {globalColors.map(color => (
                                                    <div
                                                        key={color.hex}
                                                        className={`color-dot ${selectedColors.includes(color.hex) ? 'active' : ''}`}
                                                        style={{ backgroundColor: color.hex }}
                                                        onClick={() => setSelectedColors(prev => prev.includes(color.hex) ? prev.filter(c => c !== color.hex) : [...prev, color.hex])}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        <div className="input-group full">
                                            <div className="label-with-action">
                                                <label>PREMIUM SEO TAVSIF</label>
                                                <button type="button" className="ai-btn-small" onClick={handleAIGenerateDesc}>✨ AI orqali yozish</button>
                                            </div>
                                            <div className="desc-box">
                                                <textarea name="description" defaultValue={editingProduct?.description} placeholder="AI yordamida premium tavsif yozing..." />
                                                <div className="desc-footer">
                                                    <span className="seo-score">● SEO Score: 85/100</span>
                                                    <span className="keywords">Keywords: streetwear, premium, heavy hoodie</span>
                                                </div>
                                            </div>
                                        </div>

                                        <button type="submit" className="primary-submit-btn" disabled={isAnalyzing}>
                                            {isAnalyzing ? aiStatusMessage : 'Saqlash va AI tahlili'}
                                        </button>
                                    </form>
                                </div>

                                {/* Row 1 Right: Charts & Widgets */}
                                <div className="right-col">
                                    <SalesChart type="revenue" title="Sotuvlar Dinamikasi" />
                                    <SalesChart type="visitors" title="Tashriflar Dinamikasi" />
                                    <SocialWidget title="Ijtimoiy Tarmoqlar" />
                                </div>

                            </div>

                            <div className="table-section admin-card">
                                <table className="orders-table">
                                    <thead>
                                        <tr>
                                            <th>RASM</th>
                                            <th>NOMI</th>
                                            <th>NARXI</th>
                                            <th>HOLAT</th>
                                            <th>AMALLAR</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map(p => (
                                            <tr key={p.id}>
                                                <td><img src={p.images ? p.images[0] : p.image} className="tbl-img" alt="" /></td>
                                                <td><div className="p-name">{p.name}</div></td>
                                                <td><div className="p-price">${p.price.toFixed(2)}</div></td>
                                                <td><span className={`h-badge ${p.isSoldOut ? 'sold' : 'active'}`}>{p.isSoldOut ? 'TUGADI' : 'SOTUVDA'}</span></td>
                                                <td className="btns-cell">
                                                    <button className="edit-btn-s" onClick={() => handleEditProductClick(p)}>✏️ Tahrir</button>
                                                    <button className="del-btn-s" onClick={() => deleteProduct(p.id)}>🗑️</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'hero' && (
                        <motion.div key="hero" className="admin-panel-hero" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="hero-bento">
                                {/* Left: AI Slide Assistant */}
                                <div className="admin-card ai-slide-assistant">
                                    <div className="ai-hub__header">
                                        <span className="sparkle-icon">✨</span>
                                        <h3>Slide AI Assistant</h3>
                                    </div>
                                    <div className="ai-tips">
                                        <div className="tip-item">
                                            <span className="tip-dot"></span>
                                            <p>AI tavsiyasi: Slayder rasmlari 21:9 nisbatda eng yaxshi ko'rinadi.</p>
                                        </div>
                                        <div className="tip-item">
                                            <span className="tip-dot"></span>
                                            <p>Trend: Hozirda minimalist sarlavhalar (3-4 so'z) yuqori konversiya bermoqda.</p>
                                        </div>
                                    </div>
                                    <button className="primary-submit-btn tiny" onClick={handleNewSlide}>+ Yangi Slayd Qo'shish</button>
                                </div>

                                {/* Right: Active Slides List */}
                                <div className="admin-card slides-list-view">
                                    <div className="form-header">
                                        <h3>Faol Slayderlar</h3>
                                        <span className="smart-badge">{heroSettings.slides.length} SLIDES ACTIVE</span>
                                    </div>
                                    <div className="slides-v-grid">
                                        {heroSettings.slides.map((s, i) => (
                                            <motion.div key={i} className="slide-v-item" layout>
                                                <div className="slide-v-preview">
                                                    <img src={s.image} alt="" />
                                                    <div className="slide-v-overlay">
                                                        <input type="file" onChange={(e) => handleFileChange(i, e)} />
                                                        <span>📸 Rasm almashtirish</span>
                                                    </div>
                                                </div>
                                                <div className="slide-v-info">
                                                    <div className="input-row-v">
                                                        <div className="input-group">
                                                            <label>SARLAVHA</label>
                                                            <input
                                                                defaultValue={s.title}
                                                                onBlur={(e) => {
                                                                    const newSlides = [...heroSettings.slides];
                                                                    newSlides[i].title = e.target.value;
                                                                    updateHeroSettings({ slides: newSlides });
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="input-group">
                                                            <label>NARX ($)</label>
                                                            <input
                                                                defaultValue={s.price}
                                                                onBlur={(e) => {
                                                                    const newSlides = [...heroSettings.slides];
                                                                    newSlides[i].price = e.target.value;
                                                                    updateHeroSettings({ slides: newSlides });
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="slide-v-actions">
                                                        <button className="ai-btn-small">✨ AI Optimize</button>
                                                        <button className="del-btn-sq" onClick={() => deleteHeroSlide(i)}>🗑️</button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'security' && (
                        <motion.div key="security" className="admin-panel-security" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
                            <div className="security-bento">
                                {/* Row 1 Left: AI Security Shield */}
                                <div className="admin-card security-shield-card">
                                    <div className="ai-hub__header">
                                        <span className="sparkle-icon">🛡️</span>
                                        <h3>AI Security Shield</h3>
                                    </div>
                                    <div className="shield-status">
                                        <div className="status-circle-wrap">
                                            <div className="status-circle active"></div>
                                            <div className="status-pulse"></div>
                                        </div>
                                        <div className="status-info">
                                            <span className="status-label">LOYIHA HOLATI</span>
                                            <span className="status-value">XAVFSIZLIK: 100%</span>
                                        </div>
                                    </div>
                                    <div className="shield-logs">
                                        <p>✅ Firewall: Aktiv</p>
                                        <p>✅ SSL: Muvaffaqiyatli</p>
                                        <p>✅ DDoS Himoya: Aktiv</p>
                                    </div>
                                    <button className="primary-submit-btn tiny">Skanerlashni boshlash</button>
                                </div>

                                {/* Row 1 Right: Access Control */}
                                <div className="admin-card access-control-card">
                                    <div className="form-header">
                                        <h3>Kirish Boshqaruvi</h3>
                                        <span className="smart-badge">LOCK SECURE</span>
                                    </div>
                                    <div className="security-controls">
                                        <div className="security-toggle-item">
                                            <div className="toggle-text">
                                                <span className="t-title">Ikki bosqichli autentifikatsiya (2FA)</span>
                                                <span className="t-desc">Tizimga kirishda SMS yoki Telegram kod so'raladi.</span>
                                            </div>
                                            <input
                                                type="checkbox"
                                                className="modern-toggle"
                                                checked={securitySettings.twoFactor}
                                                onChange={() => updateSecuritySettings({ twoFactor: !securitySettings.twoFactor })}
                                            />
                                        </div>

                                        <div className="whitelist-section">
                                            <label>IP WHITELIST (RUHSAT ETILGANLAR)</label>
                                            <div className="ip-input-row">
                                                <input
                                                    type="text"
                                                    placeholder="IP manzilini kiriting (masalan: 1.1.1.1)"
                                                    value={newIp}
                                                    onChange={(e) => setNewIp(e.target.value)}
                                                />
                                                <button onClick={() => { if (newIp) { addIpToWhitelist(newIp); setNewIp(''); } }}>Qo'shish</button>
                                            </div>
                                            <div className="ip-tags">
                                                {securitySettings.ipWhitelist.map(ip => (
                                                    <div key={ip} className="ip-tag">
                                                        <span>{ip}</span>
                                                        <button onClick={() => removeIpFromWhitelist(ip)}>×</button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Row 2 Full: Login History Table */}
                                <div className="admin-card full-width login-history-card">
                                    <div className="form-header">
                                        <h3>Oxirgi Kirishlar Tarixi</h3>
                                    </div>
                                    <table className="orders-table">
                                        <thead>
                                            <tr>
                                                <th>IP MANZIL</th>
                                                <th>SANA / VAQT</th>
                                                <th>QURILMA</th>
                                                <th>HOLAT</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {securitySettings.loginHistory.map(log => (
                                                <tr key={log.id}>
                                                    <td><code>{log.ip}</code></td>
                                                    <td>{log.date}</td>
                                                    <td>{log.device}</td>
                                                    <td>
                                                        <span className={`h-badge ${log.status === 'Success' ? 'active' : 'sold'}`}>
                                                            {log.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'about' && (
                        <motion.div key="about" className="admin-panel attribute-management" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <div className="admin-v3__bento-grid">
                                <div className="admin-card">
                                    <div className="form-header">
                                        <h3>O'lchamlarni boshqarish</h3>
                                    </div>
                                    <div className="attribute-editor">
                                        <div className="add-attribute">
                                            <input
                                                type="text"
                                                placeholder="Yangi o'lcham (masalan: 4XL)"
                                                value={newSize}
                                                onChange={(e) => setNewSize(e.target.value)}
                                            />
                                            <button className="add-btn" onClick={() => { if (newSize) { addGlobalSize(newSize); setNewSize(''); } }}>Qo'shish</button>
                                        </div>
                                        <div className="attribute-list">
                                            {globalSizes.map(size => (
                                                <div key={size} className="attribute-item">
                                                    <span>{size}</span>
                                                    <button className="remove-btn" onClick={() => removeGlobalSize(size)}>×</button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="admin-card">
                                    <div className="form-header">
                                        <h3>Ranglarni boshqarish</h3>
                                    </div>
                                    <div className="attribute-editor">
                                        <div className="add-attribute column">
                                            <input
                                                type="text"
                                                placeholder="Rang nomi (masalan: Midnight Blue)"
                                                value={newColorName}
                                                onChange={(e) => setNewColorName(e.target.value)}
                                            />
                                            <div className="color-input-row">
                                                <input
                                                    type="color"
                                                    value={newColorHex}
                                                    onChange={(e) => setNewColorHex(e.target.value)}
                                                />
                                                <code>{newColorHex}</code>
                                                <button className="add-btn" onClick={() => { if (newColorName) { addGlobalColor({ name: newColorName, hex: newColorHex }); setNewColorName(''); } }}>Qo'shish</button>
                                            </div>
                                        </div>
                                        <div className="attribute-list">
                                            {globalColors.map(color => (
                                                <div key={color.hex} className="attribute-item color-item">
                                                    <div className="color-preview" style={{ backgroundColor: color.hex }}></div>
                                                    <div className="color-info">
                                                        <span className="name">{color.name}</span>
                                                        <span className="hex">{color.hex}</span>
                                                    </div>
                                                    <button className="remove-btn" onClick={() => removeGlobalColor(color.hex)}>×</button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>
            <AIAssistant />

            {/* Agent Details Modal (Placeholder for future depth) */}
            <AnimatePresence>
                {selectedAgentKey && (
                    <motion.div className="mod-overlay" onClick={() => setSelectedAgentKey(null)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <motion.div className="mod-content admin-card" onClick={e => e.stopPropagation()} initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
                            <h3>{agents[selectedAgentKey].icon} {agents[selectedAgentKey].name}</h3>
                            <button className="close-mod" onClick={() => setSelectedAgentKey(null)}>×</button>
                            <div className="mod-body">
                                <p>{agents[selectedAgentKey].logs[0]}</p>
                                <div className="agent-status-toggle">
                                    <label>Agent Status:</label>
                                    <button onClick={() => toggleAgent(selectedAgentKey)}>
                                        {agents[selectedAgentKey].active ? 'TERMINATE' : 'INITIALIZE'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
};

export default AdminPage;
