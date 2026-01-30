const VALUES = [
  {
    icon: "eco",
    title: "100% Natural",
    description:
      "Made completely from grass fibers without harmful chemicals or binders.",
  },
  {
    icon: "spa",
    title: "Regenerative",
    description:
      "Supporting soil health and biodiversity with every harvest we make.",
  },
  {
    icon: "agriculture",
    title: "Farm to Table",
    description:
      "Direct sourcing ensures the freshest quality and lowest carbon footprint.",
  },
  {
    icon: "handshake",
    title: "Fair Trade",
    description:
      "Ensuring fair wages and ethical treatment for every farmer involved.",
  },
];

export default function CoreValues() {
  return (
    <div className="bg-white py-24 px-6 md:px-20 lg:px-40 rounded-t-[3rem] -mt-10 relative z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-16">
        <div className="flex flex-col gap-4 text-center">
          <h2 className="text-brand-forest text-sm font-bold tracking-widest uppercase">
            Our Philosophy
          </h2>
          <h1 className="text-[#141514] text-4xl md:text-5xl font-black tracking-tight">
            Core Values
          </h1>
          <p className="text-[#727a71] text-lg max-w-2xl mx-auto">
            Our commitment to the planet and its people goes beyond simple
            sustainability. We aim for regeneration.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {VALUES.map((item) => (
            <div
              key={item.title}
              className="group flex flex-col gap-4 rounded-2xl border border-transparent hover:border-[#dfe2df] hover:bg-brand-beige/30 p-8 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-[#f2f3f2] group-hover:bg-primary/20 flex items-center justify-center text-brand-forest transition-colors">
                <span className="material-symbols-outlined text-3xl">
                  {item.icon}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-[#141514] text-xl font-bold">
                  {item.title}
                </h3>
                <p className="text-[#727a71] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
