"use client";

import { ReactNode } from "react";
import { SolanaProvider } from "./solana-provider";
import { Toaster } from "@/components/ui/sonner";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SolanaProvider>
      {children}
      <Toaster position="bottom-right" richColors />
    </SolanaProvider>
  );
}
