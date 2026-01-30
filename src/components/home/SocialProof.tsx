export default function SocialProof() {
  return (
    <section className="py-10 border-b border-[#e7f3eb] dark:border-white/5 bg-[#f6f8f6] dark:bg-[#102216]">
      <div className="max-w-[960px] mx-auto px-6 text-center">
        <p className="text-sm font-semibold text-[#4c9a66] mb-6 uppercase tracking-wider">
          Trusted by partners worldwide
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-10 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="text-2xl font-black text-[#0d1b12] dark:text-white flex items-center gap-1">
            <span className="material-symbols-outlined">shopping_bag</span>
            Amazon
          </div>
          <div className="text-2xl font-black text-[#0d1b12] dark:text-white flex items-center gap-1">
            <span className="material-symbols-outlined">local_mall</span>
            Shopee
          </div>
          <div className="text-2xl font-black text-[#0d1b12] dark:text-white flex items-center gap-1">
            <span className="material-symbols-outlined">storefront</span>
            Tiki
          </div>
        </div>
      </div>
    </section>
  );
}
