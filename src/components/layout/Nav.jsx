import { useState } from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="nav">
      <button className="toggle-btn" onClick={toggleMenu}>☰</button>
      <ul className={isOpen ? 'active' : ''}>
        <li><Link to="/inicio">inicio</Link></li>
        <li><Link to="/articulos">articulos</Link></li>
        <li><Link to="/crear">Crear articulos</Link></li>
        <li><Link to="/about">Quienes somos</Link></li>
      </ul>
    </nav>
  );
};

export default Nav;
