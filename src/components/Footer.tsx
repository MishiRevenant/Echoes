'use client';

import { motion } from 'framer-motion';

const footerLinks = {
    Explore: ['Destinations', 'Experiences', 'Packages & Tours', 'Occasions', 'Offers', 'Stories'],
    'About Belmond': ['Our Vision', 'Careers', 'Press', 'Social Responsibility'],
    'Guest Services': ['Account Login', 'Loyalty Programme', 'Gift Cards', 'Travel Agents'],
    'Stay Connected': ['Newsletter', 'Instagram', 'Facebook', 'Pinterest', 'YouTube'],
};

export default function Footer() {
    return (
        <footer className="bg-charcoal text-white/70">
            {/* ── Upper Section ── */}
            <div className="max-w-[1200px] mx-auto px-8 pt-16 pb-10">
                {/* Logo */}
                <div className="text-center mb-14">
                    <span className="text-white text-2xl tracking-[0.6em] font-light uppercase font-sans">
                        BELMOND
                    </span>
                    <div className="mt-4 h-px w-20 bg-earth/60 mx-auto" />
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
                                            href="#"
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
                    © 2024 Belmond Management Ltd. All rights reserved.
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
