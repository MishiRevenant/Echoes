import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import BelmondSection from '@/components/BelmondSection';
import PeruMapSection from '@/components/PeruMapSection';
import Footer from '@/components/Footer';

export default function Home() {
    return (
        <main>
            <Header />
            <HeroSection />
            <BelmondSection />
            <PeruMapSection />
            <Footer />
        </main>
    );
}
