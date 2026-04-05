import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import useMediaQuery from '../hooks/useMediaQuery'
import gymConfig from '../config/gymConfig'

const links = [
  { label: 'Home', path: '/' },
  { label: 'Programs', path: '/programs' },
  { label: 'Schedule', path: '/schedule' },
  { label: 'Trainers', path: '/trainers' },
  { label: 'Contact', path: '/contact' },
]

function Navbar() {
  const { pathname } = useLocation()
  const device = useMediaQuery()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: device === 'mobile' ? '0 16px' : device === 'tablet' ? '0 32px' : '0 60px',width: '100%',

        background: 'rgba(10,15,30,0.95)', backdropFilter: 'blur(24px)',
        borderBottom: '1px solid var(--border)'
      }}>
        <Link to="/" style={{ fontFamily: 'Bebas Neue', fontSize: '26px', letterSpacing: '5px' }}>
          APEX<span style={{ color: 'var(--gold)' }}>GYM</span>
        </Link>

        {/* Desktop Links */}
        {device === 'desktop' && (
          <ul style={{ display: 'flex', gap: '40px', listStyle: 'none' }}>
            {links.map(link => (
              <li key={link.path}>
                <Link to={link.path} style={{
                  fontSize: '11px', fontWeight: '600', letterSpacing: '3px',
                  textTransform: 'uppercase',
                  color: pathname === link.path ? 'var(--gold)' : 'var(--light-gray)',
                  transition: 'color 0.3s'
                }}>{link.label}</Link>
              </li>
            ))}
          </ul>
        )}

        {/* Desktop Login */}
        {device === 'desktop' && (
          <button className="btn-outline-gold" style={{ padding: '10px 28px', fontSize: '11px' }}>
            Login
          </button>
        )}

        {/* Mobile/Tablet Hamburger */}
        {device !== 'desktop' && (
          <button onClick={() => setMenuOpen(!menuOpen)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', gap: '5px', padding: '4px'
          }}>
            {[0,1,2].map(i => (
              <span key={i} style={{
                display: 'block', width: '24px', height: '1.5px',
                background: menuOpen && i === 1 ? 'transparent' : 'var(--gold)',
                transition: 'all 0.3s',
                transform: menuOpen ? (i === 0 ? 'rotate(45deg) translate(4px,4px)' : i === 2 ? 'rotate(-45deg) translate(4px,-4px)' : '') : ''
              }} />
            ))}
          </button>
        )}
      </nav>

      {/* Mobile Menu Dropdown */}
      {menuOpen && device !== 'desktop' && (
        <div style={{
          position: 'fixed', top: '72px', left: 0, right: 0, zIndex: 999,
          background: 'rgba(10,15,30,0.98)', backdropFilter: 'blur(24px)',
          borderBottom: '1px solid var(--border)', padding: '24px 20px'
        }}>
          {links.map(link => (
            <Link key={link.path} to={link.path}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block', padding: '16px 0',
                fontSize: '13px', fontWeight: '600', letterSpacing: '3px',
                textTransform: 'uppercase', borderBottom: '1px solid var(--border2)',
                color: pathname === link.path ? 'var(--gold)' : 'var(--light-gray)'
              }}>
              {link.label}
            </Link>
          ))}
          <button className="btn-gold" style={{ width: '100%', marginTop: '20px', padding: '16px', clipPath: 'none' }}>
            Login
          </button>
        </div>
      )}
    </>
  )
}

export default Navbar