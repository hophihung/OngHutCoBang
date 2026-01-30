"use client";

import { useState } from "react";

const PACKAGING_OPTIONS = ["20 ống", "1000 chiếc", "500 chiếc", "500 ống"];
const SIZE_OPTIONS = ["16cm", "14cm", "13cm", "20cm"];

export default function ProductSidebar() {
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(10000000);

  return (
    <aside className="w-full md:w-64 flex-shrink-0">
      <div className="sticky top-24 space-y-8">
        <div>
          <h3 className="font-bold text-lg mb-3">Packaging</h3>
          <div className="space-y-2">
            {PACKAGING_OPTIONS.map((opt) => (
              <label
                key={opt}
                className="flex items-center space-x-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600"
                />
                <span className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-primary transition-colors">
                  {opt}
                </span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-3">Size</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
            {SIZE_OPTIONS.map((size) => (
              <label
                key={size}
                className="flex items-center space-x-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600"
                />
                <span className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-primary transition-colors">
                  {size}
                </span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-3">Giá (đ)</h3>
          <div className="flex items-center justify-between mb-4">
            <input
              type="number"
              value={priceMin}
              onChange={(e) => setPriceMin(Number(e.target.value))}
              className="w-20 p-1 text-sm border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white text-center"
            />
            <span className="text-gray-400">-</span>
            <input
              type="number"
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-24 p-1 text-sm border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white text-center"
            />
          </div>
          <input
            type="range"
            min={0}
            max={10000000}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary dark:bg-gray-700"
          />
        </div>
        <button
          type="button"
          className="w-full bg-primary hover:bg-primary-hover text-white py-2.5 rounded-lg shadow-sm transition-colors font-medium flex items-center justify-center gap-2"
        >
          <span className="material-icons text-sm">filter_list</span>
          Lọc sản phẩm
        </button>
      </div>
    </aside>
  );
}
