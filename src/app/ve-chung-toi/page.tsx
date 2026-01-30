import Image from "next/image";
import Link from "next/link";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/home/Footer";

const HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAo25qRklbaTclImDfKFyi87wcJj30AtwmIFmyP_eWuUtcOb1s5qG6PjLfM0PrydPAPTLcH8gStcZY3s9R1sQPJhWy0zPlOuTwLSP5E0DJeHYVRvbH7rUUAmHnCQ2mijxGMi6D_I6WMDUtgiExvGuEAiOdE2mT5cz1Srl55Yy9y_xx7vToE_bfVSItF9q4Gq2V7ZJC8SyRCMzJCCzEA3s_jm4S3glal4Zc1m8OtvGzLPbCactZoly0iFgepPSaB6Axup9E9ogO0TYg";
const MISSION_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDonHJ_n-lPZAxKoGiOsAFq2Br_x5Fawid3ijyEYL7ZJulEh5I-SkWLHF2qsTFIZ4YtsM9KbNPBZtpftYjq6Pjyvx-6hfUDxLsI88kSo1qb-Lk6n7-OUzambiyIbAcPdDxtk7tuN54V_QApSJzrrwCDWiY555mQsNmKuI7PexgdfafZeT1Trsab0imIfDsE4_NN3jbQDeoJgm5jL9R6ux3ew7Y8UnQK9gJC3F7VDeXrKhlbE2f_PaSlp7l0oKtO2lMBUERwuN4-6oM";
const CIRCULAR_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBY0d_geeinFi85gpS03TU0K4DRpZgiGKJ8LnmPkNQ7wv3zZteZKWqQMGS5sTDYLl9DGDFWaANIxk-XZTnSnf5pAcYI-CKh2GOaKoRlWxBY6SpsZ4vZRPVtfC0a-LRgH40YG7vIWPuTASMyfPHWMArDzd8ZATBwNWtAUKQRccqiX6jf9eN3BaCoi-9FRtrCZD2M72kPrbltNNrWeTP_B5wpcs_fhAha9ie69xO9182uG_GDUttFnji4JkcYklUmg7E0TMhGDum2VzU";
const CTA_PATTERN =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAWlLF4GBtZz7vD3acFvl0vPqrH6xME0DQ-Vfb3oKkTX2xYCvhLLnLu0T4Md8S6egIP86sSMYZ1-1Lm-nM2VgfQvjmfQYDrH47KqEoMXkw_85Z2Ivf8AfXZlPjSy36FxDZUYC65ObKiZbLNd_GlsomQJ2l0zL-GFx_3d8nZigdmmzmB9CTTayY8e6xLrqeX3W4as3JgEfUBfSCBteP0B4zjCQjkG6v90UxWH6ZB1Ra1Co933IZwrqYTjR9pDithRsV5AaXorqHdxhA";

export default function VeChungToiPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f8f6] dark:bg-[#102210] text-slate-900 dark:text-white antialiased">
      <AnnouncementBar />
      <Header />

      <main className="flex flex-col w-full">
        {/* Hero Section */}
        <section className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src={HERO_IMAGE}
              alt=""
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50" />
          </div>
          <div className="relative z-10 text-center max-w-4xl px-4 flex flex-col items-center gap-6">
            <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs uppercase tracking-widest font-bold border border-white/30">
              Est. 2018
            </span>
            <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
              From the Mekong Delta
              <br />
              to your table.
            </h1>
            <p className="text-white/90 text-lg md:text-xl font-light max-w-2xl mx-auto">
              Rooted in nature, crafted for the future. We transform wild grey
              sedge grass into sustainable solutions.
            </p>
            <div className="mt-4">
              <Link
                href="/cua-hang"
                className="inline-block bg-[#1c5f21] hover:bg-[#164d1b] text-white px-8 py-3 rounded-lg text-base font-bold transition-transform hover:scale-105"
              >
                Discover Our Journey
              </Link>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/80">
            <span className="material-symbols-outlined text-4xl">
              keyboard_arrow_down
            </span>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 lg:py-24 bg-[#f6f8f6] dark:bg-[#102210]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative group">
                <div className="absolute -inset-2 bg-[#1c5f21]/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition duration-500" />
                <div className="relative h-[400px] lg:h-[500px] w-full rounded-xl overflow-hidden shadow-xl">
                  <Image
                    src={MISSION_IMAGE}
                    alt="Local farmer"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <p className="text-sm font-medium uppercase tracking-wider mb-1 text-[#1c5f21]">
                      Local Impact
                    </p>
                    <p className="font-bold text-xl">
                      Supporting 500+ Farming Families
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-8">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                    Our Mission:{" "}
                    <span className="text-[#1c5f21]">Empowerment</span> &
                    Sustainability
                  </h2>
                  <p className="text-slate-500 dark:text-slate-300 text-lg leading-relaxed mb-6">
                    The plastic crisis is real, but so is the power of nature. Our
                    journey began with a simple observation in the wetlands of
                    Vietnam: the Grey Sedge grass, known locally as &quot;Cỏ
                    Bàng,&quot; is naturally hollow, durable, and abundant.
                  </p>
                  <p className="text-slate-500 dark:text-slate-300 text-lg leading-relaxed">
                    By harvesting this grass, we not only provide a 100%
                    biodegradable alternative to plastic straws but also create
                    stable jobs for local farmers, preserving traditional crafts
                    while protecting our oceans.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-4 rounded-lg bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 shadow-sm">
                    <span className="material-symbols-outlined text-3xl text-[#1c5f21] mb-2">
                      recycling
                    </span>
                    <h3 className="font-bold text-lg dark:text-white">
                      Zero Waste
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      100% Compostable products
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 shadow-sm">
                    <span className="material-symbols-outlined text-3xl text-[#1c5f21] mb-2">
                      diversity_1
                    </span>
                    <h3 className="font-bold text-lg dark:text-white">
                      Fair Trade
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Ethical wages for artisans
                    </p>
                  </div>
                </div>
                <Link
                  href="#"
                  className="self-start flex items-center gap-2 text-slate-900 dark:text-white font-bold border-b-2 border-[#1c5f21] pb-1 hover:text-[#1c5f21] transition-colors"
                >
                  <span>Read Our Full Impact Report</span>
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Process Timeline Section */}
        <section className="py-16 lg:py-24 bg-white dark:bg-[#0a160a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
              <span className="text-[#1c5f21] font-bold tracking-wider uppercase text-sm">
                Our Process
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold mt-2 mb-4 dark:text-white">
                Farm to Table Transparency
              </h2>
              <p className="text-slate-500 dark:text-slate-400">
                Every straw tells a story of careful selection and natural
                processing. No chemicals, just nature.
              </p>
            </div>
            {/* Desktop Horizontal Timeline */}
            <div className="hidden lg:grid grid-cols-4 gap-4 relative">
              <div className="absolute top-8 left-[12%] right-[12%] h-[2px] border-t-2 border-dashed border-slate-200 dark:border-slate-700 -z-0" />
              {[
                {
                  icon: "agriculture",
                  title: "Harvesting",
                  desc: "Hand-picking the finest grey sedge grass from the Delta wetlands.",
                },
                {
                  icon: "water_drop",
                  title: "Cleaning & Cutting",
                  desc: "Thorough washing with fresh water and cutting to precise lengths.",
                },
                {
                  icon: "wb_sunny",
                  title: "Sunlight Drying",
                  desc: "Naturally baked under the tropical sun to remove moisture and harden.",
                },
                {
                  icon: "verified_user",
                  title: "Quality Control",
                  desc: "Rigorous inspection and sterilization before packaging for you.",
                },
              ].map((step) => (
                <div
                  key={step.title}
                  className="relative z-10 flex flex-col items-center text-center group"
                >
                  <div className="w-16 h-16 rounded-full bg-[#f6f8f6] dark:bg-white/10 border-2 border-[#1c5f21] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform bg-white dark:bg-[#102210]">
                    <span className="material-symbols-outlined text-[#1c5f21] text-3xl">
                      {step.icon}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 px-4">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
            {/* Mobile Vertical Timeline */}
            <div className="lg:hidden flex flex-col gap-8">
              {[
                {
                  title: "Harvesting",
                  desc: "Hand-picking the finest grey sedge grass from the Delta wetlands.",
                },
                {
                  title: "Cleaning & Cutting",
                  desc: "Thorough washing with fresh water and cutting to precise lengths.",
                },
                {
                  title: "Sunlight Drying",
                  desc: "Naturally baked under the tropical sun to remove moisture and harden.",
                },
                {
                  title: "Quality Control",
                  desc: "Rigorous inspection and sterilization before packaging for you.",
                },
              ].map((step, i) => (
                <div key={step.title} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-[#1c5f21] flex items-center justify-center text-white font-bold">
                      {i + 1}
                    </div>
                    {i < 3 && (
                      <div className="w-0.5 flex-1 min-h-[40px] bg-slate-200 dark:bg-slate-700 my-2" />
                    )}
                  </div>
                  <div className="pb-8">
                    <h3 className="font-bold text-lg dark:text-white">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Circular Economy Section */}
        <section className="py-16 lg:py-24 bg-[#e8efe8] dark:bg-[#102210]/50 relative overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#1c5f21]/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#1c5f21]/10 rounded-full blur-3xl" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1 flex flex-col gap-6">
                <h2 className="text-3xl lg:text-4xl font-bold dark:text-white">
                  Circular Economy: Nothing Wasted
                </h2>
                <p className="text-lg text-slate-500 dark:text-slate-300">
                  We believe in the wisdom of nature where waste does not exist.
                  The Lepironia grass is a gift that keeps giving.
                </p>
                <div className="flex flex-col gap-4 mt-4">
                  {[
                    {
                      icon: "grass",
                      title: "The Stems",
                      desc: "The hollow stems are perfectly shaped by nature to become durable, heat-resistant straws.",
                    },
                    {
                      icon: "shopping_bag",
                      title: "The Leaves",
                      desc: "Remaining leaves and fibers are woven by skilled artisans into bags, hats, and mats.",
                    },
                    {
                      icon: "compost",
                      title: "End of Life",
                      desc: "After use, our products return to the earth as compost, nourishing the soil for future growth.",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="flex gap-4 items-start p-4 bg-white dark:bg-[#102210] rounded-xl shadow-sm border border-transparent hover:border-[#1c5f21]/30 transition-colors"
                    >
                      <div className="p-3 bg-[#1c5f21]/10 rounded-lg text-[#1c5f21] shrink-0">
                        <span className="material-symbols-outlined">
                          {item.icon}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg dark:text-white">
                          {item.title}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="order-1 lg:order-2 flex justify-center items-center">
                <div className="relative w-full max-w-md aspect-square bg-white dark:bg-white/5 rounded-full shadow-2xl p-8 flex items-center justify-center border border-white/50 dark:border-white/10">
                  <div className="relative z-10 w-48 h-48 rounded-full overflow-hidden border-4 border-[#1c5f21]/20 shrink-0">
                    <Image
                      src={CIRCULAR_IMAGE}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="192px"
                    />
                  </div>
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg shadow-lg border border-[#1c5f21]/20">
                    <span className="text-sm font-bold text-[#1c5f21]">
                      Handicrafts
                    </span>
                  </div>
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg shadow-lg border border-[#1c5f21]/20">
                    <span className="text-sm font-bold text-[#1c5f21]">
                      Straws
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-20 bg-[#102210] dark:bg-[#0a160a] text-white relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-20 bg-cover bg-center"
            style={{ backgroundImage: `url(${CTA_PATTERN})` }}
            aria-hidden
          />
          <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to make the switch?
            </h2>
            <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
              Join thousands of conscious businesses and individuals reducing
              their plastic footprint today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/cua-hang"
                className="inline-flex items-center justify-center bg-[#1c5f21] hover:bg-[#164d1b] text-white px-8 py-4 rounded-lg text-base font-bold transition-all hover:-translate-y-1 shadow-lg shadow-[#1c5f21]/25"
              >
                Shop Green Joy Straws
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center bg-transparent border border-white/30 hover:bg-white/10 text-white px-8 py-4 rounded-lg text-base font-bold transition-all"
              >
                Partner With Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
