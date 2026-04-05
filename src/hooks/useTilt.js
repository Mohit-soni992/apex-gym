import { useEffect } from 'react'

function useTilt(selector = '.tilt-card') {
  useEffect(() => {
    const cards = document.querySelectorAll(selector)

    const handleMove = (e, card) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = ((y - centerY) / centerY) * -6
      const rotateY = ((x - centerX) / centerX) * 6

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`
      card.style.transition = 'transform 0.1s ease'
    }

    const handleLeave = (card) => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
      card.style.transition = 'transform 0.6s ease'
    }

    cards.forEach(card => {
      card.addEventListener('mousemove', e => handleMove(e, card))
      card.addEventListener('mouseleave', () => handleLeave(card))
    })

    return () => {
      cards.forEach(card => {
        card.removeEventListener('mousemove', e => handleMove(e, card))
        card.removeEventListener('mouseleave', () => handleLeave(card))
      })
    }
  }, [])
}

export default useTilt