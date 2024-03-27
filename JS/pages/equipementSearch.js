import CarteEquipementProvider from "../services/CarteEquipementProvider.js";

export default class EquipementSearch {

    static async render () {
        let equipement = await CarteEquipementProvider.fetchCarteEquipement();
        let view =  /*html*/`
            <link rel="stylesheet" href="./css/equipementSearch.css">
            <script src="./JS/searchBar.js"></script>
            <h2>Toutes les cartes</h2>
            <form class="d-flex">
            <input class="form-control me-sm-2" type="search" placeholder="recherche par nom d'équipement ou par artiste" id="searchBar" oninput="searchbar()">
            </form>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                ${ equipement.map(equipement => 
                    /*html*/`
                    <div class="gallery">
                        <a href="#/equipement/${equipement.id}">
                            <img class="equipement"src="${equipement.images.large}" alt="${equipement.name}" >
                        </a>
                        <div class="desc">${equipement.name}</div>
                        <div class="artiste" style="display: none;">${equipement.artist}</div>

                    </div>
                    `
                    ).join('\n ')
                }
            </div>
        `
        return view
    }
}