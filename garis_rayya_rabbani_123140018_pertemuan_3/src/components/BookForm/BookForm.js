// src/components/BookForm/BookForm.js

import React, { useState } from 'react';
import { useBooks } from '../../context/BookContext'; // <- (1) Ambil fungsi dari Context
import './BookForm.css';

function BookForm() {
  // (2) State lokal untuk mengelola input form
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState(''); // 'milik', 'baca', 'beli'
  
  // State untuk error handling (Syarat Wajib)
  const [error, setError] = useState('');

  // Ambil fungsi addBook dari context
  const { addBook } = useBooks();

  const handleSubmit = (e) => {
    e.preventDefault();

    // (3) Error Handling Sederhana (Syarat Wajib)
    if (!title.trim() || !author.trim() || !status) {
      setError('Semua field (Judul, Penulis, dan Status) wajib diisi.');
      return;
    }

    // (4) Panggil fungsi dari context
    addBook(title, author, status);

    // (5) Reset form setelah submit
    setTitle('');
    setAuthor('');
    setStatus('');
    setError(''); // Hapus pesan error
  };

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <h3>Tambah Buku Baru</h3>
      
      {/* Tampilkan pesan error jika ada */}
      {error && <p className="form-error">{error}</p>}

      <div className="form-group">
        <label htmlFor="title">Judul Buku</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Mis: Laskar Pelangi"
        />
      </div>

      <div className="form-group">
        <label htmlFor="author">Penulis</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Mis: Andrea Hirata"
        />
      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">-- Pilih Status --</option>
          <option value="milik">Dimiliki</option>
          <option value="baca">Sedang Dibaca</option>
          <option value="beli">Ingin Dibeli</option>
        </select>
      </div>

      <button type="submit" className="submit-btn">Tambah Buku</button>
    </form>
  );
}

export default BookForm;