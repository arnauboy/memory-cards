import { useEffect, useState } from 'react'

export default function CountdownTimer({ initialTime, onTimeEnd }) {
  const [countdown, setCountdown] = useState(initialTime)

  useEffect(() => {
    if (countdown <= 0) return
    const intervalId = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId)
          onTimeEnd()
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(intervalId)
  }, [countdown, onTimeEnd])

  return <span>Tiempo restante: {countdown} s</span>
}
