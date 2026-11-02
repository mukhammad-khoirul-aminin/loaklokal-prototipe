
document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // DATA BARANG CONTOH
    // =====================================

    // Ganti data ini dengan data asli LoakLokal
    // ketika integrasi database sudah tersedia.

    const products = [
        {
            id: 1,
            name: "Kipas Angin",
            category: "kipas",
            type: "jual",
            price: 30000,
            distance: 0.8,
            image: ""
        },
        {
            id: 2,
            name: "Kipas Angin",
            category: "kipas",
            type: "hibah",
            price: 0,
            distance: 1.1,
            image: ""
        },
        {
            id: 3,
            name: "Kipas Angin Mini",
            category: "kipas",
            type: "jual",
            price: 45000,
            distance: 2.4,
            image: ""
        },
        {
            id: 4,
            name: "Kipas Angin Berdiri",
            category: "kipas",
            type: "jual",
            price: 75000,
            distance: 2.8,
            image: ""
        },
        {
            id: 5,
            name: "Meja Belajar",
            category: "meja",
            type: "hibah",
            price: 0,
            distance: 0.7,
            image: ""
        },
        {
            id: 6,
            name: "Buku Pelajaran",
            category: "buku",
            type: "hibah",
            price: 0,
            distance: 0.5,
            image: ""
        },
        {
            id: 7,
            name: "Lemari Kayu",
            category: "lemari",
            type: "jual",
            price: 150000,
            distance: 2.5,
            image: ""
        },
        {
            id: 8,
            name: "Kasur Single",
            category: "kasur",
            type: "jual",
            price: 45000,
            distance: 3,
            image: ""
        }
    ];

    // =====================================
    // MENGAMBIL ELEMEN HTML
    // =====================================

    const searchName = document.getElementById("searchName");
    const productList = document.getElementById("productList");

    const radiusInputs = document.querySelectorAll(
        'input[name="radius"]'
    );

    const jenisInputs = document.querySelectorAll(
        'input[name="jenis"]'
    );

    // =====================================
    // MEMBACA PARAMETER URL
    // =====================================

    const params = new URLSearchParams(window.location.search);

    const keywordAwal = params.get("q") || "Kipas Angin";
    const radiusAwal = params.get("radius") || "2";
    const jenisAwal = params.get("jenis") || "";

    searchName.value = keywordAwal;

    // Mengatur radius awal
    const validRadius = ["1", "2", "3"];

    const radiusTerpilih = validRadius.includes(radiusAwal)
        ? radiusAwal
        : "2";

    const radiusRadio = document.querySelector(
        `input[name="radius"][value="${radiusTerpilih}"]`
    );

    if (radiusRadio) {
        radiusRadio.checked = true;
    }

    // Mengatur jenis filter awal
    const jenisRadio = document.querySelector(
        `input[name="jenis"][value="${jenisAwal}"]`
    );

    if (jenisRadio) {
        jenisRadio.checked = true;
    }

    // =====================================
    // MEMPERBARUI TAMPILAN RADIUS
    // =====================================

    function updateRadiusStyle() {
        document.querySelectorAll(".radius-option").forEach(label => {
            const input = label.querySelector("input");

            label.classList.toggle(
                "selected",
                input.checked
            );
        });
    }

    // =====================================
    // MENAMPILKAN BARANG
    // =====================================

    function renderProducts() {

        const keyword = searchName.value
            .trim()
            .toLowerCase();

        const selectedRadius = Number(
            document.querySelector(
                'input[name="radius"]:checked'
            ).value
        );

        const selectedJenis = document.querySelector(
            'input[name="jenis"]:checked'
        )?.value || "semua";

        // Menyesuaikan tampilan radius terpilih
        updateRadiusStyle();

        // =====================================
        // PROSES FILTER DATA
        // =====================================

        const filteredProducts = products.filter(product => {

            // Filter nama barang
            const matchName =
                product.name.toLowerCase().includes(keyword);

            // Filter radius
            const matchRadius =
                product.distance <= selectedRadius;

            // Filter kategori jenis barang
            let matchJenis = true;

            if (selectedJenis === "hibah") {
                matchJenis = product.type === "hibah";

            } else if (selectedJenis === "harga_bawah") {
                matchJenis =
                    product.type === "jual" &&
                    product.price < 50000;
            }

            return matchName && matchRadius && matchJenis;
        });

        // =====================================
        // MEMBERSIHKAN DAFTAR SEBELUM RENDER
        // =====================================

        productList.replaceChildren();

        // =====================================
        // JIKA BARANG TIDAK DITEMUKAN
        // =====================================

        if (filteredProducts.length === 0) {

            const emptyMessage = document.createElement("p");

            emptyMessage.className = "empty-result";
            emptyMessage.textContent =
                "Tidak ada barang yang sesuai dengan filter.";

            productList.appendChild(emptyMessage);

        } else {

            // =====================================
            // MEMBUAT KARTU BARANG
            // =====================================

            filteredProducts.forEach(product => {

                const card = document.createElement("article");
                card.className = "product-card";

                // Gambar barang
                const imageBox = document.createElement("div");
                imageBox.className = "product-image";

                if (product.image) {

                    const image = document.createElement("img");

                    image.src = product.image;
                    image.alt = product.name;

                    imageBox.appendChild(image);

                } else {

                    // Ikon placeholder jika gambar belum tersedia
                    const icon = document.createElement("i");

                    icon.className = "fa-solid fa-image";
                    icon.setAttribute("aria-hidden", "true");

                    imageBox.appendChild(icon);
                }

                // Nama barang
                const name = document.createElement("h3");

                name.className = "product-name";
                name.textContent = product.name;

                // Harga barang
                const price = document.createElement("p");

                price.className = "product-price";

                if (product.type === "hibah") {
                    price.textContent = "Gratis";
                } else {
                    price.textContent =
                        "Rp. " + product.price.toLocaleString("id-ID");
                }

                // Jarak barang
                const distance = document.createElement("p");

                distance.className = "product-distance";
                distance.textContent = product.distance + " km";

                // Menggabungkan elemen kartu
                card.append(
                    imageBox,
                    name,
                    price,
                    distance
                );

                productList.appendChild(card);
            });
        }

        // =====================================
        // MENYIMPAN FILTER PADA URL
        // =====================================

        const updatedParams = new URLSearchParams();

        if (keyword) {
            updatedParams.set("q", searchName.value.trim());
        }

        updatedParams.set("radius", selectedRadius);

        if (selectedJenis !== "semua") {
            updatedParams.set("jenis", selectedJenis);
        }

        const newUrl =
            window.location.pathname +
            "?" + updatedParams.toString();

        window.history.replaceState(
            null,
            "",
            newUrl
        );
    }

    // =====================================
    // EVENT PENCARIAN DAN FILTER
    // =====================================

    searchName.addEventListener("input", renderProducts);

    radiusInputs.forEach(input => {
        input.addEventListener("change", renderProducts);
    });

    jenisInputs.forEach(input => {
        input.addEventListener("change", renderProducts);
    });

    // =====================================
    // TAMPILKAN DATA PERTAMA KALI
    // =====================================

    renderProducts();

});
