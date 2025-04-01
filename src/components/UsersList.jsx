import { useContext } from "react"
import { UserCard } from "./UserCard"
import { UserContext } from "../context/UserPageContext"

export const UsersList = ({ users }) => {

    console.log(users)

    const {loggedInUser, setLoggedInUser} = useContext(UserContext);

    return (
        <>
            <h2>Users</h2>
            <ul className="users-list">
                {users.map((user) => (
                    <li key={user.username} className="user-item" onClick={() => setLoggedInUser(user)}>
                        <UserCard user={user} />
                    </li>
                ))}
            </ul>
        </>
    )
}