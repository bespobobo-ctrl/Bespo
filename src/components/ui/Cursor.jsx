import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './Cursor.css';

const Cursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const [isHovering, setIsHovering] = useState(false);

    const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
    const springX = useSpring(cursorX, springConfig);
    const springY = useSpring(cursorY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e) => {
            cursorX.set(e.clientX - (isHovering ? 20 : 10));
            cursorY.set(e.clientY - (isHovering ? 20 : 10));
        };

        const handleMouseOver = (e) => {
            if (e.target.closest('a, button, .interactive')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [isHovering]);

    return (
        <motion.div
            className={`custom-cursor ${isHovering ? 'custom-cursor--active' : ''}`}
            style={{
                x: springX,
                y: springY,
                scale: isHovering ? 2 : 1,
            }}
            aria-hidden="true"
        >
            <div className="custom-cursor__inner" />
            <div className="custom-cursor__dot" />
        </motion.div>
    );
};

export default Cursor;
