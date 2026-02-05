import { useState } from "react";
import "./carrito.css";

export default function CartDrawer() {
    const [abierto, setAbierto] = useState(false);
    const [carrito, setCarrito] = useState([
        { id: 1, nombre: "Hamburguesa", precio: 10 },
        { id: 2, nombre: "Papas", precio: 5 },
    ]);

    const total = carrito.reduce((acc, item) => acc + item.precio, 0);

    return (
        <>
            <button className="icon-btn" onClick={() => setAbierto(true)}>
                🛒 <span className="badge">{carrito.length}</span>
            </button>

            <div
                className={`overlay ${abierto ? "activo" : ""}`}
                onClick={() => setAbierto(false)}
            />

            <aside className={`carrito ${abierto ? "activo" : ""}`}>
                <h2>Tu carrito</h2>

                {carrito.length === 0 ? (
                    <p>El carrito está vacío</p>
                ) : (
                    <ul>
                        {carrito.map((item) => (
                            <li key={item.id}>
                                {item.nombre}
                                <span>${item.precio}</span>
                            </li>
                        ))}
                    </ul>
                )}

                <div className="total">
                    <strong>Total:</strong> ${total}
                </div>

                <button className="cerrar" onClick={() => setAbierto(false)}>
                    Cerrar
                </button>
            </aside>
        </>
    );
}