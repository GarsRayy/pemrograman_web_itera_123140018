# 📚 ManajerBuku: Perpustakaan Pribadi
Proyek ini dibuat sebagai pemenuhan tugas praktikum mata kuliah Pemrograman Aplikasi Web.

**Nama:** Garis Rayya Rabbani
**NIM:** 123140018

---

## 🚀 Deskripsi Aplikasi
**ManajerBuku** adalah aplikasi React *Single Page Application (SPA)* yang modern dan interaktif. Aplikasi ini memungkinkan pengguna untuk mencatat dan mengelola koleksi buku pribadi mereka dengan antarmuka yang bersih dan profesional.

Fitur utamanya meliputi fungsionalitas CRUD (Create, Read, Update, Delete) untuk buku, sistem filter dan pencarian *real-time*, serta dashboard statistik canggih yang menampilkan ringkasan koleksi, grafik distribusi, dan persentase menggunakan `recharts`.

Aplikasi ini dibangun menggunakan React Hooks, Context API untuk *state management*, dan memanfaatkan `localStorage` untuk persistensi data di browser.

---

## 📸 Screenshot Antarmuka

Berikut adalah tampilan dari aplikasi ManajerBuku:

### Halaman Utama (Home)
*Menampilkan form tambah buku yang *sticky* di sisi kiri, serta daftar buku yang dapat dicari dan difilter di sisi kanan.*

**[Screenshot Halaman Utama Anda di sini]**
*(Ganti baris ini dengan screenshot UI Home Anda yang baru)*

### Halaman Statistik
*Menampilkan ringkasan koleksi, Bar Chart, Pie Chart (dengan persentase), dan daftar buku yang baru ditambahkan.*

**[Screenshot Halaman Statistik Anda di sini]**
*(Ganti baris ini dengan screenshot halaman `/stats` Anda)*

---

## ⚙️ Instruksi Instalasi dan Menjalankan

Untuk menjalankan proyek ini di lingkungan lokal Anda, ikuti langkah-langkah berikut:

1.  **Clone repository ini:**
    ```bash
    git clone [URL_GITHUB_ANDA]
    ```

2.  **Masuk ke direktori proyek:**
    ```bash
    cd garis_rayya_rabbani_123140018_pertemuan_3
    ```

3.  **Install dependencies dasar:**
    ```bash
    npm install
    ```

4.  **Install dependencies untuk UI dan Grafik:**
    (Aplikasi ini menggunakan `lucide-react` untuk ikon dan `recharts` untuk grafik)
    ```bash
    npm install lucide-react recharts
    ```

5.  **Jalankan aplikasi (Development):**
    ```bash
    npm start
    ```
    Buka `http://localhost:3000` di browser Anda.

6.  **Jalankan Test Unit:**
    ```bash
    npm test
    ```

---

## 🔬 Penjelasan Fitur React & Teknis

Aplikasi ini memenuhi semua persyaratan teknis yang diminta, termasuk:

### 1. Struktur Folder Modular
Kode diorganisir ke dalam folder-folder terpisah berdasarkan fungsinya:
* `src/components/`: Berisi komponen-komponen UI *reusable* (BookForm, BookList, BookItem, BookFilter, ErrorBoundary, dll).
* `src/pages/`: Berisi komponen yang bertindak sebagai "halaman" (Home, StatsPage).
* `src/hooks/`: Berisi *custom hooks* untuk logika (useLocalStorage, useBookStats, useSearch).
* `src/context/`: Berisi logic *state management* global (BookContext).

### 2. Komponen Fungsional dan Hooks
Seluruh aplikasi (kecuali `ErrorBoundary`) dibangun menggunakan **Functional Components** dan **React Hooks**.
* **`useState`** digunakan untuk mengelola *state* lokal di banyak komponen, seperti `BookForm.js` (untuk input form), `BookItem.js` (untuk state `isEditing`), dan `useSearch.js` (untuk `query` dan `selectedStatus`).
* **`useEffect`** digunakan di `useLocalStorage.js` untuk memuat data saat aplikasi pertama kali dijalankan dan untuk menyimpan data setiap kali `books` berubah.

### 3. Context API (State Management)
* **`BookContext.js`** bertindak sebagai *single source of truth* untuk data buku.
* Konteks ini telah di-*refactor* agar hanya fokus pada penyimpanan data mentah (`books`) dan penyediaan fungsi CRUD (`addBook`, `deleteBook`, `updateBook`). Logika filter dan pencarian telah dipisahkan ke *custom hook* `useSearch` untuk *separation of concerns* yang lebih baik.

### 4. Custom Hooks (3)
Aplikasi ini mengimplementasikan **3 custom hooks**:
1.  **`useLocalStorage.js`**: Hook serbaguna yang secara otomatis menyinkronkan *state* React dengan `localStorage` browser. Hook ini juga menyediakan status `isLoaded` yang digunakan untuk menampilkan `LoadingSkeleton`.
2.  **`useBookStats.js`**: Hook yang mengambil data `books` dari `BookContext` dan menggunakan `useMemo` untuk menghitung statistik secara efisien (total, jumlah per status, dan persentase).
3.  **`useSearch.js`**: Hook kustom baru yang mengelola *state* untuk `query` (pencarian) dan `selectedStatus` (filter). Hook ini menerima daftar buku lengkap dan mengembalikan `filteredBooks` yang sudah diproses dan siap ditampilkan.

### 5. React Router
* **`App.js`** digunakan untuk mengatur rute aplikasi.
* `/`: Menampilkan halaman `Home.js`, yang berisi form dan daftar buku.
* `/stats`: Menampilkan halaman `StatsPage.js`, yang berisi dashboard statistik.

### 6. Error Handling
* **Validasi Form:** `BookForm.js` memiliki fungsi `validateForm` yang mencegah *submit* jika judul atau penulis kosong, dan menampilkan pesan error di bawah input yang relevan.
* **Error Boundary:** Aplikasi dibungkus oleh komponen `ErrorBoundary.js`. Jika terjadi error JavaScript di dalam komponen (misalnya, saat me-*render* grafik), aplikasi tidak akan *crash*. Sebaliknya, ia akan menampilkan layar *fallback* yang ramah pengguna dengan tombol untuk kembali ke beranda.

---

## 💬 Komentar Kode
Komentar yang jelas telah ditambahkan di seluruh basis kode untuk menjelaskan bagian-bagian penting, terutama pada:
* **`BookContext.js`**: Penjelasan untuk setiap bagian dari *provider* (State Utama, Fungsi CRUD, Nilai yang Dibagikan).
* **`useLocalStorage.js`**: Penjelasan untuk setiap `useEffect` dan logika `isLoaded`.
* **`StatsPage.js`**: Komentar untuk menjelaskan persiapan data untuk `recharts` dan fungsi *helper* untuk label persentase.
* **File Test**: Komentar menjelaskan langkah-langkah dalam *testing* (Arrange, Act, Assert).

---

## ✅ Laporan Testing
Persyaratan **minimal 5 test unit** telah terpenuhi. Proyek ini memiliki **6 test unit** yang semuanya lolos.

Test unit ini mencakup:
* **`BookForm.test.js`**: Menguji validasi error dan fungsionalitas *submit* form.
* **`BookItem.test.js`**: Menguji bahwa data buku di-*render* dengan benar dan bahwa fungsi `deleteBook` dan `updateBook` dipanggil saat tombol ditekan.

**Screenshot Hasil `npm test`:**

**[Screenshot Terminal Hasil 'npm test' Anda di sini]**
*(Ganti baris ini dengan screenshot terminal Anda yang menunjukkan 6 tes 'PASS')*