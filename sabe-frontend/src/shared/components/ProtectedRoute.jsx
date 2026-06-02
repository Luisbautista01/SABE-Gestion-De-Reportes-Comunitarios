import { Navigate } from 'react-router-dom'
import { hasAnyRole, roleHome } from '../../core/domain/session'

export function ProtectedRoute({ session, roles, children }) {
  if (!session) return <Navigate to="/login" replace />
  if (roles && !hasAnyRole(session, roles)) return <Navigate to={roleHome(session.usuario.roles)} replace />
  return children
}
