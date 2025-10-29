"use client";
import { HeroSection } from "@/components/hero-section";
import { FeaturedProducts } from "@/components/featured-products";
import { Categories } from "@/components/categories";
import { Features } from "@/components/features";
import { Testimonials } from "@/components/testimonials";
import { Newsletter } from "@/components/newsletter";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Featured Products */}
      <FeaturedProducts />
      
      {/* Categories */}
      <Categories />
      
      {/* Features/Benefits */}
      <Features />
      
      {/* Testimonials */}
      <Testimonials />
      
      {/* Newsletter */}
      <Newsletter />
    </div>
  );
}
