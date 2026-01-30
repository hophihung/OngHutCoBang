export default function ImpactSection() {
  return (
    <section className="py-16 px-6 bg-white dark:bg-white/5">
      <div className="max-w-[960px] mx-auto flex flex-col gap-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#0d1b12] dark:text-white mb-2">
            Our Impact
          </h2>
          <p className="text-[#4c9a66]">
            Small changes adding up to a massive difference.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center gap-4 rounded-xl p-8 bg-[#e7f3eb] dark:bg-white/5 border border-transparent dark:border-white/10 hover:border-primary/50 transition-all">
            <div className="p-4 bg-white rounded-full text-primary dark:bg-[#102216]">
              <span className="material-symbols-outlined text-4xl">
                local_drink
              </span>
            </div>
            <div className="text-center">
              <p className="text-[#0d1b12] dark:text-white text-4xl font-black tracking-tight mb-1">
                40M+
              </p>
              <p className="text-[#4c9a66] font-medium uppercase tracking-wide text-sm">
                Plastic Straws Replaced
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 rounded-xl p-8 bg-[#e7f3eb] dark:bg-white/5 border border-transparent dark:border-white/10 hover:border-primary/50 transition-all">
            <div className="p-4 bg-white rounded-full text-primary dark:bg-[#102216]">
              <span className="material-symbols-outlined text-4xl">
                delete_sweep
              </span>
            </div>
            <div className="text-center">
              <p className="text-[#0d1b12] dark:text-white text-4xl font-black tracking-tight mb-1">
                20 Tons
              </p>
              <p className="text-[#4c9a66] font-medium uppercase tracking-wide text-sm">
                Waste Reduced
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
