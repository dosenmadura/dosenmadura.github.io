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

                <div class="info">

                    <div class="row">
                        <div class="label">Jurnal</div>
                        <div class="separator">:</div>
                        <div class="value">${jurnal.nama}</div>
                    </div>

                    <div class="row">
                        <div class="label">Kampus</div>
                        <div class="separator">:</div>
                        <div class="value">${jurnal.kampus}</div>
                    </div>

                    <div class="row">
                        <div class="label">Akreditasi</div>
                        <div class="separator">:</div>
                        <div class="value">${jurnal.akreditasi}</div>
                    </div>

                    <div class="row">
                        <div class="label">Terbit</div>
                        <div class="separator">:</div>
                        <div class="value">${jurnal.terbit}</div>
                    </div>

                </div>

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

        const search = document.getElementById("search");

search.addEventListener("keyup", function(){

    const keyword = this.value.toLowerCase();

    const hasil = semuaJurnal.filter(jurnal => {

        return (

            jurnal.nama.toLowerCase().includes(keyword) ||

            jurnal.kampus.toLowerCase().includes(keyword) ||

            jurnal.akreditasi.toLowerCase().includes(keyword) ||

            jurnal.terbit.toLowerCase().includes(keyword)

        );

    });

    renderJurnal(hasil);

});

