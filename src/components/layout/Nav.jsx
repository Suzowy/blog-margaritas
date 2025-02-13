import { Link } from "react-router-dom"


const Nav = () => {

    return (
      <nav className="nav">
      <ul>
          <li><Link to="/inicio">inicio</Link></li>
          <li> <Link to="/articulos">articulos</Link></li>
          <li><Link to="/crear">Crear articulos</Link></li>
          <li><Link to="/about">Quienes somos </Link></li>
      </ul>
  </nav>
    )

}

export default Nav
