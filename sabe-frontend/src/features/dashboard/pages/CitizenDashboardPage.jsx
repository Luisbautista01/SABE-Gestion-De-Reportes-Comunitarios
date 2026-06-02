import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { reportApi } from '../../../infrastructure/http/reportApi'
import { Input, Textarea } from '../../../shared/components/FormControls'
import { ReportList } from '../../../shared/components/ReportList'
import { DashboardLayout } from '../../../shared/layout/DashboardLayout'

export function CitizenDashboardPage({ session }) {
  const [categories, setCategories] = useState([])
  const [reports, setReports] = useState([])
  const [form, setForm] = useState({ titulo: '', descripcion: '', direccion: '', categoriaId: '', evidencias: '' })

  const load = async () => {
    const [categoryData, reportData] = await Promise.all([reportApi.categories(), reportApi.mine()])
    setCategories(categoryData)
    setReports(reportData)
  }

  useEffect(() => {
    load().catch(() => toast.error('No se pudo cargar informacion'))
  }, [])

  const submit = async (event) => {
    event.preventDefault()
    const payload = {
      ...form,
      categoriaId: Number(form.categoriaId),
      evidencias: form.evidencias.split('\n').map((url) => url.trim()).filter(Boolean),
    }
    await reportApi.create(payload)
    toast.success('Reporte creado')
    setForm({ titulo: '', descripcion: '', direccion: '', categoriaId: '', evidencias: '' })
    load()
  }

  return (
    <DashboardLayout session={session} title="Panel ciudadano">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">Nuevo reporte</h2>
          <form className="mt-4 space-y-4" onSubmit={submit}>
            <Input label="Titulo" name="titulo" setForm={setForm} value={form.titulo} />
            <label className="block text-sm font-semibold text-slate-700">
              Categoria
              <select className="mt-1 w-full rounded border border-slate-300 px-3 py-2" onChange={(event) => setForm((current) => ({ ...current, categoriaId: event.target.value }))} required value={form.categoriaId}>
                <option value="">Selecciona una categoria</option>
                {categories.map((category) => <option key={category.id} value={category.id}>{category.nombre}</option>)}
              </select>
            </label>
            <Input label="Direccion" name="direccion" setForm={setForm} value={form.direccion} />
            <Textarea label="Descripcion" onChange={(event) => setForm((current) => ({ ...current, descripcion: event.target.value }))} value={form.descripcion} />
            <Textarea label="URLs de evidencias fotograficas" onChange={(event) => setForm((current) => ({ ...current, evidencias: event.target.value }))} placeholder="Una URL por linea" required={false} rows={3} value={form.evidencias} />
            <button className="w-full rounded bg-emerald-800 px-4 py-3 font-bold text-white hover:bg-emerald-900" type="submit">
              Enviar reporte
            </button>
          </form>
        </section>
        <ReportList reports={reports} title="Mis reportes" />
      </div>
    </DashboardLayout>
  )
}
