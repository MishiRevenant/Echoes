import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                cream: '#f5f0e8',
                'cream-dark': '#ede6d6',
                olive: '#5a6144',
                'olive-light': '#7a8264',
                earth: '#8b7355',
                'earth-light': '#a89070',
                charcoal: '#2a2a2a',
                'charcoal-light': '#4a4a4a',
                'warm-white': '#fdfaf5',
                'nav-bg': 'rgba(0,0,0,0.35)',
            },
            fontFamily: {
                serif: ['Cormorant Garamond', 'Georgia', 'serif'],
                sans: ['Montserrat', 'Helvetica Neue', 'Arial', 'sans-serif'],
            },
            letterSpacing: {
                widest: '0.25em',
                'ultra-wide': '0.35em',
            },
            transitionDuration: {
                '400': '400ms',
                '600': '600ms',
                '800': '800ms',
            },
        },
    },
    plugins: [],
};

export default config;
