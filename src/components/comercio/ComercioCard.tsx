import { Link } from "react-router-dom";
import type { ComercioCard as ComercioCardType } from "../../api/Comercios.api";

type ComercioCardProps = {
  comercio: ComercioCardType;
  className?: string;
};

const ComercioCard = ({ comercio, className }: ComercioCardProps) => {
  const linkClassName = ["redirect", className].filter(Boolean).join(" ");

  return (
    <Link to={`/tiendas/${comercio.slug}`} className={linkClassName}>
      <div className="card-image-section">
        <img src={comercio.banner} alt={comercio.nombre} className="card-main-image" />
      </div>
      <div className="card-info-section">
        <div className="card-header">
          <img src={comercio.logo} alt={`${comercio.nombre} logo`} className="card-logo-img" />
          <div className="card-text">
            <div className="card-title-line">
              <h3>{comercio.nombre}</h3>
              <span className="card-rating-badge">
                <i className="fa-solid fa-star"></i> {comercio.rating}
              </span>
            </div>
            <div className="card-details-line">
              <p>{comercio.descripcion}</p>
              <span className="card-time-badge">
                <i className="fa-solid fa-clock"></i> {comercio.tiempo}
              </span>
              <span className="card-envio-badge">{comercio.envio}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ComercioCard;
