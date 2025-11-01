// src/components/BookItem/BookItem.js
import React, { useState } from "react";
import { useBooks } from "../../context/BookContext";
import BookForm from "../BookForm/BookForm"; // Import form untuk edit
import './BookItem.css';

// Label dan kelas warna (hardcoded dari UI baru)
const statusLabels = {
  owned: "Milik Saya",
  reading: "Sedang Dibaca",
  want_to_buy: "Ingin Dibeli",
};

const statusClasses = {
  owned: "status-owned",
  reading: "status-reading",
  want_to_buy: "status-want-to-buy",
};

export default function BookItem({ book }) {
  const { deleteBook } = useBooks();
  const [isEditing, setIsEditing] = useState(false);

  // Tampilkan form edit jika isEditing true
  if (isEditing) {
    // Berikan initialData dan callback onSubmit untuk menutup form
    // Kita bungkus dengan div agar tetap ada gap dari BookList.css
    return (
      <div className="book-item-edit-wrapper">
        <BookForm initialData={book} onSubmit={() => setIsEditing(false)} />
      </div>
    );
  }

  // Handler Hapus
  const handleDelete = () => {
    if (window.confirm(`Anda yakin ingin menghapus buku "${book.title}"?`)) {
      deleteBook(book.id);
    }
  };

  // Tampilan normal
  return (
    <div className="book-item-card">
      <div className="book-item-flex">
        <div className="book-item-content">
          <h3 className="book-item-title">{book.title}</h3>
          <p className="book-item-author">{book.author}</p>
          <span className={`book-item-status-badge ${statusClasses[book.status] || ''}`}>
            {statusLabels[book.status] || 'Tanpa Status'}
          </span>
        </div>
        <div className="book-item-actions">
          <button className="button-item-outline" onClick={() => setIsEditing(true)}>
            Edit
          </button>
          <button className="button-item-destructive" onClick={handleDelete}>
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}