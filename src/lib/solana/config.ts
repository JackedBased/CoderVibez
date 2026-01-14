import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";

// Network configuration
export const SOLANA_NETWORK = (process.env.NEXT_PUBLIC_SOLANA_NETWORK || "devnet") as "mainnet-beta" | "devnet" | "testnet";

// RPC endpoint - prefer Helius for production
export const SOLANA_RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || clusterApiUrl(SOLANA_NETWORK);

// Create connection instance
export const connection = new Connection(SOLANA_RPC_URL, "confirmed");

// Escrow wallet public key (set this after generating your escrow wallet)
export const ESCROW_WALLET_PUBKEY = process.env.NEXT_PUBLIC_ESCROW_WALLET_PUBKEY 
  ? new PublicKey(process.env.NEXT_PUBLIC_ESCROW_WALLET_PUBKEY)
  : null;

// Minimum bounty amount in SOL
export const MIN_BOUNTY_SOL = 0.01;

// Platform fee percentage (e.g., 2.5% = 0.025)
export const PLATFORM_FEE_PERCENTAGE = 0.025;

// Transaction confirmation options
export const CONFIRMATION_OPTIONS = {
  commitment: "confirmed" as const,
  maxRetries: 3,
};
