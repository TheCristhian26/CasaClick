import { marker, map } from "./map.js";
import { getFetch } from "../../helpers/fetch.js";
const {api} = await getFetch('../../helpers/api.json');
import { 
    iconCasa, iconFinca, iconBar, iconLocal, iconApartamento, iconMarket
} from "../../helpers/iconMarker.js";

// Almacenamiento
let filterMarker = []

// peticion al servidor
const markersTwo = await getFetch(`${api}/site/getsites`)

// queryes
const reload = document.querySelector(".reload");
const fincaP = document.querySelector(".fincaPanel");
const casaP = document.querySelector(".casaPanel");
const apartamentoP = document.querySelector(".apartamentoPanel");
const localP = document.querySelector(".localPanel");
const marketP = document.querySelector(".marketPanel");
const barP = document.querySelector(".barPanel");

const dataPop2 = (label, shortT, shortD, _id) => {
    return `
                <div class="cardSite dflex faling-items fjustify-between">
                    <figure><img src="${label}"></img></figure>
                    <div class="dflex fdirection-column fjustify-between">
                        <h3>${shortT}</h3>
                        <p>${shortD}</p>
                        <a href="./singleSite.html#${_id}">Ver más</a>
                    </div>
                </div>
            `
}
const printL2 = (mark, lat, lon, label, shortTitle, shortDescription, _id, icon) => {
    mark.push(L.marker([lat, lon], {icon: icon}).bindPopup(dataPop2(
        label, shortTitle, shortDescription, _id
    )).addTo(map))
}

reload.addEventListener("click", () => {
    marker.forEach(el =>{
        map.removeLayer(el)
    })
    filterMarker.forEach(el => {
        map.removeLayer(el)
    })
    markersTwo.forEach(el => {
        const {label, shortTitle, shortDescription, _id, category, lat, lon} = el;
        switch(category) {
            case 'casa':
                printL2(filterMarker, lat, lon, label, shortTitle, shortDescription, _id, iconCasa)
                break
            case 'finca':
                printL2(filterMarker, lat, lon, label, shortTitle, shortDescription, _id, iconFinca)
                break
            case 'local':
                printL2(filterMarker, lat, lon, label, shortTitle, shortDescription, _id, iconLocal)
                break
            case 'apartamento':
                printL2(filterMarker, lat, lon, label, shortTitle, shortDescription, _id, iconApartamento)
                break
            case 'tienda':
                printL2(filterMarker, lat, lon, label, shortTitle, shortDescription, _id, iconMarket)
                break
            case 'bar':
                printL2(filterMarker, lat, lon, label, shortTitle, shortDescription, _id, iconBar)
                break
        }
    })
})

fincaP.addEventListener("click", () => {
    marker.forEach(el => {
        map.removeLayer(el)
    })
    filterMarker.forEach(el => {
        map.removeLayer(el)
    })
    markersTwo.forEach(el => {
        const {label, shortTitle, shortDescription, _id, category, lat, lon} = el
        if(category == "finca") {
            printL2(filterMarker, lat, lon, label, shortTitle, shortDescription, _id, iconFinca)
        }
    })
})

casaP.addEventListener("click", () => {
    marker.forEach(el => {
        map.removeLayer(el)
    })
    filterMarker.forEach(el => {
        map.removeLayer(el)
    })
    markersTwo.forEach(el => {
        const {label, shortTitle, shortDescription, _id, category, lat, lon} = el
        if(category == "casa") {
            printL2(filterMarker, lat, lon, label, shortTitle, shortDescription, _id, iconCasa)
        }
    })
})

apartamentoP.addEventListener("click", () => {
    marker.forEach(el => {
        map.removeLayer(el)
    })
    filterMarker.forEach(el => {
        map.removeLayer(el)
    })
    markersTwo.forEach(el => {
        const {label, shortTitle, shortDescription, _id, category, lat, lon} = el
        if(category == "apartamento") {
            printL2(filterMarker, lat, lon, label, shortTitle, shortDescription, _id, iconApartamento)
        }
    })
})

localP.addEventListener("click", () => {
    marker.forEach(el => {
        map.removeLayer(el)
    })
    filterMarker.forEach(el => {
        map.removeLayer(el)
    })
    markersTwo.forEach(el => {
        const {label, shortTitle, shortDescription, _id, category, lat, lon} = el
        if(category == "local") {
            printL2(filterMarker, lat, lon, label, shortTitle, shortDescription, _id, iconLocal)
        }
    })
})

marketP.addEventListener("click", () => {
    marker.forEach(el => {
        map.removeLayer(el)
    })
    filterMarker.forEach(el => {
        map.removeLayer(el)
    })
    markersTwo.forEach(el => {
        const {label, shortTitle, shortDescription, _id, category, lat, lon} = el
        if(category == "tienda") {
            printL2(filterMarker, lat, lon, label, shortTitle, shortDescription, _id, iconMarket)
        }
    })
})

barP.addEventListener("click", () => {
    marker.forEach(el => {
        map.removeLayer(el)
    })
    filterMarker.forEach(el => {
        map.removeLayer(el)
    })
    markersTwo.forEach(el => {
        const {label, shortTitle, shortDescription, _id, category, lat, lon} = el
        if(category == "bar") {
            printL2(filterMarker, lat, lon, label, shortTitle, shortDescription, _id, iconBar)
        }
    })
})
