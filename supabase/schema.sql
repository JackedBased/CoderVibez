-- ===========================================
-- CODERVIBEZ DATABASE SCHEMA
-- ===========================================
-- Run this SQL in your Supabase SQL Editor to set up the database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===========================================
-- ENUMS
-- ===========================================

CREATE TYPE user_role AS ENUM ('vibe_coder', 'developer', 'both');
CREATE TYPE project_status AS ENUM ('open', 'in_progress', 'completed', 'cancelled');
CREATE TYPE bid_status AS ENUM ('pending', 'accepted', 'rejected', 'withdrawn');

-- ===========================================
-- TABLES
-- ===========================================

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    wallet_address TEXT,
    bio TEXT,
    role user_role DEFAULT 'both',
    github_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects table
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    tools_used TEXT[] NOT NULL DEFAULT '{}',
    category TEXT NOT NULL,
    code_snippet TEXT,
    github_url TEXT,
    file_url TEXT,
    bounty_amount BIGINT NOT NULL, -- stored in lamports
    deadline TIMESTAMPTZ,
    status project_status DEFAULT 'open',
    escrow_tx_signature TEXT,
    accepted_bid_id UUID,
    completion_tx_signature TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bids table
CREATE TABLE bids (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    bidder_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    amount BIGINT NOT NULL, -- stored in lamports
    estimated_time TEXT NOT NULL,
    message TEXT NOT NULL,
    status bid_status DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(project_id, bidder_id) -- One bid per user per project
);

-- Notifications table
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    link TEXT,
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add foreign key for accepted_bid_id after bids table is created
ALTER TABLE projects 
ADD CONSTRAINT fk_accepted_bid 
FOREIGN KEY (accepted_bid_id) 
REFERENCES bids(id) ON DELETE SET NULL;

-- ===========================================
-- INDEXES
-- ===========================================

CREATE INDEX idx_projects_owner ON projects(owner_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX idx_bids_project ON bids(project_id);
CREATE INDEX idx_bids_bidder ON bids(bidder_id);
CREATE INDEX idx_bids_status ON bids(status);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(user_id, read);

-- ===========================================
-- ROW LEVEL SECURITY
-- ===========================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE bids ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view all profiles"
ON users FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Users can update own profile"
ON users FOR UPDATE
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
ON users FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- Projects policies
CREATE POLICY "Anyone can view open projects"
ON projects FOR SELECT
TO authenticated
USING (status = 'open' OR owner_id = auth.uid() OR 
       id IN (SELECT project_id FROM bids WHERE bidder_id = auth.uid()));

CREATE POLICY "Public can view open projects"
ON projects FOR SELECT
TO anon
USING (status = 'open');

CREATE POLICY "Users can create projects"
ON projects FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners can update own projects"
ON projects FOR UPDATE
TO authenticated
USING (auth.uid() = owner_id);

CREATE POLICY "Owners can delete own projects"
ON projects FOR DELETE
TO authenticated
USING (auth.uid() = owner_id);

-- Bids policies
CREATE POLICY "Anyone can view bids on open projects"
ON bids FOR SELECT
TO authenticated
USING (
    project_id IN (SELECT id FROM projects WHERE status = 'open') OR
    bidder_id = auth.uid() OR
    project_id IN (SELECT id FROM projects WHERE owner_id = auth.uid())
);

CREATE POLICY "Users can create bids"
ON bids FOR INSERT
TO authenticated
WITH CHECK (
    auth.uid() = bidder_id AND
    project_id IN (SELECT id FROM projects WHERE status = 'open' AND owner_id != auth.uid())
);

CREATE POLICY "Bidders can update own pending bids"
ON bids FOR UPDATE
TO authenticated
USING (auth.uid() = bidder_id AND status = 'pending');

CREATE POLICY "Project owners can update bid status"
ON bids FOR UPDATE
TO authenticated
USING (project_id IN (SELECT id FROM projects WHERE owner_id = auth.uid()));

-- Notifications policies
CREATE POLICY "Users can view own notifications"
ON notifications FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
ON notifications FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- ===========================================
-- FUNCTIONS
-- ===========================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_bids_updated_at
    BEFORE UPDATE ON bids
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

-- Function to create user profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, full_name, avatar_url)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
        COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile on signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION handle_new_user();

-- Function to create notification on bid
CREATE OR REPLACE FUNCTION notify_on_new_bid()
RETURNS TRIGGER AS $$
DECLARE
    project_owner_id UUID;
    project_title TEXT;
    bidder_name TEXT;
BEGIN
    -- Get project details
    SELECT owner_id, title INTO project_owner_id, project_title
    FROM projects WHERE id = NEW.project_id;
    
    -- Get bidder name
    SELECT COALESCE(full_name, email) INTO bidder_name
    FROM users WHERE id = NEW.bidder_id;
    
    -- Create notification for project owner
    INSERT INTO notifications (user_id, type, title, message, link)
    VALUES (
        project_owner_id,
        'new_bid',
        'New Bid Received',
        bidder_name || ' placed a bid on "' || project_title || '"',
        '/projects/' || NEW.project_id
    );
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_new_bid
    AFTER INSERT ON bids
    FOR EACH ROW
    EXECUTE FUNCTION notify_on_new_bid();

-- Function to notify bidder when bid is accepted
CREATE OR REPLACE FUNCTION notify_on_bid_accepted()
RETURNS TRIGGER AS $$
DECLARE
    project_title TEXT;
BEGIN
    IF NEW.status = 'accepted' AND OLD.status = 'pending' THEN
        SELECT title INTO project_title
        FROM projects WHERE id = NEW.project_id;
        
        INSERT INTO notifications (user_id, type, title, message, link)
        VALUES (
            NEW.bidder_id,
            'bid_accepted',
            'Bid Accepted! 🎉',
            'Your bid on "' || project_title || '" has been accepted!',
            '/projects/' || NEW.project_id
        );
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_bid_status_change
    AFTER UPDATE ON bids
    FOR EACH ROW
    EXECUTE FUNCTION notify_on_bid_accepted();

-- ===========================================
-- REALTIME
-- ===========================================

-- Enable realtime for relevant tables
ALTER PUBLICATION supabase_realtime ADD TABLE projects;
ALTER PUBLICATION supabase_realtime ADD TABLE bids;
ALTER PUBLICATION supabase_realtime ADD TABLE notifications;
