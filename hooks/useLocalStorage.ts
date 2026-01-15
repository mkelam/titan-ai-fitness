import { useState, useEffect } from 'react';

/**
 * Custom hook for persisting state to localStorage
 * Automatically syncs state changes to localStorage and handles JSON serialization
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // Get initial value from localStorage or use default
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return initialValue;
    }
  });

  // Update localStorage when state changes
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function for consistency with useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  };

  return [storedValue, setValue];
}

/**
 * Utility to clear all app data from localStorage
 */
export function clearAppData() {
  const keysToKeep = ['titan-onboarding-complete']; // Keep onboarding flag
  const allKeys = Object.keys(localStorage);

  allKeys.forEach(key => {
    if (key.startsWith('titan-') && !keysToKeep.includes(key)) {
      localStorage.removeItem(key);
    }
  });
}

/**
 * Export all user data as JSON
 */
export function exportUserData(): string {
  const data: Record<string, any> = {};
  const allKeys = Object.keys(localStorage);

  allKeys.forEach(key => {
    if (key.startsWith('titan-')) {
      try {
        data[key] = JSON.parse(localStorage.getItem(key) || '');
      } catch {
        data[key] = localStorage.getItem(key);
      }
    }
  });

  return JSON.stringify(data, null, 2);
}

/**
 * Import user data from JSON export
 */
export function importUserData(jsonString: string): boolean {
  try {
    const data = JSON.parse(jsonString);
    Object.entries(data).forEach(([key, value]) => {
      localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
    });
    return true;
  } catch (error) {
    console.error('Error importing user data:', error);
    return false;
  }
}
