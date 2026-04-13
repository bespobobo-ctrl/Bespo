import { useState } from 'react';
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
        addGlobalSize, removeGlobalSize, addGlobalColor, removeGlobalColor
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

    const handleAIGenerateDesc = async () => {
        setIsGeneratingDesc(true);
        try {
            // Read current values to send to Gemini
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

        // Core 3 AIs Processing Pipeline
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

    const storyboardSlots = [
        { label: 'Asosiy (Front)', icon: '👕' },
        { label: 'Orqa (Back)', icon: '🔄' },
        { label: 'Lifestyle (Modellar)', icon: '🚶' },
        { label: 'Detal (Texture)', icon: '🔍' },
        { label: 'Qo\'shimcha', icon: '➕' }
    ];

    const handleImageUpload = (index, e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadingSlot(index);
            const reader = new FileReader();
            reader.onloadend = () => {
                // Simulate AI Vision API Processing
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
                    <span className="accent">B</span>ESPO <small>STUDIO</small>
                </div>

                <nav className="admin-v2__nav">
                    <button className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>
                        <span className="nav-icon">📊</span> Boshqaruv
                    </button>
                    <button className={activeTab === 'hero' ? 'active' : ''} onClick={() => setActiveTab('hero')}>
                        <span className="nav-icon">🖼️</span> Slayderlar
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
                        <span className="breadcrumb">Bespo Studio Control</span>
                        <h2>{activeTab === 'products' ? 'Dashboard' : activeTab === 'hero' ? 'Slayderlar' : 'Ma\'lumotlar'}</h2>
                    </div>
                    <div className="header-right">
                        <div className="ai-status-indicator">
                            <span className="pulse"></span>
                            AI Agent: Monitoring
                        </div>
                    </div>
                </header>

                <AnimatePresence mode="wait">
                    {activeTab === 'products' && (
                        <motion.div key="products" className="admin-panel-v3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="admin-v2__stats-row">
                                <div className="stat-card">
                                    <span className="stat-label">Bugungi savdo</span>
                                    <span className="stat-value">$1,240.00</span>
                                    <span className="stat-change up">+12%</span>
                                </div>
                                <div className="stat-card">
                                    <span className="stat-label">Online mijozlar</span>
                                    <span className="stat-value">24</span>
                                    <span className="stat-change up">+5</span>
                                </div>
                                <div className="stat-card">
                                    <span className="stat-label">Jami mahsulot</span>
                                    <span className="stat-value">{products.length}</span>
                                </div>
                                <div className="stat-card warning">
                                    <span className="stat-label">Kam qolganlar</span>
                                    <span className="stat-value">3</span>
                                </div>
                            </div>

                            <div className="admin-v3__bento-grid">
                                <div className="admin-card ai-hub-v3">
                                    <div className="ai-hub__header">
                                        <span className="ai-icon gold-pulse">✨</span>
                                        <h3>Core AI Agents</h3>
                                    </div>
                                    <div className="ai-hub__alerts">
                                        {Object.entries(agents).map(([key, agent]) => (
                                            <div
                                                key={key}
                                                className={`ai-alert premium ${!agent.active ? 'inactive' : ''}`}
                                                style={{ borderColor: agent.active ? 'rgba(16, 185, 129, 0.4)' : 'rgba(212, 69, 59, 0.4)', cursor: 'pointer', opacity: agent.active ? 1 : 0.6 }}
                                                onClick={() => setSelectedAgentKey(key)}
                                            >
                                                <div className="alert-header">
                                                    <span>{agent.icon} {agent.name}</span>
                                                    <span style={{ color: agent.active ? '#10b981' : '#d4453b' }}>
                                                        {agent.active ? '🟢 Active' : '🔴 Paused'}
                                                    </span>
                                                </div>
                                                <p style={{ fontSize: '0.65rem' }}>Bossangiz sozlamalar va arxivni ko'rishingiz mumkin.</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="admin-card form-card-v3">
                                    <div className="form-header">
                                        <h3>{editingProduct ? 'Tahrirlash' : 'Yangi mahsulot'}</h3>
                                        <span className="ai-badge">SMART FORM ACTIVE</span>
                                    </div>
                                    <form onSubmit={handleSaveProduct} className="admin-grid-form-v3">
                                        <div className="form-main-inputs">
                                            <div className="input-group full">
                                                <label>Nomi</label>
                                                <input name="name" defaultValue={editingProduct?.name} required />
                                            </div>
                                            <div className="input-row">
                                                <div className="input-group">
                                                    <label>Kichik Sarlavha</label>
                                                    <input name="subtitle" defaultValue={editingProduct?.subtitle || 'BESPO ORIGINAL'} required />
                                                </div>
                                                <div className="input-group">
                                                    <label>Status (Trend)</label>
                                                    <select name="isFeatured" defaultValue={editingProduct?.isFeatured ? 'true' : 'false'}>
                                                        <option value="false">Oddiy mahsulot</option>
                                                        <option value="true">🌟 Asosiy Sahifa</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="input-row">
                                                <div className="input-group"><label>Narxi ($)</label><input name="price" type="number" defaultValue={editingProduct?.price} required /></div>
                                                <div className="input-group"><label>Kategoriya</label><input name="category" defaultValue={editingProduct?.category} required /></div>
                                            </div>
                                        </div>


                                        <div className="input-group full">
                                            <label>AI Vision Storyboard (Tozalanadi & 4K bo'ladi)</label>
                                            <div className="ai-storyboard">
                                                {storyboardSlots.map((slot, i) => (
                                                    <div key={i} className={`storyboard-slot ${currentImages[i] ? 'has-image' : ''} ${uploadingSlot === i ? 'ai-enhancing' : ''}`}>
                                                        {uploadingSlot === i ? (
                                                            <div className="slot-empty ai-pulse">
                                                                <span className="sparkle">✨</span>
                                                                <span className="slot-label">AI Enhancing</span>
                                                            </div>
                                                        ) : currentImages[i] ? (
                                                            <img src={currentImages[i]} alt="" />
                                                        ) : (
                                                            <div className="slot-empty">
                                                                <span className="slot-icon">{slot.icon}</span>
                                                                <span className="slot-label">{slot.label}</span>
                                                            </div>
                                                        )}
                                                        <input type="file" title="Upload Image" onChange={(e) => handleImageUpload(i, e)} disabled={uploadingSlot === i} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="input-group full">
                                            <label>O'lchamlar (Global Sizes)</label>
                                            <div className="size-picker-grid">
                                                {globalSizes.map(size => (
                                                    <div
                                                        key={size}
                                                        className={`size-swatch ${selectedSizes.includes(size) ? 'selected' : ''}`}
                                                        onClick={() => {
                                                            if (selectedSizes.includes(size)) {
                                                                setSelectedSizes(selectedSizes.filter(s => s !== size));
                                                            } else {
                                                                setSelectedSizes([...selectedSizes, size]);
                                                            }
                                                        }}
                                                    >
                                                        {size}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="input-group full">
                                            <label>Mahsulot Ranglari (Global Palette)</label>
                                            <div className="color-picker-grid">
                                                {globalColors.map(color => (
                                                    <div
                                                        key={color.hex}
                                                        className={`color-swatch ${selectedColors.includes(color.hex) ? 'selected' : ''}`}
                                                        style={{ backgroundColor: color.hex }}
                                                        onClick={() => {
                                                            if (selectedColors.includes(color.hex)) {
                                                                setSelectedColors(selectedColors.filter(c => c !== color.hex));
                                                            } else {
                                                                setSelectedColors([...selectedColors, color.hex]);
                                                            }
                                                        }}
                                                        title={color.name}
                                                    >
                                                        {selectedColors.includes(color.hex) && <span className="checkmark">✓</span>}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="input-group full">
                                            <div className="label-with-action">
                                                <label>Premium SEO Tavsif</label>
                                                <button type="button" className="ai-gen-btn" onClick={handleAIGenerateDesc} disabled={isGeneratingDesc}>
                                                    {isGeneratingDesc ? '✨ Yozilmoqda...' : '✨ AI orqali yozish'}
                                                </button>
                                            </div>
                                            <div className="textarea-wrapper">
                                                <textarea name="description" defaultValue={editingProduct?.description} required rows="5" placeholder="AI yordamida premium tavsif yozing..." />
                                                <div className="seo-status-bar">
                                                    <div className="seo-score">
                                                        <span className="dot good"></span> SEO Score: <strong>85/100</strong>
                                                    </div>
                                                    <span className="ai-keywords">Keywords: streetwear, premium, heavy hoodie</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                                            <button type="submit" className="save-btn-v3" disabled={isAnalyzing} style={{ flex: 1 }}>
                                                {isAnalyzing ? <span className="ai-pulse-text">✨ {aiStatusMessage}</span> : 'Saqlash va AI tahlili'}
                                            </button>
                                            {editingProduct && <button type="button" className="cancel-btn" style={{ margin: 0, padding: '0 30px' }} onClick={() => { setEditingProduct(null); setSelectedColors([]); setSelectedSizes([]); setCurrentImages([]); }}>Bekor Qilish</button>}
                                        </div>
                                    </form>
                                </div>

                                <div className="analytics-column">
                                    <SalesChart type="revenue" />
                                    <SalesChart type="visitors" />
                                    <SocialWidget />
                                </div>

                            </div>
                            <div className="admin-card list-card">
                                <table className="products-table">
                                    <thead><tr><th>Rasm</th><th>Nomi</th><th>Narxi</th><th>Holat</th><th>Amallar</th></tr></thead>
                                    <tbody>
                                        {products.map(p => (
                                            <tr key={p.id} className={p.isSoldOut ? 'row-sold-out' : ''}>
                                                <td><img src={p.images ? p.images[0] : p.image} className="prod-thumb" alt="" /></td>
                                                <td>{p.name} {p.isSoldOut && <span className="sold-out-badge">TUGADI</span>}</td>
                                                <td>${p.price.toFixed(2)}</td>
                                                <td>
                                                    <button
                                                        className={`status-toggle ${p.isSoldOut ? 'sold' : 'active'}`}
                                                        onClick={() => toggleSoldOut(p.id)}
                                                    >
                                                        {p.isSoldOut ? 'Sotuvda yo\'q' : 'Sotuvda'}
                                                    </button>
                                                </td>
                                                <td className="actions-cell">
                                                    <button className="action-btn edit" onClick={() => handleEditProductClick(p)}>✏️ Tahrir</button>
                                                    <button onClick={() => deleteProduct(p.id)} className="action-btn delete">🗑️</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'hero' && (
                        <motion.div key="hero" className="admin-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <div className="admin-card form-card">
                                <div className="admin-card__header-flex"><h3>Slayderlar ({heroSettings.slides.length})</h3><button onClick={handleNewSlide}>+ Yangi</button></div>
                                <div className="hero-slides-grid">
                                    {heroSettings.slides.map((s, i) => (
                                        <div key={i} className="hero-slide-edit">
                                            <div className="slide-top"><span>Slayd {i + 1}</span><button onClick={() => deleteHeroSlide(i)}>×</button></div>
                                            <img src={s.image} alt="" className="slide-preview" />
                                            <div className="slide-inputs">
                                                <input name={`title${i}`} defaultValue={s.title} placeholder="Title" />
                                                <input name={`price${i}`} defaultValue={s.price} placeholder="Price" />
                                                <input type="file" onChange={(e) => handleFileChange(i, e)} />
                                            </div>
                                        </div>
                                    ))}
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

                            <div className="admin-card form-card-v3 mt-20">
                                <div className="form-header">
                                    <h3>Do'kon ma'lumotlari</h3>
                                </div>
                                <form className="admin-grid-form-v3" onSubmit={(e) => {
                                    e.preventDefault();
                                    const fd = new FormData(e.target);
                                    updateAboutSettings({
                                        title: fd.get('title'),
                                        location: fd.get('location'),
                                        instagram: fd.get('instagram'),
                                        telegram: fd.get('telegram')
                                    });
                                    alert('Ma\'lumotlar saqlandi!');
                                }}>
                                    <div className="input-row">
                                        <div className="input-group"><label>Sarlavha</label><input name="title" defaultValue={aboutSettings.title} /></div>
                                        <div className="input-group"><label>Manzil</label><input name="location" defaultValue={aboutSettings.location} /></div>
                                    </div>
                                    <div className="input-row">
                                        <div className="input-group"><label>Instagram</label><input name="instagram" defaultValue={aboutSettings.instagram} /></div>
                                        <div className="input-group"><label>Telegram</label><input name="telegram" defaultValue={aboutSettings.telegram} /></div>
                                    </div>
                                    <button type="submit" className="save-btn-v3">Asosiy ma'lumotlarni saqlash</button>
                                </form>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>
            <AIAssistant />

            <AnimatePresence>
                {selectedAgentKey && (
                    <motion.div
                        className="agent-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedAgentKey(null)}
                        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
                    >
                        <motion.div
                            className="agent-modal-content admin-card"
                            initial={{ scale: 0.95, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 30 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{ maxWidth: '800px', width: '100%', position: 'relative', overflow: 'hidden' }}
                        >
                            <button onClick={() => setSelectedAgentKey(null)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}>×</button>

                            <div style={{ padding: '0 0 25px 0', borderBottom: '1px solid #1a1a1e', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <div style={{ width: '60px', height: '60px', background: 'rgba(181, 150, 107, 0.1)', border: '1px solid rgba(181, 150, 107, 0.3)', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>
                                    {agents[selectedAgentKey].icon}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h2 style={{ margin: '0 0 5px 0', fontSize: '1.5rem', fontFamily: 'var(--font-heading)' }}>{agents[selectedAgentKey].name}</h2>
                                    <div style={{ display: 'flex', gap: '15px' }}>
                                        <span style={{ fontSize: '0.7rem', background: agents[selectedAgentKey].active ? 'rgba(16, 185, 129, 0.1)' : 'rgba(212, 69, 59, 0.1)', color: agents[selectedAgentKey].active ? '#10b981' : '#d4453b', padding: '4px 10px', borderRadius: '20px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                            {agents[selectedAgentKey].active ? '● Core Online' : '○ Core Offline'}
                                        </span>
                                        <span style={{ fontSize: '0.7rem', color: '#888', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ffaa00' }}></span>
                                            v2.4 Model
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '30px' }}>
                                {/* Left: Telemetry & Config */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                                    <div>
                                        <h4 style={{ margin: '0 0 15px 0', fontSize: '0.7rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Hardware Telemetry</h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', padding: '8px 12px', background: '#0a0a0c', border: '1px solid #1a1a1e', borderRadius: '8px' }}>
                                                <span style={{ color: '#888' }}>CPU Load</span>
                                                <span style={{ color: '#fff', fontWeight: '600' }}>{agents[selectedAgentKey].active ? '24.5%' : '0.1%'}</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', padding: '8px 12px', background: '#0a0a0c', border: '1px solid #1a1a1e', borderRadius: '8px' }}>
                                                <span style={{ color: '#888' }}>VRAM Usage</span>
                                                <span style={{ color: '#fff', fontWeight: '600' }}>{agents[selectedAgentKey].active ? '1.8 / 16 GB' : 'Idle'}</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', padding: '8px 12px', background: '#0a0a0c', border: '1px solid #1a1a1e', borderRadius: '8px' }}>
                                                <span style={{ color: '#888' }}>Latency</span>
                                                <span style={{ color: '#10b981', fontWeight: '600' }}>{agents[selectedAgentKey].active ? '45ms' : '--'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 style={{ margin: '0 0 15px 0', fontSize: '0.7rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Neural Logic Config</h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', opacity: agents[selectedAgentKey].active ? 1 : 0.4, pointerEvents: agents[selectedAgentKey].active ? 'auto' : 'none' }}>
                                            <div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: '#888', marginBottom: '5px' }}><span>Temperature</span><span>0.7</span></div>
                                                <div style={{ width: '100%', height: '4px', background: '#1a1a1e', borderRadius: '2px' }}><div style={{ width: '70%', height: '100%', background: 'var(--color-accent)', borderRadius: '2px' }}></div></div>
                                            </div>
                                            <div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: '#888', marginBottom: '5px' }}><span>Top-K Sampling</span><span>40</span></div>
                                                <div style={{ width: '100%', height: '4px', background: '#1a1a1e', borderRadius: '2px' }}><div style={{ width: '40%', height: '100%', background: '#666', borderRadius: '2px' }}></div></div>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => toggleAgent(selectedAgentKey)}
                                        style={{ marginTop: 'auto', width: '100%', padding: '16px', borderRadius: '12px', background: agents[selectedAgentKey].active ? 'rgba(212, 69, 59, 0.1)' : 'rgba(16, 185, 129, 0.1)', color: agents[selectedAgentKey].active ? '#d4453b' : '#10b981', border: `1px solid ${agents[selectedAgentKey].active ? 'rgba(212, 69, 59, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`, fontWeight: '800', letterSpacing: '0.05em', cursor: 'pointer', transition: '0.3s' }}
                                    >
                                        {agents[selectedAgentKey].active ? 'TERMINATE AGENT' : 'INITIALIZE AGENT'}
                                    </button>
                                </div>

                                {/* Right: Terminal Logs */}
                                <div style={{ background: '#050505', border: '1px solid #1a1a1e', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1a1a1e', paddingBottom: '15px', marginBottom: '15px' }}>
                                        <h4 style={{ margin: 0, fontSize: '0.7rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Live Console stream</h4>
                                        <div style={{ display: 'flex', gap: '5px' }}>
                                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#444' }}></span>
                                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#444' }}></span>
                                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#444' }}></span>
                                        </div>
                                    </div>
                                    <div style={{ flex: 1, maxHeight: '280px', overflowY: 'auto', fontFamily: 'monospace', fontSize: '0.75rem', lineHeight: '1.6', color: '#a8a8a8', paddingRight: '10px' }}>
                                        <div style={{ color: '#666', marginBottom: '10px' }}>[SYSTEM] Connection standard established. Protocol v3.</div>
                                        {agents[selectedAgentKey].logs.map((log, i) => (
                                            <div key={i} style={{ marginBottom: '8px', borderLeft: '2px solid rgba(181, 150, 107, 0.5)', paddingLeft: '10px' }}>
                                                <span style={{ color: '#3b82f6', marginRight: '8px' }}>[INFO]</span>
                                                <span style={{ color: '#fff' }}>{log.split(' - ')[0]}</span>
                                                <span style={{ color: '#888' }}> — {log.split(' - ')[1] || ''}</span>
                                            </div>
                                        ))}
                                        {agents[selectedAgentKey].active && (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '15px' }}>
                                                <span style={{ color: '#10b981' }}>›</span>
                                                <span style={{ color: '#10b981' }}>Awaiting pipeline execution</span>
                                                <span className="pulse" style={{ background: '#10b981', display: 'inline-block', width: '6px', height: '14px', animation: 'blink 1s step-end infinite' }}></span>
                                            </div>
                                        )}
                                    </div>
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
