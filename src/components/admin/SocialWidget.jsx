import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SocialWidget.css';

const socialData = [
    {
        id: 'insta', platform: 'Instagram', label: '@bespo.uz', count: '124,500', trend: '+1.2%', color: '#E1306C', icon: '📸',
        stats: {
            views: { weekly: [45, 60, 52, 85, 120, 140, 110], monthly: [320, 480, 550, 410, 0, 0, 0, 0, 0, 0, 0, 0], yearly: [2100, 3400, 4200, 5100] },
            growth: { weekly: [50, 120, 80, 200, 350, 410, 290], monthly: [1200, 1800, 2500, 1900, 0, 0, 0, 0, 0, 0, 0, 0], yearly: [12000, 18000, 24000, 35000] }
        }
    },
    {
        id: 'tg', platform: 'Telegram Bot', label: '@BespoOrderBot', count: '45,200', trend: '+8.4%', color: '#0088cc', icon: '✈️',
        stats: {
            views: { weekly: [12, 15, 14, 25, 30, 45, 38], monthly: [110, 150, 120, 280, 0, 0, 0, 0, 0, 0, 0, 0], yearly: [1200, 1500, 1800, 2500] },
            growth: { weekly: [100, 150, 120, 280, 450, 500, 420], monthly: [800, 1100, 1500, 3200, 0, 0, 0, 0, 0, 0, 0, 0], yearly: [8000, 12000, 18000, 28000] }
        }
    },
    {
        id: 'fb', platform: 'Facebook', label: 'Bespo Official', count: '12,800', trend: '+0.5%', color: '#1877F2', icon: '📘',
        stats: {
            views: { weekly: [8, 10, 9, 12, 15, 20, 18], monthly: [45, 55, 60, 80, 0, 0, 0, 0, 0, 0, 0, 0], yearly: [500, 650, 800, 1200] },
            growth: { weekly: [5, 12, 8, 15, 25, 30, 20], monthly: [80, 120, 150, 200, 0, 0, 0, 0, 0, 0, 0, 0], yearly: [800, 1400, 2100, 3200] }
        }
    }
];

const periodLabels = {
    weekly: ['Dush', 'Sesh', 'Chor', 'Pay', 'Juma', 'Shan', 'Yak'],
    monthly: ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyu', 'Iyu', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'],
    yearly: ['1-Chorak', '2-Chorak', '3-Chorak', '4-Chorak']
};

const SocialWidget = () => {
    const [selectedPlatform, setSelectedPlatform] = useState(null);
    const [period, setPeriod] = useState('weekly');
    const [isConfigOpen, setIsConfigOpen] = useState(false);

    // Default URLs (mock)
    const [urls, setUrls] = useState({ insta: '', tg: '', fb: '' });

    return (
        <>
            <div className="admin-card social-widget">
                <div className="analytics-header">
                    <div className="header-text">
                        <h3>🌐 Ijtimoiy Tarmoqlar</h3>
                        <span className="live-pulse">🟢 Jonli</span>
                    </div>
                    <button className="sm-config-btn" onClick={() => setIsConfigOpen(true)}>⚙️ Ulash</button>
                </div>

                <div className="social-list">
                    {socialData.map((social, idx) => (
                        <motion.div
                            key={idx}
                            className="social-item"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            onClick={() => setSelectedPlatform(social)}
                        >
                            <div className="social-icon" style={{ background: `${social.color}20`, color: social.color, border: `1px solid ${social.color}40` }}>
                                {social.icon}
                            </div>
                            <div className="social-info">
                                <h4>{social.platform}</h4>
                                <span className={urls[social.id] ? 'linked-text' : ''}>
                                    {urls[social.id] ? '✅ Ulangan' : social.label}
                                </span>
                            </div>
                            <div className="social-stats">
                                <span className="count">{social.count}</span>
                                <span className="trend" style={{ color: social.color }}>{social.trend}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* CONFIG MODAL */}
            <AnimatePresence>
                {isConfigOpen && (
                    <div className="social-modal-overlay" onClick={() => setIsConfigOpen(false)}>
                        <motion.div
                            className="sm-config-modal"
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="config-header">
                                <h3>Ijtimoiy Tarmoqlarni Ulash</h3>
                                <p>Sakkiz qatorli URL-laringizni kiriting va tizimga integratsiya qiling.</p>
                                <button className="mc-close" onClick={() => setIsConfigOpen(false)}>✖</button>
                            </div>
                            <div className="config-body">
                                {socialData.map(social => (
                                    <div className="config-input-group" key={social.id}>
                                        <label><span style={{ color: social.color }}>{social.icon}</span> {social.platform} Manzili</label>
                                        <input
                                            type="text"
                                            placeholder={`https://${social.id === 'insta' ? 'instagram.com/bespo' : social.id === 'tg' ? 't.me/bespo' : 'facebook.com/bespo'}`}
                                            value={urls[social.id]}
                                            onChange={(e) => setUrls({ ...urls, [social.id]: e.target.value })}
                                        />
                                    </div>
                                ))}
                                <button className="save-urls-btn" onClick={() => setIsConfigOpen(false)}>Saqlash va Tasdiqlash</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {selectedPlatform && (
                    <div className="social-modal-overlay" onClick={() => setSelectedPlatform(null)}>
                        <motion.div
                            className="social-modal-content"
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="modal-header" style={{ borderBottomColor: `${selectedPlatform.color}30` }}>
                                <div className="mc-left">
                                    <span className="mc-icon" style={{ background: `${selectedPlatform.color}20`, color: selectedPlatform.color }}>{selectedPlatform.icon}</span>
                                    <div>
                                        <h2>{selectedPlatform.platform} Analytics</h2>
                                        <p>{selectedPlatform.label} &bull; Muxlislar: {selectedPlatform.count}</p>
                                    </div>
                                </div>
                                <div className="period-toggle">
                                    <button className={period === 'weekly' ? 'active' : ''} onClick={() => setPeriod('weekly')}>Hafta</button>
                                    <button className={period === 'monthly' ? 'active' : ''} onClick={() => setPeriod('monthly')}>Oy</button>
                                    <button className={period === 'yearly' ? 'active' : ''} onClick={() => setPeriod('yearly')}>Yil</button>
                                </div>
                                <button className="mc-close" onClick={() => setSelectedPlatform(null)}>✖</button>
                            </div>

                            <div className="modal-charts-grid">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={`views-${period}`}
                                        className="mc-chart-box"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <h4>👁️ Ko'rishlar (Views)</h4>
                                        <div className="mc-bars">
                                            {selectedPlatform.stats.views[period].map((v, i) => {
                                                const maxVal = Math.max(...selectedPlatform.stats.views[period]) * 1.1;
                                                const hasData = v > 0;
                                                return (
                                                    <div key={i} className={`mc-bar-wrapper ${!hasData ? 'shadow-bar' : ''}`}>
                                                        <motion.div
                                                            className="mc-bar"
                                                            style={{
                                                                background: hasData ? `linear-gradient(180deg, ${selectedPlatform.color} 0%, transparent 100%)` : `linear-gradient(180deg, #111 0%, transparent 100%)`,
                                                                width: period === 'monthly' ? '12px' : '20px'
                                                            }}
                                                            initial={{ height: 0 }}
                                                            animate={{ height: hasData ? `${(v / maxVal) * 100}%` : '15%' }}
                                                            transition={{ delay: i * 0.05, type: 'spring', bounce: 0.4 }}
                                                        />
                                                        {hasData && <span className="mc-val">{v > 1000 ? `${(v / 1000).toFixed(1)}k` : v}</span>}
                                                        <span className="mc-day" style={{ opacity: hasData ? 1 : 0.3 }}>{periodLabels[period][i]}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                </AnimatePresence>

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={`growth-${period}`}
                                        className="mc-chart-box"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <h4>📈 Obunachilar O'sishi</h4>
                                        <div className="mc-bars">
                                            {selectedPlatform.stats.growth[period].map((g, i) => {
                                                const maxVal = Math.max(...selectedPlatform.stats.growth[period]) * 1.1;
                                                const hasData = g > 0;
                                                return (
                                                    <div key={i} className={`mc-bar-wrapper ${!hasData ? 'shadow-bar' : ''}`}>
                                                        <motion.div
                                                            className="mc-bar"
                                                            style={{
                                                                background: hasData ? `linear-gradient(180deg, var(--color-accent) 0%, transparent 100%)` : `linear-gradient(180deg, #111 0%, transparent 100%)`,
                                                                width: period === 'monthly' ? '12px' : '20px'
                                                            }}
                                                            initial={{ height: 0 }}
                                                            animate={{ height: hasData ? `${(g / maxVal) * 100}%` : '15%' }}
                                                            transition={{ delay: i * 0.05, type: 'spring', bounce: 0.4 }}
                                                        />
                                                        {hasData && <span className="mc-val">+{g > 1000 ? `${(g / 1000).toFixed(1)}k` : g}</span>}
                                                        <span className="mc-day" style={{ opacity: hasData ? 1 : 0.3 }}>{periodLabels[period][i]}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default SocialWidget;
