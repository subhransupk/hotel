-- First, drop existing foreign key constraints
ALTER TABLE hotel_profiles DROP CONSTRAINT IF EXISTS hotel_profiles_owner_id_fkey;
ALTER TABLE hotel_staff DROP CONSTRAINT IF EXISTS hotel_staff_user_id_fkey;
ALTER TABLE partner_profiles DROP CONSTRAINT IF EXISTS partner_profiles_user_id_fkey;
ALTER TABLE partner_profiles DROP CONSTRAINT IF EXISTS partner_profiles_verified_by_fkey;

-- Change the data type of the id column in user_profiles
ALTER TABLE user_profiles ALTER COLUMN id TYPE TEXT;

-- Change the data type of columns referencing user_profiles.id
ALTER TABLE hotel_profiles ALTER COLUMN owner_id TYPE TEXT;
ALTER TABLE hotel_staff ALTER COLUMN user_id TYPE TEXT;
ALTER TABLE partner_profiles ALTER COLUMN user_id TYPE TEXT;
ALTER TABLE partner_profiles ALTER COLUMN verified_by TYPE TEXT;

-- Recreate the foreign key constraints
ALTER TABLE hotel_profiles ADD CONSTRAINT hotel_profiles_owner_id_fkey 
    FOREIGN KEY (owner_id) REFERENCES user_profiles(id) ON DELETE CASCADE;
ALTER TABLE hotel_staff ADD CONSTRAINT hotel_staff_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES user_profiles(id) ON DELETE CASCADE;
ALTER TABLE partner_profiles ADD CONSTRAINT partner_profiles_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES user_profiles(id) ON DELETE CASCADE;
ALTER TABLE partner_profiles ADD CONSTRAINT partner_profiles_verified_by_fkey 
    FOREIGN KEY (verified_by) REFERENCES user_profiles(id); 