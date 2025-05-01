import { useEffect, useState, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useName } from '../../context/NameProvider.jsx'
import GameGrid from '../../components/GameGrid/GameGrid.jsx'
import GAME_CONFIG from '../../config/gameConfig.jsx'
import Button from '../../components/Button/Button.jsx'
import Select from '../../components/Select/Select.jsx'
import Timer from '../../components/Timer/Timer.jsx'
import './Game.css'

export default function Game() {
  const navigate = useNavigate()
  const { name } = useName()

  const [level, setLevel] = useState('bajo')
  const [gameStarted, setGameStarted] = useState(false)
  const [score, setScore] = useState(0)
  const [grid, setGrid] = useState([])
  const [targetNumber, setTargetNumber] = useState(null)
  const [isNumbersVisible, setIsNumbersVisible] = useState(true)
  const [guess, setGuess] = useState(-1)

  useEffect(() => {
    if (!name) navigate('/')
  }, [name, navigate])

  const shuffleNumbers = useCallback(() => {
    const numbers = GAME_CONFIG.GRID_CELLS
    return numbers.sort(() => Math.random() - 0.5)
  }, [])

  const setupRound = useCallback(() => {
    setGrid(shuffleNumbers())
    setTargetNumber(Math.floor(Math.random() * 9) + 1)
    setGuess(-1)
    setIsNumbersVisible(true)
  }, [shuffleNumbers])

  const startGame = () => {
    setGameStarted(true)
    setScore(0)
    setupRound()
  }

  const endGame = useCallback(() => {
    setGameStarted(false)
    setScore(0)
  }, [])

  const processGuess = useCallback(
    (index) => {
      setGuess(index)
      if (!isNumbersVisible) {
        if (grid[index] === targetNumber) {
          setScore(
            (prevScore) => prevScore + GAME_CONFIG.DIFFICULTIES[level].points,
          )
        } else if (navigator.vibrate) {
          navigator.vibrate(200)
        }
      }
    },
    [isNumbersVisible, grid, targetNumber, level],
  )

  const handleTimeEnd = useCallback(() => {
    setIsNumbersVisible(false)
  }, [])

  const isGuessCorrect =
    guess >= 0 && !isNumbersVisible && grid[guess] === targetNumber

  const buttonProps = useMemo(
    () => ({
      text: isGuessCorrect ? 'Siguiente' : 'Finalizar',
      onClick: isGuessCorrect ? setupRound : endGame,
    }),
    [isGuessCorrect, setupRound, endGame],
  )

  const renderGameInfo = () => (
    <section className="gameInfo">
      <p className="score">Puntos: {score}</p>
      {!gameStarted ? (
        <Select level={level} onChange={setLevel} />
      ) : (
        <p>
          Nivel {level} ({GAME_CONFIG.DIFFICULTIES[level].time} s)
        </p>
      )}
    </section>
  )

  const renderGameScreen = () => {
    if (!gameStarted) {
      return (
        <Button className="game-screen" onClick={startGame}>
          Jugar
        </Button>
      )
    } else {
      return (
        <article>
          {isNumbersVisible ? (
            <Timer
              initialTime={GAME_CONFIG.DIFFICULTIES[level].time}
              onTimeEnd={handleTimeEnd}
            />
          ) : (
            <h3>{`¿Dónde se esconde el número ${targetNumber}?`}</h3>
          )}
          <GameGrid
            grid={grid}
            isNumbersVisible={isNumbersVisible}
            guess={guess}
            guessIsCorrect={isGuessCorrect}
            handleGuess={processGuess}
          />
          {guess >= 0 && (
            <Button className="game-screen" onClick={buttonProps.onClick}>
              {buttonProps.text}
            </Button>
          )}
        </article>
      )
    }
  }

  return (
    <main className="container">
      <header>
        <h2>Jugador {name} 🎮</h2>
      </header>
      {renderGameInfo()}
      <section className="game">{renderGameScreen()}</section>
    </main>
  )
}
