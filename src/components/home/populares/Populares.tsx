import type React from "react";
import "./populares.css";
import { Link } from "react-router-dom";
 

const categorias = [
    {
      slug: "comida-rapida",
      titulo: "Comida Rápida",
      descripcion: "Comidas rápidas",
      imagen: "https://placehold.co/50/00c853/ffffff?text=CF",
      logo: "https://placehold.co/50/00c853/ffffff?text=CF",
      rating: 4.5,
      tiempo: "20-30 min",
      envio: "Gratis"
    },
    {
      slug: "restaurantes",
      titulo: "Restaurantes",
      descripcion: "Restaurantes variados",
      imagen: "https://placehold.co/50/00c853/ffffff?text=R",
      logo: "https://placehold.co/50/00c853/ffffff?text=R",
      rating: 4.8,
      tiempo: "30-40 min",
      envio: "Gratis"
    },
    {
      slug: "supermercados",
      titulo: "Supermercados",
      descripcion: "Todo en un lugar",
      imagen: "https://placehold.co/50/00c853/ffffff?text=S",
      logo: "https://placehold.co/60/00c853/white?text=S",
      rating: 4.6,
      tiempo: "15-25 min",
      envio: "$2.000"
    },
    { 
      slug: "cebolleros",
      titulo: "Cebolleros",
      descripcion: "Perros calientes",
      imagen: "https://placehold.co/50/00c853/ffffff?text=C",
      logo: "https://placehold.co/60/00c853/white?text=C",
      rating: 4.7,
      tiempo: "10-15 min",
      envio: "Gratis"
    },
    {
      slug: "demoradas-dinas",
      titulo: "Demoradas Dinas",
      descripcion: "Comidas demoradas",
      imagen: "https://placehold.co/50/00c853/ffffff?text=DD",
      logo: "https://placehold.co/60/00c853/white?text=DD",
      rating: 4.4,
      tiempo: "45-60 min",
      envio: "$3.000"
    },
    {
      slug: "gordo-burguez",
      titulo: "Gordo Burguez",
      descripcion: "Salchipapas",
      imagen: "https://placehold.co/50/00c853/ffffff?text=GB",
      logo: "https://placehold.co/50/00c853/ffffff?text=GB",
      rating: 4.9,
      tiempo: "15-20 min",
      envio: "Gratis"
    }
  ];
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
                src={categoria.imagen} 
                alt={categoria.titulo}
                className="card-main-image"
              />
            </div>
            <div className="card-info-section">
              <div className="card-header">
                <img 
                  src={categoria.logo} 
                  alt={`${categoria.titulo} logo`}
                  className="card-logo-img"
                />
                <div className="card-text">
                  <div className="card-title-line">
                    <h3>{categoria.titulo}</h3>
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