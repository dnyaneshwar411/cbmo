import { useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const isClient = typeof window !== 'undefined';
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (!isClient) return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      if (error instanceof Error) return initialValue;
    }
  });

  useEffect(() => {
    if (!isClient) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      if (error instanceof Error) { }
    }
  }, [isClient, key, storedValue]);

  return [storedValue, setStoredValue] as const;
}