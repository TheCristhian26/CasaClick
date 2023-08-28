//importacion de modulos
import { getFetch, postFetchFormAuth, postFetchAuth } from "../../helpers/fetch.js"
import {token} from '../../helpers/userData.js'
const { api } = await getFetch('../../helpers/api.json')

const input = document.querySelector('.image')
const printImg = document.querySelector('.imagePrint')
const cate = document.querySelector('#category')

input.addEventListener('change', () => {
    const file = input.files
    if(!file){
        printImg.innerHTML = ''
        return
    }
    const archivo = file[0]
    const imgUri = URL.createObjectURL(archivo)
    printImg.innerHTML = `
        <h2>Previsualización del archivo</h2>
        ${
            archivo.size / 1000000 > 6 
            ?
            `<p style="margin-bottom: 20px">Peso del archivo <strong style="color: red">${(archivo.size / 1000000).toFixed(2)} MB</strong></p>`
            :
            `<p style="margin-bottom: 20px">Peso del archivo <strong style="color: green">${(archivo.size / 1000000).toFixed(2)} MB</strong></p>`
        }
        <img src="${imgUri}"/>
        <p>${archivo.name}</p>
    `
})

document.querySelector('.btnInput').addEventListener('click', () => {
    input.click()
})

document.querySelector('.siteCreate').addEventListener('submit', async (e) => {
    e.preventDefault()
    const img = document.querySelector('.image').files[0]
    if(!img){
        alert('ingrese una fotografía')
        return
    }
    if (cate.value == 'none') {
        alert('seleccione una categoría')
        return
    }
    if(img.size / 1000000 > 6 ) {
        alert('La imagen no debe superar los 5mb de peso')
        return
    }
    const datos = new FormData(document.querySelector('.siteCreate'))
    const {status} = await postFetchFormAuth(`${api}/site/register`, datos, token)
    status == 'successful' ? location.reload() : ''
})

