// src/pages/Home/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, BarChart3 } from 'lucide-react';
import { useBooks } from '../../context/BookContext';
import { useSearch } from '../../hooks/useSearch'; // <-- 1. Import hook baru
import BookForm from '../../components/BookForm/BookForm';
import BookList from '../../components/BookList/BookList';
import BookFilter from '../../components/BookFilter/BookFilter';
import Stats from '../Stats/Stats';
import './Home.css';

export default function Home() {
  // 1. Dapatkan data master dan status loading dari useBooks()
  const { books, isLoaded } = useBooks();

  // 2. Dapatkan state filter dan buku yang sudah difilter dari useSearch()
  const { 
    query, 
    setQuery, 
    selectedStatus, 
    setSelectedStatus, 
    filteredBooks 
  } = useSearch(books); // Berikan data master ke hook

  return (
    <main className="home-main">
      <div className="home-navbar">
        <div className="home-navbar-content">
          <div className="home-navbar-title">
            <div className="home-navbar-icon-wrapper">
              <BookOpen className="home-navbar-icon" />
            </div>
            <div>
              <h1 className="home-navbar-h1">Perpustakaan Pribadiku</h1>
              <p className="home-navbar-p">Kelola koleksi buku Anda</p>
            </div>
          </div>
          <Link to="/stats" className="button-outline">
            <BarChart3 width={16} height={16} />
            Statistik
          </Link>
        </div>
      </div>

      <div className="home-main-container">
        {books.length > 0 && (
          <div className="stats-container-home">
            <Stats />
          </div>
        )}

        <div className="home-layout-grid">
          <div className="sidebar-section">
            <div className="sticky-sidebar">
              <h2 className="section-title">Tambah Buku</h2>
              <BookForm />
            </div>
          </div>

          <div className="list-section">
            <div className="list-header">
              <h2 className="section-title">Daftar Buku</h2>
              {/* 3. Berikan state dan setter baru ke BookFilter */}
              <BookFilter
                query={query}
                onQueryChange={setQuery}
                selectedStatus={selectedStatus}
                onStatusChange={setSelectedStatus}
              />
            </div>

            {/* 4. Berikan buku yang sudah difilter dan status loading ke BookList */}
            <BookList books={filteredBooks} isLoaded={isLoaded} />
          </div>
        </div>
      </div>
    </main>
  );
}