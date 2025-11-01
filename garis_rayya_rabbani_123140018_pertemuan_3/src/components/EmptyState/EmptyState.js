// src/components/EmptyState/EmptyState.js
import React from "react";
import './EmptyState.css';

export default function EmptyState({ title, description }) {
  return (
    <div className="empty-state-container">
      <p className="empty-state-title">{title}</p>
      <p className="empty-state-description">{description}</p>
    </div>
  );
}