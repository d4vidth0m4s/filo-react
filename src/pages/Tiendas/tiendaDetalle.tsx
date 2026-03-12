import { useParams } from 'react-router-dom';
import { tiendas } from '../../data/tiendas';

export default function TiendaDetalle() {
  const { slug } = useParams<{ slug: string }>();

  const tienda = tiendas.find((t) => t.slug === slug);

  if (!tienda) {
    return <p className="p-4">Tienda no encontrada</p>;
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-6">
      {/* info tienda */}
      <h1 className="text-2xl font-bold mb-2">{tienda.nombre}</h1>
      <p className="text-gray-500 mb-6">{tienda.descripcion}</p>

      {/* productos */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tienda.productos.map((producto) => (
          <div key={producto.id} className="border rounded-xl p-4 shadow">
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />

            <h3 className="font-semibold">{producto.nombre}</h3>
            <p className="text-sm text-gray-500">{producto.descripcion}</p>

            <div className="flex justify-between items-center mt-4">
              <span className="font-bold">
                ${producto.precio.toLocaleString()}
              </span>

              <button className="bg-black text-white px-3 py-1 rounded-lg">
                Agregar
              </button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
