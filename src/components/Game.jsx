import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useName } from '../context/NameProvider'

const difficulties = {
  bajo: { time: 10, points: 10 },
  medio: { time: 5, points: 20 },
  alto: { time: 2, points: 30 },
}

export default function Game() {
  const navigate = useNavigate()
  const { name } = useName()
  const [level, setLevel] = useState('bajo')
  const [gameStarted, setGameStarted] = useState(false)
  const [score, setScore] = useState(0)
  const [grid, setGrid] = useState([])
  const [targetNumber, setTargetNumber] = useState(null)
  const [_, setTimer] = useState(null)
  const [isNumbersVisible, setIsNumbersVisible] = useState(true)
  const [guess, setGuess] = useState(-1)
  const [guessIsCorrect, setGuessIsCorrect] = useState(null)

  useEffect(() => {
    if (!name) navigate('/')
  }, [])

  const shuffleNumbers = () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    return numbers.sort(() => Math.random() - 0.5)
  }

  const handleStart = () => {
    setGameStarted(true)
    setScore(0)
    setGrid(shuffleNumbers())
    setTargetNumber(Math.floor(Math.random() * 9) + 1)
    startTimer(difficulties[level].time)
    setGuess(-1)
    setGuessIsCorrect(null)
  }

  const handleNext = () => {
    setGrid(shuffleNumbers())
    setTargetNumber(Math.floor(Math.random() * 9) + 1)
    startTimer(difficulties[level].time)
    setGuess(-1)
    setGuessIsCorrect(null)
  }

  const startTimer = (time) => {
    let countdown = time
    setIsNumbersVisible(true)

    const intervalId = setInterval(() => {
      console.log(countdown)

      countdown -= 1
      if (countdown <= 0) {
        clearInterval(intervalId)
        setIsNumbersVisible(false)
      }
    }, 1000)
    setTimer(intervalId)
  }

  const handleGuess = (index) => {
    setGuess(index)

    if (!isNumbersVisible) {
      if (grid[index] === targetNumber) {
        setScore(score + difficulties[level].points)
        setGuessIsCorrect(true)
      } else {
        setGuessIsCorrect(false)
      }
    }
  }

  const handleEnd = () => {
    setGameStarted(false)
    setScore(0)
  }

  return (
    <div className="container">
      <h2>Hola, {name} 👋</h2>
      <p className="score">Puntos: {score}</p>

      {!gameStarted ? (
        <>
          <div>
            <label htmlFor="level">Nivel de dificultad:</label>
            <select
              id="level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="bajo">Bajo (10s)</option>
              <option value="medio">Medio (5s)</option>
              <option value="alto">Alto (2s)</option>
            </select>
          </div>

          <button onClick={handleStart}>Jugar</button>
        </>
      ) : (
        <div>
          <h3>
            {' '}
            {isNumbersVisible
              ? 'Memoriza los números'
              : `¿Dónde estaba el número ${targetNumber} ?`}
          </h3>
          <div className="grid">
            {grid.map((number, index) => (
              <div
                key={index}
                className="grid-item"
                onClick={() => {
                  guess < 0 && !isNumbersVisible && handleGuess(index)
                }}
                style={{
                  backgroundColor: isNumbersVisible
                    ? '#f2f2f2'
                    : guess < 0 || index !== guess
                      ? '#ccc'
                      : guessIsCorrect
                        ? 'green'
                        : !guessIsCorrect
                          ? 'red'
                          : '#ccc',
                }}
              >
                {isNumbersVisible || guess === index ? number : ''}
              </div>
            ))}
          </div>

          {guess >= 0 &&
            (guessIsCorrect ? (
              <button onClick={handleNext}>Siguiente</button>
            ) : (
              <button onClick={handleEnd}>Finalizar</button>
            ))}
        </div>
      )}
    </div>
  )
}
