import { useEffect, useState } from 'react'

function useTypewriter(text, speed = 60, delay = 0) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const delayTimer = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(delayTimer)
  }, [delay])

  useEffect(() => {
    if (!started) return
    setDisplayed('')
    let i = 0
    const timer = setInterval(() => {
      setDisplayed(text.slice(0, i + 1))
      i++
      if (i >= text.length) clearInterval(timer)
    }, speed)
    return () => clearInterval(timer)
  }, [started, text, speed])

  return displayed
}

export default useTypewriter