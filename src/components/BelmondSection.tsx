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
        type: 'image' as const,
        src: 'https://images.pexels.com/photos/2356059/pexels-photo-2356059.jpeg?auto=compress&w=900',
        alt: 'Machu Picchu at sunrise',
        overline: 'PATRIMONIO DE LA HUMANIDAD',
        heading: 'MACHU\nPICCHU,\nLA CIUDAD PERDIDA',
        body: [
            'Suspendida entre nubes a 2.430 metros de altura, Machu Picchu es una de las maravillas más extraordinarias del mundo. Sus terrazas de piedra y templos del sol guardan siglos de historia inca.',
            'Cada amanecer sobre la ciudadela es un eco que resuena entre las montañas, recordándonos que este territorio vive y respira con nosotros.',
        ],
        cta: 'EXPLORAR MACHU PICCHU',
    },
    {
        type: 'image' as const,
        src: 'https://images.pexels.com/photos/3722818/pexels-photo-3722818.jpeg?auto=compress&w=900',
        alt: 'Valle Sagrado de los Incas',
        overline: 'CUSCO & VALLE SAGRADO',
        heading: 'EL CORAZÓN\nDEL MUNDO\nINCА',
        body: [
            'El Valle Sagrado serpentea entre Pisac y Ollantaytambo, flanqueado por ruinas andinas y mercados locales que mantienen vivas las tradiciones milenarias.',
            'Aquí el tiempo fluye diferente. Los colores de los tejidos, el aroma de la tierra húmeda y el sonido de la quena te envuelven en una experiencia que no termina cuando regresas a casa.',
        ],
        cta: 'EXPLORAR EL VALLE SAGRADO',
    },
    {
        type: 'video' as const,
        src: 'https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4',
        alt: 'Cañón del Colca',
        overline: 'AREQUIPA & COLCA',
        heading: 'EL CAÑÓN\nMÁS PROFUNDO\nDEL MUNDO',
        body: [
            'El Cañón del Colca, hogar del majestuoso cóndor andino, te invita a contemplar paisajes de una escala que desafía la imaginación.',
            'Desde los miradores de Cruz del Cóndor, observa cómo estas aves de 3 metros de envergadura surcan las corrientes térmicas en silencio absoluto.',
        ],
        cta: 'EXPLORAR EL COLCA',
    },
    {
        type: 'video' as const,
        src: 'https://videos.pexels.com/video-files/2169880/2169880-uhd_2560_1440_30fps.mp4',
        alt: 'Amazonía peruana',
        overline: 'SELVA AMAZÓNICA',
        heading: 'LA AMAZONÍA,\nEL PULMÓN\nDEL MUNDO',
        body: [
            'El Perú alberga una de las porciones más biodiversas de la cuenca amazónica. Lodges sostenibles en Madre de Dios o Loreto te conectan con este ecosistema único.',
            'Recorridos nocturnos, avistamiento de aves y encuentros con comunidades indígenas convierten cada jornada en un aprendizaje que transforma.',
        ],
        cta: 'EXPLORAR LA AMAZONÍA',
    },
    {
        type: 'image' as const,
        src: 'https://images.pexels.com/photos/2404370/pexels-photo-2404370.jpeg?auto=compress&w=900',
        alt: 'Lago Titicaca',
        overline: 'PUNO & LAGO TITICACA',
        heading: 'EL LAGO\nMÁS ALTO\nDEL MUNDO',
        body: [
            'A 3.812 m sobre el nivel del mar, el Lago Titicaca es cuna de la civilización andina. Las islas flotantes de los Uros y la isla Taquile guardan tradiciones que se remontan a siglos.',
            'Navegar en sus aguas azules con la luz dorada del altiplano es una experiencia que se queda grabada en la memoria para siempre.',
        ],
        cta: 'EXPLORAR EL TITICACA',
    },
    {
        type: 'video' as const,
        src: 'https://videos.pexels.com/video-files/3886164/3886164-uhd_2560_1440_25fps.mp4',
        alt: 'Lima, capital gastronómica',
        overline: 'LIMA & LA COSTA',
        heading: 'LIMA,\nCAPITAL\nGASTRONÓMICA',
        body: [
            'Lima no es solo una puerta de entrada al Perú; es un destino en sí misma. Su escena culinaria, reconocida mundialmente, fusiona tradiciones andinas, amazónicas y de la costa.',
            'Del Miraflores colonial al circuito de arte y gastronomía de Barranco, Lima es la ciudad donde los ecos del pasado se encuentran con la creatividad del presente.',
        ],
        cta: 'EXPLORAR LIMA',
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
        <section id="belmond-section" className="bg-crema py-16 md:py-24">
            {/* ── Section Title ── */}
            <div className="text-center mb-10 md:mb-14 px-6">
                <p className="overline-text mb-3">Experiencias</p>
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

                                <a href="#" className="cta-link mt-2">
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
