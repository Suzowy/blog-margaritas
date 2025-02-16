import { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Inicio from '../components/pages/Inicio';
import Articulos from '../components/pages/Articulos';
import Header from '../components/layout/Header';
import Nav from '../components/layout/Nav';
import Sidebar from '../components/layout/Sidebar'; // Sidebar aquí
import Footer from '../components/layout/Footer';
import Crear from '../components/pages/Crear';
import Busqueda from '../components/pages/Busqueda';
import Articulo from '../components/pages/Articulo';
import Editar from '../components/pages/Editar';
import About from '../components/pages/About';
import Global from '../helpers/Global';
import { Peticion } from '../helpers/Peticion';

export const Rutas = () => {
  const [articulos, setArticulos] = useState([]);

  useEffect(() => {
    conseguirUltimosArticulos();
  }, []);

  const conseguirUltimosArticulos = async () => {
    const { datos } = await Peticion(Global.url + "articulos", "GET");
    if (datos.status === "success") {
      setArticulos(datos.articulos); // Obtener todos los artículos
    }
  };
  
  return (
    <BrowserRouter>
      <Header />
      <Nav />
      <section id="content" className='content'>
        <Routes>
          <Route path='/' element={<Inicio />} />
          <Route path='/inicio' element={<Inicio />} />
          <Route path='/articulos' element={<Articulos />} />
          <Route path='/crear' element={<Crear />} />
          <Route path='/editar/:id' element={<Editar />} />
          <Route path='/buscar/:busqueda' element={<Busqueda />} />
          <Route path='/articulo/:id' element={<Articulo />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </section>
      <Sidebar articulos={articulos} />
      <Footer />
    </BrowserRouter>
  )
}
