"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingBag, Star, ArrowRight } from "lucide-react";
import api from "@/lib/axiosClient";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import PageLoader from "./page-loader";
import { useCart } from "@/lib/cart-context";
import { useToast } from "@/components/ui/use-toast";

export function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState(new Set());

  const fetchCartItems = async () => {
    try {
      const response = await api.get("/cart");
      // Now items contain product IDs directly in the items array
      const itemIds = new Set(response.data?.items.map(item => item.product) || []);
      setCartItems(itemIds);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = async (product) => {
    if (!isAuthenticated) {
      router.push("/login?redirect=/collections");
      return;
    }

    const result = await addToCart(product._id, 1);
    if (result.success) {
      toast({
        title: "Added to cart",
        description: "Product has been added to your cart successfully."
      });
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to add product to cart",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const [productsResponse] = await Promise.all([
          api.get("/products", {
            params: {
              limit: 8,
              sort: "-averageRating" // Sort by rating to show featured products
            }
          })
        ]);
        setProducts(productsResponse.data.products || []);
        await fetchCartItems();
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <PageLoader />;
  if (error) return <div className="text-center py-12 text-red-500">{error}</div>;

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-pink-50 dark:from-gray-900 dark:to-purple-900/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            <span>🔥</span>
            <span>Trending Now</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold">
            <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Featured
            </span>{" "}
            Collections
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover our most popular and trending pieces, carefully curated for the fashion-forward woman. Each piece tells a unique story of elegance and style.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <Card 
              key={product.id} 
              className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg overflow-hidden"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardHeader className="relative p-0">
                <div className="aspect-square bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 rounded-t-lg flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                  <div className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"><img className="h-full w-full object-cover" src={product.images?.[0] || ""} alt={product.name} /></div>
                  {/* Badges */}
                  <div className="absolute top-3 left-3 space-y-2">
                    {product.is_new && (
                      <Badge className="bg-green-500 hover:bg-green-600">New</Badge>
                    )}
                    {product.is_sale && (
                      <Badge variant="destructive">Sale</Badge>
                    )}
                  </div>
                  {/* Action buttons */}
                  <div className="absolute top-3 right-3 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="icon" variant="secondary" className="h-8 w-8">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="secondary" className="h-8 w-8">
                      <ShoppingBag className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{product.category?.name || ""}</p>
                  <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
                  {/* Rating */}
                  <div className="flex items-center space-x-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(product.rating || 4) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({product.numReviews || 0})
                    </span>
                  </div>
                  {/* Price */}
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold">₹{product.price}</span>
                    {product.is_sale && (
                      <span className="text-sm text-muted-foreground line-through">
                        ₹{product.original_price}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <Button 
                  className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
                  onClick={() => handleAddToCart(product)}
                >
                  {cartItems.has(product._id) ? "Added" : "Add to Cart"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-8 py-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <Link href="/collections" className="flex items-center space-x-3">
              <span>View All Products</span>
              <ArrowRight className="h-5 w-5 animate-bounce-x" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
