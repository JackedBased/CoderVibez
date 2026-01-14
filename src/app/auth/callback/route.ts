import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const error = requestUrl.searchParams.get("error");
  const errorDescription = requestUrl.searchParams.get("error_description");
  const redirect = requestUrl.searchParams.get("redirect") || "/dashboard";
  
  // Use NEXT_PUBLIC_APP_URL if available, otherwise fall back to request origin
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || requestUrl.origin;

  // Handle OAuth errors
  if (error) {
    console.error("OAuth error:", error, errorDescription);
    // Redirect to login with error message
    return NextResponse.redirect(`${appUrl}/login?error=${encodeURIComponent(errorDescription || error)}`);
  }

  if (code) {
    const supabase = await createClient();
    const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
      console.error("Session exchange error:", exchangeError);
      return NextResponse.redirect(`${appUrl}/login?error=${encodeURIComponent(exchangeError.message)}`);
    }

    if (data.user) {
      // Check if user profile exists, if not create one
      const { data: existingUser } = await supabase
        .from("users")
        .select("id")
        .eq("id", data.user.id)
        .single();

      if (!existingUser) {
        // Create user profile
        await supabase.from("users").insert({
          id: data.user.id,
          email: data.user.email!,
          full_name: data.user.user_metadata?.full_name || data.user.user_metadata?.name || null,
          avatar_url: data.user.user_metadata?.avatar_url || data.user.user_metadata?.picture || null,
          role: "both" as const,
        } as any);
      }
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(`${appUrl}${redirect}`);
}
