def kalkulasi_akhir(uts, uas, tugas):
    return (0.3 * uts) + (0.4 * uas) + (0.3 * tugas)

def konversi_grade(nilai):
    """Mengkonversi nilai akhir menjadi grade huruf."""
    if nilai >= 80: return 'A'
    elif nilai >= 70: return 'B'
    elif nilai >= 60: return 'C'
    elif nilai >= 50: return 'D'
    else: return 'E'

# --- Fungsi Tampilan & Laporan ---

def cetak_daftar_nilai(daftar_mhs):
    """Mencetak tabel daftar nilai mahasiswa."""
    print("\n" + "=" * 65)
    print(f"{'NIM':<10} | {'Nama Lengkap':<25} | {'Akhir':<6} | {'Grade':<6}")
    print("=" * 65)
    for mhs in daftar_mhs:
        na = kalkulasi_akhir(mhs['uts'], mhs['uas'], mhs['tugas'])
        grade = konversi_grade(na)
        print(f"{mhs['nim']:<10} | {mhs['nama']:<25} | {na:<6.2f} | {grade:<6}")
    print("=" * 65)

def laporan_ekstrem(daftar_mhs):
    """Menampilkan mahasiswa dengan nilai tertinggi dan terendah."""
    if not daftar_mhs:
        print("\nData masih kosong.")
        return

    # Inisialisasi dengan data pertama
    max_mhs = min_mhs = daftar_mhs[0]
    max_na = kalkulasi_akhir(max_mhs['uts'], max_mhs['uas'], max_mhs['tugas'])
    min_na = max_na

    for mhs in daftar_mhs[1:]:
        na = kalkulasi_akhir(mhs['uts'], mhs['uas'], mhs['tugas'])
        if na > max_na:
            max_na = na
            max_mhs = mhs
        if na < min_na:
            min_na = na
            min_mhs = mhs
            
    print("\n--- Laporan Nilai Ekstrem ---")
    print(f"Tertinggi : {max_mhs['nama']} ({max_na:.2f})")
    print(f"Terendah  : {min_mhs['nama']} ({min_na:.2f})")

def laporan_rata_rata(daftar_mhs):
    """Menghitung dan menampilkan rata-rata nilai kelas."""
    if not daftar_mhs:
        print("\nData kosong, rata-rata 0.")
        return 0
    
    total = sum(kalkulasi_akhir(m['uts'], m['uas'], m['tugas']) for m in daftar_mhs)
    rata2 = total / len(daftar_mhs)
    print(f"\n>>> Rata-rata Nilai Kelas: {rata2:.2f}")
    return rata2

# --- Fungsi Fitur Tambahan ---

def input_mahasiswa_baru(daftar_mhs):
    """Meminta input user untuk menambahkan data mahasiswa baru."""
    print("\n--- Input Data Baru ---")
    nim_baru = input("NIM : ")
    nama_baru = input("Nama: ")
    try:
        uts_baru = float(input("Nilai UTS  : "))
        uas_baru = float(input("Nilai UAS  : "))
        tgs_baru = float(input("Nilai Tugas: "))
        daftar_mhs.append({
            "nim": nim_baru, "nama": nama_baru,
            "uts": uts_baru, "uas": uas_baru, "tugas": tgs_baru
        })
        print(">>> Data berhasil disimpan.")
    except ValueError:
        print(">>> Error: Nilai harus berupa angka!")

def cari_by_grade(daftar_mhs):
    """Mencari dan menampilkan mahasiswa berdasarkan grade inputan."""
    target = input("\nMasukkan Grade yang dicari (A-E): ").upper()
    hasil_cari = [
        m for m in daftar_mhs 
        if konversi_grade(kalkulasi_akhir(m['uts'], m['uas'], m['tugas'])) == target
    ]
    
    if hasil_cari:
        print(f"\n--- Hasil Pencarian Grade {target} ---")
        cetak_daftar_nilai(hasil_cari)
    else:
        print(f"\n>>> Tidak ditemukan mahasiswa dengan grade {target}.")

# --- Main Program ---

# Dataset awal (5 data)
database_nilai = [
    {"nim": "14115021", "nama": "Iqbal Ramadhan", "uts": 82, "uas": 78, "tugas": 85},
    {"nim": "14115022", "nama": "Vanesha Prescilla", "uts": 90, "uas": 88, "tugas": 95},
    {"nim": "14115023", "nama": "Jefri Nichol", "uts": 65, "uas": 60, "tugas": 70},
    {"nim": "14115024", "nama": "Mawar Eva", "uts": 75, "uas": 72, "tugas": 80},
    {"nim": "14115025", "nama": "Angga Yunanda", "uts": 55, "uas": 50, "tugas": 60}
]

# Loop Menu Utama
while True:
    print("\n=== APLIKASI MANAJEMEN NILAI ===")
    print("[1] Lihat Daftar Nilai")
    print("[2] Input Data Baru")
    print("[3] Laporan Nilai Tertinggi/Terendah")
    print("[4] Cari Berdasarkan Grade")
    print("[5] Hitung Rata-rata Kelas")
    print("[0] Keluar")
    
    aksi = input("Pilih menu > ")

    if aksi == '1':
        cetak_daftar_nilai(database_nilai)
    elif aksi == '2':
        input_mahasiswa_baru(database_nilai)
    elif aksi == '3':
        laporan_ekstrem(database_nilai)
    elif aksi == '4':
        cari_by_grade(database_nilai)
    elif aksi == '5':
        laporan_rata_rata(database_nilai)
    elif aksi == '0':
        print("Program selesai. Sampai jumpa!")
        break
    else:
        print("Pilihan tidak tersedia.")