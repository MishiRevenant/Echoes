'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/* ──────────────────────────────────────────────────────────
   Carousel data – mix of images & video
   Using high-quality Pexels imagery & video of luxury interiors / travel
────────────────────────────────────────────────────────── */
const slides = [
    {
        type: 'video' as const,
        src: 'https://www.pexels.com/es-es/download/video/28345588/',
        alt: 'Marguerite Belmond Boat Interior',
        overline: 'LES BATEAUX BELMOND',
        heading: 'DISCOVER\nMARGUERITE, THE\nNEW BELMOND BOAT',
        body: [
            'Introducing Marguerite, the latest icon from our Belmond boats collection. With modern details and a bright palette, she invites you to explore the region of Burgundy in a warm and delicate atmosphere.',
            'Jump on board for a unique taste of French delicacies, a relaxing pace of travel as well as delicious menus curated by your own private chef.',
        ],
        cta: 'DISCOVER MARGUERITE',
    },
    {
        type: 'video' as const,
        src: 'https://videos.pexels.com/video-files/3209828/3209828-uhd_2560_1440_25fps.mp4',
        poster: 'https://images.pexels.com/photos/5490367/pexels-photo-5490367.jpeg?auto=compress&w=900',
        alt: 'Luxury Train Interior',
        overline: 'BELMOND GRAND HIBERNIAN',
        heading: 'IRELAND\'S\nMOST STORIED\nRAIL JOURNEY',
        body: [
            'Trace the emerald contours of Ireland aboard the Grand Hibernian - a five-star hotel on wheels that brings together world-class cuisine, bespoke service, and breathtaking scenery.',
            'Each cabin blends contemporary Irish craft with timeless elegance, creating a moving sanctuary like no other.',
        ],
        cta: 'DISCOVER GRAND HIBERNIAN',
    },
    {
        type: 'image' as const,
        src: 'https://images.pexels.com/photos/1488327/pexels-photo-1488327.jpeg?auto=compress&w=900',
        alt: 'Luxury Villa Terrace',
        overline: 'BELMOND VILLA SAN MICHELE',
        heading: 'A MONASTERY\nTURNED\nSANCTUARY',
        body: [
            'Perched on a Fiesole hillside overlooking Florence, Villa San Michele was designed by Michelangelo and exudes Renaissance splendour.',
            'Lose yourself in the serene gardens, savor Tuscan cuisine on the loggia, and experience history made intimately personal.',
        ],
        cta: 'DISCOVER VILLA SAN MICHELE',
    },
    {
        type: 'image' as const,
        src: 'https://images.pexels.com/photos/1458457/pexels-photo-1458457.jpeg?auto=compress&w=900',
        alt: 'Coastal Luxury Retreat',
        overline: 'BELMOND SPLENDIDO',
        heading: 'THE JEWEL\nOF\nPORTOFINO',
        body: [
            'Clinging to the hillside above Portofino\'s shimmering bay, Belmond Hotel Splendido has been the ultimate synonym for glamour since 1901.',
            'A stay here is more than a hotel experience — it is an immersion into the dolce vita, surrounded by lemon-scented gardens and sapphire waters.',
        ],
        cta: 'DISCOVER SPLENDIDO',
    },
    {
        type: 'video' as const,
        src: 'https://www.pexels.com/es-es/download/video/29633667/',
        alt: 'Luxury Safari Experience',
        overline: 'BELMOND SAFARIS',
        heading: 'AFRICA\'S\nGREATEST\nWILDERNESS',
        body: [
            'Experience the untamed beauty of Africa\'s wilderness at Belmond Savute Elephant Lodge — a retreat where nature sets the agenda and luxury follows seamlessly.',
            'Morning game drives, sundowner cocktails, and starlit dinners beneath vast skies await.',
        ],
        cta: 'DISCOVER SAFARIS',
    },
    {
        type: 'video' as const,
        src: 'https://www.pexels.com/es-es/download/video/14865460/',
        alt: 'Orient Express Suite',
        overline: 'VENICE SIMPLON-ORIENT-EXPRESS',
        heading: 'THE WORLD\'S\nMOST ICONIC\nTRAIN',
        body: [
            'Step aboard and slip into a world of intrigue and elegance. The Venice Simplon-Orient-Express carries you through Europe\'s most spectacular landscapes in unparalleled 1920s splendour.',
            'Private cabins, white-glove dining, and the gentle rhythm of the rails — pure romance in motion.',
        ],
        cta: 'DISCOVER ORIENT EXPRESS',
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
        <section id="belmond-section" className="bg-warm-white py-16 md:py-24">
            {/* ── Section Title ── */}
            <div className="text-center mb-10 md:mb-14 px-6">
                <p className="overline-text mb-3">Collection</p>
                <h2 className="font-serif text-3xl md:text-4xl font-light tracking-wider text-charcoal">
                    NEW FROM BELMOND
                </h2>
                <div className="mt-4 h-px w-16 bg-earth mx-auto" />
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
                                        <VideoSlide src={slide.src} poster={slide.poster} />
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
                                        ? 'w-4 h-4 border-2 border-charcoal bg-charcoal rotate-45'
                                        : 'w-2.5 h-2.5 border border-charcoal/40 rotate-45 hover:border-charcoal'
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

                                <h3 className="font-serif text-3xl md:text-4xl font-light text-charcoal leading-snug whitespace-pre-line">
                                    {slide.heading}
                                </h3>

                                <div className="h-px w-12 bg-earth/60" />

                                <div className="space-y-4">
                                    {slide.body.map((para, i) => (
                                        <p key={i} className="text-charcoal-light text-sm leading-relaxed font-light">
                                            {para}
                                        </p>
                                    ))}
                                </div>

                                <a href="#" className="cta-link mt-2">
                                    {slide.cta}
                                </a>
                            </motion.div>
                        </AnimatePresence>

                        {/* ── Navigation arrows below text (desktop) ── */}
                        <div className="hidden lg:flex items-center gap-4 mt-10">
                            <button
                                onClick={prev}
                                className="w-10 h-10 border border-charcoal/30 hover:border-charcoal flex items-center justify-center transition-all duration-300 group"
                            >
                                <ChevronLeft size={16} strokeWidth={1.5} className="text-charcoal/60 group-hover:text-charcoal transition-colors" />
                            </button>
                            <span className="text-[10px] tracking-[0.2em] text-charcoal/50 uppercase font-sans">
                                {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                            </span>
                            <button
                                onClick={next}
                                className="w-10 h-10 border border-charcoal/30 hover:border-charcoal flex items-center justify-center transition-all duration-300 group"
                            >
                                <ChevronRight size={16} strokeWidth={1.5} className="text-charcoal/60 group-hover:text-charcoal transition-colors" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
