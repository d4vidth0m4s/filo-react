import { useParams, Link } from 'react-router-dom';
import { tiendas } from '../data/tiendas';
import './CategoriaTiendas.css';

const nombres: Record<string, string> = {
  'restaurantes': 'Restaurantes',
  'tiendas': 'Tiendas',
  'supermercados': 'Supermercados',
  'comidas-rapidas': 'Comidas Rápidas',
};

const CategoriaTiendas = () => {
  const { slug } = useParams();
  const filtradas = tiendas.filter((t) => t.categoria === slug);

  return (
    <div className="cat-container">
      <h2 className="cat-titulo">{nombres[slug || ''] || slug}</h2>

      {filtradas.length === 0 ? (
        <p className="cat-vacio">No hay tiendas en esta categoría.</p>
      ) : (
        <div className="cat-grid">
          {filtradas.map((t) => (
            <Link to={`/tiendas/${t.slug}`} key={t.slug} className="redirect">
              <div className="card-image-section">
                <img src={t.banner} alt={t.nombre} className="card-main-image" />
              </div>
              <div className="card-info-section">
                <div className="card-header">
                  <img src={t.logo} alt={t.nombre} className="card-logo-img" />
                  <div className="card-text">
                    <div className="card-title-line">
                      <h3>{t.nombre}</h3>
                      <span className="card-rating-badge">⭐ {t.rating}</span>
                    </div>
                    <div className="card-details-line">
                      <p>{t.descripcion}</p>
                      <span className="card-time-badge">🕐 {t.tiempo}</span>
                      <span className="card-envio-badge">{t.envio}</span>
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

export default CategoriaTiendas;