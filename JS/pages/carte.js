import CarteProvider from "../services/CarteProvider.js";
import Utiles from "../services/utiles.js";
import CarteEquipementProvider from "../services/CarteEquipementProvider.js";


export default class Carte {

        static async render () {
            let request = Utiles.parseRequestURL();
            let cartes = await CarteProvider.getCartes(request.id);
            let objet = await CarteEquipementProvider.getCarteEquipementByItems(cartes.items);

            let view =  /*html*/`
                <link rel="stylesheet" href="../../css/carte.css">
                <section class='flex'>
                    <di>
                        <img classe="carte" src="${cartes.images.large}" alt="${cartes.name}"/ id='logo'>
                    </di>
                    <div id='info'>
                        <h1>${cartes.name}</h1>
                        <p><span>De type :</span>  ${cartes.subtypes}</p>
                        <p><span>Numeros de carte :</span>  ${cartes.number}</p>
                        <p><span>evolue en :</span>  ${cartes.evolvesTo}</p>
                        <p><span>Artiste :</span>  ${cartes.artist}</p>
                        <p><span>Rareté :</span>  ${cartes.rarity}</p>

                        
                    </div>
                </section>
                <section>
                <h2>Tous les objets</h2>
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    ${ objet.map(objet => 
                        /*html*/`
                        <div class="gallery">
                            <a href="#/equipement/${objet.id}">
                                <img src="${objet.images.large}" alt="${objet.name}" class='uneCarte'>
                            </a>
                            <div class="desc">${objet.name}</div>
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
    
