import { useState } from "react";
import "./carrito.css";
import { useCart } from "../../context/cartContext";

export default function CartDrawer({ abierto, setAbierto }: { abierto: boolean; setAbierto: (value: boolean) => void }) {
    const { carrito, agregarProducto, restarProducto, vaciarCarrito } = useCart();
    const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    const envio = total >= 50000 ? 0 : 5000;
    const totalFinal = total + envio;
    const [cargando, setCargando] = useState(false);
    const [pedidoExitoso, setPedidoExitoso] = useState(false);
    const procesarCompra = () => {
  setCargando(true);

  // Simula llamada a backend
  setTimeout(() => {

    // Guardar pedido
    const pedido = {
      id: Date.now(),
      productos: carrito,
      total: totalFinal,
      fecha: new Date().toISOString(),
    };

    // Guardar en localStorage (simula BD)
    const pedidosGuardados =
      JSON.parse(localStorage.getItem("pedidos") || "[]");

    pedidosGuardados.push(pedido);

    localStorage.setItem(
      "pedidos",
      JSON.stringify(pedidosGuardados)
    );

    // Vaciar carrito
    vaciarCarrito();

    // Mostrar mensaje
    setCargando(false);
    setPedidoExitoso(true);

  }, 2000);
};


    return (
        <>
          <div className={`overlay ${abierto ? "activo" : ""}`} onClick={() => setAbierto(false)} />
            <aside className={`carrito ${abierto ? "activo" : ""}`}>
                <h3>Tu carrito</h3>
                {/* MENSAJE ÉXITO */}
                {pedidoExitoso && (
                    <div className="pedido-exito">
                        <h3>Pedido realizado con éxito</h3>
                        <p>Gracias por tu compra 💚</p>
                    </div>
                )}

                {/* CARRITO VACÍO */}
                {!pedidoExitoso && carrito.length === 0 && (
                    <p>Tu carrito está vacío</p>
                )}

                {/* LISTA DE PRODUCTOS */}
                {!pedidoExitoso && carrito.length > 0 && (
                <div className="carrito-lista">
                        {carrito.map((item) => (
                            <div key={item.id} className="carrito-item">
                                <img src={item.imagen} alt={item.nombre} />

                                <div className="carrito-info">
                                    <h4>{item.nombre}</h4>
                                    <span>${item.precio}</span>

                                    <div className="cantidad-control">
                                        <button onClick={() => restarProducto(item.id, item.storeId)}>-</button>
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
                                                })}>+</button>
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
                                    {envio === 0 ? "Gratis" : `$${envio.toLocaleString()}`}
                                </span>
                            </div>
                            <div className="linea total">
                                <span>Total:</span>
                                <span>${totalFinal.toLocaleString()}</span>
                            </div>
                        </div>  
)}

                {!pedidoExitoso && carrito.length > 0 && (
                    <button
                        className="btn-comprar"
                        disabled={cargando}
                        onClick={procesarCompra}>{cargando ? <div className="loader" /> : "Comprar ahora"}</button>
)}
                <button disabled={cargando} className="cerrar" onClick={() => {setAbierto(false); setPedidoExitoso(false);}}>Cerrar</button>
            </aside>
        </>
    );
}