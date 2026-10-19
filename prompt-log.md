```markdown
# Audit Log Prompt AI & Catatan Perbaikan Manual

Dokumen ini berisi riwayat penggunaan AI (*AI-Assisted Prototyping*) serta penyesuaian kode manual pada proyek **LoakLokal** (Modul 7).

---

## 1. Riwayat Prompt AI yang Digunakan

### A. Master Prompt — Setup Layout Mobile & Shell Container
* **AI Tool:** Gemini / Claude / ChatGPT
* **Prompt:**
  > *"Buatkan struktur HTML5 dan CSS responsive mobile container (390x844px) dengan latar belakang putih, header berwarna biru keabuan (#5b92a8), bottom navigation bar dengan tombol tengah menonjol, serta kartu poster promo sesuai token desain Figma LoakLokal Modul 5."*
* **Hasil Generasi AI:** Dihasilkan struktur CSS awal untuk `.mobile-wrapper`, header, dan bottom navbar.

### B. Prompt — Filter Dinamis & Modal Safe Spot
* **AI Tool:** ChatGPT / Gemini
* **Prompt:**
  > *"Buatkan logika JavaScript murni (DOM Manipulation) untuk menangani pilihan radio button filter radius (1 km, 2 km, 3 km) dan kategori (Jual, Barter, Hibah) serta validasi sederhana pada form pengajuan COD agar tidak terjadi error/crash."*
* **Hasil Generasi AI:** Kode event listener JavaScript dasar yang diintegrasikan ke file `script.js`.

---

## 2. Catatan Perbaikan Manual (Manual Code Audit)

1. **Perbaikan Layout Frame Header:**
   * **Masalah:** Header dan tombol kembali di halaman `upload-barang.html` sempat bergeser keluar dari batas container HP (`.mobile-wrapper`).
   * **Solusi Manual:** Merapikan pembungkus HTML dan menambahkan `overflow: hidden` pada container utama `mobile.css`.

2. **Perbaikan Kontras Warna & Accessibility:**
   * **Masalah:** Teks sekunder pada caption warna abu-abu awal belum memenuhi kontras standar WCAG AA.
   * **Solusi Manual:** Mengubah kode HEX warna teks sekunder menjadi `#176B87` agar kontras dengan latar belakang putih.

3. **Penanganan Zero Dead-End (Recovery Path):**
   * **Masalah:** Tombol pada halaman `status-ditolak.html` tidak memiliki aksi pengalihan.
   * **Solusi Manual:** Menambahkan event `onclick` atau atribut link `href="katalog.html"` agar pengguna bisa kembali ke katalog tanpa terjebak di alur buntu.