import { Link } from 'react-router-dom'
import gymConfig from '../config/gymConfig'
import useMediaQuery from '../hooks/useMediaQuery'

function Footer() {
  const device = useMediaQuery()

  return (
    <footer style={{
      background: '#060912',
      borderTop: '1px solid var(--border)',
      padding: device === 'mobile' ? '48px 16px 0' : device === 'tablet' ? '60px 32px 0' : '80px 60px 0',
      overflowX: 'hidden',
      width: '100%'
    }}>
      <div style={{
        maxWidth: '1280px', margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: device === 'mobile' ? '1fr 1fr' : device === 'tablet' ? '1fr 1fr' : '2fr 1fr 1fr 1fr',
        gap: device === 'mobile' ? '32px 20px' : '40px',
        paddingBottom: '48px'
      }}>

        {/* Brand — full width on mobile */}
        <div style={{ gridColumn: device === 'mobile' ? 'span 2' : 'span 1' }}>
          <div style={{
            fontFamily: 'Bebas Neue', fontSize: '28px',
            letterSpacing: '4px', marginBottom: '8px'
          }}>
            APEX<span style={{ color: 'var(--gold)' }}>GYM</span>
          </div>
          <div style={{
            fontSize: '9px', fontWeight: '700', letterSpacing: '3px',
            textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '12px'
          }}>
            Forge Your Legacy
          </div>
          <p style={{
            fontSize: '13px', color: 'var(--gray)',
            lineHeight: '1.7', fontWeight: '300'
          }}>
            A premium fitness ecosystem built to transform your body and elevate your life.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <div style={{
            fontSize: '9px', fontWeight: '700', letterSpacing: '3px',
            textTransform: 'uppercase', marginBottom: '20px', color: 'var(--off-white)'
          }}>Quick Links</div>
          {[['/', 'Home'], ['/programs', 'Programs'], ['/trainers', 'Trainers'], ['/contact', 'Contact']].map(([path, label]) => (
            <div key={path} style={{ marginBottom: '12px' }}>
              <Link to={path} style={{ fontSize: '13px', color: 'var(--gray)', fontWeight: '300' }}>
                {label}
              </Link>
            </div>
          ))}
        </div>

        {/* Programs */}
        <div>
          <div style={{
            fontSize: '9px', fontWeight: '700', letterSpacing: '3px',
            textTransform: 'uppercase', marginBottom: '20px', color: 'var(--off-white)'
          }}>Programs</div>
          {['Weight Training', 'Yoga', 'CrossFit', 'Cardio'].map(p => (
            <div key={p} style={{ marginBottom: '12px', fontSize: '13px', color: 'var(--gray)', fontWeight: '300' }}>{p}</div>
          ))}
        </div>

        {/* Follow Us */}
        <div style={{ gridColumn: device === 'mobile' ? 'span 2' : 'span 1' }}>
          <div style={{
            fontSize: '9px', fontWeight: '700', letterSpacing: '3px',
            textTransform: 'uppercase', marginBottom: '20px', color: 'var(--off-white)'
          }}>Follow Us</div>
          <div style={{ display: 'flex', flexDirection: device === 'mobile' ? 'row' : 'column', gap: '12px', flexWrap: 'wrap' }}>
            {/* Instagram */}
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--gray)', fontWeight: '300', transition: 'color 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--off-white)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--gray)'}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="ig-grad" cx="30%" cy="107%" r="150%">
                    <stop offset="0%" stopColor="#fdf497"/>
                    <stop offset="5%" stopColor="#fdf497"/>
                    <stop offset="45%" stopColor="#fd5949"/>
                    <stop offset="60%" stopColor="#d6249f"/>
                    <stop offset="90%" stopColor="#285AEB"/>
                  </radialGradient>
                </defs>
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="url(#ig-grad)"/>
                <circle cx="12" cy="12" r="4.5" fill="none" stroke="white" strokeWidth="1.8"/>
                <circle cx="17.5" cy="6.5" r="1.2" fill="white"/>
              </svg>
              Instagram
            </a>

            {/* YouTube */}
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--gray)', fontWeight: '300', transition: 'color 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--off-white)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--gray)'}>
              <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="#FF0000" d="M23.5 6.2s-.3-1.9-1.1-2.7c-1-.9-2.2-1-2.7-1C16.8 2.3 12 2.3 12 2.3s-4.8 0-7.7.2c-.5.1-1.7.1-2.7 1C.8 4.3.5 6.2.5 6.2S.2 8.4.2 10.6v2.1c0 2.2.3 4.4.3 4.4s.3 1.9 1.1 2.7c1 .9 2.4.9 3 1 2.2.2 9.4.2 9.4.2s4.8 0 7.7-.2c.5-.1 1.7-.1 2.7-1 .8-.8 1.1-2.7 1.1-2.7s.3-2.2.3-4.4v-2.1c0-2.2-.3-4.4-.3-4.4z"/>
                <polygon fill="white" points="9.7,15.5 9.7,8.5 16.3,12"/>
              </svg>
              YouTube
            </a>

            {/* Facebook */}
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--gray)', fontWeight: '300', transition: 'color 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--off-white)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--gray)'}>
              <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" rx="4" fill="#1877F2"/>
                <path fill="white" d="M16.7 15.5l.5-3H14v-2c0-.8.4-1.6 1.7-1.6H17V6.2s-1.2-.2-2.3-.2c-2.3 0-3.9 1.4-3.9 4v2.4H8.4v3H10.8V23c.5.1 1 .1 1.5.1s1.1 0 1.6-.1v-7.5h2.8z"/>
              </svg>
              Facebook
            </a>
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: '1px solid var(--border2)',
        padding: '20px 0',
        maxWidth: '1280px', margin: '0 auto',
        display: 'flex',
        flexDirection: device === 'mobile' ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: device === 'mobile' ? 'center' : 'center',
        gap: '8px',
        textAlign: 'center'
      }}>
        <span style={{
          fontSize: '10px', fontWeight: '500', letterSpacing: '2px',
          textTransform: 'uppercase', color: 'var(--gray)'
        }}>
          © 2025 Apex Gym. All rights reserved.
        </span>
        <span style={{
          fontSize: '10px', fontWeight: '500', letterSpacing: '2px',
          textTransform: 'uppercase', color: 'var(--gray)'
        }}>
          Built for Champions
        </span>
      </div>
    </footer>
  )
}

export default Footer