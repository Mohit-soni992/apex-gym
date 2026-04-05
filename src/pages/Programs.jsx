const programs = [
  { name: 'Weight Training', duration: '60 Min', level: 'All Levels', icon: '💪', tag: 'Most Popular', desc: 'Build strength and muscle with our expert-guided weight training program.' },
  { name: 'Yoga', duration: '30 Min', level: 'Beginner', icon: '🧘', tag: 'Beginner Friendly', desc: 'Improve flexibility, reduce stress, and build mind-body connection.' },
  { name: 'CrossFit', duration: '45 Min', level: 'Advanced', icon: '🔥', tag: 'High Intensity', desc: 'High intensity functional movements for maximum performance.' },
  { name: 'Cardio', duration: '45 Min', level: 'All Levels', icon: '❤️', tag: 'Fat Burn', desc: 'Burn fat and improve cardiovascular health with guided cardio sessions.' },
  { name: 'Core Training', duration: '30 Min', level: 'Intermediate', icon: '⚡', tag: 'Strength', desc: 'Build a strong core foundation for better posture and performance.' },
  { name: 'Stretching', duration: '20 Min', level: 'Beginner', icon: '🤸', tag: 'Recovery', desc: 'Essential stretching routines for recovery and injury prevention.' },
]

function Programs() {
  return (
    <div style={{ paddingTop: '70px', minHeight: '100vh' }}>
      <section style={{ padding: '80px 48px', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ marginBottom: '56px' }}>
          <div style={{ fontFamily: 'Barlow Condensed', fontSize: '12px', letterSpacing: '5px', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '16px' }}>What We Offer</div>
          <h1 style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(48px, 8vw, 96px)', letterSpacing: '3px' }}>ALL PROGRAMS</h1>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {programs.map((p, i) => (
            <div key={i} style={{ background: 'var(--card)', padding: '40px', cursor: 'pointer', transition: 'transform 0.3s', borderBottom: '3px solid transparent' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderBottomColor = 'var(--primary)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderBottomColor = 'transparent' }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>{p.icon}</div>
              <div style={{ fontFamily: 'Barlow Condensed', fontSize: '11px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', background: 'var(--primary)', color: '#000', display: 'inline-block', padding: '4px 12px', marginBottom: '12px' }}>{p.tag}</div>
              <div style={{ fontFamily: 'Bebas Neue', fontSize: '28px', letterSpacing: '2px', marginBottom: '8px' }}>{p.name}</div>
              <p style={{ fontSize: '14px', color: 'var(--gray)', lineHeight: '1.7', marginBottom: '16px' }}>{p.desc}</p>
              <div style={{ fontFamily: 'Barlow Condensed', fontSize: '13px', letterSpacing: '2px', color: 'var(--primary)', textTransform: 'uppercase' }}>{p.duration} • {p.level}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Programs