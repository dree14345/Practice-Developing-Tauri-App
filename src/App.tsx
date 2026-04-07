import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Index } from "./pages/items/Index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./pages/auth/Login";
import { AuthGuard } from "./components/AuthGuard";
import DashboardLayout from "./layouts/DashboardLayout";
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* 1. The "Default" Redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* 2. Public Route */}
          <Route path="/login" element={<Login />} />

          {/* 3. Protected Routes */}
          <Route element={<AuthGuard />}>
            {/* Renders your sidebar/topbar/bento-grid structure */}
            <Route path="/dashboard" element={<DashboardLayout />} />
          </Route>

          {/* 4. Catch-all for 404s */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
