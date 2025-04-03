'use client'

import { useState } from 'react'
import { 
  Card, 
  Title, 
  Text, 
  Button, 
  TextInput,
  Textarea,
  Grid,
  Col,
  Badge,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  ProgressBar,
  Select,
  SelectItem,
  Flex,
} from '@tremor/react'
import { 
  ArrowLeftIcon, 
  MagnifyingGlassIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
  DocumentTextIcon,
  FolderIcon,
  Cog6ToothIcon,
  ShoppingBagIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  HomeIcon,
  PencilIcon,
} from '@heroicons/react/24/outline'
import { Language, TranslationCategory } from '../types'

// Sample translation categories
const SAMPLE_CATEGORIES: TranslationCategory[] = [
  {
    id: '1',
    name: 'General UI',
    description: 'Common UI elements and messages',
    count: 120,
    completionPercentage: 85,
  },
  {
    id: '2',
    name: 'Navigation',
    description: 'Menu items and navigation elements',
    count: 45,
    completionPercentage: 100,
  },
  {
    id: '3',
    name: 'Emails',
    description: 'Email templates and notifications',
    count: 32,
    completionPercentage: 65,
  },
  {
    id: '4',
    name: 'Error Messages',
    description: 'System errors and validation messages',
    count: 78,
    completionPercentage: 90,
  },
  {
    id: '5',
    name: 'Product Pages',
    description: 'Product descriptions and details',
    count: 210,
    completionPercentage: 40,
  },
  {
    id: '6',
    name: 'Checkout',
    description: 'Checkout process and payment',
    count: 65,
    completionPercentage: 75,
  },
];

// Sample translations for a category
const SAMPLE_TRANSLATIONS = [
  {
    id: '1',
    key: 'common.welcome',
    defaultText: 'Welcome to our platform',
    translatedText: '',
    context: 'Displayed on the homepage header',
    lastUpdated: null,
  },
  {
    id: '2',
    key: 'common.login',
    defaultText: 'Log in',
    translatedText: 'Iniciar sesión',
    context: 'Button text for login',
    lastUpdated: '2023-09-15T10:30:00Z',
  },
  {
    id: '3',
    key: 'common.signup',
    defaultText: 'Sign up',
    translatedText: 'Registrarse',
    context: 'Button text for registration',
    lastUpdated: '2023-09-15T10:35:00Z',
  },
  {
    id: '4',
    key: 'common.search',
    defaultText: 'Search',
    translatedText: 'Buscar',
    context: 'Search input placeholder',
    lastUpdated: '2023-09-15T11:00:00Z',
  },
  {
    id: '5',
    key: 'common.loading',
    defaultText: 'Loading...',
    translatedText: 'Cargando...',
    context: 'Displayed during data loading',
    lastUpdated: '2023-09-15T11:15:00Z',
  },
  {
    id: '6',
    key: 'common.error',
    defaultText: 'An error occurred. Please try again.',
    translatedText: '',
    context: 'Generic error message',
    lastUpdated: null,
  },
  {
    id: '7',
    key: 'common.save',
    defaultText: 'Save',
    translatedText: 'Guardar',
    context: 'Button text for saving',
    lastUpdated: '2023-09-15T11:30:00Z',
  },
  {
    id: '8',
    key: 'common.cancel',
    defaultText: 'Cancel',
    translatedText: 'Cancelar',
    context: 'Button text for canceling',
    lastUpdated: '2023-09-15T11:35:00Z',
  },
];

// Icons for categories
const CATEGORY_ICONS: Record<string, React.ElementType> = {
  'General UI': Cog6ToothIcon,
  'Navigation': FolderIcon,
  'Emails': EnvelopeIcon,
  'Error Messages': XCircleIcon,
  'Product Pages': ShoppingBagIcon,
  'Checkout': ShoppingBagIcon,
  'Dashboard': HomeIcon,
  'Chat': ChatBubbleLeftRightIcon,
};

interface TranslationInterfaceProps {
  language: Language;
  onBack: () => void;
}

export function TranslationInterface({ language, onBack }: TranslationInterfaceProps) {
  const [categories, setCategories] = useState<TranslationCategory[]>(SAMPLE_CATEGORIES);
  const [translations, setTranslations] = useState(SAMPLE_TRANSLATIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TranslationCategory | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [editingTranslation, setEditingTranslation] = useState<string | null>(null);
  const [translationText, setTranslationText] = useState<Record<string, string>>({});
  
  // Handle selecting a category
  const handleSelectCategory = (category: TranslationCategory) => {
    setSelectedCategory(category);
    // In a real app, this would fetch translations for the selected category
  };
  
  // Handle back button from category view
  const handleBackFromCategory = () => {
    setSelectedCategory(null);
  };
  
  // Handle saving a translation
  const handleSaveTranslation = (translationId: string) => {
    if (!translationText[translationId]) return;
    
    setTranslations(prevTranslations => 
      prevTranslations.map(translation => 
        translation.id === translationId 
          ? { 
              ...translation, 
              translatedText: translationText[translationId],
              lastUpdated: new Date().toISOString(),
            } 
          : translation
      )
    );
    
    setEditingTranslation(null);
    
    // Update completion percentage for the category
    if (selectedCategory) {
      const translatedCount = translations.filter(t => t.translatedText).length;
      const newPercentage = Math.round((translatedCount / translations.length) * 100);
      
      setCategories(prevCategories => 
        prevCategories.map(category => 
          category.id === selectedCategory.id 
            ? { ...category, completionPercentage: newPercentage } 
            : category
        )
      );
    }
  };
  
  // Handle editing a translation
  const handleEditTranslation = (translationId: string, currentText: string) => {
    setEditingTranslation(translationId);
    setTranslationText({
      ...translationText,
      [translationId]: currentText,
    });
  };
  
  // Handle canceling an edit
  const handleCancelEdit = () => {
    setEditingTranslation(null);
  };
  
  // Filter translations based on search query
  const filteredTranslations = translations.filter(translation => 
    translation.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
    translation.defaultText.toLowerCase().includes(searchQuery.toLowerCase()) ||
    translation.translatedText.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Format date to readable format
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };
  
  // Calculate overall completion percentage
  const overallCompletion = categories.length > 0
    ? Math.round(
        categories.reduce((sum, category) => sum + category.completionPercentage, 0) / categories.length
      )
    : 0;
  
  // Get color based on completion percentage
  const getCompletionColor = (percentage: number) => {
    if (percentage >= 80) return 'emerald';
    if (percentage >= 50) return 'amber';
    return 'rose';
  };
  
  // Render category list view
  const renderCategoryList = () => (
    <>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <Title>Translations for {language.name}</Title>
            <Text>
              Manage translations for {language.nativeName} ({language.completionPercentage}% complete)
            </Text>
          </div>
          <div className="flex items-center space-x-2">
            <Badge color={getCompletionColor(overallCompletion)} size="xl">
              {overallCompletion}% Complete
            </Badge>
            <Button
              variant="light"
              icon={ArrowPathIcon}
              tooltip="Refresh translations"
            >
              Refresh
            </Button>
          </div>
        </div>
        
        <Card className="mt-6">
          <TabGroup index={activeTab} onIndexChange={setActiveTab}>
            <TabList>
              <Tab>All Categories</Tab>
              <Tab>Incomplete</Tab>
              <Tab>Complete</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-6 mt-6">
                  {categories.map((category) => {
                    const Icon = CATEGORY_ICONS[category.name] || DocumentTextIcon;
                    return (
                      <Col key={category.id}>
                        <Card 
                          decoration="top" 
                          decorationColor={getCompletionColor(category.completionPercentage)}
                          className="cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => handleSelectCategory(category)}
                        >
                          <div className="flex items-start space-x-4">
                            <div className="p-2 bg-gray-100 rounded-lg">
                              <Icon className="h-6 w-6 text-gray-700" />
                            </div>
                            <div className="flex-1">
                              <Title>{category.name}</Title>
                              <Text className="mt-1">{category.description}</Text>
                              <div className="mt-4">
                                <div className="flex justify-between items-center mb-1">
                                  <Text className="text-xs text-gray-500">{category.completionPercentage}% complete</Text>
                                  <Text className="text-xs text-gray-500">{category.count} strings</Text>
                                </div>
                                <ProgressBar 
                                  value={category.completionPercentage} 
                                  color={getCompletionColor(category.completionPercentage)} 
                                />
                              </div>
                            </div>
                          </div>
                        </Card>
                      </Col>
                    );
                  })}
                </Grid>
              </TabPanel>
              <TabPanel>
                <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-6 mt-6">
                  {categories
                    .filter(category => category.completionPercentage < 100)
                    .map((category) => {
                      const Icon = CATEGORY_ICONS[category.name] || DocumentTextIcon;
                      return (
                        <Col key={category.id}>
                          <Card 
                            decoration="top" 
                            decorationColor={getCompletionColor(category.completionPercentage)}
                            className="cursor-pointer hover:shadow-md transition-shadow"
                            onClick={() => handleSelectCategory(category)}
                          >
                            <div className="flex items-start space-x-4">
                              <div className="p-2 bg-gray-100 rounded-lg">
                                <Icon className="h-6 w-6 text-gray-700" />
                              </div>
                              <div className="flex-1">
                                <Title>{category.name}</Title>
                                <Text className="mt-1">{category.description}</Text>
                                <div className="mt-4">
                                  <div className="flex justify-between items-center mb-1">
                                    <Text className="text-xs text-gray-500">{category.completionPercentage}% complete</Text>
                                    <Text className="text-xs text-gray-500">{category.count} strings</Text>
                                  </div>
                                  <ProgressBar 
                                    value={category.completionPercentage} 
                                    color={getCompletionColor(category.completionPercentage)} 
                                  />
                                </div>
                              </div>
                            </div>
                          </Card>
                        </Col>
                      );
                    })}
                </Grid>
              </TabPanel>
              <TabPanel>
                <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-6 mt-6">
                  {categories
                    .filter(category => category.completionPercentage === 100)
                    .map((category) => {
                      const Icon = CATEGORY_ICONS[category.name] || DocumentTextIcon;
                      return (
                        <Col key={category.id}>
                          <Card 
                            decoration="top" 
                            decorationColor="emerald"
                            className="cursor-pointer hover:shadow-md transition-shadow"
                            onClick={() => handleSelectCategory(category)}
                          >
                            <div className="flex items-start space-x-4">
                              <div className="p-2 bg-gray-100 rounded-lg">
                                <Icon className="h-6 w-6 text-gray-700" />
                              </div>
                              <div className="flex-1">
                                <Title>{category.name}</Title>
                                <Text className="mt-1">{category.description}</Text>
                                <div className="mt-4">
                                  <div className="flex justify-between items-center mb-1">
                                    <Text className="text-xs text-gray-500">100% complete</Text>
                                    <Text className="text-xs text-gray-500">{category.count} strings</Text>
                                  </div>
                                  <ProgressBar value={100} color="emerald" />
                                </div>
                              </div>
                            </div>
                          </Card>
                        </Col>
                      );
                    })}
                </Grid>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </Card>
      </div>
    </>
  );
  
  // Render category detail view with translations
  const renderCategoryDetail = () => {
    if (!selectedCategory) return null;
    
    return (
      <>
        <div className="mb-6">
          <div className="flex items-center">
            <Button
              variant="light"
              icon={ArrowLeftIcon}
              onClick={handleBackFromCategory}
              className="mr-4"
            >
              Back to Categories
            </Button>
            <div>
              <Title>{selectedCategory.name}</Title>
              <Text>
                {selectedCategory.description} • {selectedCategory.count} strings • 
                {selectedCategory.completionPercentage}% complete
              </Text>
            </div>
          </div>
          
          <Card className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <div className="relative w-full max-w-md">
                <TextInput
                  icon={MagnifyingGlassIcon}
                  placeholder="Search translations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex space-x-2">
                <Select defaultValue="all">
                  <SelectItem value="all">All Strings</SelectItem>
                  <SelectItem value="translated">Translated</SelectItem>
                  <SelectItem value="untranslated">Untranslated</SelectItem>
                </Select>
                <Button
                  variant="light"
                  icon={ArrowPathIcon}
                  tooltip="Refresh translations"
                >
                  Refresh
                </Button>
              </div>
            </div>
            
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Key</TableHeaderCell>
                  <TableHeaderCell>Default Text (English)</TableHeaderCell>
                  <TableHeaderCell>Translation ({language.name})</TableHeaderCell>
                  <TableHeaderCell>Last Updated</TableHeaderCell>
                  <TableHeaderCell>Actions</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTranslations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <Text>No translations found matching your search.</Text>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTranslations.map((translation) => (
                    <TableRow key={translation.id}>
                      <TableCell>
                        <Text className="font-mono text-xs">{translation.key}</Text>
                        {translation.context && (
                          <Text className="text-xs text-gray-500 mt-1">
                            {translation.context}
                          </Text>
                        )}
                      </TableCell>
                      <TableCell>
                        <Text>{translation.defaultText}</Text>
                      </TableCell>
                      <TableCell>
                        {editingTranslation === translation.id ? (
                          <Textarea
                            placeholder="Enter translation..."
                            value={translationText[translation.id] || ''}
                            onChange={(e) => setTranslationText({
                              ...translationText,
                              [translation.id]: e.target.value
                            })}
                            className="w-full"
                            rows={3}
                          />
                        ) : (
                          <div className="min-h-[24px]">
                            {translation.translatedText ? (
                              <Text>{translation.translatedText}</Text>
                            ) : (
                              <Text className="text-gray-400 italic">Not translated</Text>
                            )}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        {translation.lastUpdated ? (
                          <Text>{formatDate(translation.lastUpdated)}</Text>
                        ) : (
                          <Badge color="gray" size="xs">Never</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {editingTranslation === translation.id ? (
                            <>
                              <Button
                                variant="primary"
                                size="xs"
                                onClick={() => handleSaveTranslation(translation.id)}
                                disabled={!translationText[translation.id]}
                              >
                                Save
                              </Button>
                              <Button
                                variant="secondary"
                                size="xs"
                                onClick={handleCancelEdit}
                              >
                                Cancel
                              </Button>
                            </>
                          ) : (
                            <Button
                              variant="light"
                              color="gray"
                              icon={PencilIcon}
                              tooltip="Edit translation"
                              onClick={() => handleEditTranslation(
                                translation.id, 
                                translation.translatedText || ''
                              )}
                            />
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Card>
        </div>
      </>
    );
  };
  
  return (
    <div>
      <div className="mb-6 flex items-center">
        <Button
          variant="light"
          icon={ArrowLeftIcon}
          onClick={onBack}
          className="mr-4"
        >
          Back to Languages
        </Button>
      </div>
      
      {selectedCategory ? renderCategoryDetail() : renderCategoryList()}
    </div>
  );
} 