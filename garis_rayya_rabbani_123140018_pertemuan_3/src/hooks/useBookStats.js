// src/hooks/useBookStats.js

import { useMemo } from 'react';
import { useBooks } from '../context/BookContext'; // <- (1) IMPORT CONTEXT KITA

function useBookStats() {
  // 2. Ambil daftar *semua* buku dari context
  const { books } = useBooks();

  // 3. Hitung statistik menggunakan useMemo agar efisien
  const stats = useMemo(() => {
    const total = books.length;
    
    // ** Gunakan string status baru **
    const owned = books.filter(book => book.status === 'owned').length;
    const reading = books.filter(book => book.status === 'reading').length;
    const wantToBuy = books.filter(book => book.status === 'want_to_buy').length; // Diperbarui

    // Persentase (jika total lebih dari 0)
    const ownedPercent = total > 0 ? (owned / total) * 100 : 0;
    const readingPercent = total > 0 ? (reading / total) * 100 : 0;
    const toBuyPercent = total > 0 ? (wantToBuy / total) * 100 : 0; // Diperbarui

    return {
      total,
      owned,
      reading,
      wantToBuy, // Diperbarui
      ownedPercent,
      readingPercent,
      toBuyPercent, // Diperbarui
    };
  }, [books]); // Kalkulasi ini hanya akan berjalan ulang jika [books] berubah

  // 4. Kembalikan hasil statistik
  return stats;
}

export default useBookStats;