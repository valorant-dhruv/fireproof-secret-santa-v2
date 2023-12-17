import { useState, useEffect } from 'react';

export default function useDatabasenames(): string[] {
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    const updateData = () => {
      const arr: string[] = Object.keys(localStorage)
        .filter((key) => key.includes('fp.0.14.meta.secret-santa'))
        .map((key) => {
          const temp = key.slice(26);
          const temparr = temp.split('.');
          return temparr[0];
        });

      setData(arr);
    };

    updateData();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key && event.key.includes('fp.0.14.meta.')) {
        updateData();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return data;
}
