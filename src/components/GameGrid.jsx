export default function GameGrid({
  grid,
  isNumbersVisible,
  guess,
  guessIsCorrect,
  handleGuess,
}) {
  const getBackgroundColor = (index) => {
    if (isNumbersVisible) return '#f2f2f2'
    if (guess < 0 || index !== guess) return '#ccc'
    return guessIsCorrect ? 'green' : 'red'
  }

  return (
    <div className="grid">
      {grid.map((number, index) => (
        <div
          key={index}
          className="grid-item"
          onClick={() => {
            guess < 0 && !isNumbersVisible && handleGuess(index)
          }}
          style={{
            backgroundColor: getBackgroundColor(index),
          }}
        >
          {isNumbersVisible || guess === index ? number : ''}
        </div>
      ))}
    </div>
  )
}
