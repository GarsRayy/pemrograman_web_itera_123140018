// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookProvider } from './context/BookContext'; // <- (1) IMPORT PROVIDER KITA
import './App.css';
import Home from './pages/Home/Home';
import Stats from './pages/Stats/Stats';
import Navbar from './components/Navbar/Navbar';



function App() {
  return (
    // (2) BUNGKUS SEMUANYA DENGAN <BookProvider>
    <BookProvider> 
      <Router>
        <div className="App">
          <Navbar /> {/* <-- (3) Tambahkan Navbar untuk navigasi */}
          <main>
            <Routes>
              {/* (4) Definisikan Halaman/Rute kita */}
              <Route path="/" element={<Home />} />
              <Route path="/stats" element={<Stats />} /> 
            </Routes>
          </main>
        </div>
      </Router>
    </BookProvider>
  );
}

export default App;