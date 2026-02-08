import type React from "react";
import "./populares.css";
import { Link } from "react-router-dom";
import { tiendas } from "../../../data/tiendas";
 

//filtro llamada api simulado para mostrar solo las tiendas con rating mayor a 4.0
const categorias = tiendas.filter((tienda) => tienda.rating > 4.5);


  const Populares: React.FC = () => {
  return (
    <div className="contenido">
      <div className="populares">
        <h2>Populares cerca de ti</h2>
        <a href="#" className="ver-todo">Ver todo</a>
      </div>
      <div className="icon-populares">
        {categorias.map((categoria) => (
          <Link to={`/tiendas/${categoria.slug}`} key={categoria.slug} className="redirect">
            <div className="card-image-section">
              <img 
                src={categoria.banner} 
                alt={categoria.nombre}
                className="card-main-image"
              />
            </div>
            <div className="card-info-section">
              <div className="card-header">
                <img 
                  src={categoria.logo} 
                  alt={`${categoria.nombre} logo`}
                  className="card-logo-img"
                />
                <div className="card-text">
                  <div className="card-title-line">
                    <h3>{categoria.nombre}</h3>
                    <span className="card-rating-badge">
                      <i className="fa-solid fa-star"></i> {categoria.rating}
                    </span>
                  </div>
                  <div className="card-details-line">
                    <p>{categoria.descripcion}</p>
                    <span className="card-time-badge">
                      <i className="fa-solid fa-clock"></i> {categoria.tiempo}
                    </span>
                    <span className="card-envio-badge">{categoria.envio}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Populares;
