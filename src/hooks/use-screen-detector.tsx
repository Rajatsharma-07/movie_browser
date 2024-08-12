import { useState, useEffect } from 'react';

export const useScreenDetector = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleWindowSizeChange = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleWindowSizeChange);

        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        };
    }, []);

    return width;
};