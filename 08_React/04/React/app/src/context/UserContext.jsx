
import React, {
    createContext,
    useContext,
    useState
} from "react";

const UserContext = createContext(null);

export function UserProvider({ children }) {

    const [username, setUsername] = useState("Ajay");

    return (

        <UserContext.Provider value={{ username, setUsername }} >

            {children}

        </UserContext.Provider>

    );

}

export function useUser() {

    const context = useContext(UserContext);

    if (!context) {

        throw new Error(
            "useUser must be inside UserProvider"
        );

    }

    return context;

}
