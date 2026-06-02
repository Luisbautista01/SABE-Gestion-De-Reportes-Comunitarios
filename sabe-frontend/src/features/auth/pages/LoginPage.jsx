import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { FaKey, FaLock, FaSignInAlt, FaUserShield } from 'react-icons/fa'
import { roleHome } from '../../../core/domain/session'
import { authApi } from '../../../infrastructure/http/authApi'
import { Input } from '../../../shared/components/FormControls'
import { AuthLayout } from '../../../shared/layout/AuthLayout'

export function LoginPage({ saveSession }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })

  const signIn = async (credentials) => {
    const data = await authApi.login(credentials)
    saveSession(data)
    toast.success('Sesion iniciada')
    navigate(roleHome(data.usuario.roles))
  }

  const submit = async (event) => {
    event.preventDefault()
    try {
      await signIn(form)
    } catch (error) {
      toast.error(error.response?.data?.message || 'No fue posible ingresar')
    }
  }

  return (
    <AuthLayout title="Iniciar sesion" subtitle="Ingresa con tus credenciales institucionales o ciudadanas para acceder al panel correspondiente.">

      <form className="space-y-4" onSubmit={submit}>
        <Input label="Correo" name="email" setForm={setForm} type="email" value={form.email} />
        <Input label="Contrasena" name="password" setForm={setForm} type="password" value={form.password} />
        <button className="inline-flex w-full items-center justify-center rounded bg-emerald-800 px-4 py-3 font-bold text-white hover:bg-emerald-900" type="submit">
          <FaSignInAlt className="mr-2" aria-hidden="true" />
          Ingresar
        </button>
      </form>
      <div className="mt-5 flex items-center gap-3 rounded bg-emerald-50 p-4 text-sm text-emerald-900">
        <FaLock className="shrink-0" aria-hidden="true" />
        <span>Autenticacion segura con control de acceso por rol.</span>
      </div>
      <Link className="mt-4 inline-flex items-center text-sm font-semibold text-emerald-700 hover:underline" to="/recuperar">
        <FaKey className="mr-2" aria-hidden="true" />
        Recuperar contrasena
      </Link>
    </AuthLayout>
  )
}
