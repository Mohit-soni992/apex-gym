import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Programs from './pages/Programs'
import Schedule from './pages/Schedule'
import Trainers from './pages/Trainers'
import Contact from './pages/Contact'
import useLenis from './hooks/useLenis'
import useCursor from './hooks/useCursor'

function App() {
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
      </Routes>
      <Footer />
    </>
  )
}

export default App