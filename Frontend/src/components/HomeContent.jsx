import HomeHero from "./HomeHero";
import HomeCategories from './HomeCategories';
import HomeOccasions from './HomeOccasions';
import TopSellers from "./TopSellers";
import '../All.css';

const HomeContent = () => (
    <div className="HomePageContent">
        <HomeHero />
        <HomeCategories />
        <HomeOccasions />
        <TopSellers />
    </div>
);

export default HomeContent;