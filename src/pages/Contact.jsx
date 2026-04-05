import gymConfig from '../config/gymConfig'
import { useForm } from '@formspree/react'

function Contact() {
  const [state, handleSubmit] = useForm('xgoprwez')

  const inputStyle = {
    width: '100%', background: 'var(--card)', border: '1px solid var(--border)',
    color: 'var(--white)', fontFamily: 'Barlow, sans-serif', fontSize: '14px',
    padding: '14px 16px', outline: 'none', marginBottom: '16px', display: 'block'
  }

  return (
    <div style={{ paddingTop: '70px', minHeight: '100vh' }}>
      <section style={{ padding: '80px 48px', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ marginBottom: '56px' }}>
          <div style={{ fontFamily: 'Barlow Condensed', fontSize: '12px', letterSpacing: '5px', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '16px' }}>Get In Touch</div>
          <h1 style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(48px, 8vw, 96px)', letterSpacing: '3px' }}>CONTACT US</h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px' }}>
          <div>
            {[
              { icon: '📞', label: 'Phone', value: gymConfig.contact.phone },
              { icon: '✉️', label: 'Email', value: gymConfig.contact.email },
              { icon: '📍', label: 'Address', value: gymConfig.contact.address },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '28px' }}>
                <div style={{ width: '44px', height: '44px', background: 'rgba(0,212,200,0.1)', border: '1px solid rgba(0,212,200,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <div style={{ fontFamily: 'Barlow Condensed', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gray)', marginBottom: '4px' }}>{item.label}</div>
                  <div style={{ fontSize: '15px', color: 'var(--light-gray)' }}>{item.value}</div>
                </div>
              </div>
            ))}
            <div style={{ width: '100%', height: '220px', background: 'var(--card)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '12px', fontSize: '40px', color: 'var(--gray)' }}>
              🗺️
              <p style={{ fontFamily: 'Barlow Condensed', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase' }}>Google Map Embed</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
          {state.succeeded && (
            <div style={{
            marginTop: '16px', padding: '16px',
            background: 'rgba(245,166,35,0.1)',
            border: '1px solid rgba(245,166,35,0.3)',
            color: 'var(--gold)',
            fontSize: '13px', fontWeight: '600',
            letterSpacing: '1px', textAlign: 'center',
            }}>
            ✓ Message sent! We'll get back to you soon.
            </div>
          )}

          {state.errors && state.errors.length > 0 && (
            <div style={{
            marginTop: '16px', padding: '16px',
            background: 'rgba(255,60,60,0.1)',
            border: '1px solid rgba(255,60,60,0.3)',
            color: '#ff6b6b',
            fontSize: '13px', fontWeight: '600',
            letterSpacing: '1px', textAlign: 'center',
            }}>
            ✗ Something went wrong. Please try again.
            </div>
          )}
            <label style={{ fontFamily: 'Barlow Condensed', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gray)', display: 'block', marginBottom: '8px' }}>Your Name</label>
            <input name="name" placeholder="Enter your name" style={inputStyle} required />

            <label style={{ fontFamily: 'Barlow Condensed', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gray)', display: 'block', marginBottom: '8px' }}>Email Address</label>
            <input name="email" type="email" placeholder="Enter your email" style={inputStyle} required />

            <label style={{ fontFamily: 'Barlow Condensed', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gray)', display: 'block', marginBottom: '8px' }}>Message</label>
            <textarea name="message" placeholder="How can we help?" style={{ ...inputStyle, height: '140px', resize: 'vertical' }} required />

            <button
              type="submit"
              disabled={state.submitting}
              className="btn-gold"
              style={{
                width: '100%', padding: '18px',
                clipPath: 'none', border: 'none',
                opacity: state.submitting ? 0.7 : 1,
                fontSize: '12px', letterSpacing: '3px',
              }}>
              {state.submitting ? 'SENDING...' : 'SEND MESSAGE →'}
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Contact