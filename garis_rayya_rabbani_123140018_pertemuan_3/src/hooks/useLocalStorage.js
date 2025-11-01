// src/hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  const [isLoaded, setIsLoaded] = useState(false); // <-- 1. State loading
  const [storedValue, setStoredValue] = useState(() => {
    // Pindahkan logika loading ke useEffect agar kita bisa set isLoaded
    return initialValue;
  });

  // Efek untuk memuat data dari localStorage saat komponen mount
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      const value = item ? JSON.parse(item) : initialValue;
      setStoredValue(value);
    } catch (error) {
      console.error(error);
      setStoredValue(initialValue);
    } finally {
      setIsLoaded(true); // <-- 2. Set selesai loading
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]); // Hanya jalankan sekali

  // Efek untuk menyimpan data ke localStorage
  useEffect(() => {
    // Jangan simpan ke localStorage sampai selesai loading awal
    if (!isLoaded) {
      return;
    }
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue, isLoaded]);

  // 3. Kembalikan state loading
  return [storedValue, setStoredValue, isLoaded];
}

export default useLocalStorage;