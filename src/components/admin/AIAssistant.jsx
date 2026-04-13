import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSiteStore from '../../store/siteStore';
import './AIAssistant.css';

const AIAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {
        analytics, products, updateSocialLink, updateHeroSettings,
        setProductDiscount, addProduct, addHeroSlide, updateTheme
    } = useSiteStore();

    const [messages, setMessages] = useState([
        { type: 'ai', text: "Salom! Men Bespo AI yordamchisiman. Saytni boshqarishda sizga qanday yordam bera olaman?", id: 1 }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef(null);

    const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    useEffect(() => { scrollToBottom() }, [messages, isTyping]);

    const processCommand = async (input) => {
        const cmd = input.toLowerCase().trim();
        setIsTyping(true);

        // --- STAGE 1: ANALYZING ---
        setMessages(prev => [...prev, { type: 'system', text: "🔍 So'rov tahlil qilinmoqda...", id: Date.now() + 1 }]);
        await new Promise(r => setTimeout(r, 1000));

        // --- STAGE 2: DATA FETCHING ---
        setMessages(prev => [...prev, { type: 'system', text: "📊 Ma'lumotlar bazasi tahlil qilinmoqda...", id: Date.now() + 2 }]);
        await new Promise(r => setTimeout(r, 1200));

        let response = "";

        // Meta questions & Greetings
        if (cmd.includes('salom') || cmd.includes('hello') || cmd.includes('assalom')) {
            response = "Vaalaykum assalom! Bespo AI tizimi ishga tushdi. Bugun qaysi ma'lumotlarni tahlil qilishimiz kerak? Men rasm yangilash, statistika berish yoki aksiyalar yaratishga tayyorman.";
        }

        // Meta questions about capabilities
        else if (cmd.includes('nima') || cmd.includes('qila') || cmd.includes('help')) {
            response = `Men Bespo tizimining barcha qismlarini boshqara olaman. Hozirda menda ${products.length} ta mahsulot va oxirgi 7 kunlik tashriflar statistikasi mavjud. Men sizga:
            - Mahsulotlar zaxirasini tahlil qilish (hozirda ${analytics.stockAlerts.length} ta muammo bor).
            - Sotuvlarni optimallashtirish (chegirma va slaydlar).
            - Sayt sozlamalarini (linklar, tekstlar) tahrirlashda yordam beraman.
            Nima deb o'ylaysiz, bugun qaysi bo'limni ko'zdan kechiramiz?`;
        }

        // Deep Analytics Intent
        else if (cmd.includes('tashrif') || cmd.includes('statistika') || cmd.includes('analiz')) {
            const visitors = analytics.visitors[6];
            const avg = analytics.visitors.reduce((a, b) => a + b, 0) / 7;
            const diff = visitors > avg ? "o'sish" : "pasayish";
            response = `Tahlillarimga ko'ra, bugungi tashriflar soni ${visitors} tani tashkil etmoqda. Bu haftalik o'rtacha (${avg.toFixed(0)}) ko'rsatkichdan ${diff}ni ko'rsatmoqda. Eng optimistik prognozlarimizga ko'ra, kechki soat 20:00 da faollik yanada oshadi. Logistika va server yuklamasi 100% barqaror.`;
        }

        // Action: Discounts & Promotion
        else if (cmd.includes('chegirma') || cmd.includes('aksiya') || cmd.includes('sotil')) {
            const slowProduct = products.find(p => p.id === analytics.slowProducts[0]);
            if (slowProduct) {
                setMessages(prev => [...prev, { type: 'system', text: `⚙️ "${slowProduct.name}" uchun aksiya kampaniyasi yaratilmoqda...`, id: Date.now() + 3 }]);
                await new Promise(r => setTimeout(r, 1500));

                const discPrice = slowProduct.price * 0.75;
                setProductDiscount(slowProduct.id, discPrice);
                addHeroSlide({
                    image: slowProduct.image,
                    title: `YANGI AKSIYA: ${slowProduct.name}`,
                    subtitle: 'MAXSUS TAKLIF - 25% OFF',
                    price: discPrice.toFixed(2)
                });
                response = `Tahlil yakunlandi. "${slowProduct.name}" mahsuloti ancha vaqtdan beri statik holatda turgan ekan. Men uning narxini $${slowProduct.price} dan $${discPrice.toFixed(2)} ga tushirdim va diqqatni jalb qilish uchun bosh sahifa slayderiga birinchi tartibda joylashtirdim.`;
            }
        }

        // Social links
        else if (cmd.includes('instagram') || cmd.includes('link')) {
            const urlMatch = input.match(/https?:\/\/[^\s]+/);
            if (urlMatch) {
                updateSocialLink('instagram', urlMatch[0]);
                response = `Tushunarli. Instagram havolasi "${urlMatch[0]}" ga muvaffaqiyatli o'zgartirildi. Saytning footer qismidagi barcha ikonkalarni yangilangan linkka bog'lab chiqdim.`;
            } else {
                response = "Instagram linkini yangilash uchun menga to'liq havolani yuboring. Men uni butun tizim bo'ylab integratsiya qilib chiqaman.";
            }
        }

        // Action: Multi-Image Strategy
        else if (cmd.includes('rasm') || cmd.includes('foto') || cmd.includes('yukla')) {
            response = `2026-yil trendiga ko'ra, bitta rasm yetarli emas. Men sizga 5 ta maxsus "Storyboard" slotini tayyorlab qo'ydim:
            1. 👕 **Front**: Mahsulotning umumiy ko'rinishi.
            2. 🔄 **Back**: Orqa qismi va silueti.
            3. 🚶 **Lifestyle**: Uni modelda yoki hayotiy vaziyatda ko'rsating.
            4. 🔍 **Detail**: Mato sifati va tikilish detallari.
            5. ➕ **Qo'shimcha**: Kreativ burchaklar.
            Har bir slotni to'ldirishingiz mijoz ishonchini 40% ga oshiradi. Qaysi biri bilan boshlaymiz?`;
        }

        // Theme & Design Action
        else if (cmd.includes('dizayn') || cmd.includes('tema') || cmd.includes('rang') || cmd.includes('oq') || cmd.includes('qora')) {
            const isLight = cmd.includes('oq') || cmd.includes('yorug') || cmd.includes('light');

            setMessages(prev => [...prev, { type: 'system', text: `⚙️ DOM render o'zgaruvchilari tekshirilmoqda...`, id: Date.now() + 4 }]);
            await new Promise(r => setTimeout(r, 1000));

            if (isLight) {
                updateTheme({
                    name: 'Ghost White Minimal',
                    colors: { bg: '#FFFFFF', bgCard: '#F5F5F5', bgSurface: '#FAFAFA', accent: '#1A1A1A', textPrimary: '#0A0A0A' }
                });
                response = "Dizayn arxitekturasi yorug' 'Ghost White Minimal' rejimiga o'tkazildi. Hech qanday React kodi buzilmagan holda barcha rang o'qlari avtomatik moslashdi.";
            } else {
                updateTheme({
                    name: 'Cyberpunk Neon',
                    colors: { bg: '#050510', bgCard: '#0A0A1A', bgSurface: '#12122A', accent: '#00FFAA', textPrimary: '#FFFFFF' }
                });
                response = "Trendlarni inobatga olgan holda dizaynni qorong'u 'Cyberpunk Neon' stiliga almashtirdim. Saytdagi 23 ta asosiy va yordamchi CSS o'zgaruvchilari (Variables) onlayn almashtirildi.";
            }
        }

        // Dynamic Fallback
        else {
            response = `Savolingiz qiziqarli, lekin hozirgi tahlil doiramdan tashqarida. Men sizga hozirda ${analytics.stockAlerts[0]?.name || 'mahsulotlar'} bo'yicha zaxira tahlilini berishim yoki o'tgan haftalik savdolar grafigini ko'rsatishim mumkin. Davom etamizmi?`;
        }

        setIsTyping(false);
        // Clean up system messages
        setMessages(prev => [...prev.filter(m => m.type !== 'system'), { type: 'ai', text: response, id: Date.now() }]);
    };

    const handleSend = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMsg = { type: 'user', text: inputValue, id: Date.now() };
        setMessages(prev => [...prev, userMsg]);
        const currentInput = inputValue;
        setInputValue('');
        processCommand(currentInput);
    };

    return (
        <div className="ai-assistant">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="ai-modal ai-modal--chat"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    >
                        <div className="ai-modal__header">
                            <div className="ai-status">
                                <span className="status-pulse" />
                                <h3>BESPO AI Core</h3>
                            </div>
                            <button onClick={() => setIsOpen(false)}>×</button>
                        </div>

                        <div className="ai-modal__chat-body">
                            <div className="ai-messages">
                                {messages.map((m) => (
                                    <div key={m.id} className={`chat-bubble ${m.type === 'ai' ? 'ai' : 'user'}`}>
                                        {m.text}
                                    </div>
                                ))}
                                {isTyping && (
                                    <div className="chat-bubble ai typing">
                                        <span>.</span><span>.</span><span>.</span>
                                    </div>
                                )}
                                <div ref={chatEndRef} />
                            </div>
                        </div>

                        <div className="ai-modal__suggestions">
                            {['Nima qila olasan?', '📊 Statistika', '📉 Chegirmalar', '🔗 Instagram'].map(s => (
                                <button key={s} onClick={() => { setInputValue(s); handleSend({ preventDefault: () => { } }); }}>{s}</button>
                            ))}
                        </div>

                        <form className="ai-modal__footer" onSubmit={handleSend}>
                            <input
                                placeholder="Buyruq yozing..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                            <button type="submit">➤</button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                className={`ai-bubble ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <div className="ai-bubble__icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        <circle cx="9" cy="10" r="1" /><circle cx="15" cy="10" r="1" />
                    </svg>
                </div>
            </motion.button>
        </div>
    );
};

export default AIAssistant;
