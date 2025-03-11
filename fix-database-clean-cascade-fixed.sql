-- Drop existing tables with CASCADE to handle dependencies like RLS policies
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS guests CASCADE;
DROP TABLE IF EXISTS rooms CASCADE;
DROP TABLE IF EXISTS hotel_staff CASCADE;
DROP TABLE IF EXISTS hotel_profiles CASCADE;
DROP TABLE IF EXISTS partner_profiles CASCADE;
DROP TABLE IF EXISTS user_profiles CASCADE;

-- Drop enum types if they exist
DROP TYPE IF EXISTS user_type CASCADE;
DROP TYPE IF EXISTS subscription_plan CASCADE;
DROP TYPE IF EXISTS staff_role CASCADE;
DROP TYPE IF EXISTS partner_type CASCADE;
DROP TYPE IF EXISTS user_status CASCADE;
DROP TYPE IF EXISTS onboarding_status CASCADE;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enum types for various categorizations
CREATE TYPE user_type AS ENUM ('hotel', 'admin', 'partner');
CREATE TYPE subscription_plan AS ENUM ('basic', 'pro', 'enterprise');
CREATE TYPE staff_role AS ENUM ('owner', 'manager', 'receptionist', 'housekeeper', 'maintenance', 'staff');
CREATE TYPE partner_type AS ENUM ('technology', 'hospitality_consultant', 'enterprise_chains', 'others');
CREATE TYPE user_status AS ENUM ('active', 'inactive', 'suspended', 'pending');
CREATE TYPE onboarding_status AS ENUM ('pending', 'completed');

-- User profiles table - using TEXT for id to match Clerk's string IDs
CREATE TABLE IF NOT EXISTS user_profiles (
    id TEXT PRIMARY KEY,
    user_type user_type NOT NULL DEFAULT 'hotel',
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    phone_number TEXT,
    profile_image_url TEXT,
    status user_status NOT NULL DEFAULT 'pending',
    onboarding_status onboarding_status NOT NULL DEFAULT 'pending',
    subscription_plan subscription_plan,
    subscription_start_date TIMESTAMPTZ,
    subscription_end_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Hotel profiles table
CREATE TABLE IF NOT EXISTS hotel_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id TEXT NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    hotel_name TEXT NOT NULL,
    description TEXT,
    email TEXT,
    phone TEXT,
    website TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    country TEXT,
    postal_code TEXT,
    logo_url TEXT,
    cover_image_url TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Hotel staff table
CREATE TABLE IF NOT EXISTS hotel_staff (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hotel_id UUID NOT NULL REFERENCES hotel_profiles(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    role staff_role NOT NULL DEFAULT 'staff',
    is_active BOOLEAN DEFAULT TRUE,
    joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(hotel_id, user_id)
);

-- Partner profiles table
CREATE TABLE IF NOT EXISTS partner_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    company_name TEXT NOT NULL,
    partner_type partner_type NOT NULL,
    description TEXT,
    website TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    verified_by TEXT REFERENCES user_profiles(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Rooms table
CREATE TABLE IF NOT EXISTS rooms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hotel_id UUID NOT NULL REFERENCES hotel_profiles(id) ON DELETE CASCADE,
    room_number TEXT NOT NULL,
    room_type TEXT NOT NULL,
    description TEXT,
    capacity INT NOT NULL DEFAULT 1,
    price_per_night DECIMAL(10, 2) NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    status TEXT DEFAULT 'available',
    amenities JSONB,
    images JSONB,
    floor INT,
    size_sqft INT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(hotel_id, room_number)
);

-- Guests table
CREATE TABLE IF NOT EXISTS guests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hotel_id UUID NOT NULL REFERENCES hotel_profiles(id) ON DELETE CASCADE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    country TEXT,
    postal_code TEXT,
    identification_type TEXT,
    identification_number TEXT,
    notes TEXT,
    is_blacklisted BOOLEAN DEFAULT FALSE,
    blacklist_reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hotel_id UUID NOT NULL REFERENCES hotel_profiles(id) ON DELETE CASCADE,
    room_id UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
    guest_id UUID NOT NULL REFERENCES guests(id) ON DELETE CASCADE,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    status TEXT DEFAULT 'confirmed',
    total_price DECIMAL(10, 2) NOT NULL,
    payment_status TEXT DEFAULT 'pending',
    special_requests TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Function to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to automatically update the updated_at column
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hotel_profiles_updated_at
    BEFORE UPDATE ON hotel_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hotel_staff_updated_at
    BEFORE UPDATE ON hotel_staff
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_partner_profiles_updated_at
    BEFORE UPDATE ON partner_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rooms_updated_at
    BEFORE UPDATE ON rooms
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_guests_updated_at
    BEFORE UPDATE ON guests
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
    BEFORE UPDATE ON bookings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) setup
-- Enable RLS on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotel_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotel_staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create policies for user_profiles
-- Users can view their own profile
CREATE POLICY "Users can view their own profile"
    ON user_profiles
    FOR SELECT
    USING (id = auth.uid()::TEXT);

-- Users can update their own profile
CREATE POLICY "Users can update their own profile"
    ON user_profiles
    FOR UPDATE
    USING (id = auth.uid()::TEXT);

-- Create policies for hotel_profiles
-- Hotel owners can view their own hotels
CREATE POLICY "Hotel owners can view their own hotels"
    ON hotel_profiles
    FOR SELECT
    USING (owner_id = auth.uid()::TEXT);

-- Hotel owners can update their own hotels
CREATE POLICY "Hotel owners can update their own hotels"
    ON hotel_profiles
    FOR UPDATE
    USING (owner_id = auth.uid()::TEXT);

-- Hotel owners can delete their own hotels
CREATE POLICY "Hotel owners can delete their own hotels"
    ON hotel_profiles
    FOR DELETE
    USING (owner_id = auth.uid()::TEXT);

-- Staff can view their assigned hotels
CREATE POLICY "Staff can view their assigned hotels"
    ON hotel_profiles
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM hotel_staff
            WHERE hotel_staff.hotel_id = hotel_profiles.id
            AND hotel_staff.user_id = auth.uid()::TEXT
        )
    );

-- Create policies for hotel_staff
-- Hotel owners can manage staff for their hotels
CREATE POLICY "Hotel owners can manage staff for their hotels"
    ON hotel_staff
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM hotel_profiles
            WHERE hotel_profiles.id = hotel_staff.hotel_id
            AND hotel_profiles.owner_id = auth.uid()::TEXT
        )
    );

-- Staff can view their own assignments
CREATE POLICY "Staff can view their own assignments"
    ON hotel_staff
    FOR SELECT
    USING (user_id = auth.uid()::TEXT);

-- Create policies for rooms
-- Hotel owners can manage rooms for their hotels
CREATE POLICY "Hotel owners can manage rooms for their hotels"
    ON rooms
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM hotel_profiles
            WHERE hotel_profiles.id = rooms.hotel_id
            AND hotel_profiles.owner_id = auth.uid()::TEXT
        )
    );

-- Staff can view and update rooms for their assigned hotels
CREATE POLICY "Staff can view and update rooms for their assigned hotels"
    ON rooms
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM hotel_staff
            WHERE hotel_staff.hotel_id = rooms.hotel_id
            AND hotel_staff.user_id = auth.uid()::TEXT
        )
    );

-- Create policies for guests
-- Hotel owners can manage guests for their hotels
CREATE POLICY "Hotel owners can manage guests for their hotels"
    ON guests
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM hotel_profiles
            WHERE hotel_profiles.id = guests.hotel_id
            AND hotel_profiles.owner_id = auth.uid()::TEXT
        )
    );

-- Staff can view and manage guests for their assigned hotels
CREATE POLICY "Staff can view and manage guests for their assigned hotels"
    ON guests
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM hotel_staff
            WHERE hotel_staff.hotel_id = guests.hotel_id
            AND hotel_staff.user_id = auth.uid()::TEXT
        )
    );

-- Create policies for bookings
-- Hotel owners can manage bookings for their hotels
CREATE POLICY "Hotel owners can manage bookings for their hotels"
    ON bookings
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM hotel_profiles
            WHERE hotel_profiles.id = bookings.hotel_id
            AND hotel_profiles.owner_id = auth.uid()::TEXT
        )
    );

-- Staff can view and manage bookings for their assigned hotels
CREATE POLICY "Staff can view and manage bookings for their assigned hotels"
    ON bookings
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM hotel_staff
            WHERE hotel_staff.hotel_id = bookings.hotel_id
            AND hotel_staff.user_id = auth.uid()::TEXT
        )
    );

-- Create indexes for better performance
CREATE INDEX idx_user_profiles_user_type ON user_profiles(user_type);
CREATE INDEX idx_user_profiles_onboarding_status ON user_profiles(onboarding_status);
CREATE INDEX idx_hotel_profiles_owner_id ON hotel_profiles(owner_id);
CREATE INDEX idx_hotel_staff_user_id ON hotel_staff(user_id);
CREATE INDEX idx_hotel_staff_hotel_id ON hotel_staff(hotel_id);
CREATE INDEX idx_partner_profiles_user_id ON partner_profiles(user_id);
CREATE INDEX idx_partner_profiles_partner_type ON partner_profiles(partner_type);
CREATE INDEX idx_rooms_hotel_id ON rooms(hotel_id);
CREATE INDEX idx_rooms_status ON rooms(status);
CREATE INDEX idx_guests_hotel_id ON guests(hotel_id);
CREATE INDEX idx_bookings_hotel_id ON bookings(hotel_id);
CREATE INDEX idx_bookings_room_id ON bookings(room_id);
CREATE INDEX idx_bookings_guest_id ON bookings(guest_id);
CREATE INDEX idx_bookings_check_in_date ON bookings(check_in_date);
CREATE INDEX idx_bookings_check_out_date ON bookings(check_out_date);
CREATE INDEX idx_bookings_status ON bookings(status);

-- Grant permissions to authenticated users
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Grant permissions to service role
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO service_role; 