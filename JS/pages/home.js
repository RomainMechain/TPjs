import CarteProvider from "../services/CarteProvider.js";

export default class Home {
    static async render () {
        let cartes = await CarteProvider.getCartesFavories();
        console.log(cartes);
        let view =  /*html*/`
            <link rel="stylesheet" href="../../css/home.css">
            <h2>Page d'accueil</h2>
            <section>
            <h3>Les cartes favorites</h3>
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