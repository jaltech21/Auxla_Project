-- OCSLAA Donations Table Schema
-- Run this in Supabase SQL Editor: https://app.supabase.com/project/mvjkhdavxurimtismbwt/sql

-- Drop existing table if it has old schema
DROP TABLE IF EXISTS donations CASCADE;

-- Create donations table with new schema
CREATE TABLE donations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  stripe_payment_intent_id VARCHAR(255) UNIQUE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  donor_name VARCHAR(255),
  donor_email VARCHAR(255) NOT NULL,
  donor_phone VARCHAR(50),
  is_anonymous BOOLEAN DEFAULT false,
  cover_fees BOOLEAN DEFAULT false,
  dedicated_to VARCHAR(255),
  message TEXT,
  payment_method VARCHAR(50) DEFAULT 'stripe',
  status VARCHAR(50) DEFAULT 'completed',
  receipt_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_donations_email ON donations(donor_email);
CREATE INDEX IF NOT EXISTS idx_donations_created ON donations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_donations_stripe_id ON donations(stripe_payment_intent_id);
CREATE INDEX IF NOT EXISTS idx_donations_status ON donations(status);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_donations_updated_at ON donations;
CREATE TRIGGER update_donations_updated_at
    BEFORE UPDATE ON donations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

-- Allow anonymous insert (for webhook/backend)
CREATE POLICY "Allow anonymous insert" ON donations
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow anonymous select (for stats)
CREATE POLICY "Allow anonymous select" ON donations
  FOR SELECT
  TO anon
  USING (true);

-- Allow service role full access
CREATE POLICY "Service role has full access" ON donations
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Grant permissions
GRANT SELECT, INSERT, UPDATE ON donations TO anon;
GRANT ALL ON donations TO service_role;

-- Verify table was created
SELECT 'Donations table created successfully!' AS status;
SELECT COUNT(*) AS existing_donations FROM donations;
