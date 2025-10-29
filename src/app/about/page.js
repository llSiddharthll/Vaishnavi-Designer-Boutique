import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Heart,
  Award,
  Users,
  Star,
  Sparkles,
  Target,
  Shield,
  Palette,
} from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Passion for Fashion",
    description:
      "We pour our heart into every design, creating pieces that make women feel confident and beautiful.",
  },
  {
    icon: Target,
    title: "Quality Craftsmanship",
    description:
      "Every garment is crafted with attention to detail, using premium materials and expert techniques.",
  },
  {
    icon: Shield,
    title: "Trust & Reliability",
    description:
      "Building lasting relationships with our customers through honest pricing and exceptional service.",
  },
  {
    icon: Palette,
    title: "Creative Excellence",
    description:
      "Pushing boundaries in design while maintaining timeless elegance that transcends trends.",
  },
];

const team = [
  {
    name: "Vaishnavi Sharma",
    role: "Founder & Lead Designer",
    image: "👩‍🎨",
    bio: "With over 10 years of experience in fashion design, Vaishnavi brings her unique vision and passion to every collection.",
  },
  {
    name: "Priya Patel",
    role: "Creative Director",
    image: "👩‍💼",
    bio: "Priya oversees the creative direction and ensures every piece meets our high standards of quality and style.",
  },
  {
    name: "Anjali Singh",
    role: "Head of Production",
    image: "👩‍🔧",
    bio: "Anjali manages our production process, ensuring each garment is crafted with precision and care.",
  },
];

const stats = [
  { number: "500+", label: "Happy Customers", icon: Users },
  { number: "50+", label: "Designer Pieces", icon: Sparkles },
  { number: "5+", label: "Years Experience", icon: Award },
  { number: "4.8", label: "Customer Rating", icon: Star },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <Badge variant="secondary" className="text-sm">
              Our Story
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold">
              <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                About
              </span>{" "}
              Vaishnavi Designer Boutique
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We are passionate about creating elegant, timeless fashion that
              empowers women to express their unique style and confidence.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="flex justify-center">
                  <stat.icon className="h-8 w-8 text-pink-500" />
                </div>
                <div className="text-3xl font-bold text-foreground">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold">
                Our{" "}
                <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Story
                </span>
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2019, Vaishnavi Designer Boutique began as a small
                  dream in the heart of a passionate designer. What started as a
                  home-based studio has grown into a beloved destination for
                  women seeking unique, elegant fashion that combines
                  contemporary trends with timeless sophistication.
                </p>
                <p>
                  Our journey has been driven by a simple yet powerful mission:
                  to create clothing that not only looks beautiful but makes
                  every woman feel confident, empowered, and uniquely herself.
                  We believe that fashion is more than just clothing—it's a form
                  of self-expression and empowerment.
                </p>
                <p>
                  Today, we're proud to serve hundreds of satisfied customers
                  who trust us to provide them with high-quality, designer
                  pieces that stand the test of time while embracing modern
                  elegance.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 rounded-2xl flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-pink-300 to-purple-300 dark:from-pink-600 dark:to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-4xl">🏪</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Our Boutique</h3>
                    <p className="text-sm text-muted-foreground">
                      Where elegance meets creativity
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Our{" "}
              <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Values
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do, from design to
              customer service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-center">
                    <value.icon className="h-12 w-12 text-pink-500" />
                  </div>
                  <h3 className="font-semibold text-lg">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Meet Our{" "}
              <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Team
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The passionate individuals behind every beautiful design and
              exceptional customer experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center">
                    <span className="text-3xl">{member.image}</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{member.name}</h3>
                    <p className="text-sm text-pink-600 font-medium">
                      {member.role}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {member.bio}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Our{" "}
              <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Mission
              </span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              To empower women through elegant, timeless fashion that celebrates
              individuality and confidence. We strive to create pieces that not
              only enhance beauty but also inspire self-assurance and personal
              expression in every woman who wears our designs.
            </p>
            <Separator className="my-8" />
            <p className="text-lg text-muted-foreground">
              Join us on this journey of style, elegance, and empowerment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
