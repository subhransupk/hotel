import { UserButton as ClerkUserButton } from "@clerk/nextjs";

export function UserButton() {
  return (
    <ClerkUserButton afterSignOutUrl="/sign-in" />
  );
} 