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
    readTime: "45 min read",
    views: 12400,
    publishedAt: "2024-01-01",
    featured: true,
    externalLinks: [
      { title: "Cursor Documentation", url: "https://docs.cursor.com/", description: "Official Cursor AI docs" },
      { title: "Anthropic Prompt Engineering", url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering", description: "Claude prompting best practices" },
      { title: "OpenAI Best Practices", url: "https://platform.openai.com/docs/guides/prompt-engineering", description: "Prompt engineering guide" },
      { title: "Cursor Rules Examples", url: "https://cursor.directory/", description: "Community cursor rules" },
      { title: "OWASP Top 10", url: "https://owasp.org/www-project-top-ten/", description: "Security vulnerabilities reference" },
    ],
    content: `
# The Complete Guide to Vibe Coding Best Practices

Vibe coding—using AI tools like Cursor, Claude, and v0 to rapidly build applications—has revolutionized how we ship software. But doing it poorly leads to technical debt, security vulnerabilities, and unmaintainable code. This comprehensive guide covers professional-level techniques for vibe coding effectively.

> **Research Note**: Studies show that while AI-generated code is often functionally correct, only ~10.5% of solutions pass security benchmarks. This guide addresses that gap.

---

## Part 1: Understanding Vibe Coding

### What Sets Professional Vibe Coding Apart

Professional vibe coding isn't just about generating code faster—it's about:

| Amateur Approach | Professional Approach |
|-----------------|----------------------|
| Accept AI output as-is | Review, test, and refine every generation |
| Vague, one-shot prompts | Structured, iterative prompt chains |
| Fix bugs reactively | Prevent bugs through context and constraints |
| Skip documentation | Maintain living documentation for AI context |
| Trust blindly | Verify with tests, types, and security audits |

### The Vibe Coding Stack

Modern vibe coding typically involves:

- **Cursor** - AI-native code editor with composer and chat modes
- **Claude** - Anthropic's AI, excellent for complex reasoning
- **v0** - Vercel's UI component generator (shadcn/ui + Tailwind)
- **GitHub Copilot** - Inline code completion
- **ChatGPT / GPT-4** - General-purpose coding assistant

Each tool has strengths. Cursor excels at codebase-aware edits. Claude handles complex multi-file refactors. v0 generates polished UI components. Use them in combination.

---

## Part 2: Project Architecture First

Before writing a single prompt, establish your project foundation.

### Define Your Tech Stack Constraints

Create a project specification document that AI can reference:

\`\`\`markdown
# Project: CoderVibez
## Tech Stack
- Framework: Next.js 14 (App Router)
- Language: TypeScript (strict mode)
- Styling: Tailwind CSS + shadcn/ui
- Database: Supabase (PostgreSQL)
- Auth: Supabase Auth
- Blockchain: Solana (web3.js)

## Architecture Rules
- Use Server Components by default
- Client Components only for interactivity
- All data fetching in server components or API routes
- Zod for all input validation
- Never expose service role keys to client

## Naming Conventions
- Components: PascalCase (UserCard.tsx)
- Utilities: camelCase (formatDate.ts)
- Constants: SCREAMING_SNAKE_CASE
- Database tables: snake_case
\`\`\`

### Use Cursor Rules Files

Create a \`.cursorrules\` file in your project root. This configures AI behavior project-wide:

\`\`\`markdown
# .cursorrules

You are an expert Next.js 14 developer using TypeScript and Tailwind CSS.

## Code Style
- Use functional components with hooks
- Prefer const over let, never use var
- Use async/await over .then() chains
- Always handle errors explicitly
- Add JSDoc comments for public functions

## Architecture
- Server Components by default
- 'use client' only when necessary (hooks, events, browser APIs)
- Colocate related files (component + test + types)
- Use @/ path aliases for imports

## Security
- Never hardcode secrets or API keys
- Always validate user input with Zod
- Use parameterized queries, never string concatenation
- Enable RLS on all Supabase tables

## What NOT to do
- Don't use any type - use unknown if truly unknown
- Don't skip error handling
- Don't use deprecated React patterns (componentWillMount, etc.)
- Don't install new dependencies without explicit approval
\`\`\`

### Establish Data Models Early

Define your entities and relationships before generating code:

\`\`\`typescript
// types/database.ts - Define before coding
interface User {
  id: string;
  email: string;
  role: 'vibe_coder' | 'developer' | 'both';
  created_at: string;
}

interface Project {
  id: string;
  owner_id: string; // FK to User
  title: string;
  status: 'open' | 'in_progress' | 'completed';
  bounty_amount: number;
}

interface Bid {
  id: string;
  project_id: string; // FK to Project
  developer_id: string; // FK to User
  amount: number;
  status: 'pending' | 'accepted' | 'rejected';
}
\`\`\`

---

## Part 3: Advanced Prompting Techniques

### The Context Layering Pattern

Professional prompts have multiple layers of context:

\`\`\`markdown
## Layer 1: Project Context
"This is a Next.js 14 App Router project using TypeScript, 
Tailwind CSS, and Supabase for the backend."

## Layer 2: Current State
"The project currently has:
- User authentication working via Supabase
- A /dashboard page that shows user's projects
- Types defined in src/types/database.ts"

## Layer 3: Specific Task
"Create a new component ProjectCard that displays:
- Project title and description
- Bounty amount in SOL
- Status badge (color-coded)
- 'View Details' button"

## Layer 4: Constraints
"Requirements:
- Use existing Card component from @/components/ui/card
- Match styling of existing UserCard component
- Include loading skeleton state
- Add hover animation"
\`\`\`

### The "Study First" Pattern

Before generating new code, ask AI to study existing code:

\`\`\`markdown
"Before creating the new component, study:
1. src/components/ui/card.tsx - the Card component we'll use
2. src/components/dashboard/user-card.tsx - for styling reference
3. src/types/database.ts - for the Project type definition

Then create ProjectCard.tsx that follows the same patterns."
\`\`\`

This produces code that matches your existing codebase style.

### Prompt Chaining for Complex Features

Break large features into sequential steps:

\`\`\`markdown
# Step 1: Data Layer
"Create the Supabase query function to fetch projects 
with their bid counts. Use the existing supabase client pattern."

# Step 2: Type Definitions  
"Based on what the query returns, create/update TypeScript 
types for ProjectWithBids."

# Step 3: Server Component
"Create a Server Component that fetches projects using 
the function from step 1."

# Step 4: Client Interactivity
"Add a Client Component wrapper that handles the 
filter/sort UI controls."

# Step 5: Error & Loading States
"Add proper error boundaries, loading skeletons, 
and empty state handling."

# Step 6: Tests
"Write tests for the query function and component 
rendering with mock data."
\`\`\`

### Negative Constraints (What NOT to Do)

Explicitly state what to avoid:

\`\`\`markdown
"Create an authentication flow.

DO NOT:
- Use localStorage for tokens (use httpOnly cookies)
- Skip email validation
- Allow weak passwords (require 8+ chars, mixed case, numbers)
- Expose any Supabase service role keys
- Use any deprecated Supabase auth methods
- Add any new npm dependencies"
\`\`\`

### The Self-Critique Pattern

After generating code, ask for a review:

\`\`\`markdown
"Review the code you just generated for:
1. Security vulnerabilities (XSS, injection, CSRF)
2. Performance issues (N+1 queries, unnecessary rerenders)
3. Accessibility gaps (ARIA labels, keyboard navigation)
4. Error handling gaps (what if the API fails?)
5. Edge cases (empty data, very long strings, special characters)

List any issues found and provide fixes."
\`\`\`

---

## Part 4: Security-First Vibe Coding

AI-generated code often has security gaps. Build security into your workflow.

### The Security Audit Checklist

Run this checklist on every AI-generated feature:

#### Authentication & Authorization
\`\`\`markdown
[ ] All protected routes verify authentication
[ ] Users can only access their own data
[ ] Admin functions check admin role
[ ] Session tokens use httpOnly, secure cookies
[ ] Password requirements enforced
[ ] Rate limiting on auth endpoints
\`\`\`

#### Input Validation
\`\`\`markdown
[ ] All user input validated with Zod/Yup
[ ] Validation on both client AND server
[ ] File uploads check type, size, content
[ ] SQL queries use parameterization (no string concat)
[ ] No eval() or dangerouslySetInnerHTML with user data
\`\`\`

#### Data Protection
\`\`\`markdown
[ ] RLS enabled on all Supabase tables
[ ] Sensitive data not in client bundle
[ ] API keys in environment variables only
[ ] No secrets in git history
[ ] HTTPS enforced
\`\`\`

### Secure Code Patterns

#### Input Validation Pattern
\`\`\`typescript
// Always validate with Zod before processing
import { z } from 'zod';

const createProjectSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(5000),
  bounty: z.number().positive().max(1000),
  // Never allow role/permissions in user input!
});

export async function createProject(input: unknown) {
  // Validate input - throws if invalid
  const validated = createProjectSchema.parse(input);
  
  // Now safe to use
  const { data, error } = await supabase
    .from('projects')
    .insert(validated);
}
\`\`\`

#### API Route Security Pattern
\`\`\`typescript
// Complete secure API route
export async function POST(request: Request) {
  try {
    // 1. Authenticate
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Parse & Validate Input
    const body = await request.json();
    const validated = createProjectSchema.parse(body);

    // 3. Authorize (business logic check)
    const canCreate = await checkUserCanCreateProject(user.id);
    if (!canCreate) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    // 4. Execute
    const { data, error } = await supabase
      .from('projects')
      .insert({ ...validated, owner_id: user.id })
      .select()
      .single();

    if (error) throw error;
    return Response.json(data);

  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: error.errors }, { status: 400 });
    }
    console.error('API error:', error);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}
\`\`\`

---

## Part 5: Testing AI-Generated Code

AI doesn't run the code it generates. You must verify everything.

### The Testing Pyramid for Vibe Code

\`\`\`
        /\\
       /  \\      E2E Tests (Playwright)
      /----\\     - Critical user journeys
     /      \\    - Auth flows, payments
    /--------\\   
   /          \\  Integration Tests
  /------------\\ - API routes, DB queries
 /              \\ - Component interactions
/----------------\\
      Unit Tests (Vitest)
      - Utility functions
      - Validation logic
      - Pure components
\`\`\`

### Test Patterns for AI Code

#### Test the Happy Path AND Edge Cases
\`\`\`typescript
describe('formatBounty', () => {
  // Happy path
  it('formats positive amounts', () => {
    expect(formatBounty(1.5)).toBe('1.50 SOL');
  });

  // Edge cases AI often misses
  it('handles zero', () => {
    expect(formatBounty(0)).toBe('0.00 SOL');
  });

  it('handles very small amounts', () => {
    expect(formatBounty(0.001)).toBe('0.00 SOL');
  });

  it('handles very large amounts', () => {
    expect(formatBounty(1000000)).toBe('1,000,000.00 SOL');
  });

  it('handles negative (should throw)', () => {
    expect(() => formatBounty(-5)).toThrow();
  });

  it('handles NaN', () => {
    expect(() => formatBounty(NaN)).toThrow();
  });
});
\`\`\`

#### Golden Tests for Regressions
Create snapshot tests that catch unintended changes:

\`\`\`typescript
// Capture expected output, fail if it changes
it('renders project card correctly', () => {
  const { container } = render(
    <ProjectCard project={mockProject} />
  );
  expect(container).toMatchSnapshot();
});
\`\`\`

---

## Part 6: Performance Optimization

AI code often works but isn't optimized. Here's what to watch for.

### React Performance Patterns

#### Avoid Unnecessary Re-renders
\`\`\`typescript
// Bad: Object created every render
<ProjectList filters={{ status: 'open' }} />

// Good: Stable reference
const filters = useMemo(() => ({ status: 'open' }), []);
<ProjectList filters={filters} />
\`\`\`

#### Use Server Components
\`\`\`typescript
// Bad: Client component fetching data
'use client';
function ProjectList() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    fetch('/api/projects').then(r => r.json()).then(setProjects);
  }, []);
  return <div>{/* render */}</div>;
}

// Good: Server component - no client JS needed
async function ProjectList() {
  const projects = await getProjects(); // Direct DB call
  return <div>{/* render */}</div>;
}
\`\`\`

#### Virtualize Long Lists
\`\`\`typescript
// Bad: Render 1000 items
{projects.map(p => <ProjectCard key={p.id} project={p} />)}

// Good: Only render visible items
import { useVirtualizer } from '@tanstack/react-virtual';

function VirtualizedList({ projects }) {
  const virtualizer = useVirtualizer({
    count: projects.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
  });
  // Only renders ~10-20 items regardless of list size
}
\`\`\`

### Database Performance

#### Avoid N+1 Queries
\`\`\`typescript
// Bad: N+1 query
const projects = await supabase.from('projects').select('*');
for (const project of projects) {
  const owner = await supabase
    .from('users')
    .select('*')
    .eq('id', project.owner_id)
    .single();
}

// Good: Single query with join
const { data } = await supabase
  .from('projects')
  .select(\`
    *,
    owner:users(id, name, avatar_url)
  \`);
\`\`\`

---

## Part 7: Version Control & Collaboration

### Commit Strategy for AI Code

\`\`\`bash
# Bad: Giant commits
git commit -m "Add project feature"

# Good: Small, atomic commits
git commit -m "Add Project type definition"
git commit -m "Add getProjects query function"
git commit -m "Add ProjectCard component"
git commit -m "Add ProjectList with loading state"
git commit -m "Add tests for project components"
\`\`\`

### Document AI Decisions

Keep a log of significant AI interactions:

\`\`\`markdown
# decisions/2024-01-15-auth-flow.md

## Context
Needed to implement Google OAuth with Supabase.

## AI Tools Used
- Cursor Composer for initial implementation
- Claude for debugging redirect issues

## Key Decisions
- Used @supabase/ssr for server-side auth
- Chose PKCE flow over implicit
- Added custom callback handler for user profile creation

## Issues Encountered
- AI initially used deprecated getSession() - fixed to getUser()
- Missing RLS policies on users table - added manually

## Testing Done
- Manual testing of full OAuth flow
- Tested error cases (cancelled auth, expired tokens)
\`\`\`

---

## Part 8: Debugging AI-Generated Code

### The Structured Debugging Workflow

When AI code breaks:

\`\`\`markdown
1. IDENTIFY: What's the exact error message/behavior?
2. ISOLATE: What's the smallest reproduction case?
3. ANALYZE: Read the code - what SHOULD happen vs what DOES happen?
4. HYPOTHESIZE: What could cause this difference?
5. TEST: Verify hypothesis with console.log, debugger, or tests
6. FIX: Make minimal change to fix the issue
7. VERIFY: Ensure fix works and doesn't break other things
8. DOCUMENT: Note what went wrong for future reference
\`\`\`

### Common AI Code Bugs

| Bug Type | Example | Fix |
|----------|---------|-----|
| Stale closure | useEffect with missing deps | Add all deps or use refs |
| Type mismatch | Assuming API returns array | Add null checks, validate |
| Race condition | Multiple rapid state updates | Use useReducer or debounce |
| Memory leak | Missing cleanup in useEffect | Return cleanup function |
| Hydration error | Server/client render mismatch | Use dynamic import or useEffect |

---

## Part 9: When to Get Human Help

Vibe coding has limits. Get expert help when:

### Security-Critical Features
- Authentication and authorization
- Payment processing
- Handling sensitive user data
- Compliance requirements (GDPR, HIPAA)

### Performance-Critical Code
- Database query optimization
- Real-time features at scale
- Complex caching strategies

### Complex Business Logic
- Financial calculations
- Multi-step workflows
- Integrations with legacy systems

### You've Been Stuck
- Same bug for 2+ hours
- AI keeps generating wrong solutions
- Code works but you don't understand why

---

## Professional Vibe Coder's Checklist

Before shipping any AI-generated feature:

### Architecture
- [ ] Follows established project patterns
- [ ] Types are complete and accurate
- [ ] No unnecessary dependencies added

### Security
- [ ] Input validation on all user data
- [ ] Authentication checks on protected routes
- [ ] No secrets in code or client bundle
- [ ] RLS policies in place

### Quality
- [ ] All TypeScript errors resolved
- [ ] Linter passing with no warnings
- [ ] Tests written for critical paths
- [ ] Error handling complete

### Performance
- [ ] No N+1 queries
- [ ] Large lists virtualized
- [ ] Images optimized
- [ ] Bundle size reasonable

### UX
- [ ] Loading states implemented
- [ ] Error states handled gracefully
- [ ] Empty states designed
- [ ] Mobile responsive

### Accessibility
- [ ] Keyboard navigation works
- [ ] ARIA labels present
- [ ] Color contrast sufficient
- [ ] Screen reader tested

---

## Conclusion

Vibe coding is a powerful skill, but it requires discipline. The best vibe coders:

1. **Invest in context** - Cursor rules, documentation, type definitions
2. **Prompt strategically** - Layered context, chained prompts, constraints
3. **Verify everything** - Tests, security audits, performance checks
4. **Commit frequently** - Small changes, clear history, easy rollbacks
5. **Know their limits** - Get help when security or complexity demands it

Master these practices, and you'll ship faster AND with higher quality than most developers—vibe coding or not.

---

*Need help with a specific vibe-coded project? [Post it on CoderVibez](/post-project) and get expert assistance from developers who specialize in polishing AI-generated code.*
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
