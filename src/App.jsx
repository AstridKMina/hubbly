import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ArticlesPage } from './pages/ArticlesPage/ArticlesPage'
import { Header } from './components/Header/Header'
import { SoloArticlePage } from './pages/SoloArticlePage/SoloArticlePage'
import { Route, Routes, useSearchParams } from 'react-router-dom'
import { HomePage } from './pages/HomePage/HomePage'
import { UserProvider } from './context/UserPageContext'
import { UserPage } from './pages/UsersPage/UsersPage'
import { TopicList } from './components/TopicList/TopicList'
import { ErrorProvider } from './context/ErrorContext'
import { ErrorContext } from "./context/ErrorContext";
import { ErrorNotification } from './components/ErrorNotification/ErrorNotification'
import { Footer } from './components/Footer/Footer'
import { ArticlesProvider } from './context/HomeArticlesContext';
import { NewArticle } from './components/NewArticle/NewArticle';
import { getArticles } from './services/api';
import { useContext, useEffect, useState } from 'react';

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingHome, setLoadingHome] = useState(true);

  const { error, setErrorMessage } = useContext(ErrorContext);
  const [sort_by, setSort_by] = useState("");
  const [order_by, setOrder_by] = useState("");

  const [searchParams, setSearchParams] = useSearchParams()

  const articleTopic = searchParams.get("topic");

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setLoadingHome(true)
      setErrorMessage(null);
      try {
        const articlesData = await getArticles(sort_by, order_by, articleTopic);
        setArticles(articlesData);
        // setTrendingArticles(articlesData)
        console.log("Articles en page:", articlesData);

      } catch (error) {
        console.error('Error fetching articles:', error);
        setErrorMessage(error.message || "Something went wrong!")
      } finally {
        setLoading(false)
        setLoadingHome(false)
      }
    };

    fetchArticles();

  }, [articleTopic, sort_by, order_by]);


  return (
    <>
      <UserProvider>
          <ArticlesProvider>
            <Header />
            <TopicList />
            <ErrorNotification />
            <Routes>
              <Route path='/' element={<HomePage articles={articles} loading={loadingHome} />} />
              <Route path='/articles' element={<ArticlesPage
                sort_by={sort_by} setSort_by={setSort_by}
                setOrder_by={setOrder_by} order_by={order_by}
                articleTopic={articleTopic} articles={articles}
                loading={loading} setSearchParams={setSearchParams} error={error} />} />
              <Route path='/articles/:id' element={<SoloArticlePage />} />
              <Route path='/users/:username' element={<UserPage articles={articles} />} />
              <Route path="/new-article" element={<NewArticle />} />
            </Routes>
            <ToastContainer />
            <Footer />
          </ArticlesProvider>
      </UserProvider>
    </>
  );
}


export default App
