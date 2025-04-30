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
                console.log(loggedInUser, "usuarios")

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
            console.log(user, "el usuario")
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

        console.log(user, "mi user, vos sabes")
    };


    return (
        <div className={isUserLogged ? styles.userDropdownModal : styles.loginModal}>
            <div className={styles.modalContent}>
                {isUserLogged ? (
                    <>
                        <h1>{loggedInUser.username}</h1>
                        <button className={styles.modalCloseButton} onClick={() => setIsVisible(false)}>X</button>
                        <div>
                            <img src={loggedInUser.avatar_url} alt={`${loggedInUser.username}'s avatar`} />
                        </div>
                        <nav className={styles.dropdownNav}>
                            <button
                                onClick={() => {
                                    setIsVisible(false);
                                    navigate(`/users/${loggedInUser.username}`);
                                }}
                                className={styles.dropdownItem}
                            >
                                <span className={styles.iconTextWrapper}>
                                    <CgProfile />
                                    <span>View Profile</span>
                                </span>
                            </button>


                            <button className={styles.dropdownItem}>
                                <span className={styles.iconTextWrapper}><CgDarkMode /> <span>Dark Mode</span></span>
                            </button>

                            <button
                                onClick={() => {
                                    setIsVisible(false);
                                    setLoggedInUser(null);
                                    setIsUserLogged(false);
                                }}
                                className={styles.dropdownItem}
                            >
                                <span className={styles.iconTextWrapper}><LuLogOut /> <span>Log Out</span></span>
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
                            &times;
                        </button>

                        <h1 className={styles.modalTitle}>Log In</h1>

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
                                    aria-describedby="usernameHelp"
                                />
                            </fieldset>

                            <fieldset className={styles.formGroup}>
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Enter your password"
                                    required
                                />
                            </fieldset>

                            {err && <p className={styles.errorMessage}>{err}</p>}
                            <fieldset>
                                <button type="submit" className={styles.actionButton}>Log In</button>
                            </fieldset>
                        </form>
                    </>
                )}
            </div>
        </div>
    )
}