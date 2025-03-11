-- Replace 'YOUR_USER_ID' with your actual Clerk user ID
UPDATE user_profiles 
SET user_type = 'admin', 
    status = 'active', 
    onboarding_status = 'completed' 
WHERE id = 'YOUR_USER_ID';

-- Verify the update
SELECT id, user_type, status, onboarding_status 
FROM user_profiles 
WHERE id = 'YOUR_USER_ID'; 