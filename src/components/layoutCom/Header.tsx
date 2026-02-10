import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";
import CartDrawer from "../cartBuy/carrito-compra";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import LocationSelector from "../Localizacion/localizaciongeo";


interface LocationData {
  name: string;
  lat: number | null;
  lng: number | null;
}

const Header: React.FC = () => {
  const navigate = useNavigate();

  const [abierto, setAbierto] = useState<boolean>(false);

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
            <button
              className="icon-btn"
              onClick={() => setAbierto(!abierto)}
            > <FaShoppingCart />
            </button>

            <CartDrawer abierto={abierto} setAbierto={setAbierto} />
          </div>

          <h1 className="logo">Filo</h1>

          <div className="ubicacion">

            <span>{location.name}</span>

            <LocationSelector onSelect={handleLocationSelect} />
          </div>

          <button className="icon-btn" onClick={handleUserClick}>
            <FaUser />
          </button>
        </div>

        <div className="search-container">
          <IoSearch className="search-icon" />
          <input placeholder="¿Qué se te antoja hoy?" />
        </div>
      </div>

      {/* DESKTOP */}
      <div className="header-desktop">
        <h1 className="logo">Filo</h1>

        <div className="ubicacion">

          <span>{location.name}</span>

          <LocationSelector onSelect={handleLocationSelect} />
        </div>

        <div className="search-container">
          <IoSearch className="search-icon" />
          <input placeholder="¿Qué se te antoja hoy?" />
        </div>

        <div className="nav-links">
          <div className="cart-wrapper">
            <button
              className="icon-btn"
              onClick={() => setAbierto(!abierto)}
            >
              <i><FaShoppingCart /></i>
            </button>

            <CartDrawer abierto={abierto} setAbierto={setAbierto} />
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
