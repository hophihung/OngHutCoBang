import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-b from-[#FFFDE7] to-[#E8F5E9] dark:from-gray-800 dark:to-gray-900 py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="w-full text-center">
            <h1
              className="text-3xl md:text-5xl font-bold text-green-800 dark:text-green-400 mb-6 drop-shadow-sm font-sans"
              style={{
                textShadow: "2px 2px 0px rgba(255,255,255,0.5)",
              }}
            >
              Cỏ Bàng Địa Phương - Tác Động Toàn Cầu
            </h1>
            <div className="relative max-w-5xl mx-auto h-48 md:h-64 rounded-xl overflow-hidden shadow-lg border-4 border-white dark:border-gray-700 bg-white dark:bg-gray-800">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3u81Q0C12x4ZbK34FB5D3klk5qQrV6nYW2dwXMmgmd_fg3Zv3vTua-Ajvv9YKlQbdgRj8R8DBBmy8ZvKHFnqjvKVYdT6fWwHNDLFmEl2uxWBmoqSpunjkSFgg4e6rRfnyX-mPgtVqS2rfMFpH9D_Li0QHb2An9UtTYbe7A8PbLHAVQR_WtPrWKpgQTtCcLeQJlN6eNvZhjgLNkXB7MadBZG5cdT42ZtTH5QLkS8F4IikoxTqg9XhKrFXmfnYypqQK8iWO0pxte2g"
                alt="Eco friendly banner collage with grass straws"
                fill
                className="object-cover opacity-90 hover:opacity-100 transition-opacity"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
              <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 px-4 py-2 rounded shadow-md">
                <span className="font-bold text-gray-800 dark:text-white">
                  Ống hút cỏ
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
