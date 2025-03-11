'use client'

import { useState } from 'react'
import { z } from 'zod'
import { 
  Card,
  Text,
  TextInput,
  Button,
  Switch,
  Divider,
  Title,
  Subtitle,
  Grid,
  Col,
  Badge,
} from '@tremor/react'
import { 
  ArrowLeftIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline'
import { Domain, DomainFormData } from '../types'

// Form validation schema
const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  customDomain: z.string()
    .min(1, 'Custom domain is required')
    .regex(/^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/, 'Invalid domain format'),
  sslEnabled: z.boolean().default(true),
});

type FormErrors = {
  [K in keyof z.infer<typeof formSchema>]?: string;
};

interface DomainFormProps {
  initialData?: Domain;
  onCancel: () => void;
  onSave: (data: DomainFormData) => void;
}

export function DomainForm({ initialData, onCancel, onSave }: DomainFormProps) {
  const [formData, setFormData] = useState<DomainFormData>({
    name: initialData?.name || '',
    customDomain: initialData?.customDomain || '',
    sslEnabled: initialData?.sslEnabled ?? true,
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Primary domain is fixed for this tenant
  const primaryDomain = 'app.hotelplatform.com';
  
  const handleChange = (field: keyof DomainFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when field is edited
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };
  
  const validateForm = (): boolean => {
    try {
      formSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: FormErrors = {};
        error.errors.forEach(err => {
          const path = err.path[0] as keyof FormErrors;
          newErrors[path] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onSave(formData);
      setIsSubmitting(false);
    }, 500);
  };
  
  // Generate DNS records based on the custom domain
  const getDnsRecords = () => {
    if (!formData.customDomain) return [];
    
    const records = [
      {
        type: 'CNAME',
        host: formData.customDomain.startsWith('www.') ? 'www' : '@',
        value: primaryDomain,
        ttl: 3600,
      },
      {
        type: 'TXT',
        host: '@',
        value: `hotel-verification=${formData.customDomain.replace(/\./g, '-')}`,
        ttl: 3600,
      }
    ];
    
    // Add www record if the custom domain doesn't start with www
    if (!formData.customDomain.startsWith('www.')) {
      records.push({
        type: 'CNAME',
        host: 'www',
        value: primaryDomain,
        ttl: 3600,
      });
    }
    
    return records;
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6 flex items-center">
        <Button
          variant="light"
          icon={ArrowLeftIcon}
          onClick={onCancel}
          className="mr-4"
        >
          Back
        </Button>
        <div>
          <Title>{initialData ? 'Edit Domain' : 'Add New Domain'}</Title>
          <Subtitle>
            {initialData 
              ? 'Update your domain configuration' 
              : 'Connect a custom domain to your hotel platform'}
          </Subtitle>
        </div>
      </div>
      
      <Grid numItems={1} numItemsMd={2} className="gap-6 mt-6">
        <Col numColSpan={1} numColSpanMd={1}>
          <Card>
            <Title>Domain Information</Title>
            <Text className="mt-2">
              Configure your custom domain to create a branded experience for your customers.
            </Text>
            
            <div className="mt-6 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Domain Name
                </label>
                <TextInput
                  id="name"
                  placeholder="Main Hotel Website"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  error={!!errors.name}
                  errorMessage={errors.name}
                />
                <Text className="text-xs text-gray-500 mt-1">
                  A descriptive name to identify this domain
                </Text>
              </div>
              
              <div>
                <label htmlFor="customDomain" className="block text-sm font-medium text-gray-700 mb-1">
                  Custom Domain
                </label>
                <div className="flex items-center">
                  <GlobeAltIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <TextInput
                    id="customDomain"
                    placeholder="www.yourdomain.com"
                    value={formData.customDomain}
                    onChange={(e) => handleChange('customDomain', e.target.value)}
                    error={!!errors.customDomain}
                    errorMessage={errors.customDomain}
                    className="flex-1"
                  />
                </div>
                <Text className="text-xs text-gray-500 mt-1">
                  The domain you want to use for your hotel website
                </Text>
              </div>
              
              <div className="pt-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Text className="font-medium">SSL Certificate</Text>
                    <Text className="text-xs text-gray-500">
                      Enable HTTPS for secure connections
                    </Text>
                  </div>
                  <Switch
                    id="sslEnabled"
                    checked={formData.sslEnabled}
                    onChange={(value) => handleChange('sslEnabled', value)}
                  />
                </div>
                {formData.sslEnabled && (
                  <div className="flex items-start mt-2 p-2 bg-green-50 rounded-md">
                    <ShieldCheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <Text className="text-xs text-green-700">
                      SSL certificate will be automatically provisioned for your domain once it's verified.
                    </Text>
                  </div>
                )}
                {!formData.sslEnabled && (
                  <div className="flex items-start mt-2 p-2 bg-yellow-50 rounded-md">
                    <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                    <Text className="text-xs text-yellow-700">
                      Not recommended. Your site will be served over HTTP which is not secure.
                    </Text>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </Col>
        
        <Col numColSpan={1} numColSpanMd={1}>
          <Card>
            <Title>DNS Configuration</Title>
            <Text className="mt-2">
              After adding your domain, you'll need to configure these DNS records with your domain provider.
            </Text>
            
            <div className="mt-6">
              <div className="flex items-center mb-4">
                <InformationCircleIcon className="h-5 w-5 text-blue-500 mr-2" />
                <Text className="text-sm text-blue-700">
                  These records will verify your ownership of the domain and direct traffic to our servers.
                </Text>
              </div>
              
              {formData.customDomain ? (
                <div className="border rounded-md overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Host</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TTL</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {getDnsRecords().map((record, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <Badge color="blue" size="xs">
                              {record.type}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {record.host}
                          </td>
                          <td className="px-4 py-3 text-sm break-all">
                            <span className="font-mono text-xs">{record.value}</span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {record.ttl}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="border border-dashed rounded-md p-6 text-center">
                  <GlobeAltIcon className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                  <Text className="text-gray-500">
                    Enter a custom domain to see required DNS records
                  </Text>
                </div>
              )}
              
              <div className="mt-4 text-xs text-gray-500 space-y-2">
                <p>
                  <strong>Note:</strong> DNS changes can take up to 24-48 hours to propagate globally.
                </p>
                <p>
                  After configuring these records, return to this page and click "Verify Domain" to complete the setup.
                </p>
              </div>
            </div>
          </Card>
        </Col>
      </Grid>
      
      <div className="mt-6 flex justify-end space-x-3">
        <Button
          variant="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          {initialData ? 'Update Domain' : 'Add Domain'}
        </Button>
      </div>
    </form>
  )
} 