import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Game from '../pages/Game/Game'
import { NameProvider } from '../context/NameProvider'

vi.useFakeTimers()

const renderGame = () => {
  render(
    <BrowserRouter>
      <NameProvider>
        <Game />
      </NameProvider>
    </BrowserRouter>,
  )
}

describe('Game', () => {
  it('shows player name, difficulty selector, points and start button', () => {
    renderGame()
    expect(screen.getByText(/Jugador/i)).toBeInTheDocument()
    expect(screen.getByText('Jugar')).toBeInTheDocument()
    expect(screen.getByText(/Puntos/i)).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getByText(/Nivel Bajo/)).toBeInTheDocument()
  })

  it('starts the game when clicking "Jugar"', () => {
    renderGame()
    fireEvent.click(screen.getByText('Jugar'))
    expect(screen.getByText(/Tiempo restante/i)).toBeInTheDocument()
  })

  it('hides difficulty select after starting', () => {
    renderGame()
    fireEvent.click(screen.getByText('Jugar'))
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument()
  })

  it('shows correct number of grid items after starting', () => {
    renderGame()
    fireEvent.click(screen.getByText('Jugar'))
    const gridItems = screen.getAllByRole('gridcell')
    expect(gridItems.length).toBe(9)
  })

  it('after countdown, hides numbers', async () => {
    renderGame()
    fireEvent.click(screen.getByText('Jugar'))
    act(() => {
      vi.advanceTimersByTime(10000)
    })
    expect(screen.getByText(/¿Dónde se esconde el número/i)).toBeInTheDocument()
  })

  it('handles guessing a correct number', () => {
    renderGame()
    fireEvent.click(screen.getByText('Jugar'))

    act(() => {
      vi.advanceTimersByTime(10000)
    })

    const targetText = screen.getByText(
      /¿Dónde se esconde el número/i,
    ).textContent

    const targetNumber = targetText?.at(-2)

    const correctCell = screen.getByTestId(targetNumber)

    fireEvent.click(correctCell)

    expect(
      screen.getByRole('button', { name: /Siguiente/i }),
    ).toBeInTheDocument()
  })

  it('handles guessing an incorrect number and resets game on "Finalizar"', () => {
    renderGame()
    fireEvent.click(screen.getByText('Jugar'))

    const gridCells = screen.getAllByRole('gridcell')

    act(() => {
      vi.advanceTimersByTime(10000)
    })

    const targetText = screen.getByText(
      /¿Dónde se esconde el número/i,
    ).textContent

    const targetNumber = targetText?.at(-2)

    const wrongCell = gridCells.find(
      (cell) => cell.getAttribute('data-testid') !== targetNumber,
    )

    fireEvent.click(wrongCell)

    expect(
      screen.getByRole('button', { name: /Finalizar/i }),
    ).toBeInTheDocument()

    fireEvent.click(screen.getByText('Finalizar'))
    expect(screen.getByText('Jugar')).toBeInTheDocument()
  })
})
