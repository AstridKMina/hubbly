import { useContext, useState } from "react";
import { UserContext } from "../../context/UserPageContext";
import { UserLoginModal } from "../../pages/UserLoginModal/UserLoginModal";
import { Link } from "react-router-dom";

import { IoCreate } from "react-icons/io5";
import styles from "./Header.module.css";
import hubblyLogo from "../../assets/hubbly.png"

export const Header = () => {
    const { loggedInUser } = useContext(UserContext);
    const [isVisible, setIsVisible] = useState(false);
    const [isUserLogged, setIsUserLogged] = useState(false);

    return (
        <header className={styles.main}>
            <div className={styles.header}>
            <Link to={"/"}>
                <div className={styles.mainLogo}>
                  <img src={hubblyLogo} className={styles.headerLogo} alt="header-logo" />
                </div>
                </Link>
                <nav className={styles.userInfo}>
                    {!isUserLogged ? (
                        <>
                            <button className={styles.loginButton} onClick={() => setIsVisible(true)}>
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
                        <Link to={"/new-article"} onClick={()=> setIsVisible(false)}>
                         <button className={styles.iconButton} ><IoCreate color="white"  size="2.1rem"/></button>
                         </Link>
                            <img 
                                className={styles.userAvatar}
                                src={loggedInUser.avatar_url} 
                                alt={`${loggedInUser.username}'s avatar`} 
                                onClick={() => setIsVisible(true)} 
                            />

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