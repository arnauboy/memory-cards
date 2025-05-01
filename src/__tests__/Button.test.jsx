import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Button from '../components/Button/Button.jsx'

describe('Button', () => {
  it('renders with the correct text', () => {
    render(
      <Button className="" onClick={() => {}}>
        Click Me
      </Button>,
    )
    expect(screen.getByRole('button')).toHaveTextContent('Click Me')
  })

  it('applies the passed className', () => {
    render(
      <Button className="test-class" onClick={() => {}}>
        Test
      </Button>,
    )
    expect(screen.getByRole('button')).toHaveClass('game-button')
    expect(screen.getByRole('button')).toHaveClass('test-class')
  })

  it('calls the onClick handler when clicked', () => {
    const handleClick = vi.fn()
    render(
      <Button className="" onClick={handleClick}>
        Click
      </Button>,
    )
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalled()
  })
})
