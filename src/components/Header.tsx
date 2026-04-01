'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, Globe, X, Menu, ArrowRight } from 'lucide-react';
import { destinations } from '@/data/destinations';

/* ── Nav links with routing targets ─────────────────────── */
const navLinks = [
    { label: 'DESTINATIONS', href: '#belmond-section' },
    { label: 'EXPERIENCES', href: '#belmond-section' },
    { label: 'ITINERARIES', href: '#belmond-section' },
    { label: 'CULTURE & HERITAGE', href: '#belmond-section' },
    { label: 'STORIES', href: '#belmond-section' },
    { label: 'CONTACT', href: '#belmond-section' },
];

/* ── Available languages ─────────────────────────────────── */
const languages = [
    { code: 'en', label: 'English', gtCode: 'en' },
    { code: 'es', label: 'Español', gtCode: 'es' },
    { code: 'fr', label: 'Français', gtCode: 'fr' },
    { code: 'pt', label: 'Português', gtCode: 'pt' },
    { code: 'de', label: 'Deutsch', gtCode: 'de' },
    { code: 'ja', label: '日本語', gtCode: 'ja' },
    { code: 'zh', label: '中文', gtCode: 'zh-CN' },
];

/* Detect current language from googtrans cookie */
function getCurrentLang(): string {
    if (typeof window === 'undefined' || typeof document === 'undefined') return 'en';
    const match = document.cookie.match(/googtrans=\/en\/(\w[-\w]*)/);
    return match ? match[1] : 'en';
}

function setLanguage(gtCode: string) {
    if (typeof window === 'undefined') return;
    if (gtCode === 'en') {
        document.cookie = 'googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = 'googtrans=; path=/; domain=.' + window.location.hostname + '; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    } else {
        const val = `/en/${gtCode}`;
        document.cookie = `googtrans=${val}; path=/`;
        document.cookie = `googtrans=${val}; path=/; domain=.${window.location.hostname}`;
    }
    window.location.reload();
}

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [langOpen, setLangOpen] = useState(false);
    const [mobileLangOpen, setMobileLangOpen] = useState(false);
    const [currentLang, setCurrentLang] = useState('en');
    const searchInputRef = useRef<HTMLInputElement>(null);
    const langRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setCurrentLang(getCurrentLang());
    }, []);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    /* Auto-focus search input when overlay opens */
    useEffect(() => {
        if (searchOpen) setTimeout(() => searchInputRef.current?.focus(), 100);
        else setSearchQuery('');
    }, [searchOpen]);

    /* Close lang dropdown on outside click */
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (langRef.current && !langRef.current.contains(e.target as Node)) {
                setLangOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const headerBg = scrolled
        ? 'bg-tierra/95 backdrop-blur-md shadow-md'
        : 'bg-black/30 backdrop-blur-sm';

    const subNavBg = scrolled
        ? 'bg-tierra/90 backdrop-blur-md'
        : 'bg-black/25 backdrop-blur-sm';

    /* Filter destinations by search query */
    const searchResults = searchQuery.trim().length > 0
        ? destinations.filter(d =>
            d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            d.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
            d.tagline.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    const currentLangLabel = languages.find(l => l.gtCode === currentLang)?.label ?? 'English';

    return (
        <>
            {/* ── Main Header ── */}
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBg}`}>
                <div className="relative flex items-center justify-between px-6 md:px-10 h-16">
                    {/* LEFT : Search (desktop) | Hamburger (mobile) */}
                    <div className="flex items-center gap-5">
                        {/* Hamburger – mobile only */}
                        <button
                            className="md:hidden text-white p-1"
                            onClick={() => setMobileOpen(true)}
                            aria-label="Open menu"
                        >
                            <Menu size={20} strokeWidth={1.5} />
                        </button>
                        {/* Search – desktop only */}
                        <button
                            className="hidden md:flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300"
                            onClick={() => setSearchOpen(true)}
                            aria-label="Open search"
                        >
                            <Search size={14} strokeWidth={1.5} />
                            <span className="text-[10px] tracking-[0.2em] uppercase">Search</span>
                        </button>
                    </div>

                    {/* CENTER : Brand Logo */}
                    <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
                        {/*
                          LOGO PLACEHOLDER
                          When the brand logo is ready, replace this block with:

                            <img src="/logo.svg" alt="Echoes of the Andes" className="h-8 md:h-10 w-auto" />
                        */}

                        <div className="flex gap-3 mb-0.5">
                            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                                <path d="M2 10 L6 2 L10 10" stroke="white" strokeWidth="1" fill="none" />
                                <path d="M4 7 L8 7" stroke="white" strokeWidth="0.8" />
                            </svg>
                            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                                <path d="M2 10 L6 2 L10 10" stroke="white" strokeWidth="1" fill="none" />
                                <path d="M4 7 L8 7" stroke="white" strokeWidth="0.8" />
                            </svg>
                        </div>
                        <span className="text-white text-base md:text-lg tracking-[0.3em] font-light font-display uppercase leading-none">
                            ECHOES OF THE ANDES
                        </span>
                    </div>

                    {/* RIGHT : Language | Account | Book */}
                    <div className="flex items-center gap-4 md:gap-5">
                        {/* Language dropdown – desktop only */}
                        <div ref={langRef} className="hidden md:block relative">
                            <button
                                className="flex items-center gap-1 text-white/80 hover:text-white transition-colors duration-300"
                                onClick={() => setLangOpen(v => !v)}
                                aria-label="Select language"
                            >
                                <Globe size={12} strokeWidth={1.5} />
                                <span className="text-[10px] tracking-[0.15em] uppercase">{currentLangLabel}</span>
                                <motion.svg
                                    width="8" height="5" viewBox="0 0 8 5" fill="none"
                                    animate={{ rotate: langOpen ? 180 : 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="ml-0.5"
                                >
                                    <path d="M1 1l3 3 3-3" stroke="currentColor" strokeWidth="1.2" />
                                </motion.svg>
                            </button>

                            {/* Dropdown */}
                            <AnimatePresence>
                                {langOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -6 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full right-0 mt-3 bg-tierra/95 backdrop-blur-md shadow-2xl border border-white/10 min-w-[140px] py-2 z-[200]"
                                    >
                                        {languages.map(lang => (
                                            <button
                                                key={lang.code}
                                                onClick={() => setLanguage(lang.gtCode)}
                                                className={`w-full text-left px-5 py-2.5 text-[10px] tracking-[0.15em] uppercase transition-colors duration-200 flex items-center justify-between gap-3
                                                    ${currentLang === lang.gtCode
                                                        ? 'text-white bg-white/8'
                                                        : 'text-white/60 hover:text-white hover:bg-white/5'
                                                    }`}
                                            >
                                                {lang.label}
                                                {currentLang === lang.gtCode && (
                                                    <span className="w-1 h-1 rounded-full bg-arcilla flex-shrink-0" />
                                                )}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Account – desktop only */}
                        <button className="hidden md:flex items-center gap-1 text-white/80 hover:text-white transition-colors duration-300">
                            <User size={12} strokeWidth={1.5} />
                            <span className="text-[10px] tracking-[0.15em] uppercase">Account</span>
                        </button>
                        {/* Book – always visible */}
                        <button className="book-btn text-[9px] md:text-[10px] px-3 md:px-5 py-1.5 md:py-2">
                            BOOK
                        </button>
                    </div>
                </div>

                {/* ── Sub Navigation (desktop) ── */}
                <nav className={`hidden md:block transition-all duration-500 ${subNavBg} border-t border-white/10`}>
                    <ul className="flex items-center justify-center gap-6 lg:gap-8 py-3">
                        {navLinks.map((link) => (
                            <li key={link.label}>
                                <a href={link.href} className="nav-link flex items-center gap-2 group">
                                    <span className="text-white/40 group-hover:text-white/60 transition-colors">◆</span>
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </header>

            {/* ── Search Overlay ── */}
            <AnimatePresence>
                {searchOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="fixed top-0 left-0 right-0 z-[100] bg-charcoal/98 backdrop-blur-lg pt-6 pb-8 shadow-2xl"
                    >
                        <div className="max-w-2xl mx-auto px-6">
                            {/* Search row */}
                            <div className="flex items-center gap-4 border-b border-white/20 pb-4">
                                <Search size={16} strokeWidth={1.5} className="text-white/50 flex-shrink-0" />
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    placeholder="Search destinations, experiences…"
                                    className="flex-1 bg-transparent text-white placeholder-white/30 text-sm tracking-wide outline-none font-light"
                                />
                                <button
                                    onClick={() => setSearchOpen(false)}
                                    className="text-white/50 hover:text-white transition-colors"
                                    aria-label="Close search"
                                >
                                    <X size={18} strokeWidth={1.5} />
                                </button>
                            </div>

                            {/* Results */}
                            <AnimatePresence>
                                {searchResults.length > 0 && (
                                    <motion.ul
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="mt-4 space-y-1"
                                    >
                                        {searchResults.map(dest => (
                                            <li key={dest.id}>
                                                <a
                                                    href={`/destinations/${dest.slug}`}
                                                    className="flex items-center justify-between px-3 py-3 group hover:bg-white/5 transition-colors duration-200 rounded-sm"
                                                    onClick={() => setSearchOpen(false)}
                                                >
                                                    <div>
                                                        <p className="text-white text-xs tracking-[0.15em] uppercase group-hover:text-arcilla transition-colors duration-200">
                                                            {dest.name}
                                                        </p>
                                                        <p className="text-white/40 text-[10px] mt-0.5">{dest.region}</p>
                                                    </div>
                                                    <ArrowRight size={12} strokeWidth={1.5} className="text-white/30 group-hover:text-arcilla transition-colors duration-200" />
                                                </a>
                                            </li>
                                        ))}
                                    </motion.ul>
                                )}
                                {searchQuery.trim().length > 0 && searchResults.length === 0 && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="mt-6 text-center text-white/30 text-xs tracking-[0.15em]"
                                    >
                                        No destinations found
                                    </motion.p>
                                )}
                                {searchQuery.trim().length === 0 && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="mt-6 text-white/20 text-[10px] tracking-[0.2em] uppercase"
                                    >
                                        Try: Machu Picchu, Lima, Amazon…
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Mobile Drawer ── */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-[60] bg-black/60"
                            onClick={() => setMobileOpen(false)}
                        />
                        {/* Drawer */}
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'tween', duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="fixed top-0 left-0 bottom-0 z-[70] w-[min(85vw,340px)] bg-tierra flex flex-col"
                        >
                            {/* Drawer Header */}
                            <div className="flex items-center justify-between px-6 h-16 border-b border-white/10">
                                <span className="text-white text-sm tracking-[0.25em] font-light font-display uppercase">
                                    ECHOES OF THE ANDES
                                </span>
                                <button
                                    onClick={() => setMobileOpen(false)}
                                    className="text-white/70 hover:text-white transition-colors"
                                >
                                    <X size={20} strokeWidth={1.5} />
                                </button>
                            </div>

                            {/* Nav Links */}
                            <nav className="flex-1 overflow-y-auto px-6 py-8">
                                <ul className="space-y-6">
                                    {navLinks.map((link, i) => (
                                        <motion.li
                                            key={link.label}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 + i * 0.05 }}
                                        >
                                            <a
                                                href={link.href}
                                                className="text-white/80 hover:text-white text-xs tracking-[0.2em] uppercase transition-colors duration-300"
                                                onClick={() => setMobileOpen(false)}
                                            >
                                                {link.label}
                                            </a>
                                        </motion.li>
                                    ))}
                                </ul>
                            </nav>

                            {/* Drawer Footer */}
                            <div className="px-6 py-6 border-t border-white/10 space-y-4">
                                <button
                                    className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                                    onClick={() => { setMobileOpen(false); setSearchOpen(true); }}
                                >
                                    <Search size={14} strokeWidth={1.5} />
                                    <span className="text-[11px] tracking-[0.2em] uppercase">Search</span>
                                </button>

                                {/* Mobile Language Switcher */}
                                <div>
                                    <button
                                        className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                                        onClick={() => setMobileLangOpen(v => !v)}
                                    >
                                        <Globe size={14} strokeWidth={1.5} />
                                        <span className="text-[11px] tracking-[0.2em] uppercase">{currentLangLabel}</span>
                                        <motion.svg width="8" height="5" viewBox="0 0 8 5" fill="none"
                                            animate={{ rotate: mobileLangOpen ? 180 : 0 }} transition={{ duration: 0.25 }}
                                        >
                                            <path d="M1 1l3 3 3-3" stroke="currentColor" strokeWidth="1.2" />
                                        </motion.svg>
                                    </button>
                                    <AnimatePresence>
                                        {mobileLangOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.25 }}
                                                className="overflow-hidden mt-2"
                                            >
                                                <div className="pl-6 space-y-3 py-2">
                                                    {languages.map(lang => (
                                                        <button
                                                            key={lang.code}
                                                            onClick={() => setLanguage(lang.gtCode)}
                                                            className={`block text-[10px] tracking-[0.15em] uppercase transition-colors duration-200 ${currentLang === lang.gtCode ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
                                                        >
                                                            {lang.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <button className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                                    <User size={14} strokeWidth={1.5} />
                                    <span className="text-[11px] tracking-[0.2em] uppercase">Account</span>
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
