import useReveal from '../hooks/useReveal'
import { motion } from 'framer-motion'
import useMediaQuery from '../hooks/useMediaQuery'
import TypewriterText from '../components/TypewriterText'
import useTilt from '../hooks/useTilt'

const whyUs = [
  { icon: '🏋️', num: '01', title: 'Modern Equipment', desc: 'State-of-the-art machines and free weights — everything under one roof.' },
  { icon: '🥗', num: '02', title: 'Diet Plan', desc: 'Personalized nutrition crafted by experts based on your goals.' },
  { icon: '🕐', num: '03', title: '12/6 Support', desc: 'Full trainer support on every gym day — we never leave you alone.' },
  { icon: '📊', num: '04', title: 'Progress Tracking', desc: 'Weekly analysis and data-driven suggestions for better growth.' },
  { icon: '📱', num: '05', title: 'Visual Trainer', desc: 'HD training videos to improve your muscle-mind connection.' },
]

const programs = [
  { icon: '💪', tag: 'Most Popular', name: 'WEIGHT TRAINING', meta: '3× Weekly • All Levels • 60 Min', bg: 'linear-gradient(135deg,#0d2416,#1a3d28)', img: '/images/weight-training.jpg' },
  { icon: '🧘', tag: 'Beginner Friendly', name: 'YOGA', meta: 'Daily • Beginner • 30 Min', bg: 'linear-gradient(135deg,#1a1428,#2d1f4a)', img: '/images/yoga.jpg' },
  { icon: '🔥', tag: 'High Intensity', name: 'CROSSFIT', meta: '4× Weekly • Advanced • 45 Min', bg: 'linear-gradient(135deg,#2a1205,#4a2008)', img: '/images/crossfit.jpg' },
  { icon: '❤️', tag: 'Fat Burn', name: 'CARDIO', meta: 'Daily • All Levels • 45 Min', bg: 'linear-gradient(135deg,#1a0820,#320f3d)', img: '/images/cardio.jpg' },
]

const testimonials = [
  { quote: 'Joining Apex was the best decision I made. Lost 18kg in 5 months. The trainers are incredibly supportive!', name: 'Priya Sharma', meta: 'Member · Pro Plan · 2024', avatar: '👩' },
  { quote: 'The CrossFit program here is elite. Jake pushes you to your limits while keeping it safe. My progress is insane.', name: 'Rohit Verma', meta: 'Member · Elite Plan · 2023', avatar: '👨' },
  { quote: "Sarah's yoga classes changed my life. Morning sessions are peaceful and energizing. Highly recommend!", name: 'Aisha Patel', meta: 'Member · Basic Plan · 2025', avatar: '👩' },
]

function Home() {
  useReveal()
  useTilt('.tilt-card')
  const device = useMediaQuery()

  // grid configs
  const progCols = device === 'mobile' ? '1fr' : device === 'tablet' ? '1fr 1fr' : 'repeat(12,1fr)'
  const progRows = device === 'mobile' ? 'auto' : device === 'tablet' ? 'auto' : '260px 260px'

  const getProgCol = (i) => {
    if (device !== 'desktop') return 'span 1'
    return i === 0 ? 'span 5' : i === 1 ? 'span 7' : i === 2 ? 'span 4' : 'span 3'
  }
  const getProgRow = (i) => {
    if (device !== 'desktop') return 'span 1'
    return i === 0 ? 'span 2' : 'span 1'
  }

  return (
    <div style={{ paddingTop: '72px' }}>

      {/* ===== HERO ===== */}
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        position: 'relative', overflow: 'hidden',
        width: '100%', maxWidth: '100vw',
        padding: device === 'mobile' ? '72px 16px 0' : device === 'tablet' ? '72px 32px 0' : '72px 60px 0'
      }}>

        <div style={{
            position: 'absolute', inset: 0,
          backgroundImage: 'url(/images/bakcground.jpg)',  // ← APNI PHOTO
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.3)',  // dark overlay
        }} />

        {/* grid lines */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(245,166,35,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245,166,35,0.03) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 75%)'
        }} />

        {/* AG watermark */}
        {device === 'desktop' && (
          <div style={{
            position: 'absolute', right: '60px', top: '50%', transform: 'translateY(-50%)',
            fontFamily: 'Bebas Neue', fontSize: '280px', color: 'rgba(245,166,35,0.04)',
            lineHeight: 1, pointerEvents: 'none', userSelect: 'none', letterSpacing: '-10px'
          }}>AG</div>
        )}

        {/* main content */}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: device === 'mobile' ? '100%' : '800px' }}>

          {/* eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
            <div style={{ width: '40px', height: '1px', background: 'var(--gold)', flexShrink: 0 }} />
            <span style={{
              fontSize: device === 'mobile' ? '8px' : '11px',
              fontWeight: '700',
              letterSpacing: device === 'mobile' ? '2px' : '5px',
              textTransform: 'uppercase', color: 'var(--gold)'
            }}>
              {device === 'mobile' ? 'Premium Fitness Coach' : 'Your Premium Fitness Coach · Est. 2019'}
            </span>
          </motion.div>

          {/* title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay:   0.5 }}
            style={{
              fontFamily: 'Bebas Neue',
              fontSize: device === 'mobile' ? '80px' : device === 'tablet' ? '100px' : 'clamp(80px,14vw,180px)',
              lineHeight: '0.85', letterSpacing: '4px', marginBottom: '28px'
            }}>
            <TypewriterText text="FORGE" delay={500} /><br />
            <span style={{ WebkitTextStroke: '1px rgba(245,166,35,0.4)', color: 'transparent' }}>
              <TypewriterText text="YOUR" delay={900} />
            </span><br />
            <TypewriterText text="LEGACY" delay={1200} />
          </motion.h1>  

          {/* subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            style={{
              fontFamily: 'Cormorant Garamond',
              fontSize: device === 'mobile' ? '16px' : '22px',
              fontStyle: 'italic', fontWeight: '300',
              color: 'var(--light-gray)',
              maxWidth: '480px', lineHeight: '1.6',
              marginBottom: device === 'mobile' ? '36px' : '56px'
            }}>
            Where champions are made. Transform your body, elevate your mind, define your legacy.
          </motion.p>

          {/* buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
            style={{
              display: 'flex',
              flexDirection: device === 'mobile' ? 'column' : 'row',
              gap: device === 'mobile' ? '16px' : '24px',
              alignItems: device === 'mobile' ? 'flex-start' : 'center'
            }}>
            <button className="btn-gold" style={{
              width: device === 'mobile' ? '100%' : 'auto',
              clipPath: device === 'mobile' ? 'none' : 'polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%)'
            }}>
              Begin Your Journey
            </button>
            <button style={{
              background: 'transparent', border: 'none', color: 'var(--off-white)',
              fontSize: '11px', fontWeight: '600', letterSpacing: '4px',
              textTransform: 'uppercase', cursor: 'none',
              display: 'flex', alignItems: 'center', gap: '12px'
            }}>
              Explore Programs
              <span style={{ width: '36px', height: '1px', background: 'currentColor', display: 'inline-block', position: 'relative' }}>
                <span style={{ position: 'absolute', right: 0, top: '-3px', width: '7px', height: '7px', borderRight: '1px solid currentColor', borderTop: '1px solid currentColor', transform: 'rotate(45deg)', display: 'inline-block' }} />
              </span>
            </button>
          </motion.div>
        </div>



        {/* stats — desktop only */}
        {device === 'desktop' && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
            style={{ position: 'absolute', bottom: '48px', right: '60px', display: 'flex', gap: '48px' }}>
            {[['500+', 'Members'], ['20+', 'Trainers'], ['5★', 'Rating']].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontFamily: 'Bebas Neue', fontSize: '36px', color: 'var(--gold)', lineHeight: 1 }}>{num}</div>
                <div style={{ fontSize: '9px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gray)', marginTop: '4px' }}>{label}</div>
              </div>
            ))}
          </motion.div>
        )}

        {/* mobile stats — bottom of hero */}
        {device === 'mobile' && (
          <div style={{
            position: 'absolute', bottom: '32px', left: '20px', right: '20px',
            display: 'flex', justifyContent: 'space-between',
            borderTop: '1px solid var(--border)', paddingTop: '24px'
          }}>
            {[['500+', 'Members'], ['20+', 'Trainers'], ['5★', 'Rating']].map(([num, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Bebas Neue', fontSize: '28px', color: 'var(--gold)', lineHeight: 1 }}>{num}</div>
                <div style={{ fontSize: '8px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gray)', marginTop: '4px' }}>{label}</div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ===== WHY US ===== */}
      <section className="section" style={{ background: 'var(--navy2)' }}>
        <div className="container">
          <div className="section-tag reveal">
            <div className="section-tag-line" />
            <div className="section-tag-text">Why Choose Us</div>
          </div>
          <h2 className="section-title reveal" style={{ marginBottom: '48px' }}>
            EVERYTHING YOU<br />NEED TO SUCCEED
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: device === 'mobile' ? '1fr' : device === 'tablet' ? 'repeat(3,1fr)' : 'repeat(5,1fr)',
            gap: '1px',
            background: 'var(--border)'
          }}>
            {whyUs.map((w, i) => (
              <div key={i}
                className={`reveal reveal-d${i + 1} tilt-card`}
                style={{
                  background: 'var(--card)',
                  padding: device === 'mobile' ? '32px 24px' : '48px 32px',
                  position: 'relative', overflow: 'hidden',
                  transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)',
                  borderBottom: '2px solid transparent'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--card2)'; e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.borderBottomColor = 'var(--gold)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--card)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderBottomColor = 'transparent'; }}>
                <div style={{ position: 'absolute', top: '16px', right: '20px', fontFamily: 'Bebas Neue', fontSize: '56px', color: 'rgba(245,166,35,0.06)', lineHeight: 1 }}>{w.num}</div>
                <div style={{ fontSize: '32px', marginBottom: '20px' }}>{w.icon}</div>
                <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '12px' }}>{w.title}</div>
                <p style={{ fontSize: '13px', color: 'var(--gray)', lineHeight: '1.8', fontWeight: '300' }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROGRAMS ===== */}
      <section className="section" style={{ background: 'var(--navy)' }}>
        <div className="container">
          <div className="section-tag reveal">
            <div className="section-tag-line" />
            <div className="section-tag-text">What We Offer</div>
          </div>
          <h2 className="section-title reveal" style={{ marginBottom: '48px' }}>OUR PROGRAMS</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: progCols,
            gridTemplateRows: progRows,
            gap: '12px'
          }}>
            {programs.map((p, i) => (
              <div key={i}
                className={`reveal reveal-d${i + 1} tilt-card`}
                style={{
                  gridColumn: getProgCol(i),
                  gridRow: getProgRow(i),
                  height: device === 'mobile' ? '220px' : 'auto',
                  position: 'relative', overflow: 'hidden',
                  background: 'var(--card)', cursor: 'none'
                }}
                onMouseEnter={e => { e.currentTarget.querySelector('.prog-bg').style.transform = 'scale(1.08)' }}
                onMouseLeave={e => { e.currentTarget.querySelector('.prog-bg').style.transform = 'scale(1)' }}>
                <div className="prog-bg" style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: `url(${p.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)'
                }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,15,30,0.97) 0%, rgba(10,15,30,0.4) 50%, transparent 100%)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: device === 'mobile' ? '20px' : '32px' }}>
                  <div style={{ display: 'inline-block', background: 'var(--gold)', color: '#000', fontSize: '9px', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', padding: '5px 14px', marginBottom: '10px' }}>{p.tag}</div>
                  <div style={{ fontFamily: 'Bebas Neue', fontSize: device === 'mobile' ? '28px' : '38px', letterSpacing: '3px', marginBottom: '8px', lineHeight: 1 }}>{p.name}</div>
                  <div style={{ fontSize: '11px', fontWeight: '500', letterSpacing: '2px', color: 'var(--light-gray)', textTransform: 'uppercase' }}>{p.meta}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section" style={{ background: 'var(--navy2)' }}>
        <div className="container">
          <div className="section-tag reveal">
            <div className="section-tag-line" />
            <div className="section-tag-text">Member Stories</div>
          </div>
          <h2 className="section-title reveal" style={{ marginBottom: '48px' }}>WHAT THEY SAY</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: device === 'mobile' ? '1fr' : device === 'tablet' ? '1fr' : 'repeat(3,1fr)',
            gap: '16px'
          }}>
            {testimonials.map((t, i) => (
              <div key={i}
                className={`reveal reveal-d${i + 1} tilt-card`}
                style={{
                  background: 'var(--card)',
                  padding: device === 'mobile' ? '28px 24px' : '44px',
                  border: '1px solid var(--border2)',
                  transition: 'all 0.5s'
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = 'rgba(245,166,35,0.15)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--border2)'; }}>
                <div style={{ fontFamily: 'Cormorant Garamond', fontSize: '64px', color: 'var(--gold)', lineHeight: '0.5', opacity: '0.2', marginBottom: '16px' }}>"</div>
                <p style={{ fontFamily: 'Cormorant Garamond', fontSize: device === 'mobile' ? '15px' : '17px', fontStyle: 'italic', fontWeight: '300', color: 'var(--light-gray)', lineHeight: '1.8', marginBottom: '28px' }}>{t.quote}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--card2)', border: '2px solid var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>{t.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--gray)' }}>{t.meta}</div>
                    <div style={{ color: 'var(--gold)', fontSize: '12px', marginTop: '4px', letterSpacing: '2px' }}>★★★★★</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      <section className="section" style={{ background: 'var(--navy)' }}>
        <div className="container">
          <div className="section-tag reveal">
            <div className="section-tag-line" />
            <div className="section-tag-text">Our Facility</div>
          </div>
          <h2 className="section-title reveal" style={{ marginBottom: '48px' }}>
            INSIDE THE GYM
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: device === 'mobile' ? '1fr 1fr' : device === 'tablet' ? 'repeat(3,1fr)' : 'repeat(12,1fr)',
            gridTemplateRows: device === 'mobile' ? 'auto' : device === 'tablet' ? 'auto' : '260px 260px',
            gap: '8px'
          }}>
            {[
              { cls: device === 'mobile' ? 'span 2' : device === 'tablet' ? 'span 1' : 'span 4', row: device === 'desktop' ? 'span 2' : 'span 1', img: '/images/gallery-1.jpg', emoji: '🏋️‍♂️' },
              { cls: device === 'mobile' ? 'span 1' : device === 'tablet' ? 'span 1' : 'span 5', row: 'span 1', img: '/images/gallery-2.jpg', emoji: '🧘‍♀️' },
              { cls: device === 'mobile' ? 'span 1' : device === 'tablet' ? 'span 1' : 'span 3', row: 'span 1', img: '/images/gallery-3.jpg', emoji: '🔥' },
              { cls: device === 'mobile' ? 'span 1' : device === 'tablet' ? 'span 1' : 'span 3', row: 'span 1', img: '/images/gallery-4.jpg', emoji: '🏃‍♀️' },
              { cls: device === 'mobile' ? 'span 1' : device === 'tablet' ? 'span 1' : 'span 2', row: 'span 1', img: '/images/gallery-5.jpg', emoji: '💪' },
              { cls: device === 'mobile' ? 'span 2' : device === 'tablet' ? 'span 1' : 'span 3', row: 'span 1', img: '/images/gallery-6.jpg', emoji: '🥊' },
            ].map((g, i) => (
              <div key={i}
                className="reveal"
                style={{
                  gridColumn: g.cls,
                  gridRow: g.row,
                  height: device === 'mobile' ? '160px' : device === 'tablet' ? '200px' : 'auto',
                  background: g.img
                    ? `url(${g.img}) center/cover no-repeat`
                    : 'var(--card)',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '64px',
                  cursor: 'none',
                  transition: 'all 0.4s'
                }}
                onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.2)'}
                onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}>

                {/* Agar photo nahi hai toh emoji dikhao */}
                {!g.img && g.emoji}

                {/* Gold hover overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(245,166,35,0.08)',
                  opacity: 0, transition: 'opacity 0.4s',
                }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '0'}
                />

                {/* Bottom gradient */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  height: '40%',
                  background: 'linear-gradient(to top, rgba(10,15,30,0.6), transparent)'
                }} />
              </div>
            ))}
          </div>
        </div>
      </section>
            {/* ===== ABOUT / TEAM ===== */}
  <section className="section" style={{ background: 'var(--navy2)', padding: '0' }}>
    <div style={{
      display: 'grid',
      gridTemplateColumns: device === 'mobile' ? '1fr' : '1fr 1fr',
      minHeight: device === 'mobile' ? 'auto' : '560px',
    }}>
        
          {/* LEFT — Photo */}
          <div style={{
            position: 'relative',
            height: device === 'mobile' ? '300px' : 'auto',
            overflow: 'hidden',
          }}>
            <img
              src="/images/team.jpg"
              alt="Apex Gym Team"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
                filter: 'brightness(0.85)',
                transition: 'transform 0.6s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />
            {/* gold overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to right, transparent 60%, var(--navy2) 100%)',
            }} />
          </div>
          
          {/* RIGHT — Text */}
          <div style={{
            padding: device === 'mobile' ? '48px 20px' : '80px 60px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
            <div className="section-tag reveal" style={{ marginBottom: '20px' }}>
              <div className="section-tag-line" />
              <div className="section-tag-text">Our Story</div>
            </div>
        
            <h2 className="section-title reveal" style={{ marginBottom: '24px' }}>
              MEET THE<br />
              <span style={{ color: 'var(--gold)' }}>TEAM</span>
            </h2>
        
            <p className="reveal" style={{
              fontSize: device === 'mobile' ? '14px' : '16px',
              fontWeight: '300',
              color: 'var(--light-gray)',
              lineHeight: '1.8',
              marginBottom: '32px',
              fontFamily: 'Cormorant Garamond',
              fontStyle: 'italic',
              fontSize: '18px',
            }}>
              Founded in 2019, Apex Gym was built on one belief — 
              that every person deserves a coach who genuinely cares. 
              Our trainers aren't just experts, they're your partners in transformation.
            </p>
          
            {/* Stats */}
            <div className="reveal" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
              marginBottom: '40px',
              paddingTop: '32px',
              borderTop: '1px solid var(--border)',
            }}>
              {[
                { num: '20+', label: 'Expert Trainers' },
                { num: '500+', label: 'Happy Members' },
                { num: '5★', label: 'Avg Rating' },
              ].map(({ num, label }) => (
                <div key={label}>
                  <div style={{
                    fontFamily: 'Bebas Neue',
                    fontSize: '40px',
                    color: 'var(--gold)',
                    lineHeight: 1,
                    marginBottom: '6px',
                  }}>{num}</div>
                  <div style={{
                    fontSize: '10px',
                    fontWeight: '600',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: 'var(--gray)',
                  }}>{label}</div>
                </div>
              ))}
            </div>
            
            <div className="reveal">
              <button className="btn-gold" style={{
                clipPath: device === 'mobile' ? 'none' : 'polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%)'
              }}>
                Meet All Trainers
              </button>
            </div>
          </div>
            
        </div>
        </section>
      

    </div>
  )
}

export default Home