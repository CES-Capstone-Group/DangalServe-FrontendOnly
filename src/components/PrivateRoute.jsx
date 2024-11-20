import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Use this import for proper package support.

const PrivateRoute = ({ allowedRoles }) => {
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
        return <Navigate to="/unauthorized" />;
    }

    try {
        const decodedToken = jwtDecode(accessToken);


        const accountType = decodedToken.accountType;

        // Check if the accountType exists and is one of the allowedRoles
        if (!allowedRoles.includes(accountType)) {
            return <Navigate to="/unauthorized" />;
        }

        // Check if the token has expired
        const currentTime = Date.now() / 1000; // Current time in seconds
        if (decodedToken.exp && decodedToken.exp < currentTime) {
            console.warn("Token has expired");
            return <Navigate to="/unauthorized" />;
        }

    } catch (error) {
        console.error("Error decoding token:", error);
        return <Navigate to="/unauthorized" />;
    }

    // If the token is valid, render the child routes
    return <Outlet />;
};

export default PrivateRoute;
