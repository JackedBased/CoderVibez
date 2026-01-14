# CoderVibez 🚀

**Bridge Vibe Coders & Real Devs – Fix AI Bugs Fast with SOL Bounties!**

CoderVibez is a marketplace that connects vibe coders (people building apps with AI tools like Cursor, v0, Bolt, Claude, etc.) with experienced developers who can troubleshoot, fix, refine, or complete their buggy prototypes.

## Features

- 🎨 **Modern Neon UI** - Beautiful dark theme with purple/blue gradients and glowing effects
- 🔐 **Authentication** - Email + Google OAuth via Supabase
- 💼 **Project Management** - Post projects with descriptions, code snippets, and GitHub links
- 💰 **SOL Bounties** - Set bounties in Solana and manage escrow
- 🤝 **Bidding System** - Developers browse and bid on projects
- ⚡ **Real-time Updates** - Live bid notifications via Supabase subscriptions
- 📚 **Resource Guides** - Helpful content for common vibe coding issues
- 👛 **Phantom Wallet** - Connect wallet, view balance, sign transactions

## Tech Stack

- **Framework**: Next.js 15+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth (Email + Google OAuth)
- **Blockchain**: Solana (via @solana/web3.js)
- **Wallet**: Phantom (via @solana/wallet-adapter)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Phantom wallet (for testing)
- Helius API key (optional, for better Solana RPC)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/codervibez.git
   cd codervibez
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Fill in your values:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   NEXT_PUBLIC_SOLANA_RPC_URL=https://devnet.helius-rpc.com/?api-key=your-key
   NEXT_PUBLIC_SOLANA_NETWORK=devnet
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Set up the database**
   
   Go to your Supabase dashboard → SQL Editor and run the contents of `supabase/schema.sql`

5. **Configure Supabase Auth**
   
   In Supabase dashboard → Authentication → Providers:
   - Enable Email provider
   - Enable Google provider (add OAuth credentials)
   - Add `http://localhost:3000/auth/callback` to Redirect URLs

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open** [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Auth pages (login, signup)
│   ├── (protected)/       # Protected pages (dashboard, profile)
│   ├── auth/              # Auth callback route
│   ├── marketplace/       # Browse projects
│   ├── projects/          # Project detail pages
│   └── resources/         # Resource guides
├── components/
│   ├── layout/            # Header, Footer, Navigation
│   ├── projects/          # Project cards, filters
│   ├── providers/         # App providers (Solana, etc.)
│   ├── ui/                # shadcn/ui components
│   └── wallet/            # Wallet connection button
├── lib/
│   ├── solana/            # Solana utilities
│   └── supabase/          # Supabase clients
└── types/                 # TypeScript types
```

## Key Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with features and CTA |
| `/login` | User login (email/Google) |
| `/signup` | User registration |
| `/dashboard` | User's projects and bids |
| `/post-project` | Create new project with bounty |
| `/marketplace` | Browse all open projects |
| `/projects/[id]` | Project detail with bids |
| `/resources` | Help guides and tutorials |
| `/profile` | User profile page |

## Solana Integration

The app uses Solana for bounty management:

1. **Escrow Creation**: When posting a project, users transfer SOL to an escrow wallet
2. **Bid System**: Developers bid in SOL amounts
3. **Payment Release**: When project owner approves, funds release to developer

For development, use Devnet SOL (free from faucets).

## Deployment

### Deploy to Render

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/codervibez.git
   git push -u origin main
   ```

2. **Create Web Service on Render**
   - Go to [render.com](https://render.com) → New → Web Service
   - Connect your GitHub repository
   - Configure settings:
     - **Name**: `codervibez`
     - **Runtime**: `Node`
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `npm start`
     - **Instance Type**: Free or Starter

3. **Add Environment Variables in Render Dashboard**
   
   | Variable | Value |
   |----------|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | `https://rlcsppywouncjmgfapw.supabase.co` |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your anon key from Supabase |
   | `NEXT_PUBLIC_SOLANA_RPC_URL` | `https://api.devnet.solana.com` |
   | `NEXT_PUBLIC_SOLANA_NETWORK` | `devnet` |
   | `NEXT_PUBLIC_APP_URL` | `https://codervibez.onrender.com` |

4. **Update Supabase Redirect URLs**
   
   In Supabase Dashboard → Authentication → URL Configuration:
   - Add `https://codervibez.onrender.com/auth/callback` to Redirect URLs

5. **Deploy!** - Render will automatically build and deploy

### Environment Variables for Production

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SOLANA_RPC_URL=https://mainnet.helius-rpc.com/?api-key=your-key
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
NEXT_PUBLIC_APP_URL=https://codervibez.onrender.com
```

## Next Steps

After initial setup, consider:

1. **Test authentication flow** - Sign up, log in, log out
2. **Test wallet connection** - Connect Phantom on devnet
3. **Post a test project** - Create project with escrow
4. **Place a test bid** - Log in as different user and bid
5. **Add real-time bid notifications** - Already set up, verify it works
6. **Set up production Solana escrow** - Generate proper escrow keypair
7. **Add email notifications** - Use Supabase Edge Functions
8. **Implement proper escrow release** - Server-side transaction signing

## Contributing

Contributions welcome! Please read our contributing guidelines first.

## License

MIT License - see LICENSE for details.

---

Built with ❤️ by vibe coders, for vibe coders.
