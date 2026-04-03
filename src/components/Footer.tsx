'use client';

import { motion } from 'framer-motion';

const footerLinks = {
    Explore: ['Destinations', 'Experiences', 'Itineraries', 'Culture & Heritage', 'Testimonials', 'Gallery'],
    'About Us': ['Our Vision', 'Team', 'Press', 'Social Responsibility'],
    'Plan Your Trip': ['Sign In', 'FAQ', 'Gift Cards', 'Travel Agents'],
    'Follow Us': ['Newsletter', 'Instagram', 'Facebook', 'Pinterest', 'YouTube'],
};

const linkHrefs: Record<string, string> = {
    'Destinations': '/destinations',
    'Experiences': '/experiences',
    'Itineraries': '/packages',
    'Culture & Heritage': '/culture',
    'Gallery': '#',
    'Testimonials': '#',
    'Our Vision': '#',
    'Team': '#',
    'Press': '#',
    'Social Responsibility': '#',
    'Sign In': '#',
    'FAQ': '#',
    'Gift Cards': '#',
    'Travel Agents': '#',
    'Newsletter': '#',
    'Instagram': 'https://instagram.com',
    'Facebook': 'https://facebook.com',
    'Pinterest': 'https://pinterest.com',
    'YouTube': 'https://youtube.com',
};

export default function Footer() {
    return (
        <footer className="bg-tierra text-white/70">
            {/* ── Upper Section ── */}
            <div className="max-w-[1200px] mx-auto px-8 pt-16 pb-10">
                {/* Logo */}
                <div className="text-center mb-14">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/LogoCompleto-white.svg"
                        alt="Echoes of the Andes"
                        className="h-14 w-auto mx-auto"
                        style={{ filter: 'brightness(0) invert(1)' }}
                    />
                    <div className="mt-4 h-px w-20 bg-arcilla/60 mx-auto" />
                </div>

                {/* Links Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h4 className="text-white text-[10px] tracking-[0.3em] uppercase mb-5 font-sans">
                                {category}
                            </h4>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link}>
                                        <a
                                            href={linkHrefs[link] ?? '#'}
                                            className="text-[12px] tracking-wide text-white/50 hover:text-white/90 transition-colors duration-300"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Divider ── */}
            <div className="border-t border-white/10 mx-8" />

            {/* ── Bottom Strip ── */}
            <div className="max-w-[1200px] mx-auto px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
                <p className="text-[10px] text-white/30 tracking-wide">
                    © 2025 Echoes of the Andes. All rights reserved.
                </p>
                <div className="flex gap-6">
                    {['Privacy Policy', 'Terms & Conditions', 'Cookie Settings', 'Accessibility'].map((t) => (
                        <a
                            key={t}
                            href="#"
                            className="text-[10px] text-white/30 hover:text-white/60 tracking-wide transition-colors duration-300"
                        >
                            {t}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
