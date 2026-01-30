import HomeHeader from "@/components/home/HomeHeader";
import HomeHero from "@/components/home/HomeHero";
import QuoteSection from "@/components/home/QuoteSection";
import CoreValues from "@/components/home/CoreValues";
import ImpactDashboard from "@/components/home/ImpactDashboard";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import NewsletterCTA from "@/components/home/NewsletterCTA";
import HomeFooter from "@/components/home/HomeFooter";

export default function Home() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-brand-beige overflow-x-hidden">
      <HomeHeader />
      <HomeHero />
      <QuoteSection />
      <CoreValues />
      <ImpactDashboard />
      <FeaturedProducts />
      <NewsletterCTA />
      <HomeFooter />
    </div>
  );
}
