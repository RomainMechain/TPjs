import { ENDPOINT } from '../config.js'
import CarteProvider from './CarteProvider.js';

export default class CarteEquipementManager {

    static addEquipementToCarte = async (idCarte, idEquipement) => {
        //fetch le JSON de la carte
        let carte = await CarteProvider.getCartes(idCarte);
        //ajoute l'id de l'équipement dans le tableau items
        let items = carte.items;
        items.push(idEquipement);
        //PUT le JSON de la carte
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(carte)
        };
        const response = await fetch(`${ENDPOINT+"cartes/"+idCarte}`, options);
        const json = await response.json();
        console.log(json);
        return json;
        
    }

    static removeEquipementFromCarte = async (idCarte, idEquipement) => {
        //fetch le JSON de la carte
        let carte = await CarteProvider.getCartes(idCarte);
        //retire l'id de l'équipement dans le tableau items
        let items = carte.items;
        const index = items.indexOf(idEquipement);
        if (index > -1) {
            items.splice(index, 1);
        }
        //PUT le JSON de la carte
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(carte)
        };
        const response = await fetch(`${ENDPOINT+"cartes/"+idCarte}`, options);
        const json = await response.json();
        console.log(json);
        return json;
    }

}