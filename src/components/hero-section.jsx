"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Star } from "lucide-react"
import api from "@/lib/axiosClient";

export function HeroSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getNewestProducts() {
      try {
        setLoading(true);
        const response = await api.get("/products", { params: { limit: 4, sort: "-createdAt" } });
        setProducts(response.data.products || []);
      } catch (error) {
        console.error("Failed to fetch newest products for hero:", error);
      } finally {
        setLoading(false);
      }
    }
    getNewestProducts();
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-pink-300 to-purple-300 dark:from-pink-600 dark:to-purple-600 rounded-full opacity-20 animate-bounce-slow"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-purple-300 to-pink-300 dark:from-purple-600 dark:to-pink-600 rounded-full opacity-15 animate-pulse-slow"></div>
        <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-gradient-to-br from-indigo-300 to-purple-300 dark:from-indigo-600 dark:to-purple-600 rounded-full opacity-25 animate-float"></div>
        <div className="absolute top-1/2 right-1/3 w-8 h-8 bg-gradient-to-br from-pink-400 to-rose-400 dark:from-pink-500 dark:to-rose-500 rounded-full opacity-30 animate-spin-slow"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5QzkyQUMiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-16 py-24 lg:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 animate-slide-in-left">
                <Sparkles className="h-4 w-4 text-pink-500 animate-spin-slow" />
                <span>✨ New Winter Collection 2025</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight animate-fade-in-up">
                <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient">
                  Elegant Designs
                </span>
                <br />
                <span className="text-gray-900 dark:text-white">
                  for the Modern Woman
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed animate-fade-in-up-delay">
                Discover our exclusive collection of designer clothing that combines timeless elegance with contemporary style. Every piece tells a story of sophistication.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up-delay-2">
              <Button size="lg" className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <Link href="/collections" className="flex items-center space-x-3">
                  <span>Shop Collection</span>
                  <ArrowRight className="h-5 w-5 animate-bounce-x" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 rounded-full border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transform hover:scale-105 transition-all duration-300">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>

            <div className="flex items-center space-x-8 text-sm text-gray-600 dark:text-gray-400 animate-fade-in-up-delay-3">
              <div className="text-center">
                <div className="font-bold text-2xl text-gray-900 dark:text-white animate-count-up">500+</div>
                <div>Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-2xl text-gray-900 dark:text-white animate-count-up">50+</div>
                <div>Designer Pieces</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-2xl text-gray-900 dark:text-white animate-count-up">5+</div>
                <div>Years Experience</div>
              </div>
            </div>
          </div>

          {/* Enhanced Image Section */}
          <div className="relative animate-fade-in-right">
            {loading ? (
              <div className="grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-square rounded-2xl bg-gray-200 dark:bg-gray-800 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 transform-gpu rotate-3 hover:rotate-0 transition-transform duration-500">
                {products.map((product, index) => (
                  <Link href={`/products/${product.slug}`} key={product._id} className="block group">
                    <div 
                      className="aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                      style={{ animation: `fade-in-up 0.5s ${index * 0.15}s ease-out forwards`, opacity: 0 }}
                    >
                      <img
                        src={product.images?.[0] || "/placeholder.png"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
