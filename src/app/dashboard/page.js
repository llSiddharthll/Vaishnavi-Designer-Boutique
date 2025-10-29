"use client";

import { useAuth } from "@/lib/auth-context";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Heart, Settings, User } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useAuth();

  const stats = [
    {
      name: "Total Orders",
      value: "0",
      href: "/dashboard/orders",
      icon: ShoppingBag,
    },
    {
      name: "Wishlist Items",
      value: user?.wishlist?.length || "0",
      href: "/dashboard/wishlist",
      icon: Heart,
    },
  ];

  const quickActions = [
    {
      name: "Edit Profile",
      description: "Update your personal information",
      href: "/dashboard/profile",
      icon: User,
    },
    {
      name: "Account Settings",
      description: "Manage your account preferences",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
        <p className="text-muted-foreground mt-2">
          Here's what's happening with your account.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.name}
                  </p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className="h-12 w-12 bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center">
                  <Icon className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                </div>
              </div>
              <Button
                variant="ghost"
                className="w-full mt-4"
                asChild
              >
                <Link href={stat.href}>View Details</Link>
              </Button>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Card
                key={action.name}
                className="p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center">
                    <Icon className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{action.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {action.description}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  className="w-full mt-4"
                  asChild
                >
                  <Link href={action.href}>Get Started</Link>
                </Button>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <Card className="p-6">
          <p className="text-center text-muted-foreground py-8">
            No recent activity to show
          </p>
        </Card>
      </div>
    </div>
  );
}