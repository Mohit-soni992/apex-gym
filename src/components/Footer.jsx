import { Link } from 'react-router-dom'
import gymConfig from '../config/gymConfig'

function Footer() {
  return (
    <footer style={{
      background: '#050505', borderTop: '1px solid var(--border)', padding: '72px 48px 0'
    }}>
      <div style={{
        display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr',
        gap: '48px', maxWidth: '1280px', margin: '0 auto', paddingBottom: '56px'
      }}>
        <div>
          <div style={{ fontFamily: 'Bebas Neue', fontSize: '32px', letterSpacing: '4px', marginBottom: '8px' }}>
            {gymConfig.name.split(' ')[0]}
            <span style={{ color: 'var(--primary)' }}> {gymConfig.name.split(' ')[1]}</span>
          </div>
          <div style={{ fontFamily: 'Barlow Condensed', fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '12px' }}>
            {gymConfig.tagline}
          </div>
          <p style={{ fontSize: '14px', color: 'var(--gray)', lineHeight: '1.7', maxWidth: '280px' }}>
            {gymConfig.description}
          </p>
        </div>

        <div>
          <div style={{ fontFamily: 'Barlow Condensed', fontSize: '12px', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '24px' }}>Quick Links</div>
          {[['/', 'Home'], ['/programs', 'Programs'], ['/schedule', 'Schedule'], ['/contact', 'Contact']].map(([path, label]) => (
            <div key={path} style={{ marginBottom: '12px' }}>
              <Link to={path} style={{ fontSize: '14px', color: 'var(--gray)' }}>{label}</Link>
            </div>
          ))}
        </div>

        <div>
          <div style={{ fontFamily: 'Barlow Condensed', fontSize: '12px', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '24px' }}>Programs</div>
          {['Weight Training', 'Yoga', 'CrossFit', 'Cardio'].map(p => (
            <div key={p} style={{ marginBottom: '12px', fontSize: '14px', color: 'var(--gray)' }}>{p}</div>
          ))}
        </div>

        <div>
          <div style={{ fontFamily: 'Barlow Condensed', fontSize: '12px', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '24px' }}>Follow Us</div>
          {[['📸', 'Instagram', gymConfig.social.instagram], ['▶️', 'YouTube', gymConfig.social.youtube], ['👥', 'Facebook', gymConfig.social.facebook]].map(([icon, label, href]) => (
            <a key={label} href={href} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--gray)', marginBottom: '12px' }}>
              <span>{icon}</span>{label}
            </a>
          ))}
        </div>
      </div>

      <div style={{
        borderTop: '1px solid var(--border)', padding: '24px 0',
        display: 'flex', justifyContent: 'space-between',
        maxWidth: '1280px', margin: '0 auto'
      }}>
        <span style={{ fontFamily: 'Barlow Condensed', fontSize: '12px', letterSpacing: '2px', color: 'var(--gray)', textTransform: 'uppercase' }}>
          © 2025 {gymConfig.name}. All rights reserved.
        </span>
      </div>
    </footer>
  )
}

export default Footer