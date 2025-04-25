import { useNavigate } from 'react-router-dom'
import { useName } from '../context/NameProvider'

export default function Home() {
  const { name, setName } = useName()

  const navigate = useNavigate()

  const handleStart = () => {
    if (name) {
      navigate('/game')
    } else {
      alert('Por favor, introduce tu nombre')
    }
  }

  return (
    <div className="container">
      <h1>Memory Cards</h1>
      <input
        type="text"
        placeholder="Tu nombre..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleStart}>Empezar</button>
    </div>
  )
}
