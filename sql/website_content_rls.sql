-- Enable Row Level Security on all tables
ALTER TABLE website_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE features_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE features ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE how_it_works_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE how_it_works_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_plan_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users to have full access
CREATE POLICY authenticated_full_access ON website_content 
  FOR ALL 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

CREATE POLICY authenticated_full_access ON hero_sections 
  FOR ALL 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

CREATE POLICY authenticated_full_access ON features_sections 
  FOR ALL 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

CREATE POLICY authenticated_full_access ON features 
  FOR ALL 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

CREATE POLICY authenticated_full_access ON about_sections 
  FOR ALL 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

CREATE POLICY authenticated_full_access ON how_it_works_sections 
  FOR ALL 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

CREATE POLICY authenticated_full_access ON how_it_works_steps 
  FOR ALL 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

CREATE POLICY authenticated_full_access ON testimonials_sections 
  FOR ALL 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

CREATE POLICY authenticated_full_access ON testimonials 
  FOR ALL 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

CREATE POLICY authenticated_full_access ON pricing_sections 
  FOR ALL 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

CREATE POLICY authenticated_full_access ON pricing_plans 
  FOR ALL 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

CREATE POLICY authenticated_full_access ON pricing_plan_features 
  FOR ALL 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

CREATE POLICY authenticated_full_access ON partners_sections 
  FOR ALL 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

CREATE POLICY authenticated_full_access ON partners 
  FOR ALL 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

-- Create policies for public read access to website content
CREATE POLICY public_read_access ON website_content 
  FOR SELECT 
  TO anon 
  USING (true);

CREATE POLICY public_read_access ON hero_sections 
  FOR SELECT 
  TO anon 
  USING (true);

CREATE POLICY public_read_access ON features_sections 
  FOR SELECT 
  TO anon 
  USING (true);

CREATE POLICY public_read_access ON features 
  FOR SELECT 
  TO anon 
  USING (true);

CREATE POLICY public_read_access ON about_sections 
  FOR SELECT 
  TO anon 
  USING (true);

CREATE POLICY public_read_access ON how_it_works_sections 
  FOR SELECT 
  TO anon 
  USING (true);

CREATE POLICY public_read_access ON how_it_works_steps 
  FOR SELECT 
  TO anon 
  USING (true);

CREATE POLICY public_read_access ON testimonials_sections 
  FOR SELECT 
  TO anon 
  USING (true);

CREATE POLICY public_read_access ON testimonials 
  FOR SELECT 
  TO anon 
  USING (true);

CREATE POLICY public_read_access ON pricing_sections 
  FOR SELECT 
  TO anon 
  USING (true);

CREATE POLICY public_read_access ON pricing_plans 
  FOR SELECT 
  TO anon 
  USING (true);

CREATE POLICY public_read_access ON pricing_plan_features 
  FOR SELECT 
  TO anon 
  USING (true);

CREATE POLICY public_read_access ON partners_sections 
  FOR SELECT 
  TO anon 
  USING (true);

CREATE POLICY public_read_access ON partners 
  FOR SELECT 
  TO anon 
  USING (true); 