import './Button.css'

export default function Button({ className, onClick, children }) {
  return (
    <button className={`game-button ${className}`} onClick={onClick}>
      {children}
    </button>
  )
}
