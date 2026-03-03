import Image from "next/image";
import Link from "next/link";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/home/Footer";

const HERO_IMAGE = "/onghut.jpg";
const MISSION_IMAGE = "/ong-hut-co-bang-1.webp";
const CIRCULAR_IMAGE = "/unnamed (2).jpg";
const CTA_PATTERN = "/Gemini_Generated_Image_ez6f36ez6f36ez6f copy.png";

export default function VeChungToiPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f8f6] dark:bg-[#102210] text-slate-900 dark:text-white antialiased">
      <AnnouncementBar />
      <Header />

      <main className="flex flex-col w-full">
        {/* Hero Section */}
        <section className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src={HERO_IMAGE}
              alt=""
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50" />
          </div>
          <div className="relative z-10 text-center max-w-4xl px-4 flex flex-col items-center gap-6">
            <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight md:whitespace-nowrap">
            ReenCo: Nguồn gốc từ thiên nhiên
            </h1>
            <p className="text-white/90 text-lg md:text-xl font-light max-w-2xl mx-auto">
              Bắt nguồn từ thiên nhiên, kiến tạo cho tương lai xanh. Chúng tôi
              biến cỏ bàng thành giải pháp bền vững.
            </p>
            <div className="mt-4">
              <Link
                href="/cua-hang"
                className="inline-block bg-[#1c5f21] hover:bg-[#164d1b] text-white px-8 py-3 rounded-lg text-base font-bold transition-transform hover:scale-105"
              >
                Khám phá hành trình của chúng tôi
              </Link>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/80">
            <span className="material-symbols-outlined text-4xl">
              keyboard_arrow_down
            </span>
          </div>
        </section>

        {/* Câu chuyện & Sứ mệnh */}
        <section className="py-16 lg:py-24 bg-[#f6f8f6] dark:bg-[#102210]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative group">
                <div className="absolute -inset-2 bg-[#1c5f21]/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition duration-500" />
                <div className="relative h-[400px] lg:h-[500px] w-full rounded-xl overflow-hidden shadow-xl">
                  <Image
                    src={MISSION_IMAGE}
                    alt="Cỏ bàng vùng Đồng bằng sông Cửu Long"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <p className="text-sm font-medium uppercase tracking-wider mb-1 text-[#1c5f21]">
                      Tác động địa phương
                    </p>
                    <p className="font-bold text-xl">
                      Hỗ trợ nông dân vùng nguyên liệu
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-8">
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
                    Câu chuyện của chúng tôi
                  </h2>
                  <p className="text-slate-500 dark:text-slate-300 text-lg leading-relaxed mb-6">
                    Dự án ReenCo được ra đời tại Đại học FPT Quy Nhơn bởi một nhóm sinh viên đam mê công nghệ và lối sống xanh. Chứng kiến cuộc khủng hoảng rác thải nhựa đang trực tiếp đe dọa hệ sinh thái Việt Nam, chúng tôi nhận ra giải pháp hoàn hảo nhất nằm ngay ở những cánh đồng cỏ bàng (Grey Sedge) bạt ngàn của vùng Đồng bằng sông Cửu Long.
                  </p>
                  <h3 className="text-xl font-bold text-[#1c5f21] dark:text-[#2f7f34] mb-4">
                    Sứ mệnh: Từ &quot;Cỏ dại&quot; đến &quot;Giải pháp bền vững&quot;
                  </h3>
                  <p className="text-slate-500 dark:text-slate-300 text-lg leading-relaxed mb-4">
                    ReenCo không chỉ bán ống hút. Chúng tôi xây dựng một hệ sinh thái tiêu dùng không rác thải (Zero Waste).
                  </p>
                  <ul className="space-y-3 text-slate-500 dark:text-slate-300">
                    <li className="flex gap-2">
                      <span className="text-[#1c5f21] shrink-0">•</span>
                      <span><strong className="text-slate-700 dark:text-slate-200">Giải quyết rác thải:</strong> Thay thế hoàn toàn ống hút nhựa bằng sản phẩm 100% tự nhiên.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#1c5f21] shrink-0">•</span>
                      <span><strong className="text-slate-700 dark:text-slate-200">Hỗ trợ nông dân:</strong> Kết nối trực tiếp với các hộ dân vùng nguyên liệu, góp phần bảo tồn nghề thủ công truyền thống.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#1c5f21] shrink-0">•</span>
                      <span><strong className="text-slate-700 dark:text-slate-200">Số hóa lối sống xanh:</strong> Ứng dụng nền tảng TMĐT để đưa sản phẩm xanh đến gần hơn với các doanh nghiệp F&B và cá nhân một cách tiện lợi nhất.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Giá trị cốt lõi */}
        <section className="py-16 lg:py-20 bg-white dark:bg-[#0a160a]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-10 text-center">
              Giá trị cốt lõi của ReenCo
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl bg-[#f6f8f6] dark:bg-white/5 border border-slate-100 dark:border-white/10 shadow-sm">
                <span className="material-symbols-outlined text-3xl text-[#1c5f21] mb-3">
                  recycling
                </span>
                <h3 className="font-bold text-lg dark:text-white mb-2">
                  100% Phân hủy sinh học
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Sản phẩm quay trở lại đất mẹ như phân bón sau khi sử dụng.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-[#f6f8f6] dark:bg-white/5 border border-slate-100 dark:border-white/10 shadow-sm">
                <span className="material-symbols-outlined text-3xl text-[#1c5f21] mb-3">
                  eco
                </span>
                <h3 className="font-bold text-lg dark:text-white mb-2">
                  Không hóa chất
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Quy trình xử lý hoàn toàn tự nhiên, an toàn tuyệt đối cho sức khỏe.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-[#f6f8f6] dark:bg-white/5 border border-slate-100 dark:border-white/10 shadow-sm">
                <span className="material-symbols-outlined text-3xl text-[#1c5f21] mb-3">
                  diversity_1
                </span>
                <h3 className="font-bold text-lg dark:text-white mb-2">
                  Công bằng (Fair Trade)
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Đảm bảo thu nhập xứng đáng cho những nghệ nhân và nông dân Việt.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quy trình sản xuất minh bạch (Farm to Table) */}
        <section className="py-16 lg:py-24 bg-[#f6f8f6] dark:bg-[#102210]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
              <span className="text-[#1c5f21] font-bold tracking-wider uppercase text-sm">
                Quy trình
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold mt-2 mb-4 dark:text-white">
                Quy trình sản xuất minh bạch (Farm to Table)
              </h2>
              <p className="text-slate-500 dark:text-slate-400">
                Mỗi chiếc ống hút ReenCo là một câu chuyện về sự tỉ mỉ.
              </p>
            </div>
            {/* Desktop Horizontal Timeline */}
            <div className="hidden lg:grid grid-cols-4 gap-4 relative">
              <div className="absolute top-8 left-[12%] right-[12%] h-[2px] border-t-2 border-dashed border-slate-200 dark:border-slate-700 -z-0" />
              {[
                {
                  icon: "agriculture",
                  title: "Thu hoạch",
                  desc: "Tuyển chọn những cây cỏ bàng đạt độ chín và độ bền tốt nhất tại vùng đất ngập nước.",
                },
                {
                  icon: "water_drop",
                  title: "Làm sạch & Cắt",
                  desc: "Rửa sạch bằng nước tự nhiên và cắt theo kích thước tiêu chuẩn (20cm cho café, 15cm cho cocktail).",
                },
                {
                  icon: "ac_unit",
                  title: "Sấy lạnh & Khử trùng",
                  desc: "Ứng dụng công nghệ để đảm bảo độ bền, màu sắc tự nhiên và diệt khuẩn hoàn toàn.",
                },
                {
                  icon: "verified_user",
                  title: "Kiểm soát chất lượng",
                  desc: "Từng chiếc ống được kiểm tra nghiêm ngặt trước khi đóng gói gửi đến tay bạn.",
                },
              ].map((step) => (
                <div
                  key={step.title}
                  className="relative z-10 flex flex-col items-center text-center group"
                >
                  <div className="w-16 h-16 rounded-full bg-[#f6f8f6] dark:bg-white/10 border-2 border-[#1c5f21] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform bg-white dark:bg-[#102210]">
                    <span className="material-symbols-outlined text-[#1c5f21] text-3xl">
                      {step.icon}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 px-4">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
            {/* Mobile Vertical Timeline */}
            <div className="lg:hidden flex flex-col gap-8">
              {[
                { title: "Thu hoạch", desc: "Tuyển chọn những cây cỏ bàng đạt độ chín và độ bền tốt nhất tại vùng đất ngập nước." },
                { title: "Làm sạch & Cắt", desc: "Rửa sạch bằng nước tự nhiên và cắt theo kích thước tiêu chuẩn (20cm cho café, 15cm cho cocktail)." },
                { title: "Sấy lạnh & Khử trùng", desc: "Ứng dụng công nghệ để đảm bảo độ bền, màu sắc tự nhiên và diệt khuẩn hoàn toàn." },
                { title: "Kiểm soát chất lượng", desc: "Từng chiếc ống được kiểm tra nghiêm ngặt trước khi đóng gói gửi đến tay bạn." },
              ].map((step, i) => (
                <div key={step.title} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-[#1c5f21] flex items-center justify-center text-white font-bold">
                      {i + 1}
                    </div>
                    {i < 3 && (
                      <div className="w-0.5 flex-1 min-h-[40px] bg-slate-200 dark:bg-slate-700 my-2" />
                    )}
                  </div>
                  <div className="pb-8">
                    <h3 className="font-bold text-lg dark:text-white">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Kinh tế tuần hoàn */}
        <section className="py-16 lg:py-24 bg-[#e8efe8] dark:bg-[#102210]/50 relative overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#1c5f21]/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#1c5f21]/10 rounded-full blur-3xl" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1 flex flex-col gap-6">
                <h2 className="text-3xl lg:text-4xl font-bold dark:text-white">
                  Kinh tế tuần hoàn: Không gì bị lãng phí
                </h2>
                <p className="text-lg text-slate-500 dark:text-slate-300">
                  Chúng tôi học tập sự thông thái của thiên nhiên, nơi không có khái niệm &quot;rác thải&quot;:
                </p>
                <div className="flex flex-col gap-4 mt-4">
                  {[
                    {
                      icon: "grass",
                      title: "Thân cỏ",
                      desc: "Trở thành ống hút bền bỉ, chịu được cả nước nóng và lạnh trong 6-12 tiếng.",
                    },
                    {
                      icon: "shopping_bag",
                      title: "Sợi cỏ & Lá",
                      desc: "Được tận dụng để đan thành túi, thảm và các sản phẩm thủ công nghệ thuật khác.",
                    },
                    {
                      icon: "compost",
                      title: "Sau sử dụng",
                      desc: "Sản phẩm ReenCo có thể dùng để ủ phân hữu cơ, tiếp tục nuôi dưỡng đất cho những mùa màng sau.",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="flex gap-4 items-start p-4 bg-white dark:bg-[#102210] rounded-xl shadow-sm border border-transparent hover:border-[#1c5f21]/30 transition-colors"
                    >
                      <div className="p-3 bg-[#1c5f21]/10 rounded-lg text-[#1c5f21] shrink-0">
                        <span className="material-symbols-outlined">
                          {item.icon}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg dark:text-white">
                          {item.title}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="order-1 lg:order-2 flex justify-center items-center">
                <div className="relative w-full max-w-md aspect-square bg-white dark:bg-white/5 rounded-full shadow-2xl p-8 flex items-center justify-center border border-white/50 dark:border-white/10">
                  <div className="relative z-10 w-48 h-48 rounded-full overflow-hidden border-4 border-[#1c5f21]/20 shrink-0">
                    <Image
                      src={CIRCULAR_IMAGE}
                      alt="Cỏ bàng và sản phẩm thủ công"
                      fill
                      className="object-cover"
                      sizes="192px"
                    />
                  </div>
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg shadow-lg border border-[#1c5f21]/20">
                    <span className="text-sm font-bold text-[#1c5f21]">
                      Thủ công
                    </span>
                  </div>
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg border border-[#1c5f21]/20">
                    <span className="text-sm font-bold text-[#1c5f21]">
                      Ống hút
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-20 bg-[#102210] dark:bg-[#0a160a] text-white relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-20 bg-cover bg-center"
            style={{ backgroundImage: `url(${CTA_PATTERN})` }}
            aria-hidden
          />
          <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Bạn đã sẵn sàng cùng ReenCo thay đổi?
            </h2>
            <p className="text-lg text-slate-300 mb-4 max-w-2xl mx-auto">
              Đừng để rác thải nhựa là gánh nặng cho tương lai. Hãy bắt đầu từ hành động nhỏ nhất ngay hôm nay.
            </p>
            <ul className="text-left max-w-md mx-auto mb-10 space-y-2 text-slate-300">
              <li><strong className="text-white">Dành cho cá nhân:</strong> Trải nghiệm bộ dùng thử (Trial Kit) để cảm nhận sự khác biệt của cỏ bàng.</li>
              <li><strong className="text-white">Dành cho doanh nghiệp:</strong> Trở thành đối tác của ReenCo để nhận chính sách giá sỉ ưu đãi và chứng nhận &quot;Doanh nghiệp Xanh&quot;.</li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/cua-hang"
                className="inline-flex items-center justify-center bg-[#1c5f21] hover:bg-[#164d1b] text-white px-8 py-4 rounded-lg text-base font-bold transition-all hover:-translate-y-1 shadow-lg shadow-[#1c5f21]/25"
              >
                Mua ngay tại ReenCo
              </Link>
              <Link
                href="/lien-he"
                className="inline-flex items-center justify-center bg-transparent border border-white/30 hover:bg-white/10 text-white px-8 py-4 rounded-lg text-base font-bold transition-all"
              >
                Hợp tác B2B
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
