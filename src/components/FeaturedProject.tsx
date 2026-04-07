import React from "react";

export const FeaturedProject: React.FC = () => (
  <div className="bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-sm flex flex-col group h-full">
    <div className="h-48 w-full relative overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
        alt="Skyscraper"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
      <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-bold text-white uppercase">
        Active Now
      </div>
    </div>
    <div className="p-8 flex-1 flex flex-col">
      <h4 className="text-2xl font-bold text-white mb-2">The Glass Monolith</h4>
      <p className="text-slate-400 text-sm leading-relaxed mb-6">
        Sustainable architectural marvel in Tokyo, 85% complete in rendering.
      </p>
      <div className="mt-auto flex justify-between items-center">
        <div className="flex -space-x-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-700"
            />
          ))}
        </div>
        <button className="bg-white text-black px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors">
          Manage Workspace
        </button>
      </div>
    </div>
  </div>
);
