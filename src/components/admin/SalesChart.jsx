import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SalesChart.css';

const analyticsData = {
    revenue: {
        symbol: '$',
        weekly: [{ label: 'Dush', value: 450 }, { label: 'Sesh', value: 680 }, { label: 'Chor', value: 520 }, { label: 'Pay', value: 890 }, { label: 'Juma', value: 1240 }, { label: 'Shan', value: 1450 }, { label: 'Yak', value: 1100 }],
        monthly: [{ label: 'Yan', value: 4200 }, { label: 'Fev', value: 5800 }, { label: 'Mar', value: 6400 }, { label: 'Apr', value: 8900 }, { label: 'May', value: 0 }, { label: 'Iyu', value: 0 }, { label: 'Iyu', value: 0 }, { label: 'Avg', value: 0 }, { label: 'Sen', value: 0 }, { label: 'Okt', value: 0 }, { label: 'Noy', value: 0 }, { label: 'Dek', value: 0 }],
        yearly: [{ label: '1-Chorak', value: 24000 }, { label: '2-Chorak', value: 38000 }, { label: '3-Chorak', value: 42000 }, { label: '4-Chorak', value: 55000 }]
    },
    visitors: {
        symbol: '👤',
        weekly: [{ label: 'Dush', value: 1200 }, { label: 'Sesh', value: 1500 }, { label: 'Chor', value: 1100 }, { label: 'Pay', value: 2300 }, { label: 'Juma', value: 3400 }, { label: 'Shan', value: 4200 }, { label: 'Yak', value: 3800 }],
        monthly: [{ label: 'Yan', value: 12500 }, { label: 'Fev', value: 15200 }, { label: 'Mar', value: 18400 }, { label: 'Apr', value: 22000 }, { label: 'May', value: 0 }, { label: 'Iyu', value: 0 }, { label: 'Iyu', value: 0 }, { label: 'Avg', value: 0 }, { label: 'Sen', value: 0 }, { label: 'Okt', value: 0 }, { label: 'Noy', value: 0 }, { label: 'Dek', value: 0 }],
        yearly: [{ label: '1-Chorak', value: 85000 }, { label: '2-Chorak', value: 112000 }, { label: '3-Chorak', value: 145000 }, { label: '4-Chorak', value: 198000 }]
    }
};

const SalesChart = ({ type = 'revenue' }) => {
    const [period, setPeriod] = useState('weekly');
    const [data, setData] = useState(analyticsData[type].weekly);

    useEffect(() => {
        setData(analyticsData[type][period]);
    }, [period, type]);

    const maxValue = Math.max(...data.map(d => d.value)) * 1.1;
    const currentSymbol = analyticsData[type].symbol;

    return (
        <div className={`admin-card analytics-card ${type}`}>
            <div className="analytics-header">
                <div className="header-text">
                    <h3>{type === 'revenue' ? '💰 Sotuvlar Dinamikasi' : '👁️ Tashriflar Dinamikasi'}</h3>
                    <span className="live-pulse">🟢 Jonli</span>
                </div>

                <div className="period-toggle">
                    <button className={period === 'weekly' ? 'active' : ''} onClick={() => setPeriod('weekly')}>Hafta</button>
                    <button className={period === 'monthly' ? 'active' : ''} onClick={() => setPeriod('monthly')}>Oy</button>
                    <button className={period === 'yearly' ? 'active' : ''} onClick={() => setPeriod('yearly')}>Yil</button>
                </div>
            </div>

            <div className="chart-container">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${type}-${period}`}
                        className={`chart-bars-wrap ${type}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {data.map((item, i) => {
                            const heightPercent = (item.value / maxValue) * 100;
                            return (
                                <div key={i} className="chart-bar-group">
                                    <div className="bar-track">
                                        <motion.div
                                            className={`bar-fill ${type}`}
                                            initial={{ height: 0 }}
                                            animate={{ height: `${heightPercent}%` }}
                                            transition={{ duration: 0.8, delay: i * 0.05, type: 'spring', bounce: 0.4 }}
                                        />
                                        <div className="bar-tooltip">
                                            {type === 'revenue' ? '$' : ''}{item.value.toLocaleString()}{type === 'visitors' ? ' ta' : ''}
                                        </div>
                                    </div>
                                    <span className="bar-label">{item.label}</span>
                                </div>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="analytics-footer">
                <div className="stat-highlight">
                    <span className="label">Total {type === 'revenue' ? 'Daromad' : 'Tashriflar'}</span>
                    <h4 className="value">
                        {type === 'revenue' ? '$' : ''}
                        {data.reduce((a, b) => a + b.value, 0).toLocaleString()}
                        {type === 'visitors' ? ' ta' : ''}
                    </h4>
                </div>
                <div className="trend-arrow up">
                    📈 +{type === 'revenue' ? '24' : '38'}% o'sish
                </div>
            </div>
        </div>
    );
};

export default SalesChart;
