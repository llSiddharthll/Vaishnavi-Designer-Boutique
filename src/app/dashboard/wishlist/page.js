"use client";

import { Card } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";
import { Heart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import api from "@/lib/axiosClient";
import PageLoader from "@/components/page-loader";

export default function WishlistPage() {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchWishlist() {
      try {
        const response = await api.get("/users/profile");
        const items = response.data.user.wishlist || [];
        setWishlistItems(items);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await api.post(`/users/wishlist/${productId}`);
      setWishlistItems(items => items.filter(item => item._id !== productId));
    } catch (err) {
      console.error("Error removing from wishlist:", err);
    }
  };

  if (loading) return <PageLoader />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">My Wishlist</h1>
        <p className="text-muted-foreground mt-2">
          Manage your saved items
        </p>
      </div>

      {wishlistItems.length === 0 ? (
        <Card className="p-12">
          <div className="text-center space-y-4">
            <Heart className="h-12 w-12 mx-auto text-gray-400" />
            <h3 className="text-lg font-semibold">Your wishlist is empty</h3>
            <p className="text-muted-foreground">
              Items added to your wishlist will appear here
            </p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {wishlistItems.map((item) => (
            <Card key={item._id} className="p-4">
              <div className="flex gap-4">
                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                  <img
                    src={item.images?.[0] || ""}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold line-clamp-1">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.category?.name}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-bold">₹{item.price}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => handleRemoveFromWishlist(item._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}