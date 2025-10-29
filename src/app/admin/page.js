"use client";
import React from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axiosClient";
export default function AdminDashboard() {
  const router = useRouter();
  const [userData, setUserdata] = React.useState(null);
  React.useEffect(() => {
    async function fetchUserData() {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/admin/login");
        return;
      }

      try {
        const response = await api("/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });


        if (response.ok || response.notModified) {
          const data = await response.json();
          setUserdata(data);
        } else {
          localStorage.removeItem("token");
          router.push("/admin/login");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        localStorage.removeItem("token");
        router.push("/admin/login");
      }
    }

    fetchUserData();
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="mt-4">
        Welcome to the admin dashboard. Here you can manage your products,
        users, and orders.
      </p>
    </div>
  );
}
