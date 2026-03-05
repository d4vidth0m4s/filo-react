import { useEffect, useState } from "react";
import "./populares.css";
import { Link } from "react-router-dom";
import { ComerciosApi, type ComercioCard } from "../../../api/Comercios.api";

const Populares = () => {
  const [comercios, setComercios] = useState<ComercioCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const fetchComercios = async () => {
      try {
        setLoading(true);
        const data = await ComerciosApi.getPopulares();
        if (!active) return;
        setComercios(data);
      } catch {
        if (!active) return;
        setError("No se pudieron cargar los comercios populares.");
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchComercios();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="contenido">
      <div className="populares">
        <h2>Populares cerca de ti</h2>
        <Link className="ver-todo" to="/comercios">
          Ver todo
        </Link>
      </div>

      {loading ? (
        <p className="populares-feedback">Cargando comercios...</p>
      ) : error ? (
        <p className="populares-feedback">{error}</p>
      ) : comercios.length === 0 ? (
        <p className="populares-feedback">No hay comercios populares disponibles.</p>
      ) : (
        <div className="icon-populares">
          {comercios.map((categoria) => (
            <Link to={`/tiendas/${categoria.slug}`} key={`${categoria.id}-${categoria.slug}`} className="redirect">
              <div className="card-image-section">
                <img src={categoria.banner} alt={categoria.nombre} className="card-main-image" />
              </div>
              <div className="card-info-section">
                <div className="card-header">
                  <img src={categoria.logo} alt={`${categoria.nombre} logo`} className="card-logo-img" />
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
      )}
    </div>
  );
};

export default Populares;
