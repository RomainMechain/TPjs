import CarteProvider from "../services/CarteProvider.js";
import Utiles from "../services/utiles.js";
import CarteEquipementProvider from "../services/CarteEquipementProvider.js";
import CarteEquipementManager from "../services/CarteEquipementManager.js";


export default class Carte {

        static async render () {
            let request = Utiles.parseRequestURL();
            let cartes = await CarteProvider.getCartes(request.id);
            let objet = await CarteEquipementProvider.getCarteEquipementByItems(cartes.items);
            let allObjet = await CarteEquipementProvider.fetchCarteEquipement();
            let difference = allObjet.filter(o1 => !objet.some(o2 => o1.id === o2.id));
            let mesCartes = JSON.parse(localStorage.getItem('mesCartes'));
            let MesNotes = JSON.parse(localStorage.getItem('MesNotes'));
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
                        <img loading="lazy" classe="carte" src="${cartes.images.large}" alt="${cartes.name}"/ id='logo'>
                    </di>
                    <div id='info'>
                        <div class='flex'>
                        <h1>${cartes.name}</h1>
                        </div>
                        <p id='test'><span class='label'>De type :</span>  ${cartes.types}</p>
                        <p><span class='label'>Numeros de carte :</span>  ${cartes.number}</p>
                        <p><span class='label'>Artiste :</span>  ${cartes.artist}</p>
                        <p><span class='label'>Rareté :</span>  ${cartes.rarity}</p>
                        <p><span class='label'>Niveau actuel :</span>  <span id='level'>${currentLevel}</span></p>
                        <p><span class='label'>Evolution possible :</span>  ${cartes.evolvesTo != null}</p>
                        <p><span class='label'>Note :</span>  <span id='resnote'>${MesNotes[request.id]}</span></p>
                        <label for="dog-names">choisir note:</label> 
                        <select name="notes" id="note"> 
                            <option value="0">0</option> 
                            <option value="1">1</option> 
                            <option value="2">2</option> 
                            <option value="3">3</option> 
                            <option value="4">4</option>
                            <option value="5">5</option> 
                        </select>
                        <button id="${cartes.id}" class='bouttonNote'>Noter</button>
                        
                    </div>
                </section>
                <button id="${cartes.id}" class='bouttonFav'>Ajouter aux favoris</button>
                <button id="${cartes.id}" class='bouttonNiveau'>Monter de niveau</button>
                <section>
                <h2>Tous les objets</h2>
                <label for="objet">choisir un objet:</label>
                <select name="ojbet" id="ojbet">
                    ${ difference.map(Aobjet => 
                        /*html*/`
                            <option value="${Aobjet.id}">${Aobjet.name}</option> 
                        `
                        ).join('\n ')}
                    </select>
                <button id="ajoutObjet" class='bouttonObjet'>Ajouter</button>
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3" id='carteEquipementContainer'>
                    ${ objet.map(objet => 
                        /*html*/`
                        <div class="gallery" id="${objet.id}">
                            <a href="#/equipement/${objet.id}">
                                <img loading="lazy" src="${objet.images.large}" alt="${objet.name}" class='uneCarte'>
                            </a>
                            <div class="desc">${objet.name}</div>
                            <button id="${objet.id}" class='boutonsupprimer'>Supprimer</button>
                        </div>
                        `
                        ).join('\n ')
                    }
                </div>
                </section>
            `
            return view
        }

        static async afterRender() {
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


            let cartes = await CarteProvider.getCartes(request.id);
            let niveauButton = document.querySelector('.bouttonNiveau');
            niveauButton.addEventListener('click', function() {
                let mesCartes = JSON.parse(localStorage.getItem('mesCartes'));
                console.log("Mes cartes :", mesCartes);
                for (let i = 0; i < mesCartes.length; i++) {
                    if (mesCartes[i][0] == request.id) {
                        mesCartes[i][1]++;
                        console.log("Niveau de la carte :", mesCartes[i][1]);
                        document.getElementById('level').textContent = mesCartes[i][1];
                        if (mesCartes[i][1] >= cartes.level && cartes.evolvesTo != null) {
                            console.log("Evolution de la carte en ", cartes.evolvesTo[0]);
                            //Ajoute la carte évoluée à mesCartes avec le niveau de la carte actuelle
                            mesCartes.push([cartes.evolvesTo[0], mesCartes[i][1]]);
                            //Verifie si elle est dans les favories et ajoute la nouvelle carte dedans si c'est le cas
                            let favorites = localStorage.getItem('favories');
                            if (favorites) {
                                favorites = JSON.parse(favorites);
                                if (favorites.indexOf(request.id) !== -1) {
                                    favorites.push(cartes.evolvesTo[0]);
                                    localStorage.setItem('favories', JSON.stringify(favorites));
                                }
                            }
                            //enlève la carte de mesCartes
                            mesCartes.splice(i, 1);
                            //redirimger vers la page de la nouvelle carte
                            location.href = `#/carte/${cartes.evolvesTo[0]}`;
                        }
                    }
                }
                localStorage.setItem('mesCartes', JSON.stringify(mesCartes));
            });

            let noteButton = document.querySelector('.bouttonNote');
            noteButton.addEventListener('click', function() {
                let MesNotes = JSON.parse(localStorage.getItem('MesNotes'));
                console.log("Mes notes :", MesNotes);
                let note = document.getElementById('note').value;
                MesNotes[request.id] = note;
                console.log("Note de la carte :", MesNotes[request.id]);
                localStorage.setItem('MesNotes', JSON.stringify(MesNotes));
                document.getElementById('resnote').textContent = note;
            });

            let ajoutObjetButton = document.querySelector('.bouttonObjet');
            ajoutObjetButton.addEventListener('click', function() {
                let objet = document.getElementById('ojbet').value;
                CarteEquipementManager.addEquipementToCarte(request.id, objet);
                Carte.renderCarteEquipement(objet);
                //enlève l'objet des options de l'input
                let select = document.getElementById('ojbet');
                let opt = select.querySelector(`option[value="${objet}"]`);
                select.removeChild(opt);

            });
            let supprimerObjetButtons = document.querySelectorAll('.boutonsupprimer');
            supprimerObjetButtons.forEach(supprimerObjetButton => {
                supprimerObjetButton.addEventListener('click', function() {
                    let objet = supprimerObjetButton.id;
                    CarteEquipementManager.removeEquipementFromCarte(request.id, objet);
                    let element = document.getElementById(objet);
                    console.log(element);
                    console.log("Element à supprimer :", element.id);
                    if (element) {
                        element.parentNode.removeChild(element);
                    } else {
                        console.log("Element introuvable");
                    } 
                    // ajouter l'objet des options de l'input
                    let elements = element.getElementsByClassName("desc");
                    let name = "";
                        for (let i = 0; i < elements.length; i++) {
                            name = elements[i].innerHTML;
                            console.log(name);
                        }
                        console.log(objet)
                        let select = document.getElementById('ojbet');
                        // select.appendChild(new Option(name, objet));

                    // let opt = select.querySelector(`option[value="${objet}"]`);
                    // console.log(opt)
                    // select.removeChild(opt);
                });
                
            });
        }

        static renderCarteEquipement = async (id) => {
            let cartes = await CarteEquipementProvider.getCarteEquipement(id);
            let container = document.getElementById('carteEquipementContainer');
            let view =  /*html*/`
                <div class="gallery" id="${cartes.id}">
                    <a href="#/carte/${cartes.id}">
                        <img loading="lazy" src="${cartes.images.large}" alt="${cartes.name}" class='uneCarte'>
                    </a>
                    <div class="desc">${cartes.name}</div>
                    <button id="${cartes.id}" class='boutonsupprimer'>Supprimer</button>
                </div>
            `
            container.innerHTML += view;
            await this.afterRender();
        }


    }