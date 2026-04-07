import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import useMediaQuery from '../hooks/useMediaQuery'

const links = [
  { label: 'Home', path: '/' },
  { label: 'Programs', path: '/programs' },
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
  const [notifOpen, setNotifOpen] = useState(false)
  const dropRef = useRef(null)
  const notifRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = e => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false)
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleLogout = async () => {
    setDropOpen(false)
    await logout()
    navigate('/login')
  }

  const getInitials = () => {
    const name = currentUser?.displayName || currentUser?.email || 'U'
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

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

        {/* Logo */}
        <Link to="/" style={{
          fontFamily: 'Bebas Neue',
          fontSize: scrolled ? '22px' : '26px',
          letterSpacing: '5px',
          transition: 'font-size 0.4s ease'
        }}>
          APEX<span style={{ color: 'var(--gold)' }}>GYM</span>
        </Link>

        {/* Desktop Nav Links */}
        {device === 'desktop' && (
          <ul style={{ display: 'flex', gap: '40px', listStyle: 'none' }}>
            {links.map(link => (
              <li key={link.path}>
                <Link to={link.path} style={{
                  fontSize: '11px', fontWeight: '600', letterSpacing: '3px',
                  textTransform: 'uppercase',
                  color: pathname === link.path ? 'var(--gold)' : 'var(--light-gray)',
                  transition: 'color 0.3s',
                }}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {/* Desktop Right Side */}
        {device === 'desktop' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>

            {/* ── Download App Button ── */}
            <a
              href="#"
              onClick={e => e.preventDefault()}
              style={{
                display: 'flex', alignItems: 'center', gap: '7px',
                padding: '8px 16px',
                background: 'linear-gradient(135deg, var(--gold), #c97f10)',
                borderRadius: '6px',
                fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px',
                textTransform: 'uppercase', color: '#0a0f1e',
                textDecoration: 'none',
                transition: 'opacity 0.2s, transform 0.2s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download App
            </a>

            {/* ── Notification Bell ── */}
            <div ref={notifRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setNotifOpen(d => !d)}
                style={{
                  background: 'none',
                  border: `1px solid ${notifOpen ? 'var(--gold)' : 'var(--border)'}`,
                  borderRadius: '8px', cursor: 'pointer',
                  width: '36px', height: '36px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: notifOpen ? 'var(--gold)' : 'var(--light-gray)',
                  transition: 'all 0.2s',
                  position: 'relative',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)' }}
                onMouseLeave={e => {
                  if (!notifOpen) {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.color = 'var(--light-gray)'
                  }
                }}
                aria-label="Notifications"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                {/* Gold dot indicator */}
                <span style={{
                  position: 'absolute', top: '7px', right: '7px',
                  width: '6px', height: '6px', borderRadius: '50%',
                  background: 'var(--gold)',
                  border: '1.5px solid rgba(6,9,18,1)',
                }} />
              </button>

              {/* Notif Dropdown */}
              <div style={{
                position: 'absolute', top: 'calc(100% + 10px)', right: 0,
                background: 'rgba(12,18,35,0.98)', backdropFilter: 'blur(20px)',
                border: '1px solid var(--border)', borderRadius: '12px',
                padding: '20px 16px', minWidth: '240px',
                boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
                opacity: notifOpen ? 1 : 0,
                pointerEvents: notifOpen ? 'all' : 'none',
                transform: notifOpen ? 'translateY(0)' : 'translateY(-8px)',
                transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
                zIndex: 1001,
                textAlign: 'center',
              }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.4"
                  style={{ marginBottom: '10px', opacity: 0.5 }}>
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--white)', marginBottom: '6px' }}>
                  Coming Soon
                </p>
                <p style={{ fontSize: '10px', color: 'var(--gray)', letterSpacing: '0.4px', lineHeight: 1.7 }}>
                  Live alerts will be available<br />once the app is connected.
                </p>
              </div>
            </div>

            {/* ── Auth Area ── */}
            {currentUser
              ? <div ref={dropRef} style={{ position: 'relative' }}>
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

                  {/* Dropdown — same as original */}
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
              : <Link to="/login" className="btn-outline-gold" style={{
                  padding: scrolled ? '8px 22px' : '10px 28px',
                  fontSize: '11px',
                  transition: 'padding 0.4s ease'
                }}>
                  Login
                </Link>
            }
          </div>
        )}

        {/* Mobile/Tablet Right Side */}
        {device !== 'desktop' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

            {/* Mobile Bell */}
            <button
              onClick={() => setNotifOpen(d => !d)}
              style={{
                background: 'none', border: '1px solid var(--border)',
                borderRadius: '8px', cursor: 'pointer',
                width: '34px', height: '34px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--light-gray)', position: 'relative',
              }}
              aria-label="Notifications"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span style={{
                position: 'absolute', top: '7px', right: '7px',
                width: '5px', height: '5px', borderRadius: '50%',
                background: 'var(--gold)', border: '1.5px solid rgba(6,9,18,1)',
              }} />
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '5px', padding: '4px' }}
            >
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
          </div>
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

        {/* Mobile Download App */}
        <a
          href="#"
          onClick={e => { e.preventDefault(); setMenuOpen(false) }}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            marginTop: '16px', padding: '14px',
            background: 'linear-gradient(135deg, var(--gold), #c97f10)',
            borderRadius: '6px',
            fontSize: '12px', fontWeight: 700, letterSpacing: '2px',
            textTransform: 'uppercase', color: '#0a0f1e',
            textDecoration: 'none',
            opacity: menuOpen ? 1 : 0,
            transition: 'opacity 0.3s ease 0.25s',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download App
        </a>

        {currentUser
          ? <button onClick={() => { setMenuOpen(false); handleLogout() }} style={{
              width: '100%', marginTop: '10px', padding: '16px',
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
              width: '100%', marginTop: '10px', padding: '16px',
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
