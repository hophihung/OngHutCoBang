import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-surface dark:bg-surface shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 group"
        >
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl group-hover:scale-105 transition-transform">
            <span className="material-icons">eco</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-primary leading-none">
              Green Joy
            </span>
            <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest">
              Sống xanh
            </span>
          </div>
        </Link>
        <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium">
          <Link href="/" className="text-primary font-semibold">
            Trang chủ
          </Link>
          <Link
            href="#"
            className="hover:text-primary transition-colors flex items-center"
          >
            Về chúng tôi{" "}
            <span className="material-icons text-base ml-1">expand_more</span>
          </Link>
          <Link href="#" className="hover:text-primary transition-colors">
            Phát triển bền vững
          </Link>
          <Link
            href="/ong-hut-co"
            className="hover:text-primary transition-colors flex items-center"
          >
            Sản phẩm{" "}
            <span className="material-icons text-base ml-1">expand_more</span>
          </Link>
          <Link href="#" className="hover:text-primary transition-colors">
            Blog
          </Link>
          <Link href="#" className="hover:text-primary transition-colors">
            Liên hệ
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <button
            type="button"
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            aria-label="Tìm kiếm"
          >
            <span className="material-icons text-gray-600 dark:text-gray-300">
              search
            </span>
          </button>
          <button
            type="button"
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            aria-label="Tài khoản"
          >
            <span className="material-icons text-gray-600 dark:text-gray-300">
              person
            </span>
          </button>
          <button
            type="button"
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors relative"
            aria-label="Giỏ hàng"
          >
            <span className="material-icons text-gray-600 dark:text-gray-300">
              shopping_bag
            </span>
            <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-white text-[10px] flex items-center justify-center rounded-full">
              0
            </span>
          </button>
          <div className="flex items-center gap-2 ml-2 border-l pl-4 border-gray-200 dark:border-gray-700">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVefaO-l5VFLvNSNioIs2-3GHrsJgitw1IykLRFxHXuLGT9yAQ4jCPOZtoRCOg3tWgDeTQZJ-rGr9_7MZF-6IQzGFGbBJ3p_X5D1ayKy3-0r6RDy1MBWcE8pnppH4Tmem7r-Aw7CyNklahMaB36A8EJg4k6WEKRpa8ImwGWlbLQ90EyCOtFZSO_NMIs-zGZhj9yhTBNt0wjVDnKOAHoUq0CFvMT4MGCoA4jCl918cqjE210IMCNXAry0dFYY1NTZQdfBY7nzj2b9o"
              alt="English"
              width={20}
              height={20}
              className="w-5 h-auto cursor-pointer opacity-50 hover:opacity-100"
            />
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdGbe2PNR3Hvac8Ob8cDCIhg_llP3Ftp4VODeAKQC_6pan7FKLwoKCMykNoF1VSwi-iTGBDMMbONaB1ipQqCGJxQoGiXB-AI8JptPnAbUEgGUt0CV6tUXF0Xx_rJz3bFjrdlDXuHus8xrpEKF8I3tA1j-tHFTrmafQbIoWsA9r6G2vqMx5xLlILOtdetKmLEWSyrxI6VN2-zR96sHfxQMn3kymLxMN1e1D1Y1fdSxaofln5qbvB0Y7G6CtYEqYsFOJmLzkx73rNXY"
              alt="Tiếng Việt"
              width={20}
              height={20}
              className="w-5 h-auto cursor-pointer shadow-sm"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
