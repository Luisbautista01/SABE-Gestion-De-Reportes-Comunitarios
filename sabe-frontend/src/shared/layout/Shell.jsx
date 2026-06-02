import { Link } from 'react-router-dom'
import {
  FaHome,
  FaInfoCircle,
  FaSignInAlt,
  FaSignOutAlt,
  FaTachometerAlt,
} from 'react-icons/fa'

import { roleHome } from '../../core/domain/session'

export function Shell({ session, logout, children }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">

      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
        <nav className="mx-auto max-w-7xl px-6">
          <div className="flex h-20 items-center justify-between">

            <Link to="/" className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-700 text-white font-black text-lg shadow-lg">
                SB
              </div>

              <div>
                <h1 className="text-xl font-black text-slate-900">
                  SABE
                </h1>

                <p className="text-xs text-slate-500">
                  Sistema de Atención a Bienes y Entornos
                </p>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-2">

              <Link
                to="/"
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-slate-700 hover:bg-slate-100"
              >
                <FaHome />
                Inicio
              </Link>

              <Link
                to="/about"
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-slate-700 hover:bg-slate-100"
              >
                <FaInfoCircle />
                Acerca de
              </Link>

              {session ? (
                <>
                  <Link
                    to={roleHome(session.usuario.roles)}
                    className="flex items-center gap-2 rounded-lg bg-emerald-700 px-5 py-2 font-semibold text-white hover:bg-emerald-800"
                  >
                    <FaTachometerAlt />
                    Dashboard
                  </Link>

                  <button
                    onClick={logout}
                    className="flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 hover:bg-slate-100"
                  >
                    <FaSignOutAlt />
                    Salir
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center gap-2 rounded-lg px-4 py-2 hover:bg-slate-100"
                  >
                    <FaSignInAlt />
                    Ingresar
                  </Link>

                </>
              )}
            </div>
          </div>
        </nav>
      </header>

      <div className="flex-1">
        {children}
      </div>

      <footer className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10">

          <div className="grid gap-8 md:grid-cols-3">

            <div>
              <h3 className="font-black text-slate-900">
                SABE
              </h3>

              <p className="mt-3 text-sm text-slate-600">
                Plataforma para la gestión y seguimiento de reportes
                ciudadanos en el municipio de San Bernardo del Viento.
              </p>
            </div>

            <div>
              <h4 className="font-bold">
                Servicios
              </h4>

              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>Reportes ciudadanos</li>
                <li>Seguimiento de incidencias</li>
                <li>Gestión administrativa</li>
                <li>Estadísticas</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold">
                Contacto
              </h4>

              <p className="mt-3 text-sm text-slate-600">
                Alcaldía Municipal
              </p>

              <p className="text-sm text-slate-600">
                San Bernardo del Viento - Córdoba
              </p>
            </div>

          </div>

          <div className="mt-8 border-t pt-4 text-center text-sm text-slate-500">
            © 2026 SABE - Sistema de Atención a Bienes y Entornos
          </div>

        </div>
      </footer>

    </div>
  )
}
