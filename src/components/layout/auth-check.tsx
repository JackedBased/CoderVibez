"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { UserNav } from "@/components/layout/user-nav";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { User } from "@/types/database";

interface AuthCheckProps {
  serverUser: User | null;
}

export function AuthCheck({ serverUser }: AuthCheckProps) {
  const [user, setUser] = useState<User | null>(serverUser);
  const [loading, setLoading] = useState(!serverUser);

  useEffect(() => {
    // If we have a server user, use it
    if (serverUser) {
      setUser(serverUser);
      setLoading(false);
      return;
    }

    // Otherwise, check client-side
    const checkAuth = async () => {
      try {
        const supabase = createClient();
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser();

        if (authUser) {
          // Try to get user profile
          const { data: profileData } = await supabase
            .from("users")
            .select("*")
            .eq("id", authUser.id)
            .single();

          if (profileData) {
            setUser(profileData);
          } else {
            // Fallback to auth user data
            setUser({
              id: authUser.id,
              email: authUser.email || "",
              full_name: authUser.user_metadata?.full_name || authUser.user_metadata?.name || null,
              avatar_url: authUser.user_metadata?.avatar_url || authUser.user_metadata?.picture || null,
              role: "both" as const,
              created_at: authUser.created_at,
              updated_at: authUser.updated_at || authUser.created_at,
            } as any);
          }
        }
      } catch (error) {
        console.error("Error checking auth:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Listen for auth state changes
    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        // Refresh user data when auth state changes
        checkAuth();
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [serverUser]);

  if (loading) {
    return null; // Don't show anything while loading
  }

  if (user) {
    return <UserNav user={user} />;
  }

  return (
    <div className="hidden md:flex items-center gap-2">
      <Button variant="ghost" asChild>
        <Link href="/login">Log in</Link>
      </Button>
      <Button asChild>
        <Link href="/signup">Get Started</Link>
      </Button>
    </div>
  );
}
