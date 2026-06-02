import { Link } from 'react-router-dom'
import {
  FaBell,
  FaCamera,
  FaChartLine,
  FaClipboardCheck,
  FaFileSignature,
  FaLock,
  FaMapMarkedAlt,
  FaSignInAlt,
  FaTasks,
  FaUserPlus,
  FaUsersCog,
} from 'react-icons/fa'

const heroImage =
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80'

const workflow = [
  ['01', 'Reporta', FaFileSignature, 'El ciudadano registra una incidencia con ubicación, categoría, descripción y evidencia fotográfica.'],
  ['02', 'Gestiona', FaTasks, 'Funcionarios y administradores clasifican, asignan y actualizan el estado del caso.'],
  ['03', 'Informa', FaBell, 'La comunidad recibe seguimiento, notificaciones y cierre documentado de la incidencia.'],
]

const features = [
  ['Autenticación por roles', FaLock],
  ['Reportes con evidencias', FaCamera],
  ['Seguimiento de estados', FaClipboardCheck],
  ['Panel administrativo', FaUsersCog],
]

export function HomePage() {
  return (
    <main>
      <section className="relative min-h-[78svh] overflow-hidden bg-slate-950">
        <img className="absolute inset-0 h-full w-full object-cover opacity-60" src={heroImage} alt="Costa Caribe colombiana" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-emerald-950/20" />
        <div className="relative mx-auto flex min-h-[78svh] max-w-7xl flex-col justify-center px-4 py-16 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex rounded bg-amber-300 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-950">
              Gestion pública digital
            </p>
            <h1 className="text-4xl font-black leading-tight text-white md:text-6xl">SABE</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-100">
              Sistema de Atención y Bitacora de Evidencias para reportes comunitarios en San Bernardo del Viento, Córdoba.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="inline-flex items-center rounded bg-emerald-500 px-5 py-3 font-bold text-slate-950 hover:bg-emerald-400" to="/registro">
                <FaUserPlus className="mr-2" aria-hidden="true" />
                Registrarse ahora
              </Link>
              <Link className="inline-flex items-center rounded border border-white/40 px-5 py-3 font-bold text-white hover:bg-white/10" to="/login">
                <FaSignInAlt className="mr-2" aria-hidden="true" />
                Iniciar sesión
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-white/90">
              <span className="inline-flex items-center rounded bg-white/10 px-3 py-2">
                <FaMapMarkedAlt className="mr-2" aria-hidden="true" />
                San Bernardo del Viento
              </span>
              <span className="inline-flex items-center rounded bg-white/10 px-3 py-2">
                <FaChartLine className="mr-2" aria-hidden="true" />
                Estadísticas municipales
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 md:grid-cols-3 lg:px-8">
          {workflow.map(([step, title, Icon, text]) => (
            <article className="rounded border border-slate-200 p-5" key={step}>
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded bg-emerald-100 text-emerald-800">
                  <Icon aria-hidden="true" />
                </span>
                <span className="text-sm font-black text-emerald-700">{step}</span>
              </div>
              <h2 className="mt-4 text-xl font-bold text-slate-950">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Operacion territorial</p>
          <h2 className="mt-2 text-3xl font-black text-slate-950">Una plataforma pensada para decisiones municipales trazables</h2>
          <p className="mt-4 leading-7 text-slate-700">
            SABE centraliza reportes ciudadanos, evidencias multimedia, gestion por roles, historial de cambios y estadísticas. La información queda disponible para priorizar intervenciones y medir tiempos de respuesta.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {features.map(([feature, Icon]) => (
            <div className="rounded border border-slate-200 bg-white p-5 shadow-sm" key={feature}>
              <span className="mb-4 grid h-10 w-10 place-items-center rounded bg-amber-100 text-amber-800">
                <Icon aria-hidden="true" />
              </span>
              <h3 className="font-bold text-slate-950">{feature}</h3>
              <p className="mt-2 text-sm text-slate-600">Módulo alineado con una gestión segura, mantenible y escalable.</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
