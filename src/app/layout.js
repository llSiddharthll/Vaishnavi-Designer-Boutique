import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/lib/auth-context";
import { CartProvider } from "@/lib/cart-context";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import PageLoader from "@/components/page-loader";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Vaishnavi Designer Boutique - Elegant Fashion for Modern Women",
  description: "Discover our exclusive collection of designer clothing that combines timeless elegance with contemporary style. Shop the latest trends in women's fashion.",
  keywords: "boutique, designer clothing, women's fashion, elegant dresses, fashion store",
  authors: [{ name: "Vaishnavi Designer Boutique" }],
  openGraph: {
    title: "Vaishnavi Designer Boutique",
    description: "Elegant designs for the modern woman",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <CartProvider>
              <div className="min-h-screen flex flex-col">
                <Navigation />
                <main className="flex-1">
                  {children}
                </main>
                <Footer />
              </div>
              <Toaster />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
