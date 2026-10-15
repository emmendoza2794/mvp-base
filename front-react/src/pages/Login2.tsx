import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { useToast } from '../hooks/useToast'
import './Login2.css'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const EMPTY_LOGIN_ERRORS = { email: '', password: '' }
const EMPTY_REG_ERRORS = { name: '', email: '', password: '', confirm: '' }

const inputClass = (invalid: boolean, extra = '') =>
  `w-full !pl-10 ${extra} !bg-gray-50 !border-gray-200 !rounded-lg ${invalid ? 'p-invalid !border-red-400 !bg-red-50/50' : ''}`

const slides = [
  {
    title: ['Tu proyecto', 'listo para escalar'],
    text: 'Una base sólida con autenticación, base de datos y API REST lista para usar desde el primer día.',
  },
  {
    title: ['Stack moderno', 'y productivo'],
    text: 'FastAPI + React + PostgreSQL + PrimeReact. Todo configurado y listo para que te enfoques en tu producto.',
  },
  {
    title: ['Despliega', 'con confianza'],
    text: 'Arquitectura probada con buenas prácticas de seguridad, JWT y manejo de roles incluidos.',
  },
]

export default function Login2() {
  const navigate = useNavigate()
  const toast = useToast()

  const [isRegister, setIsRegister] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [registrationSuccess, setRegistrationSuccess] = useState(false)

  // Login
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loginAttempted, setLoginAttempted] = useState(false)
  const [loginErrors, setLoginErrors] = useState(EMPTY_LOGIN_ERRORS)

  // Registro
  const [regName, setRegName] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [regConfirm, setRegConfirm] = useState('')
  const [showRegConfirm, setShowRegConfirm] = useState(false)
  const [regAttempted, setRegAttempted] = useState(false)
  const [regErrors, setRegErrors] = useState(EMPTY_REG_ERRORS)

  // Carousel: `prev` sale hacia la izquierda, el resto espera a la derecha
  const [slide, setSlide] = useState({ current: 0, prev: -1 })
  const [carouselKey, setCarouselKey] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide((s) => ({ current: (s.current + 1) % slides.length, prev: s.current }))
    }, 4000)
    return () => clearInterval(interval)
  }, [carouselKey])

  const goToSlide = (index: number) => {
    setSlide((s) => ({ current: index, prev: s.current }))
    setCarouselKey((k) => k + 1)
  }

  const switchMode = (register: boolean) => {
    setIsRegister(register)
    setLoginAttempted(false)
    setRegAttempted(false)
    setLoginErrors(EMPTY_LOGIN_ERRORS)
    setRegErrors(EMPTY_REG_ERRORS)
  }

  const validateLogin = () => {
    const errors = { ...EMPTY_LOGIN_ERRORS }
    if (!loginEmail) errors.email = 'El correo es requerido'
    else if (!EMAIL_REGEX.test(loginEmail)) errors.email = 'Correo inválido'
    if (!loginPassword) errors.password = 'La contraseña es requerida'
    setLoginErrors(errors)
    return !errors.email && !errors.password
  }

  const validateRegister = () => {
    const errors = { ...EMPTY_REG_ERRORS }
    if (!regName || regName.trim().length < 2) errors.name = 'El nombre debe tener al menos 2 caracteres'
    if (!regEmail) errors.email = 'El correo es requerido'
    else if (!EMAIL_REGEX.test(regEmail)) errors.email = 'Correo inválido'
    if (!regPassword || regPassword.length < 6) errors.password = 'Mínimo 6 caracteres'
    if (!regConfirm) errors.confirm = 'Debes confirmar tu contraseña'
    else if (regPassword !== regConfirm) errors.confirm = 'Las contraseñas no coinciden'
    setRegErrors(errors)
    return Object.values(errors).every((error) => !error)
  }

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault()
    setLoginAttempted(true)
    if (!validateLogin()) {
      toast({ severity: 'warn', summary: 'Campos requeridos', detail: 'Corrige los errores en el formulario', life: 3000 })
      return
    }
    setIsLoading(true)
    try {
      // TODO: implementar lógica de autenticación
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({ severity: 'success', summary: 'Inicio de sesión exitoso', detail: 'Bienvenido a MVP Base', life: 2000 })
      navigate('/')
    } catch (error) {
      toast({
        severity: 'error',
        summary: 'Error al iniciar sesión',
        detail: error instanceof Error ? error.message : 'Credenciales incorrectas',
        life: 4000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (event: FormEvent) => {
    event.preventDefault()
    setRegAttempted(true)
    if (!validateRegister()) {
      toast({ severity: 'warn', summary: 'Campos requeridos', detail: 'Corrige los errores en el formulario', life: 3000 })
      return
    }
    setIsLoading(true)
    try {
      // TODO: implementar lógica de registro
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setRegistrationSuccess(true)
    } catch (error) {
      toast({
        severity: 'error',
        summary: 'Error al registrarse',
        detail: error instanceof Error ? error.message : 'No se pudo crear la cuenta',
        life: 4000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const toggleClass = (active: boolean) =>
    `flex-1 text-sm font-semibold py-2.5 rounded-lg transition-all duration-200 ${
      active ? 'bg-white text-indigo-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
    }`

  const submitButtonClass =
    'w-full py-3 rounded-lg text-white text-sm font-semibold transition-opacity duration-150 hover:opacity-90 active:opacity-80 mt-2 disabled:opacity-50 disabled:cursor-not-allowed'

  return (
    <div className="min-h-screen flex bg-slate-100">
      {/* Panel izquierdo - brand */}
      <div
        className="hidden lg:flex lg:w-5/12 relative overflow-hidden"
        style={{ background: 'linear-gradient(145deg, #7c3aed 0%, #4f46e5 45%, #1e1b4b 100%)' }}
      >
        {/* Iconos flotantes decorativos */}
        <span className="icon-[ic--twotone-rocket-launch] absolute top-20 left-12 w-20 h-20 text-white/10 floating-1" />
        <span className="icon-[ic--twotone-code] absolute top-1/2 -translate-y-1/2 right-16 w-24 h-24 text-white/8 floating-2" />
        <span className="icon-[ic--twotone-terminal] absolute bottom-24 left-16 w-16 h-16 text-white/12 floating-3" />
        <span className="icon-[ic--twotone-api] absolute top-32 right-24 w-14 h-14 text-white/9 floating-1" style={{ animationDelay: '1s' }} />
        <span className="icon-[ic--twotone-bolt] absolute bottom-32 right-20 w-18 h-18 text-white/11 floating-2" style={{ animationDelay: '1.5s' }} />

        {/* Contenido centrado */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-8 text-center">
          <div className="max-w-md w-full">
            {/* Logo / Icono */}
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                <span className="icon-[ic--twotone-rocket-launch] w-9 h-9 text-white" />
              </div>
            </div>

            {/* Carousel slides */}
            <div className="relative overflow-hidden min-h-[160px]">
              {slides.map((item, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-[600ms] ease-in-out ${
                    index === slide.current
                      ? 'opacity-100 translate-x-0'
                      : index === slide.prev
                        ? 'opacity-0 -translate-x-[30px]'
                        : 'opacity-0 translate-x-[30px]'
                  }`}
                  aria-hidden={index !== slide.current}
                >
                  <h1 className="text-3xl font-bold text-white mb-4 leading-tight">
                    {item.title[0]}
                    <br />
                    {item.title[1]}
                  </h1>
                  <p className="text-white/70 text-base leading-relaxed mx-auto">{item.text}</p>
                </div>
              ))}
            </div>

            {/* Indicadores carousel */}
            <div className="flex gap-2 mt-12 justify-center">
              {slides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`h-2 rounded-full transition-all duration-300 ${
                    slide.current === index ? 'bg-white w-8' : 'bg-white/40 w-2 hover:bg-white/60'
                  }`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Panel derecho - formulario */}
      <div className="w-full lg:w-7/12 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Logo mobile */}
          <div className="lg:hidden flex justify-center mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                <span className="icon-[ic--twotone-rocket-launch] w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">MVP Base</span>
            </div>
          </div>

          {/* Card contenedora */}
          <div className="bg-white rounded-2xl shadow-md p-7 lg:p-8">
            {/* Toggle Login / Registro */}
            <div className="flex bg-gray-100 rounded-xl p-1.5 mb-6">
              <button className={toggleClass(!isRegister)} onClick={() => switchMode(false)}>
                Inicia sesión
              </button>
              <button className={toggleClass(isRegister)} onClick={() => switchMode(true)}>
                Regístrate
              </button>
            </div>

            {!isRegister ? (
              /* Formulario Login */
              <form className="space-y-4" onSubmit={handleLogin}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Correo electrónico</label>
                  <div className="relative">
                    <span className="icon-[ic--twotone-email] absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400 pointer-events-none z-10" />
                    <InputText
                      value={loginEmail}
                      onChange={(e) => {
                        setLoginEmail(e.target.value)
                        setLoginErrors((errors) => ({ ...errors, email: '' }))
                      }}
                      type="email"
                      placeholder="tu@correo.com"
                      className={inputClass(loginAttempted && !!loginErrors.email)}
                      disabled={isLoading}
                    />
                  </div>
                  {loginAttempted && loginErrors.email && <small className="text-red-500 text-xs mt-1 block">{loginErrors.email}</small>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
                  <div className="relative">
                    <span className="icon-[ic--twotone-lock] absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400 pointer-events-none z-10" />
                    <InputText
                      value={loginPassword}
                      onChange={(e) => {
                        setLoginPassword(e.target.value)
                        setLoginErrors((errors) => ({ ...errors, password: '' }))
                      }}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className={inputClass(loginAttempted && !!loginErrors.password, '!pr-10')}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors z-10"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <span className={`${showPassword ? 'icon-[ic--twotone-visibility-off]' : 'icon-[ic--twotone-visibility]'} w-4.5 h-4.5`} />
                    </button>
                  </div>
                  {loginAttempted && loginErrors.password && (
                    <small className="text-red-500 text-xs mt-1 block">{loginErrors.password}</small>
                  )}
                </div>

                <div className="flex justify-end">
                  <button type="button" className="text-xs text-violet-600 hover:text-indigo-700 font-medium transition-colors">
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>

                <button
                  type="submit"
                  className={submitButtonClass}
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}
                  disabled={isLoading}
                >
                  {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                </button>
              </form>
            ) : (
              /* Formulario Registro */
              <form className="space-y-4" onSubmit={handleRegister}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre completo</label>
                  <div className="relative">
                    <span className="icon-[ic--twotone-person] absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400 pointer-events-none z-10" />
                    <InputText
                      value={regName}
                      onChange={(e) => {
                        setRegName(e.target.value)
                        setRegErrors((errors) => ({ ...errors, name: '' }))
                      }}
                      placeholder="Juan Pérez"
                      className={inputClass(regAttempted && !!regErrors.name)}
                      disabled={isLoading}
                    />
                  </div>
                  {regAttempted && regErrors.name && <small className="text-red-500 text-xs mt-1 block">{regErrors.name}</small>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Correo electrónico</label>
                  <div className="relative">
                    <span className="icon-[ic--twotone-email] absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400 pointer-events-none z-10" />
                    <InputText
                      value={regEmail}
                      onChange={(e) => {
                        setRegEmail(e.target.value)
                        setRegErrors((errors) => ({ ...errors, email: '' }))
                      }}
                      type="email"
                      placeholder="tu@correo.com"
                      className={inputClass(regAttempted && !!regErrors.email)}
                      disabled={isLoading}
                    />
                  </div>
                  {regAttempted && regErrors.email && <small className="text-red-500 text-xs mt-1 block">{regErrors.email}</small>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
                  <div className="relative">
                    <span className="icon-[ic--twotone-lock] absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400 pointer-events-none z-10" />
                    <Password
                      value={regPassword}
                      onChange={(e) => {
                        setRegPassword(e.target.value)
                        setRegErrors((errors) => ({ ...errors, password: '' }))
                      }}
                      placeholder="••••••••"
                      className="w-full"
                      inputClassName={inputClass(regAttempted && !!regErrors.password, '!pr-10')}
                      disabled={isLoading}
                      toggleMask
                      feedback
                      promptLabel="Ingresa una contraseña"
                      weakLabel="Débil"
                      mediumLabel="Media"
                      strongLabel="Fuerte"
                    />
                  </div>
                  {regAttempted && regErrors.password && <small className="text-red-500 text-xs mt-1 block">{regErrors.password}</small>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirma contraseña</label>
                  <div className="relative">
                    <span className="icon-[ic--twotone-lock] absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400 pointer-events-none z-10" />
                    <InputText
                      value={regConfirm}
                      onChange={(e) => {
                        setRegConfirm(e.target.value)
                        setRegErrors((errors) => ({ ...errors, confirm: '' }))
                      }}
                      type={showRegConfirm ? 'text' : 'password'}
                      placeholder="••••••••"
                      className={inputClass(regAttempted && !!regErrors.confirm, '!pr-10')}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors z-10"
                      onClick={() => setShowRegConfirm(!showRegConfirm)}
                    >
                      <span className={`${showRegConfirm ? 'icon-[ic--twotone-visibility-off]' : 'icon-[ic--twotone-visibility]'} w-4.5 h-4.5`} />
                    </button>
                  </div>
                  {regAttempted && regErrors.confirm && <small className="text-red-500 text-xs mt-1 block">{regErrors.confirm}</small>}
                </div>

                <button
                  type="submit"
                  className={submitButtonClass}
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}
                  disabled={isLoading}
                >
                  {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
                </button>
              </form>
            )}
          </div>

          {/* Footer legal */}
          <p className="text-center text-xs text-gray-500 mt-6 leading-relaxed">
            MVP Base © {new Date().getFullYear()} — Tu punto de partida para grandes proyectos
          </p>
        </div>
      </div>

      {/* Modal: Registro exitoso */}
      <Dialog
        visible={registrationSuccess}
        onHide={() => setRegistrationSuccess(false)}
        modal
        showHeader={false}
        style={{ width: '24rem' }}
        breakpoints={{ '575px': '90vw' }}
      >
        <div className="flex flex-col items-center text-center pt-6 pb-2 px-2">
          <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
            <span className="icon-[ic--twotone-check-circle] w-8 h-8 text-emerald-500" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Registro exitoso</h3>
          <p className="text-sm text-gray-500 leading-relaxed">Tu cuenta ha sido creada correctamente. Ya puedes iniciar sesión.</p>
          <Button
            label="Entendido"
            className="mt-6 w-full"
            onClick={() => {
              setRegistrationSuccess(false)
              switchMode(false)
            }}
          />
        </div>
      </Dialog>
    </div>
  )
}
