import { useContext, useEffect, useState } from "react"
import { getUsers } from "../services/api";
import { UsersList } from "../components/UsersList";
import { ErrorContext } from "../context/ErrorContext";
import { UserContext } from "../context/UserPageContext";

export const UserPage = () => {

    // const [users, setUsers] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const { error, setErrorMessage } = useContext(ErrorContext);

    // const {loggedInUser, setLoggedInUser} = useContext(UserContext);

    // useEffect(() => {

    //     const fetchUsers = async () => {
    //         try {
    //             const usersData = await getUsers();
    //             setUsers(usersData);
    //             setLoggedInUser(usersData)
    //         } catch (error) {
    //             setErrorMessage(error.message || "Something went wrong!")
    //         } finally {
    //             setLoading(false);
    //         }
    //     }
    //     fetchUsers();
    // }, [setLoggedInUser]);

    // if (loading) {
    //     return <p>loading......</p>
    // }

    return (
        <section className="users-page">
            <UsersList />
        </section>
    )

}
