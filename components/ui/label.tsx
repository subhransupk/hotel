'use client'

import { forwardRef } from 'react'
import { cn } from '../../utils'

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  error?: string
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, error, ...props }, ref) => {
    return (
      <label
        className={cn(
          'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
          error && 'text-red-500',
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </label>
    )
  }
)

Label.displayName = 'Label' 