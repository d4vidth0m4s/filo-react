import { useNavigate } from 'react-router-dom';
import './categorias.css';

const categorias = [
  {
    nombre: 'Restaurantes',
    icono: '../src/images/restaurantes.png',
    slug: 'restaurantes',
  },
  { nombre: 'Tiendas', icono: '../src/images/tiendas.webp', slug: 'tiendas' },
  {
    nombre: 'Supermercados',
    icono: '../src/images/supermercados.png',
    slug: 'supermercados',
  },
  {
    nombre: 'Comidas Rápidas',
    icono: '../src/images/comidas-rapidas.png',
    slug: 'comidas-rapidas',
  },
];

const Categorias = () => {
  const navigate = useNavigate();

  return (
    <div className="categorias">
      {categorias.map((categoria) => (
        <div
          className="categoria"
          key={categoria.nombre}
          onClick={() => navigate(`/categoria/${categoria.slug}`)}
          style={{ cursor: 'pointer' }}
        >
          <div className="icono">
            <img className="ico" src={categoria.icono} alt={categoria.nombre} />
          </div>
          <span>{categoria.nombre}</span>
        </div>
      ))}
    </div>
  );
};

export default Categorias;
