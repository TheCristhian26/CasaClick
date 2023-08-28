import { getFetch } from "../../helpers/fetch.js";
const {api} = await getFetch('../../helpers/api.json')
const pritnInfo = document.querySelector('.printNews')
const loadMore = document.querySelector('.loadMore')

const news = await getFetch(`${api}/news/getnews`)

let backUps = news

let iterationCount = news.length <= 10 ? news.length : 10

iterationCount >= 10 ? loadMore.innerHTML = '<button class="load">Cargar más noticias</button>' : null

const printNews = (counterIter, array) => {
    let storeNews = ''
    let iteration = counterIter > array.length ? array.length : counterIter
    for (let i = 0; i < iteration; i++) {
        storeNews += `
        <article class="card dflex fjustify-between" style="margin: 20px 0">
            <figure class=" dflex fjustify-center faling-items"><img src="${array[i].imgUrl}" alt="new-img"></figure>
            <div class="infoContent">
                <h3>${array[i].shorTitle}</h3>
                <p class="midWorld">${array[i].shorBody}</p>
                <a href="./singleNew.html#${array[i]._id}">Ver</a>
            </div>
        </article>
        `
    }
    return storeNews
}

const printNews2 = (arrayList) => {
    let storeNews = ''
    arrayList.forEach(array => {
        storeNews += `
        <article class="card dflex fjustify-between" style="margin: 20px 0">
            <figure class=" dflex fjustify-center faling-items"><img src="${array.imgUrl}" alt="new-img"></figure>
            <div class="infoContent">
                <h3>${array.shorTitle}</h3>
                <p class="midWorld">${array.shorBody}</p>
                <a href="./singleNew.html#${array._id}">Ver</a>
            </div>
        </article>
        `
    })
    return storeNews
}

loadMore.addEventListener('click', e => {
    if(e.target.classList.contains('load')) {
        iterationCount += 10
        pritnInfo.innerHTML = printNews(iterationCount, backUps)
    }
})

const buscarDato = (busqueda) => {
    backUps = !busqueda 
    ? news 
    : news.filter(ne => ne.shorTitle.toLowerCase().includes(busqueda.toLowerCase()) || ne.tags.toLowerCase().includes(busqueda.toLowerCase()))
    if(backUps.length == news.length) {
        pritnInfo.innerHTML = printNews(iterationCount, backUps)
    } else {
        pritnInfo.innerHTML = printNews2(backUps)
    }
}

document.querySelector('.search').addEventListener('input', e => {
    buscarDato(e.target.value)
})

pritnInfo.innerHTML = printNews(iterationCount, backUps)