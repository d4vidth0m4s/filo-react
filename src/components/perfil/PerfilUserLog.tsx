import React from 'react';
//import { useNavigate } from 'react-router-dom'
//import Swal from 'sweetalert2'
//import withReactContent from 'sweetalert2-react-content'
//import '../scripts/userPerfil'
//import '../scripts/back'

//const MySwal = withReactContent(Swal)

const PerfilUserLog: React.FC = () => {
  //const navigate = useNavigate()
  const handleLogout = () => {
    /*
    MySwal.fire({
      title: 'Sesión cerrada',
      text: '¡Vuelve pronto!',
      icon: 'success',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#00c853',
      background: '#ffffff',
      color: '#333'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/users/userLog')
      }
    })
    */
  };
  return (
    <>
      <header className="perfil-header">
        <button id="back" type="button" className="back-btn">
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <h2>Mi perfil</h2>
      </header>
      <section className="perfil-card">
        <div className="avatar">
          <img
            className="Foto-perfil"
            src="/imgs/userPhoto.jpg"
            alt="Foto de perfil"
          />
        </div>
        <h3>Usuario</h3>
        <p className="correo">usuario@email.com</p>
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
        <button className="opcion logout" onClick={handleLogout}>
          <i className="fa-solid fa-right-from-bracket"></i>
          <span>Cerrar sesión</span>
        </button>
      </section>
    </>
  );
};

export default PerfilUserLog;
