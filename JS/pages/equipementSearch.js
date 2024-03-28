import CarteEquipementProvider from "../services/CarteEquipementProvider.js";

export default class EquipementSearch {

    static async render () {
        let equipement = await CarteEquipementProvider.fetchCarteEquipement();
        let view =  /*html*/`
            <link rel="stylesheet" href="./css/equipementSearch.css">
            <h2>Toutes les cartes</h2>
            <form class="d-flex">
            <input class="form-control me-sm-2" type="search" placeholder="recherche par nom d'équipement ou par artiste" id="searchBar" >
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
    static renderEquipements(equipement) {
        if (!equipement) {
            console.error("Equipement is undefined");
            return ''; // Return an empty string if equipement is undefined
        }
    
        let html = '';
        html += `
            <div class="gallery" data-id="${equipement.id}">
                <a href="#/equipement/${equipement.id}">
                    <img class="equipement" src="${equipement.images.large}" alt="${equipement.name}">
                </a>
                <div class="desc">${equipement.name}</div>
                <div class="artiste" style="display: none;">${equipement.artist}</div>
            </div>
        `;
    
        return html;
    }
    

    static async afterRender() {
        console.log("afterRender");
        const searchBar = document.getElementById('searchBar');
    
        searchBar.addEventListener('keyup', async (e) => {
    
            const entrée = searchBar.value.toLowerCase();
    
            // Clear previous search results
            const listItems = document.querySelectorAll('.gallery');
            listItems.forEach(item => {
                item.remove(); // Remove previous items from the page
            });
    
            try {
                // Wait for the equipment to be resolved
                const equipement = await CarteEquipementProvider.fetchCarteEquipement();
                
                // Filter and append elements corresponding to the search
                equipement.forEach(equip => {
                    const texte = equip.name.toLowerCase();
                    const artiste = equip.artist.toLowerCase();
                    if (texte.includes(entrée) || artiste.includes(entrée)) {
                        const galleryHTML =  EquipementSearch.renderEquipements(equip);
                        // Append the new item to the container
                        document.querySelector('.row').innerHTML += galleryHTML;
                    }
                });
            } catch (error) {
                console.error("Error fetching equipment:", error);
            }
        });
    }
    
    
    

    
    
    
    }
    