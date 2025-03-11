import { useState } from 'react'
import { Button, NumberInput, TextInput } from '@tremor/react'
import { Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface OrderMoreModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (orderData: OrderData) => void
  item: {
    name: string
    sku: string
    unit: string
    price: number
  }
}

interface OrderData {
  quantity: number
  supplier: string
  notes: string
  expectedDelivery: string
}

export function OrderMoreModal({ isOpen, onClose, onSubmit, item }: OrderMoreModalProps) {
  const [orderData, setOrderData] = useState<OrderData>({
    quantity: 0,
    supplier: '',
    notes: '',
    expectedDelivery: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(orderData)
    onClose()
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-lg rounded-lg bg-white p-6 w-full">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Dialog.Title className="text-lg font-medium">Order More Stock</Dialog.Title>
              <p className="text-sm text-gray-500">
                {item.name} (SKU: {item.sku})
              </p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Order Quantity ({item.unit})
                </label>
                <NumberInput
                  placeholder="Enter quantity"
                  value={orderData.quantity}
                  onValueChange={(value) => setOrderData({ ...orderData, quantity: value ?? 0 })}
                  min={1}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expected Total
                </label>
                <div className="h-10 px-3 py-2 bg-gray-50 border border-gray-200 rounded-tremor-default flex items-center">
                  ${((orderData.quantity || 0) * item.price).toFixed(2)}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Supplier
              </label>
              <TextInput
                placeholder="Enter supplier name"
                value={orderData.supplier}
                onChange={(e) => setOrderData({ ...orderData, supplier: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expected Delivery Date
              </label>
              <input
                type="date"
                value={orderData.expectedDelivery}
                onChange={(e) => setOrderData({ ...orderData, expectedDelivery: e.target.value })}
                className="block w-full h-10 px-3 py-2 bg-white border border-gray-200 rounded-tremor-default text-tremor-content-emphasis dark:bg-dark-tremor-input dark:border-dark-tremor-border dark:text-dark-tremor-content-emphasis focus:outline-none focus:ring-2 focus:ring-tremor-brand-subtle dark:focus:ring-dark-tremor-brand-subtle shadow-tremor-input dark:shadow-dark-tremor-input"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <TextInput
                placeholder="Add any notes about the order"
                value={orderData.notes}
                onChange={(e) => setOrderData({ ...orderData, notes: e.target.value })}
              />
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                Place Order
              </Button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
} 