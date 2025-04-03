'use client'

import { useState } from 'react'
import { 
  Card, 
  Tab, 
  TabGroup, 
  TabList, 
  TabPanel, 
  TabPanels,
  Title,
  Text,
  Button,
} from '@tremor/react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { Language, LanguageFormData } from './types'
import { LanguageList } from './components/language-list'
import { LanguageForm } from './components/language-form'
import { TranslationInterface } from './components/translation-interface'

// Sample data for initial state
const SAMPLE_LANGUAGES: Language[] = [
  {
    id: '1',
    code: 'en',
    name: 'English',
    nativeName: 'English',
    isDefault: true,
    isActive: true,
    direction: 'ltr',
    completionPercentage: 100,
    lastUpdated: '2023-10-15T14:30:00Z',
  },
  {
    id: '2',
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    isDefault: false,
    isActive: true,
    direction: 'ltr',
    completionPercentage: 85,
    lastUpdated: '2023-09-20T10:15:00Z',
  },
  {
    id: '3',
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    isDefault: false,
    isActive: true,
    direction: 'ltr',
    completionPercentage: 72,
    lastUpdated: '2023-08-05T16:45:00Z',
  },
];

export default function WhiteLabelingLanguagesPage() {
  const [languages, setLanguages] = useState<Language[]>(SAMPLE_LANGUAGES);
  const [isCreating, setIsCreating] = useState(false);
  const [editingLanguage, setEditingLanguage] = useState<Language | undefined>(undefined);
  const [activeTab, setActiveTab] = useState(0);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatingLanguage, setTranslatingLanguage] = useState<Language | undefined>(undefined);

  const handleCreateNew = () => {
    setIsCreating(true);
    setEditingLanguage(undefined);
    setIsTranslating(false);
    setTranslatingLanguage(undefined);
  };

  const handleEdit = (language: Language) => {
    setEditingLanguage(language);
    setIsCreating(false);
    setIsTranslating(false);
    setTranslatingLanguage(undefined);
  };

  const handleTranslate = (language: Language) => {
    setTranslatingLanguage(language);
    setIsTranslating(true);
    setIsCreating(false);
    setEditingLanguage(undefined);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingLanguage(undefined);
    setIsTranslating(false);
    setTranslatingLanguage(undefined);
  };

  const handleSave = (formData: LanguageFormData) => {
    if (editingLanguage) {
      // Update existing language
      setLanguages(prevLanguages => 
        prevLanguages.map(lang => 
          lang.id === editingLanguage.id 
            ? { 
                ...lang, 
                ...formData,
                // If this is being set as default, update all other languages
                ...(formData.isDefault && { isDefault: true })
              } 
            : { 
                ...lang,
                // If another language is being set as default, update all other languages to not be default
                ...(formData.isDefault && { isDefault: false })
              }
        )
      );
    } else {
      // Create new language
      const newLanguage: Language = {
        id: `lang_${Date.now()}`,
        ...formData,
        completionPercentage: 0,
        lastUpdated: new Date().toISOString(),
      };

      // If this is being set as default, update all other languages
      if (formData.isDefault) {
        setLanguages(prevLanguages => [
          ...prevLanguages.map(lang => ({ ...lang, isDefault: false })),
          newLanguage
        ]);
      } else {
        setLanguages(prevLanguages => [...prevLanguages, newLanguage]);
      }
    }

    // Reset form state
    setIsCreating(false);
    setEditingLanguage(undefined);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Language Settings</h1>
          <p className="text-gray-500">
            Manage languages and translations for your platform
          </p>
        </div>
        
        {!isCreating && !editingLanguage && !isTranslating && (
          <Button 
            icon={PlusIcon}
            onClick={handleCreateNew}
          >
            Add New Language
          </Button>
        )}
      </div>

      {isCreating || editingLanguage ? (
        <LanguageForm
          initialData={editingLanguage}
          onCancel={handleCancel}
          onSave={handleSave}
          existingLanguages={languages}
        />
      ) : isTranslating && translatingLanguage ? (
        <TranslationInterface 
          language={translatingLanguage}
          onBack={handleCancel}
        />
      ) : (
        <Card>
          <TabGroup index={activeTab} onIndexChange={setActiveTab}>
            <TabList>
              <Tab>All Languages</Tab>
              <Tab>Active</Tab>
              <Tab>Inactive</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <LanguageList 
                  onEdit={handleEdit}
                  onTranslate={handleTranslate}
                />
              </TabPanel>
              <TabPanel>
                <LanguageList 
                  onEdit={handleEdit}
                  onTranslate={handleTranslate}
                  filter={(lang: Language) => lang.isActive}
                />
              </TabPanel>
              <TabPanel>
                <LanguageList 
                  onEdit={handleEdit}
                  onTranslate={handleTranslate}
                  filter={(lang: Language) => !lang.isActive}
                />
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </Card>
      )}
    </div>
  )
} 