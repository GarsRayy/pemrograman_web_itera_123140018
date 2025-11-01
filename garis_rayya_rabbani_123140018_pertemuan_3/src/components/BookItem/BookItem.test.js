// src/components/BookItem/BookItem.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BookProvider } from '../../context/BookContext'; // Import Provider
import BookItem from './BookItem';

// (1) Siapkan fungsi mock
const mockDeleteBook = jest.fn();
const mockUpdateBook = jest.fn();

// (2) Data buku palsu untuk di-render (gunakan 'owned', bukan 'milik')
const mockBook = {
  id: 123,
  title: 'Judul Buku Keren',
  author: 'Penulis Hebat',
  status: 'owned' // <-- Gunakan status baru 'owned'
};

// (3) Buat wrapper kustom
const AllTheProviders = ({ children }) => {
  return (
    <BookProvider>
      {children}
    </BookProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// (4) Mock implementasi useBooks
jest.mock('../../context/BookContext', () => ({
  ...jest.requireActual('../../context/BookContext'),
  useBooks: () => ({
    deleteBook: mockDeleteBook,
    updateBook: mockUpdateBook,
  }),
}));


describe('BookItem Component', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    // (5) Mock 'window.confirm' agar otomatis 'OK'
    window.confirm = jest.fn(() => true);
  });

  test('1. renders book title, author, and status correctly', () => {
    customRender(<BookItem book={mockBook} />);

    // Cek apakah judul tampil
    expect(screen.getByText('Judul Buku Keren')).toBeInTheDocument();
    
    // Cek apakah penulis tampil (TANPA "oleh")
    expect(screen.getByText('Penulis Hebat')).toBeInTheDocument();
    
    // Cek apakah status 'owned' di-render sebagai 'Milik Saya'
    expect(screen.getByText('Milik Saya')).toBeInTheDocument();
  });

  test('2. calls deleteBook when delete button is clicked', async () => {
    const user = userEvent.setup();
    customRender(<BookItem book={mockBook} />);

    // Klik tombol hapus
    const deleteButton = screen.getByRole('button', { name: /hapus/i });
    await user.click(deleteButton);

    // Cek apakah 'window.confirm' dipanggil
    expect(window.confirm).toHaveBeenCalled();

    // Cek apakah 'deleteBook' dipanggil dengan ID yang benar
    expect(mockDeleteBook).toHaveBeenCalledTimes(1);
    expect(mockDeleteBook).toHaveBeenCalledWith(123); // ID dari mockBook
  });
  
  test('3. shows BookForm when edit button is clicked', async () => {
    const user = userEvent.setup();
    customRender(<BookItem book={mockBook} />);

    // Pastikan tombol "Simpan" (dari form) tidak ada di awal
    expect(screen.queryByRole('button', { name: /simpan perubahan/i })).not.toBeInTheDocument();

    // Klik tombol Edit
    const editButton = screen.getByRole('button', { name: /edit/i });
    await user.click(editButton);

    // Sekarang, pastikan form-nya muncul!
    // Kita cek dengan mencari tombol "Simpan Perubahan"
    expect(screen.getByRole('button', { name: /simpan perubahan/i })).toBeInTheDocument();
    
    // Kita juga bisa cek apakah inputnya terisi dengan data yang benar
    expect(screen.getByLabelText(/judul buku/i)).toHaveValue('Judul Buku Keren');
    expect(screen.getByLabelText(/penulis/i)).toHaveValue('Penulis Hebat');
  });
});