from abc import ABC, abstractmethod

# --- 1. Abstract Class (Bobot 30%) ---
class LibraryItem(ABC):
    """
    Abstract Base Class yang menjadi dasar semua item.
    """
    def __init__(self, title, item_id):
        # Encapsulation (Bobot 25%): 
        # _title adalah protected (bisa diakses subclass)
        # __item_id adalah private (hanya bisa diakses class ini)
        self._title = title
        self.__item_id = item_id

    # Property Decorator (Syarat wajib)
    @property
    def item_id(self):
        """Getter untuk mengakses private attribute __item_id"""
        return self.__item_id

    @property
    def title(self):
        """Getter untuk title"""
        return self._title

    # Abstract Method (Wajib diimplementasikan oleh subclass)
    @abstractmethod
    def get_details(self):
        pass

# --- 2. Subclasses & Inheritance (Bobot 30%) ---
class Book(LibraryItem):
    def __init__(self, title, item_id, author, pages):
        super().__init__(title, item_id)
        self.author = author
        self.pages = pages

    # Polymorphism (Bobot 20%): Implementasi unik untuk Buku
    def get_details(self):
        return f"[Buku] ID: {self.item_id} | Judul: {self._title} | Penulis: {self.author} ({self.pages} hal)"

class Magazine(LibraryItem):
    def __init__(self, title, item_id, edition, publisher):
        super().__init__(title, item_id)
        self.edition = edition
        self.publisher = publisher

    # Polymorphism (Bobot 20%): Implementasi unik untuk Majalah
    def get_details(self):
        return f"[Majalah] ID: {self.item_id} | Judul: {self._title} | Edisi: {self.edition} | Penerbit: {self.publisher}"

# --- 3. Library Class (Fungsionalitas Program 15%) ---
class Library:
    def __init__(self):
        # Encapsulation: Koleksi disimpan sebagai protected list
        self._collection = []

    def add_item(self, item: LibraryItem):
        """Menambahkan item ke perpustakaan"""
        self._collection.append(item)
        print(f"Berhasil menambahkan: {item.title}")

    def show_items(self):
        """Menampilkan semua item (Polymorphism in action)"""
        print("\n=== Daftar Koleksi Perpustakaan ===")
        if not self._collection:
            print("Koleksi kosong.")
            return

        for item in self._collection:
            # Memanggil method yang sama, tapi output beda tergantung tipe objek
            print(item.get_details()) 
        print("==================================")

    def search_item(self, keyword):
        """Mencari item berdasarkan Judul atau ID"""
        print(f"\nMencari dengan kata kunci: '{keyword}'...")
        found = False
        for item in self._collection:
            # Pencarian case-insensitive
            if keyword.lower() in item.title.lower() or keyword == str(item.item_id):
                print(f"Ditemukan: {item.get_details()}")
                found = True
        
        if not found:
            print("Item tidak ditemukan.")

# --- 4. Main Program (Simulasi) ---
if __name__ == "__main__":
    # Inisialisasi Perpustakaan
    my_library = Library()

    # Membuat objek Buku dan Majalah
    buku1 = Book("Harry Potter", 101, "J.K. Rowling", 500)
    buku2 = Book("Belajar Python OOP", 102, "Guido van Rossum", 300)
    majalah1 = Magazine("National Geographic", 201, "Edisi Alam", "NatGeo Org")

    # Menambahkan ke perpustakaan
    print("--- Menambahkan Item ---")
    my_library.add_item(buku1)
    my_library.add_item(buku2)
    my_library.add_item(majalah1)

    # Menampilkan daftar
    my_library.show_items()

    # Mencari item
    my_library.search_item("Python")  # Cari berdasarkan judul
    my_library.search_item("201")     # Cari berdasarkan ID
    my_library.search_item("Komik")   # Tidak ada