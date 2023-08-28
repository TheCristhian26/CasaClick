import {getFetch} from '../../helpers/fetch.js';
const {api} = await getFetch('../../helpers/api.json');
const id = location.hash.split('#')[1]
const returnValidator = location.hash.split('#')[2]
import { 
    iconCasa, iconFinca, iconBar, iconLocal, iconApartamento, iconMarket
} from "../../helpers/iconMarker.js";

// validacion para retornar la pagina
let reBtn
returnValidator == 'home' ? reBtn = '../../../index.html#propiedades' : reBtn = './map.html'
document.querySelector('.btnReturn').href = reBtn

// traer datos
const res = await getFetch(`${api}/site/getsite/${id}`)
if(res) {
    document.querySelector('.loader').classList.toggle('loaderStop') 
}
document.title = 'Casa Click | ' + res.title

// creacion de la informacion
const {
    title, label, longDescription, lat, lon, address, category
} = res;

let map = L.map('map').setView([lat, lon], 15);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);
document.querySelector('.leaflet-control-container').innerHTML = ''

// querySelector
document.querySelector('.titleSingle').innerHTML = title;
document.querySelector('.categorySingle').innerHTML = category;
document.querySelector('.addressSingle').innerHTML = `Dirección: ${address}`;
document.querySelector('.singleDescription').innerHTML = longDescription;
document.querySelector('.imgSingle').src = label
document.querySelector('.ruteSingle').href = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`
document.querySelector('.galeryHref').href = `./singleGalery.html#${id}`


switch(category) {
    case 'casa':
        L.marker([lat, lon], {icon: iconCasa}).bindPopup(
            `<h4>${address}</h4>
            <p>Categoría: ${category}</p>`
        ).addTo(map)
        break
    case 'finca':
        L.marker([lat, lon], {icon: iconFinca}).bindPopup(
            `<h4>${address}</h4>
            <p>Categoría: ${category}</p>`
        ).addTo(map)
        break
    case 'local':
        L.marker([lat, lon], {icon: iconLocal}).bindPopup(
            `<h4>${address}</h4>
            <p>Categoría: ${category}</p>`
        ).addTo(map)
        break
    case 'apartamento':
        L.marker([lat, lon], {icon: iconApartamento}).bindPopup(
            `<h4>${address}</h4>
            <p>Categoría: ${category}</p>`
        ).addTo(map)
        break
    case 'bar':
        L.marker([lat, lon], {icon: iconBar}).bindPopup(
            `<h4>${address}</h4>
            <p>Categoría: ${category}</p>`
        ).addTo(map)
        break
    case 'tienda':
        L.marker([lat, lon], {icon: iconMarket}).bindPopup(
            `<h4>${address}</h4>
            <p>Categoría: ${category}</p>`
        ).addTo(map)
        break
}