// src/components/BookForm/BookForm.js
import React, { useState, useEffect } from "react";
import { BookMarked } from "lucide-react";
import { useBooks } from "../../context/BookContext";
import './BookForm.css';

export default function BookForm({ initialData, onSubmit }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("owned"); // Default ke 'owned'
  const [errors, setErrors] = useState({});
  const { addBook, updateBook } = useBooks();

  // Efek untuk mengisi form jika ini mode edit (initialData berubah)
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setAuthor(initialData.author || "");
      setStatus(initialData.status || "owned");
    } else {
      // Jika bukan mode edit (form tambah buku), reset
      setTitle("");
      setAuthor("");
      setStatus("owned");
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = "Judul buku harus diisi";
    }
    if (!author.trim()) {
      newErrors.author = "Nama penulis harus diisi";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    if (initialData?.id) {
      updateBook(initialData.id, {
        title: title.trim(),
        author: author.trim(),
        status,
      });
    } else {
      addBook(
        title.trim(),
        author.trim(),
        status
      );
      // Reset form hanya jika ini bukan mode edit
      setTitle("");
      setAuthor("");
      setStatus("owned");
    }
    
    setErrors({});
    if (onSubmit) {
      onSubmit(); // Panggil callback (untuk menutup mode edit)
    }
  };

  return (
    <div className="book-form-card">
      <div className="book-form-header">
        <BookMarked className="book-form-icon" />
        <h3 className="book-form-title">
          {initialData ? "Edit Buku" : "Tambah Buku Baru"}
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="book-form-body">
        <div>
          <label htmlFor="title" className="form-label">
            Judul Buku
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) {
                setErrors({ ...errors, title: "" });
              }
            }}
            placeholder="Masukkan judul buku..."
            className={`input-field ${errors.title ? "input-error" : ""}`}
          />
          {errors.title && <p className="error-message">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="author" className="form-label">
            Penulis
          </label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
              if (errors.author) {
                setErrors({ ...errors, author: "" });
              }
            }}
            placeholder="Masukkan nama penulis..."
            className={`input-field ${errors.author ? "input-error" : ""}`}
          />
          {errors.author && <p className="error-message">{errors.author}</p>}
        </div>

        <div>
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="select-field"
          >
            {/* Ubah value dan label */}
            <option value="owned">Milik Saya</option>
            <option value="reading">Sedang Dibaca</option>
            <option value="want_to_buy">Ingin Dibeli</option>
          </select>
        </div>

        <button type="submit" className="submit-button">
          {initialData ? "Simpan Perubahan" : "Tambah Buku"}
        </button>
      </form>
    </div>
  );
}