"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const ADMIN_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBKqGKDdKY37WfKqF0MwrVcBwu9Ohg4oag6X6JQeeSEFFTPwSBOVfbRjiREu8P-ZkJI9mJximUMeXKeO0_UnDoCtbNb87kJmh-vp0wc2GfmzihWydCp92Nmfv1EOpAZDTp53vFk-4dhC0yIVK01ev81lzHk_bMaKc740ZXvxd5_R1kWjdFqdasuKbpEk9gFeaznlymjtzhCV7OJJLiMxojPDV_PhhO_LBVfujp58oeyIUIyphvqjLKYp955dNymLeK7Qpo8B89vLXs";

type Category = { id: number; name: string; slug: string | null };
type VariantRow = { id: string; name: string; sku: string; price: number; stock: number };

function newVariant(): VariantRow {
  return {
    id: crypto.randomUUID(),
    name: "",
    sku: "",
    price: 0,
    stock: 0,
  };
}

export default function AdminProductNewPage() {
  const router = useRouter();
  const [productName, setProductName] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [baseImageFile, setBaseImageFile] = useState<File | null>(null);
  const [baseImageUrl, setBaseImageUrl] = useState<string | null>(null);
  const [baseImageLink, setBaseImageLink] = useState("");
  const [variants, setVariants] = useState<VariantRow[]>([newVariant()]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("categories")
      .select("id, name, slug")
      .then(({ data, error: err }) => {
        setCategoriesLoading(false);
        if (err) {
          setError("Không tải được danh mục: " + err.message);
          return;
        }
        setCategories((data as Category[]) ?? []);
      });
  }, []);

  const addVariant = useCallback(() => {
    setVariants((prev) => [...prev, newVariant()]);
  }, []);

  const updateVariant = useCallback(
    (id: string, field: keyof VariantRow, value: string | number) => {
      setVariants((prev) =>
        prev.map((v) => (v.id === id ? { ...v, [field]: value } : v))
      );
    },
    []
  );

  const removeVariant = useCallback((id: string) => {
    setVariants((prev) => {
      const next = prev.filter((v) => v.id !== id);
      return next.length ? next : [newVariant()];
    });
  }, []);

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setBaseImageFile(file ?? null);
    setBaseImageUrl(null);
    setBaseImageLink("");
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      setSuccess(null);

      const name = productName.trim();
      if (!name) {
        setError("Vui lòng nhập tên sản phẩm.");
        return;
      }
      if (categoryId == null) {
        setError("Vui lòng chọn danh mục.");
        return;
      }
      const desc = description.trim();
      if (!desc) {
        setError("Vui lòng nhập mô tả sản phẩm.");
        return;
      }
      const validVariants = variants.filter(
        (v) => v.name.trim() !== "" && v.sku.trim() !== "" && v.price >= 0 && v.stock >= 0
      );
      if (validVariants.length === 0) {
        setError("Vui lòng thêm ít nhất một biến thể hợp lệ (tên, SKU, giá, tồn kho).");
        return;
      }

      setLoading(true);
      const supabase = createClient();

      try {
        let imageUrl: string | null = baseImageUrl ?? null;
        if (baseImageFile) {
          const ext = baseImageFile.name.split(".").pop() || "jpg";
          const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
          const { error: uploadErr } = await supabase.storage
            .from("product-images")
            .upload(path, baseImageFile, { upsert: false });
          if (uploadErr) {
            setError("Upload ảnh thất bại: " + uploadErr.message);
            setLoading(false);
            return;
          }
          const {
            data: { publicUrl },
          } = supabase.storage.from("product-images").getPublicUrl(path);
          imageUrl = publicUrl;
        } else if (baseImageLink.trim()) {
          imageUrl = baseImageLink.trim();
        }

        const { data: productData, error: productErr } = await supabase
          .from("products")
          .insert({
            name,
            category_id: categoryId,
            description: desc,
            base_image_url: imageUrl,
            is_active: isActive,
          })
          .select("id")
          .single();

        if (productErr) {
          setError("Tạo sản phẩm thất bại: " + productErr.message);
          setLoading(false);
          return;
        }

        const productId = (productData as { id: number }).id;
        for (const v of validVariants) {
          const { error: variantErr } = await supabase.from("product_variants").insert({
            product_id: productId,
            variant_name: v.name.trim(),
            sku: v.sku.trim(),
            price: Number(v.price),
            stock_quantity: Number(v.stock),
          });
          if (variantErr) {
            setError("Tạo biến thể thất bại: " + variantErr.message);
            setLoading(false);
            return;
          }
        }

        setSuccess("Sản phẩm đã được tạo.");
        setTimeout(() => router.push("/admin/products"), 1500);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra.");
      } finally {
        setLoading(false);
      }
    },
    [
      productName,
      categoryId,
      description,
      isActive,
      baseImageFile,
      baseImageUrl,
      variants,
      router,
    ]
  );

  const previewUrl = useMemo(() => {
    if (!baseImageFile) return null;
    return URL.createObjectURL(baseImageFile);
  }, [baseImageFile]);

  const previewFromLink = baseImageLink.trim() || null;

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#f6f8f6] dark:bg-[#131f14] relative">
      <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1a1a1a] px-6 md:px-8 py-4 z-10 sticky top-0">
        <div className="flex items-center gap-4">
          <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight">
            Add New Product
          </h2>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="material-symbols-outlined text-slate-400 group-focus-within:text-[#1c5f21] transition-colors">
                search
              </span>
            </div>
            <input
              type="text"
              placeholder="Search orders, products..."
              className="block w-64 p-2.5 pl-10 text-sm text-slate-900 bg-slate-50 rounded-lg border-none focus:ring-2 focus:ring-[#1c5f21]/20 placeholder-slate-400 dark:bg-slate-800 dark:text-white transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex items-center justify-center size-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors relative"
              aria-label="Thông báo"
            >
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-[#1a1a1a]" />
            </button>
            <button
              type="button"
              className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
            >
              <div className="relative size-8 rounded-full overflow-hidden shrink-0">
                <Image
                  src={ADMIN_AVATAR}
                  alt="Admin profile"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="material-symbols-outlined text-slate-400">
                expand_more
              </span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
        <div className="max-w-[1280px] mx-auto flex flex-col">
          <nav aria-label="Breadcrumb" className="flex mb-6">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link
                  href="/admin"
                  className="inline-flex items-center text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-[#1c5f21] dark:hover:text-[#1c5f21] transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px] mr-2">
                    dashboard
                  </span>
                  Dashboard
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-[20px]">
                    chevron_right
                  </span>
                  <Link
                    href="/admin/products"
                    className="ml-1 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-[#1c5f21] md:ml-2"
                  >
                    Products
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-[20px]">
                    chevron_right
                  </span>
                  <span className="ml-1 text-sm font-medium text-slate-900 dark:text-white md:ml-2">
                    Add New
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          {(error || success) && (
            <div
              className={`mb-6 px-4 py-3 rounded-lg ${
                error
                  ? "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200"
                  : "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200"
              }`}
            >
              {error || success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                  Add New Product
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-base">
                  Create a new eco-friendly product listing.
                </p>
              </div>
              <div className="flex gap-3">
                <Link
                  href="/admin/products"
                  className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1a1a1a] text-slate-900 dark:text-white font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 px-6 py-2 rounded-lg bg-[#1c5f21] hover:bg-[#164d1b] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm transition-colors shadow-lg shadow-[#1c5f21]/20"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    save
                  </span>
                  {loading ? "Đang lưu..." : "Save Product"}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                  <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#1c5f21]">
                      edit_note
                    </span>
                    General Information
                  </h2>
                  <div className="space-y-6">
                    <div className="flex flex-col gap-2">
                      <label
                        className="text-sm font-semibold text-slate-900 dark:text-slate-100"
                        htmlFor="product-name"
                      >
                        Product Name
                      </label>
                      <input
                        id="product-name"
                        type="text"
                        placeholder="e.g. Grass Straws Standard Box"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="w-full h-12 px-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-[#1c5f21] focus:ring-1 focus:ring-[#1c5f21] outline-none transition-all placeholder-slate-400 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label
                        className="text-sm font-semibold text-slate-900 dark:text-slate-100"
                        htmlFor="category"
                      >
                        Category
                      </label>
                      <div className="relative">
                        <select
                          id="category"
                          value={categoryId ?? ""}
                          onChange={(e) =>
                            setCategoryId(e.target.value ? Number(e.target.value) : null)
                          }
                          disabled={categoriesLoading}
                          className="w-full h-12 px-4 appearance-none rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-[#1c5f21] focus:ring-1 focus:ring-[#1c5f21] outline-none transition-all text-slate-900 dark:text-white cursor-pointer disabled:opacity-60"
                        >
                          <option value="" disabled>
                            {categoriesLoading ? "Đang tải..." : "Select category..."}
                          </option>
                          {categories.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                          expand_more
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label
                        className="text-sm font-semibold text-slate-900 dark:text-slate-100"
                        htmlFor="description"
                      >
                        Description
                      </label>
                      <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-900 focus-within:border-[#1c5f21] focus-within:ring-1 focus-within:ring-[#1c5f21] transition-all">
                        <div className="flex items-center gap-1 p-2 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                          <button
                            type="button"
                            className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400"
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              format_bold
                            </span>
                          </button>
                          <button
                            type="button"
                            className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400"
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              format_italic
                            </span>
                          </button>
                          <button
                            type="button"
                            className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400"
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              format_underlined
                            </span>
                          </button>
                          <div className="w-px h-6 bg-slate-300 dark:bg-slate-600 mx-1" />
                          <button
                            type="button"
                            className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400"
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              format_list_bulleted
                            </span>
                          </button>
                          <button
                            type="button"
                            className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400"
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              link
                            </span>
                          </button>
                        </div>
                        <textarea
                          id="description"
                          placeholder="Enter full product description including materials, dimensions, and usage instructions..."
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="w-full min-h-[240px] p-4 bg-transparent border-none outline-none resize-y text-slate-900 dark:text-white placeholder-slate-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1 space-y-6">
                <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                  <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#1c5f21]">
                      image
                    </span>
                    Media
                  </h2>
                  <div className="w-full space-y-4">
                    <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-[#1c5f21]/40 rounded-lg cursor-pointer bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors group">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <span className="material-symbols-outlined text-4xl text-slate-400 group-hover:text-[#1c5f21] mb-2 transition-colors">
                          cloud_upload
                        </span>
                        <p className="mb-2 text-sm text-slate-900 dark:text-slate-100 font-medium">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          SVG, PNG, JPG or WEBP
                        </p>
                      </div>
                      <input
                        className="hidden"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                      <span className="shrink-0">Hoặc nhập link ảnh:</span>
                    </div>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={baseImageLink}
                      onChange={(e) => {
                        setBaseImageLink(e.target.value);
                        setBaseImageFile(null);
                        setBaseImageUrl(null);
                      }}
                      className="w-full h-10 px-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-[#1c5f21] focus:ring-1 focus:ring-[#1c5f21] outline-none text-slate-900 dark:text-white placeholder-slate-400 text-sm"
                    />
                  </div>
                  <div className="mt-4">
                    {previewUrl ? (
                      <div className="relative aspect-square max-w-[200px] rounded-md overflow-hidden border border-slate-200 dark:border-slate-700">
                        <Image
                          src={previewUrl}
                          alt="Preview"
                          fill
                          className="object-cover"
                          unoptimized
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setBaseImageFile(null);
                            setBaseImageUrl(null);
                          }}
                          className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5 hover:bg-black/70"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            close
                          </span>
                        </button>
                      </div>
                    ) : previewFromLink ? (
                      <div className="relative aspect-square max-w-[200px] rounded-md overflow-hidden border border-slate-200 dark:border-slate-700">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={previewFromLink}
                          alt="Preview from link"
                          className="object-cover w-full h-full"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => setBaseImageLink("")}
                          className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5 hover:bg-black/70"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            close
                          </span>
                        </button>
                      </div>
                    ) : (
                      <div className="aspect-square max-w-[120px] rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-center text-slate-400">
                        <span className="material-symbols-outlined">image</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                  <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#1c5f21]">
                      public
                    </span>
                    Availability
                  </h2>
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        Product Status
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        Visible in store
                      </span>
                    </div>
                    <label className="relative inline-flex w-12 h-6 rounded-full bg-slate-300 dark:bg-slate-600 cursor-pointer transition-colors has-[:checked]:bg-[#1c5f21]">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={isActive}
                        onChange={(e) => setIsActive(e.target.checked)}
                      />
                      <span className="absolute left-1 top-1 size-4 rounded-full bg-white shadow transition-transform peer-checked:translate-x-6" />
                    </label>
                  </div>
                  <div className="mt-4 flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      Publish Date
                    </label>
                    <input
                      type="date"
                      className="w-full h-10 px-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-[#1c5f21] focus:ring-1 focus:ring-[#1c5f21] outline-none text-slate-900 dark:text-white text-sm"
                      readOnly
                      value={new Date().toISOString().slice(0, 10)}
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3">
                <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#1c5f21]">
                        inventory_2
                      </span>
                      Product Variants
                    </h2>
                    <button
                      type="button"
                      onClick={addVariant}
                      className="flex items-center gap-2 px-4 py-2 bg-[#1b4d2e] hover:bg-[#25663d] text-white rounded-lg text-sm font-bold transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        add
                      </span>
                      Add another variant
                    </button>
                  </div>
                  <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white">
                        <tr>
                          <th className="p-4 text-xs uppercase tracking-wider font-bold border-b border-slate-200 dark:border-slate-700 min-w-[200px]">
                            Variant Name
                          </th>
                          <th className="p-4 text-xs uppercase tracking-wider font-bold border-b border-slate-200 dark:border-slate-700 min-w-[140px]">
                            SKU
                          </th>
                          <th className="p-4 text-xs uppercase tracking-wider font-bold border-b border-slate-200 dark:border-slate-700 min-w-[120px]">
                            Price ($)
                          </th>
                          <th className="p-4 text-xs uppercase tracking-wider font-bold border-b border-slate-200 dark:border-slate-700 min-w-[100px]">
                            Stock
                          </th>
                          <th className="p-4 text-xs uppercase tracking-wider font-bold border-b border-slate-200 dark:border-slate-700 w-[80px] text-center">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        {variants.map((v) => (
                          <tr
                            key={v.id}
                            className="bg-white dark:bg-[#1a1a1a] hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                          >
                            <td className="p-3">
                              <input
                                type="text"
                                value={v.name}
                                onChange={(e) =>
                                  updateVariant(v.id, "name", e.target.value)
                                }
                                placeholder="e.g. Box of 50"
                                className="w-full h-10 px-3 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:border-[#1c5f21] focus:ring-0 text-sm text-slate-900 dark:text-white"
                              />
                            </td>
                            <td className="p-3">
                              <input
                                type="text"
                                value={v.sku}
                                onChange={(e) =>
                                  updateVariant(v.id, "sku", e.target.value)
                                }
                                placeholder="e.g. GJS-001"
                                className="w-full h-10 px-3 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:border-[#1c5f21] focus:ring-0 text-sm text-slate-500 dark:text-slate-400 font-mono"
                              />
                            </td>
                            <td className="p-3">
                              <input
                                type="number"
                                min={0}
                                step={0.01}
                                value={v.price === 0 ? "" : v.price}
                                onChange={(e) =>
                                  updateVariant(
                                    v.id,
                                    "price",
                                    e.target.value === ""
                                      ? 0
                                      : Number(e.target.value)
                                  )
                                }
                                placeholder="0"
                                className="w-full h-10 px-3 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:border-[#1c5f21] focus:ring-0 text-sm text-slate-900 dark:text-white font-medium"
                              />
                            </td>
                            <td className="p-3">
                              <input
                                type="number"
                                min={0}
                                value={v.stock === 0 ? "" : v.stock}
                                onChange={(e) =>
                                  updateVariant(
                                    v.id,
                                    "stock",
                                    e.target.value === ""
                                      ? 0
                                      : Number(e.target.value)
                                  )
                                }
                                placeholder="0"
                                className="w-full h-10 px-3 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:border-[#1c5f21] focus:ring-0 text-sm text-slate-900 dark:text-white"
                              />
                            </td>
                            <td className="p-3 text-center">
                              <button
                                type="button"
                                onClick={() => removeVariant(v.id)}
                                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                              >
                                <span className="material-symbols-outlined text-[20px]">
                                  delete
                                </span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
