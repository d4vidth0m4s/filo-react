import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import type { CredentialResponse } from '@react-oauth/google'
import './AuthCard.css'
import { AuthApi } from '../../api/Auths.Api'
import BackBotton from '../backBotton/BackBotton'
import { UsuarioApi } from '../../api/Usuario.api'

type AuthCardProps = {
  modo?: 'login' | 'registro'
}

const AuthCard: React.FC<AuthCardProps> = ({ modo = 'login' }) => {
  const bannerURL = import.meta.env.VITE_AUTH_BANNER_URL?.trim() ?? ''
  const navigate = useNavigate()

  const [isLogin, setIsLogin] = useState(modo === 'login')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nombre, setNombre] = useState('')
  const [familyName, setFamilyName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState('')

  const clearFeedback = () => {
    setSubmitError('')
    setSubmitSuccess('')
  }

  const getApiMessage = (error: unknown, fallback: string) => {
    if (axios.isAxiosError(error)) {
      const data = error.response?.data as { message?: unknown } | string | undefined

      if (typeof data === 'string' && data.trim()) {
        return data
      }

      if (data && typeof data === 'object' && typeof data.message === 'string' && data.message.trim()) {
        return data.message
      }
    }

    return fallback
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearFeedback()

    if (isLogin) {
      setLoading(true)
      try {
        const response = await AuthApi.pots({ username, password })
        localStorage.setItem('userDatos', JSON.stringify(response))
        localStorage.setItem('token', response.token)
        navigate('/')
      } catch (error) {
        setSubmitError(getApiMessage(error, 'No se pudo iniciar sesion. Verifica tus datos.'))
      } finally {
        setLoading(false)
      }
      return
    }

    if (password !== confirmPassword) {
      setSubmitError('Las contrasenas no coinciden.')
      return
    }

    setLoading(true)
    try {
      await UsuarioApi.create({
        email: email.trim(),
        username: username.trim(),
        password,
        nombre: nombre.trim(),
        familyName: familyName.trim(),
      })

      setSubmitSuccess('Usuario registrado con exito. Ahora inicia sesion.')
      setIsLogin(true)
      setPassword('')
      setConfirmPassword('')
    } catch (error) {
      setSubmitError(getApiMessage(error, 'No se pudo registrar el usuario.'))
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleCredentialResponse = async (response: CredentialResponse) => {
    clearFeedback()

    if (!response.credential) {
      setSubmitError('Google no devolvio credencial.')
      return
    }

    setGoogleLoading(true)
    try {
      const apiResponse = await AuthApi.google({ token: response.credential })
      localStorage.setItem('userDatos', JSON.stringify(apiResponse))
      localStorage.setItem('token', apiResponse.token)
      navigate('/')
    } catch (error) {
      setSubmitError(getApiMessage(error, 'Error al iniciar sesion con Google.'))
    } finally {
      setGoogleLoading(false)
    }
  }

  const handleGoogleError = () => {
    setSubmitError('Google login fallo o fue cancelado.')
  }

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
                type={isLogin ? 'text' : 'email'}
                placeholder={isLogin ? 'Usuario o correo' : 'Correo electronico'}
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
                type={showPassword ? 'text' : 'password'}
                placeholder="Contrasena"
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

          {submitError && <p style={{ color: '#d32f2f', marginTop: '10px' }}>{submitError}</p>}
          {submitSuccess && <p style={{ color: '#2e7d32', marginTop: '10px' }}>{submitSuccess}</p>}

          <p className="or">O</p>

          <div className="Google">
            <GoogleLogin
              useOneTap
              onSuccess={handleGoogleCredentialResponse}
              onError={handleGoogleError}
              theme="outline"
              size="large"
              text="signin_with"
              type='icon'
              shape='circle'
            />
            {googleLoading && <p>Procesando login con Google...</p>}
          </div>

          <p className="toggle-mode">
            {isLogin ? (
              <>
                No tienes cuenta?{' '}
                <button
                  type="button"
                  className="link-btn"
                  onClick={() => {
                    setIsLogin(false)
                    clearFeedback()
                  }}
                >
                  Registrate
                </button>
              </>
            ) : (
              <>
                Ya tienes cuenta?{' '}
                <button
                  type="button"
                  className="link-btn"
                  onClick={() => {
                    setIsLogin(true)
                    clearFeedback()
                  }}
                >
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
