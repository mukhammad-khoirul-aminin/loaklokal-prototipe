    document.addEventListener("DOMContentLoaded", function () {
    const radiusButton = document.getElementById("radiusLocationBtn");
    const radiusOverlay = document.getElementById("radiusOverlay");
    const radiusPopup = document.getElementById("radiusPopup");
    const radiusForm = document.getElementById("radiusForm");

    // Ambil radius yang pernah disimpan.
    const savedRadius = localStorage.getItem("loakRadius") || "2";

    // Perbarui tulisan lokasi di header.
    function updateRadiusButton(radius) {
        radiusButton.textContent = `( Kediri, ${radius}km )`;
    }

    // Pilih radius yang tersimpan ketika halaman dibuka.
    const selectedRadio = radiusForm.querySelector(
        `input[name="radius"][value="${savedRadius}"]`,
    );

    if (selectedRadio) {
        selectedRadio.checked = true;
    }

    updateRadiusButton(savedRadius);

    // Buka popup ketika lokasi diklik.
    radiusButton.addEventListener("click", function () {
        radiusOverlay.hidden = false;
        radiusButton.setAttribute("aria-expanded", "true");

        const checkedRadio = radiusForm.querySelector(
        'input[name="radius"]:checked',
        );

        if (checkedRadio) {
        checkedRadio.focus();
        }
    });

    // Tutup popup.
    function closeRadiusPopup() {
        radiusOverlay.hidden = true;
        radiusButton.setAttribute("aria-expanded", "false");
        radiusButton.focus();
    }

    // Tutup jika pengguna mengeklik area luar popup.
    radiusOverlay.addEventListener("click", function (event) {
        if (event.target === radiusOverlay) {
        closeRadiusPopup();
        }
    });

    // Tutup dengan tombol Escape.
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && !radiusOverlay.hidden) {
        closeRadiusPopup();
        }
    });

    // Simpan pilihan radius.
    radiusForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const selected = radiusForm.querySelector('input[name="radius"]:checked');

        if (!selected) {
        return;
        }

        const radius = selected.value;

        // Simpan agar tetap tersimpan setelah halaman dimuat ulang.
        localStorage.setItem("loakRadius", radius);

        // Perbarui teks di header.
        updateRadiusButton(radius);

        // Tutup popup.
        closeRadiusPopup();
    });
    });

    // Data Dummy Bawaan
    const defaultItems = [
    {
        id: 1,
        nama: "Lemari Kayu Vintage",
        mode: "Jual Murah",
        harga: "Rp 45.000",
        lokasi: "Kediri (1.2 km)",
        gambar:
        "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=400&q=80",
    },
    {
        id: 2,
        nama: "Kipas Angin Berdiri",
        mode: "Hibah Gratis",
        harga: "Gratis",
        lokasi: "Kediri (0.8 km)",
        gambar:
        "https://images.unsplash.com/photo-1565159067345-0d027f30325f?auto=format&fit=crop&w=400&q=80",
    },
    ];

    const katalogContainer = document.getElementById("katalogContainer");
    const searchInput = document.getElementById("searchInput");

    // Fungsi Render Barang
    function renderItems(searchQuery = "") {
    katalogContainer.innerHTML = "";

    const localItems = JSON.parse(localStorage.getItem("loakItems")) || [];
    const allItems = [...localItems, ...defaultItems];

    const filteredItems = allItems.filter(
        (item) =>
        item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.mode.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    if (filteredItems.length === 0) {
        katalogContainer.innerHTML =
        '<div class="empty-state"><h3>Barang tidak ditemukan.</h3><p>Coba gunakan kata kunci lain.</p></div>';
        return;
    }

    filteredItems.forEach((item) => {
        const isGratis =
        item.harga.toLowerCase() === "gratis" ||
        item.harga === "0" ||
        item.harga === "Rp 0";
        const displayHarga = isGratis ? "Gratis" : item.harga;

        const card = document.createElement("a");
        card.href = `detail-barang.html?id=${item.id}`;
        card.className = "card";
        card.innerHTML = `
            <img src="${item.gambar}" alt="${item.nama}">
            <div class="card-body">
                <span class="card-badge">${item.mode}</span>
                <div class="card-title">${item.nama}</div>
                <div class="card-price">${displayHarga}</div>
                <div class="card-location">📍 ${item.lokasi}</div>
            </div>
            `;
        katalogContainer.appendChild(card);
    });
    }

    searchInput.addEventListener("input", (e) => {
    renderItems(e.target.value);
    });

    renderItems();
