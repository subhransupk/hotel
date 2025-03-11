-- Drop existing tables if they exist
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS guests;
DROP TABLE IF EXISTS rooms;
DROP TABLE IF EXISTS hotel_staff;
DROP TABLE IF EXISTS hotel_profiles;
DROP TABLE IF EXISTS partner_profiles;
DROP TABLE IF EXISTS user_profiles;

-- Drop enum types if they exist
DROP TYPE IF EXISTS user_type;
DROP TYPE IF EXISTS subscription_plan;
DROP TYPE IF EXISTS staff_role;
DROP TYPE IF EXISTS partner_type;
DROP TYPE IF EXISTS user_status;
DROP TYPE IF EXISTS onboarding_status;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enum types for various categorizations
CREATE TYPE user_type AS ENUM ('hotel', 'admin', 'partner');
CREATE TYPE subscription_plan AS ENUM ('basic', 'pro', 'enterprise');
CREATE TYPE staff_role AS ENUM ('owner', 'manager', 'receptionist', 'housekeeper', 'maintenance', 'staff');
CREATE TYPE partner_type AS ENUM ('technology', 'hospitality_consultant', 'enterprise_chains', 'others');
CREATE TYPE user_status AS ENUM ('active', 'inactive', 'suspended', 'pending');
CREATE TYPE onboarding_status AS ENUM ('pending', 'completed');

-- User Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS user_profiles (
    id TEXT PRIMARY KEY,
    user_type user_type NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(255),
    phone_number VARCHAR(20),
    status user_status DEFAULT 'pending',
    onboarding_status onboarding_status DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_login TIMESTAMPTZ
);

-- Hotel Profiles table
CREATE TABLE IF NOT EXISTS hotel_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id TEXT REFERENCES user_profiles(id) ON DELETE CASCADE,
    hotel_name VARCHAR(200),
    subscription_plan subscription_plan DEFAULT 'basic',
    email VARCHAR(255),
    phone VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    postal_code VARCHAR(20),
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Hotel Staff table (for managing staff and their roles)
CREATE TABLE IF NOT EXISTS hotel_staff (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT REFERENCES user_profiles(id) ON DELETE CASCADE,
    hotel_id UUID REFERENCES hotel_profiles(id) ON DELETE CASCADE,
    role staff_role NOT NULL,
    permissions JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, hotel_id, role)
);

-- Partner Profiles table
CREATE TABLE IF NOT EXISTS partner_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT REFERENCES user_profiles(id) ON DELETE CASCADE,
    partner_type partner_type NOT NULL,
    company_name VARCHAR(200),
    website VARCHAR(255),
    description TEXT,
    verified_by TEXT REFERENCES user_profiles(id), -- admin who verified
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rooms table
CREATE TABLE IF NOT EXISTS rooms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hotel_id UUID REFERENCES hotel_profiles(id) ON DELETE CASCADE,
    room_number VARCHAR(20) NOT NULL,
    room_type VARCHAR(50) NOT NULL,
    floor INTEGER,
    capacity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'available',
    amenities JSONB DEFAULT '[]',
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(hotel_id, room_number)
);

-- Guests table
CREATE TABLE IF NOT EXISTS guests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hotel_id UUID REFERENCES hotel_profiles(id) ON DELETE CASCADE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    postal_code VARCHAR(20),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hotel_id UUID REFERENCES hotel_profiles(id) ON DELETE CASCADE,
    room_id UUID REFERENCES rooms(id) ON DELETE CASCADE,
    guest_id UUID REFERENCES guests(id) ON DELETE CASCADE,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'confirmed',
    total_price DECIMAL(10, 2) NOT NULL,
    payment_status VARCHAR(20) DEFAULT 'pending',
    special_requests TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

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

-- Row Level Security (RLS) Policies
-- Enable RLS on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotel_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotel_staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- User Profiles policies
CREATE POLICY "Users can view their own profile"
    ON user_profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON user_profiles FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
    ON user_profiles FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM user_profiles
        WHERE id = auth.uid() AND user_type = 'admin'
    ));

CREATE POLICY "Admins can update all profiles"
    ON user_profiles FOR UPDATE
    USING (EXISTS (
        SELECT 1 FROM user_profiles
        WHERE id = auth.uid() AND user_type = 'admin'
    ));

-- Hotel Profiles policies
CREATE POLICY "Hotel owners can manage their hotels"
    ON hotel_profiles FOR ALL
    USING (owner_id = auth.uid());

CREATE POLICY "Staff can view their assigned hotels"
    ON hotel_profiles FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM hotel_staff
        WHERE hotel_staff.hotel_id = hotel_profiles.id
        AND hotel_staff.user_id = auth.uid()
    ));

CREATE POLICY "Admins can view all hotels"
    ON hotel_profiles FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM user_profiles
        WHERE id = auth.uid() AND user_type = 'admin'
    ));

-- Hotel Staff policies
CREATE POLICY "Hotel owners can manage staff"
    ON hotel_staff FOR ALL
    USING (EXISTS (
        SELECT 1 FROM hotel_profiles
        WHERE hotel_profiles.id = hotel_staff.hotel_id
        AND hotel_profiles.owner_id = auth.uid()
    ));

CREATE POLICY "Admins can view all staff"
    ON hotel_staff FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM user_profiles
        WHERE id = auth.uid() AND user_type = 'admin'
    ));

-- Partner Profiles policies
CREATE POLICY "Partners can view their own profile"
    ON partner_profiles FOR SELECT
    USING (user_id = auth.uid());

CREATE POLICY "Partners can update their own profile"
    ON partner_profiles FOR UPDATE
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can manage partner profiles"
    ON partner_profiles FOR ALL
    USING (EXISTS (
        SELECT 1 FROM user_profiles
        WHERE id = auth.uid() AND user_type = 'admin'
    ));

-- Rooms policies
CREATE POLICY "Hotel owners can manage their rooms"
    ON rooms FOR ALL
    USING (EXISTS (
        SELECT 1 FROM hotel_profiles
        WHERE hotel_profiles.id = rooms.hotel_id
        AND hotel_profiles.owner_id = auth.uid()
    ));

CREATE POLICY "Staff can view rooms"
    ON rooms FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM hotel_staff
        WHERE hotel_staff.hotel_id = rooms.hotel_id
        AND hotel_staff.user_id = auth.uid()
    ));

CREATE POLICY "Admins can view all rooms"
    ON rooms FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM user_profiles
        WHERE id = auth.uid() AND user_type = 'admin'
    ));

-- Guests policies
CREATE POLICY "Hotel owners can manage their guests"
    ON guests FOR ALL
    USING (EXISTS (
        SELECT 1 FROM hotel_profiles
        WHERE hotel_profiles.id = guests.hotel_id
        AND hotel_profiles.owner_id = auth.uid()
    ));

CREATE POLICY "Staff can view guests"
    ON guests FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM hotel_staff
        WHERE hotel_staff.hotel_id = guests.hotel_id
        AND hotel_staff.user_id = auth.uid()
    ));

CREATE POLICY "Admins can view all guests"
    ON guests FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM user_profiles
        WHERE id = auth.uid() AND user_type = 'admin'
    ));

-- Bookings policies
CREATE POLICY "Hotel owners can manage their bookings"
    ON bookings FOR ALL
    USING (EXISTS (
        SELECT 1 FROM hotel_profiles
        WHERE hotel_profiles.id = bookings.hotel_id
        AND hotel_profiles.owner_id = auth.uid()
    ));

CREATE POLICY "Staff can view bookings"
    ON bookings FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM hotel_staff
        WHERE hotel_staff.hotel_id = bookings.hotel_id
        AND hotel_staff.user_id = auth.uid()
    ));

CREATE POLICY "Admins can view all bookings"
    ON bookings FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM user_profiles
        WHERE id = auth.uid() AND user_type = 'admin'
    ));

-- Indexes for better query performance
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

-- Service role policies for admin operations
CREATE POLICY "Service role can manage all profiles"
    ON user_profiles FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Service role can manage all hotels"
    ON hotel_profiles FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Service role can manage all staff"
    ON hotel_staff FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Service role can manage all partners"
    ON partner_profiles FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Service role can manage all rooms"
    ON rooms FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Service role can manage all guests"
    ON guests FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Service role can manage all bookings"
    ON bookings FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Grant necessary permissions
GRANT SELECT, UPDATE ON user_profiles TO authenticated;
GRANT SELECT, UPDATE ON hotel_profiles TO authenticated;
GRANT SELECT, UPDATE ON hotel_staff TO authenticated;
GRANT SELECT, UPDATE ON partner_profiles TO authenticated;
GRANT SELECT, UPDATE ON rooms TO authenticated;
GRANT SELECT, UPDATE ON guests TO authenticated;
GRANT SELECT, UPDATE ON bookings TO authenticated;
GRANT ALL ON user_profiles TO service_role;
GRANT ALL ON hotel_profiles TO service_role;
GRANT ALL ON hotel_staff TO service_role;
GRANT ALL ON partner_profiles TO service_role;
GRANT ALL ON rooms TO service_role;
GRANT ALL ON guests TO service_role;
GRANT ALL ON bookings TO service_role; 