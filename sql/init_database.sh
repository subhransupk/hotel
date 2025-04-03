#!/bin/bash

# This script helps initialize the database with all the necessary SQL files
# It requires the Supabase CLI to be installed and configured

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null
then
    echo "Supabase CLI is not installed. Please install it first."
    echo "Visit https://supabase.com/docs/guides/cli for installation instructions."
    exit 1
fi

# Check if the SQL files exist
if [ ! -f "website_content_tables.sql" ] || [ ! -f "website_content_rls.sql" ] || [ ! -f "website_content_functions.sql" ]
then
    echo "One or more required SQL files are missing."
    echo "Please make sure the following files exist in the current directory:"
    echo "- website_content_tables.sql"
    echo "- website_content_rls.sql"
    echo "- website_content_functions.sql"
    exit 1
fi

echo "Initializing database..."

# Run the SQL files in the correct order
echo "1. Creating tables..."
supabase db execute --file website_content_tables.sql

echo "2. Setting up Row Level Security policies..."
supabase db execute --file website_content_rls.sql

echo "3. Creating helper functions..."
supabase db execute --file website_content_functions.sql

# Ask if the user wants to insert sample data
read -p "Do you want to insert sample data? (y/n): " insert_sample_data
if [ "$insert_sample_data" = "y" ] || [ "$insert_sample_data" = "Y" ]
then
    if [ -f "website_content_sample_data.sql" ]
    then
        echo "4. Inserting sample data..."
        supabase db execute --file website_content_sample_data.sql
    else
        echo "Sample data file (website_content_sample_data.sql) not found."
    fi
fi

# Create image directories and placeholder images
echo "Creating image directories and placeholder images..."
cd ..
node scripts/create-image-directories.js

echo "Database initialization complete!"
echo "You can now use the website content feature in the white labeling panel." 