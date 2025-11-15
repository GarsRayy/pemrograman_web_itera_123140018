# Sistem Manajemen Perpustakaan (Library Management System)

![Python](https://img.shields.io/badge/Python-3.x-blue.svg)
![Type](https://img.shields.io/badge/Type-CLI%20Application-green.svg)
![Concept](https://img.shields.io/badge/Concept-OOP-orange.svg)

Proyek ini adalah implementasi sistem manajemen perpustakaan berbasis _Command Line Interface_ (CLI) sederhana. Program ini dibangun menggunakan bahasa pemrograman Python dengan menerapkan paradigma **Object-Oriented Programming (OOP)** secara menyeluruh sesuai dengan modul praktikum.

## 📋 Fitur Utama

Sistem ini memungkinkan pengguna untuk melakukan operasi dasar perpustakaan:
* **Menambah Item**: Mendukung penambahan buku dan majalah ke dalam koleksi.
* **Melihat Koleksi**: Menampilkan seluruh daftar item yang tersimpan dengan detail spesifik masing-masing tipe.
* **Pencarian**: Mencari item berdasarkan judul atau ID unik.

## 🛠 Konsep OOP yang Diterapkan

Kode program ini dirancang untuk mendemonstrasikan empat pilar utama OOP:

1.  **Abstraction (Abstraksi)**
    * Menggunakan `ABC` (*Abstract Base Class*) pada kelas `LibraryItem`.
    * Mendefinisikan *blueprint* metode `get_details()` yang wajib diimplementasikan oleh kelas turunan.

2.  **Inheritance (Pewarisan)**
    * Terdapat dua kelas turunan: `Book` (Buku) dan `Magazine` (Majalah).
    * Keduanya mewarisi atribut dasar (judul, ID) dari kelas induk `LibraryItem`.

3.  **Encapsulation (Enkapsulasi)**
    * Penggunaan *Access Modifiers*:
        * `_title` (Protected): Dapat diakses oleh kelas turunan.
        * `__item_id` (Private): Hanya dapat diakses di dalam kelas pendefinisi.
    * Penerapan `@property` (getter) untuk mengakses atribut private secara aman dari luar kelas.

4.  **Polymorphism (Polimorfisme)**
    * Implementasi metode `get_details()` yang berbeda bentuk pada kelas `Book` dan `Magazine`.
    * Kelas `Library` dapat memproses berbagai tipe objek (`Book` atau `Magazine`) secara seragam dalam satu koleksi.

## 🚀 Cara Menjalankan

Pastikan Python 3.x sudah terinstall di komputer Anda.

1.  **Clone atau Download** repository ini.
2.  Buka terminal dan arahkan ke direktori proyek.
3.  Jalankan perintah berikut:

    ```bash
    python library_system.py
    ```

## 📂 Struktur Kode

* `library_system.py`: File utama yang berisi seluruh definisi kelas dan logika program.

---
**Disusun untuk memenuhi Tugas Praktikum Pemrograman Web - Pertemuan 5.**