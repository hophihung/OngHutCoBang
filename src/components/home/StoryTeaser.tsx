import Image from "next/image";
import Link from "next/link";

const STORY_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAwJ59EU8MmZvUDrMY4sxHcdOAjGwqhr_kKgtcf-Ujkq1S1d7ITXihRP7d5cbripisO947-VacCIQErajYNvBo0fHDldbRsgYyhZjNiimnULBSA721dufv7GJfFYjEClBtDhALlI-v7Xwi7R6C6fizpJm-aE5VKSE_3DgpaEaud3D2TIWUR5rBjTQ3rNWnVFSZ65qEkaSZS8SoocgJFd2at05HxSnYN09vvWhFEdpFl_kterTTVsESdYl1N13aluXmWwBZT5i6DSg0";

export default function StoryTeaser() {
  return (
    <section className="w-full py-16 bg-[#F5F5DC] dark:bg-[#1e2b1f]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-12 bg-white dark:bg-[#2a382b] rounded-3xl p-6 lg:p-10 shadow-sm">
          <div className="w-full lg:w-1/2 h-[300px] lg:h-[400px] rounded-2xl overflow-hidden relative shrink-0">
            <Image
              src={STORY_IMG}
              alt="Hình ảnh nông dân thu hoạch cỏ bàng và quy trình kinh tế tuần hoàn"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <span className="h-px w-8 bg-[#2f7f34]" />
              <span className="text-sm font-bold uppercase tracking-wider text-[#2f7f34]">
                Câu chuyện của chúng tôi
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-[#111811] dark:text-white leading-tight">
              Hướng tới nền kinh tế tuần hoàn từ cây Cỏ Bàng
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              ReenCo không chỉ bán ống hút, chúng tôi xây dựng một vòng
              đời sản phẩm bền vững. Từ những cánh đồng cỏ bàng hoang sơ tại
              miền Tây, qua bàn tay khéo léo của người nông dân, đến khi trở về
              với đất mẹ, mỗi chiếc ống hút là một cam kết về tương lai xanh.
            </p>
            <div>
              <Link
                href="#"
                className="inline-flex items-center gap-2 text-[#2f7f34] font-bold hover:gap-3 transition-all"
              >
                Tìm hiểu thêm về quy trình{" "}
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
