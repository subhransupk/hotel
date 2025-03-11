'use client'

import { useState, useEffect } from 'react'
import { 
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Badge,
  Button,
  Text,
  Switch,
} from '@tremor/react'
import { 
  PencilIcon, 
  TrashIcon, 
  EyeIcon,
  ArrowDownTrayIcon,
  DocumentIcon,
  DocumentTextIcon,
  DocumentChartBarIcon,
  PhotoIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { format } from 'date-fns'
import { Document } from '../types'

// Sample data - in a real app, this would come from an API
const SAMPLE_DOCUMENTS: Document[] = [
  {
    id: '1',
    name: 'Terms and Conditions',
    description: 'Standard terms and conditions for hotel bookings',
    category: 'legal',
    fileUrl: '/documents/terms.pdf',
    fileType: 'pdf',
    fileSize: 245000, // in bytes
    lastUpdated: '2023-10-15',
    version: '1.2',
    isActive: true,
    tags: ['legal', 'terms', 'booking'],
  },
  {
    id: '2',
    name: 'Privacy Policy',
    description: 'Privacy policy document explaining data handling practices',
    category: 'legal',
    fileUrl: '/documents/privacy.pdf',
    fileType: 'pdf',
    fileSize: 198000,
    lastUpdated: '2023-11-02',
    version: '2.0',
    isActive: true,
    tags: ['legal', 'privacy', 'data'],
  },
  {
    id: '3',
    name: 'Booking Confirmation Template',
    description: 'Template for booking confirmation documents',
    category: 'templates',
    fileUrl: '/documents/booking-template.docx',
    fileType: 'docx',
    fileSize: 78500,
    lastUpdated: '2023-12-10',
    version: '1.0',
    isActive: true,
    tags: ['template', 'booking', 'confirmation'],
  },
  {
    id: '4',
    name: 'Invoice Template',
    description: 'Standard invoice template for hotel services',
    category: 'templates',
    fileUrl: '/documents/invoice-template.docx',
    fileType: 'docx',
    fileSize: 65200,
    lastUpdated: '2023-12-15',
    version: '1.1',
    isActive: true,
    tags: ['template', 'invoice', 'billing'],
  },
  {
    id: '5',
    name: 'Hotel Brochure',
    description: 'Marketing brochure showcasing hotel amenities',
    category: 'marketing',
    fileUrl: '/documents/brochure.pdf',
    fileType: 'pdf',
    fileSize: 3500000,
    lastUpdated: '2023-11-20',
    version: '2.1',
    isActive: true,
    tags: ['marketing', 'brochure', 'amenities'],
  },
  {
    id: '6',
    name: 'Room Service Menu',
    description: 'Current room service menu with prices',
    category: 'operational',
    fileUrl: '/documents/menu.pdf',
    fileType: 'pdf',
    fileSize: 1250000,
    lastUpdated: '2023-12-05',
    version: '3.2',
    isActive: false,
    tags: ['menu', 'room service', 'food'],
  },
]

interface DocumentListProps {
  category: string;
  onEdit: (document: Document) => void;
}

// Simple custom modal component
function Modal({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) {
  useEffect(() => {
    // Prevent scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-25" onClick={onClose}></div>
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}

export function DocumentList({ category, onEdit }: DocumentListProps) {
  const [documents, setDocuments] = useState<Document[]>(
    SAMPLE_DOCUMENTS.filter(doc => 
      category === 'all' || doc.category === category
    )
  );
  const [previewDocument, setPreviewDocument] = useState<Document | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleDelete = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  const handleToggleActive = (id: string) => {
    setDocuments(documents.map(doc => 
      doc.id === id 
        ? { ...doc, isActive: !doc.isActive } 
        : doc
    ));
  };

  const handlePreview = (document: Document) => {
    setPreviewDocument(document);
    setIsPreviewOpen(true);
  };

  // Format date in a consistent way that doesn't depend on locale
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'yyyy-MM-dd');
  };

  // Format file size to human-readable format
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Get appropriate icon for file type
  const getFileIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case 'pdf':
        return <DocumentTextIcon className="h-6 w-6 text-red-500" />;
      case 'docx':
      case 'doc':
        return <DocumentIcon className="h-6 w-6 text-blue-500" />;
      case 'xlsx':
      case 'xls':
        return <DocumentChartBarIcon className="h-6 w-6 text-green-500" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <PhotoIcon className="h-6 w-6 text-purple-500" />;
      default:
        return <DocumentIcon className="h-6 w-6 text-gray-500" />;
    }
  };

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell className="w-[250px]">Document Name</TableHeaderCell>
            <TableHeaderCell>Description</TableHeaderCell>
            <TableHeaderCell>Version</TableHeaderCell>
            <TableHeaderCell>Size</TableHeaderCell>
            <TableHeaderCell>Last Updated</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell className="text-right">Actions</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {documents.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                <Text>No documents found in this category. Upload your first document!</Text>
              </TableCell>
            </TableRow>
          ) : (
            documents.map((document) => (
              <TableRow key={document.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 flex items-center justify-center bg-gray-100 rounded">
                      {getFileIcon(document.fileType)}
                    </div>
                    <div>
                      <span className="block truncate max-w-[180px]">{document.name}</span>
                      <span className="text-xs text-gray-500 uppercase">{document.fileType}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="truncate max-w-[220px] block">{document.description}</span>
                </TableCell>
                <TableCell>
                  <Badge color="blue" size="xs">
                    v{document.version}
                  </Badge>
                </TableCell>
                <TableCell>{formatFileSize(document.fileSize)}</TableCell>
                <TableCell>{formatDate(document.lastUpdated)}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={document.isActive} 
                      onChange={() => handleToggleActive(document.id)}
                    />
                    <Text>{document.isActive ? 'Active' : 'Inactive'}</Text>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="secondary" 
                      size="xs" 
                      icon={EyeIcon}
                      tooltip="Preview"
                      onClick={() => handlePreview(document)}
                    />
                    <Button 
                      variant="secondary" 
                      size="xs" 
                      icon={PencilIcon}
                      tooltip="Edit"
                      onClick={() => onEdit(document)}
                    />
                    <Button 
                      variant="secondary" 
                      size="xs" 
                      icon={ArrowDownTrayIcon}
                      tooltip="Download"
                      onClick={() => window.open(document.fileUrl, '_blank')}
                    />
                    <Button 
                      variant="secondary" 
                      size="xs" 
                      icon={TrashIcon}
                      tooltip="Delete"
                      onClick={() => handleDelete(document.id)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Custom Modal for Preview */}
      <Modal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)}>
        {previewDocument && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  {previewDocument.name}
                </h3>
                <Text className="text-gray-500">Category: <span className="capitalize">{previewDocument.category}</span></Text>
              </div>
              <Button
                variant="light"
                icon={XMarkIcon}
                onClick={() => setIsPreviewOpen(false)}
              />
            </div>
            
            <div className="space-y-6">
              <div>
                <Text className="text-sm font-medium mb-2">Document Preview</Text>
                <div className="border rounded-md p-4 bg-gray-50 min-h-[200px] flex flex-col items-center justify-center">
                  <div className="mb-4">
                    {getFileIcon(previewDocument.fileType)}
                  </div>
                  <Text className="text-center">
                    Preview not available. Please download the document to view it.
                  </Text>
                  <Button
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white"
                    icon={ArrowDownTrayIcon}
                    onClick={() => window.open(previewDocument.fileUrl, '_blank')}
                  >
                    Download
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Text className="text-sm font-medium">File Type</Text>
                  <Text className="uppercase">{previewDocument.fileType}</Text>
                </div>
                
                <div>
                  <Text className="text-sm font-medium">File Size</Text>
                  <Text>{formatFileSize(previewDocument.fileSize)}</Text>
                </div>
                
                <div>
                  <Text className="text-sm font-medium">Version</Text>
                  <Text>v{previewDocument.version}</Text>
                </div>
                
                <div>
                  <Text className="text-sm font-medium">Last Updated</Text>
                  <Text>{formatDate(previewDocument.lastUpdated)}</Text>
                </div>
                
                <div>
                  <Text className="text-sm font-medium">Status</Text>
                  <Badge color={previewDocument.isActive ? "green" : "gray"}>
                    {previewDocument.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
              
              <div>
                <Text className="text-sm font-medium">Description</Text>
                <Text className="text-gray-700">{previewDocument.description}</Text>
              </div>
              
              <div>
                <Text className="text-sm font-medium">Tags</Text>
                <div className="flex flex-wrap gap-1 mt-1">
                  {previewDocument.tags.map((tag) => (
                    <Badge key={tag} color="gray" size="xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <Button
                variant="secondary"
                onClick={() => setIsPreviewOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
} 