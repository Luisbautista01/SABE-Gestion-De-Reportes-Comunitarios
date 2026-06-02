import { Link } from 'react-router-dom'
import { FaHome, FaInfoCircle, FaSignInAlt, FaSignOutAlt, FaTachometerAlt, FaUserPlus } from 'react-icons/fa'
import { roleHome } from '../../core/domain/session'

export function Shell({ session, logout, children }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-emerald-900/10 bg-white/90 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded bg-emerald-800 text-sm font-black text-white">SB</span>
            <span>
              <strong className="block text-base leading-5 text-slate-950">SABE</strong>
              <span className="block text-xs text-slate-500">Gestión de Reportes Comunitarios</span>
            </span>
          </Link>
          <div className="flex flex-wrap items-center justify-end gap-2 text-sm">
            <Link className="inline-flex items-center rounded px-3 py-2 text-slate-700 hover:bg-slate-100" to="/">
              <FaHome className="mr-2" aria-hidden="true" />
              Home
            </Link>
            <Link className="inline-flex items-center rounded px-3 py-2 text-slate-700 hover:bg-slate-100" to="/about">
              <FaInfoCircle className="mr-2" aria-hidden="true" />
              About
            </Link>
            {session ? (
              <>
                <Link className="inline-flex items-center rounded bg-emerald-800 px-3 py-2 font-semibold text-white hover:bg-emerald-900" to={roleHome(session.usuario.roles)}>
                  <FaTachometerAlt className="mr-2" aria-hidden="true" />
                  Panel
                </Link>
                <button className="inline-flex items-center rounded border border-slate-300 px-3 py-2 text-slate-700 hover:bg-slate-100" onClick={logout} type="button">
                  <FaSignOutAlt className="mr-2" aria-hidden="true" />
                  Salir
                </button>
              </>
            ) : (
              <>
                <Link className="inline-flex items-center rounded px-3 py-2 text-slate-700 hover:bg-slate-100" to="/login">
                  <FaSignInAlt className="mr-2" aria-hidden="true" />
                  Ingresar
                </Link>
                <Link className="inline-flex items-center rounded bg-emerald-800 px-3 py-2 font-semibold text-white hover:bg-emerald-900" to="/registro">
                  <FaUserPlus className="mr-2" aria-hidden="true" />
                  Registro
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>
      {children}
      <footer className="border-t border-slate-200 bg-white px-4 py-6 text-center text-sm text-slate-500">
        Plataforma SABE - Reportes comunitarios, trazabilidad y gestion municipal.
      </footer>
    </div>
  )
}
