-- Create functions to get website content by domain
CREATE OR REPLACE FUNCTION get_website_content_by_domain(domain_param TEXT)
RETURNS TABLE (
  tenant_id UUID,
  tenant_name TEXT,
  website_content_id UUID,
  last_updated TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    t.id AS tenant_id,
    t.name AS tenant_name,
    wc.id AS website_content_id,
    wc.last_updated
  FROM 
    tenants t
    JOIN website_content wc ON t.id = wc.tenant_id
  WHERE 
    t.domain = domain_param
    AND t.status = 'active';
END;
$$ LANGUAGE plpgsql;

-- Function to get hero section by domain
CREATE OR REPLACE FUNCTION get_hero_section_by_domain(domain_param TEXT)
RETURNS TABLE (
  hero_id UUID,
  heading TEXT,
  subheading TEXT,
  cta_text TEXT,
  cta_secondary_text TEXT,
  background_image TEXT,
  introduction_video_url TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    h.id AS hero_id,
    h.heading,
    h.subheading,
    h.cta_text,
    h.cta_secondary_text,
    h.background_image,
    h.introduction_video_url
  FROM 
    tenants t
    JOIN website_content wc ON t.id = wc.tenant_id
    JOIN hero_sections h ON wc.id = h.website_content_id
  WHERE 
    t.domain = domain_param
    AND t.status = 'active';
END;
$$ LANGUAGE plpgsql;

-- Function to get features section by domain
CREATE OR REPLACE FUNCTION get_features_section_by_domain(domain_param TEXT)
RETURNS TABLE (
  features_section_id UUID,
  heading TEXT,
  subheading TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    fs.id AS features_section_id,
    fs.heading,
    fs.subheading
  FROM 
    tenants t
    JOIN website_content wc ON t.id = wc.tenant_id
    JOIN features_sections fs ON wc.id = fs.website_content_id
  WHERE 
    t.domain = domain_param
    AND t.status = 'active';
END;
$$ LANGUAGE plpgsql;

-- Function to get features by features section ID
CREATE OR REPLACE FUNCTION get_features_by_section_id(section_id_param UUID)
RETURNS TABLE (
  feature_id UUID,
  title TEXT,
  description TEXT,
  icon TEXT,
  image TEXT,
  display_order INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    f.id AS feature_id,
    f.title,
    f.description,
    f.icon,
    f.image,
    f.display_order
  FROM 
    features f
  WHERE 
    f.features_section_id = section_id_param
  ORDER BY
    f.display_order;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply the trigger to all tables
CREATE TRIGGER update_tenants_updated_at
  BEFORE UPDATE ON tenants
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_website_content_updated_at
  BEFORE UPDATE ON website_content
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hero_sections_updated_at
  BEFORE UPDATE ON hero_sections
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_features_sections_updated_at
  BEFORE UPDATE ON features_sections
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_features_updated_at
  BEFORE UPDATE ON features
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_about_sections_updated_at
  BEFORE UPDATE ON about_sections
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_how_it_works_sections_updated_at
  BEFORE UPDATE ON how_it_works_sections
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_how_it_works_steps_updated_at
  BEFORE UPDATE ON how_it_works_steps
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_sections_updated_at
  BEFORE UPDATE ON testimonials_sections
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON testimonials
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pricing_sections_updated_at
  BEFORE UPDATE ON pricing_sections
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pricing_plans_updated_at
  BEFORE UPDATE ON pricing_plans
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pricing_plan_features_updated_at
  BEFORE UPDATE ON pricing_plan_features
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_partners_sections_updated_at
  BEFORE UPDATE ON partners_sections
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_partners_updated_at
  BEFORE UPDATE ON partners
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column(); 