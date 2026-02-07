import { useParams } from "react-router-dom";
import { tiendas } from "../../data/tiendas";
import "./tiendaPerfil.css";
import BackBotton from "../../components/backBotton/BackBotton";

const TiendaPerfil = () => {
  const { slug } = useParams();

  const tienda = tiendas.find(t => t.slug === slug);

  if (!tienda) {
    return <h2 className="tienda-error">Tienda no encontrada</h2>;
  }

  return (
    <div className="tienda-page">
     <BackBotton modo="back" />
      <div
        className="tienda-banner"
        style={{ backgroundImage: `url(${tienda.banner})` }}
      >
        <div className="tienda-overlay">
          <img src={tienda.logo} alt={tienda.nombre} className="tienda-logo" />
          <h1>{tienda.nombre}</h1>
          <p>{tienda.descripcion}</p>

          <div className="tienda-info">
            <span>⭐ {tienda.rating}</span>
            <span>⏱ {tienda.tiempo}</span>
            <span>🚚 {tienda.envio}</span>
          </div>
        </div>
      </div>

      <div className="tienda-categorias">
        {tienda.categorias.map((cat, i) => (
          <button key={i}>{cat}</button>
        ))}
      </div>

      <div className="tienda-productos">
        {tienda.productos.map((prod) => (
          <div key={prod.id} className="producto-card">
            <img src={prod.imagen} alt={prod.nombre} />
            <div className="producto-info">
              <h3>{prod.nombre}</h3>
              <p>{prod.descripcion}</p>
              <span>${prod.precio}</span>
              <button>Agregar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TiendaPerfil;