import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './header.css';
import { FaUser, FaShoppingCart } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import LocationSelector from '../Localizacion/localizaciongeo';
import { useCart } from '../../context/useCart';
import { tiendas } from '../../data/tiendas';
interface HeaderProps {
  onCartClick: () => void;
}
interface LocationData {
  name: string;
  lat: number | null;
  lng: number | null;
}

const normalizeText = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('recentSearches');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const addRecentSearch = (term: string) => {
    if (!term.trim()) return;
    setRecentSearches((prev) => {
      const newRecent = [term, ...prev.filter((t) => t !== term)].slice(0, 5);
      localStorage.setItem('recentSearches', JSON.stringify(newRecent));
      return newRecent;
    });
  };

  const masBuscados = [...tiendas]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  const resultados =
    query.trim().length > 1
      ? tiendas
          .filter((t) => {
            const q = normalizeText(query);
            const nombre = normalizeText(t.nombre);
            const descripcion = normalizeText(t.descripcion);
            return nombre.includes(q) || descripcion.includes(q);
          })
          .slice(0, 6)
      : [];

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (query.trim().length > 1) {
        addRecentSearch(query);
      }
      if (resultados.length > 0) {
        navigate(`/tiendas/${resultados[0].slug}`);
        setQuery('');
        setShowDropdown(false);
      }
    }
  };
  const navigate = useNavigate();
  const { carrito } = useCart();
  const totalTipos = carrito.length;

  const [location, setLocation] = useState<LocationData>(() => {
    try {
      const saved = localStorage.getItem('userLocation');
      return saved
        ? JSON.parse(saved)
        : { name: 'Ciénaga Magdalena', lat: null, lng: null };
    } catch {
      return { name: 'Ciénaga Magdalena', lat: null, lng: null };
    }
  });

  const handleUserClick = () => {
    const token = localStorage.getItem('token');

    if (token) {
      navigate('/users/');
    } else {
      navigate('/users/login');
    }
  };

  const handleLocationSelect = (loc: LocationData) => {
    setLocation(loc);
    localStorage.setItem('userLocation', JSON.stringify(loc));
  };

  return (
    <header className="header">
      {/* MOBILE */}
      <div className="header-mobile">
        <div className="mobile-top">
          <div className="cart-wrapper">
            <button className="icon-btn" onClick={onCartClick}>
              <i>
                <FaShoppingCart />
              </i>
              {totalTipos > 0 && (
                <span className="carrito-badge">{totalTipos}</span>
              )}
            </button>
          </div>
          <div className="mobile-top-center">
            <Link to="/Filo-Home" className="logo-link">
              <h1 className="logo">Filo</h1>
            </Link>

            <div className="ubicacion">
              <LocationSelector
                onSelect={handleLocationSelect}
                locationName={location.name}
              />
            </div>
          </div>
          <button className="icon-btn user-btn" onClick={handleUserClick}>
            <i>
              <FaUser />
            </i>
          </button>
        </div>

        <div className="search-container">
          <IoSearch className="search-icon" />
          <input
            placeholder="¿Qué se te antoja hoy?"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowDropdown(true);
            }}
            onKeyDown={handleSearch}
            onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
            onFocus={() => setShowDropdown(true)}
          />

          {showDropdown && query.trim().length <= 1 && (
            <div className="search-dropdown suggestions-dropdown">
              {recentSearches.length > 0 && (
                <div className="suggestion-section">
                  <div className="suggestion-header">
                    <span>Recientes</span>
                    <button
                      className="clear-recent-btn"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setRecentSearches([]);
                        localStorage.removeItem('recentSearches');
                      }}
                    >
                      Limpiar
                    </button>
                  </div>
                  {recentSearches.map((term) => (
                    <div
                      key={term}
                      className="suggestion-item"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setQuery(term);
                      }}
                    >
                      <IoSearch className="suggestion-icon-small" />
                      <span>{term}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="suggestion-section">
                <div className="suggestion-header">
                  <span>Lo más buscado</span>
                </div>
                {masBuscados.map((t) => (
                  <Link
                    to={`/tiendas/${t.slug}`}
                    key={t.slug}
                    className="suggestion-item store-suggestion"
                    onClick={() => {
                      addRecentSearch(t.nombre);
                      setQuery('');
                      setShowDropdown(false);
                    }}
                  >
                    <img
                      src={t.logo}
                      alt={t.nombre}
                      className="suggestion-store-logo"
                    />
                    <div className="suggestion-store-info">
                      <span className="suggestion-store-name">{t.nombre}</span>
                      <span className="suggestion-store-category">
                        {t.categoria.replace('-', ' ')}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {showDropdown && resultados.length > 0 && query.trim().length > 1 && (
            <div className="search-dropdown">
              {resultados.map((t) => (
                <Link
                  to={`/tiendas/${t.slug}`}
                  key={t.slug}
                  className="search-dropdown-item"
                  onClick={() => {
                    addRecentSearch(t.nombre);
                    setQuery('');
                    setShowDropdown(false);
                  }}
                >
                  <img
                    src={t.logo}
                    alt={t.nombre}
                    className="search-dropdown-logo"
                  />
                  <div className="search-dropdown-info">
                    <span className="search-dropdown-nombre">{t.nombre}</span>
                    <span className="search-dropdown-desc">
                      {t.descripcion}
                    </span>
                  </div>
                  <span className="search-dropdown-rating">⭐ {t.rating}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* DESKTOP */}
      <div className="header-desktop">
        <div className="header-left">
          <Link to="/Filo-Home" className="logo-link">
            <h1 className="logo">Filo</h1>
          </Link>

          <div className="ubicacion">
            <LocationSelector
              onSelect={handleLocationSelect}
              locationName={location.name}
            />
          </div>
        </div>

        <div className="search-container">
          <IoSearch className="search-icon" />
          <input
            placeholder="¿Qué se te antoja hoy?"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowDropdown(true);
            }}
            onKeyDown={handleSearch}
            onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
            onFocus={() => setShowDropdown(true)}
          />

          {showDropdown && query.trim().length <= 1 && (
            <div className="search-dropdown suggestions-dropdown">
              {recentSearches.length > 0 && (
                <div className="suggestion-section">
                  <div className="suggestion-header">
                    <span>Recientes</span>
                    <button
                      className="clear-recent-btn"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setRecentSearches([]);
                        localStorage.removeItem('recentSearches');
                      }}
                    >
                      Limpiar
                    </button>
                  </div>
                  {recentSearches.map((term) => (
                    <div
                      key={term}
                      className="suggestion-item"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setQuery(term);
                      }}
                    >
                      <IoSearch className="suggestion-icon-small" />
                      <span>{term}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="suggestion-section">
                <div className="suggestion-header">
                  <span>Lo más buscado</span>
                </div>
                {masBuscados.map((t) => (
                  <Link
                    to={`/tiendas/${t.slug}`}
                    key={t.slug}
                    className="suggestion-item store-suggestion"
                    onClick={() => {
                      addRecentSearch(t.nombre);
                      setQuery('');
                      setShowDropdown(false);
                    }}
                  >
                    <img
                      src={t.logo}
                      alt={t.nombre}
                      className="suggestion-store-logo"
                    />
                    <div className="suggestion-store-info">
                      <span className="suggestion-store-name">{t.nombre}</span>
                      <span className="suggestion-store-category">
                        {t.categoria.replace('-', ' ')}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {showDropdown && resultados.length > 0 && query.trim().length > 1 && (
            <div className="search-dropdown">
              {resultados.map((t) => (
                <Link
                  to={`/tiendas/${t.slug}`}
                  key={t.slug}
                  className="search-dropdown-item"
                  onClick={() => {
                    addRecentSearch(t.nombre);
                    setQuery('');
                    setShowDropdown(false);
                  }}
                >
                  <img
                    src={t.logo}
                    alt={t.nombre}
                    className="search-dropdown-logo"
                  />
                  <div className="search-dropdown-info">
                    <span className="search-dropdown-nombre">{t.nombre}</span>
                    <span className="search-dropdown-desc">
                      {t.descripcion}
                    </span>
                  </div>
                  <span className="search-dropdown-rating">⭐ {t.rating}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="nav-links">
          <div className="cart-wrapper">
            <button className="icon-btn" onClick={onCartClick}>
              <i>
                <FaShoppingCart />
              </i>
              {totalTipos > 0 && (
                <span className="carrito-badge">{totalTipos}</span>
              )}
            </button>
          </div>

          <button className="icon-btn" onClick={handleUserClick}>
            <i>
              <FaUser />
            </i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
