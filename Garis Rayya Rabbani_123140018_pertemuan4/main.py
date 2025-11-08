def hitung_nilai_akhir(uts, uas, tugas):
    return (0.30 * uts) + (0.40 * uas) + (0.30 * tugas)

def tentukan_grade(nilai_akhir):
    if nilai_akhir >= 80: 
        return 'A'
    elif nilai_akhir >= 70:
        return 'B'
    elif nilai_akhir >= 60:
        return 'C'
    elif nilai_akhir >= 50:
        return 'D'
    else:
        return 'E'


def tampilkan_tabel(data_mahasiswa):
    print("-" * 75)
    print(f"{'NIM':<12} | {'Nama':<20} | {'UTS':<5} | {'UAS':<5} | {'Tugas':<5} | {'Akhir':<6} | {'Grade':<5}")
    print("-" * 75)
    for mhs in data_mahasiswa:
        nilai_akhir = hitung_nilai_akhir(mhs['nilai_uts'], mhs['nilai_uas'], mhs['nilai_tugas'])
        grade = tentukan_grade(nilai_akhir)
        print(f"{mhs['nim']:<12} | {mhs['nama']:<20} | {mhs['nilai_uts']:<5} | {mhs['nilai_uas']:<5} | {mhs['nilai_tugas']:<5} | {nilai_akhir:<6.2f} | {grade:<5}")
    print("-" * 75)

def cari_tertinggi_terendah(data_mahasiswa):
    if not data_mahasiswa:
        return None, None

    tertinggi = data_mahasiswa[0]
    terendah = data_mahasiswa[0]

    for mhs in data_mahasiswa:
        na_mhs = hitung_nilai_akhir(mhs['nilai_uts'], mhs['nilai_uas'], mhs['nilai_tugas'])
        na_tertinggi = hitung_nilai_akhir(tertinggi['nilai_uts'], tertinggi['nilai_uas'], tertinggi['nilai_tugas'])
        na_terendah = hitung_nilai_akhir(terendah['nilai_uts'], terendah['nilai_uas'], terendah['nilai_tugas'])

        if na_mhs > na_tertinggi:
            tertinggi = mhs
        if na_mhs < na_terendah:
            terendah = mhs
            
    return tertinggi, terendah


def tambah_mahasiswa(data_mahasiswa):
    print("\n--- Tambah Data Mahasiswa ---")
    nim = input("Masukkan NIM: ")
    nama = input("Masukkan Nama: ")
    try:
        uts = float(input("Nilai UTS: "))
        uas = float(input("Nilai UAS: "))
        tugas = float(input("Nilai Tugas: "))
        data_mahasiswa.append({
            "nim": nim,
            "nama": nama,
            "nilai_uts": uts,
            "nilai_uas": uas,
            "nilai_tugas": tugas
        })
        print("Data berhasil ditambahkan!")
    except ValueError:
        print("Input nilai harus berupa angka.")

def filter_berdasarkan_grade(data_mahasiswa, target_grade):
    """Memfilter dan menampilkan mahasiswa berdasarkan grade tertentu."""
    print(f"\n--- Mahasiswa dengan Grade {target_grade} ---")
    filtered_data = []
    for mhs in data_mahasiswa:
        na = hitung_nilai_akhir(mhs['nilai_uts'], mhs['nilai_uas'], mhs['nilai_tugas'])
        if tentukan_grade(na) == target_grade:
            filtered_data.append(mhs)
    
    if filtered_data:
        tampilkan_tabel(filtered_data)
    else:
        print(f"Tidak ada mahasiswa dengan grade {target_grade}.")

def hitung_rata_rata_kelas(data_mahasiswa):
    if not data_mahasiswa:
        return 0
    total_nilai = 0
    for mhs in data_mahasiswa:
        total_nilai += hitung_nilai_akhir(mhs['nilai_uts'], mhs['nilai_uas'], mhs['nilai_tugas'])
    return total_nilai / len(data_mahasiswa)

data_kelas = [
    {"nim": "123140001", "nama": "Budi Santoso", "nilai_uts": 85, "nilai_uas": 80, "nilai_tugas": 90},
    {"nim": "123140002", "nama": "Siti Aminah", "nilai_uts": 95, "nilai_uas": 90, "nilai_tugas": 95},
    {"nim": "123140003", "nama": "Rudi Hermawan", "nilai_uts": 60, "nilai_uas": 55, "nilai_tugas": 70},
    {"nim": "123140004", "nama": "Dewi Lestari", "nilai_uts": 75, "nilai_uas": 70, "nilai_tugas": 80},
    {"nim": "123140005", "nama": "Andi Wijaya", "nilai_uts": 45, "nilai_uas": 40, "nilai_tugas": 50},
    {"nim": "123140018", "nama": "Garis Rayya Rabbani", "nilai_uts": 100, "nilai_uas": 100, "nilai_tugas": 100}
]

while True:
    print("\n=== Sistem Pengelolaan Nilai Mahasiswa ===")
    print("1. Tampilkan Semua Data")
    print("2. Tambah Mahasiswa")
    print("3. Cari Nilai Tertinggi & Terendah")
    print("4. Filter berdasarkan Grade")
    print("5. Tampilkan Rata-rata Kelas")
    print("6. Keluar")
    
    pilihan = input("Pilih menu (1-6): ")
    
    if pilihan == '1':
        tampilkan_tabel(data_kelas)
    elif pilihan == '2':
        tambah_mahasiswa(data_kelas)
    elif pilihan == '3':
        tertinggi, terendah = cari_tertinggi_terendah(data_kelas)
        if tertinggi and terendah:
            na_tinggi = hitung_nilai_akhir(tertinggi['nilai_uts'], tertinggi['nilai_uas'], tertinggi['nilai_tugas'])
            na_rendah = hitung_nilai_akhir(terendah['nilai_uts'], terendah['nilai_uas'], terendah['nilai_tugas'])
            print(f"\nNilai Tertinggi: {tertinggi['nama']} ({na_tinggi:.2f})")
            print(f"Nilai Terendah: {terendah['nama']} ({na_rendah:.2f})")
    elif pilihan == '4':
        grade_dicari = input("Masukkan Grade yang dicari (A/B/C/D/E): ").upper()
        filter_berdasarkan_grade(data_kelas, grade_dicari)
    elif pilihan == '5':
        rata_rata = hitung_rata_rata_kelas(data_kelas)
        print(f"\nRata-rata Nilai Akhir Kelas: {rata_rata:.2f}")
    elif pilihan == '6':
        print("Terima kasih telah menggunakan program ini.")
        break
    else:
        print("Pilihan tidak valid, silakan coba lagi.")