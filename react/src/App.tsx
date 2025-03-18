import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import { useTheme } from './components/theme-provider'

function App() {
  const [count, setCount] = useState(0)
  const { setTheme, theme } = useTheme()

  return (
    <>

      <p>
        theme is {theme}
      </p>
      <Button

        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        Toggle theme
      </Button>

      <p>
        count is {count}
      </p>
      <Button
        variant={count % 2 === 0 ? 'default' : 'secondary'}
        onClick={() => setCount((count) => count + 1)}>
        Click me</Button >
    </>
  )
}

export default App
