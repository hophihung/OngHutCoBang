import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import HomeHero from "@/components/home/HomeHero";
import StatsBar from "@/components/home/StatsBar";
import WhyCoBang from "@/components/home/WhyCoBang";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import StoryTeaser from "@/components/home/StoryTeaser";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <HomeHero />
        <StatsBar />
        <WhyCoBang />
        <FeaturedProducts />
        <StoryTeaser />
      </main>
      <Footer />
    </div>
  );
}
