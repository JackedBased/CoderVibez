import Link from "next/link";
import { Github, Twitter } from "lucide-react";

const footerLinks = {
  product: [
    { label: "Marketplace", href: "/marketplace" },
    { label: "Post Project", href: "/post-project" },
    { label: "Resources", href: "/resources" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
  ],
  support: [
    { label: "Help Center", href: "/help" },
    { label: "Contact", href: "/contact" },
    { label: "Terms", href: "/terms" },
    { label: "Privacy", href: "/privacy" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-purple-500/20 bg-background/50 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center mb-4">
              <span className="text-xl font-semibold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Coder
              </span>
              <span className="text-xl font-semibold text-muted-foreground ml-1.5">
                Vibez&gt;
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Connecting vibe coders with expert developers. Fix AI bugs fast with SOL bounties.
            </p>
            <div className="flex gap-4">
              <a
                href="https://x.com/codervibez"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-purple-400 transition-colors"
                aria-label="Follow us on X (Twitter)"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/JackedBased/CoderVibez"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-purple-400 transition-colors"
                aria-label="View on GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-white">Product</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-purple-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-white">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-purple-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-white">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-purple-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-purple-500/20 mt-8 pt-8 space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} CoderVibez. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Built with{" "}
              <span className="text-purple-400">Next.js</span>,{" "}
              <span className="text-green-400">Supabase</span>, &{" "}
              <span className="text-cyan-400">Solana</span>
            </p>
          </div>
          <div className="flex justify-center">
            <a
              href="https://orynth.dev/projects/coder-vibez"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80"
              aria-label="Featured on Orynth"
            >
              <img
                src="https://orynth.dev/api/badge/coder-vibez?theme=dark&style=default"
                alt="Featured on Orynth"
                width="260"
                height="80"
                className="h-20 w-auto"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
