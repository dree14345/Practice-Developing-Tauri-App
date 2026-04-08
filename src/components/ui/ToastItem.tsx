// src/components/ui/ToastItem.tsx
import { useEffect, useRef } from "react";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";
import { useToastStore } from "../../stores/toastStore";
import type { Toast } from "../../stores/toastStore";

const config = {
  success: {
    icon: CheckCircle,
    container:
      "border-green-200 dark:border-green-800 bg-white dark:bg-slate-900",
    iconClass: "text-green-600 dark:text-green-400",
    bar: "bg-green-500",
    title: "text-slate-900 dark:text-slate-50",
  },
  error: {
    icon: XCircle,
    container: "border-red-200 dark:border-red-800 bg-white dark:bg-slate-900",
    iconClass: "text-red-500 dark:text-red-400",
    bar: "bg-red-500",
    title: "text-slate-900 dark:text-slate-50",
  },
  warning: {
    icon: AlertTriangle,
    container:
      "border-amber-200 dark:border-amber-800 bg-white dark:bg-slate-900",
    iconClass: "text-amber-500 dark:text-amber-400",
    bar: "bg-amber-500",
    title: "text-slate-900 dark:text-slate-50",
  },
  info: {
    icon: Info,
    container:
      "border-blue-200 dark:border-blue-800 bg-white dark:bg-slate-900",
    iconClass: "text-blue-500 dark:text-blue-400",
    bar: "bg-blue-500",
    title: "text-slate-900 dark:text-slate-50",
  },
};

export function ToastItem({
  id,
  type,
  title,
  message,
  duration = 4000,
}: Toast) {
  const remove = useToastStore((s) => s.remove);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    timerRef.current = setTimeout(() => remove(id), duration);
    return () => clearTimeout(timerRef.current);
  }, [id, duration]);

  const {
    icon: Icon,
    container,
    iconClass,
    bar,
    title: titleClass,
  } = config[type];

  return (
    <div
      className={`
        relative flex items-start gap-3 w-80 px-4 py-3 rounded-xl border shadow-lg
        overflow-hidden pointer-events-auto
        animate-in slide-in-from-right-4 fade-in duration-300
        ${container}
      `}
    >
      {/* Icon */}
      <Icon size={18} className={`mt-0.5 shrink-0 ${iconClass}`} />

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold leading-snug ${titleClass}`}>
          {title}
        </p>
        {message && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
            {message}
          </p>
        )}
      </div>

      {/* Close button */}
      <button
        onClick={() => remove(id)}
        className="shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors mt-0.5"
      >
        <X size={14} />
      </button>

      {/* Progress bar */}
      <div
        className={`absolute bottom-0 left-0 h-0.5 ${bar}`}
        style={{ animation: `shrink ${duration}ms linear forwards` }}
      />
    </div>
  );
}
