import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Message } from 'primereact/message'
import { Button } from 'primereact/button'
import './Login1.css'

export default function Login1() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const validateForm = () => {
    let valid = true
    let nextEmailError = ''
    let nextPasswordError = ''

    if (!email) {
      nextEmailError = 'El correo es requerido'
      valid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextEmailError = 'Correo inválido'
      valid = false
    }

    if (!password) {
      nextPasswordError = 'La contraseña es requerida'
      valid = false
    } else if (password.length < 6) {
      nextPasswordError = 'Mínimo 6 caracteres'
      valid = false
    }

    setEmailError(nextEmailError)
    setPasswordError(nextPasswordError)
    setErrorMessage('')
    return valid
  }

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    setErrorMessage('')

    try {
      // TODO: implementar lógica de autenticación
      await new Promise((resolve) => setTimeout(resolve, 1000))
      navigate('/')
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      {/* Fondo animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-700">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-blob animation-delay-4000" />

        {/* Iconos flotantes decorativos */}
        <span className="icon-[ic--twotone-lock] absolute top-20 left-10 w-12 h-12 text-white/20 animate-float" />
        <span className="icon-[ic--twotone-person] absolute top-40 right-20 w-10 h-10 text-white/20 animate-float animation-delay-1000" />
        <span className="icon-[ic--twotone-shield] absolute bottom-32 left-1/4 w-8 h-8 text-white/20 animate-float animation-delay-2000" />
        <span className="icon-[ic--twotone-verified-user] absolute bottom-20 right-1/3 w-10 h-10 text-white/20 animate-float animation-delay-3000" />
        <span className="icon-[ic--twotone-key] absolute top-1/4 left-1/3 w-9 h-9 text-white/15 animate-float animation-delay-1500" />
        <span className="icon-[ic--twotone-fingerprint] absolute top-1/3 right-1/4 w-11 h-11 text-white/20 animate-float animation-delay-2500" />
        <span className="icon-[ic--twotone-security] absolute bottom-40 left-16 w-10 h-10 text-white/15 animate-float animation-delay-3500" />
        <span className="icon-[ic--twotone-admin-panel-settings] absolute top-60 right-12 w-8 h-8 text-white/15 animate-float animation-delay-500" />
      </div>

      {/* Card de login */}
      <Card
        className="w-full max-w-md shadow-2xl relative z-10 backdrop-blur-sm bg-white/95"
        header={
          <div className="text-center py-6 px-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg">
                <span className="icon-[ic--twotone-rocket-launch] w-9 h-9 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              MVP Base
            </h1>
            <p className="text-gray-500 text-sm">Inicia sesión para continuar</p>
          </div>
        }
        footer={
          <div className="text-center text-sm text-gray-500 pb-4">
            <p className="mb-1">MVP Base © {new Date().getFullYear()}</p>
            <p className="text-xs text-gray-400">Tu punto de partida para grandes proyectos</p>
          </div>
        }
      >
        <form className="space-y-5" onSubmit={handleLogin}>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Correo electrónico
            </label>
            <InputText
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="tu@email.com"
              className="w-full"
              invalid={!!emailError}
              disabled={loading}
            />
            {emailError && <small className="text-red-500 text-xs mt-1 block">{emailError}</small>}
          </div>

          {/* Contraseña */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <Password
              inputId="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full"
              inputClassName="w-full"
              invalid={!!passwordError}
              feedback={false}
              toggleMask
              disabled={loading}
            />
            {passwordError && <small className="text-red-500 text-xs mt-1 block">{passwordError}</small>}
          </div>

          {/* Olvidé mi contraseña */}
          <div className="flex justify-end">
            <button type="button" className="text-xs text-violet-600 hover:text-indigo-700 font-medium transition-colors">
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          {/* Error general */}
          {errorMessage && <Message severity="error" text={errorMessage} className="w-full" />}

          {/* Botón enviar */}
          <Button type="submit" label="Iniciar sesión" icon="pi pi-sign-in" className="w-full" loading={loading} disabled={loading} />
        </form>
      </Card>
    </div>
  )
}
