import { ENDPOINT } from '../config.js'

export default class CarteEquipementProvider {

    static fetchCarteEquipement = async () => {
        const options = {
           method: 'GET',
           headers: {
               'Content-Type': 'application/json'
           }
       };
       try {
           const response = await fetch(`${ENDPOINT+"carteEquipement"}`, options)
           const json = await response.json();
           return json
       } catch (err) {
           console.log('Error getting documents', err)
       }
    }

    static getCarteEquipement = async (id) => {
        const options = {
           method: 'GET',
           headers: {
               'Content-Type': 'application/json'
           }
       };
       
       try {
           const response = await fetch(`${ENDPOINT+"carteEquipement"}/` + id, options)
           const json = await response.json();
           return json
       } catch (err) {
           console.log('Error getting documents', err)
       }
    }
    static getCarteEquipementByItems = async (items) => {
        let cartesEquipement = await this.fetchCarteEquipement();
        return cartesEquipement.filter(carteEquipement => items.includes(carteEquipement.id));
    }


    
}