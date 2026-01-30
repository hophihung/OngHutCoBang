import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-footer dark:bg-footer pt-12 pb-6 text-sm">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-b border-gray-300 dark:border-gray-700 pb-8 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                <span className="material-icons">eco</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-primary leading-none">
                  Green Joy
                </span>
              </div>
            </div>
            <div className="space-y-3 text-gray-700 dark:text-gray-400">
              <p>
                <strong className="text-primary font-semibold">
                  Tên Doanh nghiệp:
                </strong>{" "}
                Công ty TNHH Greenjoy
              </p>
              <p>
                <strong className="text-primary font-semibold">MST/ĐKKD:</strong>{" "}
                0315318999
              </p>
              <p>
                <strong className="text-primary font-semibold">
                  Giấy CNĐKKD:
                </strong>{" "}
                0315318999. Ngày cấp 10.10.2018, thay đổi lần 04 ngày 26 tháng
                12 năm 2022.
              </p>
              <p>
                <strong className="text-primary font-semibold">
                  Cơ quan cấp:
                </strong>{" "}
                Phòng Đăng ký kinh doanh - Sở kế hoạch và đầu tư TP HCM.
              </p>
              <p>
                <strong className="text-primary font-semibold">Địa chỉ:</strong>{" "}
                Văn phòng 02, Tầng 8, Tòa nhà Pearl Plaza, 561A Điện Biên Phủ,
                Phường 25, Quận Bình Thạnh, HCM.
              </p>
              <p>
                <strong className="text-primary font-semibold">Nhà máy:</strong>{" "}
                Ấp Tràm Lạc, Đức Hòa, Long An, Việt Nam
              </p>
              <p>
                <strong className="text-primary font-semibold">Email:</strong>{" "}
                <a
                  href="mailto:info@greenjoystraw.com"
                  className="hover:underline"
                >
                  info@greenjoystraw.com
                </a>
              </p>
              <p>
                <strong className="text-primary font-semibold">
                  Điện thoại:
                </strong>{" "}
                +84(0)778107721
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-base">
                Theo dõi chúng tôi
              </h4>
              <div className="flex space-x-3 mb-8">
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white hover:opacity-80"
                >
                  <span className="text-xs">FB</span>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white hover:opacity-80"
                >
                  <span className="text-xs">IG</span>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white hover:opacity-80"
                >
                  <span className="text-xs">IN</span>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white hover:opacity-80"
                >
                  <span className="text-xs">YT</span>
                </a>
              </div>
              <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-base">
                Chính sách
              </h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>
                  <Link href="#" className="hover:text-primary">
                    Chính sách hoàn trả
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Chính sách giao hàng và thanh toán
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Chính sách bảo vệ thông tin cá nhân
                  </Link>
                </li>
              </ul>
              <div className="mt-6">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDriOUu7bjPwCeSG3Ha7kQDkGAwm11sKIcjHOcSXZuEI68ESgIVtG12Nnl9KeFwp-Hg9NOopHYhZm5_nz7Lqw7n6RQtK-QCrGybCEbgmi2hqh8oQ8491B3dFpzqhPDmIbS85uCS5vutpFJ1V61914KDxfrigzDiz21a5woUoIz02HZLF-VFxhHl7B-oMI4VUD3UrUSc12x4HgzHeIfPVU-fQya5Y_2HRgk2Mi1kJ8sVYajsyDZkogS_Fkq2owZLMs4G519XwNYFuec"
                  alt="Đã thông báo bộ công thương"
                  width={120}
                  height={40}
                  className="h-10 w-auto opacity-80"
                />
              </div>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-base">
                Hỗ trợ
              </h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>
                  <Link href="#" className="hover:text-primary">
                    Hướng dẫn mua hàng
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-500 dark:text-gray-500 text-xs">
          <p>Copyright © 2023 Green Joy. All Rights Reserved.</p>
          <p>Built with Eraweb.</p>
        </div>
      </div>
    </footer>
  );
}
