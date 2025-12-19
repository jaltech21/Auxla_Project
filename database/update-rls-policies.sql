-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Authenticated users can view subscribers" ON subscribers;
DROP POLICY IF EXISTS "Authenticated users can view campaigns" ON newsletter_campaigns;
DROP POLICY IF EXISTS "Authenticated users can update campaigns" ON newsletter_campaigns;
DROP POLICY IF EXISTS "Authenticated users can view tracking" ON campaign_tracking;

-- Create new open policies for backend access
CREATE POLICY "Anyone can view subscribers"
  ON subscribers FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view campaigns"
  ON newsletter_campaigns FOR SELECT
  USING (true);

CREATE POLICY "Anyone can update campaigns"
  ON newsletter_campaigns FOR UPDATE
  USING (true);

CREATE POLICY "Anyone can view tracking"
  ON campaign_tracking FOR SELECT
  USING (true);
