import gymConfig from '../config/gymConfig'
import { useForm } from '@formspree/react'
import useMediaQuery from '../hooks/useMediaQuery'
import useReveal from '../hooks/useReveal'

function Contact() {
  useReveal()
  const device = useMediaQuery()
  const [state, handleSubmit] = useForm('xgoprwez')

  const inputStyle = {
    width: '100%',
    background: 'var(--card)',
    border: '1px solid var(--border2)',
    color: 'var(--white)',
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '13px',
    padding: '16px',
    outline: 'none',
    marginBottom: '20px',
    display: 'block',
    fontWeight: '300',
    transition: 'border-color 0.3s',
  }

  const labelStyle = {
    display: 'block',
    fontSize: '9px', fontWeight: '700',
    letterSpacing: '3px', textTransform: 'uppercase',
    color: 'var(--gray)', marginBottom: '8px'
  }

  return (
    <div style={{ paddingTop: '72px', minHeight: '100vh', background: 'var(--navy)' }}>
      <section className="section">
        <div className="container">

          {/* Header */}
          <div className="section-tag reveal">
            <div className="section-tag-line" />
            <div className="section-tag-text">Get In Touch</div>
          </div>
          <h1 className="section-title reveal" style={{ marginBottom: '56px' }}>
            CONTACT US
          </h1>

          <div style={{
            display: 'grid',
            gridTemplateColumns: device === 'mobile' ? '1fr' : '1fr 1fr',
            gap: device === 'mobile' ? '40px' : '80px',
          }}>

            {/* LEFT — Info + Map */}
            <div className="reveal">
              {[
                {
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  ),
                  label: 'Phone', value: gymConfig.contact.phone
                },
                {
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2"/>
                      <path d="m2 7 10 7 10-7"/>
                    </svg>
                  ),
                  label: 'Email', value: gymConfig.contact.email
                },
                {
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  ),
                  label: 'Address', value: gymConfig.contact.address
                },
              ].map(item => (
                <div key={item.label} style={{
                  display: 'flex', alignItems: 'flex-start',
                  gap: '16px', marginBottom: '28px'
                }}>
                  <div style={{
                    width: '48px', height: '48px', flexShrink: 0,
                    background: 'rgba(245,166,35,0.08)',
                    border: '1px solid rgba(245,166,35,0.2)',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center',
                  }}>{item.icon}</div>
                  <div>
                    <div style={{
                      fontSize: '9px', fontWeight: '700', letterSpacing: '3px',
                      textTransform: 'uppercase', color: 'var(--gray)', marginBottom: '6px'
                    }}>{item.label}</div>
                    <div style={{
                      fontSize: device === 'mobile' ? '13px' : '15px',
                      color: 'var(--light-gray)', fontWeight: '300'
                    }}>{item.value}</div>
                  </div>
                </div>
              ))}

              {/* Map */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d894.1762821296775!2d72.99295856114249!3d26.270383504684062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1775447897258!5m2!1sen!2sin"
                width="100%"
                height={device === 'mobile' ? '180' : '220'}
                style={{
                  border: 'none',
                  filter: 'invert(90%) hue-rotate(180deg)',  // dark theme match karega
                    display: 'block',
                  }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
            </div>

            {/* RIGHT — Form */}
            <div className="reveal reveal-d2">
              <form onSubmit={handleSubmit}>

                {/* Success */}
                {state.succeeded && (
                  <div style={{
                    marginBottom: '20px', padding: '16px',
                    background: 'rgba(245,166,35,0.1)',
                    border: '1px solid rgba(245,166,35,0.3)',
                    color: 'var(--gold)', fontSize: '13px',
                    fontWeight: '600', letterSpacing: '1px', textAlign: 'center',
                  }}>
                    ✓ Message sent! We'll get back to you soon.
                  </div>
                )}

                {/* Error */}
                {state.errors && state.errors.length > 0 && (
                  <div style={{
                    marginBottom: '20px', padding: '16px',
                    background: 'rgba(255,60,60,0.1)',
                    border: '1px solid rgba(255,60,60,0.3)',
                    color: '#ff6b6b', fontSize: '13px',
                    fontWeight: '600', letterSpacing: '1px', textAlign: 'center',
                  }}>
                    ✗ Something went wrong. Please try again.
                  </div>
                )}

                <label style={labelStyle}>Your Name</label>
                <input
                  name="name" placeholder="Enter your name"
                  style={inputStyle} required
                  onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border2)'}
                />

                <label style={labelStyle}>Email Address</label>
                <input
                  name="email" type="email" placeholder="Enter your email"
                  style={inputStyle} required
                  onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border2)'}
                />

                <label style={labelStyle}>Message</label>
                <textarea
                  name="message" placeholder="How can we help?"
                  style={{ ...inputStyle, height: '140px', resize: 'vertical' }}
                  required
                  onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border2)'}
                />

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

          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact