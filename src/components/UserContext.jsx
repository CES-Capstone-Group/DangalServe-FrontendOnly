import React, { createContext, useState, useContext } from 'react';

// Create a context for the user
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
    const [loggedUser, setLoggedUser] = useState("");

    return (
    <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
        {children}
    </UserContext.Provider>
    );
};  

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);
