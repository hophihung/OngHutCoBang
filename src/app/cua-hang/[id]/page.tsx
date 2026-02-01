import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/home/Footer";
import { getProductWithVariantsById } from "@/lib/products";
import ProductDetailContent from "./ProductDetailContent";

type Props = { params: Promise<{ id: string }> };

export default async function ProductDetailPage({ params }: Props) {
  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isInteger(id) || id < 1) notFound();

  const data = await getProductWithVariantsById(id);
  if (!data) notFound();

  const { product, variants } = data;
  const images = [
    product.base_image_url,
    ...variants.map((v) => v.image_url).filter(Boolean),
  ].filter(Boolean) as string[];
  const descriptionImages = product.base_image_url ? [product.base_image_url] : [];

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f8f6] dark:bg-[#102212] text-slate-900 dark:text-white transition-colors duration-300">
      <AnnouncementBar />
      <Header />

      <main className="layout-container mx-auto flex max-w-7xl grow flex-col px-4 py-6 sm:px-8">
        <div className="flex flex-wrap items-center gap-2 py-4 text-sm">
          <Link href="/" className="text-slate-500 hover:text-[#1c5f21] transition-colors">
            Home
          </Link>
          <span className="text-slate-300">/</span>
          <Link href="/cua-hang" className="text-slate-500 hover:text-[#1c5f21] transition-colors">
            Shop
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 dark:text-white font-medium">{product.name}</span>
        </div>

        <ProductDetailContent
          product={{
            id: product.id,
            name: product.name,
            description: product.description,
            base_image_url: product.base_image_url,
            images,
            variants,
          }}
        />

        <div className="mt-16 lg:mt-20">
          <div className="border-b border-slate-200 dark:border-slate-800">
            <nav aria-label="Tabs" className="-mb-px flex gap-8">
              <button
                type="button"
                aria-current="page"
                className="border-b-2 border-[#1c5f21] px-1 py-4 text-sm font-bold text-[#1c5f21]"
              >
                Description
              </button>
              <button
                type="button"
                className="border-b-2 border-transparent px-1 py-4 text-sm font-medium text-slate-500 hover:border-slate-300 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
              >
                Preservation Instruction
              </button>
              <button
                type="button"
                className="border-b-2 border-transparent px-1 py-4 text-sm font-medium text-slate-500 hover:border-slate-300 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
              >
                Customer Reviews (0)
              </button>
            </nav>
          </div>
          <div className="py-8 lg:w-2/3">
            <div className="prose prose-green dark:prose-invert max-w-none">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                Why Choose Green Joy Grass Straws?
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                {product.description ||
                  "Our straws are harvested from natural Lepironia fields in the Mekong Delta region of Vietnam. The process from harvesting to the final product is strictly monitored to ensure no chemicals or preservatives are used."}
              </p>
              <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                Unlike paper straws that get soggy, grass straws maintain their shape in both hot
                and cold drinks for hours. They are the perfect sustainable solution for your home,
                protecting the environment one sip at a time.
              </p>
              {descriptionImages.length > 0 && (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mt-8">
                  {descriptionImages.map((src, i) => (
                    <div
                      key={i}
                      className="relative h-32 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800"
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 50vw, 25vw"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
