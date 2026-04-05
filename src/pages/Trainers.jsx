import useReveal from '../hooks/useReveal'

const trainers = [
  { name: 'SARAH JOHNSON', role: 'Yoga & Flexibility Coach', icon: '🧘‍♀️', tags: ['Yoga','Stretch','Mindfulness'], exp: '6 Yrs', sessions: '1200+', bg: 'linear-gradient(135deg,#0d2416,#1a3428)' },
  { name: 'MIKE TORRES', role: 'Strength & Conditioning', icon: '💪', tags: ['Weights','Powerlifting'], exp: '8 Yrs', sessions: '2000+', bg: 'linear-gradient(135deg,#1a0f08,#2d1a0a)' },
  { name: 'JAKE REEVES', role: 'CrossFit Specialist', icon: '🔥', tags: ['CrossFit','HIIT'], exp: '5 Yrs', sessions: '900+', bg: 'linear-gradient(135deg,#150820,#260e38)' },
  { name: 'ALEX KIM', role: 'Cardio & Nutrition Coach', icon: '🏃', tags: ['Cardio','Diet','Fat Loss'], exp: '7 Yrs', sessions: '1500+', bg: 'linear-gradient(135deg,#0a1020,#121830)' },
]

function Trainers() {
  useReveal()

  return (
    <div style={{ paddingTop: '72px', minHeight: '100vh', background: 'var(--navy)' }}>
      <section className="section">
        <div className="container">
          <div className="section-tag reveal"><div className="section-tag-line" /><div className="section-tag-text">Meet The Team</div></div>
          <h2 className="section-title reveal" style={{ marginBottom: '64px' }}>OUR TRAINERS</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px' }}>
            {trainers.map((t, i) => (
              <div key={i} className={`reveal reveal-d${i+1}`}
                style={{ background: 'var(--card)', overflow: 'hidden', border: '1px solid var(--border2)', transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.borderColor = 'rgba(245,166,35,0.2)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--border2)'; }}>
                <div style={{ height: '300px', background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '90px', position: 'relative', borderBottom: '2px solid var(--gold)' }}>
                  {t.icon}
                </div>
                <div style={{ padding: '28px' }}>
                  <div style={{ fontFamily: 'Bebas Neue', fontSize: '24px', letterSpacing: '2px', marginBottom: '4px' }}>{t.name}</div>
                  <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '20px' }}>{t.role}</div>
                  <div style={{ display: 'flex', gap: '24px', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid var(--border2)' }}>
                    <div><div style={{ fontFamily: 'Bebas Neue', fontSize: '28px', color: 'var(--gold)', lineHeight: 1 }}>{t.exp}</div><div style={{ fontSize: '9px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gray)' }}>Experience</div></div>
                    <div><div style={{ fontFamily: 'Bebas Neue', fontSize: '28px', color: 'var(--gold)', lineHeight: 1 }}>{t.sessions}</div><div style={{ fontSize: '9px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gray)' }}>Sessions</div></div>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {t.tags.map(tag => (
                      <span key={tag} style={{ fontSize: '9px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gray)', border: '1px solid var(--border2)', padding: '4px 12px' }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Trainers