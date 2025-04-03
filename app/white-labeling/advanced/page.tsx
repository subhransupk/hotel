'use client'

import { useState } from 'react'
import { 
  Card, 
  Title, 
  Text, 
  Button, 
  Tab, 
  TabGroup, 
  TabList, 
  TabPanel, 
  TabPanels,
  Flex,
  Badge,
  Dialog,
  DialogPanel,
} from '@tremor/react'
import { 
  Cog6ToothIcon, 
  ArrowLeftIcon,
  ShieldExclamationIcon,
  BoltIcon,
  PaintBrushIcon,
  LinkIcon,
  BeakerIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  PlusIcon,
  CodeBracketIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { SettingsList } from './components/settings-list'
import { SettingForm } from './components/setting-form'
import { BulkSettingsEditor } from './components/bulk-settings-editor'
import { AdvancedSetting, AdvancedSettingFormData, SettingCategory } from './types'

// Sample data for demonstration
import { SAMPLE_SETTINGS } from './data/sample-settings'

export default function WhiteLabelingAdvancedPage() {
  const [settings, setSettings] = useState<AdvancedSetting[]>(SAMPLE_SETTINGS)
  const [activeTab, setActiveTab] = useState<number>(0)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [editingSetting, setEditingSetting] = useState<AdvancedSetting | null>(null)
  const [isBulkEditing, setIsBulkEditing] = useState(false)
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)
  const [importFile, setImportFile] = useState<File | null>(null)
  const [isImporting, setIsImporting] = useState(false)
  
  const categories: SettingCategory[] = [
    'security',
    'performance',
    'customization',
    'integration',
    'experimental'
  ]
  
  const getCategoryIcon = (category: SettingCategory) => {
    switch (category) {
      case 'security':
        return ShieldExclamationIcon
      case 'performance':
        return BoltIcon
      case 'customization':
        return PaintBrushIcon
      case 'integration':
        return LinkIcon
      case 'experimental':
        return BeakerIcon
      default:
        return Cog6ToothIcon
    }
  }
  
  const getCategoryColor = (category: SettingCategory): 'slate' | 'blue' | 'amber' | 'emerald' | 'rose' => {
    switch (category) {
      case 'security':
        return 'rose'
      case 'performance':
        return 'amber'
      case 'customization':
        return 'blue'
      case 'integration':
        return 'emerald'
      case 'experimental':
        return 'slate'
      default:
        return 'slate'
    }
  }
  
  const getCategoryLabel = (category: SettingCategory): string => {
    return category.charAt(0).toUpperCase() + category.slice(1)
  }
  
  const handleSaveSetting = (formData: AdvancedSettingFormData) => {
    if (editingSetting) {
      // Update existing setting
      setSettings(prev => 
        prev.map(setting => 
          setting.id === editingSetting.id 
            ? { 
                ...setting, 
                ...formData,
                lastUpdated: new Date().toISOString() 
              } 
            : setting
        )
      )
      setEditingSetting(null)
    } else {
      // Add new setting
      const newSetting: AdvancedSetting = {
        id: `setting_${Date.now()}`,
        ...formData,
        lastUpdated: new Date().toISOString()
      }
      setSettings(prev => [...prev, newSetting])
      setIsAddingNew(false)
      
      // Switch to the tab of the new setting's category
      const categoryIndex = categories.findIndex(cat => cat === formData.category)
      if (categoryIndex !== -1) {
        setActiveTab(categoryIndex)
      }
    }
  }
  
  const handleEditSetting = (setting: AdvancedSetting) => {
    setEditingSetting(setting)
    setIsAddingNew(false)
    setIsBulkEditing(false)
  }
  
  const handleDeleteSetting = (settingId: string) => {
    setSettings(prev => prev.filter(setting => setting.id !== settingId))
  }
  
  const handleBulkSave = (updatedSettings: AdvancedSetting[]) => {
    setSettings(updatedSettings)
    setIsBulkEditing(false)
  }
  
  const handleExportSettings = () => {
    const exportData = {
      settings,
      exportedAt: new Date().toISOString(),
      version: '1.0.0'
    }
    
    const dataStr = JSON.stringify(exportData, null, 2)
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`
    
    const exportFileDefaultName = `settings-export-${new Date().toISOString().slice(0, 10)}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
    
    setIsExportModalOpen(false)
  }
  
  const handleImportSettings = () => {
    if (!importFile) return
    
    setIsImporting(true)
    
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const importData = JSON.parse(e.target?.result as string)
        
        if (Array.isArray(importData.settings)) {
          // Validate imported settings
          const validSettings = importData.settings.filter((setting: any) => 
            setting.id && 
            setting.key && 
            setting.name && 
            setting.description && 
            setting.value !== undefined && 
            setting.defaultValue !== undefined && 
            setting.type && 
            setting.category
          )
          
          setSettings(validSettings)
          setIsImportModalOpen(false)
          setImportFile(null)
        } else {
          alert('Invalid import file format')
        }
      } catch (error) {
        alert('Failed to parse import file')
      }
      
      setIsImporting(false)
    }
    
    reader.readAsText(importFile)
  }
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImportFile(e.target.files[0])
    }
  }
  
  // Filter settings by the active category
  const filteredSettings = settings.filter(
    setting => setting.category === categories[activeTab]
  )
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link href="/white-labeling" className="text-gray-500 hover:text-gray-700">
            <ArrowLeftIcon className="h-5 w-5" />
          </Link>
          <div>
            <Title>Advanced Settings</Title>
            <Text>Configure system-wide settings and parameters</Text>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant="light"
            icon={ArrowDownTrayIcon}
            onClick={() => setIsExportModalOpen(true)}
          >
            Export
          </Button>
          <Button
            variant="light"
            icon={ArrowUpTrayIcon}
            onClick={() => setIsImportModalOpen(true)}
          >
            Import
          </Button>
          <Button
            variant="light"
            icon={CodeBracketIcon}
            onClick={() => {
              setIsBulkEditing(true)
              setIsAddingNew(false)
              setEditingSetting(null)
            }}
          >
            Bulk Edit
          </Button>
          <Button
            variant="primary"
            icon={PlusIcon}
            onClick={() => {
              setIsAddingNew(true)
              setEditingSetting(null)
              setIsBulkEditing(false)
            }}
          >
            Add Setting
          </Button>
        </div>
      </div>
      
      <Card className="p-4 bg-amber-50 border-amber-200">
        <Flex alignItems="center">
          <ShieldExclamationIcon className="h-5 w-5 text-amber-500 mr-2" />
          <Text className="text-amber-800">
            <span className="font-medium">Advanced Settings Warning:</span> These settings are intended for advanced users. 
            Incorrect configuration may affect system performance and stability.
          </Text>
        </Flex>
      </Card>
      
      {isAddingNew ? (
        <SettingForm 
          onSave={handleSaveSetting}
          onCancel={() => setIsAddingNew(false)}
        />
      ) : editingSetting ? (
        <SettingForm 
          setting={editingSetting}
          onSave={handleSaveSetting}
          onCancel={() => setEditingSetting(null)}
        />
      ) : isBulkEditing ? (
        <BulkSettingsEditor
          settings={settings}
          onSave={handleBulkSave}
          onCancel={() => setIsBulkEditing(false)}
        />
      ) : (
        <Card>
          <TabGroup index={activeTab} onIndexChange={setActiveTab}>
            <TabList>
              <Tab icon={ShieldExclamationIcon}>Security</Tab>
              <Tab icon={BoltIcon}>Performance</Tab>
              <Tab icon={PaintBrushIcon}>Customization</Tab>
              <Tab icon={LinkIcon}>Integration</Tab>
              <Tab icon={BeakerIcon}>Experimental</Tab>
            </TabList>
            <TabPanels>
              {categories.map((category, index) => (
                <TabPanel key={index}>
                  <SettingsList
                    settings={filteredSettings}
                    onEdit={handleEditSetting}
                    onDelete={handleDeleteSetting}
                  />
                </TabPanel>
              ))}
            </TabPanels>
          </TabGroup>
        </Card>
      )}
      
      {/* Export Modal */}
      <Dialog open={isExportModalOpen} onClose={() => setIsExportModalOpen(false)}>
        <DialogPanel>
          <div className="p-6">
            <Title>Export Settings</Title>
            <Text className="mt-2 mb-4">
              This will export all your current settings as a JSON file. You can use this file to backup your settings or transfer them to another environment.
            </Text>
            
            <div className="mt-6 flex justify-end space-x-3">
              <Button
                variant="secondary"
                onClick={() => setIsExportModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                icon={ArrowDownTrayIcon}
                onClick={handleExportSettings}
              >
                Export Settings
              </Button>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
      
      {/* Import Modal */}
      <Dialog open={isImportModalOpen} onClose={() => setIsImportModalOpen(false)}>
        <DialogPanel>
          <div className="p-6">
            <Title>Import Settings</Title>
            <Text className="mt-2 mb-4">
              Upload a settings JSON file to import. This will replace all your current settings.
            </Text>
            
            <div className="mt-4 mb-6">
              <label className="block mb-2">
                <Text className="font-medium">Select Settings File</Text>
              </label>
              <input
                type="file"
                accept=".json"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
            </div>
            
            <div className="p-3 bg-amber-50 rounded-md mb-4">
              <Flex alignItems="center">
                <ShieldExclamationIcon className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
                <Text className="text-sm text-amber-700">
                  Warning: Importing settings will overwrite all your current settings. This action cannot be undone.
                </Text>
              </Flex>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <Button
                variant="secondary"
                onClick={() => {
                  setIsImportModalOpen(false)
                  setImportFile(null)
                }}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                icon={ArrowUpTrayIcon}
                onClick={handleImportSettings}
                disabled={!importFile || isImporting}
                loading={isImporting}
              >
                Import Settings
              </Button>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </div>
  )
} 