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
  DocumentDuplicateIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { format } from 'date-fns'
import { SmsTemplate } from '../types'

// Sample data - in a real app, this would come from an API
const SAMPLE_SMS_TEMPLATES: SmsTemplate[] = [
  {
    id: '1',
    name: 'Booking Confirmation',
    content: 'Your booking at {{hotel_name}} is confirmed for {{check_in_date}}. Confirmation code: {{confirmation_code}}. Thank you for choosing us!',
    category: 'transactional',
    characterCount: 120,
    lastUpdated: '2023-10-15',
    variables: ['hotel_name', 'check_in_date', 'confirmation_code'],
    isActive: true,
  },
  {
    id: '2',
    name: 'Booking Reminder',
    content: 'Reminder: Your stay at {{hotel_name}} begins tomorrow. Check-in time is {{check_in_time}}. We look forward to welcoming you!',
    category: 'transactional',
    characterCount: 110,
    lastUpdated: '2023-11-02',
    variables: ['hotel_name', 'check_in_time'],
    isActive: true,
  },
  {
    id: '3',
    name: 'Special Offer',
    content: 'Exclusive offer for {{customer_name}}! Book your next stay with us and get {{discount_percentage}}% off. Use code: {{promo_code}}. Offer ends {{end_date}}.',
    category: 'marketing',
    characterCount: 140,
    lastUpdated: '2023-12-10',
    variables: ['customer_name', 'discount_percentage', 'promo_code', 'end_date'],
    isActive: false,
  },
  {
    id: '4',
    name: 'Feedback Request',
    content: 'Thank you for staying with us, {{customer_name}}! We value your opinion. Please take a moment to share your feedback: {{feedback_link}}',
    category: 'marketing',
    characterCount: 125,
    lastUpdated: '2023-12-15',
    variables: ['customer_name', 'feedback_link'],
    isActive: true,
  },
  {
    id: '5',
    name: 'Check-out Reminder',
    content: 'Reminder: Your check-out time at {{hotel_name}} is {{check_out_time}} tomorrow. Need a late check-out? Reply YES to this message.',
    category: 'transactional',
    characterCount: 130,
    lastUpdated: '2023-11-20',
    variables: ['hotel_name', 'check_out_time'],
    isActive: true,
  },
  {
    id: '6',
    name: 'Payment Confirmation',
    content: 'Payment of {{amount}} for your stay at {{hotel_name}} has been processed successfully. Reference: {{transaction_id}}',
    category: 'notifications',
    characterCount: 115,
    lastUpdated: '2023-12-05',
    variables: ['amount', 'hotel_name', 'transaction_id'],
    isActive: true,
  },
]

interface SmsTemplateListProps {
  category: string;
  onEdit: (template: SmsTemplate) => void;
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

export function SmsTemplateList({ category, onEdit }: SmsTemplateListProps) {
  const [templates, setTemplates] = useState<SmsTemplate[]>(
    SAMPLE_SMS_TEMPLATES.filter(template => 
      category === 'all' || template.category === category
    )
  );
  const [previewTemplate, setPreviewTemplate] = useState<SmsTemplate | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleDelete = (id: string) => {
    setTemplates(templates.filter(template => template.id !== id));
  };

  const handleDuplicate = (template: SmsTemplate) => {
    const newTemplate: SmsTemplate = {
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

  const handlePreview = (template: SmsTemplate) => {
    setPreviewTemplate(template);
    setIsPreviewOpen(true);
  };

  // Format date in a consistent way that doesn't depend on locale
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'yyyy-MM-dd');
  };

  // Format SMS content to highlight variables
  const formatSmsContent = (content: string) => {
    return content.replace(/\{\{([^}]+)\}\}/g, '<span class="text-blue-500 font-medium">{{$1}}</span>');
  };

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell className="w-[250px]">Template Name</TableHeaderCell>
            <TableHeaderCell>Content Preview</TableHeaderCell>
            <TableHeaderCell>Characters</TableHeaderCell>
            <TableHeaderCell>Variables</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell className="text-right">Actions</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {templates.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                <Text>No SMS templates found in this category. Create your first template!</Text>
              </TableCell>
            </TableRow>
          ) : (
            templates.map((template) => (
              <TableRow key={template.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-3">
                    <span className="truncate max-w-[220px]">{template.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="truncate max-w-[220px] block">{template.content.substring(0, 50)}...</span>
                </TableCell>
                <TableCell>
                  <Badge color={template.characterCount > 160 ? "red" : "green"} size="xs">
                    {template.characterCount} chars
                  </Badge>
                </TableCell>
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
                <Text className="text-gray-500">Category: <span className="capitalize">{previewTemplate.category}</span></Text>
              </div>
              <Button
                variant="light"
                icon={XMarkIcon}
                onClick={() => setIsPreviewOpen(false)}
              />
            </div>
            
            <div className="space-y-6">
              <div>
                <Text className="text-sm font-medium mb-2">SMS Content</Text>
                <div className="border rounded-md p-4 bg-gray-50 min-h-[100px]">
                  <div dangerouslySetInnerHTML={{ __html: formatSmsContent(previewTemplate.content) }} />
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>Character count: {previewTemplate.characterCount}</span>
                  <span>{Math.ceil(previewTemplate.characterCount / 160)} SMS segment(s)</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
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
                <Text className="text-xs text-gray-500 mt-1">
                  Variables are represented as {'{{'}<span className="text-blue-500 font-medium">variable_name</span>{'}}'}
                </Text>
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