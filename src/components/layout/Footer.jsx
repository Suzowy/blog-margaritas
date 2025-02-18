
import { Instagram, Twitter, Globe } from "lucide-react";
import {Link} from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      {/* Redes Sociales */}
      <div>
        <h5>Síguenos en nuestras redes sociales</h5>
        <div className="redes">
          <a
            href="https://www.instagram.com/margaritas_a_medianoche/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ad5c70] hover:text-[#52423c] transition-colors"
          >
            <Instagram size={24} />
          </a>
          <a
            href="#"
            className="text-[#ad5c70] hover:text-[#52423c] transition-colors"
          >
            <Twitter size={24} />
          </a>
          <a
            href="https://margaritasamedianoche.wordpress.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ad5c70] hover:text-[#52423c] transition-colors"
          >
            <Globe size={24} />
          </a>
        </div>
      </div>

      {/* Logo */}
      <div className="logo">
        <h1 className="title">Margaritas a medianoche</h1>
      </div>

      <div>
        <ul className="datos">
          <li>
          <Link to="/about" className="underline">
              ¿Quiénes somos?
            </Link>
          </li>
        </ul>
      </div>

      {/* Derechos Reservados */}
      <div className="copy">
        <p>COPYRIGHT &copy; Margaritas a medianoche • Navarra based • 2022 • All Rights Reserved</p>
        <p>
          Designed by{" "}
          <a href="https://github.com/Suzowy" className="github">
            Suzowy
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
