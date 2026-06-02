import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { FaCheckCircle, FaShieldAlt, FaUserPlus } from 'react-icons/fa'
import { authApi } from '../../../infrastructure/http/authApi'
import { Input } from '../../../shared/components/FormControls'
import { AuthLayout } from '../../../shared/layout/AuthLayout'

const accountCopy = {
  CIUDADANO: {
    title: 'Registro ciudadano',
    subtitle: 'Crea tu cuenta para registrar reportes, consultar avances y recibir actualizaciones.',
    success: 'Cuenta ciudadana creada. Ahora inicia sesion.',
  },
  FUNCIONARIO: {
    title: 'Registro funcionario',
    subtitle: 'Crea tu cuenta institucional para gestionar reportes comunitarios desde el panel funcionario.',
    success: 'Cuenta de funcionario creada. Ahora inicia sesion.',
  },
}

export function RegisterPage({ accountType = 'CIUDADANO' }) {
  const navigate = useNavigate()
  const copy = accountCopy[accountType]
  const captcha = useMemo(() => {
    const a = Math.floor(Math.random() * 7) + 3
    const b = Math.floor(Math.random() * 6) + 2
    return { question: `${a} + ${b}`, answer: String(a + b) }
  }, [accountType])
  const [form, setForm] = useState({
    nombres: '',
    apellidos: '',
    email: '',
    password: '',
    telefono: '',
    documento: '',
    barrio: '',
    direccion: '',
    dependencia: '',
    cargo: '',
  })
  const [checks, setChecks] = useState({ data: false, cookies: false })
  const [captchaAnswer, setCaptchaAnswer] = useState('')

  const canSubmit = checks.data && checks.cookies && captchaAnswer.trim() === captcha.answer

  const submit = async (event) => {
    event.preventDefault()
    if (!checks.data || !checks.cookies) {
      toast.error('Acepta el tratamiento de datos y el uso de cookies')
      return
    }
    if (captchaAnswer.trim() !== captcha.answer) {
      toast.error('Verifica el captcha antes de registrarte')
      return
    }
    try {
      await authApi.register({ ...form, rol: accountType })
      toast.success(copy.success)
      navigate('/login', { replace: true })
    } catch (error) {
      toast.error(error.response?.data?.message || 'No fue posible registrar')
    }
  }

  return (
    <AuthLayout title={copy.title} subtitle={copy.subtitle}>
      <div className="mb-5 rounded border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-950">
        <div className="flex items-start gap-3">
          <FaShieldAlt className="mt-1 shrink-0" aria-hidden="true" />
          <div>
            <p className="font-bold">Tratamiento de datos y cookies</p>
            <p className="mt-1 text-emerald-900">
              SABE usara tus datos para validar tu cuenta, gestionar reportes comunitarios, enviar notificaciones del caso y mantener la seguridad de la plataforma. Las cookies tecnicas permiten conservar la sesion y proteger el acceso.
            </p>
          </div>
        </div>
      </div>

      <form className="grid gap-4 md:grid-cols-2" onSubmit={submit}>
        <Input label="Nombres" name="nombres" setForm={setForm} value={form.nombres} />
        <Input label="Apellidos" name="apellidos" setForm={setForm} value={form.apellidos} />
        <Input label="Correo" name="email" setForm={setForm} type="email" value={form.email} />
        <Input label="Contrasena" name="password" setForm={setForm} type="password" value={form.password} />
        <Input label="Telefono" name="telefono" setForm={setForm} value={form.telefono} />

        {accountType === 'CIUDADANO' ? (
          <>
            <Input label="Documento" name="documento" setForm={setForm} value={form.documento} />
            <Input label="Barrio" name="barrio" setForm={setForm} value={form.barrio} />
            <Input label="Direccion" name="direccion" setForm={setForm} value={form.direccion} />
          </>
        ) : (
          <>
            <Input label="Dependencia" name="dependencia" setForm={setForm} value={form.dependencia} />
            <Input label="Cargo" name="cargo" setForm={setForm} value={form.cargo} />
          </>
        )}

        <div className="rounded border border-slate-200 bg-white p-4 md:col-span-2">
          <p className="text-sm font-bold text-slate-800">Validacion captcha</p>
          <label className="mt-3 block text-sm font-semibold text-slate-700">
            Resuelve: {captcha.question}
            <input
              className="mt-1 w-full rounded border border-slate-300 px-3 py-2 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
              onChange={(event) => setCaptchaAnswer(event.target.value)}
              required
              type="number"
              value={captchaAnswer}
            />
          </label>
        </div>

        <div className="space-y-3 rounded border border-slate-200 bg-slate-50 p-4 md:col-span-2">
          <label className="flex gap-3 text-sm text-slate-700">
            <input
              checked={checks.data}
              className="mt-1 h-4 w-4"
              onChange={(event) => setChecks((current) => ({ ...current, data: event.target.checked }))}
              type="checkbox"
            />
            <span>Acepto el tratamiento de mis datos personales para la gestion de mi cuenta y reportes comunitarios.</span>
          </label>
          <label className="flex gap-3 text-sm text-slate-700">
            <input
              checked={checks.cookies}
              className="mt-1 h-4 w-4"
              onChange={(event) => setChecks((current) => ({ ...current, cookies: event.target.checked }))}
              type="checkbox"
            />
            <span>Acepto el uso de cookies tecnicas necesarias para iniciar sesion y usar la plataforma.</span>
          </label>
        </div>

        <button
          className="inline-flex items-center justify-center rounded bg-emerald-800 px-4 py-3 font-bold text-white hover:bg-emerald-900 disabled:cursor-not-allowed disabled:bg-slate-400 md:col-span-2"
          disabled={!canSubmit}
          type="submit"
        >
          <FaUserPlus className="mr-2" aria-hidden="true" />
          Crear cuenta
        </button>
      </form>

      <div className="mt-5 flex items-center justify-between gap-3 rounded bg-slate-50 p-4 text-sm text-slate-700">
        <span className="inline-flex items-center gap-2">
          <FaCheckCircle className="text-emerald-700" aria-hidden="true" />
          Despues del registro entraras desde login.
        </span>
        <Link className="font-bold text-emerald-700 hover:underline" to="/login">
          Ir a login
        </Link>
      </div>
    </AuthLayout>
  )
}
