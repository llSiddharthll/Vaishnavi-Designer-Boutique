"use client";
import { useEffect, useState } from "react";
import PageLoader from "./page-loader";
import { useRouter } from "next/navigation";

/**
 * withAuth HOC:
 * - If not authenticated -> redirect to /login
 * - Shows `loading` briefly while checking
 *
 * Auth check here uses localStorage token as example.
 * Replace `isAuthenticated()` with your actual logic.
 */
export default function withAuth(WrappedComponent) {
  return function Protected(props) {
    const router = useRouter();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
      const checkAuth = () => {
        // EXAMPLE: check localStorage token
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        // replace logic below with real validation if needed
        if (!token) {
          router.replace("/login");
          return false;
        }
        return true;
      };

      const ok = checkAuth();
      if (ok) setChecking(false);
    }, [router]);

    if (checking) {
      return <PageLoader />;
    }

    return <WrappedComponent {...props} />;
  };
}
