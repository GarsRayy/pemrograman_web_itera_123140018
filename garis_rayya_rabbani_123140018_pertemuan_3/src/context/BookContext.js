// src/context/BookContext.js

import React, { createContext, useContext, useState, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage'; // <- (1) IMPORT HOOK KITA

// 2. Buat Context
const BookContext = createContext();

// 3. Buat custom hook untuk memudahkan pemakaian context ini
export function useBooks() {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks harus dipakai di dalam BookProvider');
  }
  return context;
}

// 4. Buat Provider Component (komponen yang akan "membungkus" aplikasi kita)
export function BookProvider({ children }) {
  // =================================
  // A. STATE UTAMA
  // =================================
  
  // Gunakan custom hook useLocalStorage kita!
  // 'books' adalah key di localStorage, [] adalah nilai awal jika kosong
  const [books, setBooks] = useLocalStorage('books', []);
  
  // State untuk fitur filter dan search (Sesuai Persyaratan Wajib)
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'milik', 'baca', 'beli'
  const [searchTerm, setSearchTerm] = useState('');

  // =================================
  // B. FUNGSI LOGIKA (CRUD)
  // =================================

  // Fitur Dasar: Menambah buku baru
  const addBook = (title, author, status) => {
    const newBook = {
      id: Date.now(), // ID unik sederhana
      title,
      author,
      status, // 'milik', 'baca', atau 'beli'
    };
    setBooks(prevBooks => [...prevBooks, newBook]);
  };

  // Fitur Dasar: Menghapus buku
  const deleteBook = (id) => {
    setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
  };

  // Fitur Dasar: Mengedit buku (bisa untuk status, judul, atau penulis)
  const updateBook = (id, updates) => {
    setBooks(prevBooks =>
      prevBooks.map(book =>
        book.id === id ? { ...book, ...updates } : book
      )
    );
  };

  // =================================
  // C. LOGIKA DERIVASI (FILTER & SEARCH)
  // =================================
  // Kita gunakan useMemo agar kalkulasi ini hanya berjalan saat ada perubahan,
  // bukan di setiap render.
  const filteredBooks = useMemo(() => {
    return books
      .filter(book => {
        // Logika Filter Status
        if (filterStatus === 'all') return true;
        return book.status === filterStatus;
      })
      .filter(book => {
        // Logika Search (cek di judul atau penulis)
        const term = searchTerm.toLowerCase();
        return (
          book.title.toLowerCase().includes(term) ||
          book.author.toLowerCase().includes(term)
        );
      });
  }, [books, filterStatus, searchTerm]);


  // =================================
  // D. NILAI YANG AKAN DIBAGIKAN
  // =================================
  const value = {
    books, // Daftar *semua* buku
    addBook,
    deleteBook,
    updateBook,
    
    // Untuk fitur filter
    filterStatus,
    setFilterStatus,
    
    // Untuk fitur search
    searchTerm,
    setSearchTerm,
    
    // Daftar buku yang sudah siap tampil (sudah difilter + search)
    filteredBooks, 
  };

  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  );
}