import { getFetch } from "../../helpers/fetch.js";
const {api} = await getFetch('../../helpers/api.json');

// region QuerySelector
const mainSites = document.querySelector(".contentSites")

// endregion

// region Variables y constrantes
let storeSite = ''
const allSites = await getFetch(`${api}/site/getsites`)
let backUps = allSites

// endregion

const recorridoArray = (array) => {
    let almacen = ''
    array.forEach(({_id, shortTitle, label}) => {
        almacen += `
            <div class="singleGaleryCard">
                <a href="./singleGalery.html#${_id}">
                    <div class="titleCard">
                        <h4>${shortTitle}</h4>
                    </div>
                    <img src="${label}"/>
                </a>
            </div>
        `
    })
    return almacen
}

const printSitesImg = () => {
    mainSites.innerHTML = recorridoArray(backUps)
}

const buscarDato = (busqueda) => {
    backUps = !busqueda 
    ? allSites 
    : allSites.filter(site => site.shortTitle.toLowerCase().includes(busqueda.toLowerCase()) || site.title.toLowerCase().includes(busqueda.toLowerCase()))
    mainSites.innerHTML = recorridoArray(backUps)
}

printSitesImg()

// region Eventos
document.querySelector('.search').addEventListener('input', () => {
    const busqueda = document.querySelector('.search')
    buscarDato(busqueda.value)
})
// endregion
