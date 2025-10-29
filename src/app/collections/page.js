"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Heart, ShoppingBag, Star, Filter, Grid, List } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import api from "@/lib/axiosClient";
import PageLoader from "@/components/page-loader";

export default function CollectionsPage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const [selectedCategory, setSelectedCategory] = useState({ name: "All", id: null });
  const [priceFilters, setPriceFilters] = useState({
    under50: false,
    between50_100: false,
    between100_200: false,
    over200: false
  });
  const [viewMode, setViewMode] = useState("grid");
  const [filtersOpen, setFiltersOpen] = useState(true);

  const [cartIds, setCartIds] = useState(() => {
    if (typeof window === "undefined") return new Set();
    try {
      const raw = localStorage.getItem("cart");
      const arr = raw ? JSON.parse(raw) : [];
      return new Set(arr.map((p) => p._id));
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    async function fetchAll() {
      try {
        setLoading(true);
        const [catRes, prodRes] = await Promise.all([
          api.get("/categories"),
          api.get(`/products?page=${currentPage}${selectedCategory.id ? `&category=${selectedCategory.id}` : ""}`)
        ]);

        const categoriesData = catRes.data || [];
        setCategories(categoriesData);
        setProducts(prodRes.data.products || []);
        setTotalPages(prodRes.data.pages || 1);
        setTotalProducts(prodRes.data.total || 0);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, [currentPage, selectedCategory]);

  // Helpers
  const priceMatch = (price) => {
    const active =
      priceFilters.under50 ||
      priceFilters.between50_100 ||
      priceFilters.between100_200 ||
      priceFilters.over200;
    if (!active) return true;
    const checks = [];
    if (priceFilters.under50) checks.push(price < 4000);
    if (priceFilters.between50_100) checks.push(price >= 4000 && price <= 8000);
    if (priceFilters.between100_200) checks.push(price > 8000 && price <= 16000);
    if (priceFilters.over200) checks.push(price > 16000);
    return checks.some(Boolean);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const categoryOk =
        selectedCategory.name === "All" ||
        p.category?._id === selectedCategory.id;
      const priceOk = priceMatch(Number(p.price || 0));
      return categoryOk && priceOk;
    });
  }, [products, selectedCategory, priceFilters]);

  const handleTogglePrice = (key) => {
    setPriceFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAddToCart = (product) => {
    try {
      const raw = localStorage.getItem("cart");
      const arr = raw ? JSON.parse(raw) : [];
      if (!arr.find((p) => p._id === product._id)) {
        arr.push({
          _id: product._id,
          name: product.name,
          price: product.price,
          image: product.images?.[0] || ""
        });
        localStorage.setItem("cart", JSON.stringify(arr));
        setCartIds(new Set(arr.map((p) => p._id)));
      }
    } catch {}
  };

  if (loading) return <PageLoader />;
  if (error) return <div className="py-16 text-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold">
              <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Our</span>{" "}
              Collections
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our carefully curated collection of designer pieces that combine elegance, comfort, and style.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <Button variant="outline" size="sm" onClick={() => setFiltersOpen((v) => !v)}>
            <Filter className="h-4 w-4 mr-2" /> {filtersOpen ? "Hide" : "Show"} Filters
          </Button>
          <div className="flex items-center space-x-2">
            <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
              <Grid className="h-4 w-4" />
            </Button>
            <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className={`lg:col-span-1 space-y-6 ${filtersOpen ? "block" : "hidden lg:block"}`}>
            {/* Categories */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Categories</h3>
              <div className="space-y-2">
                {[{ name: "All", id: null }, ...categories.map((c) => ({ 
                    name: c.name, 
                    id: c._id
                  }))].map((category) => (
                    <div key={category.id || "all"} className="flex items-center justify-between">
                      <button
                        className={`text-sm transition-colors ${selectedCategory.name === category.name ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"}`}
                        onClick={() => {
                          setSelectedCategory({ name: category.name, id: category.id });
                          setCurrentPage(1);
                        }}
                      >
                        {category.name}
                      </button>
                      {category.name === "All" ? 
                        <span className="text-xs text-muted-foreground">({totalProducts})</span> :
                        <span className="text-xs text-muted-foreground">
                          ({products.filter(p => p.category?._id === category.id).length})
                        </span>
                      }
                    </div>
                  )
                )}
              </div>
            </div>

            <Separator />

            {/* Price Range */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Price Range</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="under-50" className="rounded" checked={priceFilters.under50} onChange={() => handleTogglePrice("under50")} />
                  <label htmlFor="under-50" className="text-sm text-muted-foreground">Under ₹4000</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="50-100" className="rounded" checked={priceFilters.between50_100} onChange={() => handleTogglePrice("between50_100")} />
                  <label htmlFor="50-100" className="text-sm text-muted-foreground">₹4000 - ₹8000</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="100-200" className="rounded" checked={priceFilters.between100_200} onChange={() => handleTogglePrice("between100_200")} />
                  <label htmlFor="100-200" className="text-sm text-muted-foreground">₹8000 - ₹16000</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="over-200" className="rounded" checked={priceFilters.over200} onChange={() => handleTogglePrice("over200")} />
                  <label htmlFor="over-200" className="text-sm text-muted-foreground">Over ₹16000</label>
                </div>
              </div>
            </div>

            <Separator />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm" onClick={() => { 
                  setSelectedCategory({ name: "All", id: null }); 
                  setPriceFilters({ under50: false, between50_100: false, between100_200: false, over200: false }); 
                  setCurrentPage(1);
                }}>
                  <Filter className="h-4 w-4 mr-2" /> Clear Filters
                </Button>
                <span className="text-sm text-muted-foreground">
                  Showing {(currentPage - 1) * 12 + 1}-{Math.min(currentPage * 12, totalProducts)} of {totalProducts} products
                </span>
              </div>
              <div className="hidden lg:flex items-center space-x-2">
                <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
                  <Grid className="h-4 w-4" />
                </Button>
                <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Products */}
            <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {filteredProducts.map((product) => {
                const isGrid = viewMode === "grid";
                const cardClass = isGrid
                  ? "group hover:shadow-lg transition-all duration-300 overflow-hidden rounded-lg"
                  : "group hover:shadow-lg transition-all duration-300 flex flex-row w-full rounded-lg";
                const headerClass = isGrid
                  ? "relative p-0"
                  : "relative flex-1 p-0 w-1/3";
                const mediaClass = isGrid
                  ? "aspect-square bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 rounded-t-lg flex items-center justify-center relative overflow-hidden"
                  : "h-full min-h-[160px] object-cover bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 rounded-l-lg flex items-center justify-center relative overflow-hidden";
                const bodyWrapClass = isGrid ? "" : "w-2/3 flex flex-col";
                const contentClass = isGrid ? "p-4" : "p-4";
                const footerBtnClass = isGrid
                  ? "w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
                  : "bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 px-6";
                return (
                  <Card key={product._id} className={cardClass}>
                    <CardHeader className={headerClass}>
                      <div className={mediaClass}>
                        <img 
                          src={`${product.images?.[0] || "/placeholder.png"}`} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        {/* Badges */}
                        <div className="absolute top-3 left-3 space-y-2 space-x-2">
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

                    <div className={bodyWrapClass}>
                      <CardContent className={contentClass}>
                        {isGrid ? (
                          <div className="flex flex-col h-[160px]">
                            <p className="text-sm text-muted-foreground">{product.category?.name || ""}</p>
                            <h3 className="font-semibold text-lg line-clamp-2 mb-2">{product.name}</h3>
                            <div className="flex items-center space-x-1 mb-2">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating || 4) ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
                                ))}
                              </div>
                              <span className="text-sm text-muted-foreground">({product.numReviews})</span>
                            </div>
                            <div className="flex items-center space-x-2 mt-auto">
                              <span className="text-xl font-bold">₹{product.price}</span>
                              {product.is_sale && (
                                <span className="text-sm text-muted-foreground line-through">₹{product.original_price}</span>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-start justify-between gap-6">
                            <div className="space-y-2">
                              <p className="text-sm text-muted-foreground">{product.category?.name || ""}</p>
                              <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
                                                             <div className="flex items-center space-x-1">
                                 <div className="flex items-center">
                                   {[...Array(5)].map((_, i) => (
                                     <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
                                   ))}
                                 </div>
                                 <span className="text-sm text-muted-foreground">({product.reviews})</span>
                               </div>
                            </div>

                            <div className="text-right min-w-[140px]">
                              <div className="flex items-center justify-end space-x-2">
                                <span className="text-xl font-bold">${product.price}</span>
                                {product.is_sale && (
                                  <span className="text-sm text-muted-foreground line-through">${product.original_price}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </CardContent>

                      <CardFooter className={isGrid ? "p-4 pt-0" : "p-4 pt-0 flex items-center justify-end"}>
                        <Button className={footerBtnClass} onClick={() => handleAddToCart(product)}>
                          {cartIds.has(product.id) ? "Added" : "Add to Cart"}
                        </Button>
                      </CardFooter>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center space-x-2 mt-12">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <div className="flex items-center justify-center space-x-2">
                {[...Array(totalPages)].map((_, i) => (
                  <Button
                    key={i + 1}
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
