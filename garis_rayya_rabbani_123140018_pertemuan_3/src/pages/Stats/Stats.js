// src/pages/Stats/Stats.js

import React from 'react';
import useBookStats from '../../hooks/useBookStats'; // <- (1) IMPORT HOOK KITA
import './Stats.css';

function Stats() {
  // (2) Panggil hook untuk mendapatkan data statistik
  const stats = useBookStats();

  // Helper untuk memformat persentase
  const formatPercent = (num) => num.toFixed(1) + '%';

  return (
    <div className="stats-page">
      <h2>Statistik Bukumu 📊</h2>
      <div className="stats-container">
        
        {/* Card 1: Total Buku */}
        <div className="stat-card total-card">
          <h3>Total Buku</h3>
          <p className="stat-number">{stats.total}</p>
          <p className="stat-desc">Total semua koleksi buku Anda.</p>
        </div>

        {/* Card 2: Dimiliki */}
        <div className="stat-card owned-card">
          <h3>Dimiliki</h3>
          <p className="stat-number">{stats.owned}</p>
          <p className="stat-desc">({formatPercent(stats.ownedPercent)})</p>
        </div>

        {/* Card 3: Sedang Dibaca */}
        <div className="stat-card reading-card">
          <h3>Sedang Dibaca</h3>
          <p className="stat-number">{stats.reading}</p>
          <p className="stat-desc">({formatPercent(stats.readingPercent)})</p>
        </div>
        
        {/* Card 4: Ingin Dibeli */}
        <div className="stat-card tobuy-card">
          <h3>Ingin Dibeli</h3>
          <p className="stat-number">{stats.toBuy}</p>
          <p className="stat-desc">({formatPercent(stats.toBuyPercent)})</p>
        </div>

      </div>
    </div>
  );
}

export default Stats;