import { useNavigate } from 'react-router-dom';
import './carrito.css';
import { useCart } from '../../context/useCart';

export default function CartDrawer({
  abierto,
  setAbierto,
}: {
  abierto: boolean;
  setAbierto: (value: boolean) => void;
}) {
  const { carrito, agregarProducto, restarProducto } = useCart();
  const navigate = useNavigate();
  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );
  const envio = total >= 50000 ? 0 : 5000;
  const totalFinal = total + envio;

  const irAConfirmacion = () => {
    if (carrito.length === 0) {
      return;
    }

    setAbierto(false);
    navigate('/confirmar-pedido');
  };

  return (
    <>
      <div
        className={`overlay ${abierto ? 'activo' : ''}`}
        onClick={() => setAbierto(false)}
      />
      <aside className={`carrito ${abierto ? 'activo' : ''}`}>
        <h3>Tu carrito</h3>
        {/* CARRITO VACÍO */}
        {carrito.length === 0 && <p>Tu carrito está vacío</p>}

        {/* LISTA DE PRODUCTOS */}
        {carrito.length > 0 && (
          <div className="carrito-lista">
            {carrito.map((item) => (
              <div key={item.id} className="carrito-item">
                <img src={item.imagen} alt={item.nombre} />

                <div className="carrito-info">
                  <h4>{item.nombre}</h4>
                  <span>${item.precio}</span>

                  <div className="cantidad-control">
                    <button
                      onClick={() => restarProducto(item.id, item.storeId)}
                    >
                      -
                    </button>
                    <span>{item.cantidad}</span>
                    <button
                      onClick={() =>
                        agregarProducto({
                          id: item.id,
                          nombre: item.nombre,
                          precio: item.precio,
                          imagen: item.imagen,
                          storeId: item.storeId,
                          storeName: item.storeName,
                        })
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {carrito.length > 0 && (
          <div className="carrito-resumen">
            <div className="linea">
              <span>Subtotal:</span>
              <span>${total.toLocaleString()}</span>
            </div>
            <div className="linea">
              <span>Envío:</span>
              <span>
                {envio === 0 ? 'Gratis' : `$${envio.toLocaleString()}`}
              </span>
            </div>
            <div className="linea total">
              <span>Total:</span>
              <span>${totalFinal.toLocaleString()}</span>
            </div>
          </div>
        )}

        {carrito.length > 0 && (
          <button className="btn-comprar" onClick={irAConfirmacion}>
            Comprar ahora
          </button>
        )}
        <button
          className="cerrar"
          onClick={() => {
            setAbierto(false);
          }}
        >
          Cerrar
        </button>
      </aside>
    </>
  );
}
