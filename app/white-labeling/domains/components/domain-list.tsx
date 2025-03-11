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
  ArrowPathIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ClockIcon,
  XMarkIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon,
} from '@heroicons/react/24/outline'
import { format } from 'date-fns'
import { Domain, DnsRecord } from '../types'

// Sample data - in a real app, this would come from an API
const SAMPLE_DOMAINS: Domain[] = [
  {
    id: '1',
    name: 'Main Hotel Website',
    primaryDomain: 'app.hotelplatform.com',
    customDomain: 'www.grandhotel.com',
    status: 'active',
    sslEnabled: true,
    verificationStatus: 'verified',
    dnsRecords: [
      {
        type: 'A',
        host: '@',
        value: '192.168.1.1',
        ttl: 3600,
      },
      {
        type: 'CNAME',
        host: 'www',
        value: 'app.hotelplatform.com',
        ttl: 3600,
      },
      {
        type: 'TXT',
        host: '@',
        value: 'hotel-verification=abc123',
        ttl: 3600,
      },
    ],
    createdAt: '2023-01-15',
    updatedAt: '2023-06-20',
  },
  {
    id: '2',
    name: 'Booking Portal',
    primaryDomain: 'booking.hotelplatform.com',
    customDomain: 'booking.grandhotel.com',
    status: 'active',
    sslEnabled: true,
    verificationStatus: 'verified',
    dnsRecords: [
      {
        type: 'CNAME',
        host: 'booking',
        value: 'booking.hotelplatform.com',
        ttl: 3600,
      },
      {
        type: 'TXT',
        host: 'booking',
        value: 'hotel-verification=def456',
        ttl: 3600,
      },
    ],
    createdAt: '2023-02-10',
    updatedAt: '2023-06-25',
  },
  {
    id: '3',
    name: 'Restaurant Website',
    primaryDomain: 'restaurant.hotelplatform.com',
    customDomain: 'dining.grandhotel.com',
    status: 'pending',
    sslEnabled: true,
    verificationStatus: 'pending',
    dnsRecords: [
      {
        type: 'CNAME',
        host: 'dining',
        value: 'restaurant.hotelplatform.com',
        ttl: 3600,
      },
      {
        type: 'TXT',
        host: 'dining',
        value: 'hotel-verification=ghi789',
        ttl: 3600,
      },
    ],
    createdAt: '2023-05-05',
    updatedAt: '2023-05-05',
  },
  {
    id: '4',
    name: 'Events Portal',
    primaryDomain: 'events.hotelplatform.com',
    customDomain: 'events.grandhotel.com',
    status: 'failed',
    sslEnabled: false,
    verificationStatus: 'failed',
    dnsRecords: [
      {
        type: 'CNAME',
        host: 'events',
        value: 'events.hotelplatform.com',
        ttl: 3600,
      },
      {
        type: 'TXT',
        host: 'events',
        value: 'hotel-verification=jkl012',
        ttl: 3600,
      },
    ],
    createdAt: '2023-03-20',
    updatedAt: '2023-04-15',
  },
]

interface DomainListProps {
  onEdit: (domain: Domain) => void;
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
        <div className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full p-6 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}

export function DomainList({ onEdit }: DomainListProps) {
  const [domains, setDomains] = useState<Domain[]>(SAMPLE_DOMAINS);
  const [detailDomain, setDetailDomain] = useState<Domain | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleDelete = (id: string) => {
    setDomains(domains.filter(domain => domain.id !== id));
  };

  const handleViewDetails = (domain: Domain) => {
    setDetailDomain(domain);
    setIsDetailOpen(true);
  };

  const handleVerify = (id: string) => {
    // In a real app, this would trigger a verification process
    setDomains(domains.map(domain => 
      domain.id === id 
        ? { ...domain, verificationStatus: 'pending', updatedAt: format(new Date(), 'yyyy-MM-dd') } 
        : domain
    ));
  };

  // Format date in a consistent way that doesn't depend on locale
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'yyyy-MM-dd');
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'green';
      case 'pending':
        return 'yellow';
      case 'failed':
        return 'red';
      default:
        return 'gray';
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'verified':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case 'failed':
        return <ExclamationCircleIcon className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Domain Name</TableHeaderCell>
            <TableHeaderCell className="hidden md:table-cell">Custom Domain</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell className="hidden sm:table-cell">SSL</TableHeaderCell>
            <TableHeaderCell className="hidden md:table-cell">Verification</TableHeaderCell>
            <TableHeaderCell className="hidden lg:table-cell">Last Updated</TableHeaderCell>
            <TableHeaderCell className="text-right">Actions</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {domains.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                <Text>No domains configured. Add your first domain!</Text>
              </TableCell>
            </TableRow>
          ) : (
            domains.map((domain) => (
              <TableRow key={domain.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-3">
                    <GlobeAltIcon className="h-5 w-5 text-blue-500" />
                    <div>
                      <span className="block">{domain.name}</span>
                      <span className="text-xs text-gray-500">{domain.primaryDomain}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {domain.customDomain || '-'}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(domain.status)}
                    <Badge color={getStatusColor(domain.status)} size="xs">
                      {domain.status.charAt(0).toUpperCase() + domain.status.slice(1)}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {domain.sslEnabled ? (
                    <div className="flex items-center space-x-1">
                      <ShieldCheckIcon className="h-5 w-5 text-green-500" />
                      <Text>Enabled</Text>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1">
                      <ShieldExclamationIcon className="h-5 w-5 text-gray-400" />
                      <Text>Disabled</Text>
                    </div>
                  )}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(domain.verificationStatus)}
                    <Badge color={getStatusColor(domain.verificationStatus)} size="xs">
                      {domain.verificationStatus.charAt(0).toUpperCase() + domain.verificationStatus.slice(1)}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="hidden lg:table-cell">{formatDate(domain.updatedAt)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="secondary" 
                      size="xs" 
                      icon={EyeIcon}
                      tooltip="View Details"
                      onClick={() => handleViewDetails(domain)}
                    />
                    <Button 
                      variant="secondary" 
                      size="xs" 
                      icon={PencilIcon}
                      tooltip="Edit"
                      onClick={() => onEdit(domain)}
                    />
                    <Button 
                      variant="secondary" 
                      size="xs" 
                      icon={ArrowPathIcon}
                      tooltip="Verify"
                      onClick={() => handleVerify(domain.id)}
                      disabled={domain.verificationStatus === 'verified'}
                      className="hidden sm:flex"
                    />
                    <Button 
                      variant="secondary" 
                      size="xs" 
                      icon={TrashIcon}
                      tooltip="Delete"
                      onClick={() => handleDelete(domain.id)}
                      className="hidden sm:flex"
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Domain Details Modal */}
      <Modal isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)}>
        {detailDomain && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  {detailDomain.name}
                </h3>
                <Text className="text-gray-500">Domain Configuration Details</Text>
              </div>
              <Button
                variant="light"
                icon={XMarkIcon}
                onClick={() => setIsDetailOpen(false)}
              />
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Text className="text-sm font-medium">Primary Domain</Text>
                  <Text className="text-gray-700">{detailDomain.primaryDomain}</Text>
                </div>
                
                <div>
                  <Text className="text-sm font-medium">Custom Domain</Text>
                  <Text className="text-gray-700">{detailDomain.customDomain || '-'}</Text>
                </div>
                
                <div>
                  <Text className="text-sm font-medium">Status</Text>
                  <div className="flex items-center space-x-2 mt-1">
                    {getStatusIcon(detailDomain.status)}
                    <Badge color={getStatusColor(detailDomain.status)}>
                      {detailDomain.status.charAt(0).toUpperCase() + detailDomain.status.slice(1)}
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <Text className="text-sm font-medium">SSL Certificate</Text>
                  <div className="flex items-center space-x-1 mt-1">
                    {detailDomain.sslEnabled ? (
                      <>
                        <ShieldCheckIcon className="h-5 w-5 text-green-500" />
                        <Text>Enabled</Text>
                      </>
                    ) : (
                      <>
                        <ShieldExclamationIcon className="h-5 w-5 text-gray-400" />
                        <Text>Disabled</Text>
                      </>
                    )}
                  </div>
                </div>
                
                <div>
                  <Text className="text-sm font-medium">Created At</Text>
                  <Text className="text-gray-700">{formatDate(detailDomain.createdAt)}</Text>
                </div>
                
                <div>
                  <Text className="text-sm font-medium">Last Updated</Text>
                  <Text className="text-gray-700">{formatDate(detailDomain.updatedAt)}</Text>
                </div>
              </div>
              
              <div>
                <Text className="text-sm font-medium mb-2">DNS Records</Text>
                <div className="border rounded-md overflow-x-auto">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableHeaderCell>Type</TableHeaderCell>
                        <TableHeaderCell>Host</TableHeaderCell>
                        <TableHeaderCell>Value</TableHeaderCell>
                        <TableHeaderCell>TTL</TableHeaderCell>
                        {detailDomain.dnsRecords.some(record => record.priority !== undefined) && (
                          <TableHeaderCell>Priority</TableHeaderCell>
                        )}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {detailDomain.dnsRecords.map((record, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Badge color="blue" size="xs">
                              {record.type}
                            </Badge>
                          </TableCell>
                          <TableCell>{record.host}</TableCell>
                          <TableCell>
                            <span className="font-mono text-xs break-all">{record.value}</span>
                          </TableCell>
                          <TableCell>{record.ttl}</TableCell>
                          {detailDomain.dnsRecords.some(record => record.priority !== undefined) && (
                            <TableCell>{record.priority || '-'}</TableCell>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <Text className="text-xs text-gray-500 mt-2">
                  Configure these DNS records with your domain provider to properly connect your custom domain.
                </Text>
              </div>
              
              <div>
                <Text className="text-sm font-medium mb-2">Verification Status</Text>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(detailDomain.verificationStatus)}
                  <Text>
                    {detailDomain.verificationStatus === 'verified' ? (
                      'Domain is verified and working correctly.'
                    ) : detailDomain.verificationStatus === 'pending' ? (
                      'Verification in progress. This may take up to 24 hours.'
                    ) : (
                      'Verification failed. Please check your DNS configuration.'
                    )}
                  </Text>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-6 space-x-2">
              {detailDomain.verificationStatus !== 'verified' && (
                <Button
                  variant="secondary"
                  icon={ArrowPathIcon}
                  onClick={() => handleVerify(detailDomain.id)}
                >
                  Verify Domain
                </Button>
              )}
              <Button
                variant="secondary"
                onClick={() => setIsDetailOpen(false)}
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