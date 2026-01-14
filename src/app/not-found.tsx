import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-purple-500 blur-3xl opacity-20" />
          <h1 className="relative text-9xl font-bold text-gradient">404</h1>
        </div>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Oops! Looks like this page got lost in the vibe coding dimension. 
          The AI must have hallucinated this route.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/marketplace">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Browse Projects
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
