import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ComerciosApi, type ComercioCard } from "../api/Comercios.api";
import "../components/home/populares/populares.css";
import "./comercios.css";

const PAGE_SIZE = 12;

const Comercios = () => {
  const [comercios, setComercios] = useState<ComercioCard[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [nextPage, setNextPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const isFetchingRef = useRef(false);
  const hasMoreRef = useRef(true);

  useEffect(() => {
    hasMoreRef.current = hasMore;
  }, [hasMore]);

  const fetchPage = useCallback(
    async (page: number) => {
      if (isFetchingRef.current || !hasMoreRef.current) return;

      isFetchingRef.current = true;
      if (page === 1) {
        setInitialLoading(true);
      } else {
        setLoadingMore(true);
      }
      setError("");

      try {
        const data = await ComerciosApi.getTodos(page, PAGE_SIZE);
        setComercios((prev) => {
          const merged = page === 1 ? data : [...prev, ...data];
          const seen = new Set<string>();
          return merged.filter((item) => {
            const key = `${item.id}-${item.slug}`;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
          });
        });
        setHasMore(data.length === PAGE_SIZE);
        setNextPage(page + 1);
      } catch {
        setError("No se pudieron cargar los comercios.");
        setHasMore(false);
      } finally {
        setInitialLoading(false);
        setLoadingMore(false);
        isFetchingRef.current = false;
      }
    },
    []
  );

  useEffect(() => {
    void fetchPage(1);
  }, [fetchPage]);

  useEffect(() => {
    const target = loaderRef.current;
    if (!target || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        void fetchPage(nextPage);
      },
      {
        root: null,
        rootMargin: "300px 0px",
        threshold: 0,
      }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [fetchPage, hasMore, nextPage]);

  return (
    <div className="comercios-page">
      <div className="comercios-container">
        <h2 className="comercios-title">Todos los comercios</h2>

        {initialLoading ? (
          <p className="comercios-feedback">Cargando comercios...</p>
        ) : comercios.length === 0 ? (
          <p className="comercios-feedback">{error || "No hay comercios disponibles."}</p>
        ) : (
          <div className="comercios-grid">
            {comercios.map((comercio) => (
              <Link to={`/tiendas/${comercio.slug}`} key={`${comercio.id}-${comercio.slug}`} className="redirect">
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
            ))}
          </div>
        )}

        {!initialLoading && hasMore && <div ref={loaderRef} className="comercios-loader-trigger" />}
        {loadingMore && <p className="comercios-feedback comercios-feedback-more">Cargando mas comercios...</p>}
        {!initialLoading && comercios.length > 0 && error && (
          <p className="comercios-feedback comercios-feedback-more">{error}</p>
        )}
      </div>
    </div>
  );
};

export default Comercios;
