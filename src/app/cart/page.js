"use client";

import { useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { useCart } from "@/lib/cart-context";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import PageLoader from "@/components/page-loader";
import Link from "next/link";
import withAuth from "@/components/withAuth";

function CartPage() {
  const { cart, loading, error, updateQuantity, clearCart, getCartTotal, isUpdating } = useCart();
  const router = useRouter();
  const { toast } = useToast();

  if (loading) return <PageLoader />;
  if (error) return <div className="text-center py-12 text-red-500">{error}</div>;

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen relative">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-pink-100/30 to-purple-100/30 dark:from-pink-900/20 dark:to-purple-900/20 rounded-full blur-3xl transform rotate-12 animate-drift"></div>
          <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-purple-100/30 to-pink-100/30 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full blur-3xl transform -rotate-12 animate-drift-slow"></div>
        </div>
        
        <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-8 px-4 relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 flex items-center justify-center">
            <ShoppingBag className="h-12 w-12 text-pink-600 dark:text-pink-400" />
          </div>
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Your cart is empty
            </h2>
            <p className="text-muted-foreground max-w-md">
              Looks like you haven't added any items to your cart yet.
            </p>
          </div>
          <Button
            asChild
            className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-8 py-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <Link href="/collections" className="flex items-center space-x-2">
              <span>Continue Shopping</span>
              <ShoppingBag className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen relative pb-12 container mx-auto px-4 sm:px-6 lg:px-16">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-pink-100/30 to-purple-100/30 dark:from-pink-900/20 dark:to-purple-900/20 rounded-full blur-3xl transform rotate-12 animate-drift"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-purple-100/30 to-pink-100/30 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full blur-3xl transform -rotate-12 animate-drift-slow"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative">
        <div className="text-center mb-12 space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent py-2">
            Shopping Cart
          </h1>
          <p className="text-muted-foreground">Review and manage your selected items</p>
        </div>
      
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {cart.items.map((item) => (
              <Card 
                key={item._id} 
                className={`p-6 relative transform transition-all duration-300 hover:scale-[1.02] bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-0 shadow-lg ${
                  isUpdating ? 'opacity-50 pointer-events-none' : ''
                }`}
              >
                <div className="flex gap-6">
                  <div className="w-32 h-32 bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 rounded-xl overflow-hidden p-1">
                    <div className="w-full h-full rounded-lg overflow-hidden">
                      <img
                        src={item.product?.images?.[0] || "/placeholder-image.jpg"}
                        alt={item.product?.name || "Product"}
                        className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
                        onError={(e) => {
                          e.target.src = "/placeholder-image.jpg";
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{item.product?.name || "Product Unavailable"}</h3>
                    <p className="text-sm text-muted-foreground">{item.product?.category?.name || "Category Unavailable"}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center space-x-3 bg-background/50 backdrop-blur-sm rounded-full p-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 rounded-full cursor-pointer"
                          onClick={async () => {
                            const result = await updateQuantity(item.product._id, item.quantity - 1);
                            if (!result.success) {
                              toast({
                                title: "Error",
                                description: result.error,
                                variant: "destructive"
                              });
                            }
                          }}
                          disabled={isUpdating || item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4 cursor-pointer" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 rounded-full cursor-pointer"
                          onClick={async () => {
                            const result = await updateQuantity(item.product._id, item.quantity + 1);
                            if (!result.success) {
                              toast({
                                title: "Error",
                                description: result.error,
                                variant: "destructive"
                              });
                            }
                          }}
                          disabled={isUpdating || item.quantity >= (item.product?.stock || 10)}
                        >
                          <Plus className="h-4 w-4 cursor-pointer" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                          ₹{item.price * item.quantity}
                        </div>
                        <div className="text-sm text-muted-foreground">₹{item.price} each</div>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/20 cursor-pointer"
                    onClick={async () => {
                      const result = await updateQuantity(item.product._id, 0);
                      if (!result.success) {
                        toast({
                          title: "Error",
                          description: result.error || "Failed to remove item",
                          variant: "destructive"
                        });
                      }
                    }}
                    disabled={isUpdating}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="lg:col-span-1">
            <Card className="p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-0 shadow-lg sticky top-24">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-6">
                Order Summary
              </h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">₹{total}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-sm text-muted-foreground">Calculated at checkout</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-800 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    ₹{total}
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                <Button 
                  className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white h-12"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-12 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/10"
                  onClick={async () => {
                    const result = await clearCart();
                    if (result.success) {
                      toast({
                        title: "Cart cleared",
                        description: "Your cart has been cleared successfully."
                      });
                    } else {
                      toast({
                        title: "Error",
                        description: result.error || "Failed to clear cart",
                        variant: "destructive"
                      });
                    }
                  }}
                  disabled={isUpdating}
                >
                  Clear Cart
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(CartPage);