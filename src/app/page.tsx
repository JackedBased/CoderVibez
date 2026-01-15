import Link from "next/link";
import {
  Zap,
  Code,
  Wallet,
  Users,
  ArrowRight,
  CheckCircle2,
  Bug,
  Sparkles,
  Shield,
  Clock,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: Bug,
    title: "Post Your Buggy Project",
    description:
      "Upload your AI-generated code that needs fixing. Add context about the tools you used and what's broken.",
  },
  {
    icon: Users,
    title: "Developers Bid on Fixes",
    description:
      "Experienced devs browse projects and submit competitive bids with estimated time and cost in SOL.",
  },
  {
    icon: Shield,
    title: "SOL Escrow Protection",
    description:
      "Bounties are locked in escrow. Funds release only when you approve the completed work.",
  },
  {
    icon: Sparkles,
    title: "Get Quality Fixes Fast",
    description:
      "Review submitted fixes, request changes if needed, and approve to release payment instantly.",
  },
];

const categories = [
  { name: "React Bugs", count: 234, color: "from-cyan-500 to-blue-500" },
  { name: "Supabase Issues", count: 156, color: "from-green-500 to-emerald-500" },
  { name: "AI Hallucinations", count: 189, color: "from-red-500 to-pink-500" },
  { name: "UI/UX Fixes", count: 312, color: "from-purple-500 to-violet-500" },
  { name: "Full-Stack Debug", count: 145, color: "from-orange-500 to-amber-500" },
  { name: "Mobile Tweaks", count: 98, color: "from-indigo-500 to-blue-500" },
];

const tools = [
  { name: "Cursor", projects: 450 },
  { name: "v0", projects: 380 },
  { name: "Bolt", projects: 290 },
  { name: "Claude", projects: 520 },
  { name: "Lovable", projects: 210 },
  { name: "Replit Agent", projects: 175 },
  { name: "Ideavo", projects: 180 },
];

const testimonials = [
  {
    quote:
      "I shipped my MVP in 2 days with Cursor, but had a nasty auth bug. CoderVibez connected me with a dev who fixed it in hours!",
    author: "Sarah Chen",
    role: "Indie Hacker",
    avatar: "SC",
  },
  {
    quote:
      "As a senior dev, I love helping vibe coders. The bounty system is fair, and I've made good SOL fixing AI-generated spaghetti code.",
    author: "Marcus Johnson",
    role: "Full-Stack Developer",
    avatar: "MJ",
  },
  {
    quote:
      "My v0 generated UI looked great but had accessibility issues. Found a specialist here who made it WCAG compliant for 0.5 SOL.",
    author: "Alex Rivera",
    role: "Product Designer",
    avatar: "AR",
  },
];

const stats = [
  { value: "20", label: "Projects Fixed" },
  { value: "9", label: "Active Developers" },
  { value: "◎ 9", label: "SOL Paid Out" },
  { value: "< 24h", label: "Avg. Fix Time" },
];

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/30 rounded-full blur-[100px] animate-pulse-slow" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/30 rounded-full blur-[100px] animate-pulse-slow delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-600/20 rounded-full blur-[120px] animate-pulse-slow delay-500" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center stagger-children">
            <Badge variant="neon" className="mb-6 px-4 py-1.5">
              <Zap className="w-4 h-4 mr-2" />
              The Vibe Coding Marketplace
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-gradient">Bringing Vibe Coders</span>
              <br />
              <span className="text-gradient">and Developers together</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Fix AI-generated bugs fast with{" "}
              <span className="text-purple-400 font-semibold">SOL bounties</span>.
              Post your broken prototype, get expert fixes, pay on approval.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="xl" className="group" asChild>
                <Link href="/signup">
                  Post Your Project
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild>
                <Link href="/marketplace">
                  <Code className="mr-2 h-5 w-5" />
                  Browse Bounties
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-gradient-cyan">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 border-t border-purple-500/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The <span className="text-red-400">Problem</span> with Vibe Coding
            </h2>
            <p className="text-lg text-muted-foreground">
              AI tools like Cursor, v0, and Claude let you build apps 10x faster.
              But they also generate subtle bugs, broken edge cases, and
              hallucinated code that's hard to debug alone.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card glow className="bg-red-500/5 border-red-500/20">
              <CardContent className="pt-6">
                <div className="text-red-400 mb-4">
                  <Bug className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Hidden Bugs</h3>
                <p className="text-sm text-muted-foreground">
                  AI-generated code often works in demos but breaks in production
                  with edge cases the AI didn't consider.
                </p>
              </CardContent>
            </Card>

            <Card glow className="bg-yellow-500/5 border-yellow-500/20">
              <CardContent className="pt-6">
                <div className="text-yellow-400 mb-4">
                  <Clock className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Time Sink</h3>
                <p className="text-sm text-muted-foreground">
                  Debugging AI code without deep expertise can take days. Your
                  momentum dies while you're stuck on mysterious errors.
                </p>
              </CardContent>
            </Card>

            <Card glow className="bg-purple-500/5 border-purple-500/20">
              <CardContent className="pt-6">
                <div className="text-purple-400 mb-4">
                  <Sparkles className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Hallucinations</h3>
                <p className="text-sm text-muted-foreground">
                  AI confidently writes code that uses non-existent APIs or
                  deprecated patterns. Looks right, doesn't work.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 border-t border-purple-500/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How <span className="text-gradient">CoderVibez</span> Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get your AI-generated code fixed by expert developers in four simple
              steps.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={feature.title} glow className="relative overflow-hidden">
                <CardContent className="pt-6">
                  <div className="absolute -top-4 -right-4 text-6xl font-bold text-purple-500/10">
                    {index + 1}
                  </div>
                  <div className="relative">
                    <div className="bg-gradient-to-br from-purple-600 to-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 border-t border-purple-500/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                Popular <span className="text-gradient">Categories</span>
              </h2>
              <p className="text-muted-foreground">
                Browse projects by the type of fix needed
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/marketplace">View All Categories</Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link key={category.name} href={`/marketplace?category=${category.name.toLowerCase().replace(' ', '-')}`}>
                <Card
                  glow
                  className="h-full hover:scale-105 transition-transform cursor-pointer"
                >
                  <CardContent className="p-4 text-center">
                    <div
                      className={`w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center`}
                    >
                      <Code className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-medium text-sm mb-1">{category.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {category.count} projects
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20 border-t border-purple-500/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tools We <span className="text-gradient">Support</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              No matter which AI coding tool you used, our developers can help fix
              the output.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {tools.map((tool) => (
              <Card
                key={tool.name}
                glow
                className="px-6 py-4 hover:scale-105 transition-transform"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">{tool.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {tool.projects} projects
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 border-t border-purple-500/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Loved by <span className="text-gradient">Vibe Coders</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Don't just take our word for it
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.author} glow className="relative">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">
                        {testimonial.author}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Teaser */}
      <section className="py-20 border-t border-purple-500/20">
        <div className="container mx-auto px-4">
          <Card glow className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10" />
            <CardContent className="relative py-12 px-6 md:px-12">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-xl">
                  <Badge variant="purple" className="mb-4">
                    Free Resources
                  </Badge>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Learn to Debug AI Code Like a Pro
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Access our free guides on common vibe coding pitfalls, debugging
                    strategies, and best practices for working with AI-generated
                    code.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Top 10 Cursor Bugs",
                      "v0 UI Debugging",
                      "Solana Setup Guide",
                    ].map((guide) => (
                      <Badge key={guide} variant="outline" className="text-xs">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        {guide}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button size="lg" asChild>
                  <Link href="/resources">
                    Explore Resources
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-purple-500/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to <span className="text-gradient">Ship Faster</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of vibe coders who've turned their broken prototypes
              into production-ready apps.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="xl" className="group" asChild>
                <Link href="/signup">
                  <Wallet className="mr-2 h-5 w-5" />
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild>
                <Link href="/marketplace">Browse Projects</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
