import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserPageContext';
import { UserLoginModal } from '../../pages/UserLoginModal/UserLoginModal';
import { Link } from 'react-router-dom';
import { IoCreate } from 'react-icons/io5';
import styles from './Header.module.css';
import hubblyLogo from '../../assets/hubbly.png';

export const Header = () => {
  const { loggedInUser } = useContext(UserContext);
  const [isVisible, setIsVisible] = useState(false);
  const [isUserLogged, setIsUserLogged] = useState(false);

  return (
    <header className={styles.main}>
      <div className={styles.header}>
        <Link to="/" aria-label="Hubbly homepage">
          <div className={styles.mainLogo}>
            <img
              src={hubblyLogo}
              className={styles.headerLogo}
              alt="Hubbly logo"
            />
          </div>
        </Link>
        <nav className={styles.userInfo} aria-label="User navigation">
          {!isUserLogged ? (
            <>
              <button
                type="button"
                className={styles.loginButton}
                onClick={() => setIsVisible(true)}
              >
                Log In
              </button>
              {isVisible && (
                <UserLoginModal
                  setIsVisible={setIsVisible}
                  setIsUserLogged={setIsUserLogged}
                  isUserLogged={isUserLogged}
                />
              )}
            </>
          ) : (
            <>
              <Link to="/new-article" aria-label="Create new article">
                <button
                  type="button"
                  className={styles.iconButton}
                  onClick={() => setIsVisible(false)}
                >
                  <IoCreate color="white" size="2.1rem" />
                </button>
              </Link>
              <button
                type="button"
                className={styles.userAvatarButton}
                onClick={() => setIsVisible(true)}
                aria-label={`View profile for ${loggedInUser.username}`}
              >
                <img
                  className={styles.userAvatar}
                  src={loggedInUser.avatar_url}
                  alt={`${loggedInUser.username}'s avatar`}
                />
              </button>
              {isVisible && (
                <UserLoginModal
                  setIsVisible={setIsVisible}
                  setIsUserLogged={setIsUserLogged}
                  isUserLogged={isUserLogged}
                />
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  );
};