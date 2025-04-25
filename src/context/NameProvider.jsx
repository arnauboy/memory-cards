// src/context/NameContext.jsx
import { createContext, useContext, useState } from 'react'

const NameContext = createContext()

export function NameProvider({ children }) {
  const [name, setName] = useState('')

  return (
    <NameContext.Provider value={{ name, setName }}>
      {children}
    </NameContext.Provider>
  )
}

export function useName() {
  return useContext(NameContext)
}
