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
  Col,
  Switch
} from '@tremor/react'
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { usePricingSection, useUIState } from '../hooks'

export default function PricingSectionEditor() {
  const { 
    pricingSection, 
    updatePricingSection, 
    addPlan, 
    removePlan, 
    updatePlan,
    addFeatureToPlan,
    removePlanFeature,
    updatePlanFeature
  } = usePricingSection()
  
  const { showNotification } = useUIState()

  return (
    <div className="space-y-6">
      <div>
        <Title className="mb-2">Pricing Section</Title>
        <Text>Edit your pricing plans and features.</Text>
      </div>

      <Divider />
      
      {/* Main Content */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Section Heading
          </label>
          <TextInput
            placeholder="Pricing Plans"
            value={pricingSection.heading}
            onChange={(e) => updatePricingSection({ heading: e.target.value })}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Section Subheading
          </label>
          <Textarea
            placeholder="Choose the perfect plan for your needs"
            value={pricingSection.subheading}
            rows={3}
            onChange={(e) => updatePricingSection({ subheading: e.target.value })}
          />
        </div>
      </div>
      
      <Divider />
      
      {/* Pricing Plans */}
      <div className="space-y-4">
        <Flex justifyContent="between" alignItems="center">
          <Title className="text-lg">Pricing Plans</Title>
          <Button 
            icon={PlusIcon} 
            variant="secondary"
            onClick={() => addPlan()}
          >
            Add Plan
          </Button>
        </Flex>
        
        <Grid numItemsMd={3} className="gap-4">
          {pricingSection.plans.map((plan, planIndex) => (
            <Col key={planIndex}>
              <Card className={`p-4 h-full ${plan.popular ? 'border-2 border-blue-500' : ''}`}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <TextInput
                      placeholder="Plan Name"
                      value={plan.name}
                      onChange={(e) => updatePlan(planIndex, { name: e.target.value })}
                    />
                    
                    <div className="flex items-center gap-2">
                      <TextInput
                        placeholder="Price"
                        value={plan.price}
                        onChange={(e) => updatePlan(planIndex, { price: e.target.value })}
                        className="flex-1"
                      />
                      
                      <TextInput
                        placeholder="Period"
                        value={plan.period}
                        onChange={(e) => updatePlan(planIndex, { period: e.target.value })}
                        className="flex-1"
                      />
                    </div>
                    
                    <TextInput
                      placeholder="Call to Action"
                      value={plan.cta}
                      onChange={(e) => updatePlan(planIndex, { cta: e.target.value })}
                    />
                    
                    <div className="flex items-center gap-2">
                      <Switch
                        id={`popular-${planIndex}`}
                        checked={plan.popular}
                        onChange={() => updatePlan(planIndex, { popular: !plan.popular })}
                      />
                      <label htmlFor={`popular-${planIndex}`} className="text-sm">
                        Mark as Popular
                      </label>
                    </div>
                  </div>
                  
                  <Divider />
                  
                  <div className="space-y-2">
                    <Flex justifyContent="between" alignItems="center">
                      <Text className="font-medium">Features</Text>
                      <Button
                        size="xs"
                        variant="light"
                        icon={PlusIcon}
                        onClick={() => addFeatureToPlan(planIndex)}
                      >
                        Add
                      </Button>
                    </Flex>
                    
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <TextInput
                          placeholder="Feature description"
                          value={feature}
                          onChange={(e) => updatePlanFeature(planIndex, featureIndex, e.target.value)}
                          className="flex-1"
                        />
                        
                        <Button
                          size="xs"
                          variant="light"
                          color="red"
                          icon={TrashIcon}
                          onClick={() => removePlanFeature(planIndex, featureIndex)}
                        />
                      </div>
                    ))}
                    
                    {plan.features.length === 0 && (
                      <Text className="text-gray-500 text-sm italic">
                        No features added yet
                      </Text>
                    )}
                  </div>
                  
                  <Flex justifyContent="end">
                    <Button
                      icon={TrashIcon}
                      variant="light"
                      color="red"
                      onClick={() => removePlan(planIndex)}
                    >
                      Remove Plan
                    </Button>
                  </Flex>
                </div>
              </Card>
            </Col>
          ))}
        </Grid>
        
        {pricingSection.plans.length === 0 && (
          <Card className="p-6 text-center">
            <Text className="text-gray-500">No pricing plans added yet. Click "Add Plan" to get started.</Text>
          </Card>
        )}
      </div>
    </div>
  )
} 