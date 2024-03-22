import Carte from "./pages/carte.js"
import Equipement from "./pages/equipment.js"
import EquipementSearch from "./pages/equipementSearch.js"
import Home from "./pages/home.js"
import Serie from "./pages/serie.js"
import SerieSearch from "./pages/carte.js"
import Error404 from "./pages/error404.js"

import Utiles from "./services/utiles.js"

const routes = {
    '/': Home,
    '/carte': Carte,
    '/equipement': Equipement,
    '/equipementSearch': EquipementSearch,
    '/serie': Serie,
    '/serieSearch': SerieSearch,
};


const router = async () => {
    const content = null || document.querySelector('#content');
    let request = Utiles.parseRequestURL()
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')
    let page = routes[parsedURL] ? new routes[parsedURL] : Error404 
    content.innerHTML = await page.render();
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);