# TaskMaster: Aplikasi Manajemen Tugas Mahasiswa

Aplikasi web modern dan interaktif yang dirancang untuk membantu mahasiswa mengelola semua tugas akademik mereka dengan lebih efisien. Dengan antarmuka yang elegan dan fungsionalitas yang lengkap, TaskMaster membuat proses pencatatan, pengeditan, dan pelacakan tugas menjadi lebih mudah dan menyenangkan.

Aplikasi ini dibangun dengan HTML, CSS (Tailwind CSS & kustom), dan JavaScript murni, serta memanfaatkan `localStorage` browser untuk menyimpan data secara lokal.

## Screenshot Aplikasi

Berikut adalah beberapa tangkapan layar yang menunjukkan fitur-fitur utama dari aplikasi TaskMaster.

**1. Tampilan Utama dengan Daftar Tugas**<br>
<img width="600" height="512" alt="image" src="https://github.com/user-attachments/assets/fdced66a-7949-498d-9b9d-1c932f3d49f4" />

**2. Mode Edit Tugas**<br>
<img width="881" height="547" alt="image" src="https://github.com/user-attachments/assets/407ecbf7-2715-416d-a5d5-c2ee65f32880" />

**3. Fitur Filter dan Pencarian Aktif**<br>
<img width="532" height="430" alt="image" src="https://github.com/user-attachments/assets/dba85e12-9b52-4cab-8252-577cbb6b396b" />


## Cara Menjalankan Aplikasi

1.  **Unduh Repository**: Unduh atau *clone* semua file dari repository ini.
2.  **Struktur Folder**: Pastikan file `index.html` dan `script.js` berada dalam satu folder yang sama.
3.  **Buka di Browser**: Buka file `index.html` menggunakan browser web modern seperti Google Chrome, Mozilla Firefox, atau Microsoft Edge.
4.  **Selesai\!** Aplikasi siap digunakan. Semua tugas yang Anda tambahkan akan tersimpan secara otomatis di browser Anda.

## Daftar Fitur yang Telah Diimplementasikan

  -  **CRUD Penuh**:
      - **Create**: Menambahkan tugas baru melalui form interaktif.
      - **Read**: Menampilkan semua tugas dalam bentuk kartu yang informatif.
      - **Update**: Mengedit detail tugas (nama, matkul, deadline, catatan) dan menandai tugas sebagai selesai/belum selesai.
      - **Delete**: Menghapus tugas yang sudah tidak diperlukan.
  -  **Penyimpanan Lokal**: Data tugas disimpan secara permanen di `localStorage`, sehingga tidak akan hilang saat browser ditutup atau halaman di-refresh.
  -  **Statistik Real-time**: Menampilkan jumlah total tugas, tugas yang belum selesai, dan tugas yang sudah selesai.
  -  **Filter dan Pencarian**:
      - Filter tugas berdasarkan status (Semua, Belum Selesai, Selesai).
      - Pencarian *real-time* berdasarkan nama tugas atau mata kuliah.
  -  **Validasi Form Lanjutan**: Memastikan semua input wajib diisi dan mencegah pengguna memasukkan tanggal deadline yang sudah lewat.
  -  **UI/UX Modern**:
         Desain *glassmorphism* yang elegan.
      - Peringatan visual untuk tugas yang mendekati deadline (kartu berubah warna merah).
      - Animasi halus saat menambah atau menampilkan tugas.
      - Layout responsif yang beradaptasi dengan baik di perangkat desktop maupun mobile.
  -  **Fitur Tambahan**:
      - Kemampuan untuk menambahkan catatan opsional pada setiap tugas.
      - Tombol "Batal Edit" untuk membatalkan proses pengeditan.

## Penjelasan Teknis

### 1\. Penggunaan `localStorage`

Aplikasi ini menggunakan `localStorage` untuk persistensi data, memastikan pengalaman pengguna yang mulus tanpa kehilangan data.

  - **Penyimpanan Data**: Setiap kali ada perubahan pada data (menambah, mengedit, mengubah status, atau menghapus tugas), array `tasks` yang berisi semua objek tugas akan diubah menjadi format string JSON menggunakan `JSON.stringify()`. String ini kemudian disimpan ke `localStorage` dengan *key* `'tasks'`. Proses ini ditangani oleh fungsi `saveTasks()`.
    ```javascript
    function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    ```
  - **Pengambilan Data**: Saat aplikasi pertama kali dimuat, fungsi `loadTasks()` akan mencoba mengambil data dari `localStorage` dengan *key* `'tasks'`. Jika data ditemukan, string JSON tersebut akan diubah kembali menjadi array objek JavaScript menggunakan `JSON.parse()`. Jika tidak ada data (kunjungan pertama), aplikasi akan menginisialisasi `tasks` sebagai array kosong.
    ```javascript
    function loadTasks() {
      const stored = localStorage.getItem('tasks');
      if (stored) {
        tasks = JSON.parse(stored);
      }
      // ...
    }
    ```

### 2\. Validasi Form

Untuk memastikan integritas data, form input divalidasi secara ketat sebelum data disimpan.

  - **Logika Validasi**: Validasi ditangani oleh fungsi `validateForm(name, course, deadline)`. Fungsi ini melakukan dua pengecekan utama:
    1.  **Input Kosong**: Memastikan bahwa input **Nama Tugas** dan **Mata Kuliah** tidak kosong setelah menghapus spasi di awal dan akhir (`.trim() === ''`).
    2.  **Deadline di Masa Lampau**: Memeriksa apakah tanggal dan waktu `deadline` yang dimasukkan tidak lebih kecil dari tanggal dan waktu saat ini. Ini mencegah pengguna memasukkan tanggal yang sudah lewat.
  - **Umpan Balik Error**: Jika validasi gagal, pesan error yang spesifik akan ditampilkan langsung di bawah input yang salah. Ini dicapai dengan menghapus kelas `hidden` dari elemen paragraf error (misalnya, `#error-name`) dan mengisi `textContent`-nya dengan pesan yang relevan. Jika input valid, pesan error akan disembunyikan kembali.
    ```javascript
    if (name.trim() === '') {
      errorName.textContent = '⚠️ Nama tugas tidak boleh kosong';
      errorName.classList.remove('hidden');
      isValid = false;
    }
    ```
