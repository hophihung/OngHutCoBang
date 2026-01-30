import Image from "next/image";

type ProductCardProps = {
  title: string;
  price: string;
  imageSrc: string;
  imageAlt: string;
};

export default function ProductCard({
  title,
  price,
  imageSrc,
  imageAlt,
}: ProductCardProps) {
  return (
    <div className="bg-surface dark:bg-surface rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group border border-transparent dark:border-gray-700">
      <div className="relative p-6 bg-gray-50 dark:bg-gray-800/50 flex justify-center items-center h-64">
        <div className="absolute top-2 left-2 flex items-center gap-1">
          <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 text-[10px] px-2 py-0.5 rounded-full font-medium flex items-center">
            <span className="material-icons text-[12px] mr-1">verified</span>{" "}
            Official store
          </span>
        </div>
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={240}
          height={240}
          className="max-h-full w-auto object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 text-center">
        <h3 className="font-medium text-gray-800 dark:text-white text-sm mb-2 line-clamp-2 h-10">
          {title}
        </h3>
        <p className="text-primary font-bold">{price}</p>
      </div>
    </div>
  );
}
