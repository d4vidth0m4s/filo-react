import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./header.css";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import LocationSelector from "../Localizacion/localizaciongeo";
import { useCart } from "../../context/cartContext";

interface HeaderProps {
  onCartClick: () => void;
}
interface LocationData {
  name: string;
  lat: number | null;
  lng: number | null;
}


const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  const navigate = useNavigate();
  const { carrito } = useCart();
  const totalTipos = carrito.length;

  const [location, setLocation] = useState<LocationData>(() => {
    try {
      const saved = localStorage.getItem("userLocation");
      return saved
        ? JSON.parse(saved)
        : { name: "Ciénaga Magdalena", lat: null, lng: null };
    } catch {
      return { name: "Ciénaga Magdalena", lat: null, lng: null };
    }
  });

  const handleUserClick = () => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/users/");
    } else {
      navigate("/users/login");
    }
  };

  const handleLocationSelect = (loc: LocationData) => {
    setLocation(loc);
    localStorage.setItem("userLocation", JSON.stringify(loc));
  };

  return (
    <header className="header">
      {/* MOBILE */}
      <div className="header-mobile">
        <div className="mobile-top">
          <div className="cart-wrapper">
            <button className="icon-btn" onClick={onCartClick}>
              <i><FaShoppingCart /></i>
              {totalTipos > 0 && (
                <span className="carrito-badge">{totalTipos}</span>
              )}
            </button>
          </div>

          <Link to="/Filo-Home" className="logo-link">
            <h1 className="logo">Filo</h1>
          </Link>

          <div className="ubicacion">
            <LocationSelector onSelect={handleLocationSelect} locationName={location.name} />
          </div>

          <button className="icon-btn user-btn" onClick={handleUserClick}>
            <i><FaUser /></i>
          </button>
        </div>

        <div className="search-container">
          <IoSearch className="search-icon" />
          <input placeholder="¿Qué se te antoja hoy?" />
        </div>
      </div>

      {/* DESKTOP */}
      <div className="header-desktop">
        <div className="header-left">
          <Link to="/Filo-Home" className="logo-link">
            <h1 className="logo">Filo</h1>
          </Link>

          <div className="ubicacion">
            <LocationSelector onSelect={handleLocationSelect} locationName={location.name} />
          </div>
        </div>

        <div className="search-container">
          <IoSearch className="search-icon" />
          <input placeholder="¿Qué se te antoja hoy?" />
        </div>

        <div className="nav-links">
          <div className="cart-wrapper">
            <button className="icon-btn" onClick={onCartClick}>
              <i><FaShoppingCart /></i>
              {totalTipos > 0 && (
                <span className="carrito-badge">{totalTipos}</span>
              )}
            </button>
          </div>

          <button className="icon-btn" onClick={handleUserClick}>
            <i><FaUser /></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
