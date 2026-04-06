import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithPopup, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, googleProvider } from '../config/firebase'

const PLANS = ['Basic', 'Pro', 'Elite']

function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', plan: 'Pro' })
  const [showPass, setShowPass] = useState(false)
  const [focused, setFocused] = useState(null)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()
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

  const handleChange = e => { setForm(f => ({ ...f, [e.target.name]: e.target.value })); setError('') }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password || !form.confirm) { setError('Please fill in all fields.'); return }
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return }
    setLoading(true)
    setError('')
    try {
      const { user } = await createUserWithEmailAndPassword(auth, form.email, form.password)
      // Save display name to Firebase profile
      await updateProfile(user, { displayName: form.name })
      setSuccess(true)
      setTimeout(() => navigate('/'), 1200)
    } catch (err) {
      const msg = {
        'auth/email-already-in-use': 'An account with this email already exists. Try logging in.',
        'auth/invalid-email': 'Please enter a valid email address.',
        'auth/weak-password': 'Password is too weak. Use at least 6 characters.',
      }[err.code] || 'Sign up failed. Please try again.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignup = async () => {
    setGoogleLoading(true)
    setError('')
    try {
      await signInWithPopup(auth, googleProvider)
      setSuccess(true)
      setTimeout(() => navigate('/'), 1000)
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user') {
        setError(err.message || 'Google sign-up failed. Please try again.')
      }
    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <div className="login-page-wrap">
      <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(245,166,35,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* ── LEFT PANEL ── */}
      <div className="login-left-panel">
        <div className="login-left-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
            <div style={{ width: '32px', height: '1px', background: 'var(--gold)' }} />
            <span style={{ fontSize: '9px', letterSpacing: '4px', color: 'var(--gold)', fontWeight: 700, textTransform: 'uppercase' }}>Start Today</span>
          </div>

          <h2 className="login-panel-title">
            Begin Your<br /><span style={{ color: 'var(--gold)' }}>Journey</span>
          </h2>
          <p className="login-panel-sub">
            Take the first step toward the best version of yourself. Join APEX GYM and unlock elite training, expert coaching, and a community that pushes you further.
          </p>

          <div className="login-stats-row">
            {[['Free', 'First Month'], ['24/7', 'Gym Access'], ['100%', 'Satisfaction']].map(([val, label]) => (
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
          <div style={{ textAlign: 'center', marginBottom: '18px' }}>
            <Link to="/" style={{ fontFamily: 'Bebas Neue', fontSize: '26px', letterSpacing: '6px', display: 'inline-block' }}>
              APEX<span style={{ color: 'var(--gold)' }}>GYM</span>
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center', marginTop: '6px' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
              <span style={{ fontSize: '8px', letterSpacing: '4px', color: 'var(--gold)', fontWeight: 700, textTransform: 'uppercase' }}>Create Account</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            </div>
          </div>

          <h1 style={{ fontFamily: 'Bebas Neue', fontSize: '32px', letterSpacing: '3px', lineHeight: 1, marginBottom: '4px' }}>
            Join <span style={{ color: 'var(--gold)' }}>APEX</span>
          </h1>
          <p style={{ fontSize: '11px', color: 'var(--light-gray)', letterSpacing: '0.5px', marginBottom: '18px' }}>
            Create your free account and start training today
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
              Account created! Redirecting to login…
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>

            {/* Full Name */}
            <div style={{ marginBottom: '12px' }}>
              <label className="login-label" htmlFor="signup-name">Full Name</label>
              <div className={`login-input-wrap login-input-wrap--sm ${focused === 'name' ? 'focused' : ''}`}>
                <span className="login-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </span>
                <input id="signup-name" name="name" type="text" autoComplete="name"
                  placeholder="Username" value={form.name} onChange={handleChange}
                  onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                  className="login-input" />
              </div>
            </div>

            {/* Email */}
            <div style={{ marginBottom: '12px' }}>
              <label className="login-label" htmlFor="signup-email">Email Address</label>
              <div className={`login-input-wrap login-input-wrap--sm ${focused === 'email' ? 'focused' : ''}`}>
                <span className="login-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>
                </span>
                <input id="signup-email" name="email" type="email" autoComplete="email"
                  placeholder="your@email.com" value={form.email} onChange={handleChange}
                  onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                  className="login-input" />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: '12px' }}>
              <label className="login-label" htmlFor="signup-password">Password</label>
              <div className={`login-input-wrap login-input-wrap--sm ${focused === 'password' ? 'focused' : ''}`}>
                <span className="login-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </span>
                <input id="signup-password" name="password" type={showPass ? 'text' : 'password'}
                  placeholder="Min. 6 characters" value={form.password} onChange={handleChange}
                  onFocus={() => setFocused('password')} onBlur={() => setFocused(null)}
                  className="login-input" />
                <button type="button" className="login-eye" onClick={() => setShowPass(s => !s)} tabIndex={-1}>
                  {showPass
                    ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17.94 17.94A10.07 10.07 0 0112 20C7 20 2.73 16.39 1 12a18.06 18.06 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c5 0 9.27 3.61 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div style={{ marginBottom: '14px' }}>
              <label className="login-label" htmlFor="signup-confirm">Confirm Password</label>
              <div className={`login-input-wrap login-input-wrap--sm ${focused === 'confirm' ? 'focused' : ''}`}>
                <span className="login-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 12l2 2 4-4"/><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </span>
                <input id="signup-confirm" name="confirm" type={showPass ? 'text' : 'password'}
                  placeholder="Repeat password" value={form.confirm} onChange={handleChange}
                  onFocus={() => setFocused('confirm')} onBlur={() => setFocused(null)}
                  className="login-input" />
              </div>
            </div>

            {/* Plan selector */}
            <div style={{ marginBottom: '16px' }}>
              <label className="login-label">Membership Plan</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {PLANS.map(plan => (
                  <button key={plan} type="button"
                    onClick={() => setForm(f => ({ ...f, plan }))}
                    className={`signup-plan-btn ${form.plan === plan ? 'active' : ''}`}>
                    {plan}
                  </button>
                ))}
              </div>
            </div>

            <button id="signup-submit" type="submit" className="login-btn login-btn--sm" disabled={loading || success}>
              {loading ? <span className="login-spinner" />
                : success ? <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>&nbsp;Done</>
                : 'Create Account'}
            </button>
          </form>

          {/* divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '16px 0' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            <span style={{ fontSize: '9px', color: 'var(--gray)', letterSpacing: '2px' }}>OR</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
          </div>

          {/* Google sign-up */}
          <button
            id="signup-google-btn"
            className="login-social-btn login-social-btn--sm"
            aria-label="Sign up with Google"
            onClick={handleGoogleSignup}
            disabled={googleLoading || loading || success}
            type="button"
          >
            {googleLoading
              ? <span className="login-spinner" style={{ borderTopColor: '#4285F4' }} />
              : <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115z"/><path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.777L1.24 17.35C3.198 21.302 7.27 24 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987z"/><path fill="#4A90D9" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21z"/><path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067z"/></svg>
            }
            {googleLoading ? 'Signing up…' : 'Sign up with Google'}
          </button>

          <p style={{ textAlign: 'center', marginTop: '14px', fontSize: '11px', color: 'var(--light-gray)' }}>
            Already a member?{' '}
            <Link to="/login" style={{ color: 'var(--gold)', fontWeight: 700, letterSpacing: '1px' }}>
              Sign In →
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
