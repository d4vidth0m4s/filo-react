import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AuthCard.css'
import { UsuariosApi } from '../../api/UsuariosApi'

type AuthCardProps = {
  modo?: 'login' | 'registro'
}

const AuthCard: React.FC<AuthCardProps> = ({ modo = 'login' }) => {

  const bannerURL = '../../public/images/posterUserlanding.png'
  const navigate = useNavigate()

  const [isLogin, setIsLogin] = useState(modo === 'login')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isLogin) {
      setLoading(true)
      try {
        const response = await UsuariosApi.pots({ username, password })
        console.log('Login exitoso:', response)
        localStorage.setItem('userDatos', JSON.stringify(response))
        localStorage.setItem('token', response.token)
        navigate('/')
      } catch (error) {
        console.error('Error al iniciar sesión:', error)
      } finally {
        setLoading(false)
      }
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
            <input
              type="email"
              placeholder="Correo electrónico"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <i className="fa-solid fa-lock"></i>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {!isLogin && (
            <div className="input-group">
              <i className="fa-solid fa-lock"></i>
              <input type="password" placeholder="Confirmar contraseña" required />
            </div>
          )}

          <button type="submit" disabled={loading}>
            {loading ? 'Cargando...' : isLogin ? 'Iniciar sesión' : 'Registrarse'}
          </button>
        </form>

        <p className="or">O</p>

        <div className="Google">
          <button className="google-btn" type="button" onClick={loginGoogle}>
            <img src="../../public/images/SVG/google-icon.svg" alt="Google" />
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
