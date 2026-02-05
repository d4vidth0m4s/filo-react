import "./carrito.css";

export default function CartDrawer({ abierto, setAbierto }: { abierto: boolean; setAbierto: (value: boolean) => void }) {
    return (
        <>
            <div
                className={`overlay ${abierto ? "activo" : ""}`}
                onClick={() => setAbierto(false)}
            />

            <aside className={`carrito ${abierto ? "activo" : ""}`}>
                <h3>Tu carrito</h3>
                <p>Productos aquí…</p>

                <button className="cerrar" onClick={() => setAbierto(false)}>
                    Cerrar
                </button>
            </aside>
        </>
    );
}