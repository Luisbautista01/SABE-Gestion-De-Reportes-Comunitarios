export function DashboardLayout({ title, session, children }) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">{session.usuario.roles.join(' / ')}</p>
          <h1 className="text-3xl font-black text-slate-950">{title}</h1>
        </div>
        <p className="rounded bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
          {session.usuario.nombres} {session.usuario.apellidos}
        </p>
      </div>
      {children}
    </main>
  )
}
