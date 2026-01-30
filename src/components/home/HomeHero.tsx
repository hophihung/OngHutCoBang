import Image from "next/image";

const HERO_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAKVfvVM6xqz8GDqGjt1VjI63YATbt3baYHAyGlJc1FfnaCYHyr3ZtCialnknRTYxIx2gwE9zuN-b09FQWL58qG6HMRnOXtNspXt1cDn5fExcwbCaxix4G0DZ9D8cwpFzLgqZnoPoOz7nex6iyTtzDKYbr1XFejaG8YzJ059SKOoFu0Nc94W_2g5vrnRx4OlKsma8bYzUl0nxjjejK9N7LeoV66U09iFeMLlsW3WCBeA9Y2L2RawpzLf6uWI20fSnqWz1sSa_BnjC4";

export default function HomeHero() {
  return (
    <section className="relative flex min-h-[500px] w-full items-center justify-center overflow-hidden lg:min-h-[600px]">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/60 to-black/30" />
        <Image
          src={HERO_IMG}
          alt="Cánh đồng cỏ xanh mướt dưới ánh nắng mặt trời, nguyên liệu làm ống hút cỏ"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      </div>
      <div className="relative z-20 container mx-auto px-4 text-center">
        <div className="mx-auto max-w-4xl flex flex-col items-center gap-6 animate-fade-in-up">
          <h1 className="text-4xl font-black leading-tight tracking-tight text-white md:text-5xl lg:text-6xl drop-shadow-lg">
            Giảm thiểu đồ nhựa dùng 1 lần bằng nguyên liệu thiên nhiên
          </h1>
          <h2 className="text-lg font-normal leading-normal text-gray-100 md:text-xl max-w-2xl drop-shadow-md">
            Ống hút cỏ bàng - Giải pháp xanh cho cuộc sống lành mạnh và bền
            vững.
          </h2>
          <button
            type="button"
            className="mt-4 flex h-12 min-w-[160px] cursor-pointer items-center justify-center rounded-full bg-[#2f7f34] px-8 text-base font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#256629]"
          >
            Mua Ngay
          </button>
        </div>
      </div>
    </section>
  );
}
