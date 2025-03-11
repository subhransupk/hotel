'use client'

import { useState } from 'react'
import { 
  Card, 
  Title, 
  Text, 
  Grid, 
  Col, 
  Button, 
  Flex,
  TextInput,
  Divider,
  Badge,
  Select,
  SelectItem,
} from '@tremor/react'
import { 
  SwatchIcon, 
  ArrowLeftIcon,
  CheckIcon,
  PaintBrushIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

// Sample color themes
const predefinedThemes = [
  { 
    id: 'default', 
    name: 'Default', 
    primary: '#3b82f6', 
    secondary: '#10b981', 
    accent: '#8b5cf6',
    background: '#ffffff',
    text: '#1f2937',
  },
  { 
    id: 'dark', 
    name: 'Dark Mode', 
    primary: '#60a5fa', 
    secondary: '#34d399', 
    accent: '#a78bfa',
    background: '#111827',
    text: '#f9fafb',
  },
  { 
    id: 'luxury', 
    name: 'Luxury', 
    primary: '#d4af37', 
    secondary: '#9333ea', 
    accent: '#f43f5e',
    background: '#1e293b',
    text: '#f8fafc',
  },
  { 
    id: 'ocean', 
    name: 'Ocean', 
    primary: '#0ea5e9', 
    secondary: '#14b8a6', 
    accent: '#06b6d4',
    background: '#f0f9ff',
    text: '#0f172a',
  },
  { 
    id: 'forest', 
    name: 'Forest', 
    primary: '#16a34a', 
    secondary: '#65a30d', 
    accent: '#84cc16',
    background: '#f0fdf4',
    text: '#14532d',
  },
]

export default function ColorsPage() {
  const [activeTheme, setActiveTheme] = useState(predefinedThemes[0])
  const [customTheme, setCustomTheme] = useState({
    primary: activeTheme.primary,
    secondary: activeTheme.secondary,
    accent: activeTheme.accent,
    background: activeTheme.background,
    text: activeTheme.text,
  })
  const [themeMode, setThemeMode] = useState('predefined')

  const handleThemeSelect = (themeId: string) => {
    const theme = predefinedThemes.find(t => t.id === themeId)
    if (theme) {
      setActiveTheme(theme)
      setCustomTheme({
        primary: theme.primary,
        secondary: theme.secondary,
        accent: theme.accent,
        background: theme.background,
        text: theme.text,
      })
    }
  }

  const handleColorChange = (key: string, value: string) => {
    setCustomTheme(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const resetToActiveTheme = () => {
    setCustomTheme({
      primary: activeTheme.primary,
      secondary: activeTheme.secondary,
      accent: activeTheme.accent,
      background: activeTheme.background,
      text: activeTheme.text,
    })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Link href="/white-labeling" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
            <ArrowLeftIcon className="h-5 w-5" />
          </Link>
          <div>
            <Title>Colors & Themes</Title>
            <Text>Customize your brand colors and theme</Text>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="secondary" 
            icon={ArrowPathIcon}
            onClick={resetToActiveTheme}
          >
            Reset Changes
          </Button>
          <Button 
            icon={CheckIcon} 
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Save Changes
          </Button>
        </div>
      </div>

      <Grid numItemsMd={2} className="gap-6">
        {/* Theme Selection */}
        <Col>
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <SwatchIcon className="h-5 w-5 text-blue-500" />
              <Title className="text-lg">Theme Selection</Title>
            </div>
            
            <div className="space-y-4">
              <div>
                <Text>Choose a theme mode</Text>
                <div className="flex gap-2 mt-2">
                  <Button 
                    variant={themeMode === 'predefined' ? 'primary' : 'secondary'}
                    onClick={() => setThemeMode('predefined')}
                    size="xs"
                  >
                    Predefined Themes
                  </Button>
                  <Button 
                    variant={themeMode === 'custom' ? 'primary' : 'secondary'}
                    onClick={() => setThemeMode('custom')}
                    size="xs"
                  >
                    Custom Colors
                  </Button>
                </div>
              </div>

              {themeMode === 'predefined' && (
                <div>
                  <Text>Select a predefined theme</Text>
                  <div className="grid grid-cols-1 gap-3 mt-3">
                    {predefinedThemes.map((theme) => (
                      <div 
                        key={theme.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          activeTheme.id === theme.id 
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                            : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
                        }`}
                        onClick={() => handleThemeSelect(theme.id)}
                      >
                        <div className="flex justify-between items-center">
                          <Text className="font-medium">{theme.name}</Text>
                          {activeTheme.id === theme.id && (
                            <Badge color="blue" icon={CheckIcon}>
                              Active
                            </Badge>
                          )}
                        </div>
                        <div className="flex gap-2 mt-2">
                          <div 
                            className="h-6 w-6 rounded-full border border-gray-200 dark:border-gray-700" 
                            style={{ backgroundColor: theme.primary }}
                          />
                          <div 
                            className="h-6 w-6 rounded-full border border-gray-200 dark:border-gray-700" 
                            style={{ backgroundColor: theme.secondary }}
                          />
                          <div 
                            className="h-6 w-6 rounded-full border border-gray-200 dark:border-gray-700" 
                            style={{ backgroundColor: theme.accent }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {themeMode === 'custom' && (
                <div className="space-y-4">
                  <div>
                    <Text>Primary Color</Text>
                    <div className="flex gap-2 mt-2 items-center">
                      <div 
                        className="h-8 w-8 rounded-lg border border-gray-200 dark:border-gray-700" 
                        style={{ backgroundColor: customTheme.primary }}
                      />
                      <TextInput 
                        value={customTheme.primary} 
                        onChange={(e) => handleColorChange('primary', e.target.value)}
                        placeholder="#3b82f6"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Text>Secondary Color</Text>
                    <div className="flex gap-2 mt-2 items-center">
                      <div 
                        className="h-8 w-8 rounded-lg border border-gray-200 dark:border-gray-700" 
                        style={{ backgroundColor: customTheme.secondary }}
                      />
                      <TextInput 
                        value={customTheme.secondary} 
                        onChange={(e) => handleColorChange('secondary', e.target.value)}
                        placeholder="#10b981"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Text>Accent Color</Text>
                    <div className="flex gap-2 mt-2 items-center">
                      <div 
                        className="h-8 w-8 rounded-lg border border-gray-200 dark:border-gray-700" 
                        style={{ backgroundColor: customTheme.accent }}
                      />
                      <TextInput 
                        value={customTheme.accent} 
                        onChange={(e) => handleColorChange('accent', e.target.value)}
                        placeholder="#8b5cf6"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Text>Background Color</Text>
                    <div className="flex gap-2 mt-2 items-center">
                      <div 
                        className="h-8 w-8 rounded-lg border border-gray-200 dark:border-gray-700" 
                        style={{ backgroundColor: customTheme.background }}
                      />
                      <TextInput 
                        value={customTheme.background} 
                        onChange={(e) => handleColorChange('background', e.target.value)}
                        placeholder="#ffffff"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Text>Text Color</Text>
                    <div className="flex gap-2 mt-2 items-center">
                      <div 
                        className="h-8 w-8 rounded-lg border border-gray-200 dark:border-gray-700" 
                        style={{ backgroundColor: customTheme.text }}
                      />
                      <TextInput 
                        value={customTheme.text} 
                        onChange={(e) => handleColorChange('text', e.target.value)}
                        placeholder="#1f2937"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </Col>

        {/* Preview */}
        <Col>
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <PaintBrushIcon className="h-5 w-5 text-blue-500" />
              <Title className="text-lg">Live Preview</Title>
            </div>
            
            <div 
              className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
              style={{ 
                backgroundColor: themeMode === 'custom' ? customTheme.background : activeTheme.background,
                color: themeMode === 'custom' ? customTheme.text : activeTheme.text
              }}
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Sample Header</h3>
                  <p>This is how your text will appear with the selected theme.</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <button 
                    className="px-4 py-2 rounded-lg text-white transition-colors"
                    style={{ 
                      backgroundColor: themeMode === 'custom' ? customTheme.primary : activeTheme.primary 
                    }}
                  >
                    Primary Button
                  </button>
                  
                  <button 
                    className="px-4 py-2 rounded-lg text-white transition-colors"
                    style={{ 
                      backgroundColor: themeMode === 'custom' ? customTheme.secondary : activeTheme.secondary 
                    }}
                  >
                    Secondary Button
                  </button>
                  
                  <button 
                    className="px-4 py-2 rounded-lg text-white transition-colors"
                    style={{ 
                      backgroundColor: themeMode === 'custom' ? customTheme.accent : activeTheme.accent 
                    }}
                  >
                    Accent Button
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <span 
                    className="px-2 py-1 rounded-md text-white text-xs font-medium"
                    style={{ 
                      backgroundColor: themeMode === 'custom' ? customTheme.primary : activeTheme.primary 
                    }}
                  >
                    Primary Tag
                  </span>
                  
                  <span 
                    className="px-2 py-1 rounded-md text-white text-xs font-medium"
                    style={{ 
                      backgroundColor: themeMode === 'custom' ? customTheme.secondary : activeTheme.secondary 
                    }}
                  >
                    Secondary Tag
                  </span>
                  
                  <span 
                    className="px-2 py-1 rounded-md text-white text-xs font-medium"
                    style={{ 
                      backgroundColor: themeMode === 'custom' ? customTheme.accent : activeTheme.accent 
                    }}
                  >
                    Accent Tag
                  </span>
                </div>
                
                <div>
                  <div 
                    className="h-2 w-full rounded-full mb-2"
                    style={{ 
                      backgroundColor: themeMode === 'custom' 
                        ? `${customTheme.primary}40` 
                        : `${activeTheme.primary}40` 
                    }}
                  >
                    <div 
                      className="h-2 rounded-full w-3/4"
                      style={{ 
                        backgroundColor: themeMode === 'custom' ? customTheme.primary : activeTheme.primary 
                      }}
                    />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Progress Bar</span>
                    <span className="text-sm">75%</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="mt-6">
            <Title className="text-lg mb-4">Color Accessibility</Title>
            
            <div className="space-y-4">
              <div>
                <Text className="font-medium">Contrast Ratio</Text>
                <div className="flex items-center mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div 
                      className="bg-green-500 h-2.5 rounded-full" 
                      style={{ width: '85%' }}
                    />
                  </div>
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Good</span>
                </div>
                <Text className="text-xs text-gray-500 mt-1">
                  Your text and background colors have good contrast for readability.
                </Text>
              </div>
              
              <div>
                <Text className="font-medium">WCAG Compliance</Text>
                <div className="flex gap-2 mt-2">
                  <Badge color="green" icon={CheckIcon}>AA Compliant</Badge>
                  <Badge color="green" icon={CheckIcon}>AAA Compliant</Badge>
                </div>
              </div>
              
              <Text className="text-sm">
                Your color scheme meets accessibility standards. Users with visual impairments 
                should be able to read and interact with your interface comfortably.
              </Text>
            </div>
          </Card>
        </Col>
      </Grid>
    </div>
  )
} 