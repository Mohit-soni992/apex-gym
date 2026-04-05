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
          {[['/', 'Home'], ['/programs', 'Programs'], ['/schedule', 'Schedule'], ['/contact', 'Contact']].map(([path, label]) => (
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
            {[['📸', 'Instagram'], ['▶️', 'YouTube'], ['👥', 'Facebook']].map(([icon, label]) => (
              <a key={label} href="#" style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                fontSize: '13px', color: 'var(--gray)', fontWeight: '300'
              }}>
                <span>{icon}</span>{label}
              </a>
            ))}
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