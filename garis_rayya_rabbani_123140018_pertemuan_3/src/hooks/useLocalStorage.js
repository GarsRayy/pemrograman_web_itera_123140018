// src/hooks/useLocalStorage.js

import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  // 1. Dapatkan state dari localStorage ATAU dari nilai awal
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Cek apakah ada data di localStorage
      const item = window.localStorage.getItem(key);
      // Jika ada, parse datanya. Jika tidak, gunakan nilai awal (initialValue)
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Jika error, cetak error dan gunakan nilai awal
      console.error(error);
      return initialValue;
    }
  });

  // 2. Gunakan useEffect untuk menyimpan state ke localStorage setiap kali state berubah
  useEffect(() => {
    try {
      // Simpan state (storedValue) ke localStorage dengan key yang diberikan
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      // Tangani error jika terjadi
      console.error(error);
    }
  }, [key, storedValue]); // Efek ini akan berjalan setiap kali 'key' atau 'storedValue' berubah

  // 3. Kembalikan state dan fungsi setter-nya, sama seperti useState
  return [storedValue, setStoredValue];
}

export default useLocalStorage;