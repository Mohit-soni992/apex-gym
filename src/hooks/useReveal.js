import { useEffect } from 'react'

function useReveal() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal')

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // scroll down — visible ho jao
          entry.target.classList.add('visible')
        } else {
          // scroll up — reset ho jao
          entry.target.classList.remove('visible')
        }
      })
    }, {
      threshold: 0.15,      // 15% dikhne pe trigger
      rootMargin: '0px 0px -60px 0px'  // thoda pehle trigger
    })

    reveals.forEach(r => observer.observe(r))
    return () => observer.disconnect()
  }, [])
}

export default useReveal