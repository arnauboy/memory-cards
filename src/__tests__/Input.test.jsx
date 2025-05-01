import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { NameProvider } from '../context/NameProvider'
import Input from '../components/Input/Input'

describe('Input', () => {
  it('renders input with correct placeholder and allows typing', () => {
    render(
      <NameProvider>
        <Input />
      </NameProvider>,
    )

    const input = screen.getByPlaceholderText('Tu nombre...')
    expect(input).toBeInTheDocument()
    expect(input).toHaveValue('')

    fireEvent.change(input, { target: { value: 'Ana' } })
    expect(input).toHaveValue('Ana')
  })
})
