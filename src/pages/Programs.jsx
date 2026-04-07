import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import useMediaQuery from '../hooks/useMediaQuery'

const PROGRAMS = [
  {
    id: 1,
    name: 'Weight Training',
    tagline: 'Build raw strength & muscle mass',
    cover: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80',
      'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80',
      'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&q=80',
    ],
    about: 'Our weight training program is engineered to maximize muscle hypertrophy and raw strength. Using progressive overload principles and periodized programming, you will build a physique that is both powerful and aesthetic.',
    targets: ['Chest', 'Back', 'Shoulders', 'Arms', 'Legs', 'Core'],
    color: '#F5A623',
    duration: '60 min',
    level: 'All Levels',
  },
  {
    id: 2,
    name: 'HIIT Cardio',
    tagline: 'Torch fat, ignite metabolism',
    cover: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=800&q=80',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80',
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
    ],
    about: 'High Intensity Interval Training designed to push your cardiovascular limits. Short, explosive bursts of effort followed by active recovery — scientifically proven to burn fat up to 48 hours post-workout.',
    targets: ['Full Body', 'Cardiovascular', 'Core', 'Glutes', 'Calves'],
    color: '#FF4B4B',
    duration: '45 min',
    level: 'Intermediate',
  },
  {
    id: 3,
    name: 'Calisthenics',
    tagline: 'Master your own bodyweight',
    cover: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=800&q=80',
      'https://images.unsplash.com/photo-1616803689943-5601631c7fec?w=800&q=80',
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80',
      'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&q=80',
    ],
    about: 'Calisthenics teaches you to move with grace and power using only your body. From basic push-ups to advanced muscle-ups and handstands — this program builds functional strength, flexibility, and body control.',
    targets: ['Chest', 'Back', 'Core', 'Shoulders', 'Arms', 'Balance'],
    color: '#4ECDC4',
    duration: '50 min',
    level: 'Beginner to Advanced',
  },
  {
    id: 4,
    name: 'Powerlifting',
    tagline: 'Deadlift. Squat. Bench. Dominate.',
    cover: 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?w=800&q=80',
      'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&q=80',
      'https://images.unsplash.com/photo-1587227965840-d9a9b1ef3547?w=800&q=80',
      'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=800&q=80',
    ],
    about: 'Built around the big three — squat, bench press, and deadlift. Our powerlifting program focuses on technique mastery and strength peaking cycles. Whether you compete or just want to be strong, this is your foundation.',
    targets: ['Quads', 'Hamstrings', 'Glutes', 'Back', 'Chest', 'Traps'],
    color: '#9B59B6',
    duration: '75 min',
    level: 'Intermediate to Advanced',
  },
  {
    id: 5,
    name: 'Functional Fitness',
    tagline: 'Train for life, not just the gym',
    cover: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800&q=80',
      'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=800&q=80',
      'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    ],
    about: 'Functional fitness combines strength, mobility, and coordination for real-world performance. Kettlebells, battle ropes, TRX, and compound movements — this program makes you capable in every situation life throws at you.',
    targets: ['Full Body', 'Core', 'Stability', 'Mobility', 'Endurance'],
    color: '#27AE60',
    duration: '55 min',
    level: 'All Levels',
  },
  {
    id: 6,
    name: 'Yoga & Mobility',
    tagline: 'Flexibility is strength redefined',
    cover: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
      'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=800&q=80',
      'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=800&q=80',
      'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=800&q=80',
    ],
    about: 'A holistic blend of yoga flows and targeted mobility work. Reduce injury risk, improve posture, enhance recovery, and build a deeper mind-muscle connection. Perfect as a standalone practice or complement to any training.',
    targets: ['Spine', 'Hips', 'Shoulders', 'Hamstrings', 'Ankles', 'Mind'],
    color: '#E67E22',
    duration: '60 min',
    level: 'All Levels',
  },
]

/* ── Auto Slider ── */
function PhotoSlider({ photos, accentColor, isMobile }) {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef(null)

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % photos.length)
    }, 2800)
    return () => clearInterval(timerRef.current)
  }, [photos.length])

  const goTo = (i) => {
    setCurrent(i)
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % photos.length)
    }, 2800)
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: isMobile ? '200px' : '280px', borderRadius: '12px', overflow: 'hidden' }}>
      {photos.map((src, i) => (
        <div key={i} style={{
          position: 'absolute', inset: 0,
          opacity: i === current ? 1 : 0,
          transition: 'opacity 0.7s cubic-bezier(0.4,0,0.2,1)',
        }}>
          <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,9,18,0.6) 0%, transparent 50%)' }} />
        </div>
      ))}

      {/* Dots */}
      <div style={{ position: 'absolute', bottom: '12px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '6px', zIndex: 2 }}>
        {photos.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} style={{
            width: i === current ? '20px' : '6px', height: '6px',
            borderRadius: '3px', border: 'none', cursor: 'pointer',
            background: i === current ? accentColor : 'rgba(255,255,255,0.35)',
            transition: 'all 0.3s ease',
            padding: 0,
          }} />
        ))}
      </div>

      {/* Slide counter */}
      <div style={{
        position: 'absolute', top: '12px', right: '12px',
        background: 'rgba(6,9,18,0.7)', backdropFilter: 'blur(8px)',
        borderRadius: '20px', padding: '3px 10px',
        fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.7)',
        letterSpacing: '1px', zIndex: 2,
      }}>
        {current + 1} / {photos.length}
      </div>
    </div>
  )
}

/* ── Program Card ── */
function ProgramCard({ program, index, isMobile }) {
  const [open, setOpen] = useState(false)
  const contentRef = useRef(null)
  const navigate = useNavigate()

  return (
    <div
      style={{
        background: 'rgba(12,18,35,0.7)',
        border: `1px solid ${open ? program.color + '50' : 'var(--border)'}`,
        borderRadius: '16px',
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
        boxShadow: open ? `0 20px 60px ${program.color}15` : '0 4px 20px rgba(0,0,0,0.3)',
        animation: `fadeSlideUp 0.5s ease ${index * 0.08}s both`,
      }}
    >
      {/* ── Closed State: Cover Photo + Name ── */}
      <div
        onClick={() => setOpen(o => !o)}
        style={{ cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
      >
        <div style={{
          height: open ? '0px' : isMobile ? '180px' : '220px',
          transition: 'height 0.4s cubic-bezier(0.4,0,0.2,1)',
          overflow: 'hidden',
        }}>
          <img
            src={program.cover}
            alt={program.name}
            style={{ width: '100%', height: isMobile ? '180px' : '220px', objectFit: 'cover', display: 'block', transition: 'transform 0.6s ease' }}
            onMouseEnter={e => !open && (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(to top, rgba(6,9,18,0.92) 0%, rgba(6,9,18,0.3) 50%, transparent 100%)`,
          }} />
          {/* color accent bar */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: program.color }} />
        </div>

        {/* Name bar — always visible */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 20px',
          background: open ? `rgba(12,18,35,0.95)` : 'transparent',
          position: open ? 'static' : 'absolute',
          bottom: 0, left: 0, right: 0,
          transition: 'background 0.3s',
        }}>
          <div>
            <h3 style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: '22px', letterSpacing: '3px',
              color: 'var(--white)', margin: 0, lineHeight: 1,
            }}>
              {program.name}
            </h3>
            {!open && (
              <p style={{ fontSize: '10px', color: program.color, letterSpacing: '1.5px', margin: '4px 0 0', fontWeight: 600, textTransform: 'uppercase' }}>
                {program.tagline}
              </p>
            )}
          </div>

          {/* Toggle icon */}
          <div style={{
            width: '32px', height: '32px', borderRadius: '50%',
            border: `1.5px solid ${program.color}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, transition: 'all 0.3s',
            background: open ? program.color : 'transparent',
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke={open ? '#0a0f1e' : program.color} strokeWidth="2.5"
              style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s' }}>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── Open State: Slider + Info ── */}
      <div style={{
        maxHeight: open ? '700px' : '0px',
        overflow: 'hidden',
        transition: 'max-height 0.5s cubic-bezier(0.4,0,0.2,1)',
      }}>
        <div ref={contentRef} style={{ padding: '0 20px 20px' }}>

          {/* Photo Slider */}
          <PhotoSlider photos={program.photos} accentColor={program.color} isMobile={isMobile} />

          {/* Meta row */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '16px', flexWrap: 'wrap' }}>
            {[
              { label: 'Duration', val: program.duration },
              { label: 'Level', val: program.level },
            ].map(m => (
              <div key={m.label} style={{
                padding: '6px 14px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid var(--border)',
                borderRadius: '20px',
                fontSize: '10px', letterSpacing: '1px',
              }}>
                <span style={{ color: 'var(--gray)' }}>{m.label}: </span>
                <span style={{ color: 'var(--white)', fontWeight: 700 }}>{m.val}</span>
              </div>
            ))}
          </div>

          {/* About */}
          <p style={{
            fontSize: '13px', color: 'var(--light-gray)',
            lineHeight: 1.75, marginTop: '14px', letterSpacing: '0.2px',
          }}>
            {program.about}
          </p>

          {/* Target Body Parts */}
          <div style={{ marginTop: '14px' }}>
            <p style={{
              fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase',
              color: program.color, fontWeight: 700, marginBottom: '10px',
            }}>
              Target Muscles
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {program.targets.map(t => (
                <span key={t} style={{
                  padding: '5px 12px',
                  background: program.color + '15',
                  border: `1px solid ${program.color}40`,
                  borderRadius: '4px',
                  fontSize: '11px', fontWeight: 600,
                  color: program.color, letterSpacing: '0.5px',
                }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => navigate('/contact', { state: { program: program.name } })}
            style={{
            marginTop: '18px', width: '100%', padding: '13px',
            background: `linear-gradient(135deg, ${program.color}, ${program.color}bb)`,
            border: 'none', borderRadius: '8px', cursor: 'pointer',
            fontSize: '11px', fontWeight: 800, letterSpacing: '2.5px',
            textTransform: 'uppercase', color: '#0a0f1e',
            transition: 'opacity 0.2s, transform 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Join This Program
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Main Programs Page ── */
function Programs() {
  const device = useMediaQuery()
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      paddingTop: device === 'mobile' ? '80px' : '100px',
      paddingBottom: device === 'mobile' ? '50px' : '80px',
    }}>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: device === 'mobile' ? '36px' : '60px', padding: '0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '16px' }}>
          <div style={{ width: '40px', height: '1px', background: 'var(--gold)' }} />
          <span style={{ fontSize: '9px', letterSpacing: '4px', color: 'var(--gold)', fontWeight: 700, textTransform: 'uppercase' }}>
            What We Offer
          </span>
          <div style={{ width: '40px', height: '1px', background: 'var(--gold)' }} />
        </div>

        <h1 style={{
          fontFamily: 'Bebas Neue, sans-serif',
          fontSize: 'clamp(42px, 7vw, 72px)',
          letterSpacing: '6px', lineHeight: 1,
          margin: '0 0 16px',
        }}>
          OUR <span style={{ color: 'var(--gold)' }}>PROGRAMS</span>
        </h1>

        <p style={{
          fontSize: '14px', color: 'var(--light-gray)',
          maxWidth: '520px', margin: '0 auto',
          lineHeight: 1.8, letterSpacing: '0.3px',
        }}>
          Click any program to explore training photos, what muscles it targets, and what to expect. Every program is coached by elite trainers.
        </p>
      </div>

      {/* Cards Grid */}
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        padding: device === 'mobile' ? '0 14px' : '0 20px',
        display: 'grid',
        gridTemplateColumns: device === 'mobile'
          ? '1fr'
          : device === 'tablet'
          ? 'repeat(2, 1fr)'
          : 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: device === 'mobile' ? '16px' : '24px',
      }}>
        {PROGRAMS.map((program, i) => (
          <ProgramCard key={program.id} program={program} index={i} isMobile={device === 'mobile'} />
        ))}
      </div>
    </div>
  )
}

export default Programs
