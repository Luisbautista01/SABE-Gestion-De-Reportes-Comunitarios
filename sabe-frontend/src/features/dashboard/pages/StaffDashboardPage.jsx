import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { reportApi } from '../../../infrastructure/http/reportApi'
import { ReportList } from '../../../shared/components/ReportList'
import { DashboardLayout } from '../../../shared/layout/DashboardLayout'

export function StaffDashboardPage({ session }) {
  const [reports, setReports] = useState([])

  const load = async () => setReports(await reportApi.all())

  useEffect(() => {
    load().catch(() => toast.error('No se pudieron cargar reportes'))
  }, [])

  const changeStatus = async (id, estado) => {
    await reportApi.changeStatus(id, { estado, comentario: `Gestionado por ${session.usuario.nombres}` })
    toast.success('Estado actualizado')
    load()
  }

  return (
    <DashboardLayout session={session} title="Panel funcionario">
      <ReportList reports={reports} title="Reportes asignables" onStatus={changeStatus} />
    </DashboardLayout>
  )
}
