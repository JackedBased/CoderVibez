import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  TransactionSignature,
} from "@solana/web3.js";
import { connection, ESCROW_WALLET_PUBKEY, PLATFORM_FEE_PERCENTAGE } from "./config";

export async function getBalance(publicKey: PublicKey): Promise<number> {
  try {
    const balance = await connection.getBalance(publicKey);
    return balance;
  } catch (error) {
    console.error("Error fetching balance:", error);
    return 0;
  }
}

export async function getBalanceInSol(publicKey: PublicKey): Promise<number> {
  const lamports = await getBalance(publicKey);
  return lamports / LAMPORTS_PER_SOL;
}

export interface CreateEscrowTransactionParams {
  fromPubkey: PublicKey;
  amountInLamports: number;
}

export async function createEscrowTransaction({
  fromPubkey,
  amountInLamports,
}: CreateEscrowTransactionParams): Promise<Transaction> {
  if (!ESCROW_WALLET_PUBKEY) {
    throw new Error("Escrow wallet not configured");
  }

  const transaction = new Transaction();
  
  // Add transfer instruction to escrow wallet
  transaction.add(
    SystemProgram.transfer({
      fromPubkey,
      toPubkey: ESCROW_WALLET_PUBKEY,
      lamports: amountInLamports,
    })
  );

  // Get recent blockhash
  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = fromPubkey;
  transaction.lastValidBlockHeight = lastValidBlockHeight;

  return transaction;
}

export interface ReleaseEscrowParams {
  toPubkey: PublicKey;
  amountInLamports: number;
  projectId: string;
}

// This function would be called from server-side with the escrow wallet
// For MVP, we simulate this - in production, you'd sign with the escrow private key
export async function createReleaseTransaction({
  toPubkey,
  amountInLamports,
}: Omit<ReleaseEscrowParams, "projectId">): Promise<Transaction> {
  if (!ESCROW_WALLET_PUBKEY) {
    throw new Error("Escrow wallet not configured");
  }

  // Calculate platform fee
  const platformFee = Math.floor(amountInLamports * PLATFORM_FEE_PERCENTAGE);
  const developerPayout = amountInLamports - platformFee;

  const transaction = new Transaction();

  // Transfer to developer (minus platform fee)
  transaction.add(
    SystemProgram.transfer({
      fromPubkey: ESCROW_WALLET_PUBKEY,
      toPubkey,
      lamports: developerPayout,
    })
  );

  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = ESCROW_WALLET_PUBKEY;
  transaction.lastValidBlockHeight = lastValidBlockHeight;

  return transaction;
}

export async function confirmTransaction(
  signature: TransactionSignature
): Promise<boolean> {
  try {
    const result = await connection.confirmTransaction(signature, "confirmed");
    return !result.value.err;
  } catch (error) {
    console.error("Error confirming transaction:", error);
    return false;
  }
}

export function lamportsToSol(lamports: number): number {
  return lamports / LAMPORTS_PER_SOL;
}

export function solToLamports(sol: number): number {
  return Math.round(sol * LAMPORTS_PER_SOL);
}

export function formatLamports(lamports: number, decimals = 4): string {
  return lamportsToSol(lamports).toFixed(decimals);
}

export function isValidPublicKey(address: string): boolean {
  try {
    new PublicKey(address);
    return true;
  } catch {
    return false;
  }
}
