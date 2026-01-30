import Link from "next/link";

const features = [
  {
    icon: "eco",
    title: "100% Natural",
    desc: "Made directly from nature without harmful chemicals or preservatives.",
  },
  {
    icon: "water_drop",
    title: "Farm-Clean Process",
    desc: "Hygienic processing ensuring safety from field to glass.",
  },
  {
    icon: "recycling",
    title: "Fully Biodegradable",
    desc: "Compostable materials that return to the earth naturally.",
  },
  {
    icon: "handshake",
    title: "Fair Trade Certified",
    desc: "Supporting local farmers in the Mekong Delta with fair wages.",
  },
];

export default function WhyGreenJoy() {
  return (
    <section
      id="mission"
      className="py-16 px-6 bg-[#f6f8f6] dark:bg-[#102216]"
    >
      <div className="max-w-[1080px] mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="flex flex-col gap-4 md:w-1/3 md:sticky md:top-24">
            <h2 className="text-[#0d1b12] dark:text-white text-3xl md:text-4xl font-bold leading-tight">
              Why Green Joy?
            </h2>
            <p className="text-[#4c9a66] text-lg leading-relaxed">
              Our commitment to sustainability goes beyond the product.
              It&apos;s about the process, the people, and the planet.
            </p>
            <Link
              href="#"
              className="hidden md:flex w-fit items-center gap-2 text-primary font-bold hover:underline"
            >
              Read our full mission{" "}
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:w-2/3">
            {features.map((f) => (
              <div
                key={f.icon}
                className="flex gap-4 rounded-xl border border-[#cfe7d7] dark:border-white/10 bg-white dark:bg-white/5 p-6 flex-col shadow-sm"
              >
                <div className="text-primary bg-primary/10 w-fit p-3 rounded-lg">
                  <span className="material-symbols-outlined text-3xl">
                    {f.icon}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-[#0d1b12] dark:text-white text-lg font-bold">
                    {f.title}
                  </h3>
                  <p className="text-[#4c9a66] text-sm">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
