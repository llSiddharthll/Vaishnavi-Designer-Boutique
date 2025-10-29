"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";


export default function AdminLayout({ children }) {

  const router = useRouter();


  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/admin/login");
  };

  return (
    <div className="flex h-[85vh] bg-gray-100 dark:bg-gray-900">
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col justify-between">
        <div>
          <div className="p-4">
            <h2 className="text-2xl font-bold">Admin</h2>
          </div>
          <nav className="mt-4">
            <ul>
              <li>
                <Link href="/admin" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/admin/products" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/admin/users" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                  Users
                </Link>
              </li>
              <li>
                <Link href="/admin/orders" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                  Orders
                </Link>
              </li>
              <li>
                <Link href="/admin/categories" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/admin/testimonials" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                  Testimonials
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="p-4">
          <Button onClick={handleLogout} className="w-full">
            Logout
          </Button>
        </div>
      </div>
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
}
