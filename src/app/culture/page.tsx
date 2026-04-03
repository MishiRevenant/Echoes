import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'Culture & Heritage | Echoes of the Andes',
    description: 'Explore the rich cultural heritage of the Andes — from ancient Inca civilisation to vibrant living traditions across Peru\'s communities.',
};

const topics = [
    {
        id: 'inca',
        overline: 'AD 1438 – 1533',
        title: 'The Inca Empire',
        body: 'At its peak, the Inca Empire — Tawantinsuyu, "the four regions" — stretched from modern Colombia to Chile. Its engineering, agricultural terracing and astronomical knowledge continue to inspire wonder. Most of our itineraries begin in Cusco, the empire\'s ancient capital.',
        image: 'https://images.pexels.com/photos/2356059/pexels-photo-2356059.jpeg?auto=compress&w=700',
        facts: ['Over 40,000 km of road network', 'No written language — oral & knot-based record-keeping', '12 million citizens at its height'],
        link: '/destinations',
    },
    {
        id: 'traditions',
        overline: 'Living Heritage',
        title: 'Andean Traditions Today',
        body: 'The mountains of Peru are not a museum — they are alive. From the weaving cooperatives of Taquile to the Quechua-speaking communities of the Sacred Valley, indigenous traditions thrive in remarkable continuity with the past.',
        image: 'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&w=700',
        facts: ['Quechua spoken by 8+ million people', 'UNESCO-recognised textile traditions', 'Inti Raymi festival celebrated annually since 1944'],
        link: '/experiences',
    },
    {
        id: 'gastronomy',
        overline: 'Culinary Heritage',
        title: 'Peru\'s Culinary Identity',
        body: 'Peruvian cuisine is recognised by UNESCO as Intangible Cultural Heritage. The country possesses over 4,000 native potato varieties, 55 varieties of corn and ingredients still harvested in the same way they were 3,000 years ago.',
        image: 'https://images.pexels.com/photos/3483098/pexels-photo-3483098.jpeg?auto=compress&w=700',
        facts: ['Lima named Best Culinary Destination (2012–2023)', 'Ceviche: UNESCO Intangible Heritage', 'Three biodiversity zones in one country'],
        link: '/experiences',
    },
    {
        id: 'archaeology',
        overline: 'Archaeology',
        title: 'Beyond Machu Picchu',
        body: 'Peru is home to over 100 major archaeological sites beyond Machu Picchu — from the mysterious Nazca Lines to the mud-walled city of Chan Chan, the largest pre-Columbian city in South America. Each site unlocks a different chapter of human history.',
        image: 'https://images.pexels.com/photos/5858240/pexels-photo-5858240.jpeg?auto=compress&w=700',
        facts: ['Chan Chan: 20 km² UNESCO World Heritage site', 'Nazca Lines: over 800 geoglyphs', 'Huaca de la Luna: 1,500-year-old murals'],
        link: '/destinations',
    },
];

export default function CulturePage() {
    return (
        <main>
            <Header />

            {/* Hero */}
            <section className="relative h-[50vh] min-h-[360px] bg-tierra flex items-end overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&w=1400"
                    alt="Culture hero"
                    className="absolute inset-0 w-full h-full object-cover opacity-35"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-tierra via-tierra/60 to-transparent" />
                <div className="relative z-10 max-w-[1200px] mx-auto px-8 pb-16">
                    <p className="text-arcilla text-[10px] tracking-[0.3em] uppercase mb-3">Culture & Heritage</p>
                    <h1 className="font-display text-4xl md:text-6xl font-semibold text-white tracking-wider">
                        A LIVING HERITAGE
                    </h1>
                    <div className="mt-4 h-px w-16 bg-arcilla" />
                    <p className="mt-5 text-white/60 max-w-lg text-sm leading-relaxed font-light">
                        Thousands of years of civilisation echo through every stone, every textile, every flavour. Come and listen.
                    </p>
                </div>
            </section>

            {/* Topic Sections */}
            <section className="bg-crema py-16 md:py-24">
                <div className="max-w-[1200px] mx-auto px-6 md:px-8 space-y-20">
                    {topics.map((topic, idx) => (
                        <div
                            key={topic.id}
                            className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                        >
                            {/* Image */}
                            <div className={`relative h-72 md:h-80 overflow-hidden ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={topic.image}
                                    alt={topic.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Text */}
                            <div className={idx % 2 === 1 ? 'lg:order-1' : ''}>
                                <p className="overline-text mb-2">{topic.overline}</p>
                                <h2 className="font-display text-2xl md:text-3xl font-semibold text-tierra mb-4 tracking-wide">
                                    {topic.title}
                                </h2>
                                <div className="h-px w-10 bg-arcilla mb-5" />
                                <p className="text-tierra-light text-sm leading-relaxed font-light mb-6">{topic.body}</p>
                                <ul className="space-y-2 mb-7">
                                    {topic.facts.map((fact) => (
                                        <li key={fact} className="flex items-center gap-2 text-[11px] text-tierra/60">
                                            <span className="text-arcilla text-[8px]">◆</span>
                                            {fact}
                                        </li>
                                    ))}
                                </ul>
                                <a href={topic.link} className="cta-link">
                                    EXPLORE MORE
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
