import React, { useState, useEffect } from 'react'
import './UserPerfil.css'

type Usuario = {
  id: number;
  email: string;
  username: string;

  nombre: string;
  familyName: string;

  pictureUrl: string;
  token: string;
};

const UserPerfil: React.FC = () => {
  const [usuario] = useState<Usuario | null>(() => {
    const userData = localStorage.getItem('userDatos')
    if (userData) {
      try {
        return JSON.parse(userData)
      } catch (error) {
        console.error('Error al parsear userData:', error)
        return null
      }
    }
    return null
  })

  return (
    <div className="user-perfil-container">
    <header className="perfil-header">
  <button data-back type="button" className="back-btn">
  <i className="fa-solid fa-arrow-left"></i>
  </button>
  <h2>Mi perfil</h2>
</header>

<section className="perfil-card">
  <div className="avatar">
    <img
      className="Foto-perfil"
      src={usuario?.pictureUrl || "/imgs/userPhoto.jpg"}
      alt="Foto de perfil"
    />
  </div>
  <h3>{usuario?.nombre} {usuario?.familyName || 'Usuario'}</h3>
  <p className="correo">{usuario?.email || 'usuario@email.com'}</p>
</section>

<section className="perfil-opciones">
  <button className="opcion">
    <i className="fa-solid fa-clipboard-list"></i>
    <span>Mis pedidos</span>
  </button>

  <button className="opcion">
    <i className="fa-solid fa-heart"></i>
    <span>Favoritos</span>
  </button>

  <button className="opcion">
    <i className="fa-solid fa-gear"></i>
    <span>Configuración</span>
  </button>

  <button className="opcion logout" id="logoutBtn">
    <i className="fa-solid fa-right-from-bracket"></i>
    <span>Cerrar sesión</span>
  </button>
</section>
</div>
  )
}

export default UserPerfil