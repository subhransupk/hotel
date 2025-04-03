-- Create partner_profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS partner_profiles (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  partner_type TEXT NOT NULL,
  company_name TEXT NOT NULL,
  website TEXT,
  description TEXT,
  verified_by TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
); 