import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Select from '../components/Select/Select'

describe('Select', () => {
  it('renders with the correct default value and options', () => {
    render(<Select level="medio" onChange={() => {}} />)

    const select = screen.getByRole('combobox')
    expect(select).toBeInTheDocument()
    expect(select).toHaveValue('medio')

    const options = screen.getAllByRole('option')
    expect(options).toHaveLength(3)
    expect(options[0]).toHaveTextContent('Nivel Bajo (10s)')
    expect(options[1]).toHaveTextContent('Nivel Medio (5s)')
    expect(options[2]).toHaveTextContent('Nivel Alto (2s)')
  })

  it('calls onChange when a new level is selected', () => {
    const handleChange = vi.fn()

    render(<Select level="bajo" onChange={handleChange} />)

    const select = screen.getByRole('combobox')
    fireEvent.change(select, { target: { value: 'alto' } })

    expect(handleChange).toHaveBeenCalledWith('alto')
  })
})
