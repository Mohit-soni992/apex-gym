import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
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
  const navigate = useNavigate()
  const device = useMediaQuery()
  const { currentUser, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dropOpen, setDropOpen] = useState(false)
  const dropRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = e => { if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleLogout = async () => {
    setDropOpen(false)
    await logout()
    navigate('/login')
  }

  // Get initials for avatar fallback
  const getInitials = () => {
    const name = currentUser?.displayName || currentUser?.email || 'U'
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  // User avatar — Google photo or colored initials circle
  const UserAvatar = ({ size = 34 }) => (
    currentUser?.photoURL
      ? <img src={currentUser.photoURL} alt="avatar"
          style={{ width: size, height: size, borderRadius: '50%', border: '2px solid var(--gold)', objectFit: 'cover' }} />
      : <div style={{
          width: size, height: size, borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--gold), #c97f10)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: size * 0.35 + 'px', fontWeight: 700, color: '#0a0f1e',
          border: '2px solid var(--gold)', flexShrink: 0,
        }}>
          {getInitials()}
        </div>
  )

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

        {/* Desktop — Auth area */}
        {device === 'desktop' && (
          currentUser
            ? /* ── Logged-in: avatar + dropdown ── */
              <div ref={dropRef} style={{ position: 'relative' }}>
                <button
                  id="navbar-avatar-btn"
                  onClick={() => setDropOpen(d => !d)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '4px 8px', borderRadius: '24px',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(245,166,35,0.08)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}
                >
                  <UserAvatar size={32} />
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--light-gray)', maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {currentUser.displayName || currentUser.email?.split('@')[0]}
                  </span>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2.5"
                    style={{ transform: dropOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {/* Dropdown */}
                <div style={{
                  position: 'absolute', top: 'calc(100% + 10px)', right: 0,
                  background: 'rgba(12,18,35,0.98)', backdropFilter: 'blur(20px)',
                  border: '1px solid var(--border)', borderRadius: '12px',
                  padding: '8px', minWidth: '210px',
                  boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
                  opacity: dropOpen ? 1 : 0,
                  pointerEvents: dropOpen ? 'all' : 'none',
                  transform: dropOpen ? 'translateY(0)' : 'translateY(-8px)',
                  transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
                  zIndex: 1001,
                }}>
                  {/* User info */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px 14px', borderBottom: '1px solid var(--border)' }}>
                    <UserAvatar size={38} />
                    <div style={{ overflow: 'hidden' }}>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--white)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {currentUser.displayName || 'Member'}
                      </div>
                      <div style={{ fontSize: '10px', color: 'var(--gray)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {currentUser.email}
                      </div>
                    </div>
                  </div>

                  {/* Menu items */}
                  {[
                    { icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', label: 'Home', to: '/' },
                    { icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', label: 'My Programs', to: '/programs' },
                    { icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', label: 'Schedule', to: '/schedule' },
                  ].map(item => (
                    <Link key={item.label} to={item.to} onClick={() => setDropOpen(false)}
                      style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '8px', color: 'var(--light-gray)', fontSize: '12px', fontWeight: 500, transition: 'all 0.15s', textDecoration: 'none' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(245,166,35,0.08)'; e.currentTarget.style.color = 'var(--white)' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--light-gray)' }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d={item.icon} /></svg>
                      {item.label}
                    </Link>
                  ))}

                  <div style={{ height: '1px', background: 'var(--border)', margin: '6px 0' }} />

                  {/* Logout */}
                  <button onClick={handleLogout}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '8px', width: '100%', background: 'none', border: 'none', cursor: 'pointer', color: '#ff6b6b', fontSize: '12px', fontWeight: 600, transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,107,107,0.1)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'none'}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
                    </svg>
                    Sign Out
                  </button>
                </div>
              </div>
            : /* ── Logged-out: Login button ── */
              <Link to="/login" className="btn-outline-gold" style={{
                padding: scrolled ? '8px 22px' : '10px 28px',
                fontSize: '11px',
                transition: 'padding 0.4s ease'
              }}>
                Login
              </Link>
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
        maxHeight: menuOpen ? '500px' : '0px',
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
      }}>
        {/* Mobile user info when logged in */}
        {currentUser && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 0 16px', borderBottom: '1px solid var(--border)', marginBottom: '8px', opacity: menuOpen ? 1 : 0, transition: 'opacity 0.3s' }}>
            <UserAvatar size={40} />
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--white)' }}>{currentUser.displayName || 'Member'}</div>
              <div style={{ fontSize: '10px', color: 'var(--gray)' }}>{currentUser.email}</div>
            </div>
          </div>
        )}

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

        {currentUser
          ? <button onClick={() => { setMenuOpen(false); handleLogout() }} style={{
              width: '100%', marginTop: '20px', padding: '16px',
              background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.3)',
              borderRadius: '6px', color: '#ff6b6b', cursor: 'pointer',
              fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase',
              opacity: menuOpen ? 1 : 0, transition: 'opacity 0.3s ease 0.3s',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
              </svg>
              Sign Out
            </button>
          : <Link to="/login" className="btn-gold" onClick={() => setMenuOpen(false)} style={{
              width: '100%', marginTop: '20px', padding: '16px',
              clipPath: 'none', display: 'block', textAlign: 'center',
              opacity: menuOpen ? 1 : 0,
              transition: 'opacity 0.3s ease 0.3s'
            }}>
              Login
            </Link>
        }
      </div>
    </>
  )
}

export default Navbar