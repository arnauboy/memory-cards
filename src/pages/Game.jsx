import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useName } from '../context/NameProvider'
import GameGrid from '../components/GameGrid'

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
  const [countdown, setCountdown] = useState(null)

  useEffect(() => {
    if (!name) navigate('/')
  }, [])

  const shuffleNumbers = () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    return numbers.sort(() => Math.random() - 0.5)
  }

  const setupRound = () => {
    setGrid(shuffleNumbers())
    setTargetNumber(Math.floor(Math.random() * 9) + 1)
    startTimer(difficulties[level].time)
    setGuess(-1)
    setGuessIsCorrect(null)
  }

  const handleStart = () => {
    setGameStarted(true)
    setScore(0)
    setupRound()
  }

  const startTimer = (time) => {
    setCountdown(time)
    setIsNumbersVisible(true)

    const intervalId = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId)
          setIsNumbersVisible(false)
        }
        return prev - 1
      })
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

  const buttonProps = guessIsCorrect
    ? { text: 'Siguiente', onClick: setupRound }
    : { text: 'Finalizar', onClick: handleEnd }

  return (
    <div className="container">
      <h2>Jugador {name} 🎮</h2>
      <div className="gameInfo">
        <p className="score">Puntos: {score}</p>
        {!gameStarted ? (
          <div>
            <select
              id="level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="select"
            >
              <option value="bajo">Nivel Bajo (10s)</option>
              <option value="medio">Nivel Medio (5s)</option>
              <option value="alto">Nivel Alto (2s)</option>
            </select>
          </div>
        ) : (
          <p>
            Nivel {level} ({difficulties[level].time} s)
          </p>
        )}
      </div>

      {!gameStarted ? (
        <button style={{ marginTop: '20px' }} onClick={handleStart}>
          Jugar
        </button>
      ) : (
        <div>
          <h3>
            {isNumbersVisible
              ? `Tiempo restante ${countdown} s`
              : `¿Dónde se esconde el número ${targetNumber}?`}
          </h3>
          <GameGrid
            grid={grid}
            isNumbersVisible={isNumbersVisible}
            guess={guess}
            guessIsCorrect={guessIsCorrect}
            handleGuess={handleGuess}
          />

          {guess >= 0 && (
            <button style={{ marginTop: '20px' }} onClick={buttonProps.onClick}>
              {buttonProps.text}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
