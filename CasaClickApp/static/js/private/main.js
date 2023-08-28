import { session } from "../../helpers/session.js";
if(!session) {
    location.href = '../../../index.html'
}

document.querySelector('.logout').addEventListener('click', () => {
    localStorage.clear()
    location.href = '../../../index.html'
})