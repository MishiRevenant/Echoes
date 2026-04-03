import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'Experiences | Echoes of the Andes',
    description: 'From jungle lodges to Andean cultural immersions, discover the authentic experiences curated by Echoes of the Andes.',
};

const experienceCategories = [
    {
        id: 'adventure',
        title: 'Adventure & Trekking',
        icon: '◆',
        image: 'https://images.pexels.com/photos/2356053/pexels-photo-2356053.jpeg?auto=compress&w=700',
        description: 'Multi-day treks through cloud forests, Andean passes and ancient Inca trails. From the classic Inca Trail to the remote Salkantay route, our guides ensure a safe and extraordinary journey.',
        experiences: ['Inca Trail to Machu Picchu', 'Salkantay Trek', 'Condor\'s Cross Hike', 'Huaraz Glacier Walking'],
    },
    {
        id: 'culture',
        title: 'Cultural Immersions',
        icon: '◆',
        image: 'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&w=700',
        description: 'Connect with living Andean traditions through private access to ceremonies, artisan workshops and community homestays that go far beyond the typical tourist experience.',
        experiences: ['Inti Raymi Festival access', 'Weaving workshop with Taquile families', 'Shamanic ceremony', 'Private archaeological tours'],
    },
    {
        id: 'gastronomy',
        title: 'Gastronomy & Wine',
        icon: '◆',
        image: 'https://images.pexels.com/photos/3483098/pexels-photo-3483098.jpeg?auto=compress&w=700',
        description: 'Peru is among the world\'s most celebrated culinary destinations. Experience private dinners with acclaimed chefs, market tours and cooking classes in Lima, Cusco and beyond.',
        experiences: ['Private dining at Central, Lima', 'Mercado San Pedro cooking class', 'Pisco distillery tour', 'Amazonian ingredients tasting'],
    },
    {
        id: 'wildlife',
        title: 'Wildlife & Nature',
        icon: '◆',
        image: 'https://images.pexels.com/photos/3389029/pexels-photo-3389029.jpeg?auto=compress&w=700',
        description: 'From Andean condors to Amazonian macaws, Peru hosts extraordinary biodiversity. Our expert naturalist guides bring you close to wildlife in its natural habitat, responsibly.',
        experiences: ['Condor watching at Colca Canyon', 'Amazon nocturnal wildlife walk', 'Birdwatching in cloud forest', 'Sea turtle conservation project'],
    },
    {
        id: 'wellness',
        title: 'Wellness & Retreats',
        icon: '◆',
        image: 'https://images.pexels.com/photos/4388167/pexels-photo-4388167.jpeg?auto=compress&w=700',
        description: 'Reconnect with yourself in some of the world\'s most powerful landscapes. From high-altitude yoga to traditional healing practices, these retreats nourish both body and spirit.',
        experiences: ['Andean mountain yoga retreat', 'Traditional healing ceremony', 'Hot spring spa at Aguas Calientes', 'Meditation at Sacred Valley farms'],
    },
    {
        id: 'photography',
        title: 'Photography Expeditions',
        icon: '◆',
        image: 'https://images.pexels.com/photos/5858240/pexels-photo-5858240.jpeg?auto=compress&w=700',
        description: 'Capture Peru through the lens with professional photographer guides who know exactly where the light falls, when the mist clears and how to frame the Andes for the perfect shot.',
        experiences: ['Machu Picchu sunrise shoot', 'Colca Canyon golden hour', 'Lima street photography walk', 'Nazca Lines aerial photography'],
    },
];

export default function ExperiencesPage() {
    return (
        <main>
            <Header />

            {/* Hero */}
            <section className="relative h-[50vh] min-h-[360px] bg-tierra flex items-end overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="https://images.pexels.com/photos/4388270/pexels-photo-4388270.jpeg?auto=compress&w=1400"
                    alt="Experiences"
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-tierra via-tierra/50 to-transparent" />
                <div className="relative z-10 max-w-[1200px] mx-auto px-8 pb-16">
                    <p className="text-arcilla text-[10px] tracking-[0.3em] uppercase mb-3">Curated Experiences</p>
                    <h1 className="font-display text-4xl md:text-6xl font-semibold text-white tracking-wider">
                        BEYOND SIGHTSEEING
                    </h1>
                    <div className="mt-4 h-px w-16 bg-arcilla" />
                    <p className="mt-5 text-white/60 max-w-lg text-sm leading-relaxed font-light">
                        Every experience is designed to create a genuine connection — with the land, its people and its living culture.
                    </p>
                </div>
            </section>

            {/* Experience Categories */}
            <section className="bg-crema py-16 md:py-24">
                <div className="max-w-[1200px] mx-auto px-6 md:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {experienceCategories.map((cat) => (
                            <article key={cat.id} className="group bg-white shadow-sm hover:shadow-lg transition-shadow duration-500">
                                <div className="relative h-52 overflow-hidden">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={cat.image}
                                        alt={cat.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <h2 className="absolute bottom-4 left-5 font-display text-lg font-semibold text-white">
                                        {cat.title}
                                    </h2>
                                </div>
                                <div className="p-6">
                                    <p className="text-tierra-light text-sm leading-relaxed font-light mb-5">{cat.description}</p>
                                    <ul className="space-y-2 mb-6">
                                        {cat.experiences.map((exp) => (
                                            <li key={exp} className="flex items-center gap-2 text-[11px] text-tierra/70">
                                                <span className="text-arcilla text-[8px]">◆</span>
                                                {exp}
                                            </li>
                                        ))}
                                    </ul>
                                    <a href="/contact" className="text-[9px] tracking-[0.2em] uppercase text-arcilla border-b border-arcilla/40 hover:border-arcilla pb-0.5 transition-colors duration-300">
                                        ENQUIRE
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
