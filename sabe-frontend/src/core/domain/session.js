export function roleHome(roles = []) {
  if (roles.includes('ADMINISTRADOR')) return '/admin'
  if (roles.includes('FUNCIONARIO')) return '/funcionario'
  return '/ciudadano'
}

export function hasAnyRole(session, roles = []) {
  return Boolean(session) && roles.some((role) => session.usuario.roles.includes(role))
}
