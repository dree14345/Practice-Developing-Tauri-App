import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Index } from "./pages/items/Index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./pages/auth/Login";
import { AuthGuard } from "./components/AuthGuard";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "./components/ui/ToastContainer";
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/items" element={<Index />} />
          {/* <Route element={<AuthGuard />}></Route> */}

          {/* 4. Catch-all for 404s */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
