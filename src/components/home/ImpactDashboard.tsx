const STATS = [
  {
    icon: "local_drink",
    value: "40M+",
    label: "Straws Replaced",
  },
  {
    icon: "delete_forever",
    value: "20T",
    label: "Plastic Reduced",
  },
  {
    icon: "co2",
    value: "50T",
    label: "CO2 Offset",
  },
  {
    icon: "groups",
    value: "100+",
    label: "Farmers Empowered",
  },
];

export default function ImpactDashboard() {
  return (
    <div className="bg-brand-forest text-white py-24 px-6 md:px-20 lg:px-40">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/20 pb-8">
          <div>
            <h2 className="text-primary text-sm font-bold tracking-widest uppercase mb-2">
              Our Impact
            </h2>
            <h2 className="text-3xl md:text-4xl font-black">
              Making a Real Difference
            </h2>
          </div>
          <p className="text-white/80 max-w-md text-right md:text-left">
            Every product you purchase contributes directly to these numbers,
            updated monthly.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((item) => (
            <div
              key={item.label}
              className="flex flex-col gap-2 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <div className="mb-4 text-primary">
                <span className="material-symbols-outlined text-4xl">
                  {item.icon}
                </span>
              </div>
              <p className="text-4xl lg:text-5xl font-black tracking-tight">
                {item.value}
              </p>
              <p className="text-white/70 font-medium">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
