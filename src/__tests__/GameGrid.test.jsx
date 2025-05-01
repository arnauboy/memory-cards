import { render, screen, fireEvent } from '@testing-library/react'
import GameGrid from '../components/GameGrid/GameGrid.jsx'
import { describe, it, expect, vi } from 'vitest'
import GAME_CONFIG from '../config/gameConfig.jsx'

const grid = GAME_CONFIG.GRID_CELLS

describe('GameGrid', () => {
  it('renders the correct number of grid items', () => {
    render(
      <GameGrid
        grid={grid}
        isNumbersVisible={true}
        guess={-1}
        guessIsCorrect={null}
        handleGuess={() => {}}
      />,
    )

    const gridItems = screen.getAllByRole('gridcell')
    expect(gridItems.length).toBe(grid.length)
  })

  it('displays correct background color when numbers are visible', () => {
    render(
      <GameGrid
        grid={grid}
        isNumbersVisible={true}
        guess={-1}
        guessIsCorrect={null}
        handleGuess={() => {}}
      />,
    )

    const gridItems = screen.getAllByRole('gridcell')
    gridItems.forEach((item) => {
      expect(item).toHaveClass('visible')
    })
  })

  it('displays correct background color when numbers are not visible and guess is not made', () => {
    render(
      <GameGrid
        grid={grid}
        isNumbersVisible={false}
        guess={-1}
        guessIsCorrect={null}
        handleGuess={() => {}}
      />,
    )

    const gridItems = screen.getAllByRole('gridcell')
    gridItems.forEach((item) => {
      expect(item).toHaveClass('not-visible')
    })
  })

  it('displays green background when the guess is correct', () => {
    render(
      <GameGrid
        grid={grid}
        isNumbersVisible={false}
        guess={4}
        guessIsCorrect={true}
        handleGuess={() => {}}
      />,
    )

    const gridItems = screen.getAllByRole('gridcell')
    expect(gridItems[4]).toHaveClass('correct')
  })

  it('displays red background when the guess is incorrect', () => {
    render(
      <GameGrid
        grid={grid}
        isNumbersVisible={false}
        guess={2}
        guessIsCorrect={false}
        handleGuess={() => {}}
      />,
    )

    const gridItems = screen.getAllByRole('gridcell')
    expect(gridItems[2]).toHaveClass('incorrect')
  })

  it('calls handleGuess when a grid item is clicked', () => {
    const handleGuessMock = vi.fn()

    render(
      <GameGrid
        grid={grid}
        isNumbersVisible={false}
        guess={-1}
        guessIsCorrect={null}
        handleGuess={handleGuessMock}
      />,
    )

    fireEvent.click(screen.getAllByRole('gridcell')[0])

    expect(handleGuessMock).toHaveBeenCalledWith(0)
  })
})
