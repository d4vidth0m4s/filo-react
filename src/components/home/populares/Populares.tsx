import { useEffect, useState } from "react";
import "./populares.css";
import { Link } from "react-router-dom";
import { ComerciosApi, type ComercioCard } from "../../../api/Comercios.api";
import ComercioCardItem from "../../comercio/ComercioCard";
import ComercioCardSkeleton from "../../comercio/ComercioCardSkeleton";

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
        <div className="icon-populares">
          {Array.from({ length: 5 }).map((_, index) => (
            <ComercioCardSkeleton key={`popular-skeleton-${index}`} />
          ))}
        </div>
      ) : error ? (
        <p className="populares-feedback">{error}</p>
      ) : comercios.length === 0 ? (
        <p className="populares-feedback">No hay comercios populares disponibles.</p>
      ) : (
        <div className="icon-populares">
          {comercios.map((categoria) => (
            <ComercioCardItem key={`${categoria.id}-${categoria.slug}`} comercio={categoria} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Populares;
