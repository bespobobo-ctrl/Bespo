import { useT } from '../../hooks/useTranslation';
import './Marquee.css';

import useSiteStore from '../../store/siteStore';

const Marquee = ({ variant = 'default' }) => {
    const marqueeText = useSiteStore(state => state.marqueeText);
    const items = marqueeText.split('/').map(t => t.trim());

    const MarqueeGroup = () => (
        <div className="marquee__group">
            {items.map((item, i) => (
                <div key={i} className="marquee__item">
                    <span className="marquee__text--bold">
                        {item}
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

