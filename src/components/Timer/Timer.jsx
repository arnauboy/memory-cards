import { useEffect, useState } from 'react'

export default function Timer({ initialTime, onTimeEnd }) {
  const [countdown, setCountdown] = useState(initialTime)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    if (countdown <= 0) {
      onTimeEnd()
    }
  }, [countdown, onTimeEnd])

  return <span>Tiempo restante: {countdown} s</span>
}
