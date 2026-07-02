import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const Magnet = ({ children, padding = 100, disabled = false, magnetStrength = 0.5 }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * magnetStrength, y: middleY * magnetStrength });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    if (disabled) {
        return <div ref={ref}>{children}</div>;
    }

    return (
        <motion.div
            style={{ display: 'inline-block' }}
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
            {children}
        </motion.div>
    );
};

export default Magnet;
