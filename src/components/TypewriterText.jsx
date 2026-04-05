import { useEffect, useRef, useState } from 'react'
import useTypewriter from '../hooks/useTypewriter'

function TypewriterText({ text, delay = 0, style = {}, className = '' }) {
  const [inView, setInView] = useState(false)
  const ref = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const displayed = useTypewriter(inView ? text : '', 55, delay)

  return (
    <span ref={ref} className={className} style={{ ...style, position: 'relative' }}>
      {displayed}
      {displayed.length < text.length && inView && (
        <span style={{
          display: 'inline-block', width: '2px',
          height: '0.85em', background: 'var(--gold)',
          marginLeft: '2px', verticalAlign: 'middle',
          animation: 'blink 0.8s ease infinite'
        }} />
      )}
    </span>
  )
}

export default TypewriterText