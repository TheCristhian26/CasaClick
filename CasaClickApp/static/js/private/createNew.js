//importaciones
import { postFetchFormAuth, getFetch } from "../../helpers/fetch.js"
const {api} = await getFetch('../../helpers/api.json')
import { token } from "../../helpers/userData.js"


// funciones
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})


//selectores
const input = document.querySelector('.image')
const printImg = document.querySelector('.imagePrint')
const formDatos = document.querySelector('.siteCreate')
const contenerdor = document.querySelector('.createSite')

//eventos
document.querySelector('.btnInput').addEventListener('click', () => input.click())

input.addEventListener('change', () => {
    const file = input.files
    if(file.length == 0){
        printImg.innerHTML = `
            <h2>Previsualización de la imagen</h2>
            <p>Cuando selecciones la imagen a subir, se reflejará en este espacio</p>
        `
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

formDatos.addEventListener('submit', async e => {
    e.preventDefault()
    if(input.files.length == 0) {
        Toast.fire({
            icon: 'error',
            title: 'Ingrese una imagen!'
        })
        return
    }
    if(input.files[0].size / 1000000 > 6 ) {
        Toast.fire({
            icon: 'error',
            title: 'La fotografía supera los 5Mb'
        })
        return
    }
    const datosFormulario = new FormData(document.querySelector('.siteCreate'))
    contenerdor.innerHTML = `
        <div class="loader dflex faling-items fjustify-center fdirection-column">
            <div class="lds-dual-ring"></div>
            <p>Cargardo</p>
        </div>
    `
    const resp = await postFetchFormAuth(`${api}/news/createnew`, datosFormulario, token)
    if(resp.status == 'successful') {
        Toast.fire({
            icon: 'success',
            title: 'Noticia registrada :D'
        })
        setTimeout(() => {
            location.reload()
        }, 1500)
    } else {
        Toast.fire({
            icon: 'error',
            title: 'Internal server error 500'
        })
        setTimeout(() => {
            location.reload()
        }, 1500)
    }
}) 