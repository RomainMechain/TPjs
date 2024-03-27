import CarteEquipementProvider from "../services/CarteEquipementProvider.js";

export default class EquipementSearch {

    static async render () {
        let equipement = await CarteEquipementProvider.fetchCarteEquipement();
        let view =  /*html*/`
            <link rel="stylesheet" href="./css/equipementSearch.css">
            <h2>Toutes les cartes</h2>
            <form class="d-flex">
            <input class="form-control me-sm-2" type="search" placeholder="Search" id="searchBar" oniput='search()'>
            <button class="btn btn-secondary my-2 my-sm-0" type="submit" id="searchBar">Search</button>
            </form>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                ${ equipement.map(equipement => 
                    /*html*/`
                    <div class="gallery">
                        <a href="#/equipement/${equipement.id}">
                            <img class="equipement"src="${equipement.images.large}" alt="${equipement.name}" >
                        </a>
                        <div class="desc">${equipement.name}</div>
                    </div>
                    `
                    ).join('\n ')
                }
            </div>
        `
        return view
    }
}