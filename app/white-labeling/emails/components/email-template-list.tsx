'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
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
  Card,
  Title,
} from '@tremor/react'
import { 
  PencilIcon, 
  TrashIcon, 
  EyeIcon,
  DocumentDuplicateIcon,
  PhotoIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { format } from 'date-fns'
import { EmailTemplate } from '../types'

// Sample data - in a real app, this would come from an API
const SAMPLE_EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: '1',
    name: 'Welcome Email',
    subject: 'Welcome to our platform!',
    category: 'transactional',
    content: '<h1>Welcome!</h1><p>Thank you for joining our platform...</p>',
    previewImage: '/images/emails/default-transactional.jpg',
    lastUpdated: '2023-10-15',
    variables: ['user_name', 'company_name', 'login_url'],
    isActive: true,
  },
  {
    id: '2',
    name: 'Password Reset',
    subject: 'Reset your password',
    category: 'transactional',
    content: '<h1>Password Reset</h1><p>Click the link below to reset your password...</p>',
    previewImage: '/images/emails/default-transactional.jpg',
    lastUpdated: '2023-11-02',
    variables: ['user_name', 'reset_link', 'expiry_time'],
    isActive: true,
  },
  {
    id: '3',
    name: 'Monthly Newsletter',
    subject: 'Your Monthly Update',
    category: 'marketing',
    content: '<h1>Monthly Newsletter</h1><p>Here are the latest updates...</p>',
    previewImage: '/images/emails/default-marketing.jpg',
    lastUpdated: '2023-12-10',
    variables: ['user_name', 'month', 'featured_content'],
    isActive: false,
  },
  {
    id: '4',
    name: 'New Feature Announcement',
    subject: 'Exciting New Features!',
    category: 'marketing',
    content: '<h1>New Features!</h1><p>We\'ve added some exciting new features...</p>',
    previewImage: '/images/emails/default-marketing.jpg',
    lastUpdated: '2023-12-15',
    variables: ['user_name', 'feature_name', 'feature_description'],
    isActive: true,
  },
  {
    id: '5',
    name: 'Booking Confirmation',
    subject: 'Your Booking is Confirmed',
    category: 'transactional',
    content: '<h1>Booking Confirmed</h1><p>Your booking has been confirmed...</p>',
    previewImage: '/images/emails/default-transactional.jpg',
    lastUpdated: '2023-11-20',
    variables: ['user_name', 'booking_details', 'confirmation_code'],
    isActive: true,
  },
  {
    id: '6',
    name: 'Account Activity Alert',
    subject: 'Unusual Account Activity Detected',
    category: 'notifications',
    content: '<h1>Security Alert</h1><p>We detected unusual activity on your account...</p>',
    previewImage: '/images/emails/default-notification.jpg',
    lastUpdated: '2023-12-05',
    variables: ['user_name', 'activity_details', 'time', 'location'],
    isActive: true,
  },
]

interface EmailTemplateListProps {
  category: string;
  onEdit: (template: EmailTemplate) => void;
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
        <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full p-6 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}

export function EmailTemplateList({ category, onEdit }: EmailTemplateListProps) {
  const [templates, setTemplates] = useState<EmailTemplate[]>(
    SAMPLE_EMAIL_TEMPLATES.filter(template => 
      category === 'all' || template.category === category
    )
  );
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [previewTemplate, setPreviewTemplate] = useState<EmailTemplate | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleDelete = (id: string) => {
    setTemplates(templates.filter(template => template.id !== id));
  };

  const handleDuplicate = (template: EmailTemplate) => {
    const newTemplate: EmailTemplate = {
      ...template,
      id: Date.now().toString(),
      name: `${template.name} (Copy)`,
      lastUpdated: format(new Date(), 'yyyy-MM-dd'),
    };
    setTemplates([...templates, newTemplate]);
  };

  const handleToggleActive = (id: string) => {
    setTemplates(templates.map(template => 
      template.id === id 
        ? { ...template, isActive: !template.isActive } 
        : template
    ));
  };

  const handleImageError = (id: string) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  const handlePreview = (template: EmailTemplate) => {
    setPreviewTemplate(template);
    setIsPreviewOpen(true);
  };

  // Format date in a consistent way that doesn't depend on locale
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'yyyy-MM-dd');
  };

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell className="w-[250px]">Template Name</TableHeaderCell>
            <TableHeaderCell>Subject</TableHeaderCell>
            <TableHeaderCell>Last Updated</TableHeaderCell>
            <TableHeaderCell>Variables</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell className="text-right">Actions</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {templates.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                <Text>No email templates found in this category. Create your first template!</Text>
              </TableCell>
            </TableRow>
          ) : (
            templates.map((template) => (
              <TableRow key={template.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 relative overflow-hidden rounded bg-gray-100 flex items-center justify-center">
                      {imageErrors[template.id] ? (
                        <PhotoIcon className="h-6 w-6 text-gray-400" />
                      ) : (
                        <Image
                          src={template.previewImage}
                          alt={template.name}
                          fill
                          className="object-cover"
                          onError={() => handleImageError(template.id)}
                        />
                      )}
                    </div>
                    <span className="truncate max-w-[180px]">{template.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="truncate max-w-[180px] block">{template.subject}</span>
                </TableCell>
                <TableCell>{formatDate(template.lastUpdated)}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {template.variables.slice(0, 2).map((variable) => (
                      <Badge key={variable} color="blue" size="xs">
                        {variable}
                      </Badge>
                    ))}
                    {template.variables.length > 2 && (
                      <Badge color="gray" size="xs">
                        +{template.variables.length - 2} more
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={template.isActive} 
                      onChange={() => handleToggleActive(template.id)}
                    />
                    <Text>{template.isActive ? 'Active' : 'Inactive'}</Text>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="secondary" 
                      size="xs" 
                      icon={EyeIcon}
                      tooltip="Preview"
                      onClick={() => handlePreview(template)}
                    />
                    <Button 
                      variant="secondary" 
                      size="xs" 
                      icon={PencilIcon}
                      tooltip="Edit"
                      onClick={() => onEdit(template)}
                    />
                    <Button 
                      variant="secondary" 
                      size="xs" 
                      icon={DocumentDuplicateIcon}
                      tooltip="Duplicate"
                      onClick={() => handleDuplicate(template)}
                    />
                    <Button 
                      variant="secondary" 
                      size="xs" 
                      icon={TrashIcon}
                      tooltip="Delete"
                      onClick={() => handleDelete(template.id)}
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
        {previewTemplate && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  {previewTemplate.name}
                </h3>
                <Text className="text-gray-500">Subject: {previewTemplate.subject}</Text>
              </div>
              <Button
                variant="light"
                icon={XMarkIcon}
                onClick={() => setIsPreviewOpen(false)}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <div className="space-y-4">
                  <div>
                    <Text className="text-sm font-medium">Preview Image</Text>
                    <div className="mt-2 h-40 relative rounded overflow-hidden bg-gray-100">
                      {imageErrors[previewTemplate.id] ? (
                        <div className="h-full w-full flex items-center justify-center">
                          <PhotoIcon className="h-12 w-12 text-gray-400" />
                        </div>
                      ) : (
                        <Image
                          src={previewTemplate.previewImage}
                          alt={previewTemplate.name}
                          fill
                          className="object-cover"
                          onError={() => handleImageError(previewTemplate.id)}
                        />
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Text className="text-sm font-medium">Category</Text>
                    <Text className="capitalize">{previewTemplate.category}</Text>
                  </div>
                  
                  <div>
                    <Text className="text-sm font-medium">Last Updated</Text>
                    <Text>{formatDate(previewTemplate.lastUpdated)}</Text>
                  </div>
                  
                  <div>
                    <Text className="text-sm font-medium">Status</Text>
                    <Badge color={previewTemplate.isActive ? "green" : "gray"}>
                      {previewTemplate.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  
                  <div>
                    <Text className="text-sm font-medium">Variables</Text>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {previewTemplate.variables.map((variable) => (
                        <Badge key={variable} color="blue" size="xs">
                          {variable}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <Text className="text-sm font-medium mb-2">Email Content</Text>
                <div 
                  className="border rounded-md p-4 bg-white overflow-auto h-[400px]"
                  dangerouslySetInnerHTML={{ __html: previewTemplate.content }}
                />
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