'use client';

import { PropsWithChildren } from 'react';

export function Providers({ children }: PropsWithChildren) {
  return (
    <div className="tremor-base">
      {children}
    </div>
  );
} 