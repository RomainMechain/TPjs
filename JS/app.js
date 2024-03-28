import Carte from "./pages/carte.js"
import Equipement from "./pages/equipment.js"
import EquipementSearch from "./pages/equipementSearch.js"
import Home from "./pages/home.js"
import Serie from "./pages/serie.js"
import SerieSearch from "./pages/seriesSearch.js"
import Error404 from "./pages/error404.js"

import Utiles from "./services/utiles.js"
import CarteProvider from "./services/CarteProvider.js"

const routes = {
    '/': Home,
    '/carte/:id': Carte,
    '/equipement/:id': Equipement,
    '/equipementsearch': EquipementSearch,
    '/serie/:id': Serie,
    '/seriesearch': SerieSearch,
};


const router = async () => {
    const content = null || document.querySelector('#content');
    console.log(content)
    let request = Utiles.parseRequestURL()
    console.log(request)
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')
    console.log(parsedURL)
    let page = routes[parsedURL]  
    console.log(page)
    content.innerHTML = await page.render();
    if(page.renderEquipements){
        await page.renderEquipements();
    }
    if (page.afterRender) {
        await page.afterRender();
    }
    
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