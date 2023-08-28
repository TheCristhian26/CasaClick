import {getFetch} from '../../helpers/fetch.js';
const {api} = await getFetch('../../helpers/api.json');
const id = location.hash.split('#')[1]
const returnValidator = location.hash.split('#')[2]

let reBtn
returnValidator == 'home' ? reBtn = '../../../index.html#news' : reBtn = './noticias.html'
document.querySelector('.btnReturn').href = reBtn

// traer datos
const res = await getFetch(`${api}/news/getnew/${id}`)
const allNews = await getFetch(`${api}/news/getnews`)
const printNew = document.querySelector('.printNews')
const printRandomNews = document.querySelector('.anotherNews')
if(res) {
    document.querySelector('.loader').classList.toggle('loaderStop') 
}
document.title = 'Casa Click | ' + res.titulo

// creacion de la informacion
const {
    imgUrl: label, titulo: title, tags, body, links
} = res;

// querySelector
document.querySelector('.titleSingle').innerHTML = title;
document.querySelector('.categorySingle').innerHTML = tags;
document.querySelector('.singleDescription').innerHTML = body;
document.querySelector('.imgSingle').src = label

let link = '<h2>Leer más información</h2>'
if(links) {
    const allLinks = links.split(',')
    allLinks.forEach(element => {
        link += `<a href="${element}" target="_blank" class="link">${element}</a>`
    });
}

printNew.innerHTML = link

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}
let iteracion = 0
let storeNew = ''
let list = []
allNews.length == 1 ? iteracion = 1 : null
allNews.length == 2 ? iteracion = 2 : null
allNews.length >= 3 ? iteracion = 3 : null
let counter = 0
allNews.forEach( () => {
    list.push(counter)
    counter++
})

list = list.sort(function() {return Math.random() - 0.5});
if(allNews.length > 0) {
    for (let i = 0; i <= iteracion; i++) {
        if(allNews[list[i]].titulo != title) {
            storeNew += `
                <div class="cardNew">
                    <a class="changeHash" data-id="${allNews[list[i]]._id}">
                        <div class="contentTitle changeHash" data-id="${allNews[list[i]]._id}">
                            <h2 class="changeHash" data-id="${allNews[list[i]]._id}">${allNews[list[i]].shorTitle}</h2>
                        </div>
                        <img src="${allNews[list[i]].imgUrl}" alt="img-${allNews[list[i]].shorTitle}" class="changeHash" data-id="${allNews[list[i]]._id}">
                    </a>
                </div>
            `
        }
    }
}
if(storeNew == '') {
    storeNew = '<p>No tenemos noticias para ti</p>'
}
printRandomNews.innerHTML = storeNew


printRandomNews.addEventListener('click', e => {
    e.preventDefault()
    if(e.target.classList.contains('changeHash')) {
        const url = e.target.getAttribute('data-id')
        location.href = './singleNew.html#'+url
        location.reload()
    }
})
