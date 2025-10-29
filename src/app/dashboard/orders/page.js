"use client";

import { Card } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";

export default function OrdersPage() {
  const orders = []; // This will be populated from your API

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">My Orders</h1>
        <p className="text-muted-foreground mt-2">
          View and track your orders
        </p>
      </div>

      {orders.length === 0 ? (
        <Card className="p-12">
          <div className="text-center space-y-4">
            <ShoppingBag className="h-12 w-12 mx-auto text-gray-400" />
            <h3 className="text-lg font-semibold">No orders yet</h3>
            <p className="text-muted-foreground">
              When you make a purchase, your orders will appear here
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="p-6">
              {/* Order details will go here */}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}