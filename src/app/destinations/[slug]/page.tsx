import { destinations } from '@/data/destinations';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft, MapPin } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

interface PageProps {
    params: { slug: string };
}

export async function generateStaticParams() {
    return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const dest = destinations.find((d) => d.slug === params.slug);
    if (!dest) return { title: 'Destination | Belmond Peru' };
    return {
        title: `${dest.name} | Belmond Peru`,
        description: dest.tagline,
    };
}

/* ── Mock hotel/experience data per destination ── */
const experiences: Record<string, Array<{ title: string; img: string; type: string }>> = {
    cusco: [
        { title: 'Belmond Palacio Nazarenas', img: 'https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&w=600', type: 'Hotel' },
        { title: 'Cuzco Sacred Valley Tour', img: 'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&w=600', type: 'Experience' },
        { title: 'Andean Culinary Journey', img: 'https://images.pexels.com/photos/5137664/pexels-photo-5137664.jpeg?auto=compress&w=600', type: 'Dining' },
    ],
    'machu-picchu': [
        { title: 'Belmond Sanctuary Lodge', img: 'https://images.pexels.com/photos/2356059/pexels-photo-2356059.jpeg?auto=compress&w=600', type: 'Hotel' },
        { title: 'Hiram Bingham Orient Express', img: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&w=600', type: 'Train' },
        { title: 'Sun Gate Sunrise Trek', img: 'https://images.pexels.com/photos/4388167/pexels-photo-4388167.jpeg?auto=compress&w=600', type: 'Experience' },
    ],
    lima: [
        { title: 'Belmond Miraflores Park', img: 'https://images.pexels.com/photos/3483098/pexels-photo-3483098.jpeg?auto=compress&w=600', type: 'Hotel' },
        { title: 'Lima Culinary Tour', img: 'https://images.pexels.com/photos/5137664/pexels-photo-5137664.jpeg?auto=compress&w=600', type: 'Dining' },
        { title: 'Barranco Arts District Walk', img: 'https://images.pexels.com/photos/4388196/pexels-photo-4388196.jpeg?auto=compress&w=600', type: 'Experience' },
    ],
    arequipa: [
        { title: 'Casa Andina Premium Arequipa', img: 'https://images.pexels.com/photos/4137786/pexels-photo-4137786.jpeg?auto=compress&w=600', type: 'Hotel' },
        { title: 'Santa Catalina Monastery Visit', img: 'https://images.pexels.com/photos/2356053/pexels-photo-2356053.jpeg?auto=compress&w=600', type: 'Experience' },
        { title: 'Volcanic Landscape Trek', img: 'https://images.pexels.com/photos/4388270/pexels-photo-4388270.jpeg?auto=compress&w=600', type: 'Adventure' },
    ],
    'puno-titicaca': [
        { title: 'Titilaka Lodge', img: 'https://images.pexels.com/photos/4388167/pexels-photo-4388167.jpeg?auto=compress&w=600', type: 'Hotel' },
        { title: 'Uros Floating Islands Tour', img: 'https://images.pexels.com/photos/2356053/pexels-photo-2356053.jpeg?auto=compress&w=600', type: 'Experience' },
        { title: 'Taquile Island Day Trip', img: 'https://images.pexels.com/photos/3389029/pexels-photo-3389029.jpeg?auto=compress&w=600', type: 'Experience' },
    ],
};

const defaultExperiences = [
    { title: 'Luxury Stay', img: 'https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&w=600', type: 'Hotel' },
    { title: 'Local Experience', img: 'https://images.pexels.com/photos/4137786/pexels-photo-4137786.jpeg?auto=compress&w=600', type: 'Experience' },
    { title: 'Guided Tour', img: 'https://images.pexels.com/photos/2356053/pexels-photo-2356053.jpeg?auto=compress&w=600', type: 'Tour' },
];

export default function DestinationPage({ params }: PageProps) {
    const dest = destinations.find((d) => d.slug === params.slug);
    if (!dest) notFound();

    const exps = experiences[dest.slug] ?? defaultExperiences;

    return (
        <main className="bg-warm-white min-h-screen">
            <Header />

            {/* ── Hero ── */}
            <section className="relative h-[60vh] min-h-[420px] overflow-hidden bg-charcoal">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={dest.image} alt={dest.name} className="absolute inset-0 w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-14 text-center px-6">
                    <p className="overline-text text-earth/90 text-[10px] mb-3">{dest.region}</p>
                    <h1 className="font-serif text-4xl md:text-6xl font-light text-white tracking-wide leading-tight mb-4">
                        {dest.name}
                    </h1>
                    <p className="text-white/70 text-sm font-light tracking-wide max-w-md">{dest.tagline}</p>
                </div>
            </section>

            {/* ── Breadcrumb ── */}
            <div className="border-b border-cream-dark">
                <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-3">
                    <Link
                        href="/#belmond-section"
                        className="text-[10px] tracking-[0.2em] uppercase text-charcoal/50 hover:text-charcoal transition-colors flex items-center gap-1.5"
                    >
                        <ArrowLeft size={10} strokeWidth={2} />
                        Back to Map
                    </Link>
                    <span className="text-charcoal/20">·</span>
                    <div className="flex items-center gap-1">
                        <MapPin size={10} strokeWidth={1.5} className="text-earth" />
                        <span className="text-[10px] tracking-[0.1em] uppercase text-earth">{dest.region}</span>
                    </div>
                </div>
            </div>

            {/* ── Intro ── */}
            <section className="max-w-3xl mx-auto px-6 py-16">
                <p className="font-serif text-xl md:text-2xl font-light text-charcoal leading-relaxed text-center">
                    "{dest.tagline}" — where luxury meets the spirit of Peru's most iconic landscapes.
                </p>
                <div className="h-px w-12 bg-earth mx-auto mt-8" />
            </section>

            {/* ── Experiences Grid ── */}
            <section className="max-w-5xl mx-auto px-6 pb-24">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <p className="overline-text mb-2">Curated for you</p>
                        <h2 className="font-serif text-2xl md:text-3xl font-light text-charcoal">
                            STAYS & EXPERIENCES
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {exps.map((exp) => (
                        <div
                            key={exp.title}
                            className="group cursor-pointer"
                        >
                            {/* Image */}
                            <div className="aspect-[4/3] overflow-hidden bg-cream-dark mb-4 relative">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={exp.img}
                                    alt={exp.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {/* Type badge */}
                                <div className="absolute top-3 left-3 bg-white/90 px-2 py-1">
                                    <span className="text-[8px] tracking-[0.15em] uppercase text-charcoal">{exp.type}</span>
                                </div>
                            </div>
                            <h3 className="font-serif text-lg font-light text-charcoal group-hover:text-earth transition-colors duration-300">
                                {exp.title}
                            </h3>
                            <a href="#" className="cta-link text-[9px] mt-2">
                                Explore →
                            </a>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
