import { statusLabels } from '../../core/domain/report'

export function ReportList({ reports, title, onStatus }) {
  return (
    <section className="rounded border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-bold text-slate-950">{title}</h2>
      <div className="mt-4 grid gap-3">
        {reports.length === 0 && <p className="rounded bg-slate-50 p-4 text-sm text-slate-500">No hay reportes registrados.</p>}
        {reports.map((report) => (
          <article className="rounded border border-slate-200 p-4" key={report.id}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">{report.categoria}</p>
                <h3 className="text-lg font-bold text-slate-950">{report.titulo}</h3>
              </div>
              <span className="rounded bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800">{statusLabels[report.estado] || report.estado}</span>
            </div>
            <p className="mt-2 text-sm text-slate-600">{report.descripcion}</p>
            <p className="mt-3 text-sm font-semibold text-slate-700">{report.direccion}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {report.evidencias?.map((url) => (
                <a className="rounded bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900" href={url} key={url} target="_blank" rel="noreferrer">
                  Evidencia
                </a>
              ))}
            </div>
            {onStatus && (
              <div className="mt-4 flex flex-wrap gap-2">
                {['EN_REVISION', 'EN_PROCESO', 'RESUELTO', 'RECHAZADO'].map((status) => (
                  <button className="rounded border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100" key={status} onClick={() => onStatus(report.id, status)} type="button">
                    {statusLabels[status]}
                  </button>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
