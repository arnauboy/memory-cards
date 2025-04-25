import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Home from '../components/Home'

function renderWithRouter(ui) {
  return render(<BrowserRouter>{ui}</BrowserRouter>)
}

describe('Home', () => {
  it('muestra el título y permite escribir el nombre', () => {
    renderWithRouter(<Home />)

    const input = screen.getByPlaceholderText('Tu nombre...')
    const button = screen.getByText('Empezar')

    expect(screen.getByText('Memory Cards')).toBeInTheDocument()
    expect(input).toBeInTheDocument()
    expect(button).toBeInTheDocument()

    fireEvent.change(input, { target: { value: 'Juan' } })
    expect(input.value).toBe('Juan')
  })
})
