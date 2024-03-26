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

    static filterByMesCartes = async (mesCartes) => {
        let mesCartesJSON = JSON.parse(localStorage.getItem('mesCartes'));
        let res = [];
        for(let i = 0; i < mesCartes.length; i++) {
            if(mesCartesJSON.includes(mesCartes[i].id)) {
                res.push(mesCartes[i]);
            }
        }
        return res;
    }
}

