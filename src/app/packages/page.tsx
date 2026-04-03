import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'Packages & Itineraries | Echoes of the Andes',
    description: 'Discover our curated luxury travel packages through the Andes. From Machu Picchu to the Amazon, find the perfect itinerary for your Peruvian adventure.',
};

const packages = [
    {
        id: 1,
        name: 'Imperial Cusco & Sacred Valley',
        duration: '7 Days / 6 Nights',
        price: 'From $3,200 per person',
        category: 'Cultural',
        image: 'https://images.pexels.com/photos/2356059/pexels-photo-2356059.jpeg?auto=compress&w=800',
        highlights: ['Machu Picchu at sunrise', 'Private Inca Trail hike', 'Sacred Valley tour', 'Cusco city exploration', 'Luxury lodge accommodation'],
        description: 'Immerse yourself in the heart of the Inca Empire. This carefully crafted journey takes you through the most iconic sites of the Andean highlands with exclusive private access and premium accommodation.',
    },
    {
        id: 2,
        name: 'Amazon & Rainforest Retreat',
        duration: '5 Days / 4 Nights',
        price: 'From $2,600 per person',
        category: 'Nature',
        image: 'https://images.pexels.com/photos/3389029/pexels-photo-3389029.jpeg?auto=compress&w=800',
        highlights: ['Luxury eco-lodge stay', 'Night rainforest walks', 'Wildlife birdwatching', 'Indigenous community visit', 'Canopy river expedition'],
        description: 'Venture deep into the Peruvian Amazon and connect with nature at its most pristine. Stay in an exclusive eco-lodge as expert naturalist guides lead you through this extraordinary ecosystem.',
    },
    {
        id: 3,
        name: 'Peru Grand Circuit',
        duration: '14 Days / 13 Nights',
        price: 'From $7,800 per person',
        category: 'Signature',
        image: 'https://images.pexels.com/photos/4388167/pexels-photo-4388167.jpeg?auto=compress&w=800',
        highlights: ['Lima culinary tour', 'Colca Canyon condor watch', 'Lake Titicaca reed islands', 'Machu Picchu', 'Nazca Lines flyover'],
        description: 'The ultimate Peruvian journey — our flagship itinerary covers the country\'s greatest highlights from the Pacific coast to the high Andes, combining gastronomy, archaeology and nature.',
    },
    {
        id: 4,
        name: 'Lake Titicaca & High Andes',
        duration: '6 Days / 5 Nights',
        price: 'From $2,900 per person',
        category: 'Cultural',
        image: 'https://images.pexels.com/photos/2404370/pexels-photo-2404370.jpeg?auto=compress&w=800',
        highlights: ['Floating Uros islands', 'Taquile Island weaving tradition', 'Puno colonial churches', 'Altiplano landscape drive', 'Private boat charter'],
        description: 'Discover the world\'s highest navigable lake and the ancient traditions of the Aymara people. This journey across the altiplano offers one of the most visually stunning experiences in South America.',
    },
];

export default function PackagesPage() {
    return (
        <main>
            <Header />

            {/* Hero */}
            <section className="relative h-[55vh] min-h-[400px] bg-tierra flex items-end overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&w=1400"
                    alt="Packages hero"
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-tierra via-tierra/60 to-transparent" />
                <div className="relative z-10 max-w-[1200px] mx-auto px-8 pb-16">
                    <p className="text-arcilla text-[10px] tracking-[0.3em] uppercase mb-3">Travel Packages</p>
                    <h1 className="font-display text-4xl md:text-6xl font-semibold text-white tracking-wider">
                        CURATED JOURNEYS
                    </h1>
                    <div className="mt-4 h-px w-16 bg-arcilla" />
                    <p className="mt-5 text-white/60 max-w-lg text-sm leading-relaxed font-light">
                        Every itinerary is handcrafted to surpass expectations — blending exclusive access, luxury lodging and authentic local encounters.
                    </p>
                </div>
            </section>

            {/* Packages Grid */}
            <section className="bg-crema py-16 md:py-24">
                <div className="max-w-[1200px] mx-auto px-6 md:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        {packages.map((pkg) => (
                            <article key={pkg.id} className="group bg-white shadow-sm hover:shadow-lg transition-shadow duration-500">
                                {/* Image */}
                                <div className="relative h-56 overflow-hidden">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={pkg.image}
                                        alt={pkg.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                    <span className="absolute top-4 left-4 text-[9px] tracking-[0.2em] uppercase text-white bg-arcilla px-3 py-1">
                                        {pkg.category}
                                    </span>
                                </div>
                                {/* Content */}
                                <div className="p-7">
                                    <div className="flex items-start justify-between mb-3">
                                        <h2 className="font-display text-xl font-semibold text-tierra leading-tight">
                                            {pkg.name}
                                        </h2>
                                    </div>
                                    <div className="flex items-center gap-4 mb-4 text-[11px] tracking-[0.12em] uppercase text-tierra/60">
                                        <span>{pkg.duration}</span>
                                        <span className="w-1 h-1 bg-arcilla/40 rounded-full" />
                                        <span className="text-arcilla font-medium">{pkg.price}</span>
                                    </div>
                                    <p className="text-tierra-light text-sm leading-relaxed font-light mb-5">
                                        {pkg.description}
                                    </p>
                                    <ul className="space-y-1.5 mb-6">
                                        {pkg.highlights.map((h) => (
                                            <li key={h} className="flex items-center gap-2 text-[11px] text-tierra/70 tracking-wide">
                                                <span className="text-arcilla text-[8px]">◆</span>
                                                {h}
                                            </li>
                                        ))}
                                    </ul>
                                    <a
                                        href="/contact"
                                        className="inline-block border border-tierra text-tierra text-[10px] tracking-[0.25em] uppercase px-7 py-2.5 hover:bg-tierra hover:text-white transition-all duration-400"
                                    >
                                        ENQUIRE NOW
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
