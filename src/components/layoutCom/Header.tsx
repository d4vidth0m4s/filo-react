import React from 'react'
import { useNavigate } from 'react-router-dom'
import './header.css'
import { useState } from 'react';
import CartDrawer from "../cartBuy/carrito-compra";
import { FaUser, FaShoppingCart } from "react-icons/fa";


const Header: React.FC = () => {
  const navigate = useNavigate()
  const [abierto, setAbierto] = useState(false);
  const handleUserClick = () => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/users/1') // Ruta al perfil del usuario
    } else {
      navigate('/users/login')
    }
  }

  return (
    <header className="header">
      {/* MOBILE HEADER */}
      <div className="header-mobile">
        <div className="mobile-top">
          <button className="menu-btn">
            <i className="fa-solid fa-bars"><FaShoppingCart /></i>
          </button>
          <h1 className="logo">Filo</h1>
          <button className="icon-btn" onClick={handleUserClick}>
            <i className="fa-solid fa-user"> <FaUser /></i>

          </button>
        </div>
        <div className="search-container">
          <span className="search-icon">
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
          <input type="text" placeholder="¿Qué se te antoja hoy?" />
        </div>
      </div>

      {/* DESKTOP HEADER */}
      <div className="header-desktop">
        <h1 className="logo">Filo</h1>
        <div className="ubicacion">
          <i className="fa-solid fa-location-dot"></i>
          <span>Ciénaga Magdalena</span>
        </div>
        <div className="search-container">
          <span className="search-icon">
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
          <input type="text" placeholder="¿Qué se te antoja hoy?" />
        </div>
        <div className="nav-links">

          <div className="cart-wrapper">
            <button
              className="icon-btn"
              onClick={() => setAbierto(!abierto)}
            >
              <i className="fa-solid fa-cart-shopping"><FaShoppingCart /></i>
            </button>

            <CartDrawer abierto={abierto} setAbierto={setAbierto} />
          </div>
          <button className="icon-btn" onClick={handleUserClick}>
            <i className="fa-solid fa-user"><FaUser /> </i>
          </button>
        </div>
      </div>

    </header>
  )
}

export default Header