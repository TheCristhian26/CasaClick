import { getFetch } from "../../helpers/fetch.js"

const {api} = await getFetch('../../helpers/api.json')
const id  = location.hash.split('#')[1]
const imgs = await getFetch(`${api}/galery/allpost/${id}`)
const pritnImg = document.querySelector('.printInfo')
const previewImg = document.querySelector('.previewImg')
const loadImg = document.querySelector('.printInfo')


let imgStore = ''

if(imgs.length == 0) {
    imgStore = '<h4>No hay imagenes en la galeria</h4>'
} else {
    imgs.forEach(({url}) => {
        imgStore += `
            <div class="imgCard">
                <div class="contentImgCard">
                    <button class="openImg">
                        <img src="${url}" data-url="${url}" class="openImg"/>
                    </button>
                </div>
            </div>
        `
    })
}

pritnImg.innerHTML = imgStore

loadImg.addEventListener('click', e => {
    if(e.target.classList.contains('openImg')) {
        const url = e.target.getAttribute('data-url')
        document.querySelector('.imgView img').src = url
        previewImg.classList.toggle('active')

    }
})

document.querySelector('.closeBtnPre').addEventListener('click', () => previewImg.classList.toggle('active'))
