export default function QuoteSection() {
  return (
    <div className="bg-brand-beige py-20 px-6 flex justify-center">
      <div className="max-w-4xl text-center">
        <span className="material-symbols-outlined text-brand-forest text-5xl mb-6 block">
          format_quote
        </span>
        <p className="font-serif text-3xl md:text-4xl text-[#141514] italic leading-snug">
          &quot;We don&apos;t inherit the earth from our ancestors, we borrow it
          from our children.&quot;
        </p>
        <p className="mt-6 text-sm font-bold text-brand-forest tracking-widest uppercase">
          — Native American Proverb
        </p>
      </div>
    </div>
  );
}
