import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Programs from './pages/Programs'
import Schedule from './pages/Schedule'
import Trainers from './pages/Trainers'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'
import useLenis from './hooks/useLenis'
import useCursor from './hooks/useCursor'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

// Inner component — rendered AFTER AuthProvider confirms auth state,
// so cursor divs are in the DOM when useCursor runs.
function AppInner() {
  useLenis()
  useCursor()

  return (
    <>
      {/* CURSOR */}
      <div id="cursor" style={{
        width: '12px', height: '12px',
        background: 'var(--gold)', borderRadius: '50%',
        position: 'fixed', pointerEvents: 'none',
        zIndex: 99999, transition: 'transform 0.15s ease'
      }} />
      <div id="cursorRing" style={{
        width: '36px', height: '36px',
        border: '1px solid rgba(245,166,35,0.5)', borderRadius: '50%',
        position: 'fixed', pointerEvents: 'none', zIndex: 99998
      }} />

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/trainers" element={<Trainers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
      <Footer />
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  )
}

export default App