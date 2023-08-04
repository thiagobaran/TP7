import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';

const Home = () => {
  const [prodRandom, setProdRandom] = useState([]);
  const [imgRandom, setImgRandom] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    obtenerProductosAleatorios();
  }, []);

  const obtenerProductosAleatorios = () => {
    axios.get('https://dummyjson.com/products')
      .then(res => {
        const productos = res.data.products;
        const indexRandom = getIndexRandom(productos.length, 6);
        const productosAleatorios = indexRandom.map(index => productos[index]);
        setProdRandom(productosAleatorios);

        const imgUrls = productosAleatorios.map(producto => producto.images[0]);
        setImgRandom(imgUrls);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getIndexRandom = (max, count) => {
    const indexes = [];
    while (indexes.length < count) {
      const randomIndex = Math.floor(Math.random() * max);
      if (!indexes.includes(randomIndex)) {
        indexes.push(randomIndex);
      }
    }
    return indexes;
  };

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  return (
    <div>
      <h1>Home</h1>

      <h2>Productos aleatorios</h2>
      <ul>
        {prodRandom.map(producto => (
          <li key={producto.id}><b>{producto.title}</b></li>
        ))}
      </ul>

      <h2>Carousel de imágenes</h2>
      <Carousel activeIndex={activeIndex} onSelect={handleSelect} className="carrusel">
        {imgRandom.map((imageUrl, index) => (
          <Carousel.Item key={index}>
            <img src={imageUrl} alt={`Imagen ${index + 1}`} className="d-block w-100" />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default Home;
