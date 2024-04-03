import CarteProvider from "../services/CarteProvider.js";
import Utiles from "../services/utiles.js";
import CarteEquipementProvider from "../services/CarteEquipementProvider.js";
import Pagination from "../services/Pagination.js";

export default class Equipement {
    static async render () {
        let request = Utiles.parseRequestURL();
        let objet = await CarteEquipementProvider.getCarteEquipement(request.id);
        
        let carteObjet = await  CarteProvider.getCarteByItems(objet.id);
        carteObjet = await CarteProvider.filterByMesCartes(carteObjet);
        carteObjet = await Pagination.paginCartes(carteObjet, 1, 6);

        let view =  /*html*/`
            <link rel="stylesheet" href="../../css/carte.css">
            <script src="../script/searchBar.js"></script>
            <section class='flex'>
                <di>
                    <img loading="lazy" classe="carte" src="${objet.images.large}" alt="${objet.name}"/ id='logo'>
                </di>
                <div id='info'>
                    <h1>${objet.name}</h1>
                    <p><span>Numeros de carte :</span>  ${objet.number}</p>
                    <p><span>Artiste :</span>  ${objet.artist}</p>
                    <p><span>Type :</span>  ${objet.supertype}</p>
                    <p><span>regles :</span>  ${objet.rules[0]}</p>

                    
                </div>
            </section>
            <section>
            <h2>Toutes les cartes qui le possede</h2>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3"  id='carteContainer'>
                ${ carteObjet.map(carteObjet => 
                    /*html*/`
                    <div class="gallery">
                        <a href="#/carte/${carteObjet.id}">
                            <img loading="lazy" src="${carteObjet.images.large}" alt="${carteObjet.name}" class='uneCarte'>
                        </a>
                        <div class="desc">${carteObjet.name}</div>
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
        let objet = await CarteEquipementProvider.getCarteEquipement(request.id);
        let cartes = await  CarteProvider.getCarteByItems(objet.id);
        cartes = await CarteProvider.filterByMesCartes(cartes);
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