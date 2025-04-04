import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserPageContext";
import { ErrorContext } from "../context/ErrorContext";
import { getUsers } from "../services/api";

export const UserLoginModal = ({ setIsVisible, setIsUserLogged, isUserLogged }) => {
    const [user, setUser] = useState("")


    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { error, setErrorMessage } = useContext(ErrorContext);
    const [err, setErr] = useState("");

    const { loggedInUser, setLoggedInUser } = useContext(UserContext);


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
        // if (loggedInUser) {

        // } else {

        // }
    }


    // if (loading) {
    //     return <p>
    //         loading......
    //     </p>
    // }


    return (
        <div className={isUserLogged ? "modal-container2" : "modal-container"}>
            <div className="modal-content">
                {isUserLogged ? <>

                    <h1>{loggedInUser.username}</h1>
                    <button className="modal-close-button" onClick={() => setIsVisible(false)}>X</button>
                    <div>
                        <img src={loggedInUser.avatar_url} alt={`${loggedInUser.username}'s avatar`} />
                        <p>View Profile</p>
                    </div>
                    <p>Dark Mode</p>
                    <p onClick={() => {
                        setIsVisible(false)
                        setLoggedInUser(null)
                        setIsUserLogged(false)
                    }} > Log Out</p>
                </>
                    :
                    <>
                        <>
                            <button
                                className="modal-close-button"
                                aria-label="Close login modal"
                                onClick={() => setIsVisible(false)}
                            >
                                &times;
                            </button>

                            <h1 className="modal-title">Log In</h1>

                            <form className="modal-form" onSubmit={handleLogin}>
                                <fieldset className="form-group">
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

                                <fieldset className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        placeholder="Enter your password"
                                        required
                                    />
                                </fieldset>

                                {err && <p className="error-message">{err}</p>}

                                <button type="submit" className="submit-button">Log In</button>
                            </form>
                        </>
                    </>
                }
            </div>
        </div>
    );
};
