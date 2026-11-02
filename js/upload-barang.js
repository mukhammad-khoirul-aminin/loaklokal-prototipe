    // 1. Fitur Preview Gambar saat di-upload
    const fotoInput = document.getElementById("foto-barang");
    const imagePreview = document.getElementById("imagePreview");
    const uploadPlaceholder = document.getElementById("uploadPlaceholder");
    let base64Image = ""; // Variabel untuk menyimpan gambar dalam format teks

    fotoInput.addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
        // Tampilkan preview
        imagePreview.src = event.target.result;
        imagePreview.style.display = "block";
        uploadPlaceholder.style.display = "none";
        // Simpan string gambar untuk database lokal
        base64Image = event.target.result;
        };
        reader.readAsDataURL(file); // Konversi gambar ke format Data URL (Base64)
    }
    });

    // 2. Fitur Submit Form & Simpan ke Local Storage
    document.getElementById("uploadForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Mencegah reload halaman standar

    // Cek apakah gambar sudah diupload
    if (!base64Image) {
        alert("Mohon upload foto barang terlebih dahulu.");
        return;
    }

    // Ambil nilai dari input form
    const nama = document.getElementById("nama-barang").value;
    const harga = document.getElementById("harga-barang").value || 0;
    const deskripsi = document.getElementById("deskripsi-barang").value;
    const lokasi = document.getElementById("lokasi-barang").value;

    // Ambil nilai Radio Button
    const mode = document.querySelector('input[name="mode"]:checked').value;
    const radius = document.querySelector('input[name="radius"]:checked').value;

    // Buat objek barang (Buat ID unik dengan Date.now)
    const newItem = {
        id: "item_" + Date.now(),
        nama: nama,
        mode: mode,
        harga: harga,
        deskripsi: deskripsi,
        radius: radius,
        lokasi: lokasi,
        gambar: base64Image,
    };

    // Ambil array barang yang sudah ada di LocalStorage, jika kosong buat array baru
    let storedItems = JSON.parse(localStorage.getItem("loakItems")) || [];

    // Tambahkan barang baru ke dalam array
    storedItems.push(newItem);

    // Simpan kembali array yang sudah di-update ke LocalStorage
    // PENTING: LocalStorage punya batas memori (biasanya ~5MB).
    // Menyimpan gambar Base64 resolusi tinggi bisa cepat memenuhi limit ini.
    try {
        localStorage.setItem("loakItems", JSON.stringify(storedItems));
        alert("Barang berhasil di-upload!");

        // Pindah (Redirect) otomatis ke halaman beranda
        window.location.href = "beranda.html";
    } catch (error) {
        alert(
        "Gagal menyimpan. Ukuran file gambar mungkin terlalu besar untuk memori browser (Local Storage limit).",
        );
    }
    });
