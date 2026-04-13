import { useEffect } from 'react';
import useSiteStore from '../../store/siteStore';

const ThemeProvider = ({ children }) => {
    const { theme } = useSiteStore();

    useEffect(() => {
        const root = document.documentElement;

        // Update CSS variables based on AI-selected theme
        if (theme?.colors) {
            root.style.setProperty('--color-bg', theme.colors.bg);
            root.style.setProperty('--color-bg-card', theme.colors.bgCard);
            root.style.setProperty('--color-bg-surface', theme.colors.bgSurface);
            root.style.setProperty('--color-accent', theme.colors.accent);
            root.style.setProperty('--color-text-primary', theme.colors.textPrimary);

            // Generate some subtle hover states based on accent
            root.style.setProperty('--color-accent-hover', adjustColorBright(theme.colors.accent, -20));
        }

    }, [theme]);

    return children;
};

// Helper function to darken/lighten color automatically
function adjustColorBright(color, percent) {
    let R = parseInt(color.substring(1, 3), 16);
    let G = parseInt(color.substring(3, 5), 16);
    let B = parseInt(color.substring(5, 7), 16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R < 255) ? R : 255;
    G = (G < 255) ? G : 255;
    B = (B < 255) ? B : 255;

    R = Math.round(R);
    G = Math.round(G);
    B = Math.round(B);

    const RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
    const GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
    const BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));

    return "#" + RR + GG + BB;
}

export default ThemeProvider;
