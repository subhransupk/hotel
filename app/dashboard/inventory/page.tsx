'use client'

import { useState } from 'react'
import {
  Card,
  Title,
  Text,
  TabGroup,
  TabList,
  Tab,
  ProgressBar,
  Badge,
  Button,
  TextInput,
  Select,
  SelectItem,
  Grid,
} from '@tremor/react'
import {
  PlusIcon,
  ArrowPathIcon,
  FunnelIcon,
  ShoppingCartIcon,
  ExclamationCircleIcon,
  ClipboardDocumentListIcon,
  ArchiveBoxIcon,
  BeakerIcon,
  HomeIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline'
import { AddItemModal } from './add-item-modal'
import { ViewHistoryModal } from './view-history-modal'
import { UpdateStockModal } from './update-stock-modal'
import { OrderMoreModal } from './order-more-modal'

// Inventory Categories
const categories = [
  { id: 'all', name: 'All Items' },
  { id: 'housekeeping', name: 'Housekeeping' },
  { id: 'amenities', name: 'Room Amenities' },
  { id: 'maintenance', name: 'Maintenance' },
  { id: 'kitchen', name: 'Kitchen & F&B' },
  { id: 'office', name: 'Office Supplies' },
]

// Inventory Stats
const stats = [
  {
    title: 'Total Items',
    value: '2,846',
    icon: ArchiveBoxIcon,
    change: '+12.3%',
    changeType: 'positive',
  },
  {
    title: 'Low Stock Items',
    value: '28',
    icon: ExclamationCircleIcon,
    change: '-5',
    changeType: 'negative',
  },
  {
    title: 'Orders Pending',
    value: '12',
    icon: ShoppingCartIcon,
    change: '+3',
    changeType: 'neutral',
  },
  {
    title: 'Stock Value',
    value: '$45.8K',
    icon: ClipboardDocumentListIcon,
    change: '+8.2%',
    changeType: 'positive',
  },
]

// Inventory Items
const inventoryItems = [
  {
    id: 1,
    name: 'Bath Towels',
    category: 'housekeeping',
    sku: 'TWL-001',
    quantity: 450,
    minStock: 200,
    maxStock: 600,
    unit: 'pcs',
    price: 12.99,
    status: 'in-stock',
    lastUpdated: '2024-01-15',
    icon: HomeIcon,
  },
  {
    id: 2,
    name: 'Shampoo Bottles',
    category: 'amenities',
    sku: 'SHP-002',
    quantity: 180,
    minStock: 200,
    maxStock: 500,
    unit: 'bottles',
    price: 3.99,
    status: 'low-stock',
    lastUpdated: '2024-01-14',
    icon: BeakerIcon,
  },
  {
    id: 3,
    name: 'Light Bulbs',
    category: 'maintenance',
    sku: 'LB-003',
    quantity: 320,
    minStock: 100,
    maxStock: 400,
    unit: 'pcs',
    price: 2.49,
    status: 'in-stock',
    lastUpdated: '2024-01-13',
    icon: SparklesIcon,
  },
]

const statusStyles = {
  'in-stock': {
    color: 'green',
    label: 'In Stock',
  },
  'low-stock': {
    color: 'yellow',
    label: 'Low Stock',
  },
  'out-of-stock': {
    color: 'red',
    label: 'Out of Stock',
  },
  'ordered': {
    color: 'blue',
    label: 'Ordered',
  },
} as const

export default function InventoryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false)
  const [isUpdateStockModalOpen, setIsUpdateStockModalOpen] = useState(false)
  const [isOrderMoreModalOpen, setIsOrderMoreModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [items, setItems] = useState(inventoryItems)

  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleAddItem = (newItem: any) => {
    const itemWithDefaults = {
      ...newItem,
      id: items.length + 1,
      status: newItem.quantity <= newItem.minStock ? 'low-stock' : 'in-stock',
      lastUpdated: new Date().toISOString().split('T')[0],
      icon: ArchiveBoxIcon,
    }
    setItems([...items, itemWithDefaults])
  }

  const handleUpdateStock = (quantity: number) => {
    if (!selectedItem) return

    const updatedItems = items.map(item => {
      if (item.id === selectedItem.id) {
        return {
          ...item,
          quantity,
          status: quantity <= item.minStock ? 'low-stock' : 'in-stock',
          lastUpdated: new Date().toISOString().split('T')[0],
        }
      }
      return item
    })
    setItems(updatedItems)
  }

  const handleOrderMore = (orderData: any) => {
    // In a real app, this would send the order to your backend
    console.log('Order placed:', { item: selectedItem, ...orderData })
    // Optionally update the item status to 'ordered'
    const updatedItems = items.map(item => {
      if (item.id === selectedItem?.id) {
        return {
          ...item,
          status: 'ordered',
          lastUpdated: new Date().toISOString().split('T')[0],
        }
      }
      return item
    })
    setItems(updatedItems)
  }

  // Add this helper function for consistent date formatting
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Title>Inventory Management</Title>
          <Text>Track and manage hotel inventory items</Text>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="secondary" 
            icon={ArrowPathIcon}
            onClick={() => {
              // Refresh inventory logic
            }}
          >
            Refresh
          </Button>
          <Button 
            icon={PlusIcon}
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Item
          </Button>
        </div>
      </div>

      {/* Modals */}
      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddItem}
      />
      {selectedItem && (
        <>
          <ViewHistoryModal
            isOpen={isHistoryModalOpen}
            onClose={() => {
              setIsHistoryModalOpen(false)
              setSelectedItem(null)
            }}
            item={selectedItem}
          />
          <UpdateStockModal
            isOpen={isUpdateStockModalOpen}
            onClose={() => {
              setIsUpdateStockModalOpen(false)
              setSelectedItem(null)
            }}
            onSubmit={handleUpdateStock}
            item={selectedItem}
          />
          <OrderMoreModal
            isOpen={isOrderMoreModalOpen}
            onClose={() => {
              setIsOrderMoreModalOpen(false)
              setSelectedItem(null)
            }}
            onSubmit={handleOrderMore}
            item={selectedItem}
          />
        </>
      )}

      {/* Stats Overview */}
      <Grid numItemsLg={4} className="gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} decoration="top" decorationColor={stat.changeType === 'positive' ? 'emerald' : stat.changeType === 'negative' ? 'red' : 'blue'}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <stat.icon className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <Text>{stat.title}</Text>
                  <Title>{stat.value}</Title>
                </div>
              </div>
              <Badge 
                color={stat.changeType === 'positive' ? 'emerald' : stat.changeType === 'negative' ? 'red' : 'blue'}
              >
                {stat.change}
              </Badge>
            </div>
          </Card>
        ))}
      </Grid>

      {/* Filters and Search */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <TextInput
              icon={FunnelIcon}
              placeholder="Search by name or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="w-full md:w-48">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
              placeholder="Select Category"
            >
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
      </Card>

      {/* Inventory Items */}
      <Card>
        <div className="space-y-4">
          {filteredItems.map((item) => {
            const stockPercentage = (item.quantity / item.maxStock) * 100
            const status = item.quantity <= item.minStock ? 'low-stock' : 'in-stock'
            const statusStyle = statusStyles[status]

            return (
              <div
                key={item.id}
                className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <item.icon className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <Text className="font-medium">{item.name}</Text>
                        <Badge color={statusStyle.color}>
                          {statusStyle.label}
                        </Badge>
                      </div>
                      <Text className="text-sm text-gray-500">SKU: {item.sku}</Text>
                    </div>
                  </div>
                  <div className="text-right">
                    <Text className="font-medium">${item.price.toFixed(2)} / {item.unit}</Text>
                    <Text className="text-sm text-gray-500">
                      Updated: {formatDate(item.lastUpdated)}
                    </Text>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                    <span>Stock Level ({item.quantity} {item.unit})</span>
                    <span>
                      Min: {item.minStock} | Max: {item.maxStock}
                    </span>
                  </div>
                  <ProgressBar
                    value={stockPercentage}
                    color={status === 'low-stock' ? 'yellow' : 'emerald'}
                    className="mt-1"
                  />
                </div>

                <div className="mt-4 flex justify-end space-x-2">
                  <Button 
                    variant="light" 
                    size="xs"
                    onClick={() => {
                      setSelectedItem(item)
                      setIsHistoryModalOpen(true)
                    }}
                  >
                    View History
                  </Button>
                  <Button 
                    variant="light" 
                    size="xs"
                    onClick={() => {
                      setSelectedItem(item)
                      setIsUpdateStockModalOpen(true)
                    }}
                  >
                    Update Stock
                  </Button>
                  <Button 
                    size="xs"
                    onClick={() => {
                      setSelectedItem(item)
                      setIsOrderMoreModalOpen(true)
                    }}
                  >
                    Order More
                  </Button>
                </div>
              </div>
            )
          })}

          {filteredItems.length === 0 && (
            <div className="text-center py-8">
              <Text>No inventory items found</Text>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
} 