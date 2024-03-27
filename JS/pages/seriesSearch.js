import SerieProvider from "../services/SerieProvider.js";

export default class SerieSearch {
    static async render () {
        let seriesList = await SerieProvider.fetchSeries();
        let view =  /*html*/`
            <link rel="stylesheet" href="./css/seriesSearch.css">
            <h2>Toutes les series</h2>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                ${ seriesList.map(series => 
                    /*html*/`
                    <div class="col">
                    <div class="card shadow-sm">
                    <div class="card-header">
                        <img class="bd-placeholder-img card-img-top" width="100%" height="225" src="${series.images.logo}" role="img" aria-label="Placeholder: Thumbnail" focusable="false" alt="${series.name}">
                        </div>
                        <div class="card-body">
                            <p class="card-text">${series.name ? series.name.slice(0,100) : ''}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                <a href="#/serie/${series.id}" class="btn btn-sm btn-outline-secondary">Voir ${series.name}</a>
                                </div>
                                <small class="text-body-secondary">${series.id}</small>
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