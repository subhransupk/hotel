'use client'

import { useState } from 'react'
import { 
  Title, 
  Text, 
  Card, 
  TextInput,
  Divider,
  Button,
  Badge,
} from '@tremor/react'
import { 
  MagnifyingGlassIcon, 
  ArrowPathIcon,
  ShieldCheckIcon,
  BoltIcon,
  PaintBrushIcon,
  LinkIcon,
  BeakerIcon,
} from '@heroicons/react/24/outline'
import { AdvancedSetting, AdvancedSettingFormData, SettingCategory } from '../types'
import { SettingItem } from './setting-item'

interface SettingsListProps {
  settings: AdvancedSetting[];
  onEdit: (setting: AdvancedSetting) => void;
  onDelete: (settingId: string) => void;
}

export function SettingsList({ settings, onEdit, onDelete }: SettingsListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [localSettings, setLocalSettings] = useState<AdvancedSetting[]>(settings);

  // Update local settings when props change
  if (JSON.stringify(settings) !== JSON.stringify(localSettings)) {
    setLocalSettings(settings);
  }

  // Filter settings by search query
  const filteredSettings = searchQuery
    ? localSettings.filter(
        setting => 
          setting.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          setting.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
          setting.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : localSettings;

  // Group settings by category
  const groupedSettings = filteredSettings.reduce<Record<string, AdvancedSetting[]>>(
    (groups, setting) => {
      if (!groups[setting.category]) {
        groups[setting.category] = [];
      }
      groups[setting.category].push(setting);
      return groups;
    },
    {}
  );

  const handleSaveSetting = (id: string, value: any) => {
    const settingToUpdate = localSettings.find(s => s.id === id);
    if (settingToUpdate) {
      const updatedSetting = { 
        ...settingToUpdate, 
        value,
        lastUpdated: new Date().toISOString(),
      };
      setLocalSettings(prevSettings => 
        prevSettings.map(setting => 
          setting.id === id ? updatedSetting : setting
        )
      );
    }
  };

  const handleResetSetting = (id: string) => {
    setLocalSettings(prevSettings => 
      prevSettings.map(setting => 
        setting.id === id 
          ? { 
              ...setting, 
              value: setting.defaultValue,
              lastUpdated: new Date().toISOString(),
            } 
          : setting
      )
    );
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // Simulate API call
    setTimeout(() => {
      setLocalSettings(settings);
      setIsRefreshing(false);
    }, 1000);
  };

  const getCategoryIcon = (category: SettingCategory) => {
    switch (category) {
      case 'security':
        return <ShieldCheckIcon className="h-5 w-5" />;
      case 'performance':
        return <BoltIcon className="h-5 w-5" />;
      case 'customization':
        return <PaintBrushIcon className="h-5 w-5" />;
      case 'integration':
        return <LinkIcon className="h-5 w-5" />;
      case 'experimental':
        return <BeakerIcon className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const getCategoryColor = (category: SettingCategory): "slate" | "gray" | "zinc" | "neutral" | "stone" | "red" | "orange" | "amber" | "yellow" | "lime" | "green" | "emerald" | "teal" | "cyan" | "sky" | "blue" | "indigo" | "violet" | "purple" | "fuchsia" | "pink" | "rose" => {
    switch (category) {
      case 'security':
        return 'rose';
      case 'performance':
        return 'amber';
      case 'customization':
        return 'blue';
      case 'integration':
        return 'emerald';
      case 'experimental':
        return 'slate';
      default:
        return 'gray';
    }
  };

  const getCategoryTitle = (category: SettingCategory) => {
    switch (category) {
      case 'security':
        return 'Security Settings';
      case 'performance':
        return 'Performance Settings';
      case 'customization':
        return 'Customization Settings';
      case 'integration':
        return 'Integration Settings';
      case 'experimental':
        return 'Experimental Settings';
      default:
        return 'Settings';
    }
  };

  const getCategoryDescription = (category: SettingCategory) => {
    switch (category) {
      case 'security':
        return 'Configure security-related settings such as password policies and session timeouts.';
      case 'performance':
        return 'Optimize application performance with caching and resource management settings.';
      case 'customization':
        return 'Customize the appearance and behavior of your application.';
      case 'integration':
        return 'Configure integrations with third-party services and APIs.';
      case 'experimental':
        return 'Enable and configure experimental features that are still in development.';
      default:
        return 'Configure application settings.';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <TextInput
            placeholder="Search settings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant="light"
          icon={ArrowPathIcon}
          onClick={handleRefresh}
          loading={isRefreshing}
        >
          Refresh
        </Button>
      </div>
      
      {Object.keys(groupedSettings).length > 0 ? (
        <div className="space-y-8">
          {Object.entries(groupedSettings).map(([category, categorySettings]) => (
            <div key={category} className="space-y-4">
              <div className="flex items-start">
                <div className="mr-3 mt-1">
                  <div className={`p-2 rounded-md bg-${getCategoryColor(category as SettingCategory)}-100`}>
                    {getCategoryIcon(category as SettingCategory)}
                  </div>
                </div>
                <div>
                  <Title>{getCategoryTitle(category as SettingCategory)}</Title>
                  <Text className="text-gray-500">
                    {getCategoryDescription(category as SettingCategory)}
                  </Text>
                </div>
              </div>
              
              <Card>
                <div className="space-y-4">
                  {categorySettings.map((setting, index) => (
                    <div key={setting.id}>
                      <SettingItem
                        setting={setting}
                        onSave={(value) => handleSaveSetting(setting.id, value)}
                        onReset={() => handleResetSetting(setting.id)}
                        onEdit={() => onEdit(setting)}
                        onDelete={() => onDelete(setting.id)}
                      />
                      {index < categorySettings.length - 1 && <Divider />}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <Card className="text-center py-8">
          <Text className="text-gray-500">
            No settings found. Try adjusting your search or adding new settings.
          </Text>
        </Card>
      )}
    </div>
  );
} 