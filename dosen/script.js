/* =========================================================
   FPDM - DIREKTORI DOSEN
   SCRIPT.JS
========================================================= */


/* =========================================================
   KONFIGURASI
========================================================= */

const DATA_URL = "data/dosen.json";

// Jumlah dosen yang ditampilkan per halaman
const PER_PAGE = 10;


/* =========================================================
   VARIABEL
========================================================= */

let semuaDosen = [];
let hasilFilter = [];

let halamanSekarang = 1;


/* =========================================================
   ELEMENT HTML
========================================================= */

const dosenList =
    document.getElementById("dosenList");

const pagination =
    document.getElementById("pagination");

const jumlahData =
    document.getElementById("jumlahData");

const searchInput =
    document.getElementById("searchInput");

const searchButton =
    document.getElementById("searchButton");

const filterKampus =
    document.getElementById("filterKampus");

const filterJurusan =
    document.getElementById("filterJurusan");

const filterKeahlian =
    document.getElementById("filterKeahlian");


/* =========================================================
   AMBIL DATA JSON
========================================================= */

async function loadData() {

    try {

        const response = await fetch(DATA_URL);

        if (!response.ok) {
            throw new Error(
                "Data dosen tidak dapat ditemukan."
            );
        }

        semuaDosen = await response.json();

        hasilFilter = [...semuaDosen].reverse();

        buatFilter();

        tampilkanDosen();

    } catch (error) {

        console.error(error);

        dosenList.innerHTML = `

            <div class="empty-data">

                <h3>Data belum tersedia</h3>

                <p>
                    Pastikan file
                    <strong>data/dosen.json</strong>
                    sudah dibuat.
                </p>

            </div>

        `;

        jumlahData.textContent = "0";
    }
}


/* =========================================================
   BUAT FILTER OTOMATIS
========================================================= */

function buatFilter() {

    const kampus = [
        ...new Set(
            semuaDosen
                .map(dosen => dosen.kampus)
                .filter(Boolean)
        )
    ].sort();


    const jurusan = [
        ...new Set(
            semuaDosen
                .map(dosen => dosen.jurusan)
                .filter(Boolean)
        )
    ].sort();


    const keahlian = [
        ...new Set(
            semuaDosen
                .flatMap(dosen => {

                    if (Array.isArray(dosen.keahlian)) {

                        return dosen.keahlian;

                    }

                    return dosen.keahlian
                        ? [dosen.keahlian]
                        : [];

                })
                .filter(Boolean)
        )
    ].sort();


    isiSelect(
        filterKampus,
        kampus,
        "Semua Kampus"
    );


    isiSelect(
        filterJurusan,
        jurusan,
        "Semua Jurusan"
    );


    isiSelect(
        filterKeahlian,
        keahlian,
        "Semua Keahlian"
    );
}


/* =========================================================
   ISI SELECT
========================================================= */

function isiSelect(select, data, defaultText) {

    select.innerHTML = `
        <option value="">
            ${defaultText}
        </option>
    `;


    data.forEach(item => {

        const option =
            document.createElement("option");

        option.value = item;

        option.textContent = item;

        select.appendChild(option);

    });
}


/* =========================================================
   TAMPILKAN DOSEN
========================================================= */

function tampilkanDosen() {

    const mulai =
        (halamanSekarang - 1) * PER_PAGE;

    const sampai =
        mulai + PER_PAGE;

    const dataHalaman =
        hasilFilter.slice(mulai, sampai);


    /* =========================
       JUMLAH DATA
    ========================== */

    jumlahData.textContent =
        hasilFilter.length;


    /* =========================
       DATA KOSONG
    ========================== */

    if (dataHalaman.length === 0) {

        dosenList.innerHTML = `

            <div class="empty-data">

                <h3>Data tidak ditemukan</h3>

                <p>
                    Coba gunakan kata pencarian
                    atau filter yang berbeda.
                </p>

            </div>

        `;

        pagination.innerHTML = "";

        return;
    }


    /* =========================
       BUAT CARD
    ========================== */

    dosenList.innerHTML = "";


    dataHalaman.forEach((dosen, index) => {

        const nomor =
            mulai + index + 1;


        /* =========================
           KEAHLIAN
        ========================== */

        let keahlian = "";

        if (Array.isArray(dosen.keahlian)) {

            keahlian =
                dosen.keahlian.join(", ");

        } else {

            keahlian =
                dosen.keahlian || "-";

        }


        /* =========================
           FOTO
        ========================== */

        const foto =
            dosen.foto ||
            "https://via.placeholder.com/300x400?text=Foto+Dosen";


        /* =========================
           LINK SINTA
        ========================== */

       const sinta =
    dosen.sinta || "";
       
        /* =========================
           LINK SINTA
        ========================== */
      const scopus =
    dosen.scopus || "";

        /* =========================
           LINK DOWNLOAD
        ========================== */

        const download =
    dosen.download || "";


        /* =========================
           CARD
        ========================== */

        const card =
            document.createElement("article");

        card.className =
            "dosen-card";


        card.innerHTML = `

            <img
                src="${escapeHTML(foto)}"
                alt="Foto ${escapeHTML(dosen.nama || "Dosen")}"
                class="dosen-photo"
                loading="lazy"
            >


            <div class="dosen-info">


                <div class="dosen-number">

                    ${nomor}.

                </div>


                <div class="dosen-name">

                    ${escapeHTML(
                        dosen.nama || "Nama belum tersedia"
                    )}

                </div>


                <div class="dosen-detail">

                    <strong>Kampus</strong>

                    <span>
                        ${escapeHTML(
                            dosen.kampus || "-"
                        )}
                    </span>

                </div>


                <div class="dosen-detail">

                    <strong>Jurusan</strong>

                    <span>
                        ${escapeHTML(
                            dosen.jurusan || "-"
                        )}
                    </span>

                </div>


                <div class="dosen-detail">

                    <strong>Keahlian</strong>

                    <span>
                        ${escapeHTML(keahlian)}
                    </span>

                </div>


                <div class="dosen-buttons">


                    <a
                        href="${escapeHTML(sinta)}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="btn btn-sinta"
                    >
                        SINTA ↗
                    </a>


                    <a
                        href="${escapeHTML(download)}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="btn btn-download"
                    >
                        DOWNLOAD ↓
                    </a>


                </div>


            </div>

        `;


        dosenList.appendChild(card);

    });


    buatPagination();

}


/* =========================================================
   PAGINATION
========================================================= */

function buatPagination() {

    pagination.innerHTML = "";


    const totalHalaman =
        Math.ceil(
            hasilFilter.length / PER_PAGE
        );


    if (totalHalaman <= 1) {
        return;
    }


    /* =========================
       PREVIOUS
    ========================== */

    const previous =
        document.createElement("button");

    previous.textContent =
        "‹";

    previous.title =
        "Halaman sebelumnya";

    previous.disabled =
        halamanSekarang === 1;

    previous.onclick = () => {

        if (halamanSekarang > 1) {

            halamanSekarang--;

            tampilkanDosen();

            scrollKeAtas();

        }

    };


    pagination.appendChild(previous);


    /* =========================
       NOMOR HALAMAN
    ========================== */

    const halaman =
        buatNomorHalaman(
            totalHalaman,
            halamanSekarang
        );


    halaman.forEach(item => {

        if (item === "...") {

            const dots =
                document.createElement("span");

            dots.textContent =
                "...";

            dots.style.padding =
                "0 5px";

            pagination.appendChild(dots);

            return;
        }


        const button =
            document.createElement("button");

        button.textContent =
            item;

        button.className =
            item === halamanSekarang
                ? "active"
                : "";


        button.onclick = () => {

            halamanSekarang =
                item;

            tampilkanDosen();

            scrollKeAtas();

        };


        pagination.appendChild(button);

    });


    /* =========================
       NEXT
    ========================== */

    const next =
        document.createElement("button");

    next.textContent =
        "›";

    next.title =
        "Halaman berikutnya";

    next.disabled =
        halamanSekarang === totalHalaman;


    next.onclick = () => {

        if (
            halamanSekarang <
            totalHalaman
        ) {

            halamanSekarang++;

            tampilkanDosen();

            scrollKeAtas();

        }

    };


    pagination.appendChild(next);

}


/* =========================================================
   NOMOR PAGINATION
========================================================= */

function buatNomorHalaman(
    total,
    current
) {

    const pages = [];

    if (total <= 7) {

        for (
            let i = 1;
            i <= total;
            i++
        ) {

            pages.push(i);

        }

        return pages;
    }


    pages.push(1);


    if (current > 4) {

        pages.push("...");

    }


    const mulai =
        Math.max(2, current - 1);


    const akhir =
        Math.min(total - 1, current + 1);


    for (
        let i = mulai;
        i <= akhir;
        i++
    ) {

        pages.push(i);

    }


    if (current < total - 3) {

        pages.push("...");

    }


    pages.push(total);


    return pages;
}


/* =========================================================
   SEARCH + FILTER
========================================================= */

function filterData() {

    const keyword =
        searchInput.value
            .trim()
            .toLowerCase();


    const kampus =
        filterKampus.value
            .trim()
            .toLowerCase();


    const jurusan =
        filterJurusan.value
            .trim()
            .toLowerCase();


    const keahlian =
        filterKeahlian.value
            .trim()
            .toLowerCase();


    hasilFilter =
        semuaDosen.filter(dosen => {


            /* =========================
               SEARCH
            ========================== */

            const teksKeahlian =
                Array.isArray(dosen.keahlian)
                    ? dosen.keahlian.join(" ")
                    : dosen.keahlian || "";


            const cocokSearch =

                !keyword ||

                (dosen.nama || "")
                    .toLowerCase()
                    .includes(keyword) ||

                (dosen.kampus || "")
                    .toLowerCase()
                    .includes(keyword) ||

                (dosen.jurusan || "")
                    .toLowerCase()
                    .includes(keyword) ||

                teksKeahlian
                    .toLowerCase()
                    .includes(keyword);


            /* =========================
               FILTER KAMPUS
            ========================== */

            const cocokKampus =

                !kampus ||

                (dosen.kampus || "")
                    .toLowerCase() === kampus;


            /* =========================
               FILTER JURUSAN
            ========================== */

            const cocokJurusan =

                !jurusan ||

                (dosen.jurusan || "")
                    .toLowerCase() === jurusan;


            /* =========================
               FILTER KEAHLIAN
            ========================== */

            const cocokKeahlian =

                !keahlian ||

                teksKeahlian
                    .toLowerCase()
                    .includes(keahlian);


            return (

                cocokSearch &&

                cocokKampus &&

                cocokJurusan &&

                cocokKeahlian

            );

        });


    halamanSekarang = 1;

    tampilkanDosen();
}


/* =========================================================
   EVENT SEARCH
========================================================= */

searchButton.addEventListener(
    "click",
    filterData
);


searchInput.addEventListener(
    "keyup",
    function(event) {

        if (
            event.key === "Enter"
        ) {

            filterData();

        }

    }
);


/* =========================================================
   EVENT FILTER
========================================================= */

filterKampus.addEventListener(
    "change",
    filterData
);


filterJurusan.addEventListener(
    "change",
    filterData
);


filterKeahlian.addEventListener(
    "change",
    filterData
);


/* =========================================================
   SCROLL
========================================================= */

function scrollKeAtas() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =========================================================
   ESCAPE HTML
   Mencegah karakter HTML masuk
   langsung ke halaman
========================================================= */

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent =
        String(value);

    return div.innerHTML;
}


/* =========================================================
   MULAI APLIKASI
========================================================= */

loadData();
