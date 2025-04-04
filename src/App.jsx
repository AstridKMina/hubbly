import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ArticlesPage } from './pages/ArticlesPage'
import { Header } from './components/Header'
import { SoloArticlePage } from './pages/SoloArticlePage'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { UserProvider } from './context/UserPageContext'
import { UserPage } from './pages/UsersPage'
import { TopicList } from './components/TopicList'
import { ErrorProvider } from './context/ErrorContext'
import { ErrorNotification } from './components/ErrorNotification'
import { Footer } from './components/Footer'

function App() {


  return (
    <>
      <UserProvider>
        <ErrorProvider>
          <Header />
          <TopicList />
          <ErrorNotification/>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/articles' element={<ArticlesPage />} />
            <Route path='/articles/:id' element={<SoloArticlePage />} />
            <Route path='/users' element={<UserPage />} />
          </Routes>
          <ToastContainer />
          <Footer/>
        </ErrorProvider>
      </UserProvider>
    </>
  );
}


export default App
