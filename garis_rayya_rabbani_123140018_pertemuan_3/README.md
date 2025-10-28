# Aplikasi Manajemen Buku Pribadi
Proyek ini dibuat sebagai pemenuhan tugas praktikum mata kuliah Pemrograman Aplikasi Web.

**Nama:** Garis Rayya Rabbani 
**NIM:** 123140018

---

## 📚 Deskripsi Aplikasi
**ManajerBuku** adalah aplikasi React sederhana yang memungkinkan pengguna untuk mencatat dan mengelola koleksi buku pribadi mereka. Pengguna dapat menambahkan buku baru, mengedit status buku (dimiliki, sedang dibaca, atau ingin dibeli), mencari buku, dan memfilter berdasarkan status.

Aplikasi ini dibangun sebagai *Single Page Application (SPA)* dan menggunakan `localStorage` browser untuk menyimpan data, sehingga data tetap ada walaupun browser ditutup.

## 🚀 Tampilan Aplikasi<br>

<img width="1084" height="560" alt="image" src="https://github.com/user-attachments/assets/ed761bf9-1e50-4fd5-afbc-416eb843e651" />

### Halaman Statistik<br>
<img width="1083" height="359" alt="image" src="https://github.com/user-attachments/assets/75421540-ee2b-468d-b6ee-30ccf9e6488a" />


---

## 🛠️ Fitur & Teknologi yang Digunakan
Proyek ini memenuhi semua persyaratan wajib dan teknis dari panduan praktikum:

### Fitur Dasar
* [x] **Menambah Buku Baru:** Pengguna dapat menambahkan buku (judul, penulis, status) melalui form.
* [x] **Mengedit & Menghapus Buku:** Pengguna dapat mengubah status buku atau menghapusnya dari daftar.
* [x] **Filter Buku:** Pengguna dapat memfilter daftar buku berdasarkan status (`Semua`, `Dimiliki`, `Sedang Dibaca`, `Ingin Dibeli`).
* [x] **Pencarian Buku:** Pengguna dapat mencari buku secara *real-time* berdasarkan judul atau penulis.

### Teknologi React yang Diterapkan
* [x] **`useState` & `useEffect`:** Digunakan di dalam `BookForm` untuk mengelola input dan di dalam `useLocalStorage` untuk sinkronisasi data.
* [x] **3+ Komponen Reusable:**
    1.  `BookForm`: Komponen *reusable* untuk menambah buku.
    2.  `BookFilter`: Komponen *reusable* untuk filter dan pencarian.
    3.  `BookList`: Komponen *reusable* untuk menampilkan daftar buku.
    4.  `BookItem`: Komponen *reusable* untuk menampilkan satu item buku.
    5.  `Navbar`: Komponen *reusable* untuk navigasi.
* [x] **Context API:** Menggunakan `BookContext.js` untuk menyediakan *state management* global (daftar buku, fungsi `addBook`, `deleteBook`, `updateBook`, dll.) ke seluruh komponen tanpa *prop drilling*.
* [x] **React Router:** Menggunakan `react-router-dom` untuk membuat aplikasi *multi-halaman* (`/` untuk Home dan `/stats` untuk Statistik) dengan navigasi yang cepat tanpa *reload*.
* [x] **Penyimpanan `localStorage`:** Data buku disimpan secara otomatis di *browser* pengguna.

### Persyaratan Teknis
* [x] **Functional Components & Hooks:** Seluruh aplikasi dibangun modern menggunakan *functional components* dan *hooks*.
* [x] **Minimal 2 Custom Hooks:**
    1.  `useLocalStorage.js`: *Hook* untuk abstraksi logika simpan/ambil data dari `localStorage`.
    2.  `useBookStats.js`: *Hook* untuk abstraksi logika kalkulasi statistik buku dari `BookContext`.
* [x] **Minimal 5 Test Unit:** Terdapat **6 test unit** yang lolos (`BookForm.test.js` dan `BookItem.test.js`) menggunakan Jest dan React Testing Library.
* [x] **Error Handling Form:** Form tambah buku memiliki validasi untuk memastikan semua *field* terisi sebelum *submit*.
* [x] **Struktur Folder Modular:** Kode diorganisir ke dalam folder `components/`, `pages/`, `hooks/`, dan `context/`.

---

## ⚙️ Instruksi Instalasi dan Menjalankan

1.  **Clone repository ini:**
    ```bash
    git clone [URL_GITHUB_ANDA]
    ```

2.  **Masuk ke direktori proyek:**
    ```bash
    cd [NAMA_FOLDER_PROYEK_ANDA]
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Jalankan aplikasi (Development):**
    ```bash
    npm start
    ```
    Buka `http://localhost:3000` di browser Anda.

5.  **Jalankan Test Unit:**
    ```bash
    npm test
    ```
