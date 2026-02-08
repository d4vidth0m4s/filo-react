import { useParams } from "react-router-dom";
import { tiendas } from "../../data/tiendas";
import "./tiendaPerfil.css";
import BackBotton from "../../components/backBotton/BackBotton";
import { useSearchParams } from "react-router-dom";

const TiendaPerfil = () => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
const categoria = searchParams.get("cat") || "all";
const cambiarCategoria = (cat) => {
  setSearchParams({ cat });
};


  
  const productosFiltrados_t = tiendas;

  const tienda= productosFiltrados_t.find((t) => t.slug === slug);
  
  if (!tienda) {
   // Regirigi a Nofound ()
    return <h2 className="tienda-error">Tienda no encontrada</h2>;
  }
  const productos = tienda?.productos || [];
  const productosFiltrados_p =
  categoria === "all"
    ? productos
    : productos.filter(
        (p) => p.categoria === categoria
      );

  return (
    <div className="tienda-page">
      <div className="tienda-header">
      </div>
      <div className="tienda-banner"
        style={{ backgroundImage: `url(${tienda.banner})` }}
      >
        <BackBotton modo="back" />
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
        <button onClick={() => cambiarCategoria("all")}>
    Todos
  </button>

  {tienda.categorias.map((cat, i) => (
    <button
      key={i}
      onClick={() => cambiarCategoria(cat)}
      className={categoria === cat ? "active" : ""}
    >
      {cat}
    </button>
  ))}
      </div>

      <div className="tienda-productos">
        {productosFiltrados_p.map((prod) => (
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