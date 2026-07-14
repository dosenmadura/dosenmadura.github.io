let semuaJurnal = [];

fetch("assets/data/jurnal.json")
    .then(response => response.json())
    .then(data => {

        semuaJurnal = data;

        renderJurnal(semuaJurnal);

    });

function renderJurnal(data){

    const container = document.getElementById("jurnal-list");

    container.innerHTML = "";

    data.forEach(jurnal=>{

        container.innerHTML += `

        <div class="card">

            <img src="${jurnal.cover}" alt="${jurnal.nama}">

            <div class="card-body">

                <h3>${jurnal.nama}</h3>

                <p class="kampus">
                    🏫 ${jurnal.kampus}
                </p>

                <span class="badge">
                    🏅 SINTA ${jurnal.sinta}
                </span>

                <a
                    href="${jurnal.url}"
                    target="_blank"
                    class="btn">

                    🌐 Kunjungi Jurnal

                </a>

            </div>

        </div>

        `;

    });

}

const tombolFilter = document.querySelectorAll(".filter button");

tombolFilter.forEach(button=>{

    button.addEventListener("click",()=>{

        tombolFilter.forEach(btn=>btn.classList.remove("active"));

        button.classList.add("active");

        const filter = button.innerText;

        if(filter==="Semua"){

            renderJurnal(semuaJurnal);

            return;

        }

        if(filter==="Belum SINTA"){

            const hasil = semuaJurnal.filter(jurnal=>{

                return jurnal.sinta==0;

            });

            renderJurnal(hasil);

            return;

        }

        const nomor = filter.replace("S","");

        const hasil = semuaJurnal.filter(jurnal=>{

            return jurnal.sinta==nomor;

        });

        renderJurnal(hasil);

    });

});

