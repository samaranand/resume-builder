import { useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T, serialize = JSON.stringify, deserialize = JSON.parse) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? (deserialize(stored) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, serialize(value));
    } catch {
      // Storage can fail in private modes; keep the app usable in memory.
    }
  }, [key, serialize, value]);

  return [value, setValue] as const;
}
