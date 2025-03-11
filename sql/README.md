# Website Content Database Setup

This directory contains SQL files to set up the database tables and functions for the dynamic website content feature in the white labeling panel.

## Files

- `website_content_tables.sql`: Creates the necessary tables for storing website content
- `website_content_rls.sql`: Sets up Row Level Security policies for the tables
- `website_content_functions.sql`: Creates helper functions for retrieving website content
- `website_content_sample_data.sql`: Inserts sample data into the tables (optional)
- `init_database.sh`: Shell script to help initialize the database

## How to Use

### Option 1: Using the Initialization Script

If you have the Supabase CLI installed, you can use the initialization script:

```bash
# Make the script executable
chmod +x init_database.sh

# Run the script
./init_database.sh
```

The script will:
1. Check if the required SQL files exist
2. Run the SQL files in the correct order
3. Ask if you want to insert sample data

### Option 2: Manual Setup

1. Log in to your Supabase project
2. Go to the SQL Editor
3. Run the SQL files in the following order:
   - First: `website_content_tables.sql`
   - Second: `website_content_rls.sql`
   - Third: `website_content_functions.sql`
   - Fourth (optional): `website_content_sample_data.sql`

## Database Schema

The database schema consists of the following tables:

- `tenants`: Stores information about each hotel tenant
- `website_content`: Main table that links website content to a tenant
- `hero_sections`: Stores hero section content
- `features_sections`: Stores features section content
- `features`: Stores individual features
- `about_sections`: Stores about section content
- `how_it_works_sections`: Stores how it works section content
- `how_it_works_steps`: Stores individual steps for how it works
- `testimonials_sections`: Stores testimonials section content
- `testimonials`: Stores individual testimonials
- `pricing_sections`: Stores pricing section content
- `pricing_plans`: Stores individual pricing plans
- `pricing_plan_features`: Stores features for each pricing plan
- `partners_sections`: Stores partners section content
- `partners`: Stores individual partners

## Access Control

The database is set up with Row Level Security (RLS) policies:

- Admin users have full access to all tables
- Public (anonymous) users have read-only access to website content

## Helper Functions

The following helper functions are available:

- `get_website_content_by_domain(domain_param TEXT)`: Retrieves website content for a specific domain
- `get_hero_section_by_domain(domain_param TEXT)`: Retrieves hero section content for a specific domain
- `get_features_section_by_domain(domain_param TEXT)`: Retrieves features section content for a specific domain
- `get_features_by_section_id(section_id_param UUID)`: Retrieves features for a specific features section

## Example Queries

### Get website content for a domain

```sql
SELECT * FROM get_website_content_by_domain('demo-hotel.com');
```

### Get hero section for a domain

```sql
SELECT * FROM get_hero_section_by_domain('demo-hotel.com');
```

### Get features for a domain

```sql
-- First get the features section ID
SELECT * FROM get_features_section_by_domain('demo-hotel.com');

-- Then get the features using the section ID
SELECT * FROM get_features_by_section_id('44444444-4444-4444-4444-444444444444');
``` 