import "./carrito.css";
import { useCart } from "../../context/cartContext";

export default function CartDrawer({ abierto, setAbierto }: { abierto: boolean; setAbierto: (value: boolean) => void }) {
    const { carrito, agregarProducto, restarProducto } = useCart();
    return (
        <>
          <div className={`overlay ${abierto ? "activo" : ""}`} onClick={() => setAbierto(false)} />
            <aside className={`carrito ${abierto ? "activo" : ""}`}>
                <h3>Tu carrito</h3>
                {carrito.length === 0 ? (<p>Tu carrito está vacío</p>):(
                    <div className="carrito-lista">
                    {carrito.map((item) => (
                    <div key={item.id} className="carrito-item">
                        <img src={item.imagen} alt={item.nombre} />
                        <div className="carrito-info">
                            <h4>{item.nombre}</h4>
                            <span>${item.precio}</span>
                            <div className="cantidad-control">
                                <button onClick={() => restarProducto(item.id)}>-</button>
                                <span>{item.cantidad}</span>
                                <button onClick={() => agregarProducto({
                                    id: item.id,
                                    nombre: item.nombre,
                                    precio: item.precio,
                                    imagen: item.imagen,})}> + 
                                </button>
                            </div>
                        </div>
                    </div>
                    ))}
                    </div>
                    )}
                <button className="cerrar" onClick={() => setAbierto(false)}>Cerrar</button>
            </aside>
        </>
    );
}