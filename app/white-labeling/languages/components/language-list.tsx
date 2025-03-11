'use client'

import { useState } from 'react'
import { 
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Badge,
  Button,
  Text,
  Switch,
  ProgressBar,
  Card,
  Title,
  Dialog,
  DialogPanel,
} from '@tremor/react'
import { 
  PencilIcon, 
  TrashIcon, 
  ArrowPathIcon,
  CheckCircleIcon,
  GlobeAltIcon,
  LanguageIcon,
  ArrowsRightLeftIcon,
  DocumentTextIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline'
import { format } from 'date-fns'
import { Language } from '../types'

// Sample data - in a real app, this would come from an API
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
  {
    id: '4',
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    isDefault: false,
    isActive: true,
    direction: 'rtl',
    completionPercentage: 45,
    lastUpdated: '2023-07-12T09:20:00Z',
  },
  {
    id: '5',
    code: 'zh',
    name: 'Chinese',
    nativeName: '中文',
    isDefault: false,
    isActive: false,
    direction: 'ltr',
    completionPercentage: 30,
    lastUpdated: '2023-06-28T11:10:00Z',
  },
]

export interface LanguageListProps {
  onEdit: (language: Language) => void;
  onTranslate: (language: Language) => void;
  filter?: (lang: Language) => boolean;
}

export function LanguageList({ onEdit, onTranslate, filter }: LanguageListProps) {
  const [languages, setLanguages] = useState<Language[]>(SAMPLE_LANGUAGES);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [languageToDelete, setLanguageToDelete] = useState<Language | null>(null);
  
  // Apply filter if provided
  const filteredLanguages = filter ? languages.filter(filter) : languages;
  
  const handleDelete = (language: Language) => {
    setLanguageToDelete(language);
    setIsDeleteModalOpen(true);
  };
  
  const confirmDelete = () => {
    if (languageToDelete) {
      setLanguages(languages.filter(lang => lang.id !== languageToDelete.id));
      setIsDeleteModalOpen(false);
      setLanguageToDelete(null);
    }
  };
  
  const handleToggleActive = (language: Language) => {
    // Cannot deactivate default language
    if (language.isDefault && language.isActive) {
      return;
    }
    
    setLanguages(languages.map(lang => 
      lang.id === language.id ? { ...lang, isActive: !lang.isActive } : lang
    ));
  };
  
  const handleSetDefault = (language: Language) => {
    // Cannot set inactive language as default
    if (!language.isActive) {
      return;
    }
    
    setLanguages(languages.map(lang => 
      lang.id === language.id 
        ? { ...lang, isDefault: true, isActive: true } 
        : { ...lang, isDefault: false }
    ));
  };
  
  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };
  
  // Determine color based on completion percentage
  const getCompletionColor = (percentage: number) => {
    if (percentage >= 80) return 'emerald';
    if (percentage >= 50) return 'amber';
    return 'rose';
  };
  
  return (
    <div>
      {filteredLanguages.length === 0 ? (
        <div className="text-center py-12">
          <LanguageIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No languages configured</h3>
          <p className="mt-1 text-sm text-gray-500">
            Add a new language to start translating your content.
          </p>
        </div>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Language</TableHeaderCell>
              <TableHeaderCell>Code</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Direction</TableHeaderCell>
              <TableHeaderCell>Completion</TableHeaderCell>
              <TableHeaderCell>Last Updated</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLanguages.map((language) => (
              <TableRow key={language.id}>
                <TableCell>
                  <div className="flex items-center">
                    <span className="font-medium">{language.name}</span>
                    <span className="ml-2 text-gray-500">({language.nativeName})</span>
                    {language.isDefault && (
                      <Badge color="blue" className="ml-2">
                        Default
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge color="gray">{language.code}</Badge>
                </TableCell>
                <TableCell>
                  {language.isActive ? (
                    <Badge color="emerald" icon={CheckCircleIcon}>
                      Active
                    </Badge>
                  ) : (
                    <Badge color="gray" icon={XCircleIcon}>
                      Inactive
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  {language.direction === 'rtl' ? (
                    <Badge color="amber" icon={ArrowsRightLeftIcon}>
                      RTL
                    </Badge>
                  ) : (
                    <Badge color="gray" icon={ArrowsRightLeftIcon}>
                      LTR
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div className="w-full max-w-xs">
                    <ProgressBar 
                      value={language.completionPercentage} 
                      color={getCompletionColor(language.completionPercentage)}
                      className="mt-1"
                    />
                    <Text className="text-xs mt-1">
                      {language.completionPercentage}% complete
                    </Text>
                  </div>
                </TableCell>
                <TableCell>
                  {formatDate(language.lastUpdated)}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="light"
                      color="blue"
                      icon={DocumentTextIcon}
                      tooltip="Translate content"
                      onClick={() => onTranslate(language)}
                    />
                    <Button
                      variant="light"
                      color="gray"
                      icon={PencilIcon}
                      tooltip="Edit language"
                      onClick={() => onEdit(language)}
                    />
                    {!language.isDefault && (
                      <Button
                        variant="light"
                        color="gray"
                        tooltip={language.isActive ? "Set as default" : "Cannot set inactive language as default"}
                        disabled={!language.isActive}
                        onClick={() => handleSetDefault(language)}
                      >
                        Default
                      </Button>
                    )}
                    <Button
                      variant="light"
                      color={language.isActive ? "red" : "emerald"}
                      tooltip={language.isActive ? "Deactivate" : "Activate"}
                      disabled={language.isDefault && language.isActive}
                      onClick={() => handleToggleActive(language)}
                    >
                      {language.isActive ? "Deactivate" : "Activate"}
                    </Button>
                    {!language.isDefault && (
                      <Button
                        variant="light"
                        color="red"
                        icon={TrashIcon}
                        tooltip="Delete language"
                        onClick={() => handleDelete(language)}
                      />
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      
      <Dialog open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <DialogPanel>
          <Title>Delete Language</Title>
          <Text className="mt-2">
            Are you sure you want to delete {languageToDelete?.name} ({languageToDelete?.code})?
            This will remove all translations for this language.
          </Text>
          <div className="mt-8 flex justify-end space-x-2">
            <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button color="red" onClick={confirmDelete}>
              Delete
            </Button>
          </div>
        </DialogPanel>
      </Dialog>
    </div>
  )
} 