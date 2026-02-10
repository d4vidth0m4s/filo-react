import React from 'react'
import { Link } from 'react-router-dom'
//import { useNavigate } from 'react-router-dom'
//import '../scripts/back'

const UserCall: React.FC = () => {
  //const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Formulario de login enviado')
  }

  const loginGoogle = () => {
    console.log('Login con Google')
  }

  return (
    <div className="login-container">
      <button id="back" className="back-btn">
        <i className="fa-solid fa-arrow-left"></i> Volver
      </button>
      <Link to="/Filo-Home" className="logo-link">
        <h1>Filo</h1>
      </Link>
      <p>Inicia sesión para continuar</p>
      <form id="loginForm" onSubmit={handleSubmit}>
        <div className="input-group">
          <i className="fa-solid fa-envelope"></i>
          <input type="email" placeholder="Correo electrónico" required />
        </div>
        <div className="input-group">
          <i className="fa-solid fa-lock"></i>
          <input type="password" placeholder="Contraseña" required />
        </div>
        <button type="submit">Entrar</button>
      </form>
      <p>O</p>
      <div className="Google">
        <button className="google-btn" type="button" onClick={loginGoogle}>
          <img src="/imgs/SVG/google.SVG" alt="Google" />
        </button>
      </div>
      <p className="register">
        ¿No tienes cuenta? <a href="/users/register">Regístrate</a>
      </p>
    </div>
  )
}

export default UserCall