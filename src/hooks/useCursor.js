import { useEffect } from 'react'

function useCursor() {
  useEffect(() => {
    const cursor = document.getElementById('cursor')
    const ring = document.getElementById('cursorRing')
    if (!cursor || !ring) return

    let mx = 0, my = 0, rx = 0, ry = 0

    const move = e => {
      mx = e.clientX; my = e.clientY
      cursor.style.left = mx - 6 + 'px'
      cursor.style.top = my - 6 + 'px'
    }

    const animRing = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      ring.style.left = rx - 18 + 'px'
      ring.style.top = ry - 18 + 'px'
      requestAnimationFrame(animRing)
    }

    document.addEventListener('mousemove', move)
    animRing()

    const hoverEls = document.querySelectorAll('button, a, .prog-card, .trainer-card, .why-card, .gal-item')
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.style.transform = 'scale(2)')
      el.addEventListener('mouseleave', () => cursor.style.transform = 'scale(1)')
    })

    return () => document.removeEventListener('mousemove', move)
  }, [])
}

export default useCursor