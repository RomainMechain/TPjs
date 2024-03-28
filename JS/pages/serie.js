import CarteProvider from "../services/CarteProvider.js";
import Utiles from "../services/utiles.js";
import SerieProvider from "../services/SerieProvider.js";
import Pagination from "../services/Pagination.js";

export default class Serie {

    static async render () {
        let request = Utiles.parseRequestURL();
        let serie = await SerieProvider.getseries(request.id);
        let cartesSeries = await CarteProvider.getCartesByidSerie(request.id);
        let cartes = await CarteProvider.filterByMesCartes(cartesSeries);
        cartes = await Pagination.paginCartes(cartes, 1, 6);
        let view =  /*html*/`
            <link rel="stylesheet" href="../../css/serie.css">
            <section class='flex'>
                <di>
                    <img loading="lazy" src="${serie.images.logo}" alt="${serie.name}"/ id='logo'>
                </di>
                <div id='info'>
                    <h1>${serie.name}</h1>
                    <p><span>De la série :</span>  ${serie.series}</p>
                    <p><span>Nombre de cartes :</span>  ${serie.total}</p>
                    <p><span>Sortie le :</span>  ${serie.releaseDate}</p>
                    <div class='flex'>
                    <p><span>Symbole :</span></p>
                    <img loading="lazy" src="${serie.images.symbol}" alt="${serie.name}" id='symbole'/>
                    </div>
                </div>
            </section>
            <section>
            <h2>Toutes les cartes</h2>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3" id='carteContainer'>
                ${ cartes.map(cartes => 
                    /*html*/`
                    <div class="gallery">
                        <a href="#/carte/${cartes.id}">
                            <img loading="lazy" src="${cartes.images.large}" alt="${cartes.name}" class='uneCarte'>
                        </a>
                        <div class="desc">${cartes.name}</div>
                    </div>
                    `
                    ).join('\n ')
                }
            </div>
                <div>
                  <ul class="pagination">
                  </ul>
                </div>
            </section>
        `
        return view
    }

    static async afterRender() {
        let request = Utiles.parseRequestURL();
        let cartesSeries = await CarteProvider.getCartesByidSerie(request.id);
        let cartes = await CarteProvider.filterByMesCartes(cartesSeries);
        let nbPages = Math.ceil(cartes.length / 6);
    
        let pagination = document.querySelector('.pagination');
        for (let i = 1; i <= nbPages; i++) {
            let li = document.createElement('li');
            li.classList.add('page-item');
            if (i === 1) {
                li.classList.add('active');
            }
            let a = document.createElement('a');
            a.classList.add('page-link');
            a.href = '#';
            a.innerHTML = i;
            li.appendChild(a);
            pagination.appendChild(li);
    

            a.addEventListener('click', async (e) => {
                e.preventDefault(); 
                let pageNumber = parseInt(e.target.textContent);
                let paginatedCartes = await Pagination.paginCartes(cartes, pageNumber, 6);
                this.renderCartes(paginatedCartes);

                document.querySelectorAll('.pagination .page-item').forEach((pageItem) => {
                    pageItem.classList.remove('active');
                });

                li.classList.add('active');
            });
        }
    }

    static renderCartes(cartes) {
        let cartesContainer = document.querySelector('#carteContainer');
        cartesContainer.innerHTML = cartes.map(carte => 
            /*html*/`
            <div class="gallery">
                <a href="#/carte/${carte.id}">
                    <img loading="lazy" src="${carte.images.large}" alt="${carte.name}" class='uneCarte'>
                </a>
                <div class="desc">${carte.name}</div>
            </div>
            `
        ).join('\n ');
    }

}
