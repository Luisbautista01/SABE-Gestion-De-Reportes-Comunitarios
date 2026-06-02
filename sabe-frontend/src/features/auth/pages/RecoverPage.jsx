import { useState } from 'react'
import toast from 'react-hot-toast'
import { FaPaperPlane } from 'react-icons/fa'
import { authApi } from '../../../infrastructure/http/authApi'
import { AuthLayout } from '../../../shared/layout/AuthLayout'

export function RecoverPage() {
  const [email, setEmail] = useState('')

  const submit = async (event) => {
    event.preventDefault()
    const data = await authApi.recover(email)
    toast.success(data.message)
  }

  return (
    <AuthLayout title="Recuperar contrasena" subtitle="Registra tu correo para iniciar el flujo de recuperacion de acceso.">
      <form className="space-y-4" onSubmit={submit}>
        <label className="block text-sm font-semibold text-slate-700">
          Correo
          <input className="mt-1 w-full rounded border border-slate-300 px-3 py-2 outline-none focus:border-emerald-700" onChange={(event) => setEmail(event.target.value)} required type="email" value={email} />
        </label>
        <button className="inline-flex w-full items-center justify-center rounded bg-emerald-800 px-4 py-3 font-bold text-white hover:bg-emerald-900" type="submit">
          <FaPaperPlane className="mr-2" aria-hidden="true" />
          Enviar instrucciones
        </button>
      </form>
    </AuthLayout>
  )
}
