import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'; // Asegúrate de importar el AuthContext
const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, username, logout } = useContext(AuthContext); // Accedemos al nombre de usuario y estado de autenticación

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="nav">
      <button className="toggle-btn" onClick={toggleMenu}>☰</button>
      <ul className={isOpen ? 'active' : ''}>
        <li><Link to="/inicio">Inicio</Link></li>
        <li><Link to="/articulos">Artículos</Link></li>
        {isAuthenticated && <li><Link to="/crear">Crear artículos</Link></li>}
        <li><Link to="/about">Quienes somos</Link></li>

        {/* Mostrar el nombre de usuario y el botón de cerrar sesión si está autenticado */}
        {isAuthenticated ? (
          <>
            <span className='welcome'>Bienvenidas, {username}</span>
            <li><button className='cerrar-sesion' onClick={logout}>Salir</button></li>
          </>
        ) : (
          <li><Link to="/login">Iniciar sesión</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;