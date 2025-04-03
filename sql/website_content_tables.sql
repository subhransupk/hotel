-- Create a table for website content
CREATE TABLE IF NOT EXISTS website_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a table for hero sections
CREATE TABLE IF NOT EXISTS hero_sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  website_content_id UUID REFERENCES website_content(id) ON DELETE CASCADE,
  heading TEXT NOT NULL,
  subheading TEXT,
  cta_text TEXT,
  cta_secondary_text TEXT,
  background_image TEXT,
  introduction_video_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(website_content_id)
);

-- Create a table for features sections
CREATE TABLE IF NOT EXISTS features_sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  website_content_id UUID REFERENCES website_content(id) ON DELETE CASCADE,
  heading TEXT NOT NULL,
  subheading TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(website_content_id)
);

-- Create a table for individual features
CREATE TABLE IF NOT EXISTS features (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  features_section_id UUID REFERENCES features_sections(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  image TEXT,
  display_order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a table for about sections
CREATE TABLE IF NOT EXISTS about_sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  website_content_id UUID REFERENCES website_content(id) ON DELETE CASCADE,
  heading TEXT NOT NULL,
  subheading TEXT,
  content TEXT,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(website_content_id)
);

-- Create a table for how it works sections
CREATE TABLE IF NOT EXISTS how_it_works_sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  website_content_id UUID REFERENCES website_content(id) ON DELETE CASCADE,
  heading TEXT NOT NULL,
  subheading TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(website_content_id)
);

-- Create a table for how it works steps
CREATE TABLE IF NOT EXISTS how_it_works_steps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  how_it_works_section_id UUID REFERENCES how_it_works_sections(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  display_order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a table for testimonials sections
CREATE TABLE IF NOT EXISTS testimonials_sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  website_content_id UUID REFERENCES website_content(id) ON DELETE CASCADE,
  heading TEXT NOT NULL,
  subheading TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(website_content_id)
);

-- Create a table for individual testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  testimonials_section_id UUID REFERENCES testimonials_sections(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role TEXT,
  company TEXT,
  content TEXT NOT NULL,
  avatar TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  display_order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a table for pricing sections
CREATE TABLE IF NOT EXISTS pricing_sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  website_content_id UUID REFERENCES website_content(id) ON DELETE CASCADE,
  heading TEXT NOT NULL,
  subheading TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(website_content_id)
);

-- Create a table for pricing plans
CREATE TABLE IF NOT EXISTS pricing_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pricing_section_id UUID REFERENCES pricing_sections(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2),
  currency TEXT DEFAULT 'USD',
  billing_period TEXT DEFAULT 'monthly',
  is_popular BOOLEAN DEFAULT FALSE,
  display_order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a table for pricing plan features
CREATE TABLE IF NOT EXISTS pricing_plan_features (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pricing_plan_id UUID REFERENCES pricing_plans(id) ON DELETE CASCADE,
  feature TEXT NOT NULL,
  is_included BOOLEAN DEFAULT TRUE,
  display_order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a table for partners sections
CREATE TABLE IF NOT EXISTS partners_sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  website_content_id UUID REFERENCES website_content(id) ON DELETE CASCADE,
  heading TEXT NOT NULL,
  subheading TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(website_content_id)
);

-- Create a table for partners
CREATE TABLE IF NOT EXISTS partners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  partners_section_id UUID REFERENCES partners_sections(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  logo TEXT,
  website_url TEXT,
  display_order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
); 