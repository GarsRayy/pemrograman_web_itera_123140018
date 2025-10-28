// src/components/Navbar/Navbar.js

import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo">
          📚 ManajerBuku
        </NavLink>
        <ul className="nav-menu">
          <li className="nav-item">
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              end // 'end' prop penting agar tidak 'active' terus saat di /stats
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/stats" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Statistik
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;