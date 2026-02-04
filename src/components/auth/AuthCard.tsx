import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AuthCard.css'

type AuthCardProps = {
  modo?: 'login' | 'registro'
}

const AuthCard: React.FC<AuthCardProps> = ({ modo = 'login' }) => {

  const bannerURL = 'https://lzcqnygnduehntdbijzw.supabase.co/storage/v1/object/public/filo/filobaner.webp'
  const navigate = useNavigate()

  const [isLogin, setIsLogin] = useState(modo === 'login')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (isLogin) {
      console.log('Iniciando sesión')
    } else {
      console.log('Registrando usuario')
    }
  }

  const loginGoogle = () => {
    console.log('Login con Google')
  }

  return (
    <div className="auth-wrapper">
      <aside className="auth-banner">
        <div className="banner-content">
          <img src={bannerURL} alt="Banner" />
        </div>
      </aside>

      <section className="login-container">
        <button id="back" className="back-btn" onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left"></i> Volver
        </button>

        <h1>Filo</h1>
        <p>{isLogin ? 'Inicia sesión para continuar' : 'Regístrate para continuar'}</p>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="input-group">
              <i className="fa-solid fa-user"></i>
              <input type="text" placeholder="Nombre de usuario" required />
            </div>
          )}

          <div className="input-group">
            <i className="fa-solid fa-envelope"></i>
            <input type="email" placeholder="Correo electrónico" required />
          </div>

          <div className="input-group">
            <i className="fa-solid fa-lock"></i>
            <input type="password" placeholder="Contraseña" required />
          </div>

          {!isLogin && (
            <div className="input-group">
              <i className="fa-solid fa-lock"></i>
              <input type="password" placeholder="Confirmar contraseña" required />
            </div>
          )}

          <button type="submit">
            {isLogin ? 'Iniciar sesión' : 'Registrarse'}
          </button>
        </form>

        <p className="or">O</p>

        <div className="Google">
          <button className="google-btn" type="button" onClick={loginGoogle}>
            <img src="/imgs/SVG/google.SVG" alt="Google" />
          </button>
        </div>

        <p className="toggle-mode">
          {isLogin ? (
            <>
              ¿No tienes cuenta?{' '}
              <button type="button" className="link-btn" onClick={() => setIsLogin(false)}>
                Regístrate
              </button>
            </>
          ) : (
            <>
              ¿Ya tienes cuenta?{' '}
              <button type="button" className="link-btn" onClick={() => setIsLogin(true)}>
                Inicia sesión
              </button>
            </>
          )}
        </p>
      </section>
    </div>
  )
}

export default AuthCard
