Tentu, ini adalah versi `README.md` yang sudah diperbaiki formatnya dan sedikit disempurnakan agar lebih rapi dan jelas.

-----

# 🚀 Personal Dashboard (ES6+ Version)

Aplikasi web *single-page* yang berfungsi sebagai *personal dashboard* sederhana. Aplikasi ini menampilkan *widget* waktu WIB yang disinkronkan dengan API eksternal dan menyediakan fitur manajemen "Catatan Cepat" yang interaktif (Tambah, Edit, Hapus).

Proyek ini dibangun sebagai bagian dari tugas praktikum Pengembangan Aplikasi Web, dengan penekanan pada penggunaan fitur-fitur modern JavaScript (ES6+). Data catatan disimpan secara lokal menggunakan `localStorage`.

-----

## 📸 Screenshot Aplikasi

Berikut adalah tampilan antarmuka dari aplikasi Personal Dashboard:

**Tampilan Utama**<br>
<img width="847" height="337" alt="image" src="https://github.com/user-attachments/assets/5e56a50b-edb2-466d-9a0f-e16ce9c4defc" />

**Mode Edit Catatan**<r>
<img width="844" height="468" alt="image" src="https://github.com/user-attachments/assets/471dda37-bf3c-4e9c-9e0a-d20e78c087b7" />


-----

## 🚦 Cara Menjalankan Aplikasi

1.  **Unduh File**: Pastikan Anda memiliki file `index.html` dan `script.js`.

2.  **Simpan di Folder yang Sama**: Letakkan kedua file tersebut dalam satu direktori (folder).

3.  **Buka di Browser via Server Lokal (Penting\!)**:

      * **Metode 1 (VS Code Live Server)**: Jika Anda menggunakan Visual Studio Code, install ekstensi "Live Server". Klik kanan pada file `index.html` dan pilih "Open with Live Server".
      * **Metode 2 (Python)**: Buka terminal di folder proyek Anda dan jalankan `python -m http.server`. Lalu buka browser ke `http://localhost:8000`.
      * **Metode 3 (Node.js)**: Jika Anda punya Node.js, install `serve` global (`npm install -g serve`), buka terminal di folder proyek, dan jalankan `serve`. Buka alamat yang ditampilkan.

    ***Catatan:** Menjalankan via server lokal diperlukan agar fitur `fetch` untuk mengambil waktu dari API eksternal dapat berfungsi karena aturan CORS browser.*

-----

## ✨ Daftar Fitur ES6+ yang Diimplementasikan

Aplikasi ini secara aktif menggunakan fitur-fitur modern JavaScript berikut:

1.  **`let` dan `const`**:
      * `const` digunakan secara luas untuk mendeklarasikan variabel yang referensinya tidak berubah (elemen DOM, fungsi).
      * `let` digunakan untuk variabel *state* `notes` dan `serverTime` yang nilainya dapat diubah.
2.  **Arrow Functions (`=>`)**:
      * Digunakan untuk semua *callback* *event listener* (`(e) => {...}`) dan fungsi utilitas seperti `updateStats`, `renderNotes`, `saveNotes`, `loadNotes`, `resetForm`, `updateClockDisplay`, dan `startClock`.
3.  **Template Literals (Backticks \` \`)**:
      * Digunakan untuk membuat string HTML dinamis saat merender *widget* waktu (`${timeString}`) dan setiap item catatan (`${note.text}`, `${timeStr}`, dll.).
4.  **Classes**:
      * `class Note { constructor(text) {...} }` digunakan sebagai *blueprint* untuk membuat objek catatan baru, memastikan setiap catatan memiliki `id`, `text`, dan `createdAt`.
5.  **Fungsi Asinkron (`async`/`await`)**:
      * Fungsi `fetchTime = async () => {...}` menggunakan `async` untuk menandakan operasi asinkron.
      * Kata kunci `await` digunakan saat memanggil `fetch()` untuk menunggu respons dari API `worldtimeapi.org` tanpa memblokir *thread* utama.
      * Blok `try...catch` digunakan untuk menangani potensi *error* jaringan saat mengambil data waktu.

-----

## 🛠️ Penjelasan Teknis

### 1\. Penggunaan `localStorage`

Data catatan dibuat persisten menggunakan `localStorage` browser:

  * **Penyimpanan**: Setiap kali ada perubahan pada array `notes` (setelah menambah, mengedit, atau menghapus), fungsi `saveNotes()` dipanggil. Fungsi ini menggunakan `JSON.stringify(notes)` untuk mengubah array menjadi string dan menyimpannya di `localStorage` dengan kunci `personalDashboardNotes`.
  * **Pemuatan**: Saat aplikasi pertama kali dimuat, fungsi `loadNotes()` dipanggil. Fungsi ini mencoba mengambil string data dari `localStorage` menggunakan kunci `personalDashboardNotes`. Jika ada, `JSON.parse()` digunakan untuk mengubah string kembali menjadi array `notes`.

### 2\. Validasi Form

Validasi input sederhana diterapkan pada form catatan:

  * **HTML `required`**: Atribut `required` pada elemen `<input id="note-input">` mencegah form disubmit jika input kosong (validasi sisi klien oleh browser).
  * **JavaScript `trim() === ''`**: Di dalam *event listener* `submit` pada `noteForm`, nilai input diambil dan `.trim()` digunakan untuk menghapus spasi di awal/akhir. Jika hasilnya string kosong (`''`), fungsi akan berhenti (`return`), mencegah penambahan atau penyimpanan catatan kosong.
