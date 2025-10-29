"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "./axiosClient";
import { useRouter } from "next/navigation";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const router = useRouter();

  // Check if user is logged in
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Auth state check - Token:", token ? "exists" : "none");
        
        if (!token) {
          setLoading(false);
          return;
        }

        // Validate token format
        if (!/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/.test(token)) {
          console.error("Invalid token format");
          localStorage.removeItem("token");
          setLoading(false);
          return;
        }

        // Set token in axios defaults
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        
        // Try to get user data
        await fetchProfile();
      } catch (error) {
        console.error("Auth initialization error:", error);
        // Only clear auth if it's an authentication error
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          delete api.defaults.headers.common["Authorization"];
          setUser(null);
        }
        setAuthError(error.message);
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const fetchProfile = async () => {
    try {
      console.log("Fetching user profile...");
      const response = await api.get("/users/profile");
      console.log("Profile response:", response.data);
      setUser(response.data.user);
    } catch (error) {
      console.error("Error fetching profile:", error);
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setAuthError(null);
      console.log("Attempting login...");
      
      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      const response = await api.post("/auth/login", { email, password });
      console.log("Login response received");
      
      const { _id, name, email: userEmail, token } = response.data;
      
      if (!token || !_id) {
        throw new Error("Invalid response from server");
      }

      // Validate token format
      if (!/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/.test(token)) {
        throw new Error("Invalid token format received");
      }

      console.log("Login successful, setting token and user");
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      
      const userData = {
        _id,
        name,
        email: userEmail
      };
      
      setUser(userData);
      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = error.response?.data?.message || error.message || "Login failed";
      setAuthError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password
      });
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(user);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Registration failed"
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
    router.push("/");
  };

  const updateProfile = async (data) => {
    try {
      const response = await api.put("/users/profile", data);
      setUser(response.data.user);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Update failed"
      };
    }
  };

  const toggleWishlist = async (productId) => {
    try {
      const response = await api.post(`/users/wishlist/${productId}`);
      setUser(response.data.user);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to update wishlist"
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateProfile,
        toggleWishlist,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};