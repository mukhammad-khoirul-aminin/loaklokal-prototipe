
document.addEventListener("DOMContentLoaded", function () {
    // =====================================
    // POPUP FILTER PENCARIAN
    // =====================================

    const searchInput = document.getElementById("searchInput");
    const searchContainer = document.getElementById("searchContainer");
    const searchPopup = document.getElementById("searchFilterPopup");

    if (searchInput && searchContainer && searchPopup) {
        function openSearchPopup() {
            searchPopup.hidden = false;
            searchInput.setAttribute("aria-expanded", "true");
        }

        function closeSearchPopup() {
            searchPopup.hidden = true;
            searchInput.setAttribute("aria-expanded", "false");
        }

        searchInput.addEventListener("click", openSearchPopup);
        searchInput.addEventListener("focus", openSearchPopup);

        searchPopup.addEventListener("click", function (event) {
            event.stopPropagation();
        });

        document.addEventListener("click", function (event) {
            if (!searchContainer.contains(event.target)) {
                closeSearchPopup();
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                closeSearchPopup();
            }
        });
    }

    // =====================================
    // POPUP PENGATURAN RADIUS
    // =====================================

    const radiusButton = document.getElementById("radiusLocationBtn");
    const radiusOverlay = document.getElementById("radiusOverlay");
    const radiusForm = document.getElementById("radiusForm");

    if (radiusButton && radiusOverlay && radiusForm) {
        const savedRadius = localStorage.getItem("loakRadius") || "2";

        function updateRadiusButton(radius) {
            radiusButton.textContent = `( Kediri, ${radius}km )`;
        }

        const savedRadio = radiusForm.querySelector(
            `input[name="radius"][value="${savedRadius}"]`
        );

        if (savedRadio) {
            savedRadio.checked = true;
        }

        updateRadiusButton(savedRadius);

        function closeRadiusPopup() {
            radiusOverlay.hidden = true;
            radiusButton.setAttribute("aria-expanded", "false");
        }

        radiusButton.addEventListener("click", function () {
            radiusOverlay.hidden = false;
            radiusButton.setAttribute("aria-expanded", "true");
        });

        radiusOverlay.addEventListener("click", function (event) {
            if (event.target === radiusOverlay) {
                closeRadiusPopup();
            }
        });

        radiusForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const selected = radiusForm.querySelector(
                'input[name="radius"]:checked'
            );

            if (!selected) return;

            const radius = selected.value;

            localStorage.setItem("loakRadius", radius);
            updateRadiusButton(radius);
            closeRadiusPopup();
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                closeRadiusPopup();
            }
        });
    }
});



// =====================================
// TOMBOL CARI FILTER
// =====================================

const cariFilterBtn = document.getElementById("cariFilterBtn");

if (cariFilterBtn) {
    cariFilterBtn.addEventListener("click", function () {
        const kategori = document.querySelector(
            'input[name="kategoriFilter"]:checked'
        );

        const jenis = document.querySelector(
            'input[name="jenisFilter"]:checked'
        );

        const kataKunci = document.getElementById("searchInput").value.trim();

        const params = new URLSearchParams();

        if (kategori) {
            params.set("kategori", kategori.value);
        }

        if (jenis) {
            params.set("jenis", jenis.value);
        }

        if (kataKunci) {
            params.set("q", kataKunci);
        }

        window.location.href = `filter.html?${params.toString()}`;
    });
}