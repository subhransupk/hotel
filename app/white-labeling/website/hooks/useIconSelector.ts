import { useState, useEffect, useRef } from 'react';

// Available icons for features
const availableIcons = [
  '📅', '👥', '💰', '📊', '✨', '🔍', '🚀', '💡', '⚙️', '📱', 
  '🔒', '📈', '🌐', '📝', '🔔', '📦', '🔄', '💬', '📧', '🎯',
  '🤝', '🌱', '🎨', '🔧', '📞', '🏆', '💼', '🛠️', '📱', '💻',
  '🖥️', '🔌', '🔋', '📡', '🔍', '📊', '📈', '📉', '💹', '📃',
  '📑', '📋', '📁', '📂', '🗂️', '📒', '📔', '📕', '📗', '📘'
];

// Icon descriptions for search
const iconDescriptions: Record<string, string> = {
  '📅': 'Calendar',
  '👥': 'People',
  '💰': 'Money',
  '📊': 'Chart',
  '✨': 'Sparkles',
  '🔍': 'Search',
  '🚀': 'Rocket',
  '💡': 'Idea',
  '⚙️': 'Settings',
  '📱': 'Mobile',
  '🔒': 'Lock',
  '📈': 'Growth',
  '🌐': 'Globe',
  '📝': 'Note',
  '🔔': 'Notification',
  '📦': 'Package',
  '🔄': 'Sync',
  '💬': 'Chat',
  '📧': 'Email',
  '🎯': 'Target',
  '🤝': 'Handshake',
  '🌱': 'Growth',
  '🎨': 'Design',
  '🔧': 'Tools',
  '📞': 'Phone',
  '🏆': 'Trophy',
  '💼': 'Business',
  '🛠️': 'Tools',
  '💻': 'Computer',
  '🖥️': 'Desktop',
  '🔌': 'Plugin',
  '🔋': 'Battery',
  '📡': 'Satellite',
  '📃': 'Document',
  '📑': 'Bookmark',
  '📋': 'Clipboard',
  '📁': 'Folder',
  '📂': 'Open Folder',
  '🗂️': 'Card Index',
  '📒': 'Ledger',
  '📔': 'Notebook',
  '📕': 'Book',
  '📗': 'Green Book',
  '📘': 'Blue Book'
};

export type IconSelectorType = 'feature' | 'value' | 'step';

export const useIconSelector = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<IconSelectorType | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectorRef = useRef<HTMLDivElement>(null);

  // Filter icons based on search term
  const filteredIcons = searchTerm
    ? availableIcons.filter(icon => {
        const description = iconDescriptions[icon] || '';
        return description.toLowerCase().includes(searchTerm.toLowerCase()) || icon.includes(searchTerm);
      })
    : availableIcons;

  // Function to open the icon selector
  const openIconSelector = (type: IconSelectorType, index: number) => {
    setSelectedType(type);
    setSelectedIndex(index);
  };

  // Function to close the icon selector
  const closeIconSelector = () => {
    setSelectedType(null);
    setSelectedIndex(null);
    setSearchTerm('');
  };

  // Function to handle icon selection
  const handleIconSelect = (icon: string, callback?: (icon: string) => void) => {
    if (callback) {
      callback(icon);
    }
    closeIconSelector();
  };

  // Handle clicks outside the selector to close it
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectorRef.current && !selectorRef.current.contains(e.target as Node)) {
        closeIconSelector();
      }
    };

    if (selectedType !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedType]);

  return {
    searchTerm,
    setSearchTerm,
    selectedType,
    selectedIndex,
    selectorRef,
    availableIcons,
    iconDescriptions,
    filteredIcons,
    openIconSelector,
    closeIconSelector,
    handleIconSelect
  };
}; 