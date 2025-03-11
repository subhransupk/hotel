'use client'

import { useState } from 'react'
import {
  Card,
  Title,
  Text,
  Tab,
  TabList,
  TabGroup,
  TabPanel,
  TabPanels,
  Badge,
  Button,
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  TextInput,
  NumberInput,
  Select,
  SelectItem,
  Divider,
  Grid,
  Col,
  Flex,
  Switch,
} from '@tremor/react'
import {
  StarIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  CheckIcon,
  XMarkIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@heroicons/react/24/outline'

// Define the tier type
type PartnerTier = {
  id: string;
  name: string;
  level: number;
  color: string;
  baseCommissionRate: number;
  minimumRevenue: number;
  minimumClients: number;
  benefits: {
    id: string;
    name: string;
    description: string;
    enabled: boolean;
  }[];
  requirements: string[];
};

// Mock data for partner tiers
const initialTiers: PartnerTier[] = [
  {
    id: 'tier-gold',
    name: 'Gold',
    level: 3,
    color: 'amber',
    baseCommissionRate: 25,
    minimumRevenue: 50000,
    minimumClients: 20,
    benefits: [
      {
        id: 'benefit-1',
        name: 'Priority Support',
        description: 'Access to dedicated partner support team with 4-hour response time',
        enabled: true,
      },
      {
        id: 'benefit-2',
        name: 'Co-marketing Opportunities',
        description: 'Joint marketing campaigns and featured placement on our website',
        enabled: true,
      },
      {
        id: 'benefit-3',
        name: 'Advanced API Access',
        description: 'Full access to all API endpoints with higher rate limits',
        enabled: true,
      },
      {
        id: 'benefit-4',
        name: 'Partner Advisory Board',
        description: 'Invitation to join our partner advisory board',
        enabled: true,
      },
      {
        id: 'benefit-5',
        name: 'Quarterly Business Reviews',
        description: 'Strategic business reviews with our partnership team',
        enabled: true,
      },
    ],
    requirements: [
      'Minimum of $50,000 in annual referred revenue',
      'At least 20 active client referrals',
      'Completion of Gold tier certification program',
      'Minimum of 2 years as a Silver partner',
    ],
  },
  {
    id: 'tier-silver',
    name: 'Silver',
    level: 2,
    color: 'gray',
    baseCommissionRate: 20,
    minimumRevenue: 25000,
    minimumClients: 10,
    benefits: [
      {
        id: 'benefit-1',
        name: 'Priority Support',
        description: 'Access to dedicated partner support team with 4-hour response time',
        enabled: true,
      },
      {
        id: 'benefit-2',
        name: 'Co-marketing Opportunities',
        description: 'Joint marketing campaigns and featured placement on our website',
        enabled: true,
      },
      {
        id: 'benefit-3',
        name: 'Advanced API Access',
        description: 'Full access to all API endpoints with higher rate limits',
        enabled: true,
      },
      {
        id: 'benefit-4',
        name: 'Partner Advisory Board',
        description: 'Invitation to join our partner advisory board',
        enabled: false,
      },
      {
        id: 'benefit-5',
        name: 'Quarterly Business Reviews',
        description: 'Strategic business reviews with our partnership team',
        enabled: false,
      },
    ],
    requirements: [
      'Minimum of $25,000 in annual referred revenue',
      'At least 10 active client referrals',
      'Completion of Silver tier certification program',
      'Minimum of 1 year as a Bronze partner',
    ],
  },
  {
    id: 'tier-bronze',
    name: 'Bronze',
    level: 1,
    color: 'orange',
    baseCommissionRate: 15,
    minimumRevenue: 10000,
    minimumClients: 5,
    benefits: [
      {
        id: 'benefit-1',
        name: 'Priority Support',
        description: 'Access to dedicated partner support team with 4-hour response time',
        enabled: false,
      },
      {
        id: 'benefit-2',
        name: 'Co-marketing Opportunities',
        description: 'Joint marketing campaigns and featured placement on our website',
        enabled: false,
      },
      {
        id: 'benefit-3',
        name: 'Advanced API Access',
        description: 'Full access to all API endpoints with higher rate limits',
        enabled: false,
      },
      {
        id: 'benefit-4',
        name: 'Partner Advisory Board',
        description: 'Invitation to join our partner advisory board',
        enabled: false,
      },
      {
        id: 'benefit-5',
        name: 'Quarterly Business Reviews',
        description: 'Strategic business reviews with our partnership team',
        enabled: false,
      },
    ],
    requirements: [
      'Minimum of $10,000 in annual referred revenue',
      'At least 5 active client referrals',
      'Completion of Bronze tier certification program',
    ],
  },
];

// Available colors for tiers
const tierColors = [
  { name: 'Amber', value: 'amber' },
  { name: 'Gray', value: 'gray' },
  { name: 'Orange', value: 'orange' },
  { name: 'Blue', value: 'blue' },
  { name: 'Green', value: 'emerald' },
  { name: 'Purple', value: 'purple' },
  { name: 'Red', value: 'red' },
];

export default function PartnerTiersPage() {
  const [tiers, setTiers] = useState<PartnerTier[]>(initialTiers);
  const [selectedTier, setSelectedTier] = useState<PartnerTier | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTier, setEditedTier] = useState<PartnerTier | null>(null);
  const [newRequirement, setNewRequirement] = useState('');

  // Handle tier selection
  const handleSelectTier = (tier: PartnerTier) => {
    setSelectedTier(tier);
    setIsEditing(false);
  };

  // Start editing a tier
  const handleEditTier = () => {
    if (!selectedTier) return;
    setEditedTier({ ...selectedTier });
    setIsEditing(true);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedTier(null);
  };

  // Save edited tier
  const handleSaveTier = () => {
    if (!editedTier) return;
    
    setTiers(tiers.map(tier => tier.id === editedTier.id ? editedTier : tier));
    setSelectedTier(editedTier);
    setIsEditing(false);
    setEditedTier(null);
  };

  // Toggle benefit enabled status
  const handleToggleBenefit = (benefitId: string) => {
    if (!editedTier) return;
    
    setEditedTier({
      ...editedTier,
      benefits: editedTier.benefits.map(benefit => 
        benefit.id === benefitId 
          ? { ...benefit, enabled: !benefit.enabled } 
          : benefit
      )
    });
  };

  // Add a new requirement
  const handleAddRequirement = () => {
    if (!editedTier || !newRequirement.trim()) return;
    
    setEditedTier({
      ...editedTier,
      requirements: [...editedTier.requirements, newRequirement.trim()]
    });
    setNewRequirement('');
  };

  // Remove a requirement
  const handleRemoveRequirement = (index: number) => {
    if (!editedTier) return;
    
    setEditedTier({
      ...editedTier,
      requirements: editedTier.requirements.filter((_, i) => i !== index)
    });
  };

  // Create a new tier
  const handleCreateTier = () => {
    const newTier: PartnerTier = {
      id: `tier-${Date.now()}`,
      name: 'New Tier',
      level: tiers.length + 1,
      color: 'blue',
      baseCommissionRate: 10,
      minimumRevenue: 5000,
      minimumClients: 3,
      benefits: [
        {
          id: 'benefit-1',
          name: 'Priority Support',
          description: 'Access to dedicated partner support team with 4-hour response time',
          enabled: false,
        },
        {
          id: 'benefit-2',
          name: 'Co-marketing Opportunities',
          description: 'Joint marketing campaigns and featured placement on our website',
          enabled: false,
        },
        {
          id: 'benefit-3',
          name: 'Advanced API Access',
          description: 'Full access to all API endpoints with higher rate limits',
          enabled: false,
        },
        {
          id: 'benefit-4',
          name: 'Partner Advisory Board',
          description: 'Invitation to join our partner advisory board',
          enabled: false,
        },
        {
          id: 'benefit-5',
          name: 'Quarterly Business Reviews',
          description: 'Strategic business reviews with our partnership team',
          enabled: false,
        },
      ],
      requirements: [
        'New requirement',
      ],
    };
    
    setTiers([...tiers, newTier]);
    setSelectedTier(newTier);
    setEditedTier(newTier);
    setIsEditing(true);
  };

  // Delete a tier
  const handleDeleteTier = () => {
    if (!selectedTier) return;
    
    setTiers(tiers.filter(tier => tier.id !== selectedTier.id));
    setSelectedTier(null);
    setIsEditing(false);
    setEditedTier(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <Title>Partner Tier Management</Title>
        <Text>Configure partner tiers, benefits, and requirements</Text>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Tier List */}
        <div className="lg:col-span-1">
          <Card>
            <div className="flex items-center justify-between">
              <Title>Partner Tiers</Title>
              <Button 
                icon={PlusIcon} 
                variant="secondary" 
                color="blue"
                onClick={handleCreateTier}
              >
                New Tier
              </Button>
            </div>
            
            <div className="mt-4 space-y-2">
              {tiers.sort((a, b) => b.level - a.level).map((tier) => (
                <div
                  key={tier.id}
                  className={`cursor-pointer rounded-lg border p-3 transition-all hover:bg-gray-50 ${
                    selectedTier?.id === tier.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                  onClick={() => handleSelectTier(tier)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`rounded-full bg-${tier.color}-100 p-1`}>
                        <StarIcon className={`h-5 w-5 text-${tier.color}-500`} />
                      </div>
                      <Text className="font-medium">{tier.name}</Text>
                    </div>
                    <Badge color={tier.color as any}>Level {tier.level}</Badge>
                  </div>
                  <div className="mt-2">
                    <Text className="text-sm text-gray-500">
                      {tier.baseCommissionRate}% Commission • Min ${tier.minimumRevenue.toLocaleString()} Revenue
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Tier Details */}
        <div className="lg:col-span-2">
          {selectedTier && !isEditing ? (
            <Card>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`rounded-full bg-${selectedTier.color}-100 p-1`}>
                    <StarIcon className={`h-6 w-6 text-${selectedTier.color}-500`} />
                  </div>
                  <Title>{selectedTier.name} Tier</Title>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    icon={PencilIcon} 
                    variant="secondary"
                    onClick={handleEditTier}
                  >
                    Edit
                  </Button>
                  <Button 
                    icon={TrashIcon} 
                    variant="secondary" 
                    color="red"
                    onClick={handleDeleteTier}
                  >
                    Delete
                  </Button>
                </div>
              </div>

              <Divider className="my-4" />

              <Grid numItems={1} numItemsMd={2} className="gap-4">
                <Col>
                  <Text className="font-semibold">Tier Details</Text>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <Text>Level:</Text>
                      <Text>{selectedTier.level}</Text>
                    </div>
                    <div className="flex justify-between">
                      <Text>Base Commission Rate:</Text>
                      <Text>{selectedTier.baseCommissionRate}%</Text>
                    </div>
                    <div className="flex justify-between">
                      <Text>Minimum Annual Revenue:</Text>
                      <Text>${selectedTier.minimumRevenue.toLocaleString()}</Text>
                    </div>
                    <div className="flex justify-between">
                      <Text>Minimum Active Clients:</Text>
                      <Text>{selectedTier.minimumClients}</Text>
                    </div>
                  </div>
                </Col>

                <Col>
                  <Text className="font-semibold">Requirements</Text>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    {selectedTier.requirements.map((req, index) => (
                      <li key={index} className="text-sm">
                        <Text>{req}</Text>
                      </li>
                    ))}
                  </ul>
                </Col>
              </Grid>

              <Divider className="my-4" />

              <Text className="font-semibold">Benefits</Text>
              <Table className="mt-2">
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Benefit</TableHeaderCell>
                    <TableHeaderCell>Description</TableHeaderCell>
                    <TableHeaderCell>Status</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedTier.benefits.map((benefit) => (
                    <TableRow key={benefit.id}>
                      <TableCell>{benefit.name}</TableCell>
                      <TableCell>{benefit.description}</TableCell>
                      <TableCell>
                        <Badge color={benefit.enabled ? 'emerald' : 'gray'}>
                          {benefit.enabled ? 'Included' : 'Not Included'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          ) : isEditing && editedTier ? (
            <Card>
              <div className="flex items-center justify-between">
                <Title>Edit {editedTier.name} Tier</Title>
                <div className="flex space-x-2">
                  <Button 
                    icon={CheckIcon} 
                    color="emerald"
                    onClick={handleSaveTier}
                  >
                    Save
                  </Button>
                  <Button 
                    icon={XMarkIcon} 
                    variant="secondary"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </Button>
                </div>
              </div>

              <Divider className="my-4" />

              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <Text className="mb-1">Tier Name</Text>
                    <TextInput
                      value={editedTier.name}
                      onChange={(e) => setEditedTier({ ...editedTier, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Text className="mb-1">Tier Color</Text>
                    <Select
                      value={editedTier.color}
                      onValueChange={(value) => setEditedTier({ ...editedTier, color: value })}
                    >
                      {tierColors.map((color) => (
                        <SelectItem key={color.value} value={color.value}>
                          {color.name}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <Text className="mb-1">Level</Text>
                    <NumberInput
                      value={editedTier.level}
                      onValueChange={(value) => setEditedTier({ ...editedTier, level: value || 1 })}
                      min={1}
                    />
                  </div>
                  <div>
                    <Text className="mb-1">Base Commission Rate (%)</Text>
                    <NumberInput
                      value={editedTier.baseCommissionRate}
                      onValueChange={(value) => setEditedTier({ ...editedTier, baseCommissionRate: value || 0 })}
                      min={0}
                      max={100}
                    />
                  </div>
                  <div>
                    <Text className="mb-1">Minimum Annual Revenue ($)</Text>
                    <NumberInput
                      value={editedTier.minimumRevenue}
                      onValueChange={(value) => setEditedTier({ ...editedTier, minimumRevenue: value || 0 })}
                      min={0}
                    />
                  </div>
                  <div>
                    <Text className="mb-1">Minimum Active Clients</Text>
                    <NumberInput
                      value={editedTier.minimumClients}
                      onValueChange={(value) => setEditedTier({ ...editedTier, minimumClients: value || 0 })}
                      min={0}
                    />
                  </div>
                </div>

                <Divider />

                <div>
                  <Text className="font-semibold">Requirements</Text>
                  <div className="mt-2 space-y-2">
                    {editedTier.requirements.map((req, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <Text>{req}</Text>
                        <Button
                          icon={TrashIcon}
                          variant="light"
                          color="red"
                          size="xs"
                          onClick={() => handleRemoveRequirement(index)}
                        />
                      </div>
                    ))}
                    <div className="flex items-center space-x-2">
                      <TextInput
                        placeholder="Add a new requirement..."
                        value={newRequirement}
                        onChange={(e) => setNewRequirement(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        icon={PlusIcon}
                        variant="secondary"
                        onClick={handleAddRequirement}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </div>

                <Divider />

                <div>
                  <Text className="font-semibold">Benefits</Text>
                  <Table className="mt-2">
                    <TableHead>
                      <TableRow>
                        <TableHeaderCell>Benefit</TableHeaderCell>
                        <TableHeaderCell>Description</TableHeaderCell>
                        <TableHeaderCell>Included</TableHeaderCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {editedTier.benefits.map((benefit) => (
                        <TableRow key={benefit.id}>
                          <TableCell>{benefit.name}</TableCell>
                          <TableCell>{benefit.description}</TableCell>
                          <TableCell>
                            <Switch
                              checked={benefit.enabled}
                              onChange={() => handleToggleBenefit(benefit.id)}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </Card>
          ) : (
            <Card>
              <div className="flex h-64 flex-col items-center justify-center">
                <Text className="text-gray-500">Select a tier to view details</Text>
                <Button 
                  icon={PlusIcon} 
                  variant="secondary" 
                  color="blue"
                  className="mt-4"
                  onClick={handleCreateTier}
                >
                  Create New Tier
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
} 