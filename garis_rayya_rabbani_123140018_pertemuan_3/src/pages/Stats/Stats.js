// src/pages/Stats/Stats.js
import React from 'react';
import useBookStats from '../../hooks/useBookStats';
import './Stats.css'; // File CSS ini akan kita ubah

// Komponen Card individual
function StatCard({ label, value, colorClass }) {
  return (
    <div className="stat-card-new">
      <div className="stat-card-content">
        <div className={`stat-icon ${colorClass}`}>
          <div className="stat-value">{value}</div>
        </div>
        <p className="stat-label">{label}</p>
      </div>
    </div>
  );
}

// Komponen Stats Utama
function Stats() {
  const stats = useBookStats();

  const statItems = [
    { label: "Total Buku", value: stats.total, colorClass: "bg-stat-blue" },
    { label: "Milik Saya", value: stats.owned, colorClass: "bg-stat-green" },
    { label: "Sedang Dibaca", value: stats.reading, colorClass: "bg-stat-yellow" },
    { label: "Ingin Dibeli", value: stats.wantToBuy, colorClass: "bg-stat-purple" },
  ];

  return (
    <div className="stats-grid">
      {statItems.map((item) => (
        <StatCard key={item.label} label={item.label} value={item.value} colorClass={item.colorClass} />
      ))}
    </div>
  );
}

export default Stats;