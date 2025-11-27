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
git clone [https://github.com/USERNAME_GITHUB_KAMU/pemrograman_web_itera_123140018.git](https://github.com/USERNAME_GITHUB_KAMU/pemrograman_web_itera_123140018.git)
cd pemrograman_web_itera_123140018/pyramid_mahasiswa

2. Buat Virtual EnvironmentDisarankan menggunakan virtual environment agar dependensi tidak tercampur.Windows:PowerShellpython -m venv venv
venv\Scripts\activate
macOS/Linux:Bashpython3 -m venv venv
source venv/bin/activate
3. Install DependensiInstall paket proyek dalam mode development beserta driver database.Bashpip install -e ".[testing]"
pip install psycopg2-binary
4. Konfigurasi Database PostgreSQLPastikan PostgreSQL sudah berjalan. Buat database dan user sesuai konfigurasi di development.ini.Masuk ke PostgreSQL shell (psql -U postgres) dan jalankan perintah berikut:SQLCREATE DATABASE pyramid_mahasiswa;
CREATE USER pyramid_user WITH ENCRYPTED PASSWORD 'pyramid_pass';
GRANT ALL PRIVILEGES ON DATABASE pyramid_mahasiswa TO pyramid_user;

\c pyramid_mahasiswa

GRANT USAGE, CREATE ON SCHEMA public TO pyramid_user;
ALTER SCHEMA public OWNER TO pyramid_user;
GRANT ALL ON TABLES TO pyramid_user;
GRANT ALL ON SEQUENCES TO pyramid_user;
5. Migrasi & Seeding DataJalankan migrasi untuk membuat tabel dan script inisialisasi untuk mengisi data awal (dummy).Bash# Membuat tabel di database
alembic -c development.ini upgrade head

# Mengisi data awal (Budi Santoso & Siti Aminah)
python -m pyramid_mahasiswa.scripts.initialize_db development.ini
▶️ Menjalankan AplikasiJalankan server development menggunakan pserve:Bashpserve development.ini --reload
Server akan berjalan di: http://localhost:6543📡 Dokumentasi APIBerikut adalah daftar endpoint API yang tersedia:MethodEndpointDeskripsiContoh Body (JSON)GET/api/mahasiswaMengambil semua data mahasiswa-GET/api/mahasiswa/{id}Mengambil detail mahasiswa berdasarkan ID-POST/api/mahasiswaMenambahkan mahasiswa baruLihat di bawahPUT/api/mahasiswa/{id}Mengupdate data mahasiswaLihat di bawahDELETE/api/mahasiswa/{id}Menghapus data mahasiswa-Contoh JSON RequestPOST (Tambah Data):JSON{
  "nim": "123140018",
  "nama": "Garis Rayya Rabbani",
  "jurusan": "Teknik Informatika",
  "tanggal_lahir": "2003-01-01",
  "alamat": "Bandar Lampung"
}
PUT (Update Data):JSON{
  "jurusan": "Sains Data",
  "alamat": "Jakarta Selatan"
}
🧪 Pengujian (Testing)Anda dapat menguji API menggunakan curl, Postman, atau VS Code REST Client.Contoh command curl (PowerShell):PowerShellcurl.exe -X GET http://localhost:6543/api/mahasiswa