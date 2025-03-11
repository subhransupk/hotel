import { clerkMiddleware, getAuth } from '@clerk/nextjs/server';
import { NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';
import { clerkClient } from '@clerk/clerk-sdk-node';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Check if Clerk is configured
const isClerkConfigured = 
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && 
  process.env.CLERK_SECRET_KEY;

// Create a middleware function that checks if Clerk is configured
const middlewareFunction = isClerkConfigured 
  ? clerkMiddleware(async (auth, req) => {
      const path = req.nextUrl.pathname;
      
      console.log("Middleware running for path:", path);
      
      // Public routes that don't require authentication
      const publicRoutes = [
        "/",
        "/sign-in",
        "/sign-up",
        "/api/imagekit/auth",
        "/api/webhook/clerk",
        "/onboarding",
      ];
      
      // Routes that are always ignored
      const ignoredRoutes = [
        "/api/webhook/clerk",
        "/api/onboarding",
        "/api/check-profile",
        "/api/admin/create-partner",
      ];
      
      // Check if the current path is public or ignored
      const isPublic = publicRoutes.some(route => path === route || path.startsWith(route));
      const isIgnored = ignoredRoutes.some(route => path === route || path.startsWith(route));
      
      if (isIgnored) {
        console.log("Path is ignored, allowing request");
        return NextResponse.next();
      }
      
      // Get auth state
      const authState = getAuth(req);
      const userId = authState.userId;
      
      // If the user is not signed in and the route is not public, redirect to sign-in
      if (!userId && !isPublic) {
        console.log("User not signed in, redirecting to sign-in");
        return NextResponse.redirect(new URL("/sign-in", req.url));
      }

      if (userId) {
        console.log("User signed in with ID:", userId);
        
        try {
          // Get the user from Clerk to check their role
          const user = await clerkClient.users.getUser(userId);
          const userRole = user.publicMetadata.role as string || "hotel_owner";
          
          console.log("User role:", userRole);
          
          // Handle role-based redirects for the root path
          if (path === "/") {
            if (userRole === "admin") {
              console.log("Admin user detected, redirecting to admin dashboard");
              return NextResponse.redirect(new URL("/admin", req.url));
            } else if (userRole === "hotel_owner") {
              console.log("Hotel owner detected, redirecting to hotel dashboard");
              return NextResponse.redirect(new URL("/dashboard", req.url));
            } else if (userRole === "partner") {
              console.log("Partner detected, redirecting to partner dashboard");
              return NextResponse.redirect(new URL("/partner-dashboard", req.url));
            }
          }
          
          // Check if hotel owner has completed onboarding
          // Only check for dashboard access, not for the onboarding page itself
          if (userRole === "hotel_owner" && 
              path.startsWith("/dashboard") && 
              path !== "/dashboard/onboarding" && 
              !path.includes("/api/")) {
            
            // Only check onboarding status for hotel owners trying to access dashboard
            if (supabaseUrl && supabaseServiceKey) {
              const supabase = createClient(supabaseUrl, supabaseServiceKey);
              
              // Check if user has completed onboarding
              const { data, error } = await supabase
                .from('user_profiles')
                .select('onboarding_status')
                .eq('id', userId)
                .single();
              
              if (!error && data && data.onboarding_status !== 'completed') {
                console.log("Hotel owner has not completed onboarding, redirecting to onboarding page");
                return NextResponse.redirect(new URL("/onboarding", req.url));
              }
              
              if (error) {
                console.error("Error checking onboarding status:", error);
                // If there's an error or no profile found, redirect to onboarding
                if (error.code === 'PGRST116') { // Not found
                  console.log("User profile not found, redirecting to onboarding");
                  return NextResponse.redirect(new URL("/onboarding", req.url));
                }
                // For other errors, allow the request to proceed
                // The page components will handle authentication as needed
              }
            }
          }
          
          // Prevent access to routes based on role
          if (path.startsWith("/admin") && userRole !== "admin") {
            console.log("Non-admin trying to access admin area, redirecting to appropriate dashboard");
            if (userRole === "hotel_owner") {
              return NextResponse.redirect(new URL("/dashboard", req.url));
            } else if (userRole === "partner") {
              return NextResponse.redirect(new URL("/partner-dashboard", req.url));
            }
            return NextResponse.redirect(new URL("/", req.url));
          }
          
          // Restrict white-labeling access to admin users only
          if (path.startsWith("/white-labeling") && userRole !== "admin") {
            console.log("Non-admin trying to access white-labeling area, redirecting to appropriate dashboard");
            if (userRole === "hotel_owner") {
              return NextResponse.redirect(new URL("/dashboard", req.url));
            } else if (userRole === "partner") {
              return NextResponse.redirect(new URL("/partner-dashboard", req.url));
            }
            return NextResponse.redirect(new URL("/", req.url));
          }
          
          if (path.startsWith("/dashboard") && userRole !== "hotel_owner") {
            console.log("Non-hotel owner trying to access dashboard, redirecting to appropriate dashboard");
            if (userRole === "admin") {
              return NextResponse.redirect(new URL("/admin", req.url));
            } else if (userRole === "partner") {
              return NextResponse.redirect(new URL("/partner-dashboard", req.url));
            }
            return NextResponse.redirect(new URL("/", req.url));
          }
          
          if (path.startsWith("/partner-dashboard") && userRole !== "partner") {
            console.log("Non-partner trying to access partner dashboard, redirecting to appropriate dashboard");
            if (userRole === "admin") {
              return NextResponse.redirect(new URL("/admin", req.url));
            } else if (userRole === "hotel_owner") {
              return NextResponse.redirect(new URL("/dashboard", req.url));
            }
            return NextResponse.redirect(new URL("/", req.url));
          }
        } catch (error) {
          console.error("Error checking user role:", error);
          // If there's an error, allow the request to proceed
          // The page components will handle authentication as needed
        }
      }

      console.log("Middleware allowing request to proceed");
      return NextResponse.next();
    })
  : (req: Request) => {
      console.warn("Clerk is not initialized due to missing environment variables");
      return NextResponse.next();
    };

// Export the middleware function
export default middlewareFunction;

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}; 