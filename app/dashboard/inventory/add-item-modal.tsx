import { useState } from 'react'
import {
  Button,
  TextInput,
  NumberInput,
} from '@tremor/react'
import { Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface AddItemModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: InventoryItemData) => void
}

interface InventoryItemData {
  name: string
  category: string
  sku: string
  quantity: number
  minStock: number
  maxStock: number
  unit: string
  price: number
}

const categories = [
  { id: 'housekeeping', name: 'Housekeeping' },
  { id: 'amenities', name: 'Room Amenities' },
  { id: 'maintenance', name: 'Maintenance' },
  { id: 'kitchen', name: 'Kitchen & F&B' },
  { id: 'office', name: 'Office Supplies' },
]

const units = ['pcs', 'bottles', 'boxes', 'kg', 'liters']

export function AddItemModal({ isOpen, onClose, onSubmit }: AddItemModalProps) {
  const [formData, setFormData] = useState<InventoryItemData>({
    name: '',
    category: '',
    sku: '',
    quantity: 0,
    minStock: 0,
    maxStock: 0,
    unit: 'pcs',
    price: 0,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    onClose()
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-lg rounded-lg bg-white p-6 w-full">
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-lg font-medium">Add New Inventory Item</Dialog.Title>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
              <TextInput
                placeholder="Enter item name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="block w-full h-10 px-3 py-2 bg-white border border-gray-200 rounded-tremor-default text-tremor-content-emphasis dark:bg-dark-tremor-input dark:border-dark-tremor-border dark:text-dark-tremor-content-emphasis focus:outline-none focus:ring-2 focus:ring-tremor-brand-subtle dark:focus:ring-dark-tremor-brand-subtle shadow-tremor-input dark:shadow-dark-tremor-input"
                required
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
              <TextInput
                placeholder="Enter SKU"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                <NumberInput
                  placeholder="Enter quantity"
                  value={formData.quantity}
                  onValueChange={(value) => setFormData({ ...formData, quantity: value ?? 0 })}
                  min={0}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                <select
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  className="block w-full h-10 px-3 py-2 bg-white border border-gray-200 rounded-tremor-default text-tremor-content-emphasis dark:bg-dark-tremor-input dark:border-dark-tremor-border dark:text-dark-tremor-content-emphasis focus:outline-none focus:ring-2 focus:ring-tremor-brand-subtle dark:focus:ring-dark-tremor-brand-subtle shadow-tremor-input dark:shadow-dark-tremor-input"
                  required
                >
                  <option value="">Select unit</option>
                  {units.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Min Stock</label>
                <NumberInput
                  placeholder="Enter min stock"
                  value={formData.minStock}
                  onValueChange={(value) => setFormData({ ...formData, minStock: value ?? 0 })}
                  min={0}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Stock</label>
                <NumberInput
                  placeholder="Enter max stock"
                  value={formData.maxStock}
                  onValueChange={(value) => setFormData({ ...formData, maxStock: value ?? 0 })}
                  min={0}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price per Unit ($)</label>
              <NumberInput
                placeholder="Enter price"
                value={formData.price}
                onValueChange={(value) => setFormData({ ...formData, price: value ?? 0 })}
                min={0}
                step={0.01}
                required
              />
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                Add Item
              </Button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
} 