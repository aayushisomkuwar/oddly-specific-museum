import { useState, useEffect } from 'react';

// Like useState, but the value survives page refreshes
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = window.localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage may be full or blocked; the app still works for this session */
    }
  }, [key, value]);

  return [value, setValue];
}
