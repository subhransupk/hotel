import { Button } from '@tremor/react'
import { Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface ViewHistoryModalProps {
  isOpen: boolean
  onClose: () => void
  item: {
    name: string
    sku: string
  }
}

// Mock history data - in a real app, this would come from your backend
const mockHistory = [
  {
    id: 1,
    date: '2024-01-15',
    action: 'Stock Update',
    change: '+50',
    user: 'John Doe',
    notes: 'Regular restock',
  },
  {
    id: 2,
    date: '2024-01-14',
    action: 'Stock Update',
    change: '-20',
    user: 'Jane Smith',
    notes: 'Used for room service',
  },
  {
    id: 3,
    date: '2024-01-13',
    action: 'Price Update',
    change: '$12.99 → $13.99',
    user: 'Admin',
    notes: 'Price adjustment',
  },
]

export function ViewHistoryModal({ isOpen, onClose, item }: ViewHistoryModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-2xl rounded-lg bg-white p-6 w-full">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Dialog.Title className="text-lg font-medium">Item History</Dialog.Title>
              <p className="text-sm text-gray-500">
                {item.name} (SKU: {item.sku})
              </p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-4">
            {mockHistory.map((record) => (
              <div
                key={record.id}
                className="p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{record.action}</h3>
                    <p className="text-sm text-gray-500">
                      By {record.user} on {new Date(record.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="text-sm font-medium">
                    {record.change}
                  </span>
                </div>
                {record.notes && (
                  <p className="text-sm text-gray-600 mt-2">
                    Note: {record.notes}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-6">
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
} 