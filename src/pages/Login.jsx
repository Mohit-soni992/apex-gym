import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [focused, setFocused] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()
  const canvasRef = useRef(null)

  /* ---------- animated particle canvas ---------- */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let w = canvas.width = window.innerWidth
    let h = canvas.height = window.innerHeight

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.4 + 0.1,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(245,166,35,${p.alpha})`
        ctx.fill()
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
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(draw)
    }
    draw()

    const onResize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize) }
  }, [])

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.email || !form.password) { setError('Please fill in all fields.'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1600))
    setLoading(false)
    setSuccess(true)
    setTimeout(() => navigate('/'), 1200)
  }

  return (
    <div className="login-page-wrap">

      {/* BG canvas */}
      <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }} />

      {/* radial glow */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(245,166,35,0.06) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      {/* ── LEFT PANEL ── branding / stats */}
      <div className="login-left-panel">
        <div className="login-left-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
            <div style={{ width: '32px', height: '1px', background: 'var(--gold)' }} />
            <span style={{ fontSize: '9px', letterSpacing: '4px', color: 'var(--gold)', fontWeight: 700, textTransform: 'uppercase' }}>Est. 2019</span>
          </div>

          <h2 className="login-panel-title">
            Forge Your<br /><span style={{ color: 'var(--gold)' }}>Legacy</span>
          </h2>
          <p className="login-panel-sub">
            Join thousands of athletes who train smarter, push harder, and never settle for less than their best.
          </p>

          <div className="login-stats-row">
            {[['2,400+', 'Active Members'], ['48', 'Expert Trainers'], ['12', 'Programs']].map(([val, label]) => (
              <div key={label} className="login-stat-item">
                <span className="login-stat-val">{val}</span>
                <span className="login-stat-label">{label}</span>
              </div>
            ))}
          </div>

          <div className="login-deco-lines">
            {[0, 1, 2, 3].map(i => (
              <div key={i} className="login-deco-line" style={{ animationDelay: `${i * 0.8}s` }} />
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── form */}
      <div className="login-right-panel">
        <div className="login-card">

          {/* logo */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <Link to="/" style={{ fontFamily: 'Bebas Neue', fontSize: '26px', letterSpacing: '6px', display: 'inline-block' }}>
              APEX<span style={{ color: 'var(--gold)' }}>GYM</span>
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center', marginTop: '6px' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
              <span style={{ fontSize: '8px', letterSpacing: '4px', color: 'var(--gold)', fontWeight: 700, textTransform: 'uppercase' }}>Member Login</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            </div>
          </div>

          {/* heading */}
          <h1 style={{ fontFamily: 'Bebas Neue', fontSize: '34px', letterSpacing: '3px', lineHeight: 1, marginBottom: '4px' }}>
            Welcome <span style={{ color: 'var(--gold)' }}>Back</span>
          </h1>
          <p style={{ fontSize: '11px', color: 'var(--light-gray)', letterSpacing: '0.5px', marginBottom: '20px' }}>
            Sign in to access your fitness dashboard
          </p>

          {error && (
            <div className="login-error">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12" y2="16.01"/></svg>
              {error}
            </div>
          )}

          {success && (
            <div className="login-success">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              Login successful! Redirecting…
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* email */}
            <div style={{ marginBottom: '14px' }}>
              <label className="login-label" htmlFor="login-email">Email Address</label>
              <div className={`login-input-wrap login-input-wrap--sm ${focused === 'email' ? 'focused' : ''}`}>
                <span className="login-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>
                </span>
                <input
                  id="login-email" name="email" type="email" autoComplete="email"
                  placeholder="your@email.com" value={form.email}
                  onChange={handleChange}
                  onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                  className="login-input"
                />
              </div>
            </div>

            {/* password */}
            <div style={{ marginBottom: '8px' }}>
              <label className="login-label" htmlFor="login-password">Password</label>
              <div className={`login-input-wrap login-input-wrap--sm ${focused === 'password' ? 'focused' : ''}`}>
                <span className="login-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </span>
                <input
                  id="login-password" name="password" type={showPass ? 'text' : 'password'}
                  autoComplete="current-password" placeholder="••••••••"
                  value={form.password} onChange={handleChange}
                  onFocus={() => setFocused('password')} onBlur={() => setFocused(null)}
                  className="login-input"
                />
                <button type="button" className="login-eye" onClick={() => setShowPass(s => !s)} tabIndex={-1} aria-label="Toggle password">
                  {showPass
                    ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17.94 17.94A10.07 10.07 0 0112 20C7 20 2.73 16.39 1 12a18.06 18.06 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c5 0 9.27 3.61 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
            </div>

            {/* forgot */}
            <div style={{ textAlign: 'right', marginBottom: '18px' }}>
              <a href="#" style={{ fontSize: '10px', color: 'var(--gold)', letterSpacing: '1px', fontWeight: 600 }}>
                Forgot Password?
              </a>
            </div>

            <button id="login-submit" type="submit" className="login-btn login-btn--sm" disabled={loading || success}>
              {loading ? <span className="login-spinner" />
                : success ? <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>&nbsp;Done</>
                : 'Sign In'}
            </button>
          </form>

          {/* divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '16px 0' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            <span style={{ fontSize: '9px', color: 'var(--gray)', letterSpacing: '2px' }}>OR</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
          </div>

          {/* social */}
          <button className="login-social-btn login-social-btn--sm" aria-label="Login with Google">
            <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115z"/><path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.777L1.24 17.35C3.198 21.302 7.27 24 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987z"/><path fill="#4A90D9" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21z"/><path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067z"/></svg>
            Continue with Google
          </button>

          <p style={{ textAlign: 'center', marginTop: '14px', fontSize: '11px', color: 'var(--light-gray)' }}>
            Not a member yet?{' '}
            <Link to="/signup" style={{ color: 'var(--gold)', fontWeight: 700, letterSpacing: '1px' }}>
              Join Now →
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
