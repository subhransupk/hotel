'use client'

import { useState, Fragment } from 'react'
import {
  Card,
  Text,
  Title,
  Button,
  TextInput,
  Badge,
  Select,
  SelectItem,
} from '@tremor/react'
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  FolderIcon,
  DocumentIcon,
  DocumentTextIcon,
  DocumentDuplicateIcon,
  ArrowUpTrayIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { Dialog, Transition } from '@headlessui/react'

interface Document {
  id: number
  title: string
  category: string
  status: string
  lastUpdated: string
  author: string
  version: string
  description: string
}

// Mock data for document categories
const categories = [
  { id: 1, name: 'Getting Started', count: 5 },
  { id: 2, name: 'Hotel Operations', count: 8 },
  { id: 3, name: 'Reservations', count: 6 },
  { id: 4, name: 'Billing', count: 4 },
  { id: 5, name: 'Reports', count: 3 },
]

// Mock data for documents
const documents: Document[] = [
  {
    id: 1,
    title: 'System Overview Guide',
    category: 'Getting Started',
    status: 'Published',
    lastUpdated: '2024-02-15',
    author: 'Admin User',
    version: '1.2',
    description: 'A comprehensive guide to the hotel management system.'
  },
  {
    id: 2,
    title: 'Room Management Manual',
    category: 'Hotel Operations',
    status: 'Draft',
    lastUpdated: '2024-02-14',
    author: 'Admin User',
    version: '2.0',
    description: 'Detailed instructions for managing hotel rooms and inventory.'
  },
  {
    id: 3,
    title: 'Booking Process Guide',
    category: 'Reservations',
    status: 'Published',
    lastUpdated: '2024-02-13',
    author: 'Admin User',
    version: '1.0',
    description: 'Step-by-step guide for handling guest reservations.'
  },
  {
    id: 4,
    title: 'Payment Processing Guide',
    category: 'Billing',
    status: 'Review',
    lastUpdated: '2024-02-12',
    author: 'Admin User',
    version: '1.1',
    description: 'Instructions for processing payments and managing billing.'
  },
]

export default function Documentation() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingDocument, setEditingDocument] = useState<any>(null)
  const [newDocument, setNewDocument] = useState({
    title: '',
    category: '',
    description: '',
    version: '1.0',
  })

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleCreateDocument = () => {
    setIsCreateModalOpen(true)
  }

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement API call to create document
    console.log('Creating document:', newDocument)
    
    // Add to documents array for demo
    const newDoc = {
      id: documents.length + 1,
      title: newDocument.title,
      category: newDocument.category,
      status: 'Draft',
      lastUpdated: new Date().toISOString().split('T')[0],
      author: 'Admin User',
      version: newDocument.version,
      description: newDocument.description,
    }
    documents.push(newDoc)
    
    setNewDocument({
      title: '',
      category: '',
      description: '',
      version: '1.0',
    })
    setIsCreateModalOpen(false)
  }

  const handleEditDocument = (id: number) => {
    const docToEdit = documents.find(doc => doc.id === id)
    if (docToEdit) {
      setEditingDocument({
        ...docToEdit,
        description: docToEdit.description || ''  // In case description is not in mock data
      })
      setIsEditModalOpen(true)
    }
  }

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement API call to update document
    console.log('Updating document:', editingDocument)
    
    // Update document in array for demo
    const index = documents.findIndex(doc => doc.id === editingDocument.id)
    if (index !== -1) {
      documents[index] = {
        ...editingDocument,
        lastUpdated: new Date().toISOString().split('T')[0]
      }
    }
    
    setEditingDocument(null)
    setIsEditModalOpen(false)
  }

  const handleDeleteDocument = (id: number) => {
    if (confirm('Are you sure you want to delete this document? This action cannot be undone.')) {
      // TODO: Implement document deletion
      console.log('Delete document:', id)
    }
  }

  const handleDuplicateDocument = (id: number) => {
    // TODO: Implement document duplication
    console.log('Duplicate document:', id)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Title>Documentation Management</Title>
          <Text>Create and manage documentation for hotel clients.</Text>
        </div>
        <Button
          icon={PlusIcon}
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={handleCreateDocument}
        >
          Create Document
        </Button>
      </div>

      {/* Categories Overview */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {categories.map((category) => (
          <Card key={category.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FolderIcon className="h-5 w-5 text-gray-400" />
                <Text>{category.name}</Text>
              </div>
              <Text className="font-medium">{category.count}</Text>
            </div>
          </Card>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <Card>
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-2 top-2.5 h-5 w-5 text-gray-500" />
              <TextInput
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </Card>
        </div>
        <Card>
          <Select
            value={selectedCategory}
            onValueChange={setSelectedCategory}
            placeholder="Select category"
          >
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </Select>
        </Card>
      </div>

      {/* Documents Table */}
      <Card>
        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Document
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Version
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
              {filteredDocuments.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center">
                      <DocumentTextIcon className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">
                          {doc.title}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          By {doc.author}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {doc.category}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <Badge
                      className={
                        doc.status === 'Published'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : doc.status === 'Draft'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                      }
                    >
                      {doc.status}
                    </Badge>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    v{doc.version}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(doc.lastUpdated).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit'
                    })}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                    <button
                      type="button"
                      onClick={() => handleEditDocument(doc.id)}
                      className="inline-flex items-center rounded-md bg-white dark:bg-gray-700 px-2 py-1 text-sm font-semibold text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 mr-2"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDuplicateDocument(doc.id)}
                      className="inline-flex items-center rounded-md bg-white dark:bg-gray-700 px-2 py-1 text-sm font-semibold text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 mr-2"
                    >
                      <DocumentDuplicateIcon className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteDocument(doc.id)}
                      className="inline-flex items-center rounded-md bg-red-50 dark:bg-red-900/20 px-2 py-1 text-sm font-semibold text-red-700 dark:text-red-400 shadow-sm ring-1 ring-inset ring-red-600/20 dark:ring-red-600/40 hover:bg-red-100 dark:hover:bg-red-900/40"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Edit Document Modal */}
      <Transition.Root show={isEditModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsEditModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                    <button
                      type="button"
                      className="rounded-md text-gray-400 hover:text-gray-500"
                      onClick={() => setIsEditModalOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                      <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900 dark:text-gray-100">
                        Edit Document
                      </Dialog.Title>
                      {editingDocument && (
                        <form onSubmit={handleEditSubmit} className="mt-4 space-y-4">
                          <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Title
                            </label>
                            <input
                              type="text"
                              required
                              value={editingDocument.title}
                              onChange={(e) => setEditingDocument({ ...editingDocument, title: e.target.value })}
                              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                          </div>

                          <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Category
                            </label>
                            <select
                              required
                              value={editingDocument.category}
                              onChange={(e) => setEditingDocument({ ...editingDocument, category: e.target.value })}
                              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            >
                              <option value="">Select a category</option>
                              {categories.map((category) => (
                                <option key={category.id} value={category.name}>
                                  {category.name}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Description
                            </label>
                            <textarea
                              required
                              value={editingDocument.description}
                              onChange={(e) => setEditingDocument({ ...editingDocument, description: e.target.value })}
                              rows={3}
                              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                          </div>

                          <div>
                            <label htmlFor="version" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Version
                            </label>
                            <input
                              type="text"
                              required
                              value={editingDocument.version}
                              onChange={(e) => setEditingDocument({ ...editingDocument, version: e.target.value })}
                              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                          </div>

                          <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Status
                            </label>
                            <select
                              required
                              value={editingDocument.status}
                              onChange={(e) => setEditingDocument({ ...editingDocument, status: e.target.value })}
                              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            >
                              <option value="Draft">Draft</option>
                              <option value="Review">Review</option>
                              <option value="Published">Published</option>
                            </select>
                          </div>

                          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                            <button
                              type="submit"
                              className="inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 sm:ml-3 sm:w-auto"
                            >
                              Save Changes
                            </button>
                            <button
                              type="button"
                              className="mt-3 inline-flex w-full justify-center rounded-md bg-white dark:bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 sm:mt-0 sm:w-auto"
                              onClick={() => setIsEditModalOpen(false)}
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Create Document Modal */}
      <Transition.Root show={isCreateModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsCreateModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                    <button
                      type="button"
                      className="rounded-md text-gray-400 hover:text-gray-500"
                      onClick={() => setIsCreateModalOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                      <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900 dark:text-gray-100">
                        Create New Document
                      </Dialog.Title>
                      <form onSubmit={handleCreateSubmit} className="mt-4 space-y-4">
                        <div>
                          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Title
                          </label>
                          <input
                            type="text"
                            required
                            value={newDocument.title}
                            onChange={(e) => setNewDocument({ ...newDocument, title: e.target.value })}
                            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                        </div>

                        <div>
                          <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Category
                          </label>
                          <select
                            required
                            value={newDocument.category}
                            onChange={(e) => setNewDocument({ ...newDocument, category: e.target.value })}
                            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                          >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                              <option key={category.id} value={category.name}>
                                {category.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Description
                          </label>
                          <textarea
                            required
                            value={newDocument.description}
                            onChange={(e) => setNewDocument({ ...newDocument, description: e.target.value })}
                            rows={3}
                            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                        </div>

                        <div>
                          <label htmlFor="version" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Version
                          </label>
                          <input
                            type="text"
                            required
                            value={newDocument.version}
                            onChange={(e) => setNewDocument({ ...newDocument, version: e.target.value })}
                            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                        </div>

                        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                          <button
                            type="submit"
                            className="inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 sm:ml-3 sm:w-auto"
                          >
                            Create Document
                          </button>
                          <button
                            type="button"
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white dark:bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 sm:mt-0 sm:w-auto"
                            onClick={() => setIsCreateModalOpen(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
} 