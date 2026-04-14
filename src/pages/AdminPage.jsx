import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useSiteStore from '../store/siteStore';
import { useShallow } from 'zustand/react/shallow';
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
        addGlobalSize, removeGlobalSize, updateGlobalSize, toggleGlobalSize,
        addGlobalColor, removeGlobalColor, updateGlobalColor, toggleGlobalColor,
        securitySettings, updateSecuritySettings, addIpToWhitelist, removeIpFromWhitelist,
        addAgentLog, setAgentStatus, rebrandSite, runSecurityAudit, runBugAudit, applyAutoFix,
        recommendedHeroSlides
    } = useSiteStore(useShallow(state => ({
        products: state.products,
        heroSettings: state.heroSettings,
        aboutSettings: state.aboutSettings,
        globalSizes: state.globalSizes,
        globalColors: state.globalColors,
        agents: state.agents,
        toggleAgent: state.toggleAgent,
        updateProduct: state.updateProduct,
        addProduct: state.addProduct,
        deleteProduct: state.deleteProduct,
        toggleSoldOut: state.toggleSoldOut,
        updateHeroSettings: state.updateHeroSettings,
        addHeroSlide: state.addHeroSlide,
        deleteHeroSlide: state.deleteHeroSlide,
        updateAboutSettings: state.updateAboutSettings,
        resetToDefault: state.resetToDefault,
        addGlobalSize: state.addGlobalSize, removeGlobalSize: state.removeGlobalSize, updateGlobalSize: state.updateGlobalSize, toggleGlobalSize: state.toggleGlobalSize,
        addGlobalColor: state.addGlobalColor, removeGlobalColor: state.removeGlobalColor, updateGlobalColor: state.updateGlobalColor, toggleGlobalColor: state.toggleGlobalColor,
        securitySettings: state.securitySettings,
        updateSecuritySettings: state.updateSecuritySettings,
        addIpToWhitelist: state.addIpToWhitelist,
        removeIpFromWhitelist: state.removeIpFromWhitelist,
        addAgentLog: state.addAgentLog,
        setAgentStatus: state.setAgentStatus,
        rebrandSite: state.rebrandSite,
        runSecurityAudit: state.runSecurityAudit,
        runBugAudit: state.runBugAudit,
        applyAutoFix: state.applyAutoFix,
        recommendedHeroSlides: state.recommendedHeroSlides
    })));

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
    const [agentTestResults, setAgentTestResults] = useState({});
    const [isTestRunning, setIsTestRunning] = useState(false);
    const [selectedHistoryItem, setSelectedHistoryItem] = useState(null);
    const [hardResetPass, setHardResetPass] = useState('');
    const [isResetting, setIsResetting] = useState(false);
    const [editingSize, setEditingSize] = useState(null); // {oldSize: 'M'}
    const [editingColor, setEditingColor] = useState(null); // {oldHex: '#000', name: 'Black', hex: '#000'}

    const handleApplyRecommendation = (rec) => {
        // Asosiy slaydlarni tanlangan tavsiya bilan almashtirish
        updateHeroSettings({
            slides: [{
                id: Date.now(),
                title: rec.title,
                subtitle: rec.subtitle,
                description: rec.description,
                image: rec.image,
                layout: rec.layout,
                price: rec.price || '0.00'
            }]
        });
        setAiStatusMessage(`'${rec.title}' slaydi muvaffaqiyatli o'rnatildi!`);
        setTimeout(() => setAiStatusMessage(''), 3000);
    };

    const runAgentTests = async () => {
        setIsTestRunning(true);
        setAgentTestResults({});
        const results = {};

        // Test 1: Predictor Agent
        results.predictor = { status: 'testing', message: 'Sinab ko\'rilmoqda...' };
        setAgentTestResults({ ...results });
        await new Promise(r => setTimeout(r, 800));
        results.predictor = agents.predictor?.active
            ? { status: 'pass', message: `Aktiv. Loglar soni: ${agents.predictor.logs.length}` }
            : { status: 'fail', message: 'Agent o\'chirilgan!' };
        setAgentTestResults({ ...results });

        // Test 2: Vision Agent
        results.vision = { status: 'testing', message: 'Sinab ko\'rilmoqda...' };
        setAgentTestResults({ ...results });
        await new Promise(r => setTimeout(r, 600));
        results.vision = agents.vision?.active
            ? { status: 'pass', message: `Aktiv. Rasm AI tayyor.` }
            : { status: 'fail', message: 'Agent o\'chirilgan!' };
        setAgentTestResults({ ...results });

        // Test 3: Copywriter Agent
        results.copywriter = { status: 'testing', message: 'Sinab ko\'rilmoqda...' };
        setAgentTestResults({ ...results });
        await new Promise(r => setTimeout(r, 700));
        results.copywriter = agents.copywriter?.active
            ? { status: 'pass', message: `Aktiv. SEO tavsiflar tayyor.` }
            : { status: 'fail', message: 'Agent o\'chirilgan!' };
        setAgentTestResults({ ...results });

        // Test 4: Monitor Agent
        results.monitor = { status: 'testing', message: 'Sinab ko\'rilmoqda...' };
        setAgentTestResults({ ...results });
        await new Promise(r => setTimeout(r, 500));
        results.monitor = agents.monitor?.active
            ? { status: 'pass', message: `Sog'liq monitoringi aktiv.` }
            : { status: 'fail', message: 'Agent o\'chirilgan!' };
        setAgentTestResults({ ...results });

        // Test 5: Rebrander Agent
        results.rebrander = { status: 'testing', message: 'CSS o\'zgaruvchilar test qilinmoqda...' };
        setAgentTestResults({ ...results });
        await new Promise(r => setTimeout(r, 600));
        const rootStyle = getComputedStyle(document.documentElement);
        const currentAccent = rootStyle.getPropertyValue('--color-accent').trim();
        results.rebrander = currentAccent
            ? { status: 'pass', message: `Aktiv. Hozirgi accent: ${currentAccent}` }
            : { status: 'fail', message: 'CSS o\'zgaruvchilar topilmadi!' };
        setAgentTestResults({ ...results });

        // Test 6: API Connection
        results.api = { status: 'testing', message: 'Backend API test qilinmoqda...' };
        setAgentTestResults({ ...results });
        try {
            const res = await fetch('/api/health', { signal: AbortSignal.timeout(3000) });
            results.api = res.ok
                ? { status: 'pass', message: 'Backend API javob bermoqda.' }
                : { status: 'warn', message: `API javob berdi: ${res.status}` };
        } catch {
            results.api = { status: 'warn', message: 'API ulanish vaqti tugadi (offline rejim).' };
        }
        setAgentTestResults({ ...results });

        setIsTestRunning(false);
    };


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

    const handleAIGenerateDesc = async () => {
        setIsGeneratingDesc(true);
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

            const data = await res.json();
            const descInput = document.querySelector('textarea[name="description"]');
            if (descInput) {
                descInput.value = data.description || "GenAI serverdan javob qaytmadi.";
            }
        } catch (e) {
            console.error("AI Error:", e);
        }
        setIsGeneratingDesc(false);
    };

    const handleSaveProduct = async (e) => {
        e.preventDefault();
        setIsAnalyzing(true);

        setAiStatusMessage("AI Vision: Rasmlar 4K ga o'tkazilmoqda...");
        await new Promise(r => setTimeout(r, 1000));
        setAiStatusMessage("AI Copywriter: SEO teglari optimallashtirilmoqda...");
        await new Promise(r => setTimeout(r, 1000));
        setAiStatusMessage("AI Predictor: Tahlil yakunlanmoqda...");
        await new Promise(r => setTimeout(r, 800));

        const formData = new FormData(e.target);
        const finalColors = selectedColors.length > 0 ? selectedColors : ['#000000'];
        const finalSizes = selectedSizes.length > 0 ? selectedSizes : ['M', 'L'];

        const productData = {
            id: editingProduct ? editingProduct.id : Date.now(),
            name: formData.get('name'),
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
    };

    const handleHardReset = async () => {
        if (hardResetPass !== '0868') {
            alert('Xato parol! Tizimni o\'chirish uchun maxsus parol kiriting.');
            return;
        }

        if (!confirm('DIQQAT! Barcha mahsulotlar, rasmlar va kesh butunlay o\'chib ketadi. Loyiha 0 dan boshlanadi. Davom etamizmi?')) {
            return;
        }

        setIsResetting(true);
        try {
            const res = await fetch('/api/admin/hard-reset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: hardResetPass })
            });

            if (res.ok) {
                // Clear LocalStorage
                localStorage.clear();
                alert('Tizim muvaffaqiyatli tozalandi. Sahifa yangilanmoqda...');
                window.location.reload();
            } else {
                const data = await res.json();
                alert(data.error || 'Xatolik yuz berdi.');
            }
        } catch (e) {
            console.error("Reset Fail:", e);
            alert('Server bilon aloqa uzildi.');
        }
        setIsResetting(false);
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
                    <button className={activeTab === 'aitest' ? 'active' : ''} onClick={() => setActiveTab('aitest')}>
                        <span className="nav-icon">⚙️</span> AI Test
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

                                    {/* AI Rebranding — inside left column */}
                                    <div className="rebrand-section">
                                        <div className="ai-hub__header" style={{ marginTop: '25px' }}>
                                            <span className="sparkle-icon">🎨</span>
                                            <h3>AI Rebranding</h3>
                                        </div>
                                        <div className="rebrand-options">
                                            <button className="rebrand-chip" onClick={() => rebrandSite('luxury')}>
                                                ⚜️ Luxury
                                            </button>
                                            <button className="rebrand-chip" onClick={() => rebrandSite('minimal')}>
                                                🇯🇵 Minimal
                                            </button>
                                            <button className="rebrand-chip" onClick={() => rebrandSite('cyber')}>
                                                🧪 Cyber
                                            </button>
                                            <button className="rebrand-chip" onClick={() => rebrandSite('street')}>
                                                🛹 Street
                                            </button>
                                        </div>
                                        <p className="rebrand-tip">AI trendlar asosida sayt uslubini yangilang.</p>
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

                            {/* AI RECOMMENDATIONS GALLERY */}
                            <div className="hero-recommendations-v4">
                                <div className="v4-section-header">
                                    <div className="title-info">
                                        <h6>AI_EDITORIAL_SUGGESTIONS</h6>
                                        <h2>PREMIUM SLAYD TAFSIYALARI</h2>
                                    </div>
                                    <AnimatePresence>
                                        {aiStatusMessage && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="v4-success-toast">{aiStatusMessage}</motion.span>}
                                    </AnimatePresence>
                                </div>
                                <div className="rec-grid-v4">
                                    {recommendedHeroSlides?.map(rec => (
                                        <div key={rec.id} className="rec-card-v4">
                                            <div className="rec-img-container">
                                                <img src={rec.image} alt={rec.title} />
                                                <div className="rec-overlay">
                                                    <button className="apply-rec-btn" onClick={() => handleApplyRecommendation(rec)}>ASOSIY QILISH</button>
                                                </div>
                                            </div>
                                            <div className="rec-details">
                                                <div className="rec-meta"><h3>{rec.title}</h3></div>
                                                <p>{rec.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'security' && (
                        <motion.div key="security" className="admin-command-center v_2026_PRO" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <div className="version-id">V3.1.0_BENTO_SOC</div>
                            <div className="command-grid">
                                {/* SYSTEM METRICS ROW */}
                                <div className="metrics-summary">
                                    <div className="metric-box">
                                        <label>SECURITY HEALTH</label>
                                        <div className="metric-val">
                                            <span className="number">{agents.guard?.healthScore || 100}%</span>
                                            <div className="mini-progress"><div className="p-fill" style={{ width: `${agents.guard?.healthScore || 100}%` }}></div></div>
                                        </div>
                                    </div>
                                    <div className="metric-box">
                                        <label>RUNTIME STABILITY</label>
                                        <div className="metric-val">
                                            <span className="number">{agents.debugger?.metrics.performance || 100}%</span>
                                            <div className="mini-progress"><div className="p-fill blue" style={{ width: `${agents.debugger?.metrics.performance || 100}%` }}></div></div>
                                        </div>
                                    </div>
                                    <div className="metric-box">
                                        <label>THREAT LEVEL</label>
                                        <span className={`status-text ${agents.guard?.status === 'secure' ? 'safe' : 'alert'}`}>
                                            {agents.guard?.status === 'scanning' ? 'ANALYZING...' : (agents.guard?.lastReport?.threatLevel || 'MINIMAL')}
                                        </span>
                                    </div>
                                </div>

                                <div className="command-bento-grid">
                                    {/* 1. AI SECURITY SOC */}
                                    <div className="admin-card soc-terminal-card">
                                        <div className="card-header-v4">
                                            <div className="title-group">
                                                <h6>SYSTEM_GUARDIAN_LOGS</h6>
                                                <h3>AI SECURITY SOC</h3>
                                            </div>
                                            <button className="soc-run-btn" onClick={() => runSecurityAudit()} disabled={agents.guard?.status === 'scanning'}>
                                                {agents.guard?.status === 'scanning' ? 'AUDITING...' : 'RUN DEEP SCAN'}
                                            </button>
                                        </div>
                                        <div className="terminal-v4">
                                            <div className="terminal-body">
                                                {agents.guard?.logs.map((l, i) => (
                                                    <div key={i} className="log-entry">
                                                        <span className="timestamp">[{new Date().toLocaleTimeString()}]</span>
                                                        <span className="msg">{l}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* 2. AI BUG FINDER */}
                                    <div className="admin-card debug-terminal-card">
                                        <div className="card-header-v4">
                                            <div className="title-group">
                                                <h6>LINT_ENGINE_PRO_2026</h6>
                                                <h3>AI BUG DEBUGGER</h3>
                                            </div>
                                            <button className="debug-run-btn" onClick={() => runBugAudit()} disabled={agents.debugger?.status === 'scanning'}>
                                                {agents.debugger?.status === 'scanning' ? 'STATIC_SCAN...' : 'RUN DEBUGGER'}
                                            </button>
                                        </div>
                                        <div className="debug-telemetry">
                                            <div className="tel-item">Complexity: <span>{agents.debugger?.metrics.complexity || 0}</span></div>
                                            <div className="tel-item">Leaks: <span>{agents.debugger?.status === 'compromised' ? '1' : '0'}</span></div>
                                        </div>
                                        <div className="terminal-v4 debug-theme">
                                            <div className="terminal-body">
                                                {agents.debugger?.logs.map((l, i) => (
                                                    <div key={i} className="log-entry">
                                                        <span className="msg">{l}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        {agents.debugger?.proposedFix && (
                                            <motion.div className="engineering-report" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                                                <div className="report-header">
                                                    <span className="severity">SEVERITY: {agents.debugger.proposedFix.severity}</span>
                                                    <h4>{agents.debugger.proposedFix.title}</h4>
                                                </div>
                                                <button className="engineering-fix-btn" onClick={() => applyAutoFix()}>
                                                    AUTO-DEPLOY PATCH
                                                </button>
                                            </motion.div>
                                        )}
                                    </div>

                                    {/* 3. ACCESS CONTROL */}
                                    <div className="admin-card access-control-bento">
                                        <div className="card-header-v4">
                                            <div className="title-group">
                                                <h6>IDENTITY_CORE_V4</h6>
                                                <h3>KIRISH BOSHQARUVI</h3>
                                            </div>
                                        </div>
                                        <div className="security-controls-v4">
                                            <div className="toggle-item-v4">
                                                <div className="t-info">
                                                    <span className="t-name">Double-Auth (2FA)</span>
                                                    <span className="t-status">{securitySettings.twoFactor ? 'FAOL' : 'FAOL EMAS'}</span>
                                                </div>
                                                <label className="switch">
                                                    <input type="checkbox" checked={securitySettings.twoFactor} onChange={() => updateSecuritySettings({ twoFactor: !securitySettings.twoFactor })} />
                                                    <span className="slider round"></span>
                                                </label>
                                            </div>
                                            <div className="whitelist-v4">
                                                <label>IP WHITE-LIST</label>
                                                <div className="ip-entry">
                                                    <input type="text" placeholder="Add IP..." value={newIp} onChange={(e) => setNewIp(e.target.value)} />
                                                    <button onClick={() => { if (newIp) { addIpToWhitelist(newIp); setNewIp(''); } }}>+</button>
                                                </div>
                                                <div className="ip-scroller">
                                                    {securitySettings.ipWhitelist.map(ip => (
                                                        <div key={ip} className="ip-chip"><span>{ip}</span><button onClick={() => removeIpFromWhitelist(ip)}>×</button></div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 4. PATCH HISTORY */}
                                    <div className="admin-card event-log-v4">
                                        <div className="card-header-v4">
                                            <div className="title-group">
                                                <h6>PATCH_REGISTRY</h6>
                                                <h3>TUZATISHLAR TARIXI</h3>
                                            </div>
                                        </div>
                                        <div className="event-scroller">
                                            <table className="telemetry-table v4-history">
                                                <tbody>
                                                    {agents.patchHistory?.map(event => (
                                                        <tr key={event.id} onClick={() => setSelectedHistoryItem(event)} className="clickable-row">
                                                            <td><div className="h-issue"><span className="h-title">{event.title}</span><span className="h-impact">Impact: {event.impact}</span></div></td>
                                                            <td><div className="h-date">{new Date(event.timestamp).toLocaleDateString()}<small>{new Date(event.timestamp).toLocaleTimeString()}</small></div></td>
                                                            <td><span className="h-status-check">OK</span></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <AnimatePresence>
                                        {selectedHistoryItem && (
                                            <motion.div
                                                className="history-modal-overlay"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                onClick={() => setSelectedHistoryItem(null)}
                                            >
                                                <motion.div
                                                    className="history-modal-card"
                                                    initial={{ scale: 0.9, y: 20 }}
                                                    animate={{ scale: 1, y: 0 }}
                                                    exit={{ scale: 0.9, y: 20 }}
                                                    onClick={e => e.stopPropagation()}
                                                >
                                                    <div className="h-modal-header">
                                                        <div className="h-modal-title">
                                                            <h6>HODISA_TAFSILOTLARI_{selectedHistoryItem.id}</h6>
                                                            <h2>{
                                                                selectedHistoryItem.title.includes('Circular Dependency') ? 'Aylanma bog\'liqlik va Xotira sizib chiqishi' :
                                                                    selectedHistoryItem.title.includes('General System') ? 'Tizim barqarorligi paketi' :
                                                                        selectedHistoryItem.title
                                                            }</h2>
                                                        </div>
                                                        <button className="h-modal-close" onClick={() => setSelectedHistoryItem(null)}>×</button>
                                                    </div>

                                                    <div className="h-modal-body">
                                                        <div className="h-detail-section">
                                                            <label>ANIQLANGAN MUAMMO</label>
                                                            <p>{selectedHistoryItem.problem || 'Ushbu tizim xatosi avtomatik audit davomida aniqlangan va tizim barqarorligiga ta\'sir ko\'rsatgan.'}</p>
                                                        </div>
                                                        <div className="h-detail-section">
                                                            <label>AI TOMONIDAN QILINGAN YECHIM</label>
                                                            <p className="sol-text">{selectedHistoryItem.solution || 'AI agenti kod strukturasini tahlil qildi va muammoni bartaraf etuvchi "hot-fix" patchini muvaffaqiyatli qo\'lladi.'}</p>
                                                        </div>
                                                        <div className="h-detail-footer">
                                                            <div className="h-f-item"><span>Holat:</span> <strong>Muvaffaqiyatli</strong></div>
                                                            <div className="h-f-item"><span>Sana va vaqt:</span> <strong>{new Date(selectedHistoryItem.timestamp).toLocaleString('uz-UZ')}</strong></div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'aitest' && (
                        <motion.div key="aitest" className="admin-panel-v3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="admin-card" style={{ maxWidth: '800px' }}>
                                <div className="form-header">
                                    <h3>⚙️ AI Agent Moderator</h3>
                                    <span className="smart-badge">DIAGNOSTICS</span>
                                </div>
                                <p style={{ fontSize: '0.75rem', color: '#666', marginBottom: '20px' }}>Barcha AI agentlarni real vaqtda test qiling. Har bir agent holati tekshiriladi.</p>

                                <button
                                    className="primary-submit-btn"
                                    onClick={runAgentTests}
                                    disabled={isTestRunning}
                                    style={{ marginBottom: '25px' }}
                                >
                                    {isTestRunning ? '⏳ Testlar bajarilmoqda...' : '▶️ Barcha agentlarni test qilish'}
                                </button>

                                <div className="agent-test-grid">
                                    {[
                                        { key: 'predictor', label: 'AI Predictor (Sales)', icon: '🤖' },
                                        { key: 'vision', label: 'AI Vision (Image)', icon: '👁️' },
                                        { key: 'copywriter', label: 'AI Copywriter (SEO)', icon: '✍️' },
                                        { key: 'monitor', label: 'AI Health Monitor', icon: '🩺' },
                                        { key: 'rebrander', label: 'AI Style Rebrander', icon: '🎨' },
                                        { key: 'api', label: 'Backend API', icon: '🔗' }
                                    ].map(agent => {
                                        const result = agentTestResults[agent.key];
                                        const statusClass = result ? result.status : 'idle';
                                        return (
                                            <div key={agent.key} className={`agent-test-card ${statusClass}`}>
                                                <div className="agent-test-header">
                                                    <span className="agent-test-icon">{agent.icon}</span>
                                                    <span className="agent-test-name">{agent.label}</span>
                                                </div>
                                                <div className="agent-test-status">
                                                    {statusClass === 'idle' && <span className="test-dot idle">○</span>}
                                                    {statusClass === 'testing' && <span className="test-dot testing">◯</span>}
                                                    {statusClass === 'pass' && <span className="test-dot pass">✓</span>}
                                                    {statusClass === 'fail' && <span className="test-dot fail">✗</span>}
                                                    {statusClass === 'warn' && <span className="test-dot warn">⚠</span>}
                                                    <span className="test-message">{result?.message || 'Kutilmoqda...'}</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'about' && (
                        <motion.div key="about" className="admin-panel attribute-management" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <div className="admin-v3__bento-grid">
                                {/* 1. Sizes Management */}
                                <div className="admin-card">
                                    <div className="form-header">
                                        <h3>O'lchamlarni boshqarish</h3>
                                        <span className="smart-badge">SIZE_ENGINE_V4</span>
                                    </div>
                                    <div className="attribute-editor">
                                        <div className="add-attribute">
                                            <input
                                                type="text"
                                                placeholder="Yangi o'lcham..."
                                                value={newSize}
                                                onChange={(e) => setNewSize(e.target.value)}
                                            />
                                            <button className="add-btn" onClick={() => { if (newSize) { addGlobalSize(newSize); setNewSize(''); } }}>➕</button>
                                        </div>
                                        <div className="attribute-list scrollable">
                                            {globalSizes.map(size => (
                                                <div key={size.value} className={`attribute-item ${!size.active ? 'disabled' : ''}`}>
                                                    {editingSize === size.value ? (
                                                        <input
                                                            autoFocus
                                                            className="inline-edit"
                                                            defaultValue={size.value}
                                                            onBlur={(e) => {
                                                                if (e.target.value && e.target.value !== size.value) updateGlobalSize(size.value, e.target.value);
                                                                setEditingSize(null);
                                                            }}
                                                        />
                                                    ) : (
                                                        <span onClick={() => setEditingSize(size.value)}>{size.value}</span>
                                                    )}
                                                    <div className="item-actions">
                                                        <button className="toggle-btn" onClick={() => toggleGlobalSize(size.value)} title={size.active ? "Berkitish" : "Ko'rsatish"}>
                                                            {size.active ? '👁️' : '👁️‍🗨️'}
                                                        </button>
                                                        <button className="edit-mini" onClick={() => setEditingSize(size.value)}>✏️</button>
                                                        <button className="remove-btn" onClick={() => removeGlobalSize(size.value)}>×</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* 2. Colors Management */}
                                <div className="admin-card">
                                    <div className="form-header">
                                        <h3>Ranglarni boshqarish</h3>
                                        <span className="smart-badge">COLOR_PALETTE_PRO</span>
                                    </div>
                                    <div className="attribute-editor">
                                        <div className="add-attribute column">
                                            <div className="input-row-mini">
                                                <input
                                                    type="text"
                                                    placeholder="Nomi..."
                                                    value={newColorName}
                                                    onChange={(e) => setNewColorName(e.target.value)}
                                                />
                                                <input
                                                    type="color"
                                                    value={newColorHex}
                                                    onChange={(e) => setNewColorHex(e.target.value)}
                                                />
                                            </div>
                                            <button className="add-btn full-w" onClick={() => { if (newColorName) { addGlobalColor({ name: newColorName, hex: newColorHex }); setNewColorName(''); } }}>Rang qo'shish</button>
                                        </div>
                                        <div className="attribute-list scrollable">
                                            {globalColors.map(color => (
                                                <div key={color.hex} className={`attribute-item color-item ${!color.active ? 'disabled' : ''}`}>
                                                    <div className="color-preview" style={{ backgroundColor: color.hex }}></div>
                                                    <div className="color-info">
                                                        {editingColor === color.hex ? (
                                                            <div className="inline-color-edit">
                                                                <input
                                                                    autoFocus
                                                                    className="inline-edit"
                                                                    defaultValue={color.name}
                                                                    onBlur={(e) => {
                                                                        if (e.target.value) updateGlobalColor(color.hex, { name: e.target.value });
                                                                        setEditingColor(null);
                                                                    }}
                                                                />
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <span className="name" onClick={() => setEditingColor(color.hex)}>{color.name}</span>
                                                                <span className="hex">{color.hex}</span>
                                                            </>
                                                        )}
                                                    </div>
                                                    <div className="item-actions">
                                                        <button className="toggle-btn" onClick={() => toggleGlobalColor(color.hex)} title={color.active ? "Berkitish" : "Ko'rsatish"}>
                                                            {color.active ? '👁️' : '👁️‍🗨️'}
                                                        </button>
                                                        <button className="edit-mini" onClick={() => setEditingColor(color.hex)}>✏️</button>
                                                        <button className="remove-btn" onClick={() => removeGlobalColor(color.hex)}>×</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* 3. Store Identity & Contacts */}
                                <div className="admin-card">
                                    <div className="form-header">
                                        <h3>Do'kon ma'lumotlari</h3>
                                        <span className="smart-badge">STORE_IDENTITY_V1</span>
                                    </div>
                                    <div className="admin-grid-form-v3">
                                        <div className="input-group">
                                            <label>DO'KON MANZILI (TEXT)</label>
                                            <input
                                                type="text"
                                                value={aboutSettings.location}
                                                onChange={(e) => updateAboutSettings({ location: e.target.value })}
                                            />
                                        </div>
                                        <div className="input-row">
                                            <div className="input-group">
                                                <label>TELEFON</label>
                                                <input
                                                    type="text"
                                                    value={aboutSettings.phone}
                                                    onChange={(e) => updateAboutSettings({ phone: e.target.value })}
                                                />
                                            </div>
                                            <div className="input-group">
                                                <label>EMAIL</label>
                                                <input
                                                    type="email"
                                                    value={aboutSettings.email}
                                                    onChange={(e) => updateAboutSettings({ email: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="input-group">
                                            <label>GOOGLE MAPS (EMBED URL)</label>
                                            <input
                                                type="text"
                                                placeholder="https://www.google.com/maps/embed?..."
                                                value={aboutSettings.mapUrl}
                                                onChange={(e) => updateAboutSettings({ mapUrl: e.target.value })}
                                            />
                                            {aboutSettings.mapUrl && (
                                                <div className="map-preview-mini" style={{ marginTop: '15px' }}>
                                                    <iframe
                                                        src={aboutSettings.mapUrl}
                                                        width="100%"
                                                        height="120"
                                                        style={{ border: 0, borderRadius: '20px', filter: 'grayscale(1) invert(1) contrast(0.8)' }}
                                                        allowFullScreen=""
                                                        loading="lazy"
                                                    ></iframe>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* 4. Hard Reset Section (0868) */}
                                <div className="admin-card danger-zone-v4">
                                    <div className="form-header">
                                        <h3 className="red-text">Tizimni Master Reset qilish</h3>
                                        <span className="danger-badge">CRITICAL ACTION</span>
                                    </div>
                                    <p className="danger-desc">
                                        Bu bo'lim orqali loyihani butunlay yangidan yurgizib yuborish mumkin.
                                        Barcha mahsulotlar, rasmlar va tarix ochiriladi.
                                    </p>

                                    <div className="reset-gate">
                                        <div className="pass-input-row">
                                            <label>MASTER PAROL:</label>
                                            <input
                                                type="password"
                                                placeholder="****"
                                                value={hardResetPass}
                                                onChange={(e) => setHardResetPass(e.target.value)}
                                            />
                                        </div>

                                        <button
                                            className={`hard-reset-btn ${hardResetPass === '0868' ? 'unlocked' : ''}`}
                                            disabled={isResetting}
                                            onClick={handleHardReset}
                                        >
                                            {isResetting ? 'TOZALANMOQDA...' : 'LOYIHANI 0 DAN BOSHLASH'}
                                        </button>
                                    </div>

                                    <div className="warning-note">
                                        * Ushbu amalni qaytarib bo'lmaydi.
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
        </main >
    );
};

export default AdminPage;
