// src/components/BookList/BookList.js
import React from 'react';
import BookItem from '../BookItem/BookItem';
import EmptyState from "../EmptyState/EmptyState";
import LoadingSkeleton from '../LoadingSkeleton/LoadingSkeleton'; // <-- 1. Import
import './BookList.css';

// 2. Terima `isLoaded` dan `books` sebagai props
export default function BookList({ books, isLoaded }) {
  
  // 3. Tampilkan skeleton jika belum loading
  if (!isLoaded) {
    return <LoadingSkeleton />;
  }

  // 4. Tampilkan EmptyState jika sudah loading tapi tidak ada buku
  if (books.length === 0) {
    return <EmptyState title="Belum ada buku" description="Mulai tambahkan buku Anda atau ubah filter!" />;
  }

  // 5. Tampilkan daftar buku
  return (
    <div className="book-list-new">
      {books.map(book => (
        <BookItem key={book.id} book={book} />
      ))}
    </div>
  );
}