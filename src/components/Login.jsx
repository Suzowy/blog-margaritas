import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const adminUsername = import.meta.env.VITE_ADMIN_USERNAME;
        const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

        if (email === adminUsername && password === adminPassword) {
            login(email, password);
            navigate("/");
        } else {
            alert("Credenciales incorrectas");
        }
    };

    return (
        <>
            <h2 className="crear-h2">Iniciar sesión</h2>
            <form className="formulario-login" onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="email">Usuario <span>*</span></label>
                    <input
                        type="text"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                        placeholder="Escribe tu usuario"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Contraseña <span>*</span></label>
                    <input
                        type="password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                        placeholder="Escribe tu contraseña"
                    />
                </div>

                <button type="submit" className="form-button">Iniciar sesión</button>
            </form>
        </>
    );
};

export default Login;
