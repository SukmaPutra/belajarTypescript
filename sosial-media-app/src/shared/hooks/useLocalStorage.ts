// shared/hooks/useLocalStorage.ts
import { useState } from 'react';
import { STORAGE_KEYS } from '@/shared/constant';

export const useLocalStorage = <T>(key: string,initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error('useLocalStorage error:', err);
    }
  };

  const removeValue = () => {
    try {
      setStoredValue(initialValue);
      localStorage.removeItem(key);
    } catch (err) {
      console.error('useLocalStorage error:', err);
    }
  };

  return [storedValue, setValue, removeValue] as const;
};