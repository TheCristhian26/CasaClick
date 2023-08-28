import { getFetch, postFetch } from "../../helpers/fetch.js";
const { api } = await getFetch('../../helpers/api.json')
import { session } from "../../helpers/session.js";
if(session) {
    location.href = '../private/home.html'
}

// selectores
const username = document.querySelector('.username')
const password = document.querySelector('.password')
const resFront = document.querySelector('.resServer')


document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault()
    const res = await postFetch(`${api}/user/login`, {
        username: username.value,
        password: password.value
    })
    const { response } = res
    if(!response) {
        resFront.classList.toggle('resActive')
        setTimeout(() => resFront.classList.toggle('resActive'), 3000)
    } else {
        localStorage.setItem('user', JSON.stringify(res))
        localStorage.setItem('sessionid', true)
        location.href = '../private/home.html'
    }
})
