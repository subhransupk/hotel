'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSafeUser } from '@/lib/clerk-utils';
import { createClient } from '@supabase/supabase-js';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

// Define a type for the user object to help TypeScript
interface ClerkUser {
  id: string;
  emailAddresses?: Array<{ emailAddress: string }>;
  [key: string]: any;
}

export default function OnboardingCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isSignedIn, user } = useSafeUser();
  const [isChecking, setIsChecking] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [debugLog, setDebugLog] = useState<string[]>([]);

  const addDebugLog = (message: string) => {
    console.log(message);
    setDebugLog(prev => [...prev, message]);
  };

  useEffect(() => {
    // Skip check if we're already on the onboarding page to prevent redirect loops
    if (pathname === '/onboarding') {
      addDebugLog(`Already on onboarding page, skipping check`);
      setIsChecking(false);
      return;
    }

    // Skip check if we're on the dashboard page and we've already checked
    if (pathname.startsWith('/dashboard') && hasCompletedOnboarding) {
      addDebugLog(`Already checked and confirmed onboarding is complete`);
      setIsChecking(false);
      return;
    }

    async function checkOnboardingStatus() {
      // No need to check isLoaded since useSafeUser handles that internally
      if (!isSignedIn || !user) {
        addDebugLog('User not signed in, skipping onboarding check');
        setIsChecking(false);
        return;
      }

      try {
        // First, try to check the profile using the server API
        const response = await fetch('/api/check-profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          const errorMessage = errorData.message || 'Failed to check profile';
          addDebugLog(`Error from server API: ${errorMessage}`);
          
          // Fall back to checking the profile directly
          await checkProfileDirectly();
          return;
        }

        const data = await response.json();
        
        if (data.onboardingCompleted) {
          addDebugLog('Onboarding completed according to server API, allowing access to dashboard');
          setHasCompletedOnboarding(true);
        } else {
          addDebugLog('Onboarding not completed according to server API, redirecting to onboarding page');
          
          // Only redirect if we're not already on the onboarding page
          if (pathname !== '/onboarding') {
            router.push('/onboarding');
          }
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        addDebugLog(`Error checking onboarding status: ${errorMessage}`);
        
        // Fall back to checking the profile directly
        await checkProfileDirectly();
      } finally {
        setIsChecking(false);
      }
    }
    
    async function checkProfileDirectly() {
      try {
        // Cast user to our ClerkUser type
        const clerkUser = user as unknown as ClerkUser;
        const userId = clerkUser.id;
        
        // Initialize Supabase client
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        
        if (!supabaseUrl || !supabaseAnonKey) {
          addDebugLog('Missing Supabase environment variables');
          return;
        }
        
        const supabase = createClient(supabaseUrl, supabaseAnonKey);
        
        // Check user profile and onboarding status in one query
        const { data, error } = await supabase
          .from('user_profiles')
          .select('onboarding_status')
          .eq('id', userId)
          .single();
        
        if (error) {
          addDebugLog(`Error checking onboarding status: ${error.message}`);
          
          // Only redirect if we're not already on the onboarding page
          if (pathname !== '/onboarding') {
            addDebugLog('Redirecting to onboarding due to error');
            router.push('/onboarding');
          }
          return;
        }
        
        // If no profile found, redirect to onboarding
        if (!data) {
          addDebugLog('User profile not found, redirecting to onboarding');
          
          // Only redirect if we're not already on the onboarding page
          if (pathname !== '/onboarding') {
            router.push('/onboarding');
          }
          return;
        }
        
        // Profile found, check onboarding status
        addDebugLog(`Onboarding status: ${data.onboarding_status}`);
        
        // Check if onboarding is completed
        if (data.onboarding_status === 'completed') {
          addDebugLog('Onboarding completed, allowing access to dashboard');
          setHasCompletedOnboarding(true);
        } else {
          addDebugLog('Onboarding not completed, redirecting to onboarding page');
          
          // Only redirect if we're not already on the onboarding page
          if (pathname !== '/onboarding') {
            router.push('/onboarding');
          }
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        addDebugLog(`Error checking profile directly: ${errorMessage}`);
        
        // Only redirect if we're not already on the onboarding page
        if (pathname !== '/onboarding') {
          router.push('/onboarding');
        }
      }
    }

    // Only run the check if the user is signed in
    if (isSignedIn && user) {
      checkOnboardingStatus();
    }
  }, [isSignedIn, user, router, pathname, hasCompletedOnboarding]);

  // Render loading state while checking
  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" color="primary" />
          <h2 className="text-xl font-semibold mt-4">Loading...</h2>
          <p className="mt-2 text-gray-600">Please wait while we check your profile.</p>
          {process.env.NODE_ENV === 'development' && debugLog.length > 0 && (
            <div className="mt-4 p-3 bg-gray-100 rounded text-left max-w-md mx-auto">
              <p className="font-semibold text-sm mb-1">Debug Log:</p>
              <ul className="text-xs text-gray-700 space-y-1">
                {debugLog.map((log, i) => (
                  <li key={i}>{log}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }

  // If onboarding is completed or we're on the onboarding page, render children
  if (hasCompletedOnboarding || pathname === '/onboarding') {
    return <>{children}</>;
  }

  // This should not be visible as we redirect in the useEffect
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold">Redirecting...</h2>
        <p className="mt-2 text-gray-600">Please wait while we redirect you to the appropriate page.</p>
        {process.env.NODE_ENV === 'development' && debugLog.length > 0 && (
          <div className="mt-4 p-3 bg-gray-100 rounded text-left max-w-md mx-auto">
            <p className="font-semibold text-sm mb-1">Debug Log:</p>
            <ul className="text-xs text-gray-700 space-y-1">
              {debugLog.map((log, i) => (
                <li key={i}>{log}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
} 