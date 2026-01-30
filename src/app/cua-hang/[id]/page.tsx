import Image from "next/image";
import Link from "next/link";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/home/Footer";
import ProductDetailContent from "./ProductDetailContent";

const PRODUCT = {
  id: "1",
  name: "Natural Grass Straws - Family Pack",
  slug: "family-box",
  category: "Grass Straws",
  price: "150.000đ",
  rating: 5,
  reviewCount: 24,
  shortDescription:
    "Experience the freshness of nature with every sip. Our dried grass straws are handcrafted from Lepironia grass, 100% biodegradable, and chemically free. The perfect eco-friendly alternative for your family.",
  badge: "Best Seller",
  images: [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBZf-Q7Jjs4gAxXwfIHZikE8JtOf62md1o4Dw1ndzhy0-H3I8QCkKeaH-OG2ALQkLNx71U0nrBaS4mnD8eKzKh_RhGB_K0YBsavWK2te0wWKlcdDOe43Xw8G0cVRPpnemgYJSZ4EBW6sc6PIr6-pCoJGX4LkDjtLzhgSpalaVM41QOUsveGuMXpIiAmjP_45WJTZRZtjcU1p8gnjsYIwSrxN4t9ZU_XCl09Rpu1JTFTie5ImO4XDGY0i0c5tYu4PRRixgNdlkGh0kw",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDBvZZqkylUENx4KfELQZhc3UWpPIK_VBp-mPh5isjyJwXYRCobMIV-ljc_xv1pHokuA_yg6OjGneZxSsCetgawfQU47l0DTcfhHjT-U5knL22bx7k_-_NFvo11TcFUhSeZtLYlP8PqOaSL47sbn99uNhHVeoTFr-PNvkCXTTB95gbA6mEfG4V4AywFeKoRNBRnSPxvSNKAxIgFiwPAG-fBJkRp7K6B-EyRUIDxJ5ie9ZSwX-8IkjzsvnvHO_JR8N76nH28kr6rG7s",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB5DQR4AGY_vmTmXj3VcNvemWy7jEp6DQI1NZnYRNev0Mu8R76YHYttP7y2elCGnB_Spz0aSQFBlGxkbnMmc9DgQtbzk67Oklg5VndOmAhRClewRZWMIebwVpWufWvyqPSZadYwmVROGrkBd7xHJyHNdN64UELlpDs7wJs3oQQ4Cu1muNjrFtU4CD968eWbY86hIjH2sYn_9GwYATtGPYweNdaDkqSdSKNlH6wJW9442mGczEWRvFP4vR2bgJe5ct07q_rX2V9c-Xw",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCplV0TdaJf5wN0ftVQqR1idHMXzGYbm3DYAsvZZaKxm7Se1S55n5xng1fPuRElgVNOu00CTbFGzXNzY4-9Fyn2N3IkREoKJJXIKZ8_DQX_0l8xRNZVNnceqOsN6GBxZIZxjFWZXLqsWVexbtZiu-gqGsTboBDZBzfRu8ZcR6iAQmY_4V5QVsnVLnIJNkxCRp4W3KibAPTAp3fQrSkDpezVI-ck2jtaxJuAIVY9wfjzdAj76wB_vBEgGrsOB2rZ1Np17-pcVAt59VI",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB1pb5zqpNcRUVekR3mkluOwZK-d5gx1rLTYd9CTMGlbsRA654EzfLISZe5IvUFBlDshrB1d5FC6uWRdwInVOHw5_byMRcWS8RFTyF6UA7SE3BWgxX2UZCHmRQ57ySUa33Z6LbuhG6vaJU-ytxYlaa-H7bMMCDxfHewcNpV9CkwIT6ieXs0ihPofKI1Smtg6ynZFF3wguI54LJOdJrXRftQu8P5xLlqMgaYfiNliSF2iaBNrR87NDPu4ZQjVaaGhR075iJX_3Z34JA",
  ],
  variants: ["Box 50 pcs", "Box 100 pcs", "Combo 500 pcs"],
  descriptionImages: [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB9zjdu4230EN8b2QeTX1N-cyeY3H-DastWQrMQ6ALyY822Z9hFaqyGLAyq0i_eXeYM1m0R91wE6mNRc3tSgVNkgxJRrlKmIMhGGI8O1CqVUJ7Wh_xInOviUUfglP4QSU9dzORjV0RPdUt8Gqp5KcQ22rhXOeOqWg81RC6ND5yazOVRAA-dg0hRNas24JDCeul6qEWGnX4AzEpl6HvE2oWaIfahy2RNudfD1HJajqkp54SghuvVIPTV_EwfQnV6HeQ5jgiD9aDUTp8",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBe417uOkfx4pQv0FSfgG8S_9fBEezBrc-OHrkoTfEBO8vBhCp0POgTqfSWbSWfRbgGHurUmL06NRZl3KvbvUpl9l4SFzuK2fe0z8fHmcZNW6i3o15E0teSA3SLhipJj42uDChCPHYDvSd3DeM9pUuyX-Wl-o3OzPBOXGxi0kaXxXurmajUiFlK1wa9t0alEhwNn_2-O95eo-Aw1gwg-yfP3b6wskfZeuUa0WEG4kHHMHEHbYO1embyzXJ783mfL0U8B8WcfY8wlSw",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDW_8IDnUU9aQtNYsaWcB6_ZVHM7HX6PyyOeuWf5r7PrSpIsRyMFAQdX3uLYpzQ3Ux6fvpBYTH7J7p3VYcSRvGBSyni4bJ4ZWTDrjsiYkU_fyI5wWgawhQ_3-fVWnCoS3HcRjDqhJiMPMm2tC9NSVN6tZ3H4AreWAGM7ehTS6f9cxPflhkzSTbeWnIuAgn44smtGKgpxT8lUND3e_yWEjFHiYk7-xarrMA1hbYoc4zfOml8bVqyHp3VFGFiIdDSO9Jq_mC10pTGZDc",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBQKXPFxhxXpoe8PI4eFHeD9kQctniLDhY8QcraOfweOT-H02GBGUSips38e3sWoYgigJ0gggd4BgU6K38m6rrapRF5Yp8kw13y99GrDdqcNEMRvJrOYtaGkspPWHG6fyEYwSqGkPNDo9t3Cp45xtJETAqdGnTccmmw2hiJZb_kWBujkAuCmedxnr2AzlibJ42f5z5rCl1hziWdm95eiFaQqrWhJkdERLgGJ5SILHnqbWKcf1TbeVa1nQ10AOKoDw3gcaSaTQfso28",
  ],
};

type Props = { params: Promise<{ id: string }> };

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  // TODO: fetch product by id from API/Supabase; for now use static sample
  const product = { ...PRODUCT, id };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f8f6] dark:bg-[#102212] text-slate-900 dark:text-white transition-colors duration-300">
      <AnnouncementBar />
      <Header />

      <main className="layout-container mx-auto flex max-w-7xl grow flex-col px-4 py-6 sm:px-8">
        {/* Breadcrumbs */}
        <div className="flex flex-wrap items-center gap-2 py-4 text-sm">
          <Link
            href="/"
            className="text-slate-500 hover:text-[#1c5f21] transition-colors"
          >
            Home
          </Link>
          <span className="text-slate-300">/</span>
          <Link
            href="/cua-hang"
            className="text-slate-500 hover:text-[#1c5f21] transition-colors"
          >
            Shop
          </Link>
          <span className="text-slate-300">/</span>
          <Link
            href="/cua-hang?category=grass-straws"
            className="text-slate-500 hover:text-[#1c5f21] transition-colors"
          >
            Grass Straws
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 dark:text-white font-medium">
            Family Box
          </span>
        </div>

        <ProductDetailContent product={product} />

        {/* Tabs Section */}
        <div className="mt-16 lg:mt-20">
          <div className="border-b border-slate-200 dark:border-slate-800">
            <nav aria-label="Tabs" className="-mb-px flex gap-8">
              <button
                type="button"
                aria-current="page"
                className="border-b-2 border-[#1c5f21] px-1 py-4 text-sm font-bold text-[#1c5f21]"
              >
                Description
              </button>
              <button
                type="button"
                className="border-b-2 border-transparent px-1 py-4 text-sm font-medium text-slate-500 hover:border-slate-300 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
              >
                Preservation Instruction
              </button>
              <button
                type="button"
                className="border-b-2 border-transparent px-1 py-4 text-sm font-medium text-slate-500 hover:border-slate-300 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
              >
                Customer Reviews ({product.reviewCount})
              </button>
            </nav>
          </div>
          <div className="py-8 lg:w-2/3">
            <div className="prose prose-green dark:prose-invert max-w-none">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                Why Choose Green Joy Grass Straws?
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                Our straws are harvested from natural Lepironia fields in the
                Mekong Delta region of Vietnam. The process from harvesting to
                the final product is strictly monitored to ensure no chemicals or
                preservatives are used.
              </p>
              <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                Unlike paper straws that get soggy, grass straws maintain their
                shape in both hot and cold drinks for hours. They are the perfect
                sustainable solution for your home, protecting the environment
                one sip at a time.
              </p>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mt-8">
                {product.descriptionImages.map((src, i) => (
                  <div
                    key={i}
                    className="relative h-32 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800"
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
