import Carte from "./pages/carte.js"
import Equipement from "./pages/equipment.js"
import EquipementSearch from "./pages/equipementSearch.js"
import Home from "./pages/home.js"
import Serie from "./pages/serie.js"
import SerieSearch from "./pages/carte.js"
import Error404 from "./pages/error404.js"

import Utiles from "./services/utiles.js"
import CarteProvider from "./services/CarteProvider.js"

const routes = {
    '/': Home,
    '/carte': Carte,
    '/equipement': Equipement,
    '/equipementSearch': EquipementSearch,
    '/serie/:id': Serie,
    '/serieSearch': SerieSearch,
};


const router = async () => {
    const content = null || document.querySelector('#content');
    let request = Utiles.parseRequestURL()
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')
    let page = routes[parsedURL] ? new routes[parsedURL] : Error404 
    content.innerHTML = await page.render();
}

//localStorage.clear();


if(localStorage.getItem('favories') !== null) {
    console.log(localStorage.getItem('favories'));
} else {
    localStorage.setItem('favories', JSON.stringify([]));
}

if(localStorage.getItem('mesCartes') !== null) {
    console.log(localStorage.getItem('mesCartes'));
} else {
    let mesCartes = [];
    let cartesBasic = await CarteProvider.getCartesBasic();
    for(let i = 0; i < cartesBasic.length; i++) {
        mesCartes.push(cartesBasic[i].id);
    }
    localStorage.setItem('mesCartes', JSON.stringify(mesCartes));
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);