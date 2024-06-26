import { ENDPOINT } from '../config.js'

export default class CarteProvider {

    static fetchCartes = async () => {
        const options = {
           method: 'GET',
           headers: {
               'Content-Type': 'application/json'
           }
       };
       try {
           const response = await fetch(`${ENDPOINT+"cartes"}`, options)
           const json = await response.json();
           return json
       } catch (err) {
           console.log('Error getting documents', err)
       }
    }

    static getCartes = async (id) => {
        const options = {
           method: 'GET',
           headers: {
               'Content-Type': 'application/json'
           }
       };
       
       try {
           const response = await fetch(`${ENDPOINT+"cartes"}/` + id, options)
           const json = await response.json();
           return json
       } catch (err) {
           console.log('Error getting documents', err)
       }
    }

    static getCartesByidSerie = async (id) => {
        let cartes = await this.fetchCartes();
        return cartes.filter(carte => carte.idSerie == id);
    }

    static getCartesBasic = async () => {
        let cartes = await this.fetchCartes();
        return cartes.filter(carte => carte.subtypes[0] == 'Basic')
    }

    static getCarteByItems = async (id) => {
        let cartes = await this.fetchCartes();
        let res = [];
        for(let i = 0; i < cartes.length; i++) {
            if(cartes[i].items && cartes[i].items.includes(id)) {
                res.push(cartes[i]);
            }
        }
        return res;
    }

    static filterByMesCartes = async (mesCartes) => {
        let mesCartesJSON = JSON.parse(localStorage.getItem('mesCartes'));
        let res = [];
        for(let i = 0; i < mesCartes.length; i++) {
            for(let j = 0; j < mesCartesJSON.length; j++) {
                if(mesCartes[i].id == mesCartesJSON[j][0]) {
                    res.push(mesCartes[i]);
                }
            }
        }
        console.log("Mes cartes de mes cartes :", res);
        return res;
    }

    static getCartesFavories = async () => {
        let favories = JSON.parse(localStorage.getItem('favories'));
        console.log("Les favories du provider :", favories);
        let cartes = await this.fetchCartes();
        let res = [];
        for(let i = 0; i < cartes.length; i++) {
            if(favories.includes(cartes[i].id)) {
                res.push(cartes[i]);
            }
        }
        return res;
    }
}

