import './GameGrid.css'

export default function GameGrid({
  grid,
  isNumbersVisible,
  guess,
  guessIsCorrect,
  handleGuess,
}) {
  const getBackgroundColor = (index) => {
    if (isNumbersVisible) return 'visible'
    if (guess < 0 || index !== guess) return 'not-visible'
    return guessIsCorrect ? 'correct' : 'incorrect'
  }

  const handleClick = (index) => {
    guess < 0 && !isNumbersVisible && handleGuess(index)
  }

  const getCellText = (number, index) =>
    isNumbersVisible || guess === index ? number : ''

  return (
    <ul className="grid">
      {grid.map((number, index) => (
        <li
          data-testid={number}
          key={number}
          className={`grid-item ${getBackgroundColor(index)}`}
          role="gridcell"
          onClick={() => handleClick(index)}
        >
          {getCellText(number, index)}
        </li>
      ))}
    </ul>
  )
}
