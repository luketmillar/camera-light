import React from 'react'
import Menu from './Menu'
import { ContextProvider } from './Context'

const App = () => {
  return (
    <div style={{ position: 'absolute', right: 70, bottom: 40 }}>
      <ContextProvider>
        <Menu />
      </ContextProvider>
    </div>
  )
}

export default App
