import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CoderVibez - Bridge Vibe Coders & Real Devs",
  description:
    "Marketplace connecting vibe coders with experienced developers. Fix AI-generated bugs fast with SOL bounties.",
  keywords: [
    "vibe coding",
    "AI coding",
    "bug fixes",
    "Solana",
    "bounties",
    "Cursor",
    "v0",
    "Claude",
  ],
  openGraph: {
    title: "CoderVibez - Bridge Vibe Coders & Real Devs",
    description:
      "Marketplace connecting vibe coders with experienced developers. Fix AI-generated bugs fast with SOL bounties.",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let user = null;

  // Only attempt to get user if Supabase is configured
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const {
        data: { user: authUser },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) {
        console.error("Auth error in layout:", authError);
      }

      if (authUser) {
        // Try to get user profile from database
        const { data: profileData, error: profileError } = await supabase
          .from("users")
          .select("*")
          .eq("id", authUser.id)
          .single();

        if (profileError) {
          console.error("Error fetching user profile:", profileError);
          // If profile doesn't exist, create a minimal user object from auth data
          // This ensures the UI still shows the user as logged in
          user = {
            id: authUser.id,
            email: authUser.email || "",
            full_name: authUser.user_metadata?.full_name || authUser.user_metadata?.name || null,
            avatar_url: authUser.user_metadata?.avatar_url || authUser.user_metadata?.picture || null,
            role: "both" as const,
            created_at: authUser.created_at,
            updated_at: authUser.updated_at || authUser.created_at,
          } as any;
        } else {
          user = profileData;
        }
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Providers>
          <div className="fixed inset-0 bg-grid pointer-events-none opacity-50" />
          <div className="relative flex flex-col min-h-screen">
            <Header user={user} />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
