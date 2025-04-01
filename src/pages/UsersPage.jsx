import { useContext, useEffect, useState } from "react"
import { getUsers } from "../services/api";
import { UsersList } from "../components/UsersList";

export const UserPage = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const fetchUsers = async () => {
            try {
                const usersData = await getUsers();
                setUsers(usersData);
            } catch (error) {
                console.error("Error fetching users")
            } finally {
                setLoading(false)
            }
        }
        fetchUsers();
    }, []);

    if (loading) {
        return <p>loading......</p>
    }

    return (
        <section className="users-page">
        <UsersList  users={users}/>

        </section>
    )

}
