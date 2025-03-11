import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

export default async function DashboardPage() {
  // Get the user from Clerk
  const { userId } = await auth();
  const user = await currentUser();
  
  // If no user is found, redirect to sign-in
  if (!userId || !user) {
    redirect("/sign-in");
  }

  // Initialize Supabase client
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase environment variables");
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // Get hotel information
  const { data: hotels, error } = await supabase
    .from('hotel_profiles')
    .select('*')
    .eq('owner_id', userId);

  if (error) {
    console.error("Error fetching hotel data:", error);
  }

  const hotel = hotels && hotels.length > 0 ? hotels[0] : null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Welcome, {user.firstName || 'User'}!</h2>
        <p className="mb-2">You are signed in as {user.emailAddresses[0]?.emailAddress}</p>
        <p className="text-sm text-gray-500">User ID: {userId}</p>
      </div>

      {hotel ? (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Your Hotel</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Hotel Name</p>
              <p className="font-medium">{hotel.hotel_name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{hotel.email || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">{hotel.phone || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-medium">{hotel.address || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">City</p>
              <p className="font-medium">{hotel.city || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Country</p>
              <p className="font-medium">{hotel.country || 'Not provided'}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">No Hotel Found</h2>
          <p>You haven't set up your hotel yet. Please complete the onboarding process.</p>
          <button 
            onClick={() => window.location.href = '/onboarding'}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go to Onboarding
          </button>
        </div>
      )}
    </div>
  );
} 