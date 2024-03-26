import CarteProvider from "../services/CarteProvider.js";

export default class Serie {
    static async render () {
        let articles = await CarteProvider.fetchCartes();
        let view =  /*html*/`
            <h2>Tous les cartes</h2>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                ${ articles.map(article => 
                    /*html*/`
                    <div class="col">
                    <div class="card shadow-sm">
                        <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="${article.images.small}" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">${article.title}</text></svg>
                        <div class="card-body">
                            <p class="card-text">${article.text ? article.text.slice(0,100) : ''}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                <a href="#/articles/${article.id}" class="btn btn-sm btn-outline-secondary">Voir ${article.name}</a>
                                </div>
                                <small class="text-body-secondary">${article.id}</small>
                            </div>
                        </div>
                    </div>
                    </div>
                    `
                    ).join('\n ')
                }
            </div>
        `
        return view
    }

}
