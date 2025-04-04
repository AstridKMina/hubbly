import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [loggedInUser, setLoggedInUser] = useState(null);
const navigate = useNavigate();


    const loginUser = (userData , onSuccess) => {
        setLoggedInUser(userData);

        if(onSuccess) {
            onSuccess(userData);
        };

       
    };

    return <UserContext.Provider value={{ loggedInUser: loggedInUser, setLoggedInUser:loginUser}}>
        {children}
    </UserContext.Provider>

};


