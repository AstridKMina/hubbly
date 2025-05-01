import { useEffect, useState } from "react"
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import styles from "./HomePage.module.css"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export const HomePage = ({ articles, loading }) => {
  const [sortedArticles, setSortedArticles] = useState([]);

  useEffect(() => {
    if (articles && articles.length > 0) {
      const sorted = [...articles].sort((a, b) => b.votes - a.votes);
      setSortedArticles(sorted.slice(0, 6));
    }
  }, [articles]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    }
  }, []);


    return (
      <main className={styles.homeMain} aria-label="Homepage">
        {loading ? (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              zIndex: 9999,
            }}
            role="status"
            aria-live="polite"
          >
            <ClipLoader loading={loading} color="#36d7b7" size={90} />
            <span className={styles.srOnly}>Loading trending articles...</span>
          </div>
        ) : (
          <>
            <header>
              <h1 className={styles.title}>Trending Articles</h1>
            </header>
    
            <section
              className={styles.collageContainer}
              aria-label="Trending articles gallery"
            >
              {sortedArticles && sortedArticles.length > 0 ? (
                <>
                  <div className={styles.carouselWrapper}>
                    <Carousel
                      responsive={{
                        mobile: { breakpoint: { max: 468, min: 0 }, items: 1 },
                      }}
                      swipeable
                      draggable
                      showDots
                      arrows={false}
                      role="region"
                      aria-label="Trending articles carousel"
                    >
                      {sortedArticles.map((article) => (
                        <div
                          key={article.article_id}
                          className={styles.carouselItem}
                        >
                          <Link
                            to={`/articles/${article.article_id}`}
                            aria-label={`Read article: ${article.title}`}
                          >
                            <img
                              src={article.article_img_url}
                              alt={`Image for ${article.title}`}
                            />
                            <div className={styles.overlay}>
                              <span className={styles.articleTitle}>
                                {article.title}
                              </span>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </Carousel>
                  </div>
    
                  <div className={styles.wrapper}>
                    {sortedArticles.map((article, index) => (
                      <div
                        key={article.article_id}
                        className={`${styles.collageItem} ${
                          styles[`size${(index % 6) + 1}`]
                        }`}
                      >
                        <Link
                          to={`/articles/${article.article_id}`}
                          aria-label={`Read article: ${article.title}`}
                        >
                          <img
                            src={article.article_img_url}
                            alt={`Image for ${article.title}`}
                          />
                          <div className={styles.overlay}>
                            <span className={styles.articleTitle}>
                              {article.title}
                            </span>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p id="no-articles">No trending articles found.</p>
              )}
            </section>
          </>
        )}
      </main>
    );
};
