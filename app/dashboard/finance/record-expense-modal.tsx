import { useState } from 'react'
import { Button, TextInput, NumberInput, Select, SelectItem } from '@tremor/react'
import { Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface RecordExpenseModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: ExpenseData) => void
}

interface ExpenseData {
  description: string
  amount: number
  category: string
  paymentMethod: string
  date: string
  notes: string
}

const expenseCategories = [
  { id: 'staff_salaries', name: 'Staff Salaries' },
  { id: 'utilities', name: 'Utilities' },
  { id: 'maintenance', name: 'Maintenance' },
  { id: 'supplies', name: 'Supplies' },
  { id: 'marketing', name: 'Marketing' },
  { id: 'other', name: 'Other' },
]

const paymentMethods = [
  { id: 'bank_transfer', name: 'Bank Transfer' },
  { id: 'credit_card', name: 'Credit Card' },
  { id: 'cash', name: 'Cash' },
  { id: 'check', name: 'Check' },
]

export function RecordExpenseModal({ isOpen, onClose, onSubmit }: RecordExpenseModalProps) {
  const [formData, setFormData] = useState<ExpenseData>({
    description: '',
    amount: 0,
    category: '',
    paymentMethod: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({
      description: '',
      amount: 0,
      category: '',
      paymentMethod: '',
      date: new Date().toISOString().split('T')[0],
      notes: '',
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-lg rounded-lg bg-white p-6 w-full">
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-lg font-medium">Record New Expense</Dialog.Title>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <TextInput
                placeholder="Enter expense description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
                <NumberInput
                  placeholder="Enter amount"
                  value={formData.amount}
                  onValueChange={(value) => setFormData({ ...formData, amount: value ?? 0 })}
                  min={0}
                  step={0.01}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="block w-full h-10 px-3 py-2 bg-white border border-gray-200 rounded-tremor-default text-tremor-content-emphasis dark:bg-dark-tremor-input dark:border-dark-tremor-border dark:text-dark-tremor-content-emphasis focus:outline-none focus:ring-2 focus:ring-tremor-brand-subtle dark:focus:ring-dark-tremor-brand-subtle shadow-tremor-input dark:shadow-dark-tremor-input"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="block w-full h-10 px-3 py-2 bg-white border border-gray-200 rounded-tremor-default text-tremor-content-emphasis dark:bg-dark-tremor-input dark:border-dark-tremor-border dark:text-dark-tremor-content-emphasis focus:outline-none focus:ring-2 focus:ring-tremor-brand-subtle dark:focus:ring-dark-tremor-brand-subtle shadow-tremor-input dark:shadow-dark-tremor-input"
                  required
                >
                  <option value="">Select category</option>
                  {expenseCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <select
                  value={formData.paymentMethod}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                  className="block w-full h-10 px-3 py-2 bg-white border border-gray-200 rounded-tremor-default text-tremor-content-emphasis dark:bg-dark-tremor-input dark:border-dark-tremor-border dark:text-dark-tremor-content-emphasis focus:outline-none focus:ring-2 focus:ring-tremor-brand-subtle dark:focus:ring-dark-tremor-brand-subtle shadow-tremor-input dark:shadow-dark-tremor-input"
                  required
                >
                  <option value="">Select payment method</option>
                  {paymentMethods.map((method) => (
                    <option key={method.id} value={method.id}>
                      {method.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <TextInput
                placeholder="Add any notes about the expense"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                Record Expense
              </Button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
} 