import { NavLink } from 'react-router-dom'

const sideImage =
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80'

export function AuthLayout({ title, subtitle, children }) {
  const tabClass = ({ isActive }) => (
    `flex-1 rounded px-3 py-2 text-center text-sm font-bold transition ${
      isActive
        ? 'bg-emerald-800 text-white'
        : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-800'
    }`
  )

  return (
    <main
      className="bg-slate-950/80 bg-cover bg-center px-4 py-8"
      style={{ backgroundImage: "linear-gradient(rgba(15, 23, 42, 0.78), rgba(15, 23, 42, 0.78)), url('/sabe.jpg')" }}
    >
      <div className="mx-auto grid min-h-[calc(100svh-12rem)] max-w-7xl gap-4 lg:grid-cols-[0.8fr_1.15fr_0.8fr]">
        <aside className="hidden overflow-hidden rounded border border-white/20 bg-white/10 lg:block">
          <img className="h-full w-full object-cover opacity-90" src="/sabe.jpg" alt="Identidad visual de SABE" />
        </aside>

        <section className="rounded border border-slate-200 bg-white/95 p-5 shadow-xl backdrop-blur md:p-7">
          <div className="mb-5 rounded bg-slate-100 p-1">
            <div className="grid gap-1 sm:grid-cols-3">
              <NavLink className={tabClass} to="/login">
                Login
              </NavLink>
              <NavLink className={tabClass} to="/registro/ciudadano">
                Registro ciudadano
              </NavLink>
              <NavLink className={tabClass} to="/registro/funcionario">
                Registro funcionario
              </NavLink>
            </div>
          </div>

          <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Acceso seguro</p>
          <h1 className="mt-2 text-3xl font-black text-slate-950 md:text-4xl">{title}</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">{subtitle}</p>

          <div className="mt-6">{children}</div>
        </section>

        <aside className="hidden overflow-hidden rounded border border-white/20 bg-white/10 lg:block">
          <img className="h-full w-full object-cover opacity-90" src={sideImage} alt="Comunidad usando tecnologia" />
        </aside>
      </div>
    </main>
  )
}
