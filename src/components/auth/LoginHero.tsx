import React from "react";

export const LoginHero: React.FC = () => (
  <section className="hidden lg:block relative overflow-hidden group h-full">
    <div className="absolute inset-0 bg-slate-900/20 mix-blend-overlay z-10 transition-opacity duration-700 group-hover:opacity-40" />
    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent z-20" />
    <img
      src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000"
      alt="Architecture"
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
    />
    <div className="absolute bottom-16 left-16 right-16 z-30">
      <div className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl border border-white/20 shadow-2xl">
        <span className="text-slate-500 text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
          Curated Space
        </span>
        <h2 className="text-slate-900 text-2xl font-bold tracking-tight mb-4">
          "Architecture is a visual art, and the buildings speak for
          themselves."
        </h2>
        <div className="flex items-center gap-3">
          <div className="w-10 h-1 bg-slate-900 rounded-full" />
          <span className="text-slate-500 font-medium italic">
            Julia Morgan Studio
          </span>
        </div>
      </div>
    </div>
  </section>
);
