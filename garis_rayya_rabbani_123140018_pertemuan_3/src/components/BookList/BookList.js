// src/components/BookList/BookList.js

import React from 'react';
import { useBooks } from '../../context/BookContext'; // <- (1) Ambil data dari Context
import BookItem from '../BookItem/BookItem'; // <- (2) Import komponen anak
import './BookList.css';

function BookList() {
  // (3) Ambil daftar buku yang SUDAH DIFILTER & SEARCH
  const { filteredBooks } = useBooks();

  // (4) Cek jika tidak ada buku
  if (filteredBooks.length === 0) {
    return (
      <div className="book-list-empty">
        <p>Tidak ada buku yang ditemukan.</p>
        <p>Silakan ubah filter pencarian Anda atau tambahkan buku baru!</p>
      </div>
    );
  }

  // (5) Jika ada buku, tampilkan daftarnya
  return (
    <div className="book-list-container">
      {filteredBooks.map(book => (
        <BookItem key={book.id} book={book} />
      ))}
    </div>
  );
}

export default BookList;