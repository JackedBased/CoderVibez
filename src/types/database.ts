// Database types for Supabase
// Run `npm run db:generate-types` to regenerate from your schema

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type ProjectStatus = "open" | "in_progress" | "completed" | "cancelled";
export type BidStatus = "pending" | "accepted" | "rejected" | "withdrawn";
export type UserRole = "vibe_coder" | "developer" | "both";

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          wallet_address: string | null;
          bio: string | null;
          role: UserRole;
          github_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          wallet_address?: string | null;
          bio?: string | null;
          role?: UserRole;
          github_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          wallet_address?: string | null;
          bio?: string | null;
          role?: UserRole;
          github_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          owner_id: string;
          title: string;
          description: string;
          tools_used: string[];
          category: string;
          code_snippet: string | null;
          github_url: string | null;
          file_url: string | null;
          bounty_amount: number; // in lamports
          deadline: string | null;
          status: ProjectStatus;
          escrow_tx_signature: string | null;
          accepted_bid_id: string | null;
          completion_tx_signature: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          owner_id: string;
          title: string;
          description: string;
          tools_used: string[];
          category: string;
          code_snippet?: string | null;
          github_url?: string | null;
          file_url?: string | null;
          bounty_amount: number;
          deadline?: string | null;
          status?: ProjectStatus;
          escrow_tx_signature?: string | null;
          accepted_bid_id?: string | null;
          completion_tx_signature?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          owner_id?: string;
          title?: string;
          description?: string;
          tools_used?: string[];
          category?: string;
          code_snippet?: string | null;
          github_url?: string | null;
          file_url?: string | null;
          bounty_amount?: number;
          deadline?: string | null;
          status?: ProjectStatus;
          escrow_tx_signature?: string | null;
          accepted_bid_id?: string | null;
          completion_tx_signature?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      bids: {
        Row: {
          id: string;
          project_id: string;
          bidder_id: string;
          amount: number; // in lamports
          estimated_time: string;
          message: string;
          status: BidStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          bidder_id: string;
          amount: number;
          estimated_time: string;
          message: string;
          status?: BidStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          bidder_id?: string;
          amount?: number;
          estimated_time?: string;
          message?: string;
          status?: BidStatus;
          created_at?: string;
          updated_at?: string;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          title: string;
          message: string;
          link: string | null;
          read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: string;
          title: string;
          message: string;
          link?: string | null;
          read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: string;
          title?: string;
          message?: string;
          link?: string | null;
          read?: boolean;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      project_status: ProjectStatus;
      bid_status: BidStatus;
      user_role: UserRole;
    };
  };
}

// Convenience types
export type User = Database["public"]["Tables"]["users"]["Row"];
export type Project = Database["public"]["Tables"]["projects"]["Row"];
export type Bid = Database["public"]["Tables"]["bids"]["Row"];
export type Notification = Database["public"]["Tables"]["notifications"]["Row"];

// Extended types with relations
export type ProjectWithOwner = Project & {
  owner: User;
};

export type ProjectWithBids = Project & {
  bids: (Bid & { bidder: User })[];
  owner: User;
};

export type BidWithBidder = Bid & {
  bidder: User;
};

export type BidWithProject = Bid & {
  project: Project;
};
