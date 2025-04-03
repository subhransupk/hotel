import { useState } from 'react'
import { Button } from '@tremor/react'
import { Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface DateRangeModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (range: { from: string; to: string }) => void
  initialRange: {
    from: string
    to: string
  }
}

export function DateRangeModal({ isOpen, onClose, onSubmit, initialRange }: DateRangeModalProps) {
  const [dateRange, setDateRange] = useState(initialRange)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(dateRange)
    onClose()
  }

  // Validate that 'to' date is not before 'from' date
  const handleDateChange = (field: 'from' | 'to', value: string) => {
    if (field === 'from' && value > dateRange.to) {
      setDateRange({ from: value, to: value })
    } else if (field === 'to' && value < dateRange.from) {
      setDateRange({ from: value, to: value })
    } else {
      setDateRange({ ...dateRange, [field]: value })
    }
  }

  // Quick select options
  const quickSelects = [
    {
      label: 'Last 7 days',
      onClick: () => {
        const to = new Date()
        const from = new Date()
        from.setDate(from.getDate() - 7)
        setDateRange({
          from: from.toISOString().split('T')[0],
          to: to.toISOString().split('T')[0],
        })
      },
    },
    {
      label: 'Last 30 days',
      onClick: () => {
        const to = new Date()
        const from = new Date()
        from.setDate(from.getDate() - 30)
        setDateRange({
          from: from.toISOString().split('T')[0],
          to: to.toISOString().split('T')[0],
        })
      },
    },
    {
      label: 'This Month',
      onClick: () => {
        const now = new Date()
        const from = new Date(now.getFullYear(), now.getMonth(), 1)
        setDateRange({
          from: from.toISOString().split('T')[0],
          to: now.toISOString().split('T')[0],
        })
      },
    },
    {
      label: 'Last Month',
      onClick: () => {
        const now = new Date()
        const from = new Date(now.getFullYear(), now.getMonth() - 1, 1)
        const to = new Date(now.getFullYear(), now.getMonth(), 0)
        setDateRange({
          from: from.toISOString().split('T')[0],
          to: to.toISOString().split('T')[0],
        })
      },
    },
  ]

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded-lg bg-white p-6 w-full">
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-lg font-medium">Select Date Range</Dialog.Title>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                <input
                  type="date"
                  value={dateRange.from}
                  onChange={(e) => handleDateChange('from', e.target.value)}
                  className="block w-full h-10 px-3 py-2 bg-white border border-gray-200 rounded-tremor-default text-tremor-content-emphasis dark:bg-dark-tremor-input dark:border-dark-tremor-border dark:text-dark-tremor-content-emphasis focus:outline-none focus:ring-2 focus:ring-tremor-brand-subtle dark:focus:ring-dark-tremor-brand-subtle shadow-tremor-input dark:shadow-dark-tremor-input"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                <input
                  type="date"
                  value={dateRange.to}
                  onChange={(e) => handleDateChange('to', e.target.value)}
                  className="block w-full h-10 px-3 py-2 bg-white border border-gray-200 rounded-tremor-default text-tremor-content-emphasis dark:bg-dark-tremor-input dark:border-dark-tremor-border dark:text-dark-tremor-content-emphasis focus:outline-none focus:ring-2 focus:ring-tremor-brand-subtle dark:focus:ring-dark-tremor-brand-subtle shadow-tremor-input dark:shadow-dark-tremor-input"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {quickSelects.map((option) => (
                <Button
                  key={option.label}
                  variant="secondary"
                  size="xs"
                  onClick={option.onClick}
                  type="button"
                >
                  {option.label}
                </Button>
              ))}
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                Apply Range
              </Button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
} 