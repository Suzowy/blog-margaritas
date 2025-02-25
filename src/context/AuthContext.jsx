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
            localStorage.setItem("username", username); // Guardamos el nombre de usuario en localStorage
            setIsAuthenticated(true);
            setUsername(username); // Seteamos el username en el estado
            return true;
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem("auth");
        localStorage.removeItem("username"); // Limpiamos el nombre de usuario en el logout
        setIsAuthenticated(false);
        setUsername(""); // Limpiamos el estado
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
