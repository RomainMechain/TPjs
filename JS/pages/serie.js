import CarteProvider from "../services/CarteProvider.js";
import Utiles from "../services/utiles.js";
import SerieProvider from "../services/SerieProvider.js";

export default class Serie {

    static async render () {
        let request = Utiles.parseRequestURL();
        let serie = await SerieProvider.getseries(request.id);
        let cartesSeries = await CarteProvider.getCartesByidSerie(request.id);
        let cartes = await CarteProvider.filterByMesCartes(cartesSeries);
        let view =  /*html*/`
            <link rel="stylesheet" href="../../css/serie.css">
            <section class='flex'>
                <di>
                    <img src="${serie.images.logo}" alt="${serie.name}"/ id='logo'>
                </di>
                <div id='info'>
                    <h1>${serie.name}</h1>
                    <p><span>De la série :</span>  ${serie.series}</p>
                    <p><span>Nombre de cartes :</span>  ${serie.total}</p>
                    <p><span>Sortie le :</span>  ${serie.releaseDate}</p>
                    <div class='flex'>
                    <p><span>Symbole :</span></p>
                    <img src="${serie.images.symbol}" alt="${serie.name}" id='symbole'/>
                    </div>
                </div>
            </section>
            <section>
            <h2>Tous les cartes</h2>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                ${ cartes.map(cartes => 
                    /*html*/`
                    <div class="gallery">
                        <a href="#/carte/${cartes.id}">
                            <img src="${cartes.images.large}" alt="${cartes.name}" class='uneCarte'>
                        </a>
                        <div class="desc">${cartes.name}</div>
                    </div>
                    `
                    ).join('\n ')
                }
            </div>
            </section>
        `
        return view
    }

}
