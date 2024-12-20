// keranjang belanja
document.addEventListener("DOMContentLoaded", () => {
  // DOMContentLoaded berfungsi menunggu semua hlmn termuat sebelum menjalankan kode ini
  feather.replace(); // Inisialisasi Feather Icons

  // ambil elemen shopping-cart dan cart-icon
  const shoppingCart = document.querySelector(".shopping-cart");
  const cartIcon = document.querySelector(".cart-icon");

  // ketika tombol keranjang di klik
  if (cartIcon && shoppingCart) {
    cartIcon.onclick = () => {
      shoppingCart.classList.toggle("active");
    };
  } else {
    console.error("Elemen shopping-cart atau cart-icon tidak ditemukan");
  }
});

document.addEventListener("alpine:init", () => {
  // alpine untukproduk
  Alpine.data("products", () => ({
    items: [
      // array
      { id: 1, name: "Headphone", img: "1.png", price: 178000, location: "Lampung", star: "4.5 | 4rb+ terjual" }, //objek
      { id: 2, name: "Tas Slempang", img: "2.png", price: 59000, location: "Bandung", star: "4.8 | 1rb+ terjual" }, //objek
      { id: 3, name: "Handphone", img: "3.png", price: 1897500, location: " Jakarta Pusat", star: "4.3 | 567+ terjual" }, //objek
      { id: 4, name: "Tisu Passeo", img: "4.png", price: 36700, location: "Yogyakarta", star: "4.5 | 678+ terjual" },
      { id: 5, name: "Mouse PC", img: "5.png", price: 165000, location: "Blora", star: "4.9 | 3rb+ terjual" },
      { id: 6, name: "Sari Roti", img: "6.png", price: 17000, location: "Banyuwangi", star: "4.8 | 667+ terjual" },
      { id: 7, name: "Indomie", img: "7.png", price: 90000, location: "NTB", star: "4.9 | 5rb+ terjual" },
      { id: 8, name: "Sepatu Wanita", img: "8.png", price: 205000, location: "Bali", star: "4.5 | 6rb+ terjual" },
      { id: 9, name: "Rak Sepatu", img: "9.png", price: 57000, location: "Sidoarjo", star: "4.3 | 1rb+ terjual" },
      { id: 10, name: "Gitar", img: "10.png", price: 150000, location: "Tangerang", star: "4.6 | 256 terjual" },
      { id: 11, name: "Bedak OMG", img: "11.png", price: 37000, location: "Kediri", star: "4.5 | 3rb+ terjual" },
      { id: 12, name: "Jas Hujan", img: "12.png", price: 270000, location: "Pagar Alam", star: "4.5 | 7rb+ terjual" },
      { id: 13, name: "Teh Sariwangi", img: "13.png", price: 7000, location: "Pontianak", star: "4.5 | 2rb+ terjual" },
      { id: 14, name: "Kaos Pria", img: "14.png", price: 69000, location: "Makassar", star: "4.5 | 67+ terjual" },
      { id: 15, name: "Sarung tangan jalan", img: "15.png", price: 15000, location: "Semarang", star: "4.5 | 1rb+ terjual" },
      { id: 16, name: "Hoodie", img: "16.png", price: 158000, location: "Probolinggo", star: "4.5 | 3rb+ terjual" },
      { id: 17, name: "Mangkuk Mahoni", img: "17.png", price: 13000, location: "Tuban", star: "4.5 | 8rb+ terjual" },
      { id: 18, name: "Parfum Sauvage", img: "18.png", price: 47000, location: "Palangkaraya", star: "4.5 | 1rb+ terjual" },
      { id: 19, name: "Make Up", img: "19.png", price: 112000, location: "Banten", star: "4.5 | 4rb+ terjual" },
      { id: 20, name: "Cat Bag", img: "20.png", price: 200000, location: "Jember", star: "4.8 | 567+ terjual" },
      { id: 21, name: "Excel Snack Kucing", img: "21.png", price: 45000, location: "Surabaya", star: "4.5 | 4rb+ terjual" },
      { id: 22, name: "Kaos Remaja Sablon", img: "22.png", price: 99000, location: "Bekasi", star: "4.7 | 1rb+ terjual" },
      { id: 23, name: "Helm", img: "23.png", price: 135000, location: "Pekalongan", star: "4.8 | 8rb+ terjual" },
      { id: 24, name: "Masker Earlop", img: "24.png", price: 18000, location: "Samarinda", star: "4.5 | 4rb+ terjual" },
      { id: 25, name: "Spatula", img: "25.png", price: 20000, location: "Jambi", star: "4.5 | 7rb+ terjual" },
    ],
  }));
  //alpine untuk keranjang
  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // menambah jumlah item
      // mengecek jika ada barang yg sama di cart
      const cartItem = this.items.find((item) => item.id === newItem.id);

      // jika belum ada barangnya
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // jika barang sudah ada, mengecek apakah barang sama dgn yg ada di cart
        this.items = this.items.map((item) => {
          // jika barang berbeda
          if (item.id !== newItem.id) {
            return item;
          } else {
            // jika barang sudah ada, tambah quantity dan total
            item.quantity++;
            item.total = item.price * item.quantity; // menghitung harga buat item
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    // form validation
    less(id) {
      // mengurangi jumlah item
      const cartItem = this.items.find((item) => item.id === id);
      // jika item lebih dari 1
      if (cartItem && cartItem.quantity > 1) {
        this.items = this.items.map((item) => {
          //jika bukan barang yg di klik atau jika id nya tidk sama
          if (item.id !== id) {
            return item;
          } else {
            // mengurangi quantity dan total
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else {
        // jika quantity kurang dari 1 atau 0, tampilkan peringatan
        alert("Jumlah produk tidak boleh kurang dari 1!");
      }
    },
    hapussemua() {
      // mereset semua item
      this.items = []; // mengosongkan item
      this.total = 0; // mereset total belanja
      this.quantity = 0; // mereset jumlah item
    },
    checkout() {
      const inputs = document.querySelectorAll("#checkout input, #checkout select"); // mengambi semua input dan select yg ada di kelas checkout
      // mengubah input menjadi array
      let formKomplit = Array.from(inputs).every((input) => input.value.trim() !== ""); // mengambi setiap inputan dengan every
      if (formKomplit) {
        alert(`Anda harus membayar: Rp${this.total.toLocaleString()}`);
        alert("Checkout berhasil! Terimakasih sudah berbelanja di toko kami!");
        // panggil this.hapussemua() untuk mengosongkan cart stelah checkout
        this.hapussemua();
      } else {
        alert("Error! Harap isi semua field sebeum checkout.");
      }
    },
    remove(itemtoRemove) {
      // mengahapus setiap item, saya beri nama itemtoRemove
      this.items = this.items.filter((item) => item.id !== itemtoRemove.id); // metode filter hanya untuk elemen tertentu
      // memperbarui total dan jumlah barang setelah penghapusan\
      this.total -= itemtoRemove.price * itemtoRemove.quantity;
      this.quantity -= itemtoRemove.quantity;
    },
  });
});

// payment method ketika kartu kredit di klik
document.addEventListener("DOMContentLoaded", function () {
  const pilihPembayaran = document.querySelector("#payment");
  const expiredLabel = document.querySelectorAll(".expired-label");

  pilihPembayaran.addEventListener("change", function () {
    if (this.value === "Kartu Kredit") {
      // tampilkan elemen tanggal dan tahun kadaluarsa
      expiredLabel.forEach((label) => (label.style.display = "block"));
    } else {
      // sembunyikan elemen tanggal dan tahun kdaluarsa
      expiredLabel.forEach((label) => (label.style.display = "none"));
    }
  });
});

//  tambahkan ke keranjang
function myCart(button) {
  alert("Pesanan berhasil ditambahkan");
  button.innerHTML = "Ditambahkan ke keranjang";
}
