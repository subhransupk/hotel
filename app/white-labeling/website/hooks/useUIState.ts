import { useState } from 'react';

export type NotificationType = {
  message: string;
  type: 'success' | 'error' | 'info';
  visible: boolean;
};

export type UIStateType = {
  isUploading: boolean;
  notification: NotificationType;
  showFeatureIconSelector: number | null;
  showValueIconSelector: number | null;
  showStepIconSelector: number | null;
  iconSearchTerm: string;
};

const defaultUIState: UIStateType = {
  isUploading: false,
  notification: {
    message: '',
    type: 'info',
    visible: false
  },
  showFeatureIconSelector: null,
  showValueIconSelector: null,
  showStepIconSelector: null,
  iconSearchTerm: ''
};

export const useUIState = (initialState?: Partial<UIStateType>) => {
  const [uiState, setUIState] = useState<UIStateType>({
    ...defaultUIState,
    ...initialState
  });

  // Function to update the UI state
  const updateUIState = (updates: Partial<UIStateType>) => {
    setUIState(prev => ({
      ...prev,
      ...updates
    }));
  };

  // Function to show a notification
  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info', duration: number = 3000) => {
    updateUIState({
      notification: {
        message,
        type,
        visible: true
      }
    });

    // Hide the notification after the specified duration
    setTimeout(() => {
      // Use a function to update state to avoid stale state references
      setUIState(prevState => ({
        ...prevState,
        notification: {
          ...prevState.notification,
          visible: false
        }
      }));
    }, duration);
  };

  // Function to hide the notification
  const hideNotification = () => {
    updateUIState({
      notification: {
        ...uiState.notification,
        visible: false
      }
    });
  };

  // Function to set the uploading state
  const setUploading = (isUploading: boolean) => {
    updateUIState({ isUploading });
  };

  // Function to toggle the feature icon selector
  const toggleFeatureIconSelector = (index: number | null) => {
    updateUIState({ 
      showFeatureIconSelector: index,
      showValueIconSelector: null,
      showStepIconSelector: null
    });
  };

  // Function to toggle the value icon selector
  const toggleValueIconSelector = (index: number | null) => {
    updateUIState({ 
      showValueIconSelector: index,
      showFeatureIconSelector: null,
      showStepIconSelector: null
    });
  };

  // Function to toggle the step icon selector
  const toggleStepIconSelector = (index: number | null) => {
    updateUIState({ 
      showStepIconSelector: index,
      showFeatureIconSelector: null,
      showValueIconSelector: null
    });
  };

  // Function to update the icon search term
  const updateIconSearchTerm = (term: string) => {
    updateUIState({ iconSearchTerm: term });
  };

  return {
    uiState,
    updateUIState,
    showNotification,
    hideNotification,
    setUploading,
    toggleFeatureIconSelector,
    toggleValueIconSelector,
    toggleStepIconSelector,
    updateIconSearchTerm
  };
}; 