import HeroSection from '../components/sections/HeroSection';
import CategoryGrid from '../components/sections/CategoryGrid';
import AboutSection from '../components/sections/AboutSection';
import MaterialSection from '../components/sections/MaterialSection';
import CatalogPreview from '../components/sections/CatalogPreview';
import PromoSection from '../components/sections/PromoSection';
import GalleryGrid from '../components/sections/GalleryGrid';
import Marquee from '../components/layout/Marquee';

const HomePage = () => {
    return (
        <main>
            <HeroSection />
            <Marquee variant="large" />
            <CategoryGrid />
            <AboutSection />
            <MaterialSection />
            <CatalogPreview />
            <Marquee />
            <PromoSection />
            <GalleryGrid />
        </main>
    );
};

export default HomePage;
