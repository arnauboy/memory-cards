import { render, screen, fireEvent } from '@testing-library/react'
import GameGrid from '../components/GameGrid/GameGrid.jsx'
import { describe, it, expect, vi } from 'vitest'

const grid = [1, 2, 3, 4, 5, 6, 7, 8, 9]

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
      expect(item).toHaveStyle('background-color: #f2f2f2')
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
      expect(item).toHaveStyle('background-color: #ccc')
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
    expect(gridItems[4]).toHaveStyle('background-color: rgb(0, 128, 0)')
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
    expect(gridItems[2]).toHaveStyle('background-color: rgb(255, 0, 0)')
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
