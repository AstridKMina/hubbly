import { useContext, useEffect, useState } from "react"
import { ArticlesContext } from "../context/HomeArticlesContext"

export const HomePage = () => {
    const { trendingArticles } = useContext(ArticlesContext);
    const [sortedArticles, setSortedArticles] = useState([]);
    const [loading, setLoading] = useState(true);


    // useEffect(() => {
    //   if (trendingArticles.length > 0) {
    //     // Ordenar los artículos por votos
    //     const sorted = [...trendingArticles].sort((a, b) => b.votes - a.votes); // Ordenar de mayor a menor votos
    //     setSortedArticles(sorted); // Solo mostrar los 6 primeros
    //   }
    // }, [trendingArticles]); // Se ejecuta cada vez que cambian los artículos
  
    // if (loading) {
    //   return <p>Loading articles...</p>;
    // }
  
    // return (
    //   <main>
    //     <header>
    //       <h1 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', color: '#333' }}>
    //         Trending Topics
    //       </h1>
    //     </header>
    //     <section>
    //       {sortedArticles && sortedArticles.length > 0 ? (
    //         <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
    //           {sortedArticles.map((article) => (
    //             <li key={article.article_id}>
    //               <img src={article.article_img_url} alt="article" style={{ width: '100%', height: 'auto' }} />
    //             </li>
    //           ))}
    //         </ul>
    //       ) : (
    //         <p>No trending articles found.</p>
    //       )}
    //     </section>
    //   </main>
    // );
  };