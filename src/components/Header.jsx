import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserPageContext";
import { UserLoginModal } from "../pages/UserLoginModal";

export const Header = () => {
    const { loggedInUser } = useContext(UserContext);
    const [isVisible, setIsVisible] = useState(false);
    const [isUserLogged, setIsUserLogged] = useState(false);

    return (
        <header className="main-header">
            <div className="header-container">
            
                <div className="logo">
                    <h1> 🤩 Hubbly</h1>
                </div>

                <nav className="user-info">
                    {!isUserLogged ? (
                        <>
                            <button className="login-button" onClick={() => setIsVisible(true)}>
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
                         <h1>✍🏾</h1>
                            <img 
                                className="user-header-avatar" 
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