-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can view their own hotel" ON hotel_profiles;
DROP POLICY IF EXISTS "Users can update their own hotel" ON hotel_profiles;
DROP POLICY IF EXISTS "Users can view their own staff" ON hotel_staff;
DROP POLICY IF EXISTS "Users can update their own staff" ON hotel_staff;
DROP POLICY IF EXISTS "Users can view their own partner" ON partner_profiles;
DROP POLICY IF EXISTS "Users can update their own partner" ON partner_profiles;
DROP POLICY IF EXISTS "Service role can manage all profiles" ON user_profiles;
DROP POLICY IF EXISTS "Service role can manage all hotels" ON hotel_profiles;
DROP POLICY IF EXISTS "Service role can manage all staff" ON hotel_staff;
DROP POLICY IF EXISTS "Service role can manage all partners" ON partner_profiles;

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotel_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotel_staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_profiles ENABLE ROW LEVEL SECURITY;

-- Create service role policies
CREATE POLICY "Service role can manage all profiles"
ON user_profiles
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Service role can manage all hotels"
ON hotel_profiles
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Service role can manage all staff"
ON hotel_staff
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Service role can manage all partners"
ON partner_profiles
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Create new policies for user_profiles
CREATE POLICY "Users can view their own profile"
ON user_profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON user_profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Create new policies for hotel_profiles
CREATE POLICY "Users can view their own hotel"
ON hotel_profiles
FOR SELECT
TO authenticated
USING (auth.uid() = owner_id);

CREATE POLICY "Users can update their own hotel"
ON hotel_profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = owner_id)
WITH CHECK (auth.uid() = owner_id);

-- Create new policies for hotel_staff
CREATE POLICY "Users can view their own staff"
ON hotel_staff
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM hotel_profiles
    WHERE hotel_profiles.id = hotel_staff.hotel_id
    AND hotel_profiles.owner_id = auth.uid()
  )
);

CREATE POLICY "Users can update their own staff"
ON hotel_staff
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM hotel_profiles
    WHERE hotel_profiles.id = hotel_staff.hotel_id
    AND hotel_profiles.owner_id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM hotel_profiles
    WHERE hotel_profiles.id = hotel_staff.hotel_id
    AND hotel_profiles.owner_id = auth.uid()
  )
);

-- Create new policies for partner_profiles
CREATE POLICY "Users can view their own partner"
ON partner_profiles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own partner"
ON partner_profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Grant necessary permissions
GRANT SELECT, UPDATE ON user_profiles TO authenticated;
GRANT SELECT, UPDATE ON hotel_profiles TO authenticated;
GRANT SELECT, UPDATE ON hotel_staff TO authenticated;
GRANT SELECT, UPDATE ON partner_profiles TO authenticated;
GRANT ALL ON user_profiles TO service_role;
GRANT ALL ON hotel_profiles TO service_role;
GRANT ALL ON hotel_staff TO service_role;
GRANT ALL ON partner_profiles TO service_role; 