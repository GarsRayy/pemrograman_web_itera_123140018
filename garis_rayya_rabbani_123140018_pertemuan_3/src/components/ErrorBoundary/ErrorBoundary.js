// src/components/ErrorBoundary/ErrorBoundary.js
import React, { Component } from 'react';
import './ErrorBoundary.css'; // Kita akan buat file CSS ini

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Memperbarui state sehingga render berikutnya akan menampilkan UI fallback.
    return { hasError: true, error: error };
  }

  componentDidCatch(error, errorInfo) {
    // Anda juga dapat mencatat error ke layanan pelaporan error
    console.error("Caught error:", error, errorInfo);
  }

  handleGoHome = () => {
    this.setState({ hasError: false, error: null });
    // Ini mengasumsikan Anda menggunakan React Router
    window.location.href = "/"; 
  };

  render() {
    if (this.state.hasError) {
      // Anda dapat merender UI fallback kustom apa pun
      return (
        <div className="error-boundary-container">
          <div className="error-boundary-content">
            <h1 className="error-boundary-title">Terjadi Kesalahan</h1>
            <p className="error-boundary-message">
              {this.state.error?.message || "Sesuatu berjalan tidak semestinya."}
            </p>
            <button
              onClick={this.handleGoHome}
              className="error-boundary-button"
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}