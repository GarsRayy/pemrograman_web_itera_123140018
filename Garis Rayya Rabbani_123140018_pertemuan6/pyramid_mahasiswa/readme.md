# Pyramid Mahasiswa API

Aplikasi RESTful API sederhana untuk pengelolaan data mahasiswa menggunakan **Pyramid Framework** dan **PostgreSQL**. Proyek ini dibuat untuk memenuhi tugas Praktikum Pemrograman Web Institut Teknologi Sumatera (ITERA).

## 👤 Identitas Pengembang
* **Nama:** Garis Rayya Rabbani
* **NIM:** 123140018
* **Program Studi:** Teknik Informatika

## 🚀 Fitur
* **CRUD Mahasiswa:** Membuat, Membaca, Memperbarui, dan Menghapus data mahasiswa.
* **Validasi Input:** Memastikan data yang dikirim sesuai format (JSON).
* **Database:** Integrasi dengan PostgreSQL menggunakan SQLAlchemy ORM.
* **Migrasi:** Manajemen skema database menggunakan Alembic.

## 🛠️ Teknologi yang Digunakan
* Python 3.x
* Pyramid Framework
* SQLAlchemy (ORM)
* PostgreSQL (Database)
* Alembic (Database Migration)
* Waitress (WSGI Server)

## ⚙️ Persiapan & Instalasi (Setup)

Ikuti langkah-langkah berikut untuk menjalankan proyek di komputer lokal:

### 1. Clone Repository
```bash
git clone [https://github.com/garsrayya/pemrograman_web_itera_123140018.git](https://github.com/USERNAME_GITHUB_KAMU/pemrograman_web_itera_123140018.git)
cd pemrograman_web_itera_123140018/pyramid_mahasiswa
```

### 2. Buat Virtual Environment
Windows (PowerShell)
```bash
python -m venv venv
venv\Scripts\activate
```
3. Install Dependensi
```bash
pip install -e ".[testing]"
pip install psycopg2-binary
```

4. Konfigurasi Database PostgreSQL
Pastikan PostgreSQL telah berjalan.
Masuk ke PostgreSQL shell:
```bash
psql -U postgres
```

Lalu jalankan:
```sql
CREATE DATABASE pyramid_mahasiswa;
CREATE USER pyramid_user WITH ENCRYPTED PASSWORD 'pyramid_pass';
GRANT ALL PRIVILEGES ON DATABASE pyramid_mahasiswa TO pyramid_user;

\c pyramid_mahasiswa;

GRANT USAGE, CREATE ON SCHEMA public TO pyramid_user;
ALTER SCHEMA public OWNER TO pyramid_user;
GRANT ALL ON TABLES TO pyramid_user;
GRANT ALL ON SEQUENCES TO pyramid_user;
```

5. Migrasi & Seeding Data
Jalankan migrasi:
```bash
alembic -c development.ini upgrade head
```

Inisialisasi data awal (Budi Santoso & Siti Aminah):
```bash
python -m pyramid_mahasiswa.scripts.initialize_db development.ini
```

▶️ Menjalankan Aplikasi

Gunakan pserve:
```bash
pserve development.ini --reload
```

Aplikasi berjalan di:

```bash
http://localhost:6543
```
