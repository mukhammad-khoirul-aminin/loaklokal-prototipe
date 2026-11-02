    // 1. Ambil ID dari parameter URL (misal: detail-barang.html?id=1)
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = parseInt(urlParams.get("id"));

    // 2. Siapkan data default (sama seperti di beranda.html)
    const defaultItems = [
    {
        id: 1,
        nama: "Lemari Kayu Vintage",
        mode: "Jual Murah",
        harga: "Rp 45.000",
        lokasi: "Kediri (1.2 km)",
        gambar:
        "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=800&q=80",
        deskripsi:
        "Kondisi bekas baik, bahan kayu jati asli. Cocok untuk dekorasi ruangan bergaya vintage.",
    },
    {
        id: 2,
        nama: "Kipas Angin Berdiri",
        mode: "Hibah Gratis",
        harga: "Gratis",
        lokasi: "Kediri (0.8 km)",
        gambar:
        "https://images.unsplash.com/photo-1565159067345-0d027f30325f?auto=format&fit=crop&w=800&q=80",
        deskripsi:
        "Normal, hanya tombol angin nomor 1 agak keras. Hibah karena mau pindahan kos.",
    },
    ];

    // 3. Ambil data upload pengguna dari LocalStorage
    const localItems = JSON.parse(localStorage.getItem("loakItems")) || [];

    // 4. Gabungkan semua data
    const allItems = [...localItems, ...defaultItems];

    // 5. Cari barang berdasarkan ID
    const item = allItems.find((i) => i.id === itemId);

    const container = document.getElementById("detailContainer");

    // 6. Tampilkan data ke halaman
    if (item) {
    const isGratis =
        item.harga.toLowerCase() === "gratis" ||
        item.harga === "0" ||
        item.harga === "Rp 0";
    const displayHarga = isGratis ? "Gratis" : item.harga;
    const deskripsiTeks =
        item.deskripsi || "Tidak ada deskripsi tambahan untuk barang ini.";

    container.innerHTML = `
            <div class="detail-image">
            <img src="${item.gambar}" alt="${item.nama}">
            </div>
            
            <div class="detail-info">
            <h2 class="detail-title">${item.nama}</h2>
            <div class="detail-price-loc">
                <span class="price-tag">${displayHarga}</span> 
                <span>- ${item.lokasi}</span>
            </div>
            
            <hr>
            
            <p class="detail-cod"><strong>Waktu COD :</strong> Hari Ini</p>
            
            <div class="detail-desc">
                <strong>Deskripsi & Kondisi:</strong><br>
                ${deskripsiTeks}
            </div>

            <div class="seller-profile">
                <div class="seller-avatar">
                <span class="verified-badge">✔️</span>
                </div>
                <div class="seller-name">Pengguna Lokal (Verified)</div>
            </div>

            <div class="action-buttons">
                <a href="pesan.html" class="btn-action">Chat</a>
                <a href="form-cod.html" class="btn-action">Tawar/ Ambil</a>
            </div>
            </div>
        `;
    } else {
    // Jika barang tidak ditemukan (ID salah atau diakses langsung tanpa parameter)
    container.innerHTML = `
            <div class="not-found">
            <h3>Barang tidak ditemukan atau telah dihapus.</h3>
            <p style="margin-top: 15px;"><a href="beranda.html" style="color: #5c98a2;">Kembali ke Beranda</a></p>
            </div>
        `;
    }
