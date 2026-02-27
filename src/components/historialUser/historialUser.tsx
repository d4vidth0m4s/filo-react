import "./historialUser.css";

type ItemPedido = {
  id: number;
  nombre: string;
};

type EstadoPedido = "pendiente" | "preparando" | "entregado" | "cancelado";

export type PedidoHistorial = {
  id: number;
  codigo: string;
  fecha: string;
  estado: EstadoPedido;
  monto: string;
  items: ItemPedido[];
};

type HistorialUserProps = {
  pedidos: PedidoHistorial[];
  onVolver: () => void;
  onVerDetalle: (id: number) => void;
};

const HistorialUser = ({ pedidos, onVolver, onVerDetalle }: HistorialUserProps) => {
  return (
    <div className="historial-container">
      <div className="historial-header">
        <button className="historial-volver" onClick={onVolver}>
          ← Volver
        </button>
        <h3 className="historial-titulo">Mis Pedidos</h3>
      </div>

      {pedidos.length === 0 ? (
        <p className="historial-vacio">No hay pedidos registrados aún.</p>
      ) : (
        <div className="historial-lista">
          {pedidos.map((pedido) => (
            <div className="pedido-card" key={pedido.id} onClick={() => onVerDetalle(pedido.id)} > 
              <div className="pedido-card-header">
                <div>
                  <div className="pedido-numero">{pedido.codigo}</div>
                  <div className="pedido-fecha">{pedido.fecha}</div>
                </div>
                <span className={`pedido-estado ${pedido.estado}`}>
                  {pedido.estado}
                </span>
              </div>

              <hr className="pedido-divider" />

              <div className="pedido-productos">
                {pedido.items.map((item) => (
                  <span className="pedido-producto-item" key={item.id}>
                    {item.nombre}
                  </span>
                ))}
              </div>

              <div className="pedido-card-footer">
                <span className="pedido-total-label">Total</span>
                <span className="pedido-total-monto">{pedido.monto}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistorialUser;