import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './AuthCard.css'
import { AuthApi } from '../../api/Auths.Api'

import BackBotton from '../backBotton/BackBotton'
import { UsuarioApi } from '../../api/Usuario.api'

type AuthCardProps = {
  modo?: 'login' | 'registro'
}

const AuthCard: React.FC<AuthCardProps> = ({ modo = 'login' }) => {
  const bannerURL =
    'https://lzcqnygnduehntdbijzw.supabase.co/storage/v1/object/public/filo/BannerFilo.webp'
  const navigate = useNavigate()

  const [isLogin, setIsLogin] = useState(modo === 'login')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nombre, setNombre] = useState('')
  const [familyName, setFamilyName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isLogin) {
      setLoading(true)
      try {
        const response = await AuthApi.pots({ username, password })
        console.log('Login exitoso:', response)
        localStorage.setItem('userDatos', JSON.stringify(response))
        localStorage.setItem('token', response.token)
        navigate('/')
      } catch (error) {
        console.error('Error al iniciar sesion:', error)
      } finally {
        setLoading(false)
      }
      return
    }

    if (password !== confirmPassword) {
      console.error('Las contraseñas no coinciden')
      return
    }

    setLoading(true)
    try {
      console.log('Registrando usuario')
      const response = await UsuarioApi.create({
        username,
        email,
        password,
        nombre,
        familyName
      })
      console.log('Usuario registrado:', response)
      setIsLogin(true)
    } catch (error) {
      console.error('Error al registrar usuario:', error)
    } finally {
      setLoading(false)
    }
  }

  const loginGoogle = () => {
    console.log('Login con Google')
  }
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="auth-layout-container">
    <div className="auth-wrapper">
      <aside className="auth-banner">
        <div className="banner-content">
          <img src={bannerURL} alt="Banner" />
        </div>
      </aside>

      <section className="login-container">
        <BackBotton modo="home" />

        <Link to="/Filo-Home" className="logo-link">
          <h1>Filo</h1>
        </Link>
        <p>{isLogin ? 'Inicia sesion para continuar' : 'Registrate para continuar'}</p>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="input-group">
              <i className="fa-solid fa-id-badge"></i>
              <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
          )}

          {!isLogin && (
            <div className="input-group">
              <i className="fa-solid fa-id-card"></i>
              <input
                type="text"
                placeholder="Apellido"
                value={familyName}
                onChange={(e) => setFamilyName(e.target.value)}
                required
              />
            </div>
          )}

          {!isLogin && (
            <div className="input-group">
              <i className="fa-solid fa-user"></i>
              <input
                type="text"
                placeholder="Nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          )}

          <div className="input-group">
            <i className="fa-solid fa-envelope"></i>
            <input
              type="email"
              placeholder="Correo electronico"
              value={isLogin ? username : email}
              onChange={(e) => {
                if (isLogin) {
                  setUsername(e.target.value)
                } else {
                  setEmail(e.target.value)
                }
              }}
              required
            />
          </div>

          <div className="input-group password-group">
            <i className="fa-solid fa-lock"></i>
            <input

              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"

              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="button" className="toggle-password-btn" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
            </button>
          </div>

          {!isLogin && (
            <div className="input-group">
              <i className="fa-solid fa-lock"></i>
              <input
                type="password"
                placeholder="Confirmar contrasena"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}

          <button type="submit" disabled={loading}>
            {loading ? 'Cargando...' : isLogin ? 'Iniciar sesion' : 'Registrarse'}
          </button>
        </form>

        <p className="or">O</p>

        <div className="Google">
          <button className="google-btn" type="button" onClick={loginGoogle}>
            <img src="/src/images/SVG/google-icon.svg" alt="Google" />
          </button>
        </div>

        <p className="toggle-mode">
          {isLogin ? (
            <>
              No tienes cuenta?{' '}
              <button type="button" className="link-btn" onClick={() => setIsLogin(false)}>
                Registrate
              </button>
            </>
          ) : (
            <>
              Ya tienes cuenta?{' '}
              <button type="button" className="link-btn" onClick={() => setIsLogin(true)}>
                Inicia sesion
              </button>
            </>
          )}
        </p>
      </section>
    </div>
    </div>
  )
}

export default AuthCard
