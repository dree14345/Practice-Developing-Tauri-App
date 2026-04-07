import React from "react";
import { Search, Bell, MessageSquare } from "lucide-react";

export const TopNav: React.FC = () => (
  <header className="fixed top-0 right-0 left-64 h-16 flex justify-between items-center px-8 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-100">
    <div className="flex items-center flex-1 max-w-xl">
      <div className="relative w-full">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          size={18}
        />
        <input
          className="w-full bg-slate-50 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-slate-200 outline-none"
          placeholder="Search projects..."
          type="text"
        />
      </div>
    </div>
    <div className="flex items-center gap-6 ml-8">
      <div className="flex items-center gap-4 text-slate-400">
        <Bell size={20} className="cursor-pointer hover:text-slate-900" />
        <MessageSquare
          size={20}
          className="cursor-pointer hover:text-slate-900"
        />
      </div>
      <div className="flex items-center gap-3 border-l border-slate-100 pl-6">
        <div className="text-right hidden sm:block">
          <p className="text-xs font-bold text-slate-900">Julian Casablancas</p>
          <p className="text-[10px] text-slate-500 uppercase tracking-tighter">
            Lead Architect
          </p>
        </div>
        <div className="w-10 h-10 rounded-full bg-slate-200 border border-slate-100" />
      </div>
    </div>
  </header>
);
