// src/components/BookForm/BookForm.test.js

import React from 'react';
// Import 'render' dan 'screen'
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// Import provider, BUKAN hook, agar kita bisa membungkusnya
import { BookProvider } from '../../context/BookContext'; 
import BookForm from './BookForm';

// Buat 'wrapper' kustom yang menyediakan provider untuk komponen
// Ini adalah cara modern untuk menguji komponen yang terhubung ke konteks
const AllTheProviders = ({ children }) => {
  return (
    <BookProvider>
      {children}
    </BookProvider>
  );
};

// Fungsi 'render' kustom yang otomatis menggunakan wrapper
const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// Mock 'addBook'
// Kita tidak perlu mock 'useBooks' lagi karena kita me-render Provider-nya
const mockAddBook = jest.fn();

// Mock implementasi useBooks SEBELUM tes berjalan
// Ini diperlukan karena BookForm memanggil useBooks()
jest.mock('../../context/BookContext', () => ({
  // Kita ambil semua ekspor asli dari file...
  ...jest.requireActual('../../context/BookContext'),
  // ...dan kita ganti HANYA 'useBooks'
  useBooks: () => ({
    addBook: mockAddBook, // <-- Arahkan ke mockAddBook kita
    updateBook: jest.fn(),
  }),
}));


describe('BookForm Component', () => {

  beforeEach(() => {
    mockAddBook.mockClear(); // Hapus panggilan sebelumnya
  });

  test('1. shows validation errors if fields are empty on submit', async () => {
    const user = userEvent.setup();
    customRender(<BookForm />);
    
    // Klik tombol submit
    const submitButton = screen.getByRole('button', { name: /tambah buku/i });
    await user.click(submitButton);

    // Cek apakah pesan error BARU muncul
    // Gunakan findByText karena ada pembaruan state (asynchronous)
    expect(await screen.findByText("Judul buku harus diisi")).toBeInTheDocument();
    expect(await screen.findByText("Nama penulis harus diisi")).toBeInTheDocument();
  });

  test('2. does NOT call addBook if fields are empty on submit', async () => {
    const user = userEvent.setup();
    customRender(<BookForm />);
    
    // Klik tombol submit
    const submitButton = screen.getByRole('button', { name: /tambah buku/i });
    await user.click(submitButton);

    // Cek bahwa mockAddBook TIDAK dipanggil
    expect(mockAddBook).not.toHaveBeenCalled();
  });

  test('3. calls addBook with correct data on valid submission', async () => {
    const user = userEvent.setup();
    customRender(<BookForm />);

    // (4) Isi semua field
    await user.type(screen.getByLabelText(/judul buku/i), 'Buku Testing');
    await user.type(screen.getByLabelText(/penulis/i), 'Author Testing');
    
    // (5) Perbarui value dari 'baca' menjadi 'reading'
    await user.selectOptions(screen.getByLabelText(/status/i), 'reading');

    // (6) Klik submit
    const submitButton = screen.getByRole('button', { name: /tambah buku/i });
    await user.click(submitButton);

    // (7) Cek apakah mockAddBook dipanggil DENGAN BENAR
    expect(mockAddBook).toHaveBeenCalledTimes(1);
    expect(mockAddBook).toHaveBeenCalledWith(
      'Buku Testing',
      'Author Testing',
      'reading' // <-- Pastikan value-nya 'reading'
    );

    // Cek juga apakah pesan error TIDAK ada
    expect(screen.queryByText("Judul buku harus diisi")).not.toBeInTheDocument();
  });
});