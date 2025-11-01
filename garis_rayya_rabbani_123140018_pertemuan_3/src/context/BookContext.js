// src/context/BookContext.js
import React, { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const BookContext = createContext();

export function useBooks() {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks harus dipakai di dalam BookProvider');
  }
  return context;
}

export function BookProvider({ children }) {
  // =================================
  // A. STATE UTAMA
  // =================================
  
  // Perbarui useLocalStorage untuk juga memberi tahu kita saat selesai loading
  const [books, setBooks, isLoaded] = useLocalStorage('books', []);
  
  // =================================
  // B. FUNGSI LOGIKA (CRUD)
  // =================================

  const addBook = (title, author, status) => {
    const newBook = {
      id: Date.now(),
      title,
      author,
      status,
      createdAt: Date.now(), // <-- Fitur Tambahan: Timestamp
      updatedAt: Date.now(), // <-- Fitur Tambahan: Timestamp
    };
    setBooks(prevBooks => [newBook, ...prevBooks]);
  };

  const deleteBook = (id) => {
    setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
  };

  const updateBook = (id, updates) => {
    setBooks(prevBooks =>
      prevBooks.map(book =>
        book.id === id ? { ...book, ...updates, updatedAt: Date.now() } : book // <-- Fitur Tambahan: Timestamp
      )
    );
  };

  // =================================
  // C. LOGIKA DERIVASI (DIHAPUS)
  // =================================
  // const filteredBooks = useMemo(...) -> INI PINDAH KE useSearch.js

  // =================================
  // D. NILAI YANG AKAN DIBAGIKAN
  // =================================
  const value = {
    books, // Daftar *semua* buku (belum difilter)
    addBook,
    deleteBook,
    updateBook,
    isLoaded, // <-- Fitur Tambahan: Beri tahu komponen lain jika data sudah siap
    
    // Hapus semua state filter dari sini
    // filterStatus,
    // setFilterStatus,
    // searchTerm,
    // setSearchTerm,
    // filteredBooks, 
  };

  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  );
}