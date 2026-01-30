"use client";

import { useState } from "react";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");

  return (
    <div className="bg-white py-20 px-6 border-t border-[#f2f3f2]">
      <div className="max-w-3xl mx-auto text-center flex flex-col gap-6">
        <div className="w-16 h-16 bg-brand-beige rounded-full flex items-center justify-center mx-auto text-brand-forest">
          <span className="material-symbols-outlined text-3xl">mail</span>
        </div>
        <h2 className="text-[#141514] text-3xl font-bold tracking-tight">
          Join the Movement
        </h2>
        <p className="text-[#727a71]">
          Subscribe to receive updates on our impact, new product launches, and
          tips for a sustainable lifestyle.
        </p>
        <form
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto w-full mt-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 h-12 px-4 rounded-lg border border-[#dfe2df] focus:border-brand-forest focus:ring-1 focus:ring-brand-forest outline-none text-[#141514]"
          />
          <button
            type="submit"
            className="h-12 px-8 bg-brand-forest hover:bg-[#1a3817] text-white font-bold rounded-lg transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}
