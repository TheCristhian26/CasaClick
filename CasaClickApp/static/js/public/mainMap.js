import { session } from "../../helpers/session.js";

const menu = document.querySelector('.menu-toggle')
const menuBorder = document.querySelector('.mainNav')
const navAcces = document.querySelector('.linkAccess')

menu.addEventListener('click', () => menuBorder.classList.toggle('hidden'))

if(!session) {
    navAcces.innerHTML = `
      <a href="../../pages/public/login.html" class="login dflex faling-items fjustify-center">
          <i class='bx bxs-user-circle'></i>
          <p>Acceder</p>
      </a>
      <a href="../../pages/public/register.html" class="register dflex faling-items fjustify-center">
          <i class='bx bxs-user-plus'></i>
          <p>Registrarte</p>
      </a>
    `
} else {
  navAcces.innerHTML = `
    <a href="../../pages/private/home.html" class="dashboard dflex faling-items fjustify-center">
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

