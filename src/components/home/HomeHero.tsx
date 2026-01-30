import Link from "next/link";

export default function HomeHero() {
  return (
    <div className="relative w-full">
      <div
        className="flex min-h-[85vh] flex-col items-center justify-center p-4 text-center bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAh6jWNYY7qnhTWW_lNlD5vB61FQESUmbqXy_eXtkAgzYTpJHlFnTCwcItFDBGIeHIK2Rlq66-5jt2nCHs6wNucLqFK2VvHFlOouXCVbe-rOMkK5m6WNuMejK4EnmobIZOfegi74kMfaSsaGPc9NAXeeyoyZH4KwSjuQr7bx4wf4uZOnzYgmA9NFCXbW9zh9KWgVr0LjEadyNQXYeaCIBUyydbV1JJ2WsnSUjG9DUJ17XOKZRCejhYZxROp28F9ultxzHFPXuIkM0Q")`,
        }}
      >
        <div className="relative z-10 flex flex-col items-center gap-6 max-w-4xl px-4">
          <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight drop-shadow-sm">
            Replace Single-Use Plastic with Nature
          </h1>
          <h2 className="text-white/90 text-lg md:text-xl font-normal leading-relaxed max-w-2xl">
            Sustainable, grass-based solutions for a cleaner planet. Join the
            revolution of regenerative commerce.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center">
            <Link
              href="/ong-hut-co"
              className="flex w-full sm:w-auto min-w-[200px] cursor-pointer items-center justify-center rounded-full h-14 px-8 bg-brand-forest hover:bg-[#1a3817] text-white text-lg font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              For Businesses
            </Link>
            <Link
              href="/ong-hut-co"
              className="flex w-full sm:w-auto min-w-[200px] cursor-pointer items-center justify-center rounded-full h-14 px-8 bg-white/90 hover:bg-white text-brand-forest text-lg font-bold backdrop-blur-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Shop on Amazon
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
