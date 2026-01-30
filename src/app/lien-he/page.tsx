import Image from "next/image";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/home/Footer";
import ContactForm from "./ContactForm";

const MAP_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDl0uhdqUmSa4IPS81unIPOVyX7Bi88uo6hX-9TMxp_vgijsfgY6LFXHVdZKHu6Z09ixXCYDk4Sll5szEVXkOsceLeumixlvsSmd0DjoahnbTWdY4BWTs8rKZXGP_MHXevfy1G02qRa4PFbIJmqK53bkzdY57OwMGFSBEWc9Z0FjJxCRIuqXY6al01KbvzfMiRGjpr9fj2vtogBlGApnVIr-qVMJ4RRn_SVSZVZxEJPyfFo7nG0smOy6Sj5eGSuB9fzGXu5GGQoego";

export default function LienHePage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-white dark:bg-[#102210] text-[#111811] dark:text-white antialiased">
      <AnnouncementBar />
      <Header />

      <main className="flex-grow flex flex-col justify-center">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20 py-12 lg:py-20">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            {/* Left: Contact Info & Map */}
            <div className="flex-1 flex flex-col gap-10">
              <div className="flex flex-col gap-4">
                <span className="text-[#2f7f34] font-bold tracking-wider text-sm uppercase">
                  Contact Us
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1b4d2e] dark:text-white leading-tight">
                  Get in touch with Green Joy
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed max-w-md">
                  We&apos;d love to hear from you. Whether you have a question
                  about our grass straws, pricing, or anything else, our team
                  is ready to answer all your questions.
                </p>
              </div>

              {/* Contact Details Grid */}
              <div className="grid gap-6">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center size-12 rounded-full bg-[#2f7f34]/10 text-[#1b4d2e] dark:text-[#2f7f34] shrink-0">
                    <span className="material-symbols-outlined text-[24px]">
                      location_on
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-bold text-[#111811] dark:text-white text-lg">
                      Visit Us
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      123 Grass Street, District 1,
                      <br />
                      Ho Chi Minh City, Vietnam
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center size-12 rounded-full bg-[#2f7f34]/10 text-[#1b4d2e] dark:text-[#2f7f34] shrink-0">
                    <span className="material-symbols-outlined text-[24px]">
                      mail
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-bold text-[#111811] dark:text-white text-lg">
                      Email Us
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      hello@greenjoystraw.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center size-12 rounded-full bg-[#2f7f34]/10 text-[#1b4d2e] dark:text-[#2f7f34] shrink-0">
                    <span className="material-symbols-outlined text-[24px]">
                      call
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-bold text-[#111811] dark:text-white text-lg">
                      Call Us
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      +84 90 123 4567
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="relative w-full aspect-[16/9] lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-sm mt-auto group">
                <Image
                  src={MAP_IMAGE}
                  alt="Stylized map of Ho Chi Minh City showing location pin"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  style={{ filter: "grayscale(20%) contrast(90%)" }}
                />
                <div className="absolute inset-0 bg-[#1b4d2e]/10 pointer-events-none" />
                <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm">
                  <span className="text-xs font-bold text-[#1b4d2e] dark:text-[#2f7f34] tracking-wide">
                    HEADQUARTERS
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="flex-1 lg:max-w-xl">
              <div className="bg-[#f5f3ef] dark:bg-[#1a2e1a] p-8 md:p-10 rounded-2xl shadow-sm border border-[#e6e2da] dark:border-white/5 h-full flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-[#1b4d2e] dark:text-white mb-2">
                  Send us a message
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  Fill out the form below and we&apos;ll get back to you as soon
                  as possible.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
