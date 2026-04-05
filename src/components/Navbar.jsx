import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useMediaQuery from '../hooks/useMediaQuery'

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
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: device === 'mobile' ? '0 16px' : device === 'tablet' ? '0 32px' : '0 60px',
        height: scrolled ? '52px' : '72px',
        background: scrolled ? 'rgba(6,9,18,0.98)' : 'rgba(10,15,30,0.85)',
        backdropFilter: 'blur(24px)',
        borderBottom: '1px solid var(--border)',
        transition: 'height 0.4s cubic-bezier(0.4,0,0.2,1), background 0.4s ease',
        width: '100%',
        boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.4)' : 'none',
      }}>
        <Link to="/" style={{
          fontFamily: 'Bebas Neue',
          fontSize: scrolled ? '22px' : '26px',
          letterSpacing: '5px',
          transition: 'font-size 0.4s ease'
        }}>
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
                  transition: 'color 0.3s', position: 'relative',
                }}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {/* Desktop Login */}
        {device === 'desktop' && (
          <button className="btn-outline-gold" style={{
            padding: scrolled ? '8px 22px' : '10px 28px',
            fontSize: '11px',
            transition: 'padding 0.4s ease'
          }}>
            Login
          </button>
        )}

        {/* Mobile/Tablet Hamburger */}
        {device !== 'desktop' && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column',
              gap: '5px', padding: '4px'
            }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block', width: '24px', height: '1.5px',
                background: menuOpen && i === 1 ? 'transparent' : 'var(--gold)',
                transition: 'all 0.3s',
                transform: menuOpen
                  ? i === 0 ? 'rotate(45deg) translate(4px,4px)'
                  : i === 2 ? 'rotate(-45deg) translate(4px,-4px)' : ''
                  : ''
              }} />
            ))}
          </button>
        )}
      </nav>

      {/* Mobile Menu */}
      <div style={{
        position: 'fixed', top: scrolled ? '52px' : '72px',
        left: 0, right: 0, zIndex: 999,
        background: 'rgba(6,9,18,0.98)',
        backdropFilter: 'blur(24px)',
        borderBottom: '1px solid var(--border)',
        padding: menuOpen ? '24px 16px' : '0 16px',
        maxHeight: menuOpen ? '400px' : '0px',
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
      }}>
        {links.map((link, i) => (
          <Link key={link.path} to={link.path}
            onClick={() => setMenuOpen(false)}
            style={{
              display: 'block', padding: '16px 0',
              fontSize: '13px', fontWeight: '600', letterSpacing: '3px',
              textTransform: 'uppercase',
              borderBottom: '1px solid var(--border2)',
              color: pathname === link.path ? 'var(--gold)' : 'var(--light-gray)',
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateX(0)' : 'translateX(-20px)',
              transition: `all 0.3s ease ${i * 0.06}s`,
            }}>
            {link.label}
          </Link>
        ))}
        <button className="btn-gold" style={{
          width: '100%', marginTop: '20px', padding: '16px',
          clipPath: 'none',
          opacity: menuOpen ? 1 : 0,
          transition: 'opacity 0.3s ease 0.3s'
        }}>
          Login
        </button>
      </div>
    </>
  )
}

export default Navbar