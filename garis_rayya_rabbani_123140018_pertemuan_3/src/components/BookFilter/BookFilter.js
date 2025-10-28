// src/components/BookFilter/BookFilter.js

import React from 'react';
import { useBooks } from '../../context/BookContext'; // <- (1) Ambil state dan setter dari Context
import './BookFilter.css';

function BookFilter() {
  // (2) Ambil semua yang kita butuhkan dari context
  const {
    filterStatus,
    setFilterStatus,
    searchTerm,
    setSearchTerm
  } = useBooks();

  return (
    <div className="book-filter-container">
      {/* (3) Input untuk Fitur Pencarian */}
      <div className="filter-group search-group">
        <label htmlFor="search">Cari Buku</label>
        <input
          type="text"
          id="search"
          className="search-input"
          placeholder="Cari berdasarkan judul atau penulis..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* (4) Select untuk Fitur Filter Status */}
      <div className="filter-group status-group">
        <label htmlFor="status-filter">Filter Status</label>
        <select
          id="status-filter"
          className="status-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">Semua Status</option>
          <option value="milik">Dimiliki</option>
          <option value="baca">Sedang Dibaca</option>
          <option value="beli">Ingin Dibeli</option>
        </select>
      </div>
    </div>
  );
}

export default BookFilter;