"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";
import { Wallet, ChevronDown, Copy, ExternalLink, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { shortenAddress } from "@/lib/utils";
import { getBalanceInSol } from "@/lib/solana/utils";
import { toast } from "sonner";

export function WalletButton() {
  const { connected, publicKey, disconnect } = useWallet();
  const { setVisible } = useWalletModal();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (connected && publicKey) {
      getBalanceInSol(publicKey).then(setBalance);
      
      // Refresh balance every 30 seconds
      const interval = setInterval(() => {
        getBalanceInSol(publicKey).then(setBalance);
      }, 30000);

      return () => clearInterval(interval);
    } else {
      setBalance(null);
    }
  }, [connected, publicKey]);

  const handleConnect = () => {
    setVisible(true);
  };

  const handleCopyAddress = async () => {
    if (publicKey) {
      await navigator.clipboard.writeText(publicKey.toBase58());
      toast.success("Address copied to clipboard");
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      toast.success("Wallet disconnected");
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
      toast.error("Failed to disconnect wallet");
    }
  };

  const handleViewExplorer = () => {
    if (publicKey) {
      const network = process.env.NEXT_PUBLIC_SOLANA_NETWORK || "devnet";
      const explorerUrl =
        network === "mainnet-beta"
          ? `https://explorer.solana.com/address/${publicKey.toBase58()}`
          : `https://explorer.solana.com/address/${publicKey.toBase58()}?cluster=${network}`;
      window.open(explorerUrl, "_blank");
    }
  };

  if (!connected) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={handleConnect}
        className="gap-2"
      >
        <Wallet className="h-4 w-4" />
        <span className="hidden sm:inline">Connect Wallet</span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="font-mono text-xs">
              {publicKey && shortenAddress(publicKey.toBase58())}
            </span>
            {balance !== null && (
              <span className="text-purple-400 font-semibold">
                {balance.toFixed(2)} SOL
              </span>
            )}
          </div>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={handleCopyAddress} className="cursor-pointer">
          <Copy className="mr-2 h-4 w-4" />
          Copy Address
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleViewExplorer} className="cursor-pointer">
          <ExternalLink className="mr-2 h-4 w-4" />
          View Explorer
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleDisconnect}
          className="cursor-pointer text-red-400 focus:text-red-400"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
