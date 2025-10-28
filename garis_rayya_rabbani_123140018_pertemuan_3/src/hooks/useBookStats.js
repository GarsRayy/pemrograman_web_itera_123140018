// src/hooks/useBookStats.js

import { useMemo } from 'react';
import { useBooks } from '../context/BookContext'; // <- (1) IMPORT CONTEXT KITA

function useBookStats() {
  // 2. Ambil daftar *semua* buku dari context
  const { books } = useBooks();

  // 3. Hitung statistik menggunakan useMemo agar efisien
  const stats = useMemo(() => {
    const total = books.length;
    
    // Hitung jumlah buku berdasarkan status
    const owned = books.filter(book => book.status === 'milik').length;
    const reading = books.filter(book => book.status === 'baca').length;
    const toBuy = books.filter(book => book.status === 'beli').length;

    // Persentase (jika total lebih dari 0)
    const ownedPercent = total > 0 ? (owned / total) * 100 : 0;
    const readingPercent = total > 0 ? (reading / total) * 100 : 0;
    const toBuyPercent = total > 0 ? (toBuy / total) * 100 : 0;

    return {
      total,
      owned,
      reading,
      toBuy,
      ownedPercent,
      readingPercent,
      toBuyPercent,
    };
  }, [books]); // Kalkulasi ini hanya akan berjalan ulang jika [books] berubah

  // 4. Kembalikan hasil statistik
  return stats;
}

export default useBookStats;