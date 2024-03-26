import CarteProvider from "../services/CarteProvider.js";
import Utiles from "../services/utiles.js";
import SerieProvider from "../services/SerieProvider.js";

export default class Serie {

    async render () {
        let request = Utiles.parseRequestURL();
        let serie = await SerieProvider.getseries(request.id);
        let cartes = await CarteProvider.fetchCartes();
        let view =  /*html*/`
            <link rel="stylesheet" href="../../css/serie.css">
            <section class='flex'>
                <di>
                    <img src="${serie.images.logo}" alt="${serie.name}"/ id='logo'>
                </di>
                <div>
                    <h1>${serie.name}</h1>
                    <p><span>De la série : </span>${serie.series}</p>
                    <p><span>Nombre de cartes : </span>${serie.total}</p>
                    <p><span>Sortie le : </span>${serie.releaseDate}</p>
                    <div class='flex'>
                    <p><span>Symbole : </span></p>
                    <img src="${serie.images.symbol}" alt="${serie.name}"/>
                    </div>
                </div>
            </section>
            <section>
            <h2>Tous les cartes</h2>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                ${ cartes.map(cartes => 
                    /*html*/`
                    <div class="col">
                    <div class="card shadow-sm">
                        <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="${cartes.images.small}" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">${cartes.title}</text></svg>
                        <div class="card-body">
                            <p class="card-text">${cartes.text ? cartes.text.slice(0,100) : ''}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                <a href="#/carte/${cartes.id}" class="btn btn-sm btn-outline-secondary">Voir ${cartes.name}</a>
                                </div>
                                <small class="text-body-secondary">${cartes.id}</small>
                            </div>
                        </div>
                    </div>
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
