import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../config/firebase'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [focused, setFocused] = useState(false)
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const canvasRef = useRef(null)

  /* ---------- particle canvas ---------- */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let w = canvas.width = window.innerWidth
    let h = canvas.height = window.innerHeight
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.3, alpha: Math.random() * 0.4 + 0.1,
    }))
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(245,166,35,${p.alpha})`; ctx.fill()
      })
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(245,166,35,${0.06 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5; ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(draw)
    }
    draw()
    const onResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize) }
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    if (!email) { setError('Please enter your email address.'); return }
    setLoading(true)
    setError('')
    try {
      await sendPasswordResetEmail(auth, email)
      setSent(true)
    } catch (err) {
      setError('Could not send reset email. Please check the address and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page-wrap" style={{ justifyContent: 'center', alignItems: 'center' }}>

      {/* BG canvas */}
      <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(245,166,35,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '420px', padding: '24px 20px' }}>
        <div className="login-card">

          {/* Icon */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(245,166,35,0.15), rgba(245,166,35,0.04))',
              border: '1px solid rgba(245,166,35,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px',
              boxShadow: '0 0 32px rgba(245,166,35,0.12)',
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m2 7 10 7 10-7"/>
              </svg>
            </div>

            <Link to="/" style={{ fontFamily: 'Bebas Neue', fontSize: '22px', letterSpacing: '6px', display: 'inline-block' }}>
              APEX<span style={{ color: 'var(--gold)' }}>GYM</span>
            </Link>
          </div>

          {!sent ? (
            /* ── Send Form ── */
            <>
              <h1 style={{ fontFamily: 'Bebas Neue', fontSize: '30px', letterSpacing: '3px', lineHeight: 1, marginBottom: '6px', textAlign: 'center' }}>
                Reset <span style={{ color: 'var(--gold)' }}>Password</span>
              </h1>
              <p style={{ fontSize: '11px', color: 'var(--light-gray)', letterSpacing: '0.4px', marginBottom: '24px', textAlign: 'center', lineHeight: 1.7 }}>
                Enter your email and we'll send you a link to reset your password.
              </p>

              {error && (
                <div className="login-error">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12" y2="16.01"/></svg>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div style={{ marginBottom: '20px' }}>
                  <label className="login-label" htmlFor="reset-email">Email Address</label>
                  <div className={`login-input-wrap login-input-wrap--sm ${focused ? 'focused' : ''}`}>
                    <span className="login-icon">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>
                    </span>
                    <input
                      id="reset-email" type="email" autoComplete="email"
                      placeholder="your@email.com" value={email}
                      onChange={e => { setEmail(e.target.value); setError('') }}
                      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
                      className="login-input"
                    />
                  </div>
                </div>

                <button id="reset-submit" type="submit" className="login-btn login-btn--sm" disabled={loading}>
                  {loading
                    ? <span className="login-spinner" />
                    : <>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                        </svg>
                        Send Reset Link
                      </>
                  }
                </button>
              </form>
            </>
          ) : (
            /* ── Success State ── */
            <div style={{ textAlign: 'center', padding: '8px 0' }}>
              {/* Success icon with pulse ring */}
              <div style={{ position: 'relative', display: 'inline-flex', marginBottom: '24px' }}>
                <div style={{
                  position: 'absolute', inset: '-12px',
                  borderRadius: '50%',
                  border: '1px solid rgba(16,185,129,0.3)',
                  animation: 'fp-pulse 2s ease-out infinite',
                }} />
                <div style={{
                  width: '72px', height: '72px', borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(16,185,129,0.15), rgba(16,185,129,0.04))',
                  border: '1px solid rgba(16,185,129,0.35)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 0 40px rgba(16,185,129,0.15)',
                }}>
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
              </div>

              <h2 style={{ fontFamily: 'Bebas Neue', fontSize: '28px', letterSpacing: '3px', marginBottom: '10px' }}>
                Check Your <span style={{ color: '#10B981' }}>Inbox</span>
              </h2>
              <p style={{ fontSize: '12px', color: 'var(--light-gray)', lineHeight: 1.8, marginBottom: '8px' }}>
                We sent a password reset link to
              </p>
              <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.5px', marginBottom: '20px', wordBreak: 'break-all' }}>
                {email}
              </p>

              {/* Instruction steps */}
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: '6px', padding: '16px', marginBottom: '24px', textAlign: 'left' }}>
                {[
                  ['1', 'Open the email from Firebase (noreply@...firebaseapp.com)'],
                  ['2', 'Click the "Reset password" link inside'],
                  ['3', 'Set your new password and sign in'],
                ].map(([num, text]) => (
                  <div key={num} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: num !== '3' ? '12px' : 0 }}>
                    <div style={{
                      width: '20px', height: '20px', borderRadius: '50%',
                      background: 'rgba(245,166,35,0.12)', border: '1px solid rgba(245,166,35,0.25)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '9px', fontWeight: 800, color: 'var(--gold)', flexShrink: 0,
                    }}>
                      {num}
                    </div>
                    <p style={{ fontSize: '11px', color: 'var(--light-gray)', lineHeight: 1.6, marginTop: '2px' }}>{text}</p>
                  </div>
                ))}
              </div>

              {/* Spam notice */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                background: 'rgba(251,188,5,0.06)', border: '1px solid rgba(251,188,5,0.2)',
                borderRadius: '4px', padding: '10px 14px', marginBottom: '24px',
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FBBC05" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12" y2="16.01"/></svg>
                <p style={{ fontSize: '10px', color: '#FBBC05', letterSpacing: '0.3px' }}>
                  Can't find it? Check your <strong>Spam / Junk</strong> folder.
                </p>
              </div>

              <button
                onClick={() => { setSent(false); setEmail('') }}
                style={{ background: 'none', border: 'none', color: 'var(--gold)', fontSize: '11px', fontWeight: 600, letterSpacing: '1px', cursor: 'none', marginBottom: '4px' }}
              >
                ← Resend with different email
              </button>
            </div>
          )}

          {/* Back to login */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '20px 0 0' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            <Link to="/login" style={{ fontSize: '10px', color: 'var(--light-gray)', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, whiteSpace: 'nowrap' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
              Back to Login
            </Link>
            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fp-pulse {
          0%   { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.8); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

export default ForgotPassword
