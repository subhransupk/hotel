import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// Simple middleware function that just passes through all requests
export default function middleware(req: NextRequest) {
  // Just pass through all requests
  return NextResponse.next();
}

// Keep the same matcher configuration
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}; 