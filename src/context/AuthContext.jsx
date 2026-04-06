import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../config/firebase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Firebase listener — fires on every auth state change (login, logout, page refresh)
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe // cleanup on unmount
  }, [])

  const logout = () => signOut(auth)

  return (
    <AuthContext.Provider value={{ currentUser, loading, logout }}>
      {/* Don't render children until we know the auth state */}
      {!loading && children}
    </AuthContext.Provider>
  )
}

// Custom hook for easy access
export function useAuth() {
  return useContext(AuthContext)
}
