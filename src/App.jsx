import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Frnt from './components/Frnt'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Frnt />
    </>
  )
}

export default App
