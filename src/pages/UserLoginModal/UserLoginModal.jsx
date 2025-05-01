import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserPageContext";
import { ErrorContext } from "../../context/ErrorContext";
import { getUsers } from "../../services/api";
import { useNavigate } from "react-router-dom";
import styles from "./UserLoginModal.module.css";
import { CgProfile } from "react-icons/cg";
import { LuLogOut } from "react-icons/lu";
import { CgDarkMode } from "react-icons/cg";


export const UserLoginModal = ({ setIsVisible, setIsUserLogged, isUserLogged }) => {
    const [user, setUser] = useState("")


    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { error, setErrorMessage } = useContext(ErrorContext);
    const [err, setErr] = useState("");

    const { loggedInUser, setLoggedInUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {

        const fetchUsers = async () => {
            try {
                const usersData = await getUsers();
                setUsers(usersData);
            } catch (error) {
                setErrorMessage(error.message || "Something went wrong!")
            } finally {
                setLoading(false);
            }
        }
        fetchUsers();
    }, [setUser]);



    const handleUsername = (e) => {
        setErr("")
        setLoggedInUser(null)
        e.preventDefault()
        const userName = e.target.value;

        setUser(userName)
        console.log(loggedInUser, "usuarios")
    }

    const handleLogin = (e) => {
        e.preventDefault();

        if (users.length > 0) {
            const myUser = users.find((userLog) => userLog.username === user);
            if (myUser) {
                setLoggedInUser(myUser);
                setIsUserLogged(true)
                setIsVisible(false)
            } else {
                setIsUserLogged(false)
                setErr("User doesn't exist")
                console.log(loggedInUser, "usuarios")

                console.log("Usuario no encontrado");

            }
        }

    };


    return (
        <div
          className={isUserLogged ? styles.userDropdownModal : styles.loginModal}
          role="dialog"
          aria-labelledby={isUserLogged ? 'user-profile-title' : 'login-title'}
          aria-modal="true"
        >
          <div className={styles.modalContent}>
            {isUserLogged ? (
              <>
                <h1 id="user-profile-title">{loggedInUser.username}</h1>
                <button
                  className={styles.modalCloseButton}
                  aria-label="Close user profile modal"
                  onClick={() => setIsVisible(false)}
                >
                  X
                </button>
                <div>
                  <img
                    src={loggedInUser.avatar_url}
                    alt={`${loggedInUser.username}'s avatar`}
                  />
                </div>
                <nav className={styles.dropdownNav} aria-label="User profile options">
                  <button
                    type="button"
                    onClick={() => {
                      setIsVisible(false);
                      navigate(`/users/${loggedInUser.username}`);
                    }}
                    className={styles.dropdownItem}
                    aria-label={`View profile for ${loggedInUser.username}`}
                  >
                    <span className={styles.iconTextWrapper}>
                      <CgProfile />
                      <span>View Profile</span>
                    </span>
                  </button>
      
                  <button
                    type="button"
                    className={styles.dropdownItem}
                    aria-label="Toggle dark mode"
                  >
                    <span className={styles.iconTextWrapper}>
                      <CgDarkMode />
                      <span>Dark Mode</span>
                    </span>
                  </button>
      
                  <button
                    type="button"
                    onClick={() => {
                      setIsVisible(false);
                      setLoggedInUser(null);
                      setIsUserLogged(false);
                    }}
                    className={styles.dropdownItem}
                    aria-label="Log out"
                  >
                    <span className={styles.iconTextWrapper}>
                      <LuLogOut />
                      <span>Log Out</span>
                    </span>
                  </button>
                </nav>
              </>
            ) : (
              <>
                <button
                  className={styles.modalCloseButton}
                  aria-label="Close login modal"
                  onClick={() => setIsVisible(false)}
                >
                  ×
                </button>
      
                <h1 className={styles.modalTitle} id="login-title">
                  Log In
                </h1>
      
                <form className={styles.modalForm} onSubmit={handleLogin}>
                  <fieldset className={styles.formGroup}>
                    <label htmlFor="username">Username</label>
                    <input
                      value={user}
                      type="text"
                      id="username"
                      placeholder="Enter your username"
                      required
                      onChange={handleUsername}
                      aria-describedby={err ? 'login-error' : 'usernameHelp'}
                    />
                    <span id="usernameHelp" className={styles.srOnly}>
                      Enter your username to log in
                    </span>
                  </fieldset>
      
                  <fieldset className={styles.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      placeholder="Enter your password"
                      required
                      aria-describedby={err ? 'login-error' : undefined}
                    />
                  </fieldset>
      
                  {error && (
                    <p id="login-error" className={styles.errorMessage}>
                      {error}
                    </p>
                  )}
                  <fieldset>
                    <button type="submit" className={styles.actionButton}>
                      Log In
                    </button>
                  </fieldset>
                </form>
              </>
            )}
          </div>
        </div>
      );
}