import { useNavigate } from 'react-router-dom'
import { useName } from '../../context/NameProvider'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import './Home.css'
import { useCallback } from 'react'

export default function Home() {
  const { name } = useName()
  const navigate = useNavigate()

  const handleStart = useCallback(() => {
    if (name) {
      navigate('/game')
    } else {
      alert('Por favor, introduce tu nombre')
    }
  }, [name, navigate])

  return (
    <main className="container">
      <h1 className="welcome">Memory Cards</h1>
      <Input />
      <Button onClick={handleStart}>Empezar</Button>
    </main>
  )
}
