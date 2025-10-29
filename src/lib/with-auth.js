"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import PageLoader from "@/components/page-loader";

export function withAuth(Component) {
  return function ProtectedRoute(props) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
      if (!loading && !user) {
        // Store the attempted URL to redirect back after login
        router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      }
    }, [user, loading, router, pathname]);

    // Show loading spinner while checking auth status
    if (loading) {
      return <PageLoader />;
    }

    // If authenticated, render the protected component
    if (user) {
      return <Component {...props} />;
    }

    // Return null while redirecting
    return null;
  };
}