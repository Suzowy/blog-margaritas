import { useState, useEffect, useContext } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
// import Inicio from '../components/pages/Inicio';
import Articulos from '../components/pages/Articulos';
import Header from '../components/layout/Header';

import Sidebar from '../components/layout/Sidebar';
import Footer from '../components/layout/Footer';
import Crear from '../components/pages/Crear';
import Busqueda from '../components/pages/Busqueda';
import Articulo from '../components/pages/Articulo';
import Editar from '../components/pages/Editar';
import About from '../components/pages/About';
import Login from '../components/Login';
import Global from '../helpers/Global';
import { Peticion } from '../helpers/Peticion';
import { AuthContext } from '../context/AuthContext';

export const Rutas = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [articulos, setArticulos] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    conseguirUltimosArticulos();
  }, []);

  const conseguirUltimosArticulos = async () => {
    const { datos } = await Peticion(Global.url + "articulos", "GET");
    if (datos.status === "success") {
      setArticulos(datos.articulos);
    }
  };
  
  return (
    <BrowserRouter>
      <Header />
    
      <section id="content" className='content'>
        <Routes>
          {/* <Route path='/' element={<Inicio />} />
          <Route path='/inicio' element={<Inicio />} /> */}
          <Route path='/articulos' element={<Articulos />} />
          <Route path='/about' element={<About />} />
          <Route path='/buscar/:busqueda' element={<Busqueda />} />
          <Route path='/articulo/:id' element={<Articulo />} />
          <Route path='/login' element={<Login />} />
          
          {/* ✅ Rutas protegidas */}
          <Route path='/crear' element={isAuthenticated ? <Crear /> : <Navigate to="/login" />} />
          <Route path='/editar/:id' element={isAuthenticated ? <Editar /> : <Navigate to="/login" />} />
        </Routes>
      </section>
      <Sidebar articulos={articulos} />
      <Footer />
    </BrowserRouter>
  )
}
