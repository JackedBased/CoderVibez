import {
  Bug,
  Code,
  Lightbulb,
  Wallet,
  Megaphone,
  BookOpen,
  MessageSquare,
  TestTube,
  Rocket,
  Shield,
  Zap,
  Database,
  type LucideIcon,
} from "lucide-react";

export interface Guide {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  category: string;
  readTime: string;
  views: number;
  publishedAt: string;
  featured?: boolean;
  content: string;
  externalLinks?: { title: string; url: string; description: string }[];
}

export const categoryColors: Record<string, string> = {
  Debugging: "bg-red-500/20 text-red-400",
  "UI/UX": "bg-purple-500/20 text-purple-400",
  "Best Practices": "bg-yellow-500/20 text-yellow-400",
  "Getting Started": "bg-green-500/20 text-green-400",
  Marketing: "bg-blue-500/20 text-blue-400",
  Backend: "bg-cyan-500/20 text-cyan-400",
  Prompting: "bg-pink-500/20 text-pink-400",
  Testing: "bg-orange-500/20 text-orange-400",
  Deployment: "bg-indigo-500/20 text-indigo-400",
  Security: "bg-rose-500/20 text-rose-400",
  Solana: "bg-emerald-500/20 text-emerald-400",
};

export const guides: Guide[] = [
  {
    slug: "vibe-coding-best-practices",
    title: "The Complete Guide to Vibe Coding Best Practices",
    description: "Master the art of working with AI coding tools. Learn how to prompt effectively, review generated code, and ship with confidence.",
    icon: Zap,
    category: "Best Practices",
    readTime: "25 min read",
    views: 5200,
    publishedAt: "2024-01-01",
    featured: true,
    externalLinks: [
      { title: "Cursor Documentation", url: "https://docs.cursor.com/", description: "Official Cursor AI docs" },
      { title: "Anthropic Prompt Engineering", url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering", description: "Claude prompting best practices" },
    ],
    content: `
# The Complete Guide to Vibe Coding Best Practices

Vibe coding—using AI tools like Cursor, Claude, and v0 to rapidly build applications—has revolutionized how we ship software. But with great power comes the need for great practices. This guide covers everything you need to know to vibe code effectively.

## What is Vibe Coding?

Vibe coding is the practice of using AI coding assistants to generate, modify, and debug code through natural language prompts. Instead of writing every line manually, you describe what you want and let the AI handle implementation details.

### Popular Vibe Coding Tools

- **Cursor** - AI-powered code editor built on VS Code
- **Claude** - Anthropic's AI assistant, excellent for code generation
- **v0** - Vercel's UI component generator
- **GitHub Copilot** - AI pair programmer
- **ChatGPT** - OpenAI's versatile assistant

## The Vibe Coding Workflow

### 1. Start with Clear Requirements

Before prompting, know what you want to build:

\`\`\`markdown
# Good: Specific requirements
"Create a React component that displays a user profile card with:
- Avatar image (circular, 64px)
- User name (bold, 18px)
- Email (gray, smaller text)
- Edit button that opens a modal
- Loading skeleton state"

# Bad: Vague requirements
"Make a user profile thing"
\`\`\`

### 2. Iterate in Small Steps

Don't try to generate an entire application at once:

1. Generate the basic structure
2. Add features incrementally
3. Test each addition
4. Refine and polish

### 3. Review Every Generation

AI code is a starting point, not the final product. Always review for:

- **Correctness**: Does it do what you asked?
- **Security**: Are there exposed secrets or vulnerabilities?
- **Performance**: Are there obvious inefficiencies?
- **Maintainability**: Can you understand and modify it?

## Prompting Strategies

### Be Specific About Tech Stack

\`\`\`markdown
# Good
"Using Next.js 14 App Router with TypeScript, create an API route 
that fetches user data from Supabase and returns it as JSON."

# Bad
"Create an API that gets users"
\`\`\`

### Provide Context

Include relevant code, file structure, or constraints:

\`\`\`markdown
"Given this existing User type:
\\\`\\\`\\\`typescript
interface User {
  id: string;
  email: string;
  name: string;
}
\\\`\\\`\\\`

Create a function that validates user input before saving."
\`\`\`

### Ask for Explanations

\`\`\`markdown
"Create a debounce function and explain how it works 
with comments in the code."
\`\`\`

## Common Pitfalls and How to Avoid Them

### 1. Trusting Without Verifying

**Problem**: Accepting AI-generated code without testing.

**Solution**: Run the code immediately. Test edge cases. Check for errors.

### 2. Prompt Drift

**Problem**: Losing track of what you've asked for across multiple prompts.

**Solution**: Summarize the current state before each new prompt.

### 3. Over-Engineering

**Problem**: AI tends to add complexity you don't need.

**Solution**: Ask for the "simplest solution" or "minimal implementation."

### 4. Ignoring Warnings

**Problem**: Dismissing TypeScript errors or linter warnings.

**Solution**: Fix all warnings before moving on. They often indicate real issues.

## Quality Checklist

Before shipping vibe-coded features, verify:

- [ ] All TypeScript errors resolved
- [ ] No hardcoded secrets or API keys
- [ ] Error handling for all async operations
- [ ] Loading states for data fetching
- [ ] Mobile responsiveness tested
- [ ] Accessibility basics (keyboard nav, ARIA labels)
- [ ] Edge cases handled (empty states, errors)

## When to Get Human Help

Vibe coding has limits. Consider getting expert help when:

- Security is critical (auth, payments)
- Performance optimization is needed
- Complex business logic is involved
- You've been stuck for hours
- The code "works" but you don't understand why

---

*That's where CoderVibez comes in. [Post your project](/post-project) and get help from developers who specialize in polishing AI-generated code.*
    `,
  },
  {
    slug: "cursor-bugs",
    title: "Top 10 Common Cursor Bugs & How to Fix Them",
    description: "Learn the most frequent issues that arise when using Cursor AI and quick solutions to get back on track.",
    icon: Bug,
    category: "Debugging",
    readTime: "8 min read",
    views: 2340,
    publishedAt: "2024-01-15",
    externalLinks: [
      { title: "Cursor Documentation", url: "https://docs.cursor.com/", description: "Official Cursor docs" },
      { title: "Cursor GitHub Issues", url: "https://github.com/getcursor/cursor/issues", description: "Report bugs and find solutions" },
    ],
    content: `
# Top 10 Common Cursor Bugs & How to Fix Them

Cursor AI is an incredibly powerful tool for accelerating development, but like all AI coding assistants, it can produce code with subtle issues. Here are the most common problems and how to fix them.

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
  console.error('Fetch failed:', error);
  setError(error instanceof Error ? error.message : 'Unknown error');
} finally {
  setLoading(false);
}
\`\`\`

## 3. Stale Closure Issues in React

**The Problem:** Cursor-generated React hooks often capture stale values.

**The Fix:**
\`\`\`typescript
// Bad: count is stale
useEffect(() => {
  const interval = setInterval(() => {
    setCount(count + 1); // Always uses initial count
  }, 1000);
  return () => clearInterval(interval);
}, []); // Missing dependency

// Good: Use functional update
useEffect(() => {
  const interval = setInterval(() => {
    setCount(prev => prev + 1); // Always uses latest
  }, 1000);
  return () => clearInterval(interval);
}, []);
\`\`\`

## 4. Type Mismatches

**The Problem:** Generated TypeScript often has loose or incorrect types.

**The Fix:**
- Enable strict mode in tsconfig.json
- Avoid using \`any\` type
- Create proper interfaces for API responses

\`\`\`json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
\`\`\`

## 5. Memory Leaks in useEffect

**The Problem:** Missing cleanup functions in effects.

**The Fix:**
\`\`\`typescript
useEffect(() => {
  const controller = new AbortController();
  
  fetchData({ signal: controller.signal })
    .then(setData)
    .catch(err => {
      if (err.name !== 'AbortError') setError(err);
    });
  
  // Cleanup: cancel pending request
  return () => controller.abort();
}, []);
\`\`\`

## 6. Incorrect Async/Await Usage

**The Problem:** Mixing promises and async/await incorrectly.

**The Fix:**
\`\`\`typescript
// Bad: Mixing styles
async function getData() {
  return fetch('/api/data').then(r => r.json());
}

// Good: Consistent async/await
async function getData() {
  const response = await fetch('/api/data');
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
}
\`\`\`

## 7. Hardcoded Values

**The Problem:** API URLs, credentials, and configuration hardcoded.

**The Fix:**
\`\`\`typescript
// Bad
const API_URL = 'https://api.example.com';
const API_KEY = 'sk-1234567890';

// Good
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.API_KEY; // Server-side only
\`\`\`

## 8. Missing Loading States

**The Problem:** UI doesn't show loading indicators.

**The Fix:**
\`\`\`typescript
function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  if (loading) return <Skeleton />;
  if (error) return <ErrorMessage message={error} />;
  if (users.length === 0) return <EmptyState />;
  
  return <UserGrid users={users} />;
}
\`\`\`

## 9. Incorrect Form Handling

**The Problem:** Forms missing validation or not preventing default.

**The Fix:**
\`\`\`typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault(); // Don't forget this!
  
  if (!validateForm()) return;
  
  setSubmitting(true);
  try {
    await submitData(formData);
    toast.success('Saved!');
  } catch (error) {
    toast.error('Failed to save');
  } finally {
    setSubmitting(false);
  }
};
\`\`\`

## 10. Missing Accessibility

**The Problem:** Generated UI lacks proper ARIA labels.

**The Fix:**
\`\`\`tsx
// Bad
<button onClick={handleClose}>×</button>

// Good
<button 
  onClick={handleClose}
  aria-label="Close dialog"
  className="..."
>
  <X className="h-4 w-4" />
  <span className="sr-only">Close</span>
</button>
\`\`\`

---

*Need help fixing a specific Cursor bug? [Post a project on CoderVibez](/post-project) and get expert assistance.*
    `,
  },
  {
    slug: "v0-ui-debugging",
    title: "How to Debug v0-Generated UI Components",
    description: "Step-by-step guide to identifying and fixing common issues in UI components generated by v0.",
    icon: Code,
    category: "UI/UX",
    readTime: "12 min read",
    views: 1890,
    publishedAt: "2024-01-20",
    externalLinks: [
      { title: "v0 by Vercel", url: "https://v0.dev", description: "Generate UI with AI" },
      { title: "shadcn/ui", url: "https://ui.shadcn.com/", description: "Component library used by v0" },
      { title: "Tailwind CSS", url: "https://tailwindcss.com/docs", description: "Utility-first CSS framework" },
    ],
    content: `
# How to Debug v0-Generated UI Components

v0 by Vercel creates beautiful UI components using shadcn/ui and Tailwind CSS. However, generated components often need refinement before production use. Here's how to debug and improve v0 code.

## Understanding v0 Output

v0 generates React components using:
- **shadcn/ui** - Accessible component primitives
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Headless UI primitives
- **Lucide React** - Icon library

## Common v0 Issues and Fixes

### 1. Missing Component Imports

**Problem:** v0 uses shadcn/ui components that may not be installed.

**Solution:**
\`\`\`bash
# Install missing components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
\`\`\`

### 2. Styling Conflicts

**Problem:** Generated Tailwind classes conflict with existing styles.

**Solution:** Use CSS layers or component-specific prefixes:
\`\`\`css
/* globals.css */
@layer components {
  .v0-card {
    @apply rounded-lg border bg-card text-card-foreground shadow-sm;
  }
}
\`\`\`

### 3. Responsive Design Gaps

**Problem:** Components look great on desktop but break on mobile.

**Solution:** Add responsive variants:
\`\`\`tsx
// Before: Fixed width
<div className="w-[400px]">

// After: Responsive
<div className="w-full max-w-[400px] md:w-[400px]">
\`\`\`

### 4. Dark Mode Issues

**Problem:** Colors don't adapt to dark mode.

**Solution:** Use CSS variables or dark: variants:
\`\`\`tsx
// Bad: Hardcoded colors
<p className="text-gray-600">

// Good: Theme-aware
<p className="text-muted-foreground">

// Or explicit dark mode
<p className="text-gray-600 dark:text-gray-400">
\`\`\`

### 5. Missing Interactivity

**Problem:** v0 generates static markup without state.

**Solution:** Add React state and handlers:
\`\`\`tsx
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <Button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </Button>
  );
}
\`\`\`

### 6. Accessibility Gaps

**Problem:** Missing ARIA attributes or keyboard navigation.

**Solution:**
\`\`\`tsx
// Add proper accessibility
<Dialog>
  <DialogTrigger asChild>
    <Button aria-haspopup="dialog">Open</Button>
  </DialogTrigger>
  <DialogContent aria-describedby="dialog-description">
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription id="dialog-description">
        Description for screen readers
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
\`\`\`

## v0 Best Practices

### 1. Be Specific in Prompts

\`\`\`markdown
# Good prompt
"Create a pricing card with:
- 3 tiers (Basic, Pro, Enterprise)
- Monthly/yearly toggle
- Feature comparison list
- CTA buttons
- Dark mode support
- Mobile responsive"

# Bad prompt
"Make a pricing page"
\`\`\`

### 2. Iterate on Generations

Don't accept the first generation. Ask v0 to:
- "Make it more compact"
- "Add hover states"
- "Improve mobile layout"
- "Add loading skeleton"

### 3. Extract Reusable Components

v0 often generates monolithic components. Break them down:

\`\`\`tsx
// Instead of one huge component
function PricingSection() { /* 200 lines */ }

// Break into smaller pieces
function PricingCard({ tier }: { tier: Tier }) {}
function PricingToggle({ yearly, onChange }) {}
function FeatureList({ features }: { features: string[] }) {}
\`\`\`

## Testing v0 Components

### Visual Testing Checklist

- [ ] Desktop (1920px, 1440px, 1280px)
- [ ] Tablet (768px)
- [ ] Mobile (375px, 320px)
- [ ] Dark mode
- [ ] Light mode
- [ ] With long content
- [ ] With minimal content
- [ ] Loading state
- [ ] Error state
- [ ] Empty state

### Accessibility Testing

1. Navigate with keyboard only (Tab, Enter, Escape)
2. Test with screen reader (VoiceOver, NVDA)
3. Check color contrast (4.5:1 minimum)
4. Verify focus indicators are visible

---

*Having trouble with a v0 component? [Get expert help on CoderVibez](/marketplace).*
    `,
  },
  {
    slug: "ai-hallucinations",
    title: "Dealing with AI Hallucinations in Code",
    description: "Understand why AI sometimes generates non-existent APIs and how to spot and fix these issues.",
    icon: Lightbulb,
    category: "Best Practices",
    readTime: "10 min read",
    views: 3120,
    publishedAt: "2024-01-18",
    externalLinks: [
      { title: "Anthropic Documentation", url: "https://docs.anthropic.com/", description: "Claude AI documentation" },
      { title: "OpenAI Best Practices", url: "https://platform.openai.com/docs/guides/prompt-engineering", description: "Prompt engineering guide" },
    ],
    content: `
# Dealing with AI Hallucinations in Code

AI coding assistants sometimes "hallucinate"—generating code that uses non-existent APIs, deprecated methods, or imaginary libraries. Here's how to identify and fix these issues.

## What Are Code Hallucinations?

Hallucinations occur when AI confidently generates code that:
- References APIs that don't exist
- Uses deprecated syntax as if it's current
- Invents library methods or parameters
- Mixes concepts from different frameworks
- Creates plausible-looking but non-functional code

## Real Examples

### Invented API Methods

\`\`\`typescript
// AI hallucination: This method doesn't exist
const user = await supabase.auth.getUserByEmail(email);

// Actual Supabase API
const { data } = await supabase
  .from('users')
  .select('*')
  .eq('email', email)
  .single();
\`\`\`

### Mixed Framework Syntax

\`\`\`typescript
// AI mixing Next.js App Router and Pages Router
// This won't work in App Router
export async function getServerSideProps() {
  // ...
}

// Correct App Router approach
async function Page() {
  const data = await fetchData(); // Direct async in component
  return <div>{data}</div>;
}
\`\`\`

### Deprecated Methods

\`\`\`typescript
// AI using deprecated React patterns
componentWillMount() { // Deprecated
  this.fetchData();
}

// Modern approach
useEffect(() => {
  fetchData();
}, []);
\`\`\`

## How to Spot Hallucinations

### 1. TypeScript Errors

TypeScript is your first line of defense:
\`\`\`
Property 'getUserByEmail' does not exist on type 'AuthClient'
\`\`\`

### 2. Runtime Errors

\`\`\`
TypeError: supabase.auth.getUserByEmail is not a function
\`\`\`

### 3. Import Failures

\`\`\`
Module '"@supabase/supabase-js"' has no exported member 'createClient2'
\`\`\`

### 4. Documentation Mismatch

If you can't find the method in official docs, it's likely hallucinated.

## Prevention Strategies

### 1. Specify Versions

\`\`\`markdown
"Using Next.js 14.1 with App Router and Supabase JS v2.39,
create a function to fetch user data."
\`\`\`

### 2. Ask for Documentation Links

\`\`\`markdown
"Create a Supabase query and include a link to the 
relevant documentation for each method used."
\`\`\`

### 3. Request Explanations

\`\`\`markdown
"Create this function and add comments explaining 
why each method is used and what it does."
\`\`\`

### 4. Verify Immediately

Run the code right after generation. Don't accumulate unverified code.

### 5. Cross-Reference

Check multiple sources:
- Official documentation
- GitHub repository
- Stack Overflow
- Another AI tool

## Fixing Hallucinations

### Step 1: Identify the Correct API

Search the official docs for similar functionality:
\`\`\`
site:supabase.com/docs get user by email
\`\`\`

### Step 2: Ask AI to Correct

\`\`\`markdown
"The method 'getUserByEmail' doesn't exist in Supabase.
Looking at the docs, I should use a query on the users table.
Please rewrite using the correct Supabase v2 API."
\`\`\`

### Step 3: Test Thoroughly

After fixing, test all edge cases:
- Valid input
- Invalid input
- Empty results
- Error conditions

## Common Hallucination Patterns

| Pattern | Example | Reality |
|---------|---------|---------|
| Invented methods | \`array.unique()\` | Use \`[...new Set(array)]\` |
| Wrong parameters | \`fetch(url, { mode: 'no-cors' })\` | May not work as expected |
| Deprecated APIs | \`componentWillMount\` | Use \`useEffect\` |
| Mixed frameworks | Next.js Pages + App Router | Choose one |
| Fake libraries | \`import { magic } from 'utils'\` | Verify package exists |

---

*Found a hallucination you can't fix? [Post it on CoderVibez](/post-project) and get expert help!*
    `,
  },
  {
    slug: "solana-wallet-setup",
    title: "Solana Wallet Setup for Bounties",
    description: "Complete guide to setting up Phantom wallet and connecting it to CoderVibez for receiving and sending bounties.",
    icon: Wallet,
    category: "Solana",
    readTime: "5 min read",
    views: 4560,
    publishedAt: "2024-01-10",
    externalLinks: [
      { title: "Phantom Wallet", url: "https://phantom.app/", description: "Download Phantom" },
      { title: "Solana Faucet", url: "https://faucet.solana.com/", description: "Get devnet SOL for testing" },
      { title: "Solana Documentation", url: "https://solana.com/docs", description: "Official Solana docs" },
    ],
    content: `
# Solana Wallet Setup for Bounties

To participate in CoderVibez bounties, you'll need a Solana wallet. This guide walks you through setting up Phantom, the most popular Solana wallet.

## Why Solana?

CoderVibez uses Solana for bounties because:
- **Fast**: Transactions confirm in ~400ms
- **Cheap**: Fees are fractions of a cent
- **Secure**: Battle-tested blockchain security
- **Developer-friendly**: Great tooling and documentation

## Step 1: Install Phantom

### Browser Extension

1. Go to [phantom.app](https://phantom.app)
2. Click "Download" and select your browser
3. Add the extension to Chrome, Firefox, Brave, or Edge

### Mobile App

1. Download from [App Store](https://apps.apple.com/app/phantom-solana-wallet/id1598432977) or [Google Play](https://play.google.com/store/apps/details?id=app.phantom)
2. Create or import your wallet

## Step 2: Create Your Wallet

1. Click the Phantom icon in your browser
2. Select **"Create New Wallet"**
3. Create a strong password
4. **CRITICAL**: Write down your 12-word recovery phrase
   - Store it offline (paper, metal backup)
   - Never share it with anyone
   - Never enter it on a website

## Step 3: Fund Your Wallet

### For Testing (Devnet)

1. Click the settings gear in Phantom
2. Go to **Developer Settings**
3. Change network to **Devnet**
4. Visit [faucet.solana.com](https://faucet.solana.com/)
5. Enter your wallet address
6. Request free devnet SOL

### For Production (Mainnet)

**Option 1: Buy on an Exchange**
1. Purchase SOL on Coinbase, Binance, Kraken, etc.
2. Withdraw to your Phantom wallet address

**Option 2: Use Phantom's Built-in Purchase**
1. Click "Buy" in Phantom
2. Use credit card or bank transfer
3. SOL appears in your wallet

## Step 4: Connect to CoderVibez

1. Visit [codervibez.onrender.com](https://codervibez.onrender.com)
2. Click **"Connect Wallet"** in the header
3. Select **Phantom** from the wallet list
4. Click **"Connect"** in the Phantom popup
5. Your SOL balance will appear in the header

## Understanding Transactions

### Posting a Bounty (Vibe Coders)

1. Create a project with a bounty amount
2. Approve the transaction in Phantom
3. SOL is held in escrow until completion
4. Release to developer when satisfied

### Receiving a Bounty (Developers)

1. Complete the project work
2. Client releases the bounty
3. SOL appears in your wallet instantly
4. Withdraw or use for other transactions

## Security Best Practices

### Do's ✅

- Use a hardware wallet for large amounts (Ledger)
- Enable additional Phantom security features
- Verify transaction details before signing
- Keep your recovery phrase offline
- Use a unique password for Phantom

### Don'ts ❌

- Never share your recovery phrase
- Don't enter your phrase on any website
- Avoid connecting to unknown dApps
- Don't approve transactions you don't understand
- Never screenshot your recovery phrase

## Troubleshooting

### "Wallet Not Found"

- Ensure Phantom extension is installed
- Refresh the page
- Check if Phantom is enabled for the site

### "Transaction Failed"

- Check you have enough SOL for fees (~0.00001 SOL)
- Ensure you're on the correct network (Devnet vs Mainnet)
- Try again—network congestion can cause failures

### "Insufficient Balance"

- Add more SOL to your wallet
- Account for transaction fees
- Check you're viewing the correct network

---

*Ready to earn SOL? [Browse open projects](/marketplace) and start bidding!*
    `,
  },
  {
    slug: "supabase-common-issues",
    title: "Common Supabase Issues in AI-Generated Code",
    description: "Troubleshoot authentication, RLS policies, and database queries that AI tools often get wrong.",
    icon: Database,
    category: "Backend",
    readTime: "14 min read",
    views: 2780,
    publishedAt: "2024-01-22",
    externalLinks: [
      { title: "Supabase Documentation", url: "https://supabase.com/docs", description: "Official Supabase docs" },
      { title: "Supabase YouTube", url: "https://www.youtube.com/@Supabase", description: "Video tutorials" },
      { title: "Supabase GitHub", url: "https://github.com/supabase/supabase", description: "Source code and issues" },
    ],
    content: `
# Common Supabase Issues in AI-Generated Code

Supabase is a popular backend choice for vibe coding, but AI tools often generate Supabase code with subtle issues. Here's what to watch for and how to fix it.

## 1. Row Level Security (RLS) Problems

### Issue: RLS Not Enabled

AI often creates tables without enabling RLS, leaving data exposed.

\`\`\`sql
-- AI-generated (INSECURE)
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  owner_id UUID REFERENCES auth.users(id)
);

-- ALWAYS enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
\`\`\`

### Issue: Overly Permissive Policies

\`\`\`sql
-- BAD: Anyone can read everything
CREATE POLICY "Public read" ON projects FOR SELECT USING (true);

-- GOOD: Users can only read their own projects
CREATE POLICY "Users read own projects" ON projects
FOR SELECT USING (auth.uid() = owner_id);

-- GOOD: Or projects they're invited to
CREATE POLICY "Users read accessible projects" ON projects
FOR SELECT USING (
  auth.uid() = owner_id OR
  auth.uid() IN (
    SELECT user_id FROM project_members WHERE project_id = projects.id
  )
);
\`\`\`

### Complete RLS Setup

\`\`\`sql
-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- SELECT: Users can view their own projects
CREATE POLICY "select_own_projects" ON projects
FOR SELECT USING (auth.uid() = owner_id);

-- INSERT: Users can create projects
CREATE POLICY "insert_own_projects" ON projects
FOR INSERT WITH CHECK (auth.uid() = owner_id);

-- UPDATE: Users can update their own projects
CREATE POLICY "update_own_projects" ON projects
FOR UPDATE USING (auth.uid() = owner_id);

-- DELETE: Users can delete their own projects
CREATE POLICY "delete_own_projects" ON projects
FOR DELETE USING (auth.uid() = owner_id);
\`\`\`

## 2. Authentication Issues

### Issue: Not Checking Auth State

\`\`\`typescript
// BAD: No auth check
async function createProject(data: ProjectData) {
  const { error } = await supabase
    .from('projects')
    .insert(data);
}

// GOOD: Verify user is authenticated
async function createProject(data: ProjectData) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('Must be logged in to create a project');
  }
  
  const { error } = await supabase
    .from('projects')
    .insert({ ...data, owner_id: user.id });
    
  if (error) throw error;
}
\`\`\`

### Issue: Using getSession Instead of getUser

\`\`\`typescript
// BAD: getSession can return stale data
const { data: { session } } = await supabase.auth.getSession();

// GOOD: getUser validates with the server
const { data: { user } } = await supabase.auth.getUser();
\`\`\`

## 3. Query Issues

### Issue: Not Handling Errors

\`\`\`typescript
// BAD: Ignoring errors
const { data } = await supabase.from('projects').select('*');

// GOOD: Handle errors properly
const { data, error } = await supabase.from('projects').select('*');

if (error) {
  console.error('Query failed:', error);
  throw new Error('Failed to fetch projects');
}
\`\`\`

### Issue: N+1 Queries

\`\`\`typescript
// BAD: N+1 problem
const { data: projects } = await supabase.from('projects').select('*');

for (const project of projects) {
  const { data: owner } = await supabase
    .from('users')
    .select('*')
    .eq('id', project.owner_id)
    .single();
}

// GOOD: Join in single query
const { data: projects } = await supabase
  .from('projects')
  .select(\`
    *,
    owner:users(id, name, email, avatar_url)
  \`);
\`\`\`

### Issue: Missing .single() for Single Results

\`\`\`typescript
// BAD: Returns array when you want one item
const { data } = await supabase
  .from('projects')
  .select('*')
  .eq('id', projectId);
// data is Project[] not Project

// GOOD: Use .single()
const { data, error } = await supabase
  .from('projects')
  .select('*')
  .eq('id', projectId)
  .single();
// data is Project | null
\`\`\`

## 4. Real-time Subscription Issues

### Issue: Memory Leaks

\`\`\`typescript
// BAD: No cleanup
useEffect(() => {
  supabase
    .channel('projects')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, 
      (payload) => console.log(payload))
    .subscribe();
}, []);

// GOOD: Proper cleanup
useEffect(() => {
  const channel = supabase
    .channel('projects')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'projects' },
      (payload) => setProjects(prev => [...prev, payload.new as Project])
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, []);
\`\`\`

## 5. Type Safety Issues

### Generate Types from Schema

\`\`\`bash
# Generate TypeScript types
npx supabase gen types typescript --project-id your-project-id > src/types/database.ts
\`\`\`

### Use Generated Types

\`\`\`typescript
import { Database } from '@/types/database';

type Project = Database['public']['Tables']['projects']['Row'];
type NewProject = Database['public']['Tables']['projects']['Insert'];

const supabase = createClient<Database>(url, key);

// Now fully typed
const { data } = await supabase
  .from('projects')
  .select('*')
  .returns<Project[]>();
\`\`\`

## Quick Reference: Common Fixes

| Issue | Fix |
|-------|-----|
| "permission denied" | Check RLS policies |
| "JWT expired" | Refresh session or re-authenticate |
| "relation does not exist" | Run migrations, check table name |
| Empty results | Check RLS, verify data exists |
| Type errors | Regenerate types from schema |

---

*Stuck on a Supabase issue? [Get expert help on CoderVibez](/post-project).*
    `,
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find(g => g.slug === slug);
}

export function getFeaturedGuide(): Guide | undefined {
  return guides.find(g => g.featured);
}

export function getGuidesByCategory(category: string): Guide[] {
  return guides.filter(g => g.category === category);
}
