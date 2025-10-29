"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "./axiosClient";

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchCart = async () => {
    try {
      const response = await api.get("/cart");
      if (response.data) {
        // Ensure product details are properly handled
        const cartData = {
          ...response.data,
          items: response.data.items.map(item => ({
            ...item,
            product: typeof item.product === 'string' ? { _id: item.product } : item.product
          }))
        };
        setCart(cartData);
      } else {
        setCart(null);
      }
      setError(null);
    } catch (err) {
      console.error("Error fetching cart:", err);
      // Only set error if it's not a 404 (empty cart)
      if (err.response?.status !== 404) {
        setError(err.message);
      } else {
        setCart(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    if (isUpdating) return { success: false, error: "Another operation is in progress" };
    setIsUpdating(true);
    try {
      await api.post("/cart", { productId, quantity });
      await fetchCart();
      return { success: true };
    } catch (err) {
      console.error("Error adding to cart:", err);
      return { 
        success: false, 
        error: err.response?.data?.message || "Failed to add item to cart" 
      };
    } finally {
      setIsUpdating(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (isUpdating) return { success: false, error: "Another operation is in progress" };
    setIsUpdating(true);
    try {
      if (quantity === 0) {
        await api.delete(`/cart/item/${productId}`);
      } else {
        await api.post("/cart", { productId, quantity });
      }
      await fetchCart();
      return { success: true };
    } catch (err) {
      console.error("Error updating cart:", err);
      return { 
        success: false, 
        error: err.response?.data?.message || "Failed to update cart" 
      };
    } finally {
      setIsUpdating(false);
    }
  };

  const clearCart = async () => {
    try {
      await api.delete("/cart");
      setCart(null);
      return { success: true };
    } catch (err) {
      console.error("Error clearing cart:", err);
      return { success: false, error: err.message };
    }
  };

  const getCartTotal = () => {
    if (!cart?.items) return 0;
    return cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    if (!cart?.items) return 0;
    return cart.items.reduce((sum, item) => sum + item.quantity, 0);
  };

  const isProductInCart = (productId) => {
    if (!cart?.items) return false;
    return cart.items.some(item => item.product === productId);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        isUpdating,
        addToCart,
        updateQuantity,
        clearCart,
        fetchCart,
        getCartTotal,
        getCartItemCount,
        isProductInCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};