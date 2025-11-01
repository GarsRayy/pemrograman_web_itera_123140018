// src/components/BookForm/BookForm.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BookProvider, useBooks } from '../../context/BookContext';
import BookForm from './BookForm';

// (1) Kita mock custom hook 'useBooks'
jest.mock('../../context/BookContext');

// (2) Siapkan fungsi mock yang akan dikembalikan oleh hook
const mockAddBook = jest.fn();

// Komponen yang akan kita test


describe('BookForm Component', () => {

  beforeEach(() => {
    // (3) Reset mock & atur nilai balikan hook-nya sebelum setiap test
    jest.clearAllMocks();
    useBooks.mockReturnValue({
      addBook: mockAddBook,
    });
  });

  test('1. shows error message if fields are empty on submit', async () => {
    const user = userEvent.setup();
    render(<BookForm />);
    
    // Klik tombol submit
    const submitButton = screen.getByRole('button', { name: /tambah buku/i });
    await user.click(submitButton);

    // Cek apakah pesan error muncul
    expect(screen.getByText(/semua field/i)).toBeInTheDocument();
  });

  test('2. does NOT call addBook if fields are empty on submit', async () => {
    const user = userEvent.setup();
    render(<BookForm />);
    
    // Klik tombol submit
    const submitButton = screen.getByRole('button', { name: /tambah buku/i });
    await user.click(submitButton);

    // Cek bahwa mockAddBook TIDAK dipanggil
    expect(mockAddBook).not.toHaveBeenCalled();
  });

  test('3. calls addBook with correct data on valid submission', async () => {
    const user = userEvent.setup();
    render(<BookForm />);

    // (4) Isi semua field
    await user.type(screen.getByLabelText(/judul buku/i), 'Buku Testing');
    await user.type(screen.getByLabelText(/penulis/i), 'Author Testing');
    await user.selectOptions(screen.getByLabelText(/status/i), 'baca');

    // (5) Klik submit
    const submitButton = screen.getByRole('button', { name: /tambah buku/i });
    await user.click(submitButton);

    // (6) Cek apakah mockAddBook dipanggil DENGAN BENAR
    expect(mockAddBook).toHaveBeenCalledTimes(1);
    expect(mockAddBook).toHaveBeenCalledWith(
      'Buku Testing',
      'Author Testing',
      'baca'
    );

    // Cek juga apakah pesan error TIDAK ada
    expect(screen.queryByText(/semua field/i)).not.toBeInTheDocument();
  });
});