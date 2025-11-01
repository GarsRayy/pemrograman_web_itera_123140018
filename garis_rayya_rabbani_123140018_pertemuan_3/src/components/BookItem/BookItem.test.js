// src/components/BookItem/BookItem.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useBooks } from '../../context/BookContext';
import BookItem from './BookItem';

// (1) Mock hook 'useBooks'
jest.mock('../../context/BookContext');

// (2) Siapkan fungsi mock
const mockDeleteBook = jest.fn();
const mockUpdateBook = jest.fn();

// (3) Data buku palsu untuk di-render
const mockBook = {
  id: 123,
  title: 'Judul Buku Keren',
  author: 'Penulis Hebat',
  status: 'milik'
};



describe('BookItem Component', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    // (4) Atur nilai balikan hook
    useBooks.mockReturnValue({
      deleteBook: mockDeleteBook,
      updateBook: mockUpdateBook,
    });
    // (5) Mock 'window.confirm' agar otomatis 'OK'
    window.confirm = jest.fn(() => true);
  });

  test('4. renders book title and author correctly', () => {
    render(<BookItem book={mockBook} />);

    // Cek apakah judul dan penulis tampil
    expect(screen.getByText('Judul Buku Keren')).toBeInTheDocument();
    expect(screen.getByText('oleh Penulis Hebat')).toBeInTheDocument();
  });

  test('5. calls deleteBook when delete button is clicked', async () => {
    const user = userEvent.setup();
    render(<BookItem book={mockBook} />);

    // Klik tombol hapus
    const deleteButton = screen.getByRole('button', { name: /hapus/i });
    await user.click(deleteButton);

    // Cek apakah 'window.confirm' dipanggil
    expect(window.confirm).toHaveBeenCalled();

    // Cek apakah 'deleteBook' dipanggil dengan ID yang benar
    expect(mockDeleteBook).toHaveBeenCalledTimes(1);
    expect(mockDeleteBook).toHaveBeenCalledWith(123); // ID dari mockBook
  });
  
  test('6. calls updateBook when status is changed', async () => {
    const user = userEvent.setup();
    render(<BookItem book={mockBook} />);

    // Ubah status select-box
    const statusSelect = screen.getByRole('combobox');
    await user.selectOptions(statusSelect, 'beli'); // Ubah ke 'Ingin Dibeli'

    // Cek apakah 'updateBook' dipanggil dengan ID dan data update yang benar
    expect(mockUpdateBook).toHaveBeenCalledTimes(1);
    expect(mockUpdateBook).toHaveBeenCalledWith(
      123,          // ID dari mockBook
      { status: 'beli' } // Data update
    );
  });
});