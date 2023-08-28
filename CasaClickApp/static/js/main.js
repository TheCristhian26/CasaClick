import { getFetch } from "./src/helpers/fetch.js";
const {api} = await getFetch('./src/helpers/api.json')
import { session } from "./src/helpers/session.js";

const menu = document.querySelector('.menu-toggle')
const menuBorder = document.querySelector('.mainNav')
const navAcces = document.querySelector('.linkAccess')
const printNew = document.querySelector('.newContent')
const printProperty = document.querySelector('.printPropiedades')

menu.addEventListener('click', () => {
  menuBorder.classList.toggle('hidden')
})

document.querySelectorAll('.exitAction').forEach(element => {
  element.addEventListener('click', () => {
    menuBorder.classList.toggle('hidden')
  })
})

if(!session) {
    navAcces.innerHTML = `
      <a href="./src/pages/public/login.html" class="login dflex faling-items fjustify-center">
          <i class='bx bxs-user-circle'></i>
          <p>Acceder</p>
      </a>
      <a href="#" class="register dflex faling-items fjustify-center">
          <i class='bx bxs-user-plus'></i>
          <p>Registrarte</p>
      </a>
    `
} else {
  navAcces.innerHTML = `
    <a href="./src/pages/private/home.html" class="dashboard dflex faling-items fjustify-center">
        <i class='bx bxs-dashboard' ></i>
        <p>Ir al tablero</p>
    </a>
    <a href="#" class="logout dflex faling-items fjustify-center">
          <i class='bx bx-log-out-circle logout1' ></i>
          <p class="logout1">Cerrar sesión</p>
    </a>
  `
}

document.querySelector('.linkAccess').addEventListener('click', e => {
  if(e.target.classList.contains('logout') || e.target.classList.contains('logout1')) {
    localStorage.clear()
    location.reload()
  }
})

//noticias request
let storeNews = ''
let iteracion = 0
const news = await getFetch(`${api}/news/getnews`)
news.length == 1 ? iteracion = 1 : null
news.length == 2 ? iteracion = 2 : null
news.length >= 3 ? iteracion = 3 : null
if(news.length > 0) {
  for (let i = 0; i < iteracion; i++) {
    storeNews += `
    <article class="card dflex fjustify-between" style="margin: 20px 0">
        <figure class=" dflex fjustify-center faling-items"><img src="${news[i].imgUrl}" alt="new-img"></figure>
        <div class="infoContent">
            <h3>${news[i].shorTitle}</h3>
            <p class="midWorld">${news[i].shorBody}</p>
            <a href="./src/pages/public/singleNew.html#${news[i]._id}#home">Ver</a>
        </div>
    </article>
    `
  }
} else {
  storeNews = '<h2>No hay noticias registradas</h2>'
}

printNew.innerHTML = storeNews

// propiedades request
const sites = await getFetch(`${api}/site/getsites`)
// condicion de impresion
sites.length >= 4 ? iteracion = 4 : null
let newProperty = ''
//bucle validador
if(sites.length > 0) {
  for (let i = 0; i < iteracion; i++) {
    newProperty += `
    <article class="card dflex fjustify-between" style="margin: 20px 0">
        <figure class=" dflex fjustify-center faling-items"><img src="${sites[i].label}" alt="new-img"></figure>
        <div class="infoContent">
            <h3>${sites[i].shortTitle}</h3>
            <p class="midWord">${sites[i].shortDescription}</p>
            <p class="midWord"> Categoria: <strong>${sites[i].category}</strong></p>
            <a href="./src/pages/public/singleSite.html#${sites[i]._id}#home">Ver</a>
        </div>
    </article>
    `
  }
} else {
  newProperty = '<h2>No hay Propiedades registradas</h2>'
}

printProperty.innerHTML = newProperty