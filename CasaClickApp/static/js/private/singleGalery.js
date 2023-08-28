import { postFetchFormAuth, getFetch, getFetchAuth, deleteFetchAuth} from '../../helpers/fetch.js'
import { token } from '../../helpers/userData.js'
const {api} = await getFetch('../../helpers/api.json')
const id = location.hash.split('#')[1]
const galeria = await getFetchAuth(`${api}/galery/allgalery/${id}`, token)


// region Variable
const input = document.querySelector('.sendImg')
const printImg = document.querySelector('.printImg')
const btnChange = document.querySelector('.btnSendImage')
const contentImg = document.querySelector('.createImg')
const loadImg = document.querySelector('.loadImg')
const previewImg = document.querySelector('.previewImg')

// endregion

// region InsertImg
let imgStore = ''
if(galeria.length == 0) {
    imgStore = '<h4>No hay imagenes en la galeria</h4>'
} else {
    galeria.forEach(({_id, url}) => {
        imgStore += `
            <div class="imgCard">
                <div class="contentImgCard">
                    <img src="${url}" data-url="${url}"/>
                </div>
                <div class="actionImg">
                    <i class='bx bx-image viewImg' data-url="${url}"></i>
                    <i class='bx bx-trash deleteImg' data-id="${_id}"></i>
                </div>
            </div>
        `
    });
}

loadImg.innerHTML = imgStore

// endregion

// region trigger toast

const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

// endregion



// region Eventos

document.querySelector('#check').addEventListener('click', () => {
    const contentSites = document.querySelector('.createImg')
    if(document.querySelector('#check').checked) {
        contentSites.classList.add('active')
    } else {
        contentSites.classList.remove('active')
    }
})

document.querySelector('.btnSend').addEventListener('click', () => input.click())

input.addEventListener('change', () => {
    const file = input.files
    if(file.length  == 0){
        printImg.innerHTML = '<h3>Selecciona una imagen</h3>'
        btnChange.innerHTML = ''
        return
    }
    const archivo = file[0]
    const imgUri = URL.createObjectURL(archivo)
    printImg.innerHTML = `
        <div class="imgContent">
            <img src="${imgUri}" alt="">
        </div>
        <div class="infoContent">
            <h4>${archivo.name}</h4>
            ${
                archivo.size / 1000000 > 6 
                ?
                `<p style="margin-bottom: 20px">Peso del archivo <strong style="color: red">${(archivo.size / 1000000).toFixed(2)} MB</strong></p>`
                :
                `<p style="margin-bottom: 20px">Peso del archivo <strong style="color: green">${(archivo.size / 1000000).toFixed(2)} MB</strong></p>`
            }
        </div>
    `
    btnChange.innerHTML = `
        <button class="sendImage">
            <i class='bx bx-send sendImage' ></i>
            <p class="sendImage">Subir imagen</p>
        </button>
    `
})

document.querySelector('.createImg').addEventListener('click', async e => {
    if(e.target.classList.contains('sendImage')) {
        const form = new FormData(document.querySelector('.formImg'))
        const file = input.files[0].size / 1000000
        if(file > 6) {
            alert('El archivo supera los 5Mb de peso')
            return
        }
        contentImg.innerHTML = '<div class="loader"></div>'
        const resp = await postFetchFormAuth(`${api}/galery/register/${id}`, form,token)
        if(resp.status = 'successful') {
            Toast.fire({
                icon: 'success',
                title: 'Fotografía registrada'
            })
            setTimeout(() => location.reload(), 2000)
        } else {
            Toast.fire({
                icon: 'error',
                title: 'Server internal error 500'
            })
            setTimeout(() => location.reload(), 2000)
        }
    }
})

loadImg.addEventListener('click', e => {
    if(e.target.classList.contains('viewImg')) {
        const url = e.target.getAttribute('data-url')
        document.querySelector('.imgView img').src = url
        previewImg.classList.toggle('active')

    }
})

document.querySelector('.closeBtnPre').addEventListener('click', () => previewImg.classList.toggle('active'))

loadImg.addEventListener('click', async e => {
    if(e.target.classList.contains('deleteImg')) {
        const id = e.target.getAttribute('data-id')
        const acept = confirm('Estás seguro de borrar el elemento?')
        if(acept) {
            const resp = await deleteFetchAuth(`${api}/galery/deleteone/${id}`, token)
            resp.status == 200 ? location.reload() : alert('internal server error 500')
        } else {
            alert('Registro conservado')
        }

    }
})



// endregion