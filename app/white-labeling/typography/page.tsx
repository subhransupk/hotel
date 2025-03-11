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
  Select,
  SelectItem,
  NumberInput,
} from '@tremor/react'
import { 
  DocumentTextIcon, 
  ArrowLeftIcon,
  CheckIcon,
  ArrowPathIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

// Custom Slider component since @tremor/react doesn't have one
const Slider = ({ 
  value, 
  onValueChange, 
  min, 
  max, 
  step 
}: { 
  value: number; 
  onValueChange: (value: number) => void; 
  min: number; 
  max: number; 
  step: number; 
}) => {
  return (
    <input
      type="range"
      value={value}
      onChange={(e) => onValueChange(parseFloat(e.target.value))}
      min={min}
      max={max}
      step={step}
      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
    />
  );
};

// Sample font families
const fontFamilies = [
  { value: 'inter', name: 'Inter', type: 'sans-serif' },
  { value: 'roboto', name: 'Roboto', type: 'sans-serif' },
  { value: 'open-sans', name: 'Open Sans', type: 'sans-serif' },
  { value: 'montserrat', name: 'Montserrat', type: 'sans-serif' },
  { value: 'lato', name: 'Lato', type: 'sans-serif' },
  { value: 'poppins', name: 'Poppins', type: 'sans-serif' },
  { value: 'playfair', name: 'Playfair Display', type: 'serif' },
  { value: 'merriweather', name: 'Merriweather', type: 'serif' },
  { value: 'lora', name: 'Lora', type: 'serif' },
  { value: 'source-code', name: 'Source Code Pro', type: 'monospace' },
  { value: 'fira-code', name: 'Fira Code', type: 'monospace' },
]

export default function TypographyPage() {
  const [primaryFont, setPrimaryFont] = useState('inter')
  const [secondaryFont, setSecondaryFont] = useState('playfair')
  const [baseSize, setBaseSize] = useState(16)
  const [headingScale, setHeadingScale] = useState(1.25)
  const [lineHeight, setLineHeight] = useState(1.5)
  const [letterSpacing, setLetterSpacing] = useState(0)
  const [fontWeight, setFontWeight] = useState('400')
  const [headingWeight, setHeadingWeight] = useState('700')

  const getPrimaryFontFamily = () => {
    const font = fontFamilies.find(f => f.value === primaryFont)
    return font ? font.name : 'Inter'
  }

  const getSecondaryFontFamily = () => {
    const font = fontFamilies.find(f => f.value === secondaryFont)
    return font ? font.name : 'Playfair Display'
  }

  const getPrimaryFontType = () => {
    const font = fontFamilies.find(f => f.value === primaryFont)
    return font ? font.type : 'sans-serif'
  }

  const getSecondaryFontType = () => {
    const font = fontFamilies.find(f => f.value === secondaryFont)
    return font ? font.type : 'serif'
  }

  const calculateHeadingSize = (level: number) => {
    return Math.round(baseSize * Math.pow(headingScale, 6 - level))
  }

  const resetToDefaults = () => {
    setPrimaryFont('inter')
    setSecondaryFont('playfair')
    setBaseSize(16)
    setHeadingScale(1.25)
    setLineHeight(1.5)
    setLetterSpacing(0)
    setFontWeight('400')
    setHeadingWeight('700')
  }

  // Fix type issues with NumberInput onValueChange
  const handleBaseSizeChange = (value: number | undefined) => {
    setBaseSize(value || 16)
  }

  const handleHeadingScaleChange = (value: number | undefined) => {
    setHeadingScale(value || 1.25)
  }

  const handleLineHeightChange = (value: number | undefined) => {
    setLineHeight(value || 1.5)
  }

  const handleLetterSpacingChange = (value: number | undefined) => {
    setLetterSpacing(value || 0)
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
            <Title>Typography</Title>
            <Text>Customize your brand fonts and text styles</Text>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="secondary" 
            icon={ArrowPathIcon}
            onClick={resetToDefaults}
          >
            Reset to Defaults
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
        {/* Font Settings */}
        <Col>
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <DocumentTextIcon className="h-5 w-5 text-blue-500" />
              <Title className="text-lg">Font Settings</Title>
            </div>
            
            <div className="space-y-6">
              {/* Primary Font */}
              <div>
                <Text className="font-medium mb-2">Primary Font</Text>
                <Text className="text-sm text-gray-500 mb-2">
                  Used for body text, paragraphs, and general content
                </Text>
                
                {/* Sans-serif fonts section */}
                <Text className="text-xs text-gray-500 uppercase font-medium mb-1">Sans-Serif</Text>
                <Select 
                  value={primaryFont} 
                  onValueChange={setPrimaryFont}
                  placeholder="Select a font family"
                  className="mb-4"
                >
                  {fontFamilies.filter(f => f.type === 'sans-serif').map((font) => (
                    <SelectItem key={font.value} value={font.value}>
                      <div className="flex items-center justify-between">
                        <span>{font.name}</span>
                        <span className="text-xs text-gray-500">{font.type}</span>
                      </div>
                    </SelectItem>
                  ))}
                </Select>
                
                {/* Serif fonts section */}
                <Text className="text-xs text-gray-500 uppercase font-medium mb-1">Serif</Text>
                <Select 
                  value={primaryFont} 
                  onValueChange={setPrimaryFont}
                  placeholder="Select a font family"
                  className="mb-4"
                >
                  {fontFamilies.filter(f => f.type === 'serif').map((font) => (
                    <SelectItem key={font.value} value={font.value}>
                      <div className="flex items-center justify-between">
                        <span>{font.name}</span>
                        <span className="text-xs text-gray-500">{font.type}</span>
                      </div>
                    </SelectItem>
                  ))}
                </Select>
                
                {/* Monospace fonts section */}
                <Text className="text-xs text-gray-500 uppercase font-medium mb-1">Monospace</Text>
                <Select 
                  value={primaryFont} 
                  onValueChange={setPrimaryFont}
                  placeholder="Select a font family"
                >
                  {fontFamilies.filter(f => f.type === 'monospace').map((font) => (
                    <SelectItem key={font.value} value={font.value}>
                      <div className="flex items-center justify-between">
                        <span>{font.name}</span>
                        <span className="text-xs text-gray-500">{font.type}</span>
                      </div>
                    </SelectItem>
                  ))}
                </Select>
              </div>
              
              {/* Secondary Font */}
              <div>
                <Text className="font-medium mb-2">Secondary Font</Text>
                <Text className="text-sm text-gray-500 mb-2">
                  Used for headings, titles, and emphasis
                </Text>
                
                {/* Sans-serif fonts section */}
                <Text className="text-xs text-gray-500 uppercase font-medium mb-1">Sans-Serif</Text>
                <Select 
                  value={secondaryFont} 
                  onValueChange={setSecondaryFont}
                  placeholder="Select a font family"
                  className="mb-4"
                >
                  {fontFamilies.filter(f => f.type === 'sans-serif').map((font) => (
                    <SelectItem key={font.value} value={font.value}>
                      <div className="flex items-center justify-between">
                        <span>{font.name}</span>
                        <span className="text-xs text-gray-500">{font.type}</span>
                      </div>
                    </SelectItem>
                  ))}
                </Select>
                
                {/* Serif fonts section */}
                <Text className="text-xs text-gray-500 uppercase font-medium mb-1">Serif</Text>
                <Select 
                  value={secondaryFont} 
                  onValueChange={setSecondaryFont}
                  placeholder="Select a font family"
                  className="mb-4"
                >
                  {fontFamilies.filter(f => f.type === 'serif').map((font) => (
                    <SelectItem key={font.value} value={font.value}>
                      <div className="flex items-center justify-between">
                        <span>{font.name}</span>
                        <span className="text-xs text-gray-500">{font.type}</span>
                      </div>
                    </SelectItem>
                  ))}
                </Select>
                
                {/* Monospace fonts section */}
                <Text className="text-xs text-gray-500 uppercase font-medium mb-1">Monospace</Text>
                <Select 
                  value={secondaryFont} 
                  onValueChange={setSecondaryFont}
                  placeholder="Select a font family"
                >
                  {fontFamilies.filter(f => f.type === 'monospace').map((font) => (
                    <SelectItem key={font.value} value={font.value}>
                      <div className="flex items-center justify-between">
                        <span>{font.name}</span>
                        <span className="text-xs text-gray-500">{font.type}</span>
                      </div>
                    </SelectItem>
                  ))}
                </Select>
              </div>
              
              <Divider />
              
              {/* Base Font Size */}
              <div>
                <Text className="font-medium mb-2">Base Font Size</Text>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Slider 
                      value={baseSize} 
                      onValueChange={(value) => setBaseSize(value)} 
                      min={12} 
                      max={20} 
                      step={1}
                    />
                  </div>
                  <div className="w-20">
                    <NumberInput 
                      value={baseSize} 
                      onValueChange={handleBaseSizeChange} 
                      min={12} 
                      max={20} 
                      step={1}
                      enableStepper={true}
                    />
                  </div>
                  <Text className="text-sm">px</Text>
                </div>
              </div>
              
              {/* Heading Scale */}
              <div>
                <Text className="font-medium mb-2">Heading Scale</Text>
                <Text className="text-sm text-gray-500 mb-2">
                  The ratio between heading sizes
                </Text>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Slider 
                      value={headingScale} 
                      onValueChange={(value) => setHeadingScale(value)} 
                      min={1.1} 
                      max={1.5} 
                      step={0.01}
                    />
                  </div>
                  <div className="w-20">
                    <NumberInput 
                      value={headingScale} 
                      onValueChange={handleHeadingScaleChange} 
                      min={1.1} 
                      max={1.5} 
                      step={0.01}
                      enableStepper={true}
                    />
                  </div>
                </div>
              </div>
              
              {/* Line Height */}
              <div>
                <Text className="font-medium mb-2">Line Height</Text>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Slider 
                      value={lineHeight} 
                      onValueChange={(value) => setLineHeight(value)} 
                      min={1} 
                      max={2} 
                      step={0.1}
                    />
                  </div>
                  <div className="w-20">
                    <NumberInput 
                      value={lineHeight} 
                      onValueChange={handleLineHeightChange} 
                      min={1} 
                      max={2} 
                      step={0.1}
                      enableStepper={true}
                    />
                  </div>
                </div>
              </div>
              
              {/* Letter Spacing */}
              <div>
                <Text className="font-medium mb-2">Letter Spacing</Text>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Slider 
                      value={letterSpacing} 
                      onValueChange={(value) => setLetterSpacing(value)} 
                      min={-1} 
                      max={2} 
                      step={0.1}
                    />
                  </div>
                  <div className="w-20">
                    <NumberInput 
                      value={letterSpacing} 
                      onValueChange={handleLetterSpacingChange} 
                      min={-1} 
                      max={2} 
                      step={0.1}
                      enableStepper={true}
                    />
                  </div>
                  <Text className="text-sm">px</Text>
                </div>
              </div>
              
              {/* Font Weights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Text className="font-medium mb-2">Body Font Weight</Text>
                  <Select 
                    value={fontWeight} 
                    onValueChange={setFontWeight}
                  >
                    <SelectItem value="300">Light (300)</SelectItem>
                    <SelectItem value="400">Regular (400)</SelectItem>
                    <SelectItem value="500">Medium (500)</SelectItem>
                    <SelectItem value="600">Semi-Bold (600)</SelectItem>
                  </Select>
                </div>
                <div>
                  <Text className="font-medium mb-2">Heading Font Weight</Text>
                  <Select 
                    value={headingWeight} 
                    onValueChange={setHeadingWeight}
                  >
                    <SelectItem value="500">Medium (500)</SelectItem>
                    <SelectItem value="600">Semi-Bold (600)</SelectItem>
                    <SelectItem value="700">Bold (700)</SelectItem>
                    <SelectItem value="800">Extra-Bold (800)</SelectItem>
                  </Select>
                </div>
              </div>
            </div>
          </Card>
        </Col>

        {/* Preview */}
        <Col>
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <InformationCircleIcon className="h-5 w-5 text-blue-500" />
              <Title className="text-lg">Typography Preview</Title>
            </div>
            
            <div className="space-y-8">
              {/* Heading Preview */}
              <div>
                <Text className="text-sm text-gray-500 mb-2">Headings</Text>
                <div 
                  className="space-y-4"
                  style={{ 
                    fontFamily: getSecondaryFontFamily() + ', ' + getSecondaryFontType(),
                    letterSpacing: letterSpacing + 'px',
                  }}
                >
                  <div>
                    <h1 
                      style={{ 
                        fontSize: calculateHeadingSize(1) + 'px',
                        lineHeight: (lineHeight * 0.9),
                        fontWeight: headingWeight,
                      }}
                    >
                      H1 Heading
                    </h1>
                    <Text className="text-xs text-gray-500 mt-1">
                      {calculateHeadingSize(1)}px / {getSecondaryFontFamily()} / Weight {headingWeight}
                    </Text>
                  </div>
                  
                  <div>
                    <h2 
                      style={{ 
                        fontSize: calculateHeadingSize(2) + 'px',
                        lineHeight: (lineHeight * 0.95),
                        fontWeight: headingWeight,
                      }}
                    >
                      H2 Heading
                    </h2>
                    <Text className="text-xs text-gray-500 mt-1">
                      {calculateHeadingSize(2)}px / {getSecondaryFontFamily()} / Weight {headingWeight}
                    </Text>
                  </div>
                  
                  <div>
                    <h3 
                      style={{ 
                        fontSize: calculateHeadingSize(3) + 'px',
                        lineHeight: lineHeight,
                        fontWeight: headingWeight,
                      }}
                    >
                      H3 Heading
                    </h3>
                    <Text className="text-xs text-gray-500 mt-1">
                      {calculateHeadingSize(3)}px / {getSecondaryFontFamily()} / Weight {headingWeight}
                    </Text>
                  </div>
                  
                  <div>
                    <h4 
                      style={{ 
                        fontSize: calculateHeadingSize(4) + 'px',
                        lineHeight: lineHeight,
                        fontWeight: headingWeight,
                      }}
                    >
                      H4 Heading
                    </h4>
                    <Text className="text-xs text-gray-500 mt-1">
                      {calculateHeadingSize(4)}px / {getSecondaryFontFamily()} / Weight {headingWeight}
                    </Text>
                  </div>
                </div>
              </div>
              
              <Divider />
              
              {/* Body Text Preview */}
              <div>
                <Text className="text-sm text-gray-500 mb-2">Body Text</Text>
                <div 
                  className="space-y-4"
                  style={{ 
                    fontFamily: getPrimaryFontFamily() + ', ' + getPrimaryFontType(),
                    fontSize: baseSize + 'px',
                    lineHeight: lineHeight,
                    letterSpacing: letterSpacing + 'px',
                    fontWeight: fontWeight,
                  }}
                >
                  <p>
                    This is a paragraph of text that demonstrates how your body copy will look with the selected font settings. 
                    Good typography improves readability and enhances the user experience of your application.
                  </p>
                  
                  <p>
                    The quick brown fox jumps over the lazy dog. 
                    <strong style={{ fontWeight: parseInt(fontWeight) + 200 }}>This text is bold for emphasis.</strong> 
                    <em>This text is italicized.</em> 
                    <a href="#" className="text-blue-500 hover:underline">This is a hyperlink.</a>
                  </p>
                  
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <span className="text-xs">Small Text:</span>
                      <span style={{ fontSize: (baseSize * 0.75) + 'px' }}>
                        This is smaller text often used for captions or footnotes.
                      </span>
                    </div>
                    
                    <div className="flex gap-2">
                      <span className="text-xs">Regular Text:</span>
                      <span>
                        This is your standard body text size.
                      </span>
                    </div>
                    
                    <div className="flex gap-2">
                      <span className="text-xs">Large Text:</span>
                      <span style={{ fontSize: (baseSize * 1.25) + 'px' }}>
                        This is larger text for emphasis.
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 text-xs text-gray-500">
                  {getPrimaryFontFamily()} / {baseSize}px / Weight {fontWeight} / Line Height {lineHeight} / Letter Spacing {letterSpacing}px
                </div>
              </div>
              
              <Divider />
              
              {/* UI Elements Preview */}
              <div>
                <Text className="text-sm text-gray-500 mb-2">UI Elements</Text>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <button 
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                      style={{ 
                        fontFamily: getPrimaryFontFamily() + ', ' + getPrimaryFontType(),
                        fontSize: baseSize + 'px',
                        fontWeight: fontWeight,
                        letterSpacing: letterSpacing + 'px',
                      }}
                    >
                      Primary Button
                    </button>
                    
                    <button 
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                      style={{ 
                        fontFamily: getPrimaryFontFamily() + ', ' + getPrimaryFontType(),
                        fontSize: baseSize + 'px',
                        fontWeight: fontWeight,
                        letterSpacing: letterSpacing + 'px',
                      }}
                    >
                      Secondary Button
                    </button>
                  </div>
                  
                  <div 
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                    style={{ 
                      fontFamily: getPrimaryFontFamily() + ', ' + getPrimaryFontType(),
                      fontSize: baseSize + 'px',
                      lineHeight: lineHeight,
                      letterSpacing: letterSpacing + 'px',
                      fontWeight: fontWeight,
                    }}
                  >
                    <div 
                      className="font-medium mb-2"
                      style={{ 
                        fontFamily: getSecondaryFontFamily() + ', ' + getSecondaryFontType(),
                        fontWeight: headingWeight,
                      }}
                    >
                      Card Title
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">
                      This is how content will appear inside cards and containers throughout your application.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="mt-6">
            <Title className="text-lg mb-4">Typography Tips</Title>
            
            <div className="space-y-4 text-sm">
              <div>
                <Text className="font-medium">Font Pairing</Text>
                <Text className="text-gray-500">
                  For best results, pair a sans-serif font for body text with a serif or distinctive sans-serif for headings.
                </Text>
              </div>
              
              <div>
                <Text className="font-medium">Readability</Text>
                <Text className="text-gray-500">
                  Maintain a base font size of at least 16px for body text to ensure readability across devices.
                </Text>
              </div>
              
              <div>
                <Text className="font-medium">Consistency</Text>
                <Text className="text-gray-500">
                  Limit your typography to 2-3 font families and use consistent sizing throughout your application.
                </Text>
              </div>
              
              <div>
                <Text className="font-medium">Accessibility</Text>
                <Text className="text-gray-500">
                  Ensure sufficient contrast between text and background colors, and maintain adequate line height for readability.
                </Text>
              </div>
            </div>
          </Card>
        </Col>
      </Grid>
    </div>
  )
} 