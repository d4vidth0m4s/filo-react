import { useEffect, useRef, useState } from "react";
import "./populares.css";
import { Link } from "react-router-dom";
import { ComerciosApi, type ComercioCard } from "../../../api/Comercios.api";
import ComercioCardItem from "../../comercio/ComercioCard";
import ComercioCardSkeleton from "../../comercio/ComercioCardSkeleton";

const Populares = () => {
  const [comercios, setComercios] = useState<ComercioCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleScrollLeft = () => {
    const container = scrollRef.current;
    if (!container) return;

    const firstCard = container.querySelector(".redirect") as HTMLElement | null;
    const step = firstCard ? firstCard.offsetWidth + 16 : container.clientWidth;
    const target = Math.max(container.scrollLeft - step, 0);

    container.scrollTo({ left: target, behavior: "smooth" });
  };

  const handleScrollRight = () => {
    const container = scrollRef.current;
    if (!container) return;

    const firstCard = container.querySelector(".redirect") as HTMLElement | null;
    const step = firstCard ? firstCard.offsetWidth + 16 : container.clientWidth;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    const target = Math.min(container.scrollLeft + step, maxScrollLeft);

    container.scrollTo({ left: target, behavior: "smooth" });
  };

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
        <div className="icon-populares-wrapper">
          <button
            type="button"
            className="populares-scroll-btn populares-scroll-btn-left"
            onClick={handleScrollLeft}
            aria-label="Ver comercios anteriores"
          >
            ‹
          </button>
          <div className="icon-populares" ref={scrollRef}>
            {comercios.map((categoria) => (
              <ComercioCardItem key={`${categoria.id}-${categoria.slug}`} comercio={categoria} />
            ))}
          </div>
          <button
            type="button"
            className="populares-scroll-btn populares-scroll-btn-right"
            onClick={handleScrollRight}
            aria-label="Ver más comercios"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
};

export default Populares;
