import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ComerciosApi, type ComercioCard } from '../../api/Comercios.api';
import '../../components/home/populares/populares.css';
import ComercioCardItem from '../../components/comercio/ComercioCard';
import ComercioCardSkeleton from '../../components/comercio/ComercioCardSkeleton';
import './comercios.css';

const PAGE_SIZE = 12;

const Comercios = () => {
  const navigate = useNavigate();
  const [comercios, setComercios] = useState<ComercioCard[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState('');
  const [nextPage, setNextPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedCategoria, setSelectedCategoria] = useState<string>('todos');
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const isFetchingRef = useRef(false);
  const hasMoreRef = useRef(true);

  const categoriasNav = [
    { slug: 'todos', label: 'Todos' },
    { slug: 'restaurantes', label: 'Restaurantes' },
    { slug: 'tiendas', label: 'Tiendas' },
    { slug: 'supermercados', label: 'Supermercados' },
    { slug: 'comidas-rapidas', label: 'Comidas rápidas' },
  ];

  useEffect(() => {
    hasMoreRef.current = hasMore;
  }, [hasMore]);

  const fetchPage = useCallback(async (page: number) => {
    if (isFetchingRef.current || !hasMoreRef.current) return;

    isFetchingRef.current = true;
    if (page === 1) {
      setInitialLoading(true);
    } else {
      setLoadingMore(true);
    }
    setError('');

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
      setError('No se pudieron cargar los comercios.');
      setHasMore(false);
    } finally {
      setInitialLoading(false);
      setLoadingMore(false);
      isFetchingRef.current = false;
    }
  }, []);

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
        rootMargin: '300px 0px',
        threshold: 0,
      }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [fetchPage, hasMore, nextPage]);

  const comerciosFiltrados =
    selectedCategoria === 'todos'
      ? comercios
      : comercios.filter((c) => c.categoria === selectedCategoria);

  return (
    <div className="comercios-page">
      <div className="comercios-container">
        <div className="populares">
          <h2 className="comercios-title">Todos los comercios</h2>
          {comercios.length > 0 && (
            <button
              type="button"
              className="ver-todo"
              onClick={() => navigate(-1)}
            >
              Ver menos
            </button>
          )}
        </div>

        <nav className="comercios-categorias-nav">
          {categoriasNav.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              className={
                'comercios-categoria-pill' +
                (selectedCategoria === cat.slug ? ' active' : '')
              }
              onClick={() => setSelectedCategoria(cat.slug)}
            >
              {cat.label}
            </button>
          ))}
        </nav>

        {initialLoading ? (
          <div className="comercios-grid">
            {Array.from({ length: 6 }).map((_, index) => (
              <ComercioCardSkeleton key={`comercio-skeleton-${index}`} />
            ))}
          </div>
        ) : comerciosFiltrados.length === 0 ? (
          <p className="comercios-feedback">
            {error || 'No hay comercios disponibles.'}
          </p>
        ) : (
          <div className="comercios-grid">
            {comerciosFiltrados.map((comercio) => (
              <ComercioCardItem
                key={`${comercio.id}-${comercio.slug}`}
                comercio={comercio}
              />
            ))}
          </div>
        )}

        {!initialLoading && hasMore && (
          <div ref={loaderRef} className="comercios-loader-trigger" />
        )}
        {loadingMore && (
          <div className="comercios-grid comercios-grid-loading-more">
            {Array.from({ length: 2 }).map((_, index) => (
              <ComercioCardSkeleton key={`comercio-skeleton-more-${index}`} />
            ))}
          </div>
        )}
        {!initialLoading && comercios.length > 0 && error && (
          <p className="comercios-feedback comercios-feedback-more">{error}</p>
        )}
      </div>
    </div>
  );
};

export default Comercios;
