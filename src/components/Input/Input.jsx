import { useName } from '../../context/NameProvider'
import './Input.css'

export default function Input() {
  const { name, setName } = useName()

  return (
    <input
      className="name-input"
      type="text"
      placeholder="Tu nombre..."
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  )
}
