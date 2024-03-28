import { ENDPOINT } from '../config.js'

export default class CarteEquipementManager {

    static addEquipementToCarte = async (idCarte, idEquipement) => {
        try {
            const response = await fetch(`${ENDPOINT+"carteEquipement/"+idCarte}`);
            const data = await response.json();
            const items = data.items;
    
            items.push(idEquipement);
    
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({items})
            };
            const updateResponse = await fetch(`${ENDPOINT+"carteEquipement/"+idCarte}`, options);
            const updateJson = await updateResponse.json();
            return updateJson;
        } catch (err) {
            console.log('Error getting documents', err)
        }
    }

    static removeEquipementFromCarte = async (idCarte, idEquipement) => {
        try {
            const response = await fetch(`${ENDPOINT+"carteEquipement/"+idCarte}`);
            const data = await response.json();
            const items = data.items;
    
            const index = items.indexOf(idEquipement);
            if (index > -1) {
                items.splice(index, 1);
            }
    
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({items})
            };
            const updateResponse = await fetch(`${ENDPOINT+"carteEquipement/"+idCarte}`, options);
            const updateJson = await updateResponse.json();
            return updateJson;
        } catch (err) {
            console.log('Error getting documents', err)
        }
    }

}