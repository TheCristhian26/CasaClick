import { getFetch } from "../../helpers/fetch.js";
const {api} = await getFetch('./src/helpers/api.json');
import { 
    iconCasa, iconFinca, iconBar, iconLocal, iconApartamento, iconMarket
} from "../../helpers/iconMarker.js";

let marker = []

const markers = await getFetch(`${api}/site/getsites`)

const dataPop = () => {
    return `<a href="./src/pages/public/map.html">Ver mapa</a>`
}

const printL = (mark, lat, lon, icon) => {
    mark.push(L.marker([lat, lon], {icon: icon}).bindPopup(dataPop()).addTo(map))
}

let map = L.map('map').setView([7.377310, -72.646430], 15);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

document.querySelector('.leaflet-control-container').innerHTML = ''

markers.forEach(mar => {
    const {category, lat, lon} = mar;
    switch(category) {
        case 'casa':
            printL(marker, lat, lon, iconCasa)
            break
        case 'finca':
            printL(marker, lat, lon, iconFinca)
            break
        case 'local':
            printL(marker, lat, lon, iconLocal)
            break
        case 'apartamento':
            printL(marker, lat, lon, iconApartamento)
            break
        case 'tienda':
            printL(marker, lat, lon, iconMarket)
            break
        case 'bar':
            printL(marker, lat, lon, iconBar)
            break
    }
})

