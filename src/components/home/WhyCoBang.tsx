const features = [
  {
    icon: "eco",
    title: "100% Tự nhiên",
    desc: "Thu hoạch từ vùng nguyên liệu cỏ bàng tự nhiên miền Tây.",
  },
  {
    icon: "science_off",
    title: "Không hóa chất",
    desc: "Quy trình sản xuất sạch, không chất bảo quản.",
  },
  {
    icon: "compost",
    title: "Phân hủy sinh học",
    desc: "Tự phân hủy trong đất sau khi sử dụng, tốt cho cây trồng.",
  },
  {
    icon: "volunteer_activism",
    title: "Hỗ trợ cộng đồng",
    desc: "Tạo sinh kế bền vững cho bà con nông dân địa phương.",
  },
];

export default function WhyCoBang() {
  return (
    <section className="w-full py-16 bg-[#F5F5DC] dark:bg-[#1e2b1f]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#111811] dark:text-white">
            Tại sao chọn Cỏ Bàng?
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Sản phẩm từ thiên nhiên, an toàn tuyệt đối.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div
              key={f.icon}
              className="flex flex-col items-center text-center p-6 bg-white dark:bg-[#2a382b] rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#2f7f34]/10 text-[#2f7f34]">
                <span className="material-symbols-outlined text-3xl">
                  {f.icon}
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#111811] dark:text-white mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
