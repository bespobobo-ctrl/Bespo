import { useT } from '../../hooks/useTranslation';
import './Marquee.css';

const Marquee = ({ variant = 'default' }) => {
    const { tr, t } = useT();
    const items = [
        { text: tr(t.marquee.everyStyle), type: 'serif' },
        { text: tr(t.marquee.builtForComfort), type: 'bold' },
        { text: tr(t.marquee.forHimHer), type: 'serif' },
        { text: tr(t.marquee.madeWithCare), type: 'bold' },
        { text: '#BESPO', type: 'accent' }
    ];

    const MarqueeGroup = () => (
        <div className="marquee__group">
            {items.map((item, i) => (
                <div key={i} className="marquee__item">
                    <span className={`marquee__text--${item.type}`}>
                        {item.text}
                    </span>
                    <span className="marquee__dot">✦</span>
                </div>
            ))}
        </div>
    );

    return (
        <div className={`marquee ${variant === 'large' ? 'marquee--large' : ''}`}>
            <div className="marquee__track">
                <MarqueeGroup />
                <MarqueeGroup />
                <MarqueeGroup />
                <MarqueeGroup />
            </div>
        </div>
    );
};

export default Marquee;

