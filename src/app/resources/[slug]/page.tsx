import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Eye, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ReactMarkdown from "react-markdown";

// Static guide content - in production, this could come from a CMS or database
const guides: Record<string, { title: string; category: string; content: string; readTime: string; publishedAt: string }> = {
  "cursor-bugs": {
    title: "Top 10 Common Cursor Bugs & How to Fix Them",
    category: "Debugging",
    readTime: "8 min read",
    publishedAt: "2024-01-15",
    content: `
# Top 10 Common Cursor Bugs & How to Fix Them

Cursor AI is an incredibly powerful tool for accelerating development, but like all AI coding assistants, it can produce code with subtle issues. Here are the most common problems we see and how to fix them.

## 1. Incorrect Import Paths

**The Problem:** Cursor often generates imports that look correct but reference the wrong path or non-existent modules.

**The Fix:**
- Always verify import paths exist in your project
- Use TypeScript's strict mode to catch missing imports at compile time
- Configure path aliases in \`tsconfig.json\` for cleaner imports

\`\`\`typescript
// Instead of relative paths that break easily
import { Button } from '../../../components/ui/button';

// Use path aliases
import { Button } from '@/components/ui/button';
\`\`\`

## 2. Missing Error Handling

**The Problem:** AI-generated code often has the "happy path" but lacks proper error handling.

**The Fix:**
- Always wrap async operations in try-catch
- Add loading and error states to UI components
- Use error boundaries in React applications

\`\`\`typescript
// Bad: No error handling
const data = await fetchData();
setData(data);

// Good: Proper error handling
try {
  setLoading(true);
  const data = await fetchData();
  setData(data);
} catch (error) {
  setError(error.message);
} finally {
  setLoading(false);
}
\`\`\`

## 3. Stale Closure Issues

**The Problem:** Cursor-generated React hooks often capture stale values.

**The Fix:**
- Include all dependencies in useEffect/useCallback dependency arrays
- Use functional updates for state that depends on previous values
- Consider using useRef for values that shouldn't trigger re-renders

## 4. Type Mismatches

**The Problem:** Generated TypeScript often has loose or incorrect types.

**The Fix:**
- Enable strict mode in tsconfig
- Avoid using \`any\` type - use \`unknown\` if type is truly unknown
- Create proper interfaces for API responses

## 5. Memory Leaks in useEffect

**The Problem:** Missing cleanup functions in effects that subscribe to events or timers.

**The Fix:**
- Always return a cleanup function from useEffect
- Cancel any pending async operations
- Remove event listeners on unmount

## 6. Incorrect Async/Await Usage

**The Problem:** Mixing promises and async/await incorrectly, or missing await keywords.

**The Fix:**
- Be consistent - prefer async/await over .then()
- Always await promises before using their values
- Use Promise.all for parallel async operations

## 7. Hardcoded Values

**The Problem:** API URLs, credentials, and configuration hardcoded into the code.

**The Fix:**
- Use environment variables for all configuration
- Never commit secrets to version control
- Use different .env files for development and production

## 8. Missing Loading States

**The Problem:** UI doesn't show any indication while data is being fetched.

**The Fix:**
- Add loading states to all data-fetching components
- Use skeleton loaders for better UX
- Disable buttons during form submissions

## 9. Incorrect Form Handling

**The Problem:** Forms missing validation, not preventing default behavior, or not handling all states.

**The Fix:**
- Use form libraries like react-hook-form with zod validation
- Always prevent default form submission
- Show validation errors inline
- Handle submission success and failure states

## 10. Missing Accessibility

**The Problem:** Generated UI often lacks proper ARIA labels and keyboard navigation.

**The Fix:**
- Use semantic HTML elements
- Add aria-labels to interactive elements
- Ensure keyboard navigation works
- Test with screen readers

## Conclusion

While Cursor accelerates development significantly, always review the generated code for these common issues. The best approach is to use Cursor as a starting point, then apply these fixes before shipping to production.

---

*Need help fixing a specific bug in your Cursor-generated code? [Post a project on CoderVibez](/post-project) and get expert help.*
    `,
  },
  "v0-ui-debugging": {
    title: "How to Debug v0-Generated UI Components",
    category: "UI/UX",
    readTime: "12 min read",
    publishedAt: "2024-01-20",
    content: `
# How to Debug v0-Generated UI Components

v0 by Vercel creates beautiful UI components, but they often need refinement before production use. Here's how to debug and improve v0-generated code.

## Common v0 Issues

### 1. Styling Conflicts

v0 generates Tailwind CSS, but sometimes the generated classes conflict with existing styles.

**Solution:** Use the Tailwind \`@apply\` directive or CSS modules to isolate styles.

### 2. Responsive Design Gaps

Generated components often look great on desktop but break on mobile.

**Solution:** Test all components at various breakpoints and add responsive variants.

### 3. Missing Interactivity

v0 generates static markup that needs JavaScript for interactivity.

**Solution:** Add event handlers and state management where needed.

## Best Practices

1. Always test on multiple screen sizes
2. Check keyboard navigation
3. Verify color contrast ratios
4. Test with different content lengths

---

*Having trouble with a v0 component? [Get expert help on CoderVibez](/marketplace).*
    `,
  },
  "solana-wallet-setup": {
    title: "Solana Wallet Setup for Bounties",
    category: "Getting Started",
    readTime: "5 min read",
    publishedAt: "2024-01-10",
    content: `
# Solana Wallet Setup for Bounties

To participate in CoderVibez bounties, you'll need a Solana wallet. This guide walks you through setting up Phantom, the most popular Solana wallet.

## Step 1: Install Phantom

1. Go to [phantom.app](https://phantom.app)
2. Click "Download" and select your browser
3. Add the extension to your browser

## Step 2: Create Your Wallet

1. Click the Phantom icon in your browser
2. Select "Create New Wallet"
3. **Important:** Write down your recovery phrase and store it safely
4. Set a strong password

## Step 3: Fund Your Wallet

### For Testing (Devnet)
1. Switch to Devnet in Phantom settings
2. Use a [Solana faucet](https://faucet.solana.com) to get free devnet SOL

### For Production (Mainnet)
1. Purchase SOL on an exchange (Coinbase, Binance, etc.)
2. Withdraw to your Phantom wallet address

## Step 4: Connect to CoderVibez

1. Visit CoderVibez
2. Click "Connect Wallet" in the header
3. Select Phantom and approve the connection
4. Your balance will display in the header

## Security Tips

- Never share your recovery phrase
- Always verify transaction details before signing
- Use a hardware wallet for large amounts
- Enable additional Phantom security features

---

*Ready to earn SOL? [Browse open projects](/marketplace) and start bidding!*
    `,
  },
  "ai-hallucinations": {
    title: "Dealing with AI Hallucinations in Code",
    category: "Best Practices",
    readTime: "10 min read",
    publishedAt: "2024-01-18",
    content: `
# Dealing with AI Hallucinations in Code

AI coding assistants sometimes "hallucinate" - generating code that uses non-existent APIs, deprecated methods, or imaginary libraries. Here's how to identify and fix these issues.

## What Are Code Hallucinations?

Hallucinations occur when AI:
- References APIs that don't exist
- Uses deprecated syntax confidently
- Invents library methods
- Mixes concepts from different frameworks

## How to Spot Them

### 1. Verify Imports
If an import fails, the AI likely hallucinated the module.

### 2. Check Documentation
Always verify methods exist in official docs.

### 3. Use TypeScript
Type errors often catch hallucinated APIs early.

### 4. Test Early and Often
Don't wait until the end to run the code.

## Prevention Strategies

1. Be specific in prompts - mention library versions
2. Ask AI to explain its code choices
3. Use AI tools with access to current documentation
4. Cross-reference multiple AI suggestions

---

*Found a hallucination you can't fix? [Post it on CoderVibez](/post-project)!*
    `,
  },
  "promotion-tips": {
    title: "Promotion Tips for Vibe-Coded Apps",
    category: "Marketing",
    readTime: "15 min read",
    publishedAt: "2024-01-25",
    content: `
# Promotion Tips for Vibe-Coded Apps

So you've built an app with AI assistance - now how do you get users? Here's our guide to launching your vibe-coded creation.

## Before Launch

### 1. Polish the Core Experience
Fix the obvious bugs before showing anyone.

### 2. Create a Landing Page
Use v0 or similar to create a compelling landing page.

### 3. Record a Demo
Show, don't tell. A 60-second video is worth 1000 words.

## Launch Strategies

### Build in Public
Share your journey on Twitter/X. People love following along with vibe coding experiments.

### Product Hunt
Launch on Product Hunt for early adopter attention.

### Hacker News
If your product solves a developer problem, Show HN can drive significant traffic.

### Indie Hackers
Share your story and get feedback from fellow builders.

## Growth Tips

1. Focus on one acquisition channel first
2. Talk to users and iterate
3. Build features users actually ask for
4. Celebrate small wins publicly

---

*Need technical help before launch? [Find a developer on CoderVibez](/marketplace).*
    `,
  },
  "supabase-common-issues": {
    title: "Common Supabase Issues in AI-Generated Code",
    category: "Backend",
    readTime: "14 min read",
    publishedAt: "2024-01-22",
    content: `
# Common Supabase Issues in AI-Generated Code

Supabase is a popular choice for vibe coding, but AI tools often generate Supabase code with subtle issues. Here's what to watch for.

## 1. RLS Policy Problems

**Issue:** AI often forgets to enable Row Level Security or creates policies that are too permissive.

**Fix:**
\`\`\`sql
-- Always enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create specific policies
CREATE POLICY "Users can view own projects"
ON projects FOR SELECT
USING (auth.uid() = owner_id);
\`\`\`

## 2. Missing Auth Checks

**Issue:** Client-side code doesn't verify authentication before making requests.

**Fix:** Always check for a user session before protected operations.

## 3. Incorrect Real-time Subscriptions

**Issue:** Memory leaks from not unsubscribing or subscribing to wrong events.

**Fix:** Always clean up subscriptions in useEffect.

## 4. Type Mismatches

**Issue:** TypeScript types don't match the actual database schema.

**Fix:** Generate types from your Supabase schema:
\`\`\`bash
npx supabase gen types typescript
\`\`\`

---

*Stuck on a Supabase issue? [Get expert help](/post-project).*
    `,
  },
};

interface ResourcePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ResourcePage({ params }: ResourcePageProps) {
  const { slug } = await params;
  const guide = guides[slug];

  if (!guide) {
    notFound();
  }

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
        <Badge className="mb-4">{guide.category}</Badge>
        <h1 className="text-4xl font-bold mb-4">{guide.title}</h1>
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

      <Separator className="mb-8" />

      {/* Content */}
      <article className="prose prose-invert prose-purple max-w-none">
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <h1 className="text-3xl font-bold mb-6 text-white">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-xl font-semibold mt-6 mb-3 text-white">{children}</h3>
            ),
            p: ({ children }) => (
              <p className="text-muted-foreground mb-4 leading-relaxed">{children}</p>
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside text-muted-foreground mb-4 space-y-2">{children}</ol>
            ),
            code: ({ className, children }) => {
              const isInline = !className;
              if (isInline) {
                return (
                  <code className="bg-purple-500/20 text-purple-400 px-1.5 py-0.5 rounded text-sm">
                    {children}
                  </code>
                );
              }
              return (
                <code className="block bg-black/50 border border-purple-500/20 rounded-lg p-4 text-sm overflow-x-auto">
                  {children}
                </code>
              );
            },
            pre: ({ children }) => (
              <pre className="bg-black/50 border border-purple-500/20 rounded-lg p-4 overflow-x-auto mb-6">
                {children}
              </pre>
            ),
            strong: ({ children }) => (
              <strong className="text-white font-semibold">{children}</strong>
            ),
            a: ({ href, children }) => (
              <Link href={href || "#"} className="text-purple-400 hover:underline">
                {children}
              </Link>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-purple-500 pl-4 italic text-muted-foreground my-4">
                {children}
              </blockquote>
            ),
            hr: () => <Separator className="my-8" />,
          }}
        >
          {guide.content}
        </ReactMarkdown>
      </article>

      {/* Share */}
      <Card glow className="mt-12">
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="font-medium mb-1">Found this helpful?</p>
            <p className="text-sm text-muted-foreground">Share it with others who might benefit.</p>
          </div>
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
