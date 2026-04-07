import React from "react";

interface StatCardProps {
  label: string;
  value: string;
  trend?: string;
  trendLabel?: string;
  icon: React.ReactNode;
  variant?: "light" | "dark";
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  trend,
  trendLabel,
  icon,
  variant = "light",
}) => {
  const isDark = variant === "dark";
  return (
    <div
      className={`p-6 rounded-[2.5rem] shadow-sm relative overflow-hidden group transition-all hover:shadow-md ${
        isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900"
      }`}
    >
      <div className="flex justify-between items-start relative z-10">
        <div>
          <p
            className={`text-[10px] uppercase tracking-widest font-bold mb-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}
          >
            {label}
          </p>
          <h3 className="text-3xl font-extrabold tracking-tight">{value}</h3>
          <div className="mt-4 flex items-center gap-2">
            {trend && (
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isDark
                    ? "bg-white/10 text-white"
                    : "bg-slate-100 text-slate-900"
                }`}
              >
                {trend}
              </span>
            )}
            <span
              className={`text-[10px] ${isDark ? "text-slate-400" : "text-slate-500"}`}
            >
              {trendLabel}
            </span>
          </div>
        </div>
        <div
          className={`p-3 rounded-xl ${isDark ? "bg-white/10" : "bg-slate-50"}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};
