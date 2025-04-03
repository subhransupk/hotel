'use client'

import { forwardRef } from 'react'
import { cn } from '../../utils'

interface DatePickerProps {
  id?: string
  name?: string
  className?: string
  error?: string
  value?: string
  onChange: (date: string) => void
  disabled?: boolean
  required?: boolean
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ className, error, value, onChange, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            'flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-red-500 focus-visible:ring-red-500',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    )
  }
)

DatePicker.displayName = 'DatePicker' 