'use client'

import { useState } from 'react'
import {
  Card,
  Title,
  Text,
  TabGroup,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  TextInput,
  Button,
  Grid,
  Divider,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionList,
  Badge,
  Metric,
} from '@tremor/react'
import {
  QuestionMarkCircleIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  PhoneIcon,
  EnvelopeIcon,
  VideoCameraIcon,
  BookOpenIcon,
  ArrowTopRightOnSquareIcon,
  MagnifyingGlassIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'

export default function HelpSupportPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  
  // Sample support tickets
  const supportTickets = [
    {
      id: 'TKT-1234',
      subject: 'Commission payment delay',
      status: 'open',
      priority: 'high',
      lastUpdated: '2 hours ago',
      messages: 3,
    },
    {
      id: 'TKT-1233',
      subject: 'API integration question',
      status: 'in-progress',
      priority: 'medium',
      lastUpdated: '1 day ago',
      messages: 5,
    },
    {
      id: 'TKT-1232',
      subject: 'Referral link not working',
      status: 'resolved',
      priority: 'low',
      lastUpdated: '3 days ago',
      messages: 4,
    },
  ]
  
  // Sample FAQ categories
  const faqCategories = [
    { id: 'all', name: 'All Categories' },
    { id: 'account', name: 'Account & Billing' },
    { id: 'commissions', name: 'Commissions' },
    { id: 'referrals', name: 'Referrals' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'technical', name: 'Technical' },
  ]
  
  // Sample FAQs
  const faqs = [
    {
      id: 1,
      question: 'How are commissions calculated?',
      answer: 'Commissions are calculated based on the booking value and your commission rate. The standard commission rate is 10% of the booking value, excluding taxes and fees. Commission rates may vary based on your partnership tier and special promotions.',
      category: 'commissions',
    },
    {
      id: 2,
      question: 'When are commission payments processed?',
      answer: 'Commission payments are processed on the 15th of each month for all bookings that were completed in the previous month. Payments typically take 3-5 business days to appear in your account.',
      category: 'commissions',
    },
    {
      id: 3,
      question: 'How do I create a custom referral link?',
      answer: 'You can create custom referral links from the Referral Links section of your dashboard. Click on "Create New Link", enter a name for your link, select the destination page, and optionally add UTM parameters for tracking.',
      category: 'referrals',
    },
    {
      id: 4,
      question: 'Can I customize the marketing materials?',
      answer: 'Yes, most marketing materials can be customized with your branding. In the Marketing Materials section, look for items with the "Customizable" badge. You can modify colors, add your logo, and in some cases, edit text content.',
      category: 'marketing',
    },
    {
      id: 5,
      question: 'How do I reset my password?',
      answer: 'To reset your password, click on the "Forgot Password" link on the login page. Enter your email address, and you will receive a password reset link. The link is valid for 24 hours.',
      category: 'account',
    },
    {
      id: 6,
      question: 'What API endpoints are available for partners?',
      answer: 'Partners have access to several API endpoints including booking creation, commission reporting, and client management. Full documentation is available in the API & Integrations section of your dashboard.',
      category: 'technical',
    },
  ]
  
  // Filter FAQs based on search query and selected category
  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })
  
  // Status badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge color="blue">Open</Badge>
      case 'in-progress':
        return <Badge color="amber">In Progress</Badge>
      case 'resolved':
        return <Badge color="green">Resolved</Badge>
      default:
        return <Badge color="gray">{status}</Badge>
    }
  }
  
  // Priority badge styling
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge color="red">High</Badge>
      case 'medium':
        return <Badge color="amber">Medium</Badge>
      case 'low':
        return <Badge color="green">Low</Badge>
      default:
        return <Badge color="gray">{priority}</Badge>
    }
  }
  
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <Title>Help & Support</Title>
        <Text>Get assistance, find answers, and access resources</Text>
      </div>
      
      {/* Support Options */}
      <Grid numItemsMd={3} className="gap-6">
        <Card className="p-6">
          <div className="flex flex-col items-center text-center">
            <div className="p-3 bg-blue-100 rounded-full mb-4">
              <ChatBubbleLeftRightIcon className="h-8 w-8 text-blue-600" />
            </div>
            <Title className="mb-2">Contact Support</Title>
            <Text className="mb-4">Get help from our dedicated partner support team</Text>
            <Button size="lg" color="blue" icon={EnvelopeIcon} className="mt-2">
              Email Support
            </Button>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex flex-col items-center text-center">
            <div className="p-3 bg-blue-100 rounded-full mb-4">
              <PhoneIcon className="h-8 w-8 text-blue-600" />
            </div>
            <Title className="mb-2">Schedule a Call</Title>
            <Text className="mb-4">Book a call with your dedicated partner manager</Text>
            <Button size="lg" color="blue" icon={ClockIcon} className="mt-2">
              Book Appointment
            </Button>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex flex-col items-center text-center">
            <div className="p-3 bg-blue-100 rounded-full mb-4">
              <AcademicCapIcon className="h-8 w-8 text-blue-600" />
            </div>
            <Title className="mb-2">Training & Resources</Title>
            <Text className="mb-4">Access training materials and partner resources</Text>
            <Button size="lg" color="blue" icon={BookOpenIcon} className="mt-2">
              View Resources
            </Button>
          </div>
        </Card>
      </Grid>
      
      <TabGroup>
        <TabList>
          <Tab icon={QuestionMarkCircleIcon}>FAQs</Tab>
          <Tab icon={ChatBubbleLeftRightIcon}>Support Tickets</Tab>
          <Tab icon={DocumentTextIcon}>Documentation</Tab>
          <Tab icon={VideoCameraIcon}>Video Tutorials</Tab>
        </TabList>
        
        <TabPanels>
          {/* FAQs Tab */}
          <TabPanel>
            <Card className="mt-6">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
                <div>
                  <Title>Frequently Asked Questions</Title>
                  <Text>Find quick answers to common questions</Text>
                </div>
                <div className="w-full md:w-auto">
                  <TextInput 
                    icon={MagnifyingGlassIcon} 
                    placeholder="Search FAQs..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="md:min-w-[300px]"
                  />
                </div>
              </div>
              
              <div className="mb-6 overflow-x-auto">
                <div className="flex space-x-2">
                  {faqCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                        selectedCategory === category.id
                          ? 'bg-blue-100 text-blue-700 font-medium'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
              
              {filteredFaqs.length > 0 ? (
                <AccordionList>
                  {filteredFaqs.map((faq) => (
                    <Accordion key={faq.id}>
                      <AccordionHeader>{faq.question}</AccordionHeader>
                      <AccordionBody>
                        <Text>{faq.answer}</Text>
                      </AccordionBody>
                    </Accordion>
                  ))}
                </AccordionList>
              ) : (
                <div className="text-center py-8">
                  <ExclamationCircleIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <Text className="text-gray-500">No FAQs found matching your search criteria.</Text>
                  <Button 
                    variant="light" 
                    className="mt-4"
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedCategory('all')
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </Card>
          </TabPanel>
          
          {/* Support Tickets Tab */}
          <TabPanel>
            <Card className="mt-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <Title>Support Tickets</Title>
                  <Text>View and manage your support requests</Text>
                </div>
                <Button icon={ChatBubbleLeftRightIcon}>Create New Ticket</Button>
              </div>
              
              {supportTickets.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="pb-3 font-medium text-gray-500">Ticket ID</th>
                        <th className="pb-3 font-medium text-gray-500">Subject</th>
                        <th className="pb-3 font-medium text-gray-500">Status</th>
                        <th className="pb-3 font-medium text-gray-500">Priority</th>
                        <th className="pb-3 font-medium text-gray-500">Last Updated</th>
                        <th className="pb-3 font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {supportTickets.map((ticket) => (
                        <tr key={ticket.id} className="border-b border-gray-100">
                          <td className="py-4 text-sm font-mono">{ticket.id}</td>
                          <td className="py-4">
                            <div className="flex items-center">
                              <Text className="font-medium">{ticket.subject}</Text>
                              {ticket.messages > 0 && (
                                <Badge color="blue" className="ml-2">{ticket.messages}</Badge>
                              )}
                            </div>
                          </td>
                          <td className="py-4">{getStatusBadge(ticket.status)}</td>
                          <td className="py-4">{getPriorityBadge(ticket.priority)}</td>
                          <td className="py-4 text-sm text-gray-500">{ticket.lastUpdated}</td>
                          <td className="py-4">
                            <Button size="xs" variant="light">View</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <ChatBubbleLeftRightIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <Text className="text-gray-500 mb-2">You don't have any support tickets yet.</Text>
                  <Button color="blue" icon={ChatBubbleLeftRightIcon}>Create Your First Ticket</Button>
                </div>
              )}
            </Card>
          </TabPanel>
          
          {/* Documentation Tab */}
          <TabPanel>
            <Card className="mt-6">
              <Title>Documentation</Title>
              <Text className="mb-6">Access comprehensive guides and documentation</Text>
              
              <Grid numItemsMd={2} numItemsLg={3} className="gap-6">
                <Card className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <DocumentTextIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <Text className="font-medium">Getting Started Guide</Text>
                      <Text className="text-sm text-gray-500 mt-1">Learn the basics of the partner program</Text>
                      <div className="flex items-center mt-2 text-blue-600 text-sm">
                        <ArrowTopRightOnSquareIcon className="h-4 w-4 mr-1" />
                        <span>Read Guide</span>
                      </div>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <DocumentTextIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <Text className="font-medium">Commission Structure</Text>
                      <Text className="text-sm text-gray-500 mt-1">Understand how commissions work</Text>
                      <div className="flex items-center mt-2 text-blue-600 text-sm">
                        <ArrowTopRightOnSquareIcon className="h-4 w-4 mr-1" />
                        <span>Read Guide</span>
                      </div>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <DocumentTextIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <Text className="font-medium">API Documentation</Text>
                      <Text className="text-sm text-gray-500 mt-1">Technical guides for developers</Text>
                      <div className="flex items-center mt-2 text-blue-600 text-sm">
                        <ArrowTopRightOnSquareIcon className="h-4 w-4 mr-1" />
                        <span>Read Guide</span>
                      </div>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <DocumentTextIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <Text className="font-medium">Marketing Best Practices</Text>
                      <Text className="text-sm text-gray-500 mt-1">Tips for promoting your referral links</Text>
                      <div className="flex items-center mt-2 text-blue-600 text-sm">
                        <ArrowTopRightOnSquareIcon className="h-4 w-4 mr-1" />
                        <span>Read Guide</span>
                      </div>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <DocumentTextIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <Text className="font-medium">Branding Guidelines</Text>
                      <Text className="text-sm text-gray-500 mt-1">How to use our brand assets correctly</Text>
                      <div className="flex items-center mt-2 text-blue-600 text-sm">
                        <ArrowTopRightOnSquareIcon className="h-4 w-4 mr-1" />
                        <span>Read Guide</span>
                      </div>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <DocumentTextIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <Text className="font-medium">Terms & Conditions</Text>
                      <Text className="text-sm text-gray-500 mt-1">Partner program terms and policies</Text>
                      <div className="flex items-center mt-2 text-blue-600 text-sm">
                        <ArrowTopRightOnSquareIcon className="h-4 w-4 mr-1" />
                        <span>Read Guide</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Grid>
            </Card>
          </TabPanel>
          
          {/* Video Tutorials Tab */}
          <TabPanel>
            <Card className="mt-6">
              <Title>Video Tutorials</Title>
              <Text className="mb-6">Watch step-by-step video guides</Text>
              
              <Grid numItemsMd={2} className="gap-6">
                <Card className="overflow-hidden">
                  <div className="aspect-video bg-gray-100 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="p-4 bg-blue-600 rounded-full text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <Text className="font-medium">Getting Started with the Partner Dashboard</Text>
                    <Text className="text-sm text-gray-500 mt-1">5:32 • Updated 2 weeks ago</Text>
                  </div>
                </Card>
                
                <Card className="overflow-hidden">
                  <div className="aspect-video bg-gray-100 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="p-4 bg-blue-600 rounded-full text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <Text className="font-medium">Creating and Managing Referral Links</Text>
                    <Text className="text-sm text-gray-500 mt-1">7:15 • Updated 1 month ago</Text>
                  </div>
                </Card>
                
                <Card className="overflow-hidden">
                  <div className="aspect-video bg-gray-100 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="p-4 bg-blue-600 rounded-full text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <Text className="font-medium">Understanding Commission Reports</Text>
                    <Text className="text-sm text-gray-500 mt-1">6:48 • Updated 3 weeks ago</Text>
                  </div>
                </Card>
                
                <Card className="overflow-hidden">
                  <div className="aspect-video bg-gray-100 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="p-4 bg-blue-600 rounded-full text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <Text className="font-medium">Customizing Marketing Materials</Text>
                    <Text className="text-sm text-gray-500 mt-1">8:22 • Updated 2 months ago</Text>
                  </div>
                </Card>
              </Grid>
              
              <div className="mt-6 text-center">
                <Button variant="light" icon={ArrowTopRightOnSquareIcon}>View All Tutorials</Button>
              </div>
            </Card>
          </TabPanel>
        </TabPanels>
      </TabGroup>
      
      {/* Contact Information */}
      <Card className="bg-blue-50 dark:bg-blue-900/20">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="md:w-1/3 flex justify-center">
            <div className="p-4 bg-white rounded-full shadow-md">
              <Image
                src="/support-team.svg"
                alt="Support Team"
                width={150}
                height={150}
              />
            </div>
          </div>
          <div className="md:w-2/3">
            <Title>Need More Help?</Title>
            <Text className="mt-2 mb-4">
              Our partner support team is available Monday through Friday, 9am to 6pm ET.
              We typically respond to all inquiries within 24 hours.
            </Text>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2">
                <EnvelopeIcon className="h-5 w-5 text-blue-600" />
                <Text>partners@hotelmanagement.com</Text>
              </div>
              <div className="flex items-center gap-2">
                <PhoneIcon className="h-5 w-5 text-blue-600" />
                <Text>+1 (555) 123-4567</Text>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
} 