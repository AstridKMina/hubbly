import { useContext } from "react";
import { Link } from "react-router-dom"
import { UserContext } from "../context/UserPageContext";

export const Header = () => {

        const {loggedInUser, setLoggedInUser,} = useContext(UserContext);

       const isUserLogged = (loggedInUser && Object.keys(loggedInUser).length > 0)

    return (
        <header className="main-header">
           
            {!isUserLogged ?  <Link to={"/users"} ><h4>Log in</h4>   </Link> : <>
                <img className="user-header-avatar" src={loggedInUser.avatar_url} alt={`${loggedInUser.username}'s avatar`} />
                <h4>{loggedInUser.username}</h4>
            </>}
          
            
        </header>
    )
}