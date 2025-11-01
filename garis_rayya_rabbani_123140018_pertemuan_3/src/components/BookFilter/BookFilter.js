// src/components/BookFilter/BookFilter.js
import React from "react";
import { Search, Filter } from "lucide-react";
import './BookFilter.css';

export default function BookFilter({ query, onQueryChange, selectedStatus, onStatusChange }) {
  return (
    <div className="book-filter-card">
      <div className="filter-grid">
        <div className="filter-group">
          <Search className="filter-icon" />
          <input
            type="text"
            placeholder="Cari buku atau penulis..."
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="filter-input"
          />
        </div>

        <div className="filter-group">
          <Filter className="filter-icon" />
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="filter-select"
          >
            {/* Perbarui value dan label */}
            <option value="all">Semua Status</option>
            <option value="owned">Milik Saya</option>
            <option value="reading">Sedang Dibaca</option>
            <option value="want_to_buy">Ingin Dibeli</option>
          </select>
        </div>
      </div>
    </div>
  );
}