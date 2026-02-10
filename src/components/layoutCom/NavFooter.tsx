import React from 'react'

import './NavFooter.css'
import { FaHome,FaTags, FaUser, FaShoppingCart } from "react-icons/fa";
//import '../scripts/login'


const NavFooter: React.FC = () => {
  

  return (
    <footer className="navFooter">
      <div className="nav-Footer-content">
        <a href="/Filo-Home">
          <i className="fa-solid fa-house"><FaHome/></i>
          <span>Inicio</span>
        </a>
        <a href="#">
          <i className="fa-solid fa-tags"><FaTags/></i>
          <span>Promos</span>
        </a>
        <a href="#">
          <i className="fa-solid fa-cart-shopping"><FaShoppingCart/></i>
          <span>Pedidos</span>
        </a>
        <a href="/users/login" id="userBtn">
          <i className="fa-solid fa-user"><FaUser/></i>
          <span>Perfil</span>
        </a>
      </div>
    </footer>
  )
}

export default NavFooter