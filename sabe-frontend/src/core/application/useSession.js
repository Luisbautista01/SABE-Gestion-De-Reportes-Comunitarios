import { useState } from 'react'

export function useSession() {
  const [session, setSession] = useState(() => JSON.parse(localStorage.getItem('sabe-session') || 'null'))

  const saveSession = (nextSession) => {
    localStorage.setItem('sabe-session', JSON.stringify(nextSession))
    setSession(nextSession)
  }

  const logout = () => {
    localStorage.removeItem('sabe-session')
    setSession(null)
  }

  return { session, saveSession, logout }
}
