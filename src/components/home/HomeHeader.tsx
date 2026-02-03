import Link from "next/link";
import Image from "next/image";

export default function HomeHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#e5e7eb]">
      <div className="flex items-center justify-between px-6 py-4 max-w-[1280px] mx-auto w-full">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="ReenCo"
            width={120}
            height={44}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>
        <nav className="hidden lg:flex items-center gap-8">
          <Link
            href="/"
            className="text-[#141514] hover:text-primary text-sm font-medium transition-colors"
          >
            Home
          </Link>
          <Link
            href="#"
            className="text-[#141514] hover:text-primary text-sm font-medium transition-colors"
          >
            About Us
          </Link>
          <Link
            href="#"
            className="text-[#141514] hover:text-primary text-sm font-medium transition-colors"
          >
            Sustainability
          </Link>
          <Link
            href="/ong-hut-co"
            className="text-[#141514] hover:text-primary text-sm font-medium transition-colors"
          >
            Products
          </Link>
          <Link
            href="#"
            className="text-[#141514] hover:text-primary text-sm font-medium transition-colors"
          >
            Blog
          </Link>
          <Link
            href="#"
            className="text-[#141514] hover:text-primary text-sm font-medium transition-colors"
          >
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link
            href="/ong-hut-co"
            className="hidden sm:flex min-w-[84px] cursor-pointer items-center justify-center rounded-full h-10 px-6 bg-brand-forest hover:bg-brand-forest/90 transition-colors text-white text-sm font-bold shadow-md"
          >
            <span className="truncate">Shop Now</span>
          </Link>
          <button
            type="button"
            className="lg:hidden p-2 text-brand-forest"
            aria-label="Menu"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
    </header>
  );
}
