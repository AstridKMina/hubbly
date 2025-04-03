import './App.css'
import { ArticlesPage } from './pages/ArticlesPage'
import { Header } from './components/Header'
import { SoloArticlePage } from './pages/SoloArticlePage'
import { Route, Router, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { UserProvider } from './context/UserPageContext'
import { UserPage } from './pages/UsersPage'
import { TopicList } from './components/TopicList'
import { ErrorProvider } from './context/ErrorContext'
import { ErrorNotification } from './components/ErrorNotification'

function App() {


  return (
    <>
      <UserProvider>
        <ErrorProvider>
          <Header />
          <TopicList />
          <ErrorNotification/>
          <Routes>
            {/* <Route path='/' element={<HomePage />} /> */}
            <Route path='/' element={<ArticlesPage />} />
            <Route path='/articles/:id' element={<SoloArticlePage />} />
            <Route path='/users' element={<UserPage />} />
          </Routes>
        </ErrorProvider>
      </UserProvider>
    </>
  );
}


export default App
