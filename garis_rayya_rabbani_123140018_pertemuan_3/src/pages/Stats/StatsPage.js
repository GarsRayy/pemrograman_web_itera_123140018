// src/pages/Stats/StatsPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Home } from 'lucide-react';
import Stats from './Stats'; // Komponen 4 kartu
import { useBooks } from '../../context/BookContext'; // <-- Import useBook
import useBookStats from '../../hooks/useBookStats'; // <-- Import useBookStats
// Import komponen recharts
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import './StatsPage.css'; // <-- Kita akan perbarui CSS ini

// Helper untuk label Pie Chart (untuk menampilkan persentase)
// Ini adalah fungsi kustom yang akan dibaca oleh <Pie />
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
  const RADIAN = Math.PI / 180;
  // Menghitung posisi label di tengah irisan pie
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize="14px" fontWeight="bold">
      {/* Tampilkan persentase */}
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


export default function StatsPage() {
  const { books } = useBooks(); // <-- Dapatkan array buku mentah
  const stats = useBookStats(); // <-- Dapatkan data statistik (termasuk persentase)

  // Data untuk Bar chart
  const barChartData = [
    { status: "Milik Saya", jumlah: stats.owned },
    { status: "Sedang Dibaca", jumlah: stats.reading },
    { status: "Ingin Dibeli", jumlah: stats.wantToBuy },
  ];

  // Data for Pie chart
  const pieChartData = [
    { name: "Milik Saya", value: stats.owned },
    { name: "Sedang Dibaca", value: stats.reading },
    { name: "Ingin Dibeli", value: stats.wantToBuy },
  ];

  const COLORS = ["#3B82F6", "#22C55E", "#EAB308"]; // Biru, Hijau, Kuning

  // Ambil 5 buku terbaru (berdasarkan `createdAt` yang kita tambahkan sebelumnya)
  const recentBooks = books
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 5);

  return (
    <main className="stats-page-main">
      {/* Header/Navbar */}
      <div className="home-navbar"> {/* Menggunakan ulang style dari Home */}
        <div className="home-navbar-content">
          <div className="home-navbar-title">
            <div className="home-navbar-icon-wrapper">
              <BookOpen className="home-navbar-icon" />
            </div>
            <div>
              <h1 className="home-navbar-h1">Statistik Perpustakaan</h1>
              <p className="home-navbar-p">Analisis lengkap koleksi buku Anda</p>
            </div>
          </div>
          <Link to="/" className="button-outline">
            <Home width={16} height={16} />
            Kembali ke Home
          </Link>
        </div>
      </div>

      {/* Konten Statistik */}
      <div className="stats-page-container">
        
        {/* 1. Stats Cards (dari Stats.js) */}
        <Stats />

        {/* 2. Charts Grid */}
        <div className="stats-chart-grid">
          
          {/* Bar Chart Card */}
          <div className="stat-chart-card">
            <h2 className="section-title">Distribusi Status Buku</h2>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="status" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="jumlah" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart Card */}
          <div className="stat-chart-card">
            <h2 className="section-title">Persentase Koleksi</h2>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel} // <-- Menggunakan label persentase kustom
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value} buku`, name]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 3. Recent Books Card */}
        {recentBooks.length > 0 && (
          <div className="stat-recent-card">
            <h2 className="section-title">Buku Terbaru Ditambahkan</h2>
            <div className="recent-books-list">
              {recentBooks.map((book) => (
                <div key={book.id} className="recent-book-item">
                  <div>
                    <p className="recent-book-title">{book.title}</p>
                    <p className="recent-book-author">{book.author}</p>
                  </div>
                  <span className="recent-book-date">
                    {/* Format tanggal */}
                    {new Date(book.createdAt).toLocaleDateString("id-ID")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}