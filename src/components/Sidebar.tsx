import React from "react";
import {
  LayoutDashboard,
  LineChart,
  FolderOpen,
  Users,
  FileText,
  Settings,
  Plus,
  HelpCircle,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", active: true },
    { icon: <LineChart size={20} />, label: "Analytics" },
    { icon: <FolderOpen size={20} />, label: "Projects" },
    { icon: <Users size={20} />, label: "Team" },
    { icon: <FileText size={20} />, label: "Reports" },
    { icon: <Settings size={20} />, label: "Settings" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col py-6 px-4 z-50">
      <div className="mb-10 px-4 flex items-center gap-3">
        <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center">
          <span className="text-white dark:text-black font-bold text-xs">
            A
          </span>
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Architectural
          </h1>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
            The Silent Curator
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item, idx) => (
          <a
            key={idx}
            href="#"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              item.active
                ? "text-slate-900 dark:text-white font-bold border-r-2 border-slate-900 dark:border-white bg-slate-200/50 dark:bg-slate-800/50"
                : "text-slate-500 dark:text-slate-400 font-medium hover:bg-slate-200/30 dark:hover:bg-slate-800/30"
            }`}
          >
            {item.icon}
            <span className="text-sm">{item.label}</span>
          </a>
        ))}
      </nav>

      <div className="mt-auto space-y-1">
        <button className="w-full mb-6 py-3 px-4 bg-black dark:bg-white text-white dark:text-black rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all">
          <Plus size={18} />
          <span className="text-sm">Create New</span>
        </button>
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <HelpCircle size={20} />
          <span className="text-sm">Support</span>
        </a>
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <LogOut size={20} />
          <span className="text-sm">Sign Out</span>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
