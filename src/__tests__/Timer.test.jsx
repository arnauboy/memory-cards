import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import Timer from '../components/Timer/Timer'

describe('Timer', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  it('displays the initial countdown time', () => {
    render(<Timer initialTime={5} onTimeEnd={() => {}} />)
    expect(
      screen.getByText((text) => text.includes('Tiempo restante: 5')),
    ).toBeInTheDocument()
  })

  it('counts down every second', () => {
    render(<Timer initialTime={3} onTimeEnd={() => {}} />)

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(
      screen.getByText((text) => text.includes('Tiempo restante: 2')),
    ).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(
      screen.getByText((text) => text.includes('Tiempo restante: 1')),
    ).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(
      screen.getByText((text) => text.includes('Tiempo restante: 0')),
    ).toBeInTheDocument()
  })

  it('calls onTimeEnd when countdown reaches zero', () => {
    const onTimeEndMock = vi.fn()
    render(<Timer initialTime={2} onTimeEnd={onTimeEndMock} />)

    act(() => {
      vi.advanceTimersByTime(2000)
    })

    expect(onTimeEndMock).toHaveBeenCalled()
  })
})
