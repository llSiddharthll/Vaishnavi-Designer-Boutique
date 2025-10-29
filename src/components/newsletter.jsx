import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Gift, Sparkles, Star } from "lucide-react"

export function Newsletter() {
  return (
    <section className="py-20 pt-0 bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-16 h-16 bg-gradient-to-br from-pink-300 to-purple-300 dark:from-pink-600 dark:to-purple-600 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-20 right-20 w-12 h-12 bg-gradient-to-br from-purple-300 to-pink-300 dark:from-purple-600 dark:to-pink-600 rounded-full opacity-15 animate-float-delay"></div>
        <div className="absolute bottom-20 left-1/3 w-8 h-8 bg-gradient-to-br from-indigo-300 to-purple-300 dark:from-indigo-600 dark:to-purple-600 rounded-full opacity-25 animate-float-delay-2"></div>
        <div className="absolute bottom-10 right-1/4 w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-400 dark:from-pink-500 dark:to-rose-500 rounded-full opacity-20 animate-pulse-slow"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-2xl overflow-hidden">
            <CardContent className="p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Content */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 rounded-full px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                      <Mail className="h-4 w-4 text-pink-500" />
                      <span>Stay Updated</span>
                    </div>
                    
                    <h2 className="text-3xl lg:text-4xl font-bold">
                      Get{" "}
                      <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                        Exclusive Offers
                      </span>
                    </h2>
                    
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                      Subscribe to our newsletter and be the first to know about new collections, exclusive discounts, and fashion tips. Join our community of fashion enthusiasts!
                    </p>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-full flex items-center justify-center">
                        <Star className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">Early access to new collections</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center">
                        <Gift className="h-4 w-4 text-pink-600 dark:text-pink-400" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">Exclusive member-only discounts</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full flex items-center justify-center">
                        <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">Fashion tips and style guides</span>
                    </div>
                  </div>
                </div>

                {/* Newsletter Form */}
                <div className="space-y-6">
                  <div className="text-center lg:text-left">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Join Our Newsletter
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Get 10% off your first order when you subscribe!
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Input 
                        type="email" 
                        placeholder="Enter your email address" 
                        className="h-12 text-lg border-2 border-gray-200 dark:border-gray-700 focus:border-pink-500 dark:focus:border-pink-500 rounded-full px-6"
                      />
                    </div>
                    
                    <Button 
                      className="w-full h-12 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                      Subscribe Now
                    </Button>
                  </div>

                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center lg:text-left">
                    By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
                  </p>

                  {/* Social proof */}
                  <div className="flex items-center justify-center lg:justify-start space-x-4 pt-4">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-bold text-white">S</div>
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-300 to-indigo-300 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-bold text-white">P</div>
                      <div className="w-8 h-8 bg-gradient-to-br from-indigo-300 to-blue-300 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-bold text-white">E</div>
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-300 to-green-300 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-bold text-white">M</div>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Join 2,000+ fashion lovers
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
