import React from 'react'

import './NavFooter.css'

//import '../scripts/login'


const NavFooter: React.FC = () => {


  return (
    <footer className="navFooter">
      <div className="nav-Footer-content">
        <a href="/Filo-Home">
          <i className="fa-solid fa-house"></i>
          <span>Inicio</span>
        </a>
        <a href="#">
          <i className="fa-solid fa-tags"></i>
          <span>Promos</span>
        </a>
        <a href="#">
          <i className="fa-solid fa-cart-shopping"></i>
          <span>Pedidos</span>
        </a>
        <a href="/users/login" id="userBtn">
          <i className="fa-solid fa-user"></i>
          <span>Perfil</span>
        </a>
      </div>
    </footer>
  )
}

export default NavFooter