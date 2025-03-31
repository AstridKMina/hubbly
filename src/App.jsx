import './App.css'
import { ArticlesPage } from './pages/ArticlesPage'
import { Header } from './components/Header'
import { SoloArticlePage } from './pages/SoloArticlePage'
import { Route, Router, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'

function App() {


  return (
    <>
      <Header />
      {/* <HomePage />
      <ArticlesPage />
      <SoloArticlePage /> */}

      <Routes>
        {/* <Route path='/' element={<HomePage />} /> */}
        <Route path='/' element={<ArticlesPage />} />
        <Route path='/articles/:id' element={<SoloArticlePage />} />
      </Routes>
    </>
  );
}

export default App
