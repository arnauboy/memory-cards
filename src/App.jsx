import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/Home'
import Game from './components/Game'
import { NameProvider } from './context/NameProvider'

export default function App() {
  return (
    <NameProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </NameProvider>
  )
}
