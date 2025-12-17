import { render, screen } from '@testing-library/react'
import App from './App'

test('la app se renderiza', () => {
  render(<App />)

  // Comprobamos que aparece el texto del template por defecto
  expect(screen.getByText('Vite + React')).toBeInTheDocument()
})
