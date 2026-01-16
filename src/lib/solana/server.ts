import { Keypair, PublicKey, Transaction, SystemProgram } from "@solana/web3.js";
import { connection, PLATFORM_FEE_PERCENTAGE } from "./config";

/**
 * Get the escrow wallet keypair from environment variable
 * Supports both JSON array format and base58 string format
 */
export function getEscrowKeypair(): Keypair {
  const secretKey = process.env.ESCROW_WALLET_SECRET_KEY;
  
  if (!secretKey) {
    throw new Error("ESCROW_WALLET_SECRET_KEY environment variable is not set");
  }

  try {
    // Try parsing as JSON array first (e.g., [1,2,3,...])
    const parsed = JSON.parse(secretKey);
    if (Array.isArray(parsed)) {
      return Keypair.fromSecretKey(new Uint8Array(parsed));
    }
  } catch {
    // Not JSON, try base58
    try {
      // @ts-ignore - bs58 may not be installed
      const bs58 = require("bs58");
      const decoded = bs58.decode(secretKey);
      return Keypair.fromSecretKey(decoded);
    } catch {
      throw new Error(
        "ESCROW_WALLET_SECRET_KEY must be either a JSON array or base58 string. " +
        "For base58, install bs58: npm install bs58"
      );
    }
  }

  throw new Error("Invalid ESCROW_WALLET_SECRET_KEY format");
}

/**
 * Create and sign a transaction to release escrow funds to a developer
 */
export async function createAndSignReleaseTransaction(
  toPubkey: PublicKey,
  amountInLamports: number
): Promise<Transaction> {
  const escrowKeypair = getEscrowKeypair();
  
  // Calculate platform fee
  const platformFee = Math.floor(amountInLamports * PLATFORM_FEE_PERCENTAGE);
  const developerPayout = amountInLamports - platformFee;

  const transaction = new Transaction();

  // Transfer to developer (minus platform fee)
  transaction.add(
    SystemProgram.transfer({
      fromPubkey: escrowKeypair.publicKey,
      toPubkey,
      lamports: developerPayout,
    })
  );

  // Get recent blockhash
  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = escrowKeypair.publicKey;
  transaction.lastValidBlockHeight = lastValidBlockHeight;

  // Sign transaction with escrow wallet
  transaction.sign(escrowKeypair);

  return transaction;
}

/**
 * Create and sign a transaction to refund escrow funds to project owner
 */
export async function createAndSignRefundTransaction(
  toPubkey: PublicKey,
  amountInLamports: number
): Promise<Transaction> {
  const escrowKeypair = getEscrowKeypair();

  const transaction = new Transaction();

  // Transfer full amount back to project owner
  transaction.add(
    SystemProgram.transfer({
      fromPubkey: escrowKeypair.publicKey,
      toPubkey,
      lamports: amountInLamports,
    })
  );

  // Get recent blockhash
  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = escrowKeypair.publicKey;
  transaction.lastValidBlockHeight = lastValidBlockHeight;

  // Sign transaction with escrow wallet
  transaction.sign(escrowKeypair);

  return transaction;
}
