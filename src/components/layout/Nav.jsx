import { useState } from "react";
import { Link } from "react-router-dom";


const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header>
      {/* Checkbox oculto para controlar el menú */}
      <input 
        type="checkbox" 
        id="checkbox" 
        checked={isOpen} 
        onChange={() => setIsOpen(!isOpen)} 
      />

      {/* Botón de menú hamburguesa */}
      <label htmlFor="checkbox" className="menu-toggle">
        <div className={`bars ${isOpen ? "open-bar1" : ""}`} id="bar1"></div>
        <div className={`bars ${isOpen ? "open-bar2" : ""}`} id="bar2"></div>
        <div className={`bars ${isOpen ? "open-bar3" : ""}`} id="bar3"></div>
      </label>

      {/* Menú de navegación */}
      <nav className={isOpen ? "open" : ""}>
        <ul>
          <li><Link to="/inicio" onClick={() => setIsOpen(false)}>Inicio</Link></li>
          <li><Link to="/articulos" onClick={() => setIsOpen(false)}>Artículos</Link></li>
          <li><Link to="/crear" onClick={() => setIsOpen(false)}>Crear Artículos</Link></li>
          <li><Link to="/about" onClick={() => setIsOpen(false)}>Quiénes Somos</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
