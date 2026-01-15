import {
  MessageSquare,
  TestTube,
  Rocket,
  Shield,
  Megaphone,
  type LucideIcon,
} from "lucide-react";
import type { Guide } from "./guides";

// Additional guides for new categories
export const newGuides: Guide[] = [
  {
    slug: "effective-prompting",
    title: "Effective Prompting for Code Generation",
    description: "Master the art of writing prompts that produce high-quality, working code from AI assistants.",
    icon: MessageSquare,
    category: "Prompting",
    readTime: "15 min read",
    views: 3450,
    publishedAt: "2024-02-01",
    externalLinks: [
      { title: "Anthropic Prompt Library", url: "https://docs.anthropic.com/en/prompt-library/library", description: "Example prompts for Claude" },
      { title: "OpenAI Prompt Engineering", url: "https://platform.openai.com/docs/guides/prompt-engineering", description: "Official OpenAI guide" },
      { title: "Learn Prompting", url: "https://learnprompting.org/", description: "Free prompting course" },
    ],
    content: `
# Effective Prompting for Code Generation

The quality of AI-generated code depends heavily on how you ask for it. This guide covers proven techniques for getting better results from Cursor, Claude, ChatGPT, and other AI coding tools.

## The Anatomy of a Great Prompt

### 1. Context

Tell the AI what it's working with:

\`\`\`markdown
# Good: Full context
"I'm building a Next.js 14 app with TypeScript, using Supabase 
for the backend and Tailwind CSS for styling. The app is a 
project management tool."

# Bad: No context
"Create a function to save data"
\`\`\`

### 2. Specific Requirements

Be explicit about what you need:

\`\`\`markdown
# Good: Specific requirements
"Create a React hook called useProjects that:
- Fetches projects from Supabase where owner_id matches current user
- Returns { projects, loading, error, refetch }
- Handles loading and error states
- Uses TypeScript with proper types
- Includes JSDoc comments"

# Bad: Vague requirements
"Make a hook for projects"
\`\`\`

### 3. Constraints

Specify limitations and preferences:

\`\`\`markdown
"Requirements:
- No external dependencies beyond what's already installed
- Must work with React 18 concurrent features
- Should be under 50 lines of code
- Follow the existing code style in the project"
\`\`\`

## Prompting Patterns That Work

### The Specification Pattern

\`\`\`markdown
## Task
Create a user registration form component

## Requirements
- Fields: email, password, confirm password, name
- Validation: email format, password min 8 chars, passwords match
- UI: Use shadcn/ui components
- State: React Hook Form with Zod validation
- Submission: Call /api/auth/register endpoint

## Expected Behavior
1. Show inline validation errors
2. Disable submit while processing
3. Show success toast on completion
4. Redirect to /dashboard after success
\`\`\`

### The Example Pattern

\`\`\`markdown
"Create a similar component to this one, but for projects instead of users:

\\\`\\\`\\\`tsx
function UserCard({ user }: { user: User }) {
  return (
    <Card>
      <CardHeader>
        <Avatar src={user.avatar} />
        <CardTitle>{user.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{user.email}</p>
      </CardContent>
    </Card>
  );
}
\\\`\\\`\\\`

The project card should show: title, description, status badge, and bounty amount."
\`\`\`

### The Iteration Pattern

Start simple, then refine:

\`\`\`markdown
# Round 1
"Create a basic button component"

# Round 2
"Add variants: primary, secondary, outline, ghost"

# Round 3
"Add size options: sm, md, lg"

# Round 4
"Add loading state with spinner"

# Round 5
"Add disabled state styling"
\`\`\`

## Advanced Techniques

### Chain of Thought

Ask the AI to think through the problem:

\`\`\`markdown
"Before writing code, explain:
1. What components/functions are needed
2. How they'll interact
3. What edge cases to handle
4. Then implement the solution"
\`\`\`

### Role Assignment

\`\`\`markdown
"You are a senior TypeScript developer who prioritizes:
- Type safety over convenience
- Explicit over implicit
- Readable over clever
- Tested over assumed working

Review this code and suggest improvements..."
\`\`\`

### Negative Prompting

Tell the AI what NOT to do:

\`\`\`markdown
"Create an auth system. 
DO NOT:
- Use any deprecated APIs
- Store passwords in plain text
- Use 'any' type in TypeScript
- Skip error handling
- Hardcode any values"
\`\`\`

## Common Prompting Mistakes

### 1. Being Too Vague

❌ "Make it better"
✅ "Improve performance by memoizing expensive calculations and reducing re-renders"

### 2. Asking for Too Much

❌ "Build me a complete e-commerce platform"
✅ "Create the product listing page with filtering and sorting"

### 3. Not Providing Examples

❌ "Match the existing style"
✅ "Match this style: [paste example code]"

### 4. Ignoring Errors

❌ "It's not working, fix it"
✅ "Getting this error: [paste error]. The issue seems to be [your analysis]"

## Prompt Templates

### New Feature

\`\`\`markdown
## Feature: [Name]
## Context: [Tech stack, existing code]
## Requirements:
- [Requirement 1]
- [Requirement 2]
## Acceptance Criteria:
- [ ] [Criterion 1]
- [ ] [Criterion 2]
## Constraints:
- [Constraint 1]
\`\`\`

### Bug Fix

\`\`\`markdown
## Bug: [Description]
## Expected: [What should happen]
## Actual: [What happens]
## Error: [Error message if any]
## Relevant Code: [Paste code]
## What I've Tried: [Your attempts]
\`\`\`

### Code Review

\`\`\`markdown
## Code to Review:
[Paste code]

## Review Focus:
- Security vulnerabilities
- Performance issues
- TypeScript best practices
- Error handling gaps

## Output Format:
For each issue, provide:
1. Location (line/function)
2. Problem description
3. Suggested fix with code
\`\`\`

---

*Need help crafting the perfect prompt? [Get expert assistance on CoderVibez](/post-project).*
    `,
  },
  {
    slug: "testing-ai-code",
    title: "Testing AI-Generated Code",
    description: "Learn how to write effective tests for code generated by AI tools to ensure reliability and catch bugs early.",
    icon: TestTube,
    category: "Testing",
    readTime: "12 min read",
    views: 1890,
    publishedAt: "2024-02-05",
    externalLinks: [
      { title: "Vitest Documentation", url: "https://vitest.dev/", description: "Fast unit testing framework" },
      { title: "Testing Library", url: "https://testing-library.com/", description: "Simple testing utilities" },
      { title: "Playwright", url: "https://playwright.dev/", description: "End-to-end testing" },
    ],
    content: `
# Testing AI-Generated Code

AI-generated code needs testing more than hand-written code. AI can produce plausible-looking code that fails in subtle ways. Here's how to test effectively.

## Why Test AI Code?

1. **AI doesn't run the code** - It can't verify it works
2. **Hallucinations happen** - Non-existent APIs, wrong syntax
3. **Edge cases are missed** - AI optimizes for the happy path
4. **Integration issues** - Generated code may not fit your system

## Testing Strategy

### The Testing Pyramid for AI Code

\`\`\`
        /\\
       /E2E\\        <- Fewer, slower, but catch integration issues
      /------\\
     / Integ. \\     <- Test component interactions
    /----------\\
   /   Unit     \\   <- Many, fast, test individual functions
  /--------------\\
\`\`\`

## Unit Testing with Vitest

### Setup

\`\`\`bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
\`\`\`

\`\`\`typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
});
\`\`\`

### Testing a Utility Function

\`\`\`typescript
// utils/format.ts (AI-generated)
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

// utils/format.test.ts
import { describe, it, expect } from 'vitest';
import { formatCurrency } from './format';

describe('formatCurrency', () => {
  it('formats positive numbers', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
  });

  it('formats zero', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });

  it('formats negative numbers', () => {
    expect(formatCurrency(-50)).toBe('-$50.00');
  });

  it('handles large numbers', () => {
    expect(formatCurrency(1000000)).toBe('$1,000,000.00');
  });

  // Edge cases AI might miss
  it('handles very small decimals', () => {
    expect(formatCurrency(0.001)).toBe('$0.00');
  });

  it('handles NaN', () => {
    expect(formatCurrency(NaN)).toBe('NaN');
  });
});
\`\`\`

### Testing React Components

\`\`\`typescript
// components/ProjectCard.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProjectCard } from './ProjectCard';

const mockProject = {
  id: '1',
  title: 'Test Project',
  description: 'A test project',
  bounty: 100,
  status: 'open',
};

describe('ProjectCard', () => {
  it('renders project information', () => {
    render(<ProjectCard project={mockProject} />);
    
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('A test project')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
  });

  it('shows correct status badge', () => {
    render(<ProjectCard project={mockProject} />);
    
    expect(screen.getByText('open')).toHaveClass('bg-green-500');
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(<ProjectCard project={mockProject} onClick={handleClick} />);
    
    await userEvent.click(screen.getByRole('article'));
    
    expect(handleClick).toHaveBeenCalledWith(mockProject);
  });

  // Test edge cases
  it('handles missing description', () => {
    const projectWithoutDesc = { ...mockProject, description: null };
    render(<ProjectCard project={projectWithoutDesc} />);
    
    expect(screen.queryByTestId('description')).not.toBeInTheDocument();
  });

  it('truncates long titles', () => {
    const longTitle = 'A'.repeat(100);
    render(<ProjectCard project={{ ...mockProject, title: longTitle }} />);
    
    expect(screen.getByText(/A+\\.\\.\\.$/)).toBeInTheDocument();
  });
});
\`\`\`

### Testing Hooks

\`\`\`typescript
// hooks/useProjects.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { useProjects } from './useProjects';
import { createClient } from '@/lib/supabase/client';

vi.mock('@/lib/supabase/client');

describe('useProjects', () => {
  it('fetches projects on mount', async () => {
    const mockProjects = [{ id: '1', title: 'Test' }];
    
    vi.mocked(createClient).mockReturnValue({
      from: () => ({
        select: () => ({
          eq: () => Promise.resolve({ data: mockProjects, error: null }),
        }),
      }),
    } as any);

    const { result } = renderHook(() => useProjects());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.projects).toEqual(mockProjects);
  });

  it('handles errors', async () => {
    vi.mocked(createClient).mockReturnValue({
      from: () => ({
        select: () => ({
          eq: () => Promise.resolve({ data: null, error: new Error('Failed') }),
        }),
      }),
    } as any);

    const { result } = renderHook(() => useProjects());

    await waitFor(() => {
      expect(result.current.error).toBe('Failed');
    });
  });
});
\`\`\`

## Integration Testing

### Testing API Routes

\`\`\`typescript
// app/api/projects/route.test.ts
import { GET, POST } from './route';
import { createClient } from '@/lib/supabase/server';

vi.mock('@/lib/supabase/server');

describe('Projects API', () => {
  describe('GET /api/projects', () => {
    it('returns projects for authenticated user', async () => {
      vi.mocked(createClient).mockResolvedValue({
        auth: { getUser: () => ({ data: { user: { id: '1' } } }) },
        from: () => ({
          select: () => ({
            eq: () => ({ data: [{ id: '1' }], error: null }),
          }),
        }),
      } as any);

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveLength(1);
    });

    it('returns 401 for unauthenticated requests', async () => {
      vi.mocked(createClient).mockResolvedValue({
        auth: { getUser: () => ({ data: { user: null } }) },
      } as any);

      const response = await GET();

      expect(response.status).toBe(401);
    });
  });
});
\`\`\`

## E2E Testing with Playwright

### Setup

\`\`\`bash
npm init playwright@latest
\`\`\`

### Writing E2E Tests

\`\`\`typescript
// e2e/auth.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('user can sign up', async ({ page }) => {
    await page.goto('/signup');
    
    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="password"]', 'securepassword123');
    await page.fill('[name="confirmPassword"]', 'securepassword123');
    
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('text=Welcome')).toBeVisible();
  });

  test('shows error for invalid email', async ({ page }) => {
    await page.goto('/signup');
    
    await page.fill('[name="email"]', 'invalid-email');
    await page.click('button[type="submit"]');
    
    await expect(page.locator('text=Invalid email')).toBeVisible();
  });
});
\`\`\`

## Test Checklist for AI Code

Before shipping AI-generated code, verify:

- [ ] All functions have at least one test
- [ ] Edge cases are covered (null, undefined, empty, large values)
- [ ] Error paths are tested
- [ ] Loading states are tested
- [ ] Integration with other components works
- [ ] API calls are mocked appropriately
- [ ] Types are correct (no \`any\`)

---

*Need help testing your AI-generated code? [Post a project on CoderVibez](/post-project).*
    `,
  },
  {
    slug: "deployment-guide",
    title: "Deploying Vibe-Coded Apps",
    description: "Step-by-step guide to deploying your AI-generated applications to Vercel, Render, and other platforms.",
    icon: Rocket,
    category: "Deployment",
    readTime: "10 min read",
    views: 2100,
    publishedAt: "2024-02-10",
    externalLinks: [
      { title: "Vercel Documentation", url: "https://vercel.com/docs", description: "Deploy Next.js apps" },
      { title: "Render Documentation", url: "https://render.com/docs", description: "Full-stack deployment" },
      { title: "Railway", url: "https://railway.app/", description: "Simple deployment platform" },
    ],
    content: `
# Deploying Vibe-Coded Apps

You've built something with AI assistance—now let's get it live. This guide covers deploying to popular platforms with best practices for AI-generated code.

## Pre-Deployment Checklist

Before deploying, ensure:

- [ ] All TypeScript errors are resolved
- [ ] Environment variables are documented
- [ ] No hardcoded secrets in code
- [ ] Build completes locally (\`npm run build\`)
- [ ] Tests pass (\`npm test\`)
- [ ] README has setup instructions

## Deploying to Vercel

Best for: Next.js, React, static sites

### Quick Deploy

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Configure environment variables
6. Click "Deploy"

### Environment Variables

\`\`\`bash
# Required for Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...  # Server-side only

# Required for Solana
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
\`\`\`

### vercel.json Configuration

\`\`\`json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "regions": ["iad1"],
  "env": {
    "NEXT_PUBLIC_APP_URL": "https://your-app.vercel.app"
  }
}
\`\`\`

## Deploying to Render

Best for: Full-stack apps, background jobs, databases

### Web Service Setup

1. Go to [render.com](https://render.com)
2. Click "New" → "Web Service"
3. Connect your GitHub repo
4. Configure:
   - **Runtime**: Node
   - **Build Command**: \`npm install && npm run build\`
   - **Start Command**: \`npm start\`

### render.yaml Blueprint

\`\`\`yaml
services:
  - type: web
    name: my-app
    runtime: node
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: NEXT_PUBLIC_SUPABASE_URL
        sync: false
      - key: NEXT_PUBLIC_SUPABASE_ANON_KEY
        sync: false
    autoDeploy: true
\`\`\`

## Common Deployment Issues

### Build Failures

**Issue**: \`Module not found\` errors

\`\`\`bash
# Check for case-sensitivity issues
# Linux servers are case-sensitive, Windows/Mac aren't
import { Button } from '@/components/ui/Button'  # Wrong
import { Button } from '@/components/ui/button'  # Correct
\`\`\`

**Issue**: TypeScript errors in build

\`\`\`bash
# Fix all TS errors before deploying
npm run build  # Run locally first

# Or temporarily ignore (not recommended)
# next.config.js
module.exports = {
  typescript: {
    ignoreBuildErrors: true,  // Only for emergencies!
  },
}
\`\`\`

### Environment Variable Issues

**Issue**: Variables undefined at runtime

\`\`\`typescript
// Client-side variables MUST start with NEXT_PUBLIC_
const url = process.env.SUPABASE_URL;  // undefined on client
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;  // works
\`\`\`

**Issue**: Variables not updating

\`\`\`bash
# Redeploy after changing env vars
# Vercel: Trigger new deployment
# Render: Manual deploy or push new commit
\`\`\`

### Runtime Errors

**Issue**: API routes returning 500

\`\`\`typescript
// Add error handling to all API routes
export async function GET() {
  try {
    const data = await fetchData();
    return Response.json(data);
  } catch (error) {
    console.error('API error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
\`\`\`

## Post-Deployment Checklist

After deploying:

- [ ] Test all pages load correctly
- [ ] Verify authentication works
- [ ] Test form submissions
- [ ] Check API endpoints respond
- [ ] Verify environment variables are set
- [ ] Test on mobile devices
- [ ] Set up error monitoring (Sentry)
- [ ] Configure custom domain (optional)

## Monitoring & Debugging

### Vercel

- View logs: Dashboard → Project → Logs
- Analytics: Dashboard → Analytics
- Edge functions: Dashboard → Functions

### Render

- View logs: Dashboard → Service → Logs
- Shell access: Dashboard → Service → Shell
- Metrics: Dashboard → Service → Metrics

## Rollback Strategy

If something breaks:

### Vercel
1. Go to Deployments tab
2. Find last working deployment
3. Click "..." → "Promote to Production"

### Render
1. Go to Events tab
2. Find last working deploy
3. Click "Rollback"

---

*Need help deploying your app? [Get expert assistance on CoderVibez](/post-project).*
    `,
  },
  {
    slug: "security-ai-code",
    title: "Security Best Practices for AI-Generated Code",
    description: "Protect your application from common vulnerabilities that appear in AI-generated code.",
    icon: Shield,
    category: "Security",
    readTime: "15 min read",
    views: 2450,
    publishedAt: "2024-02-15",
    externalLinks: [
      { title: "OWASP Top 10", url: "https://owasp.org/www-project-top-ten/", description: "Common web vulnerabilities" },
      { title: "Next.js Security", url: "https://nextjs.org/docs/app/building-your-application/configuring/security", description: "Framework security guide" },
      { title: "Supabase Security", url: "https://supabase.com/docs/guides/platform/security", description: "Database security" },
    ],
    content: `
# Security Best Practices for AI-Generated Code

AI coding tools can introduce security vulnerabilities. This guide covers the most common issues and how to protect your application.

## The Security Problem with AI Code

AI assistants:
- Don't understand your security requirements
- May use outdated or insecure patterns
- Often skip input validation
- Can expose sensitive data accidentally
- Generate code that "works" but isn't secure

## Critical Security Checks

### 1. Never Expose Secrets

**Problem**: AI often hardcodes sensitive values

\`\`\`typescript
// DANGEROUS: AI-generated with hardcoded secret
const supabase = createClient(
  'https://xxx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'  // Exposed!
);

// SAFE: Use environment variables
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
\`\`\`

**Audit checklist**:
- [ ] Search codebase for API keys, tokens, passwords
- [ ] Check \`.env\` is in \`.gitignore\`
- [ ] Verify no secrets in client-side code
- [ ] Use secret scanning tools (GitHub, GitGuardian)

### 2. Validate All Input

**Problem**: AI skips input validation

\`\`\`typescript
// DANGEROUS: No validation
export async function POST(request: Request) {
  const { email, role } = await request.json();
  await db.users.create({ email, role });  // User can set admin role!
}

// SAFE: Validate and sanitize
import { z } from 'zod';

const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  // Don't allow role in user input!
});

export async function POST(request: Request) {
  const body = await request.json();
  const validated = createUserSchema.parse(body);
  
  await db.users.create({
    ...validated,
    role: 'user',  // Always set server-side
  });
}
\`\`\`

### 3. Implement Proper Authentication

**Problem**: AI may skip auth checks

\`\`\`typescript
// DANGEROUS: No auth check
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  return Response.json(await getUser(userId));  // Anyone can get any user!
}

// SAFE: Verify authentication
export async function GET(request: Request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Only return the authenticated user's data
  return Response.json(await getUser(user.id));
}
\`\`\`

### 4. Enable Row Level Security

**Problem**: AI often forgets RLS

\`\`\`sql
-- DANGEROUS: No RLS
CREATE TABLE user_data (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  sensitive_info TEXT
);
-- Anyone can read all data!

-- SAFE: Enable RLS with policies
ALTER TABLE user_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only access own data"
ON user_data
FOR ALL
USING (auth.uid() = user_id);
\`\`\`

### 5. Prevent SQL Injection

**Problem**: AI may use string concatenation

\`\`\`typescript
// DANGEROUS: SQL injection vulnerability
const query = \`SELECT * FROM users WHERE email = '\${email}'\`;
await db.raw(query);

// SAFE: Use parameterized queries
const { data } = await supabase
  .from('users')
  .select('*')
  .eq('email', email);

// Or with raw SQL
await db.raw('SELECT * FROM users WHERE email = ?', [email]);
\`\`\`

### 6. Sanitize Output

**Problem**: AI doesn't escape user content

\`\`\`tsx
// DANGEROUS: XSS vulnerability
function Comment({ text }: { text: string }) {
  return <div dangerouslySetInnerHTML={{ __html: text }} />;
}

// SAFE: Let React escape by default
function Comment({ text }: { text: string }) {
  return <div>{text}</div>;
}

// If HTML is needed, sanitize first
import DOMPurify from 'dompurify';

function Comment({ text }: { text: string }) {
  const clean = DOMPurify.sanitize(text);
  return <div dangerouslySetInnerHTML={{ __html: clean }} />;
}
\`\`\`

### 7. Secure API Routes

\`\`\`typescript
// Complete secure API route pattern
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';

const updateProjectSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(5000).optional(),
});

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // 1. Authenticate
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Validate input
    const body = await request.json();
    const validated = updateProjectSchema.parse(body);

    // 3. Authorize (check ownership)
    const { data: project } = await supabase
      .from('projects')
      .select('owner_id')
      .eq('id', params.id)
      .single();

    if (!project || project.owner_id !== user.id) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    // 4. Perform action
    const { data, error } = await supabase
      .from('projects')
      .update(validated)
      .eq('id', params.id)
      .select()
      .single();

    if (error) throw error;

    return Response.json(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: error.errors }, { status: 400 });
    }
    console.error('Update failed:', error);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}
\`\`\`

## Security Audit Checklist

Before deploying AI-generated code:

### Authentication & Authorization
- [ ] All protected routes check authentication
- [ ] Users can only access their own data
- [ ] Admin functions are properly restricted
- [ ] Session handling is secure

### Data Protection
- [ ] RLS enabled on all tables
- [ ] Input validation on all endpoints
- [ ] Output sanitization where needed
- [ ] No sensitive data in client bundles

### Infrastructure
- [ ] Environment variables for all secrets
- [ ] HTTPS enforced
- [ ] CORS properly configured
- [ ] Rate limiting on APIs

### Code Quality
- [ ] No \`eval()\` or \`dangerouslySetInnerHTML\`
- [ ] Dependencies are up to date
- [ ] No known vulnerabilities (\`npm audit\`)

---

*Need a security review of your AI-generated code? [Get expert help on CoderVibez](/post-project).*
    `,
  },
  {
    slug: "promotion-tips",
    title: "Promotion Tips for Vibe-Coded Apps",
    description: "How to market and launch your AI-generated app successfully, even with its quirks.",
    icon: Megaphone,
    category: "Marketing",
    readTime: "15 min read",
    views: 1230,
    publishedAt: "2024-01-25",
    externalLinks: [
      { title: "Product Hunt", url: "https://www.producthunt.com/", description: "Launch your product" },
      { title: "Indie Hackers", url: "https://www.indiehackers.com/", description: "Community for builders" },
      { title: "Hacker News", url: "https://news.ycombinator.com/", description: "Tech community" },
    ],
    content: `
# Promotion Tips for Vibe-Coded Apps

You've built something with AI—now how do you get users? Here's a practical guide to launching your vibe-coded creation.

## Before Launch

### 1. Polish the Core Experience

Fix the obvious issues before showing anyone:
- Test on mobile devices
- Fix any console errors
- Ensure loading states work
- Handle error cases gracefully

### 2. Create a Landing Page

Use v0 or similar to create a compelling landing page:

**Essential elements**:
- Clear headline explaining what it does
- Screenshot or demo video
- Call-to-action button
- Social proof (if any)

### 3. Record a Demo

A 60-second video is worth 1000 words:
- Use Loom or Screen Studio
- Show the key workflow
- Keep it under 2 minutes
- Add captions for accessibility

## Launch Strategies

### Build in Public

Share your journey on Twitter/X:

\`\`\`markdown
Week 1: "Started building a [product] with Cursor. Here's my progress..."
Week 2: "Hit my first major bug. Here's how I fixed it..."
Week 3: "Added [feature]. Getting close to launch!"
Launch: "It's live! Built this in 3 weeks using AI tools. Try it free:"
\`\`\`

**Why it works**:
- Builds anticipation
- Creates accountability
- Attracts early feedback
- Shows authenticity

### Product Hunt Launch

**Preparation**:
1. Create a maker profile
2. Prepare assets (logo, screenshots, video)
3. Write a compelling tagline
4. Draft your first comment
5. Schedule for Tuesday-Thursday

**Launch day**:
- Post at 12:01 AM PT
- Engage with every comment
- Share on social media
- Ask friends to upvote (genuinely)

### Hacker News

Best for developer tools or technical products:

\`\`\`markdown
Show HN: [Product Name] – [One-line description]

I built this because [problem you had].

Tech stack: Next.js, Supabase, Solana
Built with: Cursor, Claude

Try it: [link]
Feedback welcome!
\`\`\`

**Tips**:
- Be genuine about AI assistance
- Focus on the problem solved
- Respond to all comments
- Don't ask for upvotes

### Indie Hackers

Great for getting feedback and connecting with builders:

- Share your revenue/user numbers
- Be transparent about challenges
- Ask specific questions
- Engage with others' posts

## Growth Tactics

### 1. SEO Basics

Even AI-built apps need SEO:

\`\`\`tsx
// Add metadata to pages
export const metadata = {
  title: 'Product Name - Solve X Problem',
  description: 'A clear description of what your product does...',
  openGraph: {
    images: ['/og-image.png'],
  },
};
\`\`\`

### 2. Content Marketing

Write about problems you solve:
- "How to [solve problem your app solves]"
- "Why [old way] is broken"
- "I built [product] in [time] with AI"

### 3. Community Engagement

Find where your users hang out:
- Reddit subreddits
- Discord servers
- Slack communities
- Facebook groups

**Don't spam**. Provide value first, mention your product when relevant.

### 4. Referral Program

Encourage word-of-mouth:

\`\`\`markdown
"Share [Product] with a friend and you both get [benefit]"
\`\`\`

## Handling the "AI-Built" Question

Be honest about using AI tools:

**Good framing**:
- "Built with AI assistance to ship faster"
- "Leveraged Cursor to focus on the product, not boilerplate"
- "AI helped me prototype, I refined for production"

**Avoid**:
- Hiding that you used AI
- Over-claiming AI capabilities
- Dismissing concerns about AI code quality

## Metrics to Track

### Launch metrics
- Visitors
- Sign-ups
- Conversion rate
- Traffic sources

### Growth metrics
- Daily/weekly active users
- Retention rate
- Feature usage
- User feedback

## Common Launch Mistakes

1. **Launching too early** - Fix critical bugs first
2. **No landing page** - People need to understand what it does
3. **Ignoring feedback** - Early users are gold
4. **One-and-done launch** - Keep promoting after day one
5. **Comparing to established products** - You're new, be humble

---

*Need technical help before launch? [Find a developer on CoderVibez](/marketplace).*
    `,
  },
];
