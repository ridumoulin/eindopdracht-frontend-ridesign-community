import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import isTokenValid from "../helpers/isTokenValid";
import PropTypes from "prop-types";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const [authState, setAuthState] = useState({
        isAuth: false,
        user: null,
        status: "pending",
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token && isTokenValid(token)) {
            void login(token);
        } else {
            setAuthState({
                isAuth: false,
                user: null,
                status: "done",
            });
        }
    }, []);

    async function login(token) {
        localStorage.setItem("token", token);

        console.log("JWT Token:", token);

        try {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.sub;

            const url = `http://localhost:8080/users/${userId}`;

            const response = await axios.get(url, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const userData = response.data;

            setAuthState({
                isAuth: true,
                user: {
                    username: userData.username,
                    email: userData.email,
                },
                status: "done",
            });

            navigate("/profile");
        } catch (error) {
            console.error("Error with login:", error);
            setAuthState({
                isAuth: false,
                user: null,
                status: "done",
            });
        }
    }

    function logout() {
        try {
            localStorage.removeItem("token");
            setAuthState({
                isAuth: false,
                user: null,
                status: "done",
            });
            console.log("User logged out!");
            navigate("/");
        } catch (error) {
            console.error("Error with logout:", error);
        }
    }

    const contextValue = {
        isAuth: authState.isAuth,
        login,
        logout,
        user: authState.user,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {authState.status === "done" ? (
                children
            ) : (
                <p>Loading...</p>
            )}
        </AuthContext.Provider>
    );
}

AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthContextProvider;