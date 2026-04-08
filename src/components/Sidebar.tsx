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
  ShelvingUnit,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const navItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      to: "/dashboard",
    },
    { icon: <ShelvingUnit size={20} />, label: "Items", to: "/items" },
    { icon: <FolderOpen size={20} />, label: "Projects", to: "/projects" },
    { icon: <Users size={20} />, label: "Team", to: "/team" },
    { icon: <FileText size={20} />, label: "Reports", to: "/reports" },
    { icon: <Settings size={20} />, label: "Settings", to: "/settings" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col py-6 px-4 z-50">
      <div className="mb-10 px-4 flex items-center gap-3">
        <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center">
          <span className="text-white dark:text-black font-bold text-xs">
            DB
          </span>
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Dashboard
          </h1>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item, idx) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? "text-slate-900 dark:text-white font-bold border-r-2 border-slate-900 dark:border-white bg-slate-200/50 dark:bg-slate-800/50"
                  : "text-slate-500 dark:text-slate-400 font-medium hover:bg-slate-200/30 dark:hover:bg-slate-800/30"
              }`
            }
          >
            {item.icon}
            <span className="text-sm">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto space-y-1">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <LogOut size={20} />
          <span className="text-sm">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
