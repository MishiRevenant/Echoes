import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'Blog & Stories | Echoes of the Andes',
    description: 'Travel stories, culture insights and destination guides from the heart of the Andes. Explore our blog for inspiration for your next Peruvian adventure.',
};

const articles = [
    {
        id: 1,
        slug: 'dawn-at-machu-picchu',
        title: 'Dawn at Machu Picchu: A Guide to Sunrise Access',
        category: 'Destinations',
        date: 'March 28, 2026',
        readTime: '6 min read',
        excerpt: 'There is a very specific quality of light that touches Machu Picchu in the first hour after dawn — a golden silence that transforms the citadel into something even more extraordinary than the photographs suggest.',
        image: 'https://images.pexels.com/photos/2356059/pexels-photo-2356059.jpeg?auto=compress&w=700',
        featured: true,
    },
    {
        id: 2,
        slug: 'lima-gastronomy',
        title: "Lima's New Wave Gastronomy: Beyond Ceviche",
        category: 'Food & Culture',
        date: 'March 15, 2026',
        readTime: '8 min read',
        excerpt: "Lima has long been celebrated as one of the world's great food capitals, but the city's culinary scene continues to reinvent itself at a dizzying pace. We explore what's next.",
        image: 'https://images.pexels.com/photos/3483098/pexels-photo-3483098.jpeg?auto=compress&w=700',
        featured: false,
    },
    {
        id: 3,
        slug: 'andean-condor-colca',
        title: "The Andean Condor of Colca: Nature's Greatest Spectacle",
        category: 'Wildlife',
        date: 'March 5, 2026',
        readTime: '5 min read',
        excerpt: "At Cruz del Cóndor, 3,400 metres above sea level, we witness one of the planet's most breathtaking natural phenomena: the Andean condor riding thermal currents in absolute silence.",
        image: 'https://images.pexels.com/photos/4388270/pexels-photo-4388270.jpeg?auto=compress&w=700',
        featured: false,
    },
    {
        id: 4,
        slug: 'amazon-biodiversity',
        title: "Into the Amazon: A Week in Peru's Biodiversity Hotspot",
        category: 'Nature',
        date: 'February 20, 2026',
        readTime: '10 min read',
        excerpt: 'The Peruvian Amazon holds more species per square kilometre than almost anywhere on Earth. Our naturalist guide shares the revelations of a week-long expedition into Madre de Dios.',
        image: 'https://images.pexels.com/photos/3389029/pexels-photo-3389029.jpeg?auto=compress&w=700',
        featured: false,
    },
    {
        id: 5,
        slug: 'titicaca-uros-islands',
        title: 'Life on the Floating Islands of Lake Titicaca',
        category: 'Culture',
        date: 'February 8, 2026',
        readTime: '7 min read',
        excerpt: "The Uros people have built their entire world — homes, boats, even islands — from totora reeds. A visit to Titicaca is not just a landscape; it's a lesson in human ingenuity and resilience.",
        image: 'https://images.pexels.com/photos/4388167/pexels-photo-4388167.jpeg?auto=compress&w=700',
        featured: false,
    },
    {
        id: 6,
        slug: 'nazca-lines-mystery',
        title: 'The Nazca Lines: Decoding the Desert Canvas',
        category: 'History',
        date: 'January 25, 2026',
        readTime: '9 min read',
        excerpt: 'Seen from the air, the Nazca Lines are unmistakable — enormous geoglyphs etched into the desert plain. Yet their purpose, after a century of study, remains beautifully, stubbornly mysterious.',
        image: 'https://images.pexels.com/photos/5858240/pexels-photo-5858240.jpeg?auto=compress&w=700',
        featured: false,
    },
];

const featured = articles.find(a => a.featured)!;
const rest = articles.filter(a => !a.featured);

export default function BlogPage() {
    return (
        <main>
            <Header />

            {/* Hero */}
            <section className="relative h-[45vh] min-h-[320px] bg-tierra flex items-end overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="https://images.pexels.com/photos/2356053/pexels-photo-2356053.jpeg?auto=compress&w=1400"
                    alt="Blog hero"
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-tierra via-tierra/50 to-transparent" />
                <div className="relative z-10 max-w-[1200px] mx-auto px-8 pb-16">
                    <p className="text-arcilla text-[10px] tracking-[0.3em] uppercase mb-3">Stories & Insights</p>
                    <h1 className="font-display text-4xl md:text-6xl font-semibold text-white tracking-wider">
                        THE BLOG
                    </h1>
                    <div className="mt-4 h-px w-16 bg-arcilla" />
                </div>
            </section>

            {/* Featured Article */}
            <section className="bg-crema pt-16 pb-10">
                <div className="max-w-[1200px] mx-auto px-6 md:px-8">
                    <p className="overline-text mb-8">Featured Story</p>
                    <article className="group grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white shadow-sm hover:shadow-lg transition-shadow duration-500">
                        <div className="relative h-72 lg:h-auto overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={featured.image}
                                alt={featured.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                        <div className="p-8 lg:p-12 flex flex-col justify-center">
                            <span className="text-[9px] tracking-[0.25em] uppercase text-arcilla mb-3">{featured.category}</span>
                            <h2 className="font-display text-2xl md:text-3xl font-semibold text-tierra leading-snug mb-4">
                                {featured.title}
                            </h2>
                            <p className="text-tierra-light text-sm leading-relaxed font-light mb-6">{featured.excerpt}</p>
                            <div className="flex items-center gap-4 text-[10px] text-tierra/40 mb-8">
                                <span>{featured.date}</span>
                                <span>·</span>
                                <span>{featured.readTime}</span>
                            </div>
                            <a href={`/blog/${featured.slug}`} className="cta-link w-fit">
                                READ STORY
                            </a>
                        </div>
                    </article>
                </div>
            </section>

            {/* Article Grid */}
            <section className="bg-crema pb-20">
                <div className="max-w-[1200px] mx-auto px-6 md:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {rest.map((article) => (
                            <article key={article.id} className="group bg-white shadow-sm hover:shadow-md transition-shadow duration-400">
                                <div className="relative h-48 overflow-hidden">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <span className="absolute top-3 left-3 text-[8px] tracking-[0.2em] uppercase bg-tierra/80 text-white px-2.5 py-1">
                                        {article.category}
                                    </span>
                                </div>
                                <div className="p-6">
                                    <h3 className="font-display text-lg font-semibold text-tierra leading-snug mb-3 group-hover:text-arcilla transition-colors duration-300">
                                        {article.title}
                                    </h3>
                                    <p className="text-tierra-light text-xs leading-relaxed font-light mb-4 line-clamp-3">
                                        {article.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[9px] text-tierra/40 tracking-wide">{article.date} · {article.readTime}</span>
                                        <a href={`/blog/${article.slug}`} className="text-[9px] tracking-[0.2em] uppercase text-arcilla border-b border-arcilla/40 hover:border-arcilla pb-0.5 transition-colors duration-300">
                                            Read
                                        </a>
                                    </div>
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
