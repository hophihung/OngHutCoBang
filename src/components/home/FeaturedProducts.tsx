import Link from "next/link";
import Image from "next/image";

const FEATURED = [
  {
    title: "Grass Drinking Straws",
    description:
      "100% natural, biodegradable, and durable. The perfect alternative to plastic.",
    price: "$12.99",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAl_8F7uvQWS-lZHbtcaX0uOkpQnQVU0sAm39DDCO41chGdQQAxY7UosCpRmxun_xz0bUrlmpjqwm5CXsHepnEX9Y-kZRzLx-7GDcoAeXiS56JZUdZHD9_OPthKOQ6QWG4FiNPBdIy2bS3zZlgtI3IErXNi_w4U6LIFeJGBv9Qqt7U9rUqbMXPITmt-7vkOsO_Z0H7y36C-8LFiB-R3FBrFvBAWAwbEYI4btG3hJQYa-dmoyLbF_Yj7e24isNlS02PhKgDqvCc3Ivs",
    imageAlt: "Stack of sustainable grass straws",
    bestseller: true,
  },
  {
    title: "Eco Takeaway Box",
    description:
      "Sturdy, compostable containers for hot and cold food.",
    price: "$24.00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAh628ZMToiRdW1q3OJMyonEj6ls59mxHyoyjDjTRrZwsG854FlD8P4u_u-TcMuD_jTEIEjs1ZbORnu1yel4TQGgXFJnd2WROazSLCbXwkHJ8pkrxal6HroWtlnRBaW9BP6IbIoGVJEjqK8CD32wytmdcN0OLdwYHgHWORhVVm86bbGRzaFmwFK-tSc1UmgdeQxIPD16k63pqeOxqxZeavdlu-IvuAcs9PpOhoN7M9UCe2APUvHpDVdqiOaYeCapk-K-kU8xFcgijc",
    imageAlt: "Bamboo takeaway containers",
    bestseller: false,
  },
  {
    title: "Grass Fiber Tote",
    description: "Durable woven bag for your daily grocery needs.",
    price: "$18.50",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDk3XvgKmrfZgcC5kcB6-tfpNG77u1Ltnpic9ynJp8XIHeR_zo-whatNoMsil6S5aWwGtQ0HR1BokySIS_b8VrfDpceAm_DNmrrZvTCuOiD23bN6el6JJlAHSgXZ73sTp5XeveqGjvVWh3gk6esXURzMqzDKxtCTsqnmAGsM6iEJHJHFIE8qhfYlOexQv0MveDY7XreNJJdV_pO2XAUny06vdnowWl_HXV6OtJExR6Cea09bnN8-3CWQokF6q9ikqToH8kKdQoxtdE",
    imageAlt: "Reusable shopping tote bag",
    bestseller: false,
  },
];

export default function FeaturedProducts() {
  return (
    <div className="bg-brand-beige py-24 px-6 md:px-20 lg:px-40">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-10">
        <div className="flex items-center justify-between">
          <h2 className="text-[#141514] text-3xl font-bold tracking-tight">
            Top Sustainable Products
          </h2>
          <Link
            href="/ong-hut-co"
            className="hidden sm:flex items-center gap-1 text-brand-forest font-bold hover:underline"
          >
            View all products{" "}
            <span className="material-symbols-outlined text-lg">
              arrow_forward
            </span>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED.map((item) => (
            <div
              key={item.title}
              className="flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="h-64 overflow-hidden bg-gray-100 relative">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {item.bestseller && (
                  <div className="absolute top-4 left-4 bg-brand-forest text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Bestseller
                  </div>
                )}
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-[#141514]">
                  {item.title}
                </h3>
                <p className="text-[#727a71] text-sm mt-2 mb-4">
                  {item.description}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-lg font-bold text-[#141514]">
                    {item.price}
                  </span>
                  <Link
                    href="/ong-hut-co"
                    className="w-10 h-10 rounded-full bg-[#f2f3f2] hover:bg-primary hover:text-white flex items-center justify-center transition-colors"
                    aria-label={`Add ${item.title} to cart`}
                  >
                    <span className="material-symbols-outlined text-xl">
                      add_shopping_cart
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center sm:hidden mt-4">
          <Link
            href="/ong-hut-co"
            className="flex items-center gap-1 text-brand-forest font-bold hover:underline"
          >
            View all products{" "}
            <span className="material-symbols-outlined text-lg">
              arrow_forward
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
