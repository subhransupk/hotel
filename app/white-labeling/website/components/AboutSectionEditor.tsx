'use client'

import { useState } from 'react'
import {
  Title,
  Text,
  TextInput,
  Textarea,
  Button,
  Flex,
  Grid,
  Col,
  Card,
  Divider,
  NumberInput
} from '@tremor/react'
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useAboutSection, useUIState, useFileUpload } from '../hooks'

export default function AboutSectionEditor() {
  const { aboutSection, updateAboutSection, addTeamMember, removeTeamMember, updateTeamMember } = useAboutSection()
  const { showNotification, setUploading } = useUIState()
  const { triggerFileUpload } = useFileUpload()
  
  const [editingMemberIndex, setEditingMemberIndex] = useState<number | null>(null)

  const handleImageUpload = (index: number) => {
    triggerFileUpload(
      { maxSize: 5 * 1024 * 1024, allowedTypes: ['image/jpeg', 'image/png', 'image/webp'] },
      (url) => {
        updateTeamMember(index, { ...aboutSection.team[index], image: url })
        showNotification('Team member image uploaded successfully!', 'success')
      },
      (error) => {
        showNotification(`Error uploading image: ${error}`, 'error')
      }
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <Title className="mb-2">About Section</Title>
        <Text>Edit your company's about section, mission, vision, and team members.</Text>
      </div>

      <Divider />
      
      {/* Main Content */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hero Title
          </label>
          <TextInput
            placeholder="About Our Company"
            value={aboutSection.heroTitle}
            onChange={(e) => updateAboutSection({ ...aboutSection, heroTitle: e.target.value })}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hero Subtitle
          </label>
          <TextInput
            placeholder="Leading the way in hotel management solutions"
            value={aboutSection.heroSubtitle}
            onChange={(e) => updateAboutSection({ ...aboutSection, heroSubtitle: e.target.value })}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Section Heading
          </label>
          <TextInput
            placeholder="About Our Platform"
            value={aboutSection.heading}
            onChange={(e) => updateAboutSection({ ...aboutSection, heading: e.target.value })}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Description
          </label>
          <Textarea
            placeholder="Write about your company's history, mission, and values..."
            value={aboutSection.content}
            rows={5}
            onChange={(e) => updateAboutSection({ ...aboutSection, content: e.target.value })}
          />
        </div>
      </div>
      
      <Divider />
      
      {/* Team Members */}
      <div className="space-y-4">
        <Flex justifyContent="between" alignItems="center">
          <Title className="text-lg">Team Members</Title>
          <Button 
            icon={PlusIcon} 
            variant="secondary"
            onClick={() => addTeamMember()}
          >
            Add Team Member
          </Button>
        </Flex>
        
        <Grid numItemsMd={2} numItemsLg={3} className="gap-4">
          {aboutSection.team.map((member, index) => (
            <Col key={index}>
              <Card className="p-4 h-full">
                <div className="space-y-4">
                  {member.image ? (
                    <div className="relative w-full h-48 bg-gray-100 rounded-md overflow-hidden">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover"
                      />
                      <Button
                        size="xs"
                        variant="secondary"
                        className="absolute bottom-2 right-2"
                        onClick={() => handleImageUpload(index)}
                      >
                        Change Image
                      </Button>
                    </div>
                  ) : (
                    <div 
                      className="w-full h-48 bg-gray-100 rounded-md flex items-center justify-center cursor-pointer"
                      onClick={() => handleImageUpload(index)}
                    >
                      <Text className="text-gray-500">Click to upload image</Text>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <TextInput
                      placeholder="Name"
                      value={member.name}
                      onChange={(e) => updateTeamMember(index, { ...member, name: e.target.value })}
                    />
                    
                    <TextInput
                      placeholder="Designation"
                      value={member.designation}
                      onChange={(e) => updateTeamMember(index, { ...member, designation: e.target.value })}
                    />
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Years of Experience
                      </label>
                      <NumberInput
                        placeholder="Years of Experience"
                        value={member.experience}
                        onChange={(value) => updateTeamMember(index, { ...member, experience: value })}
                        min={0}
                      />
                    </div>
                    
                    <Textarea
                      placeholder="Bio"
                      value={member.bio}
                      rows={3}
                      onChange={(e) => updateTeamMember(index, { ...member, bio: e.target.value })}
                    />
                  </div>
                  
                  <Flex justifyContent="end">
                    <Button
                      icon={TrashIcon}
                      variant="light"
                      color="red"
                      onClick={() => removeTeamMember(index)}
                    >
                      Remove
                    </Button>
                  </Flex>
                </div>
              </Card>
            </Col>
          ))}
        </Grid>
      </div>
    </div>
  )
} 