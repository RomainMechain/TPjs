import Carte from "./pages/carte.js"
import Equipement from "./pages/equipment.js"
import EquipementSearch from "./pages/equipementSearch.js"
import Home from "./pages/home.js"
import Serie from "./pages/serie.js"
import SerieSearch from "./pages/seriesSearch.js"
import Error404 from "./pages/error404.js"

import Utiles from "./services/utiles.js"

const routes = {
    '/': Home,
    '/carte': Carte,
    '/equipement': Equipement,
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
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);