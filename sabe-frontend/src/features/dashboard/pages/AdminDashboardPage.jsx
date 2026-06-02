import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { statusLabels } from '../../../core/domain/report'
import { authApi } from '../../../infrastructure/http/authApi'
import { reportApi } from '../../../infrastructure/http/reportApi'
import { Input } from '../../../shared/components/FormControls'
import { ReportList } from '../../../shared/components/ReportList'
import { DashboardLayout } from '../../../shared/layout/DashboardLayout'

export function AdminDashboardPage({ session }) {
  const [reports, setReports] = useState([])
  const [stats, setStats] = useState(null)
  const [user, setUser] = useState({ nombres: '', apellidos: '', email: '', password: '', telefono: '', rol: 'FUNCIONARIO', dependencia: '', cargo: '' })

  const load = async () => {
    const [reportData, statsData] = await Promise.all([reportApi.all(), reportApi.stats()])
    setReports(reportData)
    setStats(statsData)
  }

  useEffect(() => {
    load().catch(() => toast.error('No se pudo cargar administracion'))
  }, [])

  const createUser = async (event) => {
    event.preventDefault()
    await authApi.createUser(user)
    toast.success('Usuario creado')
    setUser({ nombres: '', apellidos: '', email: '', password: '', telefono: '', rol: 'FUNCIONARIO', dependencia: '', cargo: '' })
  }

  const changeStatus = async (id, estado) => {
    await reportApi.changeStatus(id, { estado, comentario: `Gestionado por administrador ${session.usuario.nombres}` })
    toast.success('Estado actualizado')
    load()
  }

  return (
    <DashboardLayout session={session} title="Panel administrador">
      <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
        <section className="space-y-6">
          <Stats stats={stats} />
          <form className="rounded border border-slate-200 bg-white p-5 shadow-sm" onSubmit={createUser}>
            <h2 className="text-xl font-bold text-slate-950">Crear usuario interno</h2>
            <div className="mt-4 grid gap-3">
              <Input label="Nombres" name="nombres" setForm={setUser} value={user.nombres} />
              <Input label="Apellidos" name="apellidos" setForm={setUser} value={user.apellidos} />
              <Input label="Correo" name="email" setForm={setUser} type="email" value={user.email} />
              <Input label="Contrasena temporal" name="password" setForm={setUser} type="password" value={user.password} />
              <label className="block text-sm font-semibold text-slate-700">
                Rol
                <select className="mt-1 w-full rounded border border-slate-300 px-3 py-2" onChange={(event) => setUser((current) => ({ ...current, rol: event.target.value }))} value={user.rol}>
                  <option value="FUNCIONARIO">Funcionario</option>
                  <option value="ADMINISTRADOR">Administrador</option>
                </select>
              </label>
              <Input label="Dependencia" name="dependencia" required={false} setForm={setUser} value={user.dependencia} />
              <Input label="Cargo" name="cargo" required={false} setForm={setUser} value={user.cargo} />
              <button className="rounded bg-emerald-800 px-4 py-3 font-bold text-white hover:bg-emerald-900" type="submit">
                Crear usuario
              </button>
            </div>
          </form>
        </section>
        <ReportList reports={reports} title="Gestion global de reportes" onStatus={changeStatus} />
      </div>
    </DashboardLayout>
  )
}

function Stats({ stats }) {
  if (!stats) return <section className="rounded border border-slate-200 bg-white p-5 shadow-sm">Cargando estadisticas...</section>
  return (
    <section className="rounded border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-bold text-slate-950">Estadisticas</h2>
      <p className="mt-3 text-4xl font-black text-emerald-700">{stats.total}</p>
      <p className="text-sm text-slate-500">reportes registrados</p>
      <div className="mt-5 grid gap-2">
        {Object.entries(stats.porEstado).map(([key, value]) => (
          <div className="flex items-center justify-between rounded bg-slate-50 px-3 py-2 text-sm" key={key}>
            <span>{statusLabels[key] || key}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
    </section>
  )
}
