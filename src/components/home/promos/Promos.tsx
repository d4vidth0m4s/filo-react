import React from 'react';
import './promos.css';

const Promos: React.FC = () => {
  return (
    <div className="promos">
      <div className="icono-promo">
        <p className="promos-tag">
          <i className="fa-solid fa-tag"></i>
          Promociones
        </p>
        <p className="pro-text">Por la compra mayor a $ recibe envios gratis</p>
      </div>
    </div>
  );
};

export default Promos;
