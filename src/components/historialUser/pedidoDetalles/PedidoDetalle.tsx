import "./PedidoDetalle.css";

type ItemPedido = {
  id: number;
  nombre: string;
  cantidad: number;
  precio: string;
};

type EstadoPaso = "completado" | "activo" | "pendiente";

type PasoPedido = {
  id: number;
  etiqueta: string;
  estado: EstadoPaso;
};

export type DetallePedido = {
  codigo: string;
  fechaColocado: string;
  tiempoEstimado: string;
  horaEstimada: string;
  enHorario: boolean;
  repartidorNombre: string;
  repartidorFoto: string;
  repartidorCalificacion: number;
  repartidorEntregas: number;
  pasos: PasoPedido[];
  mensajeEstado: string;
  items: ItemPedido[];
  subtotal: string;
  costoEnvio: string;
  costoServicio: string;
  total: string;
  // TODO: agregar coordenadas y config del mapa cuando tengas la API
};

type PedidoDetalleProps = {
  idPedido: number | null;
  pedido: DetallePedido | null;
  onVolver: () => void;
  onContactarSoporte: () => void;
  onMensajearRepartidor: () => void;
  onLlamarRepartidor: () => void;
};

const PedidoDetalle = ({
  pedido,
  onVolver,
  onContactarSoporte,
  onMensajearRepartidor,
  onLlamarRepartidor, 
}: PedidoDetalleProps) => {
  if (!pedido) {
    return (
      <div className="detalle-vacio">
        <p>No se encontró el pedido.</p>
        <button className="detalle-volver" onClick={onVolver}>← Volver</button>
      </div>
    );
  }

  return (
    <div className="detalle-container">
      {/* HEADER */}
      <div className="detalle-header">
        <button className="detalle-volver" onClick={onVolver}>← Volver</button>
        <div className="detalle-header-info">
          <h2 className="detalle-codigo">Pedido {pedido.codigo}</h2>
          <span className="detalle-fecha">Colocado a las {pedido.fechaColocado}</span>
        </div>
        <button className="detalle-soporte-btn" onClick={onContactarSoporte}>
          Soporte
        </button>
      </div>

      <div className="detalle-body">
        {/* COLUMNA IZQUIERDA */}
        <div className="detalle-izquierda">

          {/* PASOS DE PROGRESO */}
          <div className="detalle-pasos">
            {pedido.pasos.map((paso, index) => (
              <div className="detalle-paso-item" key={paso.id}>
                <div className={`detalle-paso-circulo paso-${paso.estado}`}>
                  {paso.estado === "completado" ? "✓" : index + 1}
                </div>
                {index < pedido.pasos.length - 1 && (
                  <div className={`detalle-paso-linea linea-${pedido.pasos[index + 1].estado}`} />
                )}
                <span className={`detalle-paso-etiqueta etiqueta-${paso.estado}`}>
                  {paso.etiqueta}
                </span>
              </div>
            ))}
          </div>

          {/* MENSAJE DE ESTADO */}
          <div className="detalle-mensaje-estado">
            <span className="detalle-mensaje-icono">ℹ</span>
            <p>{pedido.mensajeEstado}</p>
          </div>

          {/* MAPA - TODO: integrar con tu API de mapa */}
          <div className="detalle-mapa-placeholder">
            {/* Aquí va el componente de mapa con tu API */}
            <span>🗺 Mapa en tiempo real</span>
          </div>
        </div>

        {/* COLUMNA DERECHA */}
        <div className="detalle-derecha">

          {/* TIEMPO ESTIMADO */}
          <div className="detalle-tiempo-card">
            <span className="detalle-tiempo-label">Llegada estimada</span>
            <div className="detalle-tiempo-valor">{pedido.tiempoEstimado}</div>
            <div className="detalle-tiempo-footer">
              <span>Más tardar {pedido.horaEstimada}</span>
              {pedido.enHorario && <span className="detalle-en-horario">· En horario</span>}
            </div>
          </div>

          {/* REPARTIDOR */}
          <div className="detalle-repartidor-card">
            <span className="detalle-seccion-titulo">Tu repartidor</span>
            <div className="detalle-repartidor-info">
              <img
                className="detalle-repartidor-foto"
                src={pedido.repartidorFoto}
                alt={pedido.repartidorNombre}
              />
              <div>
                <div className="detalle-repartidor-nombre">{pedido.repartidorNombre}</div>
                <div className="detalle-repartidor-rating">
                  ⭐ {pedido.repartidorCalificacion} · {pedido.repartidorEntregas.toLocaleString()} entregas
                </div>
              </div>
            </div>
            <div className="detalle-repartidor-acciones">
              <button className="detalle-btn-secundario" onClick={onMensajearRepartidor}>
                💬 Mensaje
              </button>
              <button className="detalle-btn-primario" onClick={onLlamarRepartidor}>
                📞 Llamar
              </button>
            </div>
          </div>

          {/* RESUMEN DE ORDEN */}
          <div className="detalle-resumen-card">
            <span className="detalle-seccion-titulo">Resumen del pedido</span>
            <div className="detalle-items-lista">
              {pedido.items.map((item) => (
                <div className="detalle-item-fila" key={item.id}>
                  <span className="detalle-item-nombre">
                    {item.nombre}
                    <span className="detalle-item-cantidad"> x{item.cantidad}</span>
                  </span>
                  <span className="detalle-item-precio">{item.precio}</span>
                </div>
              ))}
            </div>
            <hr className="detalle-divider" />
            <div className="detalle-totales">
              <div className="detalle-total-fila">
                <span>Subtotal</span>
                <span>{pedido.subtotal}</span>
              </div>
              <div className="detalle-total-fila">
                <span>Envío</span>
                <span className="detalle-gratis">{pedido.costoEnvio}</span>
              </div>
              <div className="detalle-total-fila">
                <span>Servicio</span>
                <span>{pedido.costoServicio}</span>
              </div>
              <div className="detalle-total-fila detalle-total-final">
                <span>Total</span>
                <span className="detalle-total-monto">{pedido.total}</span>
              </div>
            </div>
          </div>

          {/* SOPORTE */}
          <div className="detalle-soporte-card">
            <span>¿Necesitas hacer cambios?</span>
            <button className="detalle-soporte-link" onClick={onContactarSoporte}>
              Contactar Soporte
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PedidoDetalle;
