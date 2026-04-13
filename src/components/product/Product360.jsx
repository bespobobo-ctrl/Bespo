import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Product360.css';

const Product360 = ({ images = [] }) => {
    // Fallback if no images provided
    const frames = images.length > 1 ? images : [images[0], images[0], images[0], images[0]];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);
    const startX = useRef(0);

    const handleStart = (clientX) => {
        setIsDragging(true);
        startX.current = clientX;
    };

    const handleMove = (clientX) => {
        if (!isDragging) return;
        const delta = clientX - startX.current;
        const sensitivity = 20; // Lower number = faster rotation

        if (Math.abs(delta) > sensitivity) {
            const step = delta > 0 ? -1 : 1;
            setCurrentIndex(prev => (prev + step + frames.length) % frames.length);
            startX.current = clientX;
        }
    };

    return (
        <div
            className={`product-360 ${isDragging ? 'grabbing' : ''}`}
            ref={containerRef}
            onMouseDown={(e) => handleStart(e.pageX)}
            onMouseMove={(e) => handleMove(e.pageX)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onTouchStart={(e) => handleStart(e.touches[0].clientX)}
            onTouchMove={(e) => handleMove(e.touches[0].clientX)}
            onTouchEnd={() => setIsDragging(false)}
        >
            <div className="product-360__stage">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentIndex}
                        src={frames[currentIndex]}
                        alt={`view ${currentIndex}`}
                        initial={{ opacity: 0.8, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.1 }}
                        className="product-360__frame"
                        draggable="false"
                    />
                </AnimatePresence>
            </div>

            <div className="product-360__ui">
                <div className="rotation-indicator">
                    <div className="dot-line">
                        {frames.map((_, i) => (
                            <div key={i} className={`dot ${i === currentIndex ? 'active' : ''}`} />
                        ))}
                    </div>
                    <span>360° IMMERSIVE VIEW</span>
                </div>
                <div className="instructions">Aylantirish uchun sudrang</div>
            </div>
        </div>
    );
};

export default Product360;
