import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Paginas/Home';
import Productos from './Paginas/Productos';
import DetalleProducto from './Paginas/DetalleProducto'; 
import Contacto from './Paginas/Contacto';
import './App.css'; 

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <ul className="nav-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/productos">Productos</Link>
              </li>
              <li>
                <Link to="/contacto">Contacto</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="App-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/productos/:id" element={<DetalleProducto />} />
            <Route path="/contacto" element={<Contacto />} />
          </Routes>
        </main>
        <footer className="App-footer">
          &copy; {new Date().getFullYear()} Barana's Co.
        </footer>
      </div>
    </Router>
  );
}

export default App;
