import './Select.css'

export default function Select({ level, onChange }) {
  return (
    <form>
      <select
        className="level-selector"
        id="level"
        value={level}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="bajo">Nivel Bajo (10s)</option>
        <option value="medio">Nivel Medio (5s)</option>
        <option value="alto">Nivel Alto (2s)</option>
      </select>
    </form>
  )
}
