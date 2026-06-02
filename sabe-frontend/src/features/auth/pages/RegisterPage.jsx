import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { FaUserPlus } from 'react-icons/fa'
import { authApi } from '../../../infrastructure/http/authApi'
import { Input } from '../../../shared/components/FormControls'
import { AuthLayout } from '../../../shared/layout/AuthLayout'

export function RegisterPage({ saveSession }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({ nombres: '', apellidos: '', email: '', password: '', telefono: '', documento: '', barrio: '', direccion: '' })

  const submit = async (event) => {
    event.preventDefault()
    try {
      const data = await authApi.register(form)
      saveSession(data)
      toast.success('Registro creado')
      navigate('/ciudadano')
    } catch (error) {
      toast.error(error.response?.data?.message || 'No fue posible registrar')
    }
  }

  return (
    <AuthLayout title="Registro ciudadano" subtitle="Crea tu cuenta para registrar reportes, consultar avances y recibir actualizaciones.">
      <form className="grid gap-4 md:grid-cols-2" onSubmit={submit}>
        <Input label="Nombres" name="nombres" setForm={setForm} value={form.nombres} />
        <Input label="Apellidos" name="apellidos" setForm={setForm} value={form.apellidos} />
        <Input label="Correo" name="email" setForm={setForm} type="email" value={form.email} />
        <Input label="Contrasena" name="password" setForm={setForm} type="password" value={form.password} />
        <Input label="Telefono" name="telefono" setForm={setForm} value={form.telefono} />
        <Input label="Documento" name="documento" setForm={setForm} value={form.documento} />
        <Input label="Barrio" name="barrio" setForm={setForm} value={form.barrio} />
        <Input label="Direccion" name="direccion" setForm={setForm} value={form.direccion} />
        <button className="inline-flex items-center justify-center rounded bg-emerald-800 px-4 py-3 font-bold text-white hover:bg-emerald-900 md:col-span-2" type="submit">
          <FaUserPlus className="mr-2" aria-hidden="true" />
          Crear cuenta
        </button>
      </form>
    </AuthLayout>
  )
}
