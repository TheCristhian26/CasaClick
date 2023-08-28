import { getFetch } from "../../helpers/fetch.js";
const {api} = await getFetch('../../helpers/api.json');
const citys = await getFetch(`${api}/city/get`);
console.log(citys)
import { 
    iconCasa, iconFinca, iconBar, iconLocal, iconApartamento, iconMarket
} from "../../helpers/iconMarker.js";

let marker = []

const markers = await getFetch(`${api}/site/getsites`)
const dataPop = (label, shortT, shortD, _id) => {
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
const printL = (mark, lat, lon, label, shortTitle, shortDescription, _id, icon) => {
    mark.push(L.marker([lat, lon], {icon: icon}).bindPopup(dataPop(
        label, shortTitle, shortDescription, _id
    )).addTo(map))
}

let map = L.map('map').setView([7.377310, -72.646430], 15);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

document.querySelector('.leaflet-control-container').innerHTML = ''

markers.forEach(mar => {
    const {label, shortTitle, shortDescription, _id, category, lat, lon} = mar;
    switch(category) {
        case 'casa':
            printL(marker, lat, lon, label, shortTitle, shortDescription, _id, iconCasa)
            break
        case 'finca':
            printL(marker, lat, lon, label, shortTitle, shortDescription, _id, iconFinca)
            break
        case 'local':
            printL(marker, lat, lon, label, shortTitle, shortDescription, _id, iconLocal)
            break
        case 'apartamento':
            printL(marker, lat, lon, label, shortTitle, shortDescription, _id, iconApartamento)
            break
        case 'tienda':
            printL(marker, lat, lon, label, shortTitle, shortDescription, _id, iconMarket)
            break
        case 'bar':
            printL(marker, lat, lon, label, shortTitle, shortDescription, _id, iconBar)
            break
    }
})

export { marker, map, printL }

//Inyestar ciudades a la vista

let cityStore = ''
const printCity = document.querySelector('#city')
citys.forEach(({title}) => {
    cityStore += `<option>${title}</option>`
})
printCity.innerHTML = cityStore

printCity.addEventListener('change', (e) => {
    const {lat, lon} = citys.filter(site => site.title.toLowerCase().includes(e.target.value.toLowerCase()))[0]
    map.flyTo([lat, lon], 16)
})