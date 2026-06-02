export function AuthLayout({ title, subtitle, children }) {
  return (
    <main className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
      <section className="flex flex-col justify-center">
        <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Acceso seguro</p>
        <h1 className="mt-2 text-3xl font-black text-slate-950 md:text-5xl">{title}</h1>
        <p className="mt-4 text-slate-600">{subtitle}</p>
      </section>
      <section className="rounded border border-slate-200 bg-white p-6 shadow-sm">{children}</section>
    </main>
  )
}
