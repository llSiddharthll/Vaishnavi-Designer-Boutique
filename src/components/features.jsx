import { Card, CardContent } from "@/components/ui/card"
import { Shield, Truck, Heart, Star, Clock, Users } from "lucide-react"

const features = [
  {
    id: 1,
    title: "Premium Quality",
    description: "Every piece is crafted with the finest materials and attention to detail, ensuring lasting beauty and comfort.",
    icon: Star,
    color: "from-yellow-400 to-orange-400",
    bgColor: "from-yellow-50 to-orange-50",
    darkBgColor: "from-yellow-900/20 to-orange-900/20"
  },
  {
    id: 2,
    title: "Free Shipping",
    description: "Enjoy complimentary shipping on all orders over $100. Fast and secure delivery to your doorstep.",
    icon: Truck,
    color: "from-blue-400 to-indigo-400",
    bgColor: "from-blue-50 to-indigo-50",
    darkBgColor: "from-blue-900/20 to-indigo-900/20"
  },
  {
    id: 3,
    title: "Secure Shopping",
    description: "Your security is our priority. All transactions are protected with bank-level encryption.",
    icon: Shield,
    color: "from-green-400 to-emerald-400",
    bgColor: "from-green-50 to-emerald-50",
    darkBgColor: "from-green-900/20 to-emerald-900/20"
  },
  {
    id: 4,
    title: "Personal Styling",
    description: "Get personalized fashion advice from our expert stylists to find your perfect look.",
    icon: Heart,
    color: "from-pink-400 to-rose-400",
    bgColor: "from-pink-50 to-rose-50",
    darkBgColor: "from-pink-900/20 to-rose-900/20"
  },
  {
    id: 5,
    title: "24/7 Support",
    description: "Our customer service team is available around the clock to assist you with any questions.",
    icon: Clock,
    color: "from-purple-400 to-violet-400",
    bgColor: "from-purple-50 to-violet-50",
    darkBgColor: "from-purple-900/20 to-violet-900/20"
  },
  {
    id: 6,
    title: "Community",
    description: "Join our vibrant community of fashion enthusiasts and share your style journey with us.",
    icon: Users,
    color: "from-indigo-400 to-blue-400",
    bgColor: "from-indigo-50 to-blue-50",
    darkBgColor: "from-indigo-900/20 to-blue-900/20"
  }
]

export function Features() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 rounded-full px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            <span>✨</span>
            <span>Why Choose Us</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold">
            Experience{" "}
            <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Excellence
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We're committed to providing you with the best shopping experience, from premium quality products to exceptional customer service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <Card 
                key={feature.id} 
                className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-8 space-y-6">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.bgColor} dark:${feature.darkBgColor} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center shadow-lg`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-pink-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Decorative elements */}
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-full animate-pulse-delay"></div>
                    <div className="w-2 h-2 bg-gradient-to-br from-indigo-400 to-blue-400 rounded-full animate-pulse-delay-2"></div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Additional info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-2xl px-8 py-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">100%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Satisfaction</div>
            </div>
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">30-Day</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Returns</div>
            </div>
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">24/7</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
