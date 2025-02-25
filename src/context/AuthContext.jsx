import { createContext, useState, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState(""); // Guardar el nombre de usuario

    useEffect(() => {
        const auth = localStorage.getItem("auth");
        const storedUsername = localStorage.getItem("username"); // Recoger el nombre de usuario del localStorage
        if (auth === "true") {
            setIsAuthenticated(true);
            setUsername(storedUsername); // Setear el username cuando el usuario está logueado
        }
    }, []);

    const login = (username, password) => {
        const adminUsername = import.meta.env.VITE_ADMIN_USERNAME;
        const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

        if (username === adminUsername && password === adminPassword) {
            localStorage.setItem("auth", "true");
            localStorage.setItem("username", username);
            setIsAuthenticated(true);
            setUsername(username);
            return true;
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem("auth");
        localStorage.removeItem("username");
        setIsAuthenticated(false);
        setUsername("");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
