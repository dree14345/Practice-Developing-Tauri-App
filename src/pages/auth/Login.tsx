import React, { useState } from "react";
import { HelpCircle, Moon } from "lucide-react";
import { SocialLogin } from "../../components/auth/SocialLogin";
import { LoginHero } from "../../components/auth/LoginHero";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import useToast from "../../hooks/useToast";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(username, password);
      navigate("/dashboard", { replace: true });
      toast.success("Login Success", `Welcome, "${username}"`);
    } catch (err: any) {
      if (err.type === "Unauthorized") {
        toast.error("Invalid Credentials", "Invalid username or password.");
      } else {
        toast.error(
          "Problem Encountered",
          "Something went wrong. Please try again.",
        );
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FB] select-none">
      {/* Draggable Nav for Tauri */}
      <nav
        data-tauri-drag-region
        className="bg-white/50 backdrop-blur-md flex justify-between items-center px-6 py-4 w-full sticky top-0 z-50 border-b border-slate-100"
      >
        <div className="text-xl font-bold tracking-tighter text-slate-900">
          Architectural Dashboard
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <HelpCircle
            size={20}
            className="cursor-pointer hover:text-slate-900 transition-colors"
          />
          <Moon
            size={20}
            className="cursor-pointer hover:text-slate-900 transition-colors"
          />
        </div>
      </nav>

      <main className="flex-grow flex items-center justify-center p-4 lg:p-12">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden bg-white shadow-2xl shadow-slate-200 min-h-[750px]">
          {/* Left: Form Area */}
          <section className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-12">
            <div className="mb-10">
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
                Welcome Back
              </h1>
              <p className="text-slate-500">
                Sign in to login to dree software
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  className="block text-slate-600 text-sm font-medium mb-2"
                  htmlFor="email"
                >
                  Username or Email
                </label>
                <input
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-slate-900/5 focus:bg-white rounded-xl text-slate-900 transition-all outline-none"
                  id="email"
                  placeholder="name@firm.com"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label
                    className="block text-slate-600 text-sm font-medium"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-blue-600 text-xs font-semibold hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <input
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-slate-900/5 focus:bg-white rounded-xl text-slate-900 transition-all outline-none"
                  id="password"
                  placeholder="••••••••"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex items-center">
                <input
                  className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                  id="remember"
                  type="checkbox"
                />
                <label
                  className="ml-2 text-sm text-slate-500"
                  htmlFor="remember"
                >
                  Keep me logged in
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-black active:scale-[0.98] transition-all shadow-xl shadow-slate-200"
              >
                Sign In
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold text-slate-400">
                <span className="px-4 bg-white">Or continue with</span>
              </div>
            </div>

            <SocialLogin />

            <div className="mt-auto pt-10 text-center">
              <p className="text-sm text-slate-500">
                New to the studio?{" "}
                <button className="text-slate-900 font-bold hover:underline">
                  Contact Administrator
                </button>
              </p>
            </div>
          </section>

          {/* Right: Hero Image */}
          <LoginHero />
        </div>
      </main>

      {/* Localized Footer */}
      <footer className="w-full border-t border-slate-100 py-8 bg-white/30">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 w-full max-w-7xl mx-auto gap-4">
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            © 2026 Architectural Desktop App
          </div>
          <div className="flex gap-6">
            <button className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">
              Privacy
            </button>
            <button className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">
              Support
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;
