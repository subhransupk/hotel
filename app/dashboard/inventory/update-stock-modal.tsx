import { useState } from 'react'
import { Button, NumberInput } from '@tremor/react'
import { Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface UpdateStockModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (quantity: number) => void
  item: {
    name: string
    quantity: number
    unit: string
    minStock: number
    maxStock: number
  }
}

export function UpdateStockModal({ isOpen, onClose, onSubmit, item }: UpdateStockModalProps) {
  const [quantity, setQuantity] = useState<number>(item.quantity)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(quantity)
    onClose()
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded-lg bg-white p-6 w-full">
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-lg font-medium">Update Stock Level</Dialog.Title>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="mb-4">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  Current Stock: {item.quantity} {item.unit}
                </p>
                <p className="text-sm text-gray-500">
                  Min: {item.minStock} | Max: {item.maxStock}
                </p>
              </div>

              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Quantity ({item.unit})
              </label>
              <NumberInput
                placeholder="Enter new quantity"
                value={quantity}
                onValueChange={(value) => setQuantity(value ?? 0)}
                min={0}
                max={item.maxStock}
                required
              />
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                Update Stock
              </Button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
} 