import Image from "next/image";
import Link from "next/link";

export type AccountNavKey = "don-hang" | "chi-tiet" | "so-dia-chi" | "yeu-thich";

type Props = {
  displayName: string;
  avatarUrl?: string | null;
  activeKey: AccountNavKey;
};

const navItems: { key: AccountNavKey; href: string; icon: string; label: string }[] = [
  { key: "don-hang", href: "/tai-khoan/don-hang", icon: "package_2", label: "Đơn hàng của tôi" },
  { key: "chi-tiet", href: "/tai-khoan/chi-tiet", icon: "person", label: "Chi tiết tài khoản" },
  { key: "so-dia-chi", href: "/tai-khoan/so-dia-chi", icon: "location_on", label: "Sổ địa chỉ" },
  { key: "yeu-thich", href: "/tai-khoan/yeu-thich", icon: "favorite", label: "Yêu thích" },
];

export default function AccountSidebar({ displayName, avatarUrl, activeKey }: Props) {
  return (
    <aside className="w-full lg:w-72 shrink-0">
      <div className="flex flex-col gap-6 rounded-xl bg-white dark:bg-[#152e15] p-6 shadow-sm border border-[#f0f4f0] dark:border-[#1f331f] sticky top-24">
        <div className="flex items-center gap-4 pb-4 border-b border-[#f0f4f0] dark:border-[#1f331f]">
          <div className="relative size-12 rounded-full overflow-hidden shrink-0 bg-[#2f7f34] flex items-center justify-center">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt=""
                fill
                className="object-cover"
                sizes="48px"
              />
            ) : (
              <span className="text-lg font-bold text-white">
                {displayName.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <h1 className="text-[#111811] dark:text-white text-base font-bold">
              Xin chào, {displayName}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Chào mừng trở lại
            </p>
          </div>
        </div>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = activeKey === item.key;
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? "bg-green-50 dark:bg-[#2f7f34]/10 border-l-4 border-[#2f7f34]"
                    : "hover:bg-[#f0f4f0] dark:hover:bg-[#1f331f]"
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[24px] ${
                    isActive ? "text-[#2f7f34]" : "text-[#111811] dark:text-gray-400"
                  }`}
                >
                  {item.icon}
                </span>
                <span
                  className={`text-sm ${
                    isActive
                      ? "text-[#1e4d2b] dark:text-white font-bold"
                      : "text-[#111811] dark:text-gray-200 font-medium"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
          <div className="mt-2 pt-4 border-t border-[#f0f4f0] dark:border-[#1f331f]">
            <Link
              href="/tai-khoan/dang-xuat"
              className="group flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <span className="material-symbols-outlined text-red-600 dark:text-red-400 text-[24px]">
                logout
              </span>
              <span className="text-red-600 dark:text-red-400 text-sm font-medium">
                Đăng xuất
              </span>
            </Link>
          </div>
        </nav>
      </div>
    </aside>
  );
}
