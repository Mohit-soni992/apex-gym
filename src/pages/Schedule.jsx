import { useState } from 'react'

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const scheduleData = {
  Monday: [
    { time: '06:00', class: 'Morning Yoga', trainer: 'Sarah Johnson', level: 'Beginner', duration: '30 Min' },
    { time: '08:00', class: 'Weight Training', trainer: 'Mike Torres', level: 'Intermediate', duration: '60 Min' },
    { time: '10:00', class: 'Cardio Blast', trainer: 'Alex Kim', level: 'Beginner', duration: '45 Min' },
    { time: '17:00', class: 'CrossFit', trainer: 'Jake Reeves', level: 'Advanced', duration: '50 Min' },
    { time: '19:00', class: 'Core & Stretch', trainer: 'Sarah Johnson', level: 'Beginner', duration: '30 Min' },
  ],
  Tuesday: [
    { time: '07:00', class: 'CrossFit', trainer: 'Jake Reeves', level: 'Advanced', duration: '45 Min' },
    { time: '09:00', class: 'Yoga Flow', trainer: 'Sarah Johnson', level: 'Beginner', duration: '30 Min' },
    { time: '18:00', class: 'Weight Training', trainer: 'Mike Torres', level: 'All Levels', duration: '60 Min' },
  ],
  Wednesday: [
    { time: '06:00', class: 'Cardio Blast', trainer: 'Alex Kim', level: 'Beginner', duration: '45 Min' },
    { time: '10:00', class: 'Core Training', trainer: 'Mike Torres', level: 'Intermediate', duration: '30 Min' },
    { time: '17:00', class: 'Yoga', trainer: 'Sarah Johnson', level: 'Beginner', duration: '30 Min' },
    { time: '19:00', class: 'CrossFit', trainer: 'Jake Reeves', level: 'Advanced', duration: '50 Min' },
  ],
  Thursday: [
    { time: '08:00', class: 'Weight Training', trainer: 'Mike Torres', level: 'All Levels', duration: '60 Min' },
    { time: '11:00', class: 'Stretching', trainer: 'Sarah Johnson', level: 'Beginner', duration: '20 Min' },
    { time: '18:00', class: 'Cardio Blast', trainer: 'Alex Kim', level: 'Intermediate', duration: '45 Min' },
  ],
  Friday: [
    { time: '06:00', class: 'Morning Yoga', trainer: 'Sarah Johnson', level: 'Beginner', duration: '30 Min' },
    { time: '09:00', class: 'CrossFit', trainer: 'Jake Reeves', level: 'Advanced', duration: '50 Min' },
    { time: '17:00', class: 'Weight Training', trainer: 'Mike Torres', level: 'All Levels', duration: '60 Min' },
    { time: '19:00', class: 'Cardio Blast', trainer: 'Alex Kim', level: 'Beginner', duration: '45 Min' },
  ],
  Saturday: [
    { time: '08:00', class: 'Open Gym', trainer: 'All Trainers', level: 'All Levels', duration: '120 Min' },
    { time: '10:00', class: 'Group Yoga', trainer: 'Sarah Johnson', level: 'Beginner', duration: '45 Min' },
    { time: '12:00', class: 'CrossFit Challenge', trainer: 'Jake Reeves', level: 'Advanced', duration: '60 Min' },
  ],
}

const levelColors = {
  Beginner: { bg: 'rgba(0,212,200,0.15)', color: 'var(--primary)' },
  Intermediate: { bg: 'rgba(255,165,0,0.15)', color: '#FFA500' },
  Advanced: { bg: 'rgba(255,60,60,0.15)', color: '#FF3C3C' },
  'All Levels': { bg: 'rgba(255,255,255,0.1)', color: '#ccc' },
}

function Schedule() {
  const [activeDay, setActiveDay] = useState('Monday')

  return (
    <div style={{ paddingTop: '70px', minHeight: '100vh' }}>
      <section style={{ padding: '80px 48px', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ marginBottom: '48px' }}>
          <div style={{ fontFamily: 'Barlow Condensed', fontSize: '12px', letterSpacing: '5px', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '16px' }}>Weekly Timetable</div>
          <h1 style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(48px, 8vw, 96px)', letterSpacing: '3px' }}>CLASS SCHEDULE</h1>
        </div>

        <div style={{ display: 'flex', gap: '2px', marginBottom: '40px', flexWrap: 'wrap' }}>
          {days.map(day => (
            <button key={day} onClick={() => setActiveDay(day)} style={{
              background: activeDay === day ? 'var(--primary)' : 'var(--card)',
              color: activeDay === day ? '#000' : 'var(--gray)',
              border: 'none', fontFamily: 'Barlow Condensed', fontSize: '13px',
              fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase',
              padding: '12px 24px', cursor: 'pointer', transition: 'all 0.3s'
            }}>{day}</button>
          ))}
        </div>

        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr 180px 160px 120px', borderBottom: '2px solid var(--primary)', padding: '14px 20px' }}>
            {['Time', 'Class', 'Trainer', 'Level', 'Duration'].map(h => (
              <div key={h} style={{ fontFamily: 'Barlow Condensed', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gray)' }}>{h}</div>
            ))}
          </div>
          {scheduleData[activeDay].map((row, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '100px 1fr 180px 160px 120px', padding: '18px 20px', borderBottom: '1px solid var(--border)', transition: 'background 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,212,200,0.03)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <div style={{ color: 'var(--primary)', fontFamily: 'Barlow Condensed', fontSize: '16px', fontWeight: '600' }}>{row.time}</div>
              <div style={{ fontWeight: '600', display: 'flex', alignItems: 'center' }}>{row.class}</div>
              <div style={{ color: 'var(--light-gray)', display: 'flex', alignItems: 'center', fontSize: '14px' }}>{row.trainer}</div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ background: levelColors[row.level]?.bg, color: levelColors[row.level]?.color, padding: '4px 12px', fontFamily: 'Barlow Condensed', fontSize: '11px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>{row.level}</span>
              </div>
              <div style={{ color: 'var(--gray)', display: 'flex', alignItems: 'center', fontSize: '14px' }}>{row.duration}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Schedule