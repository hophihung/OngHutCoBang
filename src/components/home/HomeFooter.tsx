import Link from "next/link";

export default function HomeFooter() {
  return (
    <footer className="bg-[#141514] text-white py-12 px-6">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-2xl">
              eco
            </span>
            <h2 className="text-lg font-bold">Green Joy</h2>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Pioneering sustainable solutions for a plastic-free future. Join us
            in making the planet greener, one product at a time.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-bold text-white">Shop</h3>
          <Link
            href="/ong-hut-co"
            className="text-gray-400 hover:text-primary transition-colors text-sm"
          >
            All Products
          </Link>
          <Link
            href="#"
            className="text-gray-400 hover:text-primary transition-colors text-sm"
          >
            For Home
          </Link>
          <Link
            href="#"
            className="text-gray-400 hover:text-primary transition-colors text-sm"
          >
            For Business
          </Link>
          <Link
            href="#"
            className="text-gray-400 hover:text-primary transition-colors text-sm"
          >
            New Arrivals
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-bold text-white">Company</h3>
          <Link
            href="#"
            className="text-gray-400 hover:text-primary transition-colors text-sm"
          >
            About Us
          </Link>
          <Link
            href="#"
            className="text-gray-400 hover:text-primary transition-colors text-sm"
          >
            Sustainability Report
          </Link>
          <Link
            href="#"
            className="text-gray-400 hover:text-primary transition-colors text-sm"
          >
            Careers
          </Link>
          <Link
            href="#"
            className="text-gray-400 hover:text-primary transition-colors text-sm"
          >
            Contact
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-bold text-white">Social</h3>
          <div className="flex gap-4">
            <Link
              href="#"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
              aria-label="Facebook"
            >
              <span className="material-symbols-outlined text-lg">public</span>
            </Link>
            <Link
              href="#"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
              aria-label="Instagram"
            >
              <span className="material-symbols-outlined text-lg">
                photo_camera
              </span>
            </Link>
            <Link
              href="#"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
              aria-label="Email"
            >
              <span className="material-symbols-outlined text-lg">
                alternate_email
              </span>
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-[1280px] mx-auto mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 text-xs">
          © 2023 Green Joy. All rights reserved.
        </p>
        <div className="flex gap-6">
          <Link
            href="#"
            className="text-gray-500 hover:text-white text-xs"
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            className="text-gray-500 hover:text-white text-xs"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
