// src/hooks/useSearch.js
import { useState, useMemo } from "react";

export function useSearch(books) {
  const [query, setQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredBooks = useMemo(() => {
    return books
      .filter((book) => {
        // Logika Filter Status
        if (selectedStatus === 'all') return true;
        return book.status === selectedStatus;
      })
      .filter((book) => {
        // Logika Search (cek di judul atau penulis)
        const term = query.toLowerCase();
        return (
          book.title.toLowerCase().includes(term) ||
          book.author.toLowerCase().includes(term)
        );
      })
      .sort((a, b) => b.id - a.id); // Selalu urutkan yang terbaru di atas
  }, [books, query, selectedStatus]);

  return {
    query,
    setQuery,
    selectedStatus,
    setSelectedStatus,
    filteredBooks,
  };
}
