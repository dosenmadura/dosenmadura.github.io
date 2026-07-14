fetch("assets/data/jurnal.json")
  .then(response => response.json())
  .then(data => {

    const container = document.getElementById("jurnal-list");

    data.forEach(jurnal => {

      container.innerHTML += `
        <div class="card">

          <img src="${jurnal.cover}" alt="${jurnal.nama}">

          <div class="card-body">

            <h3>${jurnal.nama}</h3>

            <p class="kampus">🏫 ${jurnal.kampus}</p>

            <span class="badge">
              🏅 SINTA ${jurnal.sinta}
            </span>

            <a href="${jurnal.url}" target="_blank" class="btn">
              🌐 Kunjungi Jurnal
            </a>

          </div>

        </div>
      `;

    });

  })
  .catch(error => {
    console.error("Gagal membaca jurnal.json", error);
  });
