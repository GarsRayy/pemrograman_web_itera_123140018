// src/components/LoadingSkeleton/LoadingSkeleton.js
import React from 'react';
import './LoadingSkeleton.css';

export default function LoadingSkeleton() {
  return (
    <div className="skeleton-container">
      {/* Buat 3 kotak placeholder */}
      <div className="skeleton-item" />
      <div className="skeleton-item" />
      <div className="skeleton-item" />
    </div>
  );
}