import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, ExternalLink, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ReactMarkdown from "react-markdown";
import { getGuideBySlug, allGuides, categoryColors } from "@/data/resources";

interface ResourcePageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all guides
export async function generateStaticParams() {
  return allGuides.map((guide) => ({
    slug: guide.slug,
  }));
}

export default async function ResourcePage({ params }: ResourcePageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  // Get related guides (same category, excluding current)
  const relatedGuides = allGuides
    .filter((g) => g.category === guide.category && g.slug !== guide.slug)
    .slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back button */}
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/resources">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Resources
        </Link>
      </Button>

      {/* Header */}
      <div className="mb-8">
        <Badge className={categoryColors[guide.category] || ""}>{guide.category}</Badge>
        <h1 className="text-4xl font-bold mb-4 mt-4">{guide.title}</h1>
        <p className="text-lg text-muted-foreground mb-4">{guide.description}</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{guide.readTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{new Date(guide.publishedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* External Links */}
      {guide.externalLinks && guide.externalLinks.length > 0 && (
        <Card className="mb-8 bg-purple-500/5 border-purple-500/20">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium mb-3 text-purple-400">
              📚 Related Resources
            </h3>
            <div className="flex flex-wrap gap-2">
              {guide.externalLinks.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm bg-background/50 hover:bg-background px-3 py-1.5 rounded-full border border-purple-500/20 hover:border-purple-500/40 transition-colors"
                >
                  {link.title}
                  <ExternalLink className="h-3 w-3" />
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Separator className="mb-8" />

      {/* Content */}
      <article className="prose prose-invert prose-purple max-w-none">
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <h1 className="text-3xl font-bold mb-6 text-white">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-2xl font-semibold mt-10 mb-4 text-white border-b border-purple-500/20 pb-2">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-xl font-semibold mt-8 mb-3 text-white">
                {children}
              </h3>
            ),
            h4: ({ children }) => (
              <h4 className="text-lg font-semibold mt-6 mb-2 text-white">
                {children}
              </h4>
            ),
            p: ({ children }) => (
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {children}
              </p>
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2 ml-4">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside text-muted-foreground mb-4 space-y-2 ml-4">
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="text-muted-foreground">{children}</li>
            ),
            code: ({ className, children }) => {
              const isInline = !className;
              if (isInline) {
                return (
                  <code className="bg-purple-500/20 text-purple-400 px-1.5 py-0.5 rounded text-sm font-mono">
                    {children}
                  </code>
                );
              }
              return (
                <code className="block text-sm font-mono">{children}</code>
              );
            },
            pre: ({ children }) => (
              <pre className="bg-black/50 border border-purple-500/20 rounded-lg p-4 overflow-x-auto mb-6 text-sm">
                {children}
              </pre>
            ),
            strong: ({ children }) => (
              <strong className="text-white font-semibold">{children}</strong>
            ),
            em: ({ children }) => (
              <em className="text-purple-300 italic">{children}</em>
            ),
            a: ({ href, children }) => (
              <Link
                href={href || "#"}
                className="text-purple-400 hover:text-purple-300 underline underline-offset-2"
              >
                {children}
              </Link>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-purple-500 pl-4 italic text-muted-foreground my-6 bg-purple-500/5 py-2 rounded-r">
                {children}
              </blockquote>
            ),
            hr: () => <Separator className="my-8" />,
            table: ({ children }) => (
              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse border border-purple-500/20 rounded-lg">
                  {children}
                </table>
              </div>
            ),
            th: ({ children }) => (
              <th className="border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-left text-white font-semibold">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="border border-purple-500/20 px-4 py-2 text-muted-foreground">
                {children}
              </td>
            ),
          }}
        >
          {guide.content}
        </ReactMarkdown>
      </article>

      {/* Share */}
      <Card glow className="mt-12">
        <CardContent className="p-6 flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="font-medium mb-1">Found this helpful?</p>
            <p className="text-sm text-muted-foreground">
              Share it with others who might benefit.
            </p>
          </div>
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </CardContent>
      </Card>

      {/* Related Guides */}
      {relatedGuides.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-6">More in {guide.category}</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {relatedGuides.map((related) => (
              <Link key={related.slug} href={`/resources/${related.slug}`}>
                <Card className="h-full hover:border-purple-500/40 transition-all group">
                  <CardContent className="p-4">
                    <Badge
                      className={`${categoryColors[related.category] || ""} mb-2`}
                    >
                      {related.category}
                    </Badge>
                    <h3 className="font-medium group-hover:text-purple-400 transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-2">
                      {related.readTime}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <Card glow className="mt-12">
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-bold mb-2">Still stuck?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Get personalized help from experienced developers on CoderVibez.
          </p>
          <Button asChild>
            <Link href="/post-project">Post Your Project</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
