'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SettingsRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to the correct path
    router.replace('/white-labeling/setting');
  }, [router]);
  
  return (
    <div className="p-6">
      <p>Redirecting to settings page...</p>
    </div>
  );
} 