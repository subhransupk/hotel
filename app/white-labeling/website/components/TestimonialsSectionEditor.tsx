'use client'

import {
  Title,
  Text,
  TextInput,
  Textarea,
  Button,
  Flex,
  Card,
  Divider,
  Grid,
  Col
} from '@tremor/react'
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useTestimonialsSection, useUIState, useFileUpload } from '../hooks'

export default function TestimonialsSectionEditor() {
  const { 
    testimonialsSection, 
    updateTestimonialsSection, 
    addTestimonial, 
    removeTestimonial, 
    updateTestimonial 
  } = useTestimonialsSection()
  
  const { showNotification } = useUIState()
  const { triggerFileUpload } = useFileUpload()

  const handleImageUpload = (index: number) => {
    triggerFileUpload(
      { maxSize: 2 * 1024 * 1024, allowedTypes: ['image/jpeg', 'image/png', 'image/webp'] },
      (url) => {
        updateTestimonial(index, { ...testimonialsSection.testimonials[index], avatar: url })
        showNotification('Testimonial avatar uploaded successfully!', 'success')
      },
      (error) => {
        showNotification(`Error uploading image: ${error}`, 'error')
      }
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <Title className="mb-2">Testimonials Section</Title>
        <Text>Edit customer testimonials and reviews to showcase on your website.</Text>
      </div>

      <Divider />
      
      {/* Main Content */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Section Heading
          </label>
          <TextInput
            placeholder="What Our Customers Say"
            value={testimonialsSection.heading}
            onChange={(e) => updateTestimonialsSection({ ...testimonialsSection, heading: e.target.value })}
          />
        </div>
      </div>
      
      <Divider />
      
      {/* Testimonials */}
      <div className="space-y-4">
        <Flex justifyContent="between" alignItems="center">
          <Title className="text-lg">Testimonials</Title>
          <Button 
            icon={PlusIcon} 
            variant="secondary"
            onClick={() => addTestimonial()}
          >
            Add Testimonial
          </Button>
        </Flex>
        
        <Grid numItemsMd={2} className="gap-4">
          {testimonialsSection.testimonials.map((testimonial, index) => (
            <Col key={index}>
              <Card className="p-4 h-full">
                <div className="space-y-4">
                  <Flex>
                    {testimonial.avatar ? (
                      <div className="relative w-16 h-16 bg-gray-100 rounded-full overflow-hidden">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.author} 
                          className="w-full h-full object-cover"
                        />
                        <Button
                          size="xs"
                          variant="secondary"
                          className="absolute bottom-0 right-0 w-full bg-black bg-opacity-50 text-white rounded-none"
                          onClick={() => handleImageUpload(index)}
                        >
                          Change
                        </Button>
                      </div>
                    ) : (
                      <div 
                        className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer"
                        onClick={() => handleImageUpload(index)}
                      >
                        <Text className="text-gray-500 text-xs">Add Photo</Text>
                      </div>
                    )}
                    
                    <div className="ml-4 flex-1">
                      <TextInput
                        placeholder="Author Name"
                        value={testimonial.author}
                        onChange={(e) => updateTestimonial(index, { ...testimonial, author: e.target.value })}
                      />
                      
                      <div className="flex gap-2 mt-2">
                        <TextInput
                          placeholder="Position"
                          value={testimonial.position}
                          onChange={(e) => updateTestimonial(index, { ...testimonial, position: e.target.value })}
                          className="flex-1"
                        />
                        
                        <TextInput
                          placeholder="Company"
                          value={testimonial.company}
                          onChange={(e) => updateTestimonial(index, { ...testimonial, company: e.target.value })}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </Flex>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Testimonial Quote
                    </label>
                    <Textarea
                      placeholder="What the customer said about your product or service..."
                      value={testimonial.quote}
                      rows={4}
                      onChange={(e) => updateTestimonial(index, { ...testimonial, quote: e.target.value })}
                    />
                  </div>
                  
                  <Flex justifyContent="end">
                    <Button
                      icon={TrashIcon}
                      variant="light"
                      color="red"
                      onClick={() => removeTestimonial(index)}
                    >
                      Remove
                    </Button>
                  </Flex>
                </div>
              </Card>
            </Col>
          ))}
        </Grid>
        
        {testimonialsSection.testimonials.length === 0 && (
          <Card className="p-6 text-center">
            <Text className="text-gray-500">No testimonials added yet. Click "Add Testimonial" to get started.</Text>
          </Card>
        )}
      </div>
    </div>
  )
} 