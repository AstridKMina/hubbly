import { useState } from 'react'
import './App.css'
import { ArticlesPage } from './pages/ArticlesPage'
import { Header } from './components/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header/>
      <ArticlesPage/>
    </>
  )
}

export default App
