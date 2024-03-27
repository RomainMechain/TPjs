import CarteProvider from "../services/CarteProvider.js";
import Utiles from "../services/utiles.js";
import CarteEquipementProvider from "../services/CarteEquipementProvider.js";


export default class Carte {

        static async render () {
            let request = Utiles.parseRequestURL();
            let cartes = await CarteProvider.getCartes(request.id);
            let objet = await CarteEquipementProvider.getCarteEquipementByItems(cartes.items);
            let mesCartes = JSON.parse(localStorage.getItem('mesCartes'));
            let currentLevel = 0;
            for (let i = 0; i < mesCartes.length; i++) {
                if (mesCartes[i][0] == request.id) {
                    currentLevel = mesCartes[i][1];
                }
            }

            let view =  /*html*/`
                <link rel="stylesheet" href="../../css/carte.css">
                <section class='flex'>
                    <di>
                        <img classe="carte" src="${cartes.images.large}" alt="${cartes.name}"/ id='logo'>
                    </di>
                    <div id='info'>
                        <div class='flex'>
                        <h1>${cartes.name}</h1>
                        </div>
                        <p id='test'><span class='label'>De type :</span>  ${cartes.subtypes}</p>
                        <p><span class='label'>Numeros de carte :</span>  ${cartes.number}</p>
                        <p><span class='label'>Artiste :</span>  ${cartes.artist}</p>
                        <p><span class='label'>Rareté :</span>  ${cartes.rarity}</p>
                        <p><span>Niveau actuel :</span>  <span id='level'>${currentLevel}</span></p>
                        
                    </div>
                </section>
                <button id="${cartes.id}" class='bouttonFav'>Ajouter aux favoris</button>
                <button id="${cartes.id}" class='bouttonNiveau'>Monter de niveau</button>
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

        static afterRender() {
            let request = Utiles.parseRequestURL();
            let favoriteButton = document.querySelector('.bouttonFav');
        
            let favorites = localStorage.getItem('favories');
            if (favorites) {
                favorites = JSON.parse(favorites);
                if (favorites.indexOf(request.id) !== -1) {
                    favoriteButton.textContent = 'Retirer des favoris';
                } else {
                    favoriteButton.textContent = 'Ajouter aux favoris';
                }
            } else {
                favoriteButton.textContent = 'Ajouter aux favoris';
            }
        
            favoriteButton.addEventListener('click', function() {
                favorites = localStorage.getItem('favories');
                if (favorites) {
                    favorites = JSON.parse(favorites);
                    const index = favorites.indexOf(request.id);
                    if (index !== -1) {
                        favorites.splice(index, 1);
                        favoriteButton.textContent = 'Ajouter aux favoris';
                    } else {
                        favorites.push(request.id);
                        favoriteButton.textContent = 'Retirer des favoris';
                    }
                } else {
                    favorites = [request.id];
                    favoriteButton.textContent = 'Retirer des favoris';
                }
                console.log("Les favoris :", favorites);
                localStorage.setItem('favories', JSON.stringify(favorites));
            });


            let niveauButton = document.querySelector('.bouttonNiveau');
            niveauButton.addEventListener('click', function() {
                let mesCartes = JSON.parse(localStorage.getItem('mesCartes'));
                console.log("Mes cartes :", mesCartes);
                for (let i = 0; i < mesCartes.length; i++) {
                    if (mesCartes[i][0] == request.id) {
                        mesCartes[i][1]++;
                        console.log("Niveau de la carte :", mesCartes[i][1]);
                        document.getElementById('level').textContent = mesCartes[i][1];
                    }
                }
                localStorage.setItem('mesCartes', JSON.stringify(mesCartes));
            });
        }
    }