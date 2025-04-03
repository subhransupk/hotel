'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon, FolderIcon, DocumentIcon, DocumentDuplicateIcon, DocumentTextIcon, PlusIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { Card, Title, Text, Tab, TabList, TabGroup, TabPanels, TabPanel, Button } from '@tremor/react';

interface Document {
  id: string;
  name: string;
  type: string;
  category: string;
  lastModified: string;
  size: string;
}

const documents: Document[] = [
  {
    id: '1',
    name: 'Hotel Policy Guidelines',
    type: 'PDF',
    category: 'Policies',
    lastModified: '2024-02-15',
    size: '2.4 MB'
  },
  {
    id: '2',
    name: 'Staff Training Manual',
    type: 'DOCX',
    category: 'HR',
    lastModified: '2024-02-14',
    size: '1.8 MB'
  },
  {
    id: '3',
    name: 'Room Service Menu',
    type: 'PDF',
    category: 'Operations',
    lastModified: '2024-02-13',
    size: '3.2 MB'
  },
  // Add more sample documents as needed
];

const categories = [
  { name: 'All Documents', icon: DocumentDuplicateIcon },
  { name: 'Policies', icon: DocumentTextIcon },
  { name: 'HR', icon: FolderIcon },
  { name: 'Operations', icon: DocumentIcon },
];

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // Handle file upload logic here
      console.log('Files selected:', files);
      setIsUploadModalOpen(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Title>Documents</Title>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <div className="relative">
              <input
                type="text"
                placeholder="Search documents..."
                className="w-full sm:w-[300px] pl-10 pr-4 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              icon={PlusIcon}
              className="bg-blue-500 hover:bg-blue-600 text-white"
              onClick={() => setIsUploadModalOpen(true)}
            >
              Upload
            </Button>
          </div>
        </div>
      </div>

      <TabGroup>
        <TabList className="mt-8">
          {categories.map((category) => (
            <Tab key={category.name} icon={category.icon}>
              {category.name}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {filteredDocuments.map((doc) => (
                <Card key={doc.id} className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-blue-50 dark:bg-blue-900 rounded-lg">
                      <DocumentIcon className="h-6 w-6 text-blue-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Text className="font-medium truncate">{doc.name}</Text>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                          {doc.type}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {doc.size}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <span>Last modified: {doc.lastModified}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabPanel>
          {categories.slice(1).map((category) => (
            <TabPanel key={category.name}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {filteredDocuments
                  .filter(doc => category.name === 'All Documents' || doc.category === category.name)
                  .map((doc) => (
                    <Card key={doc.id} className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-blue-50 dark:bg-blue-900 rounded-lg">
                          <DocumentIcon className="h-6 w-6 text-blue-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <Text className="font-medium truncate">{doc.name}</Text>
                          <div className="flex items-center space-x-2 mt-2">
                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                              {doc.type}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {doc.size}
                            </span>
                          </div>
                          <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <span>Last modified: {doc.lastModified}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Upload Document</h3>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8">
                <div className="flex flex-col items-center justify-center text-center">
                  <ArrowUpTrayIcon className="h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Drag and drop your files here, or
                  </p>
                  <label className="cursor-pointer">
                    <span className="text-blue-500 hover:text-blue-600">browse</span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                      multiple
                    />
                  </label>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Supported formats: PDF, DOCX, XLS, JPG, PNG
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="secondary"
                  onClick={() => setIsUploadModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={() => setIsUploadModalOpen(false)}
                >
                  Upload
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 