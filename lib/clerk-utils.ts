// Utility functions for safely using Clerk hooks during SSG

import { useEffect, useState } from 'react';

// Check if we're in a browser environment
export const isBrowser = typeof window !== 'undefined';

// Check if Clerk is configured
export const isClerkConfigured = 
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && 
  process.env.CLERK_SECRET_KEY;

// Safe version of useClerk that returns a dummy implementation during SSG
export function useSafeClerk() {
  const [clerk, setClerk] = useState({
    signOut: () => Promise.resolve(),
  });

  useEffect(() => {
    if (isBrowser && isClerkConfigured) {
      // Dynamically import Clerk only on the client side when configured
      import('@clerk/nextjs').then(({ useClerk }) => {
        try {
          const clerkHook = useClerk();
          setClerk(clerkHook);
        } catch (error) {
          console.error('Error initializing Clerk:', error);
        }
      });
    }
  }, []);

  return clerk;
}

// Define the type for the Clerk user hook return value
interface ClerkUserState {
  isLoaded: boolean;
  isSignedIn: boolean | undefined;
  user: any | undefined | null;
}

// Safe version of useUser that returns a dummy implementation during SSG
export function useSafeUser() {
  const [userState, setUserState] = useState<ClerkUserState>({
    isLoaded: false,
    isSignedIn: false,
    user: null,
  });

  useEffect(() => {
    if (isBrowser && isClerkConfigured) {
      // Dynamically import Clerk only on the client side when configured
      import('@clerk/nextjs').then(({ useUser }) => {
        try {
          const userHook = useUser();
          setUserState({
            isLoaded: userHook.isLoaded,
            isSignedIn: userHook.isSignedIn,
            user: userHook.user,
          });
        } catch (error) {
          console.error('Error initializing Clerk user:', error);
        }
      });
    }
  }, []);

  return userState;
} 