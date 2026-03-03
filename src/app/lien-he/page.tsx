import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/home/Footer";
import ContactForm from "./ContactForm";

const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14867.592738031139!2d109.22172968508823!3d13.794614470523584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x316f6bf778c80973%3A0x8a7d0b5aa0af29c7!2zxJDhuqFpIGjhu41jIEZQVCBRdXkgTmjGoW4!5e0!3m2!1svi!2s!4v1772522893261!5m2!1svi!2s";

export default function LienHePage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-white dark:bg-[#102210] text-[#111811] dark:text-white antialiased">
      <AnnouncementBar />
      <Header />

      <main className="flex-grow flex flex-col justify-center">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20 py-12 lg:py-20">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            {/* Left: Contact Info & Map */}
            <div className="flex-1 flex flex-col gap-10">
              <div className="flex flex-col gap-4">
                <span className="text-[#2f7f34] font-bold tracking-wider text-sm uppercase">
                  Liên hệ
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1b4d2e] dark:text-white leading-tight">
                  Kết nối với ReenCo
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed max-w-md">
                  Chúng tôi rất mong nhận được phản hồi từ bạn. Dù bạn có câu hỏi
                  về ống hút cỏ bàng, giá cả hay bất kỳ điều gì, đội ngũ ReenCo
                  sẵn sàng hỗ trợ bạn.
                </p>
              </div>

              {/* Contact Details Grid */}
              <div className="grid gap-6">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center size-12 rounded-full bg-[#2f7f34]/10 text-[#1b4d2e] dark:text-[#2f7f34] shrink-0">
                    <span className="material-symbols-outlined text-[24px]">
                      location_on
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-bold text-[#111811] dark:text-white text-lg">
                      Địa chỉ
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Khu đô thị An Phú Thịnh – phường Quy Nhơn Đông – tỉnh Gia Lai
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center size-12 rounded-full bg-[#2f7f34]/10 text-[#1b4d2e] dark:text-[#2f7f34] shrink-0">
                    <span className="material-symbols-outlined text-[24px]">
                      mail
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-bold text-[#111811] dark:text-white text-lg">
                      Email
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      reenco18.official@gmail.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center size-12 rounded-full bg-[#2f7f34]/10 text-[#1b4d2e] dark:text-[#2f7f34] shrink-0">
                    <span className="material-symbols-outlined text-[24px]">
                      call
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-bold text-[#111811] dark:text-white text-lg">
                      Hotline
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      0328 356 577
                    </p>
                  </div>
                </div>
              </div>

              {/* Google Maps */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm mt-auto">
                <iframe
                  src={MAP_EMBED_URL}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Bản đồ - Khu đô thị An Phú Thịnh, Quy Nhơn Đông, Gia Lai"
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>

            {/* Right: Form */}
            <div className="flex-1 lg:max-w-xl">
              <div className="bg-[#f5f3ef] dark:bg-[#1a2e1a] p-8 md:p-10 rounded-2xl shadow-sm border border-[#e6e2da] dark:border-white/5 h-full flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-[#1b4d2e] dark:text-white mb-2">
                  Gửi tin nhắn cho chúng tôi
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  Điền form bên dưới, chúng tôi sẽ phản hồi bạn trong thời gian sớm nhất.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
