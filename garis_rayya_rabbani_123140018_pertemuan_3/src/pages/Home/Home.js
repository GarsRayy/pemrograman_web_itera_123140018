// src/pages/Home/Home.js  <-- VERSI KODE YANG SUDAH DIPERBAIKI

import React from 'react';
import BookForm from '../../components/BookForm/BookForm';
import BookFilter from '../../components/BookFilter/BookFilter'; // <-- Path yang benar
import BookList from '../../components/BookList/BookList';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      {/* (1) Bagian Kiri: Form untuk menambah buku */}
      <aside className="form-section">
        <BookForm />
      </aside>
      
      {/* (2) Bagian Kanan: Filter dan Daftar Buku */}
      <section className="list-section">
        <h2>Daftar Bukumu</h2>
        <BookFilter />
        <BookList />
      </section>
    </div>
  );
}

export default Home;