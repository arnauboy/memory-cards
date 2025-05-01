import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useName } from '../../context/NameProvider.jsx'
import GameGrid from '../../components/GameGrid/GameGrid.jsx'
import GAME_CONFIG from '../../config/gameConfig.jsx'
import Button from '../../components/Button/Button.jsx'
import './Game.css'

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
    const numbers = GAME_CONFIG.GRID_CELLS
    return numbers.sort(() => Math.random() - 0.5)
  }

  const setupRound = () => {
    setGrid(shuffleNumbers())
    setTargetNumber(Math.floor(Math.random() * 9) + 1)
    startTimer(GAME_CONFIG.DIFFICULTIES[level].time)
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
        setScore(score + GAME_CONFIG.DIFFICULTIES[level].points)
        setGuessIsCorrect(true)
      } else {
        setGuessIsCorrect(false)
        if (navigator.vibrate) {
          navigator.vibrate(200)
        }
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
              className="level-selector"
              id="level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="bajo">Nivel Bajo (10s)</option>
              <option value="medio">Nivel Medio (5s)</option>
              <option value="alto">Nivel Alto (2s)</option>
            </select>
          </div>
        ) : (
          <p>
            Nivel {level} ({GAME_CONFIG.DIFFICULTIES[level].time} s)
          </p>
        )}
      </div>

      {!gameStarted ? (
        <Button className="game-screen" onClick={handleStart}>
          Jugar
        </Button>
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
            <Button className="game-screen" onClick={buttonProps.onClick}>
              {buttonProps.text}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
