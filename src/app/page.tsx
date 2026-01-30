import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import HomeHero from "@/components/home/HomeHero";
import StatsBar from "@/components/home/StatsBar";
import WhyCoBang from "@/components/home/WhyCoBang";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import StoryTeaser from "@/components/home/StoryTeaser";
import Footer from "@/components/home/Footer";
import { getFeaturedProducts } from "@/lib/products";

export default async function Home() {
  const products = await getFeaturedProducts();
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <HomeHero />
        <StatsBar />
        <WhyCoBang />
        <FeaturedProducts products={products} />
        <StoryTeaser />
      </main>
      <Footer />
    </div>
  );
}
