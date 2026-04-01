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
                // Brand palette – Echoes of the Andes
                crema: '#F5EDE0',
                'crema-dark': '#EAD9C4',
                tierra: '#483331',
                'tierra-light': '#6B4E4C',
                cielo: '#273761',
                'cielo-light': '#3D5490',
                bosque: '#41452B',
                arcilla: '#854E3D',
                'arcilla-light': '#A86A57',
                ocaso: '#CEAB83',
                kantuta: '#B466A3',
                // Aliases kept for backwards-compat with existing Tailwind classes
                charcoal: '#483331',
                'charcoal-light': '#6B4E4C',
                earth: '#854E3D',
                'earth-light': '#A86A57',
                cream: '#F5EDE0',
                'cream-dark': '#EAD9C4',
                'warm-white': '#F5EDE0',
                'nav-bg': 'rgba(0,0,0,0.35)',
            },
            fontFamily: {
                display: ['"Big Shoulders Display"', 'sans-serif'],
                serif: ['"Big Shoulders Display"', 'sans-serif'],
                sans: ['"Smooch Sans"', 'Helvetica Neue', 'Arial', 'sans-serif'],
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
