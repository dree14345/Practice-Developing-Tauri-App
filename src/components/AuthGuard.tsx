import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { useEffect, useState } from "react";
import { authApi } from "../api/auth";

export function AuthGuard() {
  const { token, logout } = useAuthStore();
  const [checking, setChecking] = useState(true);
  const [valid, setIsValid] = useState(false);

  useEffect(() => {
    if (!token) {
      setChecking(false);
      return;
    }
    // Validate token with Rust on every app start
    authApi
      .validateToken(token)
      .then((isValid) => {
        if (!isValid) logout();
        setIsValid(isValid);
      })
      .catch(() => logout())
      .finally(() => setChecking(false));
  }, [token]);

  if (checking) return <div className="splash">Loading...</div>;
  if (!token || !valid) return <Navigate to="/login" replace />;

  return <Outlet />;
}
