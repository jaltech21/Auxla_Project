-- Donation & Payment Integration Schema
-- Phase 5: OCSLAA Donation System

-- Donors table (must be created first as donations references it)
CREATE TABLE IF NOT EXISTS donors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  address_line1 VARCHAR(255),
  address_line2 VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(100),
  postal_code VARCHAR(20),
  country VARCHAR(100) DEFAULT 'Sierra Leone',
  total_donated DECIMAL(10, 2) DEFAULT 0,
  donation_count INTEGER DEFAULT 0,
  first_donation_at TIMESTAMP WITH TIME ZONE,
  last_donation_at TIMESTAMP WITH TIME ZONE,
  is_subscriber BOOLEAN DEFAULT false, -- Also subscribed to newsletter?
  preferences JSONB DEFAULT '{}', -- { "receiveUpdates": true, "receiveReceipts": true }
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Donations table
CREATE TABLE IF NOT EXISTS donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_id UUID REFERENCES donors(id) ON DELETE SET NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  payment_method VARCHAR(50), -- card, paypal, bank_transfer
  payment_status VARCHAR(50) DEFAULT 'pending', -- pending, completed, failed, refunded
  stripe_payment_intent_id VARCHAR(255) UNIQUE,
  stripe_charge_id VARCHAR(255),
  receipt_url TEXT,
  donation_type VARCHAR(50) DEFAULT 'one-time', -- one-time, monthly, yearly
  designation VARCHAR(100), -- mental-health, events, general, etc.
  is_anonymous BOOLEAN DEFAULT false,
  message TEXT,
  campaign_id UUID, -- Optional: link to specific campaign
  processed_at TIMESTAMP WITH TIME ZONE,
  refunded_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Recurring donations table
CREATE TABLE IF NOT EXISTS recurring_donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_id UUID REFERENCES donors(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  frequency VARCHAR(20) NOT NULL, -- monthly, yearly
  stripe_subscription_id VARCHAR(255) UNIQUE,
  status VARCHAR(50) DEFAULT 'active', -- active, paused, cancelled
  next_payment_date DATE,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  cancelled_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Donation campaigns (optional - for specific fundraising campaigns)
CREATE TABLE IF NOT EXISTS donation_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  goal_amount DECIMAL(10, 2),
  current_amount DECIMAL(10, 2) DEFAULT 0,
  donor_count INTEGER DEFAULT 0,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  status VARCHAR(50) DEFAULT 'draft', -- draft, active, completed, closed
  image_url TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_donations_donor_id ON donations(donor_id);
CREATE INDEX idx_donations_payment_status ON donations(payment_status);
CREATE INDEX idx_donations_created_at ON donations(created_at DESC);
CREATE INDEX idx_donations_stripe_payment_intent ON donations(stripe_payment_intent_id);
CREATE INDEX idx_donors_email ON donors(email);
CREATE INDEX idx_recurring_donations_donor_id ON recurring_donations(donor_id);
CREATE INDEX idx_recurring_donations_status ON recurring_donations(status);
CREATE INDEX idx_donation_campaigns_status ON donation_campaigns(status);

-- Update timestamp trigger
CREATE TRIGGER update_donations_updated_at
  BEFORE UPDATE ON donations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_donors_updated_at
  BEFORE UPDATE ON donors
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_recurring_donations_updated_at
  BEFORE UPDATE ON recurring_donations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_donation_campaigns_updated_at
  BEFORE UPDATE ON donation_campaigns
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security Policies
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE donors ENABLE ROW LEVEL SECURITY;
ALTER TABLE recurring_donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE donation_campaigns ENABLE ROW LEVEL SECURITY;

-- Donations policies
CREATE POLICY "Anyone can create donations"
  ON donations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view donations"
  ON donations FOR SELECT
  USING (true);

CREATE POLICY "Anyone can update donations"
  ON donations FOR UPDATE
  USING (true);

-- Donors policies
CREATE POLICY "Anyone can create donors"
  ON donors FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view donors"
  ON donors FOR SELECT
  USING (true);

CREATE POLICY "Anyone can update donors"
  ON donors FOR UPDATE
  USING (true);

-- Recurring donations policies
CREATE POLICY "Anyone can view recurring donations"
  ON recurring_donations FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create recurring donations"
  ON recurring_donations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update recurring donations"
  ON recurring_donations FOR UPDATE
  USING (true);

-- Donation campaigns policies
CREATE POLICY "Anyone can view campaigns"
  ON donation_campaigns FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create campaigns"
  ON donation_campaigns FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update campaigns"
  ON donation_campaigns FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Helper function to update donor totals
CREATE OR REPLACE FUNCTION update_donor_totals()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'INSERT' AND NEW.payment_status = 'completed') OR 
     (TG_OP = 'UPDATE' AND OLD.payment_status != 'completed' AND NEW.payment_status = 'completed') THEN
    UPDATE donors
    SET 
      total_donated = total_donated + NEW.amount,
      donation_count = donation_count + 1,
      last_donation_at = NEW.processed_at,
      first_donation_at = COALESCE(first_donation_at, NEW.processed_at)
    WHERE id = NEW.donor_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_donor_totals
  AFTER INSERT OR UPDATE ON donations
  FOR EACH ROW
  EXECUTE FUNCTION update_donor_totals();

-- Helper function to update campaign totals
CREATE OR REPLACE FUNCTION update_campaign_totals()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.campaign_id IS NOT NULL AND NEW.payment_status = 'completed' THEN
    UPDATE donation_campaigns
    SET 
      current_amount = current_amount + NEW.amount,
      donor_count = donor_count + 1
    WHERE id = NEW.campaign_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_campaign_totals
  AFTER INSERT OR UPDATE ON donations
  FOR EACH ROW
  EXECUTE FUNCTION update_campaign_totals();

-- Sample designation options
COMMENT ON COLUMN donations.designation IS 'Donation purpose: mental-health, youth-programs, community-outreach, crisis-support, education, general';
