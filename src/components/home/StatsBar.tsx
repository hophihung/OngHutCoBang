export default function StatsBar() {
  return (
    <section className="w-full bg-white dark:bg-[#1a261b] py-12 border-b border-gray-100 dark:border-gray-800">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-12">
          <div className="flex flex-col items-center gap-2">
            <span className="material-symbols-outlined text-[#2f7f34] text-4xl">
              local_drink
            </span>
            <p className="text-3xl font-bold text-[#2f7f34]">40 Triệu+</p>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Ống hút tiêu thụ
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="material-symbols-outlined text-[#2f7f34] text-4xl">
              handshake
            </span>
            <p className="text-3xl font-bold text-[#2f7f34]">100+</p>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Đối tác doanh nghiệp
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="material-symbols-outlined text-[#2f7f34] text-4xl">
              recycling
            </span>
            <p className="text-3xl font-bold text-[#2f7f34]">20 Tấn</p>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Rác thải nhựa giảm
            </p>
          </div>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="text-xl font-bold text-gray-400">VINPEARL</div>
          <div className="text-xl font-bold text-gray-400">HIGHLANDS</div>
          <div className="text-xl font-bold text-gray-400">
            THE COFFEE HOUSE
          </div>
          <div className="text-xl font-bold text-gray-400">NOVOTEL</div>
        </div>
      </div>
    </section>
  );
}
