// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookProvider } from './context/BookContext';
import Home from './pages/Home/Home';
import StatsPage from './pages/Stats/StatsPage';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary'; // <-- 1. Import

function App() {
  return (
    // 2. Bungkus semua dengan ErrorBoundary
    <ErrorBoundary> 
      <BookProvider> 
        <Router>
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/stats" element={<StatsPage />} /> 
            </Routes>
          </main>
        </Router>
      </BookProvider>
    </ErrorBoundary>
  );
}

export default App;