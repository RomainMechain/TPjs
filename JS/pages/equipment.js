import CarteProvider from "../services/CarteProvider.js";
import Utiles from "../services/utiles.js";
import CarteEquipementProvider from "../services/CarteEquipementProvider.js";

export default class Equipement {
    static async render () {
        let request = Utiles.parseRequestURL();
        let objet = await CarteEquipementProvider.getCarteEquipement(request.id);
        
        let carteObjet = await  CarteProvider.getCarteByItems(objet.id);

        let view =  /*html*/`
            <link rel="stylesheet" href="../../css/carte.css">
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
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
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
            </section>
        `
        return view
    }
}