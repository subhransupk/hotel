'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Card,
  Title,
  Text,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Badge,
  Button,
  TextInput,
  Select,
  SelectItem,
} from '@tremor/react'
import { 
  PlusIcon, 
  MagnifyingGlassIcon, 
  PencilIcon, 
  TrashIcon, 
  EyeIcon 
} from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

// Define partner type
type Partner = {
  id: string
  name: string
  email: string
  companyName: string
  partnerType: string
  status: string
  joinedDate: string
  isVerified: boolean
  website?: string | null
  description?: string | null
}

// Partner type mapping for display
const partnerTypeMap: Record<string, string> = {
  'technology': 'Technology Provider',
  'hospitality_consultant': 'Hospitality Consultant',
  'enterprise_chains': 'Enterprise/Hotel Chains',
  'others': 'Others',
}

export default function PartnersListPage() {
  const router = useRouter()
  const [partners, setPartners] = useState<Partner[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch partners from the API
  const fetchPartners = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Build query parameters
      const params = new URLSearchParams()
      if (statusFilter !== 'all') params.append('status', statusFilter)
      if (typeFilter !== 'all') params.append('type', typeFilter)
      if (searchTerm) params.append('search', searchTerm)
      
      const response = await fetch(`/api/admin/partners?${params.toString()}`)
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to fetch partners')
      }
      
      const data = await response.json()
      setPartners(data.partners || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
      toast.error('Failed to load partners')
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch partners when filters change
  useEffect(() => {
    fetchPartners()
  }, [statusFilter, typeFilter])
  
  // Debounce search to avoid too many requests
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPartners()
    }, 300)
    
    return () => clearTimeout(timer)
  }, [searchTerm])

  // Handle partner deletion
  const handleDeletePartner = async (id: string) => {
    if (confirm('Are you sure you want to delete this partner?')) {
      try {
        const response = await fetch(`/api/admin/partners/${id}`, {
          method: 'DELETE',
        })
        
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'Failed to delete partner')
        }
        
        toast.success('Partner deleted successfully')
        fetchPartners() // Refresh the list
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Failed to delete partner')
      }
    }
  }

  // Handle status filter change
  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value)
  }

  // Handle type filter change
  const handleTypeFilterChange = (value: string) => {
    setTypeFilter(value)
  }

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Title>Partner Accounts</Title>
          <Text>View and manage all partner accounts</Text>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link href="/admin/partners/create">
            <Button icon={PlusIcon}>Add Partner</Button>
          </Link>
        </div>
      </div>

      <Card>
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="col-span-1 md:col-span-1">
            <TextInput
              icon={MagnifyingGlassIcon}
              placeholder="Search partners..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <Select
              placeholder="Filter by status"
              value={statusFilter}
              onValueChange={handleStatusFilterChange}
            >
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </Select>
          </div>
          <div>
            <Select
              placeholder="Filter by type"
              value={typeFilter}
              onValueChange={handleTypeFilterChange}
            >
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="technology">Technology Provider</SelectItem>
              <SelectItem value="hospitality_consultant">Hospitality Consultant</SelectItem>
              <SelectItem value="enterprise_chains">Enterprise/Hotel Chains</SelectItem>
              <SelectItem value="others">Others</SelectItem>
            </Select>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Email</TableHeaderCell>
              <TableHeaderCell>Company</TableHeaderCell>
              <TableHeaderCell>Type</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Joined</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  Loading partners...
                </TableCell>
              </TableRow>
            ) : partners.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No partners found
                </TableCell>
              </TableRow>
            ) : (
              partners.map((partner) => (
                <TableRow key={partner.id}>
                  <TableCell>{partner.name}</TableCell>
                  <TableCell>{partner.email}</TableCell>
                  <TableCell>{partner.companyName}</TableCell>
                  <TableCell>{partnerTypeMap[partner.partnerType] || 'Unknown'}</TableCell>
                  <TableCell>
                    <Badge
                      color={
                        partner.status === 'active'
                          ? 'green'
                          : partner.status === 'pending'
                          ? 'yellow'
                          : 'red'
                      }
                    >
                      {partner.status.charAt(0).toUpperCase() + partner.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(partner.joinedDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="xs"
                        variant="secondary"
                        icon={EyeIcon}
                        onClick={() => router.push(`/admin/partners/view/${partner.id}`)}
                      >
                        View
                      </Button>
                      <Button
                        size="xs"
                        variant="secondary"
                        icon={PencilIcon}
                        onClick={() => router.push(`/admin/partners/edit/${partner.id}`)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="xs"
                        variant="secondary"
                        icon={TrashIcon}
                        color="red"
                        onClick={() => handleDeletePartner(partner.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
} 