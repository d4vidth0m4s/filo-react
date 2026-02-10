import { useCart } from "../context/cartContext";

const Carrito = () => {
  const { carrito } = useCart();

  if (carrito.length === 0) {
    return <p>Carrito vacío</p>;
  }

  return (
    <div>
      <h3>🛒 Carrito</h3>

      {carrito.map((item) => (
        <div key={item.id}>
          <span>{item.nombre}</span>
          <span> x {item.cantidad}</span>
          <span> = ${item.precio * item.cantidad}</span>
        </div>
      ))}
    </div>
  );
};

export default Carrito;