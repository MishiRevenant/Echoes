'use client';

import dynamic from 'next/dynamic';
import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { destinations } from '@/data/destinations';
import type { Destination } from '@/data/destinations';
import { MapPin, ArrowRight, X } from 'lucide-react';

/* Dynamically import the Leaflet map with no SSR */
const PeruLeafletMap = dynamic(() => import('./PeruLeafletMap'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center bg-cream-dark animate-pulse">
            <p className="text-[10px] tracking-[0.2em] text-arcilla uppercase">Loading map…</p>
        </div>
    ),
});

/* Category label + colour pill */
const catLabel: Record<Destination['category'], { label: string; bg: string }> = {
    citadel: { label: 'Citadel', bg: 'bg-red-800' },
    city: { label: 'City', bg: 'bg-charcoal' },
    nature: { label: 'Nature', bg: 'bg-olive' },
    amazon: { label: 'Amazon', bg: 'bg-green-800' },
    culture: { label: 'Culture', bg: 'bg-earth' },
};

export default function PeruMapSection() {
    const [activeId, setActiveId] = useState<string | null>('cusco');
    const [panelOpen, setPanelOpen] = useState(true);
    const cardRef = useRef<HTMLDivElement>(null);

    const active = destinations.find((d) => d.id === activeId) ?? destinations[0];

    const handleSelect = useCallback((id: string) => {
        setActiveId(id);
        setPanelOpen(true);
        // On mobile: scroll the destination card into view after it mounts
        setTimeout(() => {
            cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 80);
    }, []);

    return (
        <section id="map-section" className="bg-warm-white pt-16 pb-0 overflow-hidden">
            {/* ── Section Header ── */}
            <div className="text-center mb-10 px-6">
                <p className="overline-text mb-3">Explore Peru</p>
                <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-wider text-tierra">
                    JOURNEY THROUGH THE ANDES
                </h2>
                <div className="mt-4 h-px w-16 bg-arcilla mx-auto" />
                <p className="mt-5 text-sm text-tierra-light font-light max-w-xl mx-auto leading-relaxed">
                    Discover Peru's most extraordinary destinations. Select any point on the map to explore the region.
                </p>
            </div>

            {/* ── Map + Sidebar Layout ── */}
            <div className="relative flex flex-col lg:flex-row">
                {/* MAP */}
                <div className="w-full lg:flex-1 h-[480px] md:h-[600px] lg:h-[700px] relative">
                    <PeruLeafletMap activeId={activeId} onSelect={handleSelect} />

                    {/* Legend */}
                    <div className="absolute bottom-4 left-4 z-[1000] bg-white/90 backdrop-blur-sm px-4 py-3 shadow-sm">
                        <p className="text-[9px] tracking-[0.2em] uppercase text-tierra/60 mb-2">Legend</p>
                        <div className="space-y-1.5">
                            {(
                                [
                                    ['culture', '●', 'Culture'],
                                    ['citadel', '●', 'Citadel'],
                                    ['city', '●', 'City'],
                                    ['nature', '●', 'Nature'],
                                    ['amazon', '●', 'Amazon'],
                                ] as const
                            ).map(([cat, dot, label]) => (
                                <div key={cat} className="flex items-center gap-2">
                                    <span
                                        className="text-base leading-none"
                                        style={{ color: { culture: '#8b7355', citadel: '#c0392b', city: '#2c3e50', nature: '#27ae60', amazon: '#1a7a4a' }[cat] }}
                                    >
                                        {dot}
                                    </span>
                                    <span className="text-[9px] tracking-[0.1em] text-tierra/70 uppercase">{label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* SIDEBAR PANEL */}
                <div className="w-full lg:w-[380px] xl:w-[420px] flex-shrink-0 bg-tierra min-h-[340px] lg:h-[700px] flex flex-col">
                    {/* Destination List (scrollable, top) */}
                    <div className="flex-1 overflow-y-auto">
                        <div className="p-5 border-b border-white/10">
                            <p className="text-[9px] tracking-[0.25em] uppercase text-white/40">
                                {destinations.length} Destinations
                            </p>
                        </div>
                        <ul>
                            {destinations.map((dest, i) => {
                                const { label, bg } = catLabel[dest.category];
                                const isActive = dest.id === activeId;
                                return (
                                    <li key={dest.id}>
                                        <button
                                            onClick={() => handleSelect(dest.id)}
                                            className={`w-full flex items-center gap-4 px-5 py-4 text-left border-b border-white/5 transition-all duration-300 group ${isActive ? 'bg-white/8' : 'hover:bg-white/5'
                                                }`}
                                        >
                                            {/* Number */}
                                            <span
                                                className={`text-[11px] font-light flex-shrink-0 w-6 ${isActive ? 'text-arcilla' : 'text-white/30'}`}
                                            >
                                                {String(i + 1).padStart(2, '0')}
                                            </span>
                                            {/* Name */}
                                            <div className="flex-1 min-w-0">
                                                <p className={`text-xs tracking-[0.1em] uppercase font-light truncate ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white/80'}`}>
                                                    {dest.name}
                                                </p>
                                                <p className="text-[9px] text-white/30 truncate mt-0.5">{dest.region}</p>
                                            </div>
                                            {/* Badge */}
                                            <span className={`text-[7px] tracking-[0.1em] uppercase px-1.5 py-0.5 text-white rounded-sm flex-shrink-0 ${bg}`}>
                                                {label}
                                            </span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Active Destination Card (bottom of panel) */}
                    <AnimatePresence mode="wait">
                        {active && panelOpen && (
                            <motion.div
                                ref={cardRef}
                                key={active.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.35, ease: 'easeOut' }}
                                className="flex-shrink-0 relative overflow-hidden"
                                style={{ height: 200 }}
                            >
                                {/* Background image */}
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={active.image}
                                    alt={active.name}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                {/* Dark overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />

                                {/* Content */}
                                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                                    <p className="overline-text text-arcilla/90 text-[8px] mb-1">{active.region}</p>
                                    <h3 className="font-serif text-xl text-white font-light leading-tight mb-1">
                                        {active.name}
                                    </h3>
                                    <p className="text-[10px] text-white/60 mb-3 font-light">{active.tagline}</p>
                                    <a
                                        href={`/destinations/${active.slug}`}
                                        className="inline-flex items-center gap-2 text-[9px] tracking-[0.2em] uppercase text-white border-b border-white/50 pb-0.5 hover:border-white transition-colors duration-300 w-fit"
                                    >
                                        Discover
                                        <ArrowRight size={10} strokeWidth={1.5} />
                                    </a>
                                </div>

                                {/* Close btn */}
                                <button
                                    onClick={() => setPanelOpen(false)}
                                    className="absolute top-3 right-3 text-white/40 hover:text-white transition-colors"
                                >
                                    <X size={14} strokeWidth={1.5} />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
