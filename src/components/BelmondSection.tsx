'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/* ──────────────────────────────────────────────────────────
   Carousel data — all content in English
────────────────────────────────────────────────────────── */
const slides = [
    {
        type: 'image' as const,
        src: 'https://images.pexels.com/photos/2356059/pexels-photo-2356059.jpeg?auto=compress&w=900',
        alt: 'Machu Picchu at sunrise',
        overline: 'WORLD HERITAGE SITE',
        heading: 'MACHU\nPICCHU,\nTHE LOST CITY',
        body: [
            'Suspended among clouds at 2,430 metres above sea level, Machu Picchu is one of the most extraordinary wonders of the world. Its stone terraces and sun temples hold centuries of Inca history.',
            'Every dawn over the citadel is an echo that resonates between the mountains, reminding us that this territory is alive and breathes alongside us.',
        ],
        cta: 'EXPLORE MACHU PICCHU',
    },
    {
        type: 'image' as const,
        src: 'https://images.pexels.com/photos/3722818/pexels-photo-3722818.jpeg?auto=compress&w=900',
        alt: 'Sacred Valley of the Incas',
        overline: 'CUSCO & SACRED VALLEY',
        heading: 'THE HEART\nOF THE\nINCA WORLD',
        body: [
            'The Sacred Valley winds between Pisac and Ollantaytambo, flanked by Andean ruins and local markets that keep millennia-old traditions alive.',
            'Here time flows differently. The colours of the textiles, the scent of damp earth and the sound of the quena wrap you in an experience that does not end when you return home.',
        ],
        cta: 'EXPLORE THE SACRED VALLEY',
    },
    {
        type: 'video' as const,
        src: 'https://videos.pexels.com/video-files/3571264/3571264-hd_1920_1080_30fps.mp4',
        alt: 'Colca Canyon',
        overline: 'AREQUIPA & COLCA',
        heading: 'THE WORLD\'S\nDEEPEST\nCANYON',
        body: [
            'Colca Canyon, home of the majestic Andean condor, invites you to contemplate landscapes of a scale that defies imagination.',
            'From the Cruz del Cóndor viewpoints, watch these birds with 3-metre wingspans soar on thermal currents in absolute silence.',
        ],
        cta: 'EXPLORE COLCA CANYON',
    },
    {
        type: 'video' as const,
        src: 'https://videos.pexels.com/video-files/2169880/2169880-hd_1920_1080_30fps.mp4',
        alt: 'Peruvian Amazon',
        overline: 'AMAZON RAINFOREST',
        heading: 'THE AMAZON,\nLUNG OF\nTHE WORLD',
        body: [
            'Peru is home to one of the most biodiverse portions of the Amazon basin. Sustainable lodges in Madre de Dios or Loreto connect you with this unique ecosystem.',
            'Night tours, birdwatching and encounters with indigenous communities turn every day into a transformative learning experience.',
        ],
        cta: 'EXPLORE THE AMAZON',
    },
    {
        type: 'image' as const,
        src: 'https://images.pexels.com/photos/2404370/pexels-photo-2404370.jpeg?auto=compress&w=900',
        alt: 'Lake Titicaca',
        overline: 'PUNO & LAKE TITICACA',
        heading: 'THE WORLD\'S\nHIGHEST\nNAVIGABLE LAKE',
        body: [
            'At 3,812 m above sea level, Lake Titicaca is the cradle of Andean civilisation. The floating islands of the Uros and Taquile Island preserve traditions dating back centuries.',
            'Sailing its blue waters in the golden light of the altiplano is an experience that stays with you forever.',
        ],
        cta: 'EXPLORE LAKE TITICACA',
    },
    {
        type: 'video' as const,
        src: 'https://videos.pexels.com/video-files/3886164/3886164-hd_1920_1080_25fps.mp4',
        alt: 'Lima, gastronomic capital',
        overline: 'LIMA & THE COAST',
        heading: 'LIMA,\nGASTRONOMIC\nCAPITAL',
        body: [
            'Lima is not just a gateway to Peru — it is a destination in its own right. Its world-renowned culinary scene fuses Andean, Amazonian and coastal traditions.',
            'From colonial Miraflores to the art and gastronomy circuit of Barranco, Lima is the city where echoes of the past meet the creativity of the present.',
        ],
        cta: 'EXPLORE LIMA',
    },
];

/* ────────────────────────────────────────────────────────── */

function VideoSlide({ src, poster }: { src: string; poster?: string }) {
    const ref = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        ref.current?.play().catch(() => { });
    }, []);
    return (
        <video
            ref={ref}
            src={src}
            poster={poster}
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
        />
    );
}

/* ────────────────────────────────────────────────────────── */

export default function BelmondSection() {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState<1 | -1>(1);

    const go = useCallback(
        (idx: number) => {
            setDirection(idx > current ? 1 : -1);
            setCurrent(idx);
        },
        [current]
    );

    const prev = () => go((current - 1 + slides.length) % slides.length);
    const next = () => go((current + 1) % slides.length);

    const slide = slides[current];

    const variants = {
        enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (d: number) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
    };

    return (
        <section id="belmond-section" className="bg-crema py-16 md:py-24">
            {/* ── Section Title ── */}
            <div className="text-center mb-10 md:mb-14 px-6">
                <div className="flex items-center justify-center gap-3 mb-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/LogoSolo-white.svg" alt="" className="h-5 w-auto opacity-60" style={{ filter: 'brightness(0) saturate(100%) invert(35%) sepia(30%) saturate(400%) hue-rotate(5deg)' }} aria-hidden="true" />
                    <p className="overline-text">Experiences</p>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/LogoSolo-white.svg" alt="" className="h-5 w-auto opacity-60" style={{ filter: 'brightness(0) saturate(100%) invert(35%) sepia(30%) saturate(400%) hue-rotate(5deg)' }} aria-hidden="true" />
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-wider text-tierra">
                    ECHOES OF THE ANDES
                </h2>
                <div className="mt-4 h-px w-16 bg-arcilla mx-auto" />
            </div>

            {/* ── Main Carousel Container ── */}
            <div className="max-w-[1200px] mx-auto px-4 md:px-8">
                <div className="flex flex-col lg:flex-row gap-0 lg:gap-12 items-start">

                    {/* ── LEFT: Media Carousel ── */}
                    <div className="relative w-full lg:w-[55%] flex-shrink-0">
                        {/* Slide Track */}
                        <div className="relative aspect-[4/3] overflow-hidden bg-cream-dark">
                            <AnimatePresence custom={direction} initial={false}>
                                <motion.div
                                    key={current}
                                    custom={direction}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                                    className="absolute inset-0"
                                >
                                    {slide.type === 'video' ? (
                                        <VideoSlide src={slide.src} />
                                    ) : (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={slide.src}
                                            alt={slide.alt}
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                </motion.div>
                            </AnimatePresence>

                            {/* Arrow Controls overlaid on media */}
                            <button
                                onClick={prev}
                                aria-label="Previous slide"
                                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white flex items-center justify-center transition-all duration-300 shadow-sm"
                            >
                                <ChevronLeft size={16} strokeWidth={1.5} className="text-charcoal" />
                            </button>
                            <button
                                onClick={next}
                                aria-label="Next slide"
                                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white flex items-center justify-center transition-all duration-300 shadow-sm"
                            >
                                <ChevronRight size={16} strokeWidth={1.5} className="text-charcoal" />
                            </button>
                        </div>

                        {/* Dot Indicators */}
                        <div className="flex items-center justify-center gap-3 mt-5">
                            {slides.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => go(i)}
                                    aria-label={`Go to slide ${i + 1}`}
                                    className={`transition-all duration-300 ${i === current
                                        ? 'w-4 h-4 border-2 border-tierra bg-tierra rotate-45'
                                        : 'w-2.5 h-2.5 border border-tierra/40 rotate-45 hover:border-tierra'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* ── RIGHT: Text Content ── */}
                    <div className="w-full lg:w-[45%] pt-10 lg:pt-8 px-4 md:px-0">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={current}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.5, ease: 'easeOut' }}
                                className="space-y-5"
                            >
                                <p className="overline-text">{slide.overline}</p>

                                <h3 className="font-display text-3xl md:text-4xl font-semibold text-tierra leading-snug whitespace-pre-line">
                                    {slide.heading}
                                </h3>

                                <div className="h-px w-12 bg-arcilla/60" />

                                <div className="space-y-4">
                                    {slide.body.map((para, i) => (
                                        <p key={i} className="text-tierra-light text-sm leading-relaxed font-light">
                                            {para}
                                        </p>
                                    ))}
                                </div>

                                <a href="/destinations" className="cta-link mt-2">
                                    {slide.cta}
                                </a>
                            </motion.div>
                        </AnimatePresence>

                        {/* ── Navigation arrows below text (desktop) ── */}
                        <div className="hidden lg:flex items-center gap-4 mt-10">
                            <button
                                onClick={prev}
                                className="w-10 h-10 border border-tierra/30 hover:border-tierra flex items-center justify-center transition-all duration-300 group"
                            >
                                <ChevronLeft size={16} strokeWidth={1.5} className="text-tierra/60 group-hover:text-tierra transition-colors" />
                            </button>
                            <span className="text-[10px] tracking-[0.2em] text-tierra/50 uppercase font-sans">
                                {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                            </span>
                            <button
                                onClick={next}
                                className="w-10 h-10 border border-tierra/30 hover:border-tierra flex items-center justify-center transition-all duration-300 group"
                            >
                                <ChevronRight size={16} strokeWidth={1.5} className="text-tierra/60 group-hover:text-tierra transition-colors" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
