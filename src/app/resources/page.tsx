import Link from "next/link";
import {
  BookOpen,
  ArrowRight,
  Clock,
  Eye,
  ExternalLink,
  Filter,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  allGuides,
  getFeaturedGuide,
  getGridGuides,
  categoryColors,
  externalResources,
  resourceCategories,
} from "@/data/resources";

export default function ResourcesPage() {
  const featuredGuide = getFeaturedGuide();
  const gridGuides = getGridGuides();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <Badge variant="purple" className="mb-4">
          <BookOpen className="mr-2 h-4 w-4" />
          Free Resources
        </Badge>
        <h1 className="text-4xl font-bold mb-4">
          Learn to Debug <span className="text-gradient">AI Code</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Comprehensive guides to help you understand, fix, and improve AI-generated
          code. Written by developers who've seen it all.
        </p>
      </div>

      <Tabs defaultValue="guides" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
          <TabsTrigger value="guides">Guides</TabsTrigger>
          <TabsTrigger value="resources">External Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="guides">
          {/* Featured Guide */}
          {featuredGuide && (
            <Card glow className="mb-12 overflow-hidden">
              <div className="grid md:grid-cols-2">
                <CardContent className="p-8">
                  <Badge variant="neon" className="mb-4">
                    Featured Guide
                  </Badge>
                  <h2 className="text-2xl font-bold mb-4">
                    {featuredGuide.title}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {featuredGuide.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{featuredGuide.readTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{featuredGuide.views.toLocaleString()} views</span>
                    </div>
                  </div>
                  <Button asChild>
                    <Link href={`/resources/${featuredGuide.slug}`}>
                      Read Guide
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
                <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 p-8 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-purple-500 rounded-full blur-3xl opacity-30" />
                    <div className="relative text-8xl">🚀</div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Category Filter Badges */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {Object.keys(categoryColors).map((category) => {
              const count = allGuides.filter((g) => g.category === category).length;
              if (count === 0) return null;
              return (
                <Badge
                  key={category}
                  className={`${categoryColors[category]} cursor-default`}
                >
                  {category} ({count})
                </Badge>
              );
            })}
          </div>

          {/* Guides Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gridGuides.map((guide) => (
              <Link key={guide.slug} href={`/resources/${guide.slug}`}>
                <Card
                  glow
                  className="h-full hover:border-purple-500/40 transition-all group"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="bg-gradient-to-br from-purple-600 to-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                        <guide.icon className="h-6 w-6 text-white" />
                      </div>
                      <Badge className={categoryColors[guide.category] || ""}>
                        {guide.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg group-hover:text-purple-400 transition-colors">
                      {guide.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {guide.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{guide.readTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>{guide.views.toLocaleString()} views</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources">
          {/* External Resources */}
          <div className="space-y-8">
            {resourceCategories.map((category) => {
              const categoryResources = externalResources.filter(
                (r) => r.category === category
              );
              if (categoryResources.length === 0) return null;

              return (
                <div key={category}>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Filter className="h-5 w-5 text-purple-400" />
                    {category}
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoryResources.map((resource) => (
                      <a
                        key={resource.url}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <Card className="h-full hover:border-purple-500/40 transition-all group">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <div className="bg-purple-500/20 p-2 rounded-lg flex-shrink-0">
                                <resource.icon className="h-5 w-5 text-purple-400" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-medium text-sm group-hover:text-purple-400 transition-colors truncate">
                                    {resource.title}
                                  </h3>
                                  <ExternalLink className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                                </div>
                                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                  {resource.description}
                                </p>
                                <Badge
                                  variant="outline"
                                  className="mt-2 text-xs capitalize"
                                >
                                  {resource.type}
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>

      {/* CTA */}
      <Card glow className="mt-12">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Need Help With Your Project?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            If these guides don't solve your issue, post your project on CoderVibez
            and get help from experienced developers who specialize in fixing
            AI-generated code.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/post-project">Post a Project</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/marketplace">Browse Developers</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
