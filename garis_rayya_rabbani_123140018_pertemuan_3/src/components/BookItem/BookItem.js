// src/components/BookItem/BookItem.js

import React from 'react';
import { useBooks } from '../../context/BookContext'; // <- (1) Ambil fungsi dari Context
import './BookItem.css';

// (2) Terima 'book' sebagai prop dari BookList
function BookItem({ book }) {
  // (3) Ambil fungsi delete dan update dari context
  const { deleteBook, updateBook } = useBooks();

  // Handler untuk tombol delete
  const handleDelete = () => {
    // Tampilkan konfirmasi sebelum menghapus
    if (window.confirm(`Anda yakin ingin menghapus buku "${book.title}"?`)) {
      deleteBook(book.id);
    }
  };

  // Handler untuk mengubah status
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    updateBook(book.id, { status: newStatus });
  };

  // Helper untuk memberi kelas CSS berdasarkan status
  const getStatusClass = (status) => {
    if (status === 'baca') return 'status-reading';
    if (status === 'beli') return 'status-tobuy';
    return 'status-owned'; // default 'milik'
  };

  return (
    <div className="book-item">
      <div className="book-info">
        <h4 className="book-title">{book.title}</h4>
        <p className="book-author">oleh {book.author}</p>
      </div>

      <div className="book-actions">
        {/* (4) Fitur Edit Status */}
        <select
          className={`status-select ${getStatusClass(book.status)}`}
          value={book.status}
          onChange={handleStatusChange}
        >
          <option value="milik">Dimiliki</option>
          <option value="baca">Sedang Dibaca</option>
          <option value="beli">Ingin Dibeli</option>
        </select>
        
        {/* (5) Fitur Hapus Buku */}
        <button className="delete-btn" onClick={handleDelete}>
          Hapus
        </button>
      </div>
    </div>
  );
}

export default BookItem;