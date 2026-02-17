import React, { useState, useEffect } from 'react'
import './UserPerfil.css'
import BackBotton from '../../components/backBotton/BackBotton'
import {getUserData} from '../../Auth/auth'
import {useNavigate } from "react-router-dom";
import { logout } from "../../Auth/auth";

type Usuario = {
  id: number
  email: string
  username: string
  nombre: string
  familyName: string
  pictureUrl: string
  token: string
}
const UserPerfil: React.FC = () => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [usuario] = useState<Usuario | null>(() => {
    const userData = getUserData();
    
    return userData  ? userData as Usuario : null;
  })


const handleLogout = () => {
  // Limpiar sesión
  localStorage.removeItem("token");
  logout();
  localStorage.clear();

  // Mostrar modal
  setShowLogoutModal(true);

  // Redirigir luego
  setTimeout(() => {
    navigate("/users/login", { replace: true });}, 2000);
};




  const filoAscii = `
 ________      ___          ___               ________     
|\\  _____\\    |\\  \\        |\\  \\             |\\   __  \\    
\\ \\  \\__/     \\ \\  \\       \\ \\  \\            \\ \\  \\|\\  \\   
 \\ \\   __\\     \\ \\  \\       \\ \\  \\            \\ \\  \\\\\\  \\  
  \\ \\  \\_|      \\ \\  \\       \\ \\  \\____        \\ \\  \\\\\\  \\ 
   \\ \\__\\        \\ \\__\\       \\ \\_______\\       \\ \\_______\\
    \\|__|         \\|__|        \\|_______|        \\|_______|
`

  return (
    <div className="user-perfil-container">
      <header className="perfil-header">
        <BackBotton modo="home" />
        <h2>Mi perfil</h2>
      </header>

      <div className="perfil-layout">
        {/* MENU TICKET - Ahora primero */}
        <aside className="ticket">
          <div className="ticket-inner">
            <div className="center">
              <div className="logo">MENU<br />INTEGRATE</div>
            </div>

            

            <hr />
            <div className="info center">
              <p>Nombre: {usuario?.nombre}</p>
              
            </div>
            <hr />

            <div className="grid perfil-opciones">
              <button className="opcion">
                <span>Mis pedidos</span>
              </button>
              <button className="opcion">
                <span>Favoritos</span>
              </button>
              <button className="opcion">
                <span>Tu comercio</span>
              </button>
              <button className="opcion logout" onClick={handleLogout}>
                <span>Cerrar sesión</span>
              </button>
            </div>

            <hr />
            <div className="center">
                <pre className="ascii-logo">
              {filoAscii}
            </pre>
            </div>
          </div>
        </aside>

        {/* CARD USUARIO - Ahora segundo */}
        <section className="perfil-card">
          <img
            className="foto-perfil"
            src={  `https://placehold.co/500/00c853/ffffff?text=${usuario?.nombre.charAt(0).toUpperCase()|| "U"}`}
            alt="Foto de perfil"
          />
          <h3 className="nombre-usuario">{usuario?.nombre} {usuario?.familyName}</h3>
          <p className="correo">{usuario?.email}</p>
        </section>
      </div>
      {/* MODAL LOGOUT */}
        {showLogoutModal && (
          <div className="logout-overlay">
            <div className="logout-box">
              <div className="logout-icon">✓</div>
              <h3>Sesión cerrada</h3>
              <p>Has salido correctamente</p>
              <span>Redirigiendo...</span>
              <button className="logout-btn" onClick={() => navigate("/users/login")}>Ir al login</button>
            </div>
          </div>
        )}
    </div>
  )
}

export default UserPerfil