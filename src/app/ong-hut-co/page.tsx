import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductSidebar from "@/components/ProductSidebar";
import ProductCard from "@/components/ProductCard";
import BestSellers from "@/components/BestSellers";
import Footer from "@/components/Footer";

const PRODUCTS = [
  {
    title: "Ống hút cỏ bàng khô Green Joy - hộp tròn 100 ống",
    price: "77,000đ",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDUdHmO4nI5q3nu8Qcotf3TnpuCpXQSITqpbNBfnxCv5UqZrD6KiSMUkWMxEu9KZUDAov6qcZLNpU4ftOO71W70MXACGGp991argPCWducff79IB43kWsjoplCPsBAgaawWjkyQnUcalMKdI6PoWItkY7dNGHCP4sPG-MgOQAOhTtT0fkOHg8G5OSle3z2xRad4BYe5oEIJ8PmN5OBptiV2cP5DpflGvzSqpyRm6WCsVqR6ogn78SEz19M7d6mBxyhq3sa74nv2GJY",
    imageAlt: "Ống hút cỏ bàng khô",
  },
  {
    title: "Ống hút cỏ bàng khô Green Joy - combo 2 hộp 10",
    price: "20,000đ",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAjuEkjYOMDBKrlITdzkBPmKeL-1tX2LUZsS0SFm6rCsHN0cnw2wqZI34slpVyCo8EqwZ2yaERe2AtBBISZNk2QHwxE-XbaIpWqnwUAIo8XXuWh3XSCIDMokM2oXRu_0jI5NWhEoFFO3TATEMx2nxXYsXUdoq9_NawhHNJVcYkD8nRqhcQtRLL54xbWR0F9_ek2S8lu_e5imITs6qcbtXhOWd1cEzd6DcrOKsR4NtToc-qpavOTbDR_0M0_afwiZTXrKzBM95DeDOU",
    imageAlt: "Ống hút cỏ bàng khô combo",
  },
  {
    title: "Ống hút cỏ bàng khô Green Joy - hộp 25 ống",
    price: "23,000đ",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB67WblP28NICJZfux9gCOOTOtJiVnBzRHP1dHaCKL2ODdD32d8jVEqnrVRyl5LRiKaB5aD2ed8lj1_NPdIcu2Xmmad3GweBcP2nhsg0G2aUMhH-fOq3yyhgDHAniOZSz0fsY7ZCrUfW_dFiU5HjWaWBVhEA0ORS9L-h3bQPoSICmCwXsI9lf4REaY0rRf5RObRJg7KJjSG3PTyKA7HP94mqDLktIDpW2GK57R0l-cq1rASqHeAKGevcjiGIE1i_5aIqClM7bKP6EA",
    imageAlt: "Ống hút cỏ bàng khô hộp 25 ống",
  },
  {
    title: "Ống hút cỏ bàng khô Green Joy - hộp thuốc lá 50 ống",
    price: "38,000đ",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBy4uBBp2-P_Pk8FoxUREpvOcQd_UYV07ZuSv-ljh6DhAMEinCC-1th0SDEBJY6nV8VcoN7X6mcozwr9Vh6xiGPUc8exzhH_0W0C1XFDg7gVKenqjEau7h-2LaavJMmlCk9GpCXwLEyjf4bqKEZOcjA3Ze9Tl5HEh8ZbMoriYgY75Xplp4b9hEA8urMkvkUPRynfLyja-JhMY0ABylFEL4qsZp6230U4EuchCpKJVxHRqF2gvfsARsxVWnmRAd8XM-WLu8ejHz6Ndo",
    imageAlt: "Ống hút cỏ bàng khô hộp thuốc lá",
  },
  {
    title: "Ống hút cỏ bàng khô Green Joy - hộp 50 ống",
    price: "38,000đ",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAvFV4gOR_88gDsv31zAQcZYajK-wmoAUycJxxLO0DrIiNy4cA6qedVSsek78zW_iyhOzVh_UV8MlaAZ-z38S5p2_Go3ry5XOjRPqCXaaiQzgZHkq5gq1Jx7XlGPuXXKgIT5XO1ckSaL25l-kE8vwwVaNuhek5F84UqnMmBUKOoSoSmhZWw9Q2CQBSi5yOeRwgEKRJg6C9Zc7Fx5g0Ud584FiwfZGDkqFnrSD9PurxcSP99eRdCWdMGqdlvAcccxAanq0BatKXx4Cw",
    imageAlt: "Ống hút cỏ bàng khô hộp 50 ống",
  },
  {
    title: "Ống hút cỏ bàng khô Green Joy - hộp 100 ống",
    price: "67,000đ",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCcY8JUkRc-m3RZKrMqh4vyIca-H8owV773l4IqoZqQPHp9BWTJ-zJIuKKcFMWmR_J5sXmqBOaFCDFUn-fS-2p24GP_i_rT5giwJWIeDzzZjmIUBFzwvQThS6EeZNI56ZJdWULC3cHOonjLXLm8V9k8MC5tBJTQn86DwkLap__PUiA3Txj6ZbEKLlMQNLGA0SOBQJXW9QAiWOFaFfICaWwOqyhjZyNJTPktDTlAZV2SGEgo6mdL_NFaaCqcYKw80Oj0mO3TLwjI45E",
    imageAlt: "Ống hút cỏ bàng khô hộp 100 ống",
  },
];

export default function OngHutCoPage() {
  return (
    <div className="min-h-screen bg-background dark:bg-background text-gray-800 dark:text-gray-200 transition-colors duration-200">
      <Header />
      <Hero />
      <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
        <ProductSidebar />
        <main className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.map((product) => (
              <ProductCard
                key={product.title}
                title={product.title}
                price={product.price}
                imageSrc={product.image}
                imageAlt={product.imageAlt}
              />
            ))}
          </div>
        </main>
      </div>
      <BestSellers />
      <Footer />
    </div>
  );
}
