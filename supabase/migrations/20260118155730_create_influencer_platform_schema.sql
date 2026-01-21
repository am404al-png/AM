/*
  # Influencer Business Intelligence Platform Schema

  1. New Tables
    - `platform_metrics`
      - `id` (uuid, primary key)
      - `metric_type` (text) - revenue, linkedin_followers, facebook_followers, discord_members, linkedin_views, discord_activity
      - `current_value` (numeric) - current value of the metric
      - `updated_at` (timestamptz) - last update timestamp
    
    - `review_pipeline`
      - `id` (uuid, primary key)
      - `company_name` (text) - company or product name
      - `logo_url` (text) - URL to company logo
      - `type` (text) - Review, Interview, Demo
      - `status` (text) - Pending, Confirmed, Completed
      - `order_index` (integer) - display order
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `brand_partnerships`
      - `id` (uuid, primary key)
      - `brand_name` (text)
      - `logo_url` (text)
      - `is_completed` (boolean)
      - `order_index` (integer)
      - `created_at` (timestamptz)
    
    - `activity_logs`
      - `id` (uuid, primary key)
      - `message` (text) - activity message
      - `created_at` (timestamptz)
    
    - `audience_messages`
      - `id` (uuid, primary key)
      - `message` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access (this is a public dashboard)
    - Restrict write access (admin only, to be implemented later)
*/

-- Platform Metrics Table
CREATE TABLE IF NOT EXISTS platform_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_type text UNIQUE NOT NULL,
  current_value numeric NOT NULL DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE platform_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view platform metrics"
  ON platform_metrics FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can update platform metrics"
  ON platform_metrics FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can insert platform metrics"
  ON platform_metrics FOR INSERT
  TO anon
  WITH CHECK (true);

-- Review Pipeline Table
CREATE TABLE IF NOT EXISTS review_pipeline (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  logo_url text DEFAULT '',
  type text NOT NULL DEFAULT 'Review',
  status text NOT NULL DEFAULT 'Pending',
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE review_pipeline ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view review pipeline"
  ON review_pipeline FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can manage review pipeline"
  ON review_pipeline FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

-- Brand Partnerships Table
CREATE TABLE IF NOT EXISTS brand_partnerships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_name text NOT NULL,
  logo_url text DEFAULT '',
  is_completed boolean DEFAULT true,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE brand_partnerships ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view brand partnerships"
  ON brand_partnerships FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can manage brand partnerships"
  ON brand_partnerships FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

-- Activity Logs Table
CREATE TABLE IF NOT EXISTS activity_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view activity logs"
  ON activity_logs FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can insert activity logs"
  ON activity_logs FOR INSERT
  TO anon
  WITH CHECK (true);

-- Audience Messages Table
CREATE TABLE IF NOT EXISTS audience_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE audience_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view audience messages"
  ON audience_messages FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can insert audience messages"
  ON audience_messages FOR INSERT
  TO anon
  WITH CHECK (true);

-- Insert initial platform metrics
INSERT INTO platform_metrics (metric_type, current_value) VALUES
  ('revenue', 1.00),
  ('linkedin_followers', 7000),
  ('facebook_followers', 5000),
  ('discord_members', 50000),
  ('linkedin_views', 15000),
  ('discord_activity', 8000)
ON CONFLICT (metric_type) DO NOTHING;

-- Insert sample review pipeline items
INSERT INTO review_pipeline (company_name, type, status, order_index) VALUES
  ('TechCorp', 'Review', 'Confirmed', 1),
  ('StartupX', 'Interview', 'Pending', 2),
  ('ProductY', 'Demo', 'Pending', 3),
  ('CompanyZ', 'Review', 'Completed', 4),
  ('BrandA', 'Review', 'Confirmed', 5),
  ('ServiceB', 'Interview', 'Pending', 6),
  ('PlatformC', 'Demo', 'Confirmed', 7),
  ('ToolD', 'Review', 'Pending', 8),
  ('AppE', 'Review', 'Pending', 9),
  ('DeviceF', 'Review', 'Confirmed', 10),
  ('SoftwareG', 'Interview', 'Pending', 11),
  ('HardwareH', 'Demo', 'Pending', 12),
  ('SystemI', 'Review', 'Confirmed', 13),
  ('NetworkJ', 'Review', 'Pending', 14),
  ('CloudK', 'Interview', 'Confirmed', 15),
  ('DataL', 'Demo', 'Pending', 16),
  ('SecureM', 'Review', 'Pending', 17),
  ('AnalyticsN', 'Review', 'Confirmed', 18)
ON CONFLICT DO NOTHING;

-- Insert sample brand partnerships
INSERT INTO brand_partnerships (brand_name, is_completed, order_index) VALUES
  ('Microsoft', true, 1),
  ('Google', true, 2),
  ('Amazon', true, 3),
  ('Apple', true, 4),
  ('Meta', true, 5),
  ('IBM', true, 6)
ON CONFLICT DO NOTHING;