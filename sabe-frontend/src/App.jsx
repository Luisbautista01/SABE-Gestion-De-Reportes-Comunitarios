import { Toaster } from 'react-hot-toast'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { useSession } from './core/application/useSession'
import { roleHome } from './core/domain/session'
import { LoginPage } from './features/auth/pages/LoginPage'
import { RecoverPage } from './features/auth/pages/RecoverPage'
import { RegisterPage } from './features/auth/pages/RegisterPage'
import { AdminDashboardPage } from './features/dashboard/pages/AdminDashboardPage'
import { CitizenDashboardPage } from './features/dashboard/pages/CitizenDashboardPage'
import { StaffDashboardPage } from './features/dashboard/pages/StaffDashboardPage'
import { AboutPage } from './features/landing/pages/AboutPage'
import { HomePage } from './features/landing/pages/HomePage'
import { ProtectedRoute } from './shared/components/ProtectedRoute'
import { Shell } from './shared/layout/Shell'

function App() {
  const { session, saveSession, logout } = useSession()

  return (
    <Router>
      <Toaster position="top-right" />
      <Shell logout={logout} session={session}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={session ? <Navigate to={roleHome(session.usuario.roles)} replace /> : <LoginPage saveSession={saveSession} />} />
          <Route path="/registro" element={session ? <Navigate to="/ciudadano" replace /> : <RegisterPage saveSession={saveSession} />} />
          <Route path="/recuperar" element={<RecoverPage />} />
          <Route
            path="/ciudadano"
            element={(
              <ProtectedRoute roles={['CIUDADANO']} session={session}>
                <CitizenDashboardPage session={session} />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/funcionario"
            element={(
              <ProtectedRoute roles={['FUNCIONARIO']} session={session}>
                <StaffDashboardPage session={session} />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/admin"
            element={(
              <ProtectedRoute roles={['ADMINISTRADOR']} session={session}>
                <AdminDashboardPage session={session} />
              </ProtectedRoute>
            )}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Shell>
    </Router>
  )
}

export default App
