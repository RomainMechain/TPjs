import { ENDPOINT } from '../config.js'

export default class Pagination {

    static paginCartes = async (listCartes, page, limit) => {
        let start = (page - 1) * limit;
        let end = page * limit;
        return listCartes.slice(start, end);
    }
}