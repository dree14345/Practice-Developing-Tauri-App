import { useToastStore } from "../stores/toastStore";
import type { ToastType } from "../stores/toastStore";

export default function useToast() {
  const add = useToastStore((s) => s.add);

  const show = (
    type: ToastType,
    title: string,
    message?: string,
    duration = 4000,
  ) => {
    add({ type, title, message, duration });
  };
  return {
    success: (title: string, message?: string) =>
      show("success", title, message),
    error: (title: string, message?: string) => show("error", title, message),
    warning: (title: string, message?: string) =>
      show("warning", title, message),
    info: (title: string, message?: string) => show("info", title, message),
  };
}
