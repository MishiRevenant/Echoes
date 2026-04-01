'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pause, Play, ChevronDown } from 'lucide-react';

/* ── Pexels free-use video URLs ──────────────────────────── */
const videos = [
    'https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4',
    'https://videos.pexels.com/video-files/2169880/2169880-uhd_2560_1440_30fps.mp4',
    'https://videos.pexels.com/video-files/3886164/3886164-uhd_2560_1440_25fps.mp4',
];

export default function HeroSection() {
    // Two <video> elements used to crossfade
    const refA = useRef<HTMLVideoElement>(null);
    const refB = useRef<HTMLVideoElement>(null);

    const [playing, setPlaying] = useState(true);
    const [loaded, setLoaded] = useState(false);
    // Which slot is currently "visible" (A = true, B = false)
    const [showA, setShowA] = useState(true);
    // Index of the video currently shown on the VISIBLE slot
    const [curIdx, setCurIdx] = useState(0);

    /* Preload the NEXT video into the hidden slot whenever curIdx changes */
    useEffect(() => {
        const nextIdx = (curIdx + 1) % videos.length;
        const hiddenRef = showA ? refB : refA;
        if (hiddenRef.current) {
            hiddenRef.current.src = videos[nextIdx];
            hiddenRef.current.load();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [curIdx]);

    /* When the visible video ends, crossfade to the hidden (already-loaded) one */
    const handleEnded = useCallback(() => {
        const nextIdx = (curIdx + 1) % videos.length;
        const hiddenRef = showA ? refB : refA;
        if (hiddenRef.current) {
            hiddenRef.current.play().catch(() => { });
        }
        setShowA(prev => !prev);
        setCurIdx(nextIdx);
    }, [curIdx, showA]);

    const togglePlay = () => {
        const active = showA ? refA.current : refB.current;
        if (!active) return;
        if (active.paused) { active.play(); setPlaying(true); }
        else { active.pause(); setPlaying(false); }
    };

    const scrollDown = () => {
        document.getElementById('belmond-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative w-full h-screen min-h-[600px] overflow-hidden bg-tierra">
            {/* ── Video A ── */}
            <video
                ref={refA}
                className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
                style={{
                    opacity: showA ? 1 : 0,
                    transition: 'opacity 1500ms ease-in-out',
                }}
                autoPlay
                muted
                playsInline
                preload="auto"
                src={videos[0]}
                onCanPlay={() => setLoaded(true)}
                onEnded={showA ? handleEnded : undefined}
            />

            {/* ── Video B ── */}
            <video
                ref={refB}
                className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
                style={{
                    opacity: showA ? 0 : 1,
                    transition: 'opacity 1500ms ease-in-out',
                }}
                muted
                playsInline
                preload="auto"
                src={videos[1]}
                onEnded={!showA ? handleEnded : undefined}
            />

            {/* ── Gradient Overlay ── */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/50 z-10 pointer-events-none" />

            {/* ── Center Content ── */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-20">
                <AnimatePresence>
                    {loaded && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="space-y-8"
                        >
                            {/* Heading */}
                            <h1
                                className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-wider text-white leading-tight"
                                style={{ textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}
                            >
                                ECHOES OF<br className="hidden sm:block" /> THE ANDES
                            </h1>

                            {/* Learn More Button */}
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                                className="inline-block border border-white/60 text-white text-[10px] tracking-[0.3em] uppercase px-10 py-3.5 hover:bg-white hover:text-tierra transition-all duration-500 backdrop-blur-sm"
                                onClick={scrollDown}
                            >
                                EXPLORE THE ANDES
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Shimmer while loading */}
                {!loaded && (
                    <div className="space-y-6 text-center">
                        <div className="h-16 w-96 bg-white/10 animate-pulse rounded mx-auto" />
                        <div className="h-10 w-32 bg-white/10 animate-pulse rounded mx-auto" />
                    </div>
                )}
            </div>

            {/* ── Bottom Controls ── */}
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-6 md:px-10 pb-6 md:pb-8 z-20">
                {/* Play / Pause */}
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.6 }}
                    onClick={togglePlay}
                    className="flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300 group"
                    aria-label={playing ? 'Pause video' : 'Play video'}
                >
                    <div className="w-8 h-8 border border-white/40 group-hover:border-white/80 flex items-center justify-center transition-colors duration-300">
                        {playing ? (
                            <Pause size={12} strokeWidth={1.5} fill="currentColor" />
                        ) : (
                            <Play size={12} strokeWidth={1.5} fill="currentColor" className="ml-0.5" />
                        )}
                    </div>
                    <span className="hidden md:block text-[9px] tracking-[0.2em] uppercase">
                        {playing ? 'Pause' : 'Play'}
                    </span>
                </motion.button>

                {/* Scroll Down – centered */}
                <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                    onClick={scrollDown}
                    className="absolute left-1/2 -translate-x-1/2 bottom-6 md:bottom-8 flex flex-col items-center gap-1 text-white/70 hover:text-white transition-colors duration-300"
                    aria-label="Scroll down"
                >
                    <motion.div
                        animate={{ y: [0, 4, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                        className="w-8 h-8 border border-white/40 rounded-full flex items-center justify-center"
                    >
                        <ChevronDown size={14} strokeWidth={1.5} />
                    </motion.div>
                </motion.button>

                {/* Spacer (right) */}
                <div className="w-8 md:w-20" />
            </div>

            {/* ── Thin bottom border accent ── */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-20" />
        </section>
    );
}
