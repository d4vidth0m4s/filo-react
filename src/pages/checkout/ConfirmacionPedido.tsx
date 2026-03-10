import { useMemo, useState } from "react";
import { FaCreditCard, FaLock, FaMapMarkerAlt, FaMoneyBillWave, FaPhoneAlt, FaWallet } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { PedidosApi } from "../../api/Pedidos.api";
import { useCart } from "../../context/cartContext";
import "./confirmacionPedido.css";

const obtenerClienteInicial = (): string => {
  const raw = localStorage.getItem("userDatos");
  if (!raw) {
    return "";
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return "";
    }

    const user = parsed as Record<string, unknown>;
    const nombre = typeof user.nombre === "string" ? user.nombre.trim() : "";
    const familyName = typeof user.familyName === "string" ? user.familyName.trim() : "";
    const username = typeof user.username === "string" ? user.username.trim() : "";
    const nombreCompleto = `${nombre} ${familyName}`.trim();
    return nombreCompleto || username || "";
  } catch {
    return "";
  }
};

const obtenerUsuarioIdInicial = (): number => {
  const raw = localStorage.getItem("userDatos");
  if (!raw) {
    return 0;
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return 0;
    }

    const user = parsed as Record<string, unknown>;
    const id = user.id;
    const usuarioId = user.usuarioId;
    const valor = typeof id === "number" ? id : typeof usuarioId === "number" ? usuarioId : Number(id ?? usuarioId);
    return Number.isFinite(valor) ? valor : 0;
  } catch {
    return 0;
  }
};

const metodoPagoApiMap = {
  tarjeta: "tarjeta",
  billetera: "billetera",
  efectivo: "efectivo",
} as const;

type MetodoPago = keyof typeof metodoPagoApiMap;

const ConfirmacionPedido = () => {
  const navigate = useNavigate();
  const { carrito, montoCarrito, agregarProducto, restarProducto, vaciarCarrito } = useCart();
  const [cliente, setCliente] = useState<string>(obtenerClienteInicial);
  const [telefono, setTelefono] = useState<string>("+57");
  const [direccion, setDireccion] = useState<string>(() => localStorage.getItem("direccionEntrega") ?? "");
  const [instrucciones, setInstrucciones] = useState<string>("");
  const [metodoPago, setMetodoPago] = useState<MetodoPago>("efectivo");
  const [numeroTarjeta, setNumeroTarjeta] = useState<string>("");
  const [fechaTarjeta, setFechaTarjeta] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");
  const [promoCode, setPromoCode] = useState<string>("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pedidoExitoso, setPedidoExitoso] = useState(false);
  const usuarioId = useMemo(() => obtenerUsuarioIdInicial(), []);

  const tiendasEnCarrito = useMemo(() => Array.from(new Set(carrito.map((item) => item.storeId))), [carrito]);
  const tieneMultiplesComercios = tiendasEnCarrito.length > 1;
  const comercioIdFinal = carrito[0]?.storeId ?? "";
  const envio = montoCarrito >= 50000 ? 0 : 5000;
  const servicio = 0;
  const descuento = 0;
  const totalFinal = montoCarrito + envio + servicio - descuento;

  const payloadPreview = {
    comercioId: comercioIdFinal,
    usuarioId:usuarioId,
    direccion: direccion.trim(),
    tel: telefono.trim(),
    notaDirecion: instrucciones.trim(),
    cliente: cliente.trim() || "Cliente",
    monto: montoCarrito,
    metodoPago: metodoPagoApiMap[metodoPago],
    items: carrito.map((item) => ({ 
      id: item.id,
      cantidad: item.cantidad,
      nombre: item.nombre,
    })),
  };

  const aplicarPromo = () => {
    if (!promoCode.trim()) {
      setError("Ingresa un codigo promocional.");
      return;
    }
    setError("Por ahora no hay codigos activos.");
  };

  const confirmarPedido = async () => {
    if (carrito.length === 0) {
      setError("Tu carrito esta vacio.");
      return;
    }

    if (!direccion.trim()) {
      setError("La direccion de entrega es obligatoria.");
      return;
    }

    if (tieneMultiplesComercios) {
      setError("Solo puedes confirmar productos de un comercio por pedido.");
      return;
    }

    setCargando(true);
    setError(null);

    try {
      await PedidosApi.create(payloadPreview);

      localStorage.setItem("direccionEntrega", direccion.trim());
      vaciarCarrito();
      setPedidoExitoso(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "No se pudo confirmar el pedido.";
      setError(message);
    } finally {
      setCargando(false);
    }
  };

  if (pedidoExitoso) {
    return (
      <main className="checkoutv2">
        <section className="checkoutv2__empty">
          <h1>Pedido confirmado</h1>
          <p>Tu orden fue enviada correctamente al comercio.</p>
          <button className="checkoutv2__cta" onClick={() => navigate("/")}>
            Volver al inicio
          </button>
        </section>
      </main>
    );
  }

  if (carrito.length === 0) {
    return (
      <main className="checkoutv2">
        <section className="checkoutv2__empty">
          <h1>Confirmar pedido</h1>
          <p>No tienes productos en el carrito.</p>
          <Link className="checkoutv2__cta checkoutv2__link" to="/">
            Ir a tiendas
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="checkoutv2">
      <div className="checkoutv2__grid">
        <div className="checkoutv2__main">
          <section className="checkoutv2__card">
            <div className="checkoutv2__card-header">
              <div className="checkoutv2__title-wrap">
                <FaMapMarkerAlt />
                <h2>Informacion</h2>
              </div>

            </div>



            <label className="checkoutv2__label">
              Direccion
              <input
                className="checkoutv2__input"
                value={direccion}
                onChange={(event) => setDireccion(event.target.value)}
                placeholder="Ej: Calle 10 # 20-30" required
              />
            </label>

            <label className="checkoutv2__label">
              Notas Adicionales
              <textarea
                className="checkoutv2__textarea"
                value={instrucciones}
                onChange={(event) => setInstrucciones(event.target.value)}
                placeholder="Ej:Salchipapa sin salsas, Tocar timbre y dejar en porteria" required
                rows={2}
              />
            </label>
          </section>

          <section className="checkoutv2__card">
            <div className="checkoutv2__title-wrap">
              <FaPhoneAlt />
              <h2>Informacion de contacto</h2>
            </div>

            <div className="checkoutv2__form-grid">
              <label  className="checkoutv2__label">
                Nombre completo
                <input
                  className="checkoutv2__input"
                  value={cliente}
                  onChange={(event) => setCliente(event.target.value)}
                  placeholder="Nombre de quien recibe" required
                />
              </label>

              <label className="checkoutv2__label">
                Telefono
                <input
                  className="checkoutv2__input"
                  value={telefono}
                  onChange={(event) => setTelefono(event.target.value)}
                  placeholder="+57 300 000 0000" required
                  type="tel"
                />
              </label>
            </div>
          </section>

          <section className="checkoutv2__card">
            <div className="checkoutv2__title-wrap">
              <FaMoneyBillWave />
              <h2>Metodo de pago</h2>
            </div>

            <div className="checkoutv2__payment-grid">
              <label className={`checkoutv2__payment-option ${metodoPago === "tarjeta" ? "is-active" : ""}`}>
                <input
                  checked={metodoPago === "tarjeta"}
                  className="checkoutv2__radio"
                  name="payment"
                  onChange={() => setMetodoPago("tarjeta")}
                  type="radio"
                  value="tarjeta"
                />
                <FaCreditCard />
                <span>Tarjeta</span>
              </label>

              <label className={`checkoutv2__payment-option ${metodoPago === "billetera" ? "is-active" : ""}`}>
                <input
                  checked={metodoPago === "billetera"}
                  className="checkoutv2__radio"
                  name="payment"
                  onChange={() => setMetodoPago("billetera")}
                  type="radio"
                  value="billetera"
                />
                <FaWallet />
                <span>Nequi</span>
              </label>

              <label className={`checkoutv2__payment-option ${metodoPago === "efectivo" ? "is-active" : ""}`}>
                <input
                  checked={metodoPago === "efectivo"}
                  className="checkoutv2__radio"
                  name="payment"
                  onChange={() => setMetodoPago("efectivo")}
                  type="radio"
                  value="efectivo"
                />
                <FaMoneyBillWave />
                <span>Efectivo</span>
              </label>
            </div>

            {metodoPago === "tarjeta" && (
              <div className="checkoutv2__card-details">
                <label className="checkoutv2__label">
                  Numero de tarjeta
                  <input
                    className="checkoutv2__input"
                    onChange={(event) => setNumeroTarjeta(event.target.value)}
                    placeholder="xxxx xxxx xxxx 4242"
                    type="text"
                    value={numeroTarjeta}
                  />
                </label>

                <div className="checkoutv2__form-grid">
                  <label className="checkoutv2__label">
                    Fecha
                    <input
                      className="checkoutv2__input"
                      onChange={(event) => setFechaTarjeta(event.target.value)}
                      placeholder="MM/YY"
                      type="text"
                      value={fechaTarjeta}
                    />
                  </label>

                  <label className="checkoutv2__label">
                    CVV
                    <input
                      className="checkoutv2__input"
                      onChange={(event) => setCvv(event.target.value)}
                      placeholder="***"
                      type="text"
                      value={cvv}
                    />
                  </label>
                </div>
              </div>
            )}
          </section>
        </div>

        <aside className="checkoutv2__aside">
          <div className="checkoutv2__sticky">
            <section className="checkoutv2__card">
              <h2 className="checkoutv2__summary-title">Resumen del pedido</h2>

              <ul className="checkoutv2__items">
                {carrito.map((item) => (
                  <li className="checkoutv2__item" key={`${item.id}-${item.storeId}`}>
                    <div className="checkoutv2__thumb">
                      <img alt={item.nombre} src={item.imagen} />
                    </div>

                    <div className="checkoutv2__item-body">
                      <div className="checkoutv2__item-top">
                        <p>{item.nombre}</p>
                        <strong>${(item.precio * item.cantidad).toLocaleString()}</strong>
                      </div>
                      <div className="checkoutv2__item-bottom">
                        <span>Qty: {item.cantidad}</span>
                        <div className="checkoutv2__counter">
                          <button onClick={() => restarProducto(item.id, item.storeId)} type="button">
                            -
                          </button>
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
                            type="button"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="checkoutv2__promo">
                <label className="checkoutv2__label">
                  Codigo promocional
                  <div className="checkoutv2__promo-row">
                    <input
                      className="checkoutv2__input"
                      onChange={(event) => setPromoCode(event.target.value)}
                      placeholder="SAVE20"
                      type="text"
                      value={promoCode}
                    />
                    <button onClick={aplicarPromo} type="button">
                      Aplicar
                    </button>
                  </div>
                </label>
              </div>

              <div className="checkoutv2__calc">
                <p>
                  <span>Subtotal</span>
                  <strong>${montoCarrito.toLocaleString()}</strong>
                </p>
                <p>
                  <span>Domicilio</span>
                  <strong>{envio === 0 ? "Gratis" : `$${envio.toLocaleString()}`}</strong>
                </p>
                <p>
                  <span>Servicio</span>
                  <strong>${servicio.toLocaleString()}</strong>
                </p>
                <p className="checkoutv2__discount">
                  <span>Descuento</span>
                  <strong>-${descuento.toLocaleString()}</strong>
                </p>
                <p className="checkoutv2__total">
                  <span>Total</span>
                  <strong>${totalFinal.toLocaleString()}</strong>
                </p>
              </div>

              {tieneMultiplesComercios && (
                <p className="checkoutv2__error">
                  Tienes productos de varios comercios. Finaliza un pedido por comercio.
                </p>
              )}
              {error && <p className="checkoutv2__error">{error}</p>}

              <button className="checkoutv2__cta" disabled={cargando} onClick={confirmarPedido}>
                {cargando ? "Enviando..." : `Confirmar y pagar $${totalFinal.toLocaleString()}`}
              </button>
              <p className="checkoutv2__legal">
                Al confirmar este pedido aceptas nuestros terminos y politica de privacidad.
              </p>
            </section>

            <section className="checkoutv2__trust">
              <FaLock />
              <span>Checkout seguro y cifrado</span>
            </section>

            <section className="checkoutv2__card">
              <details className="checkoutv2__payload">
                <summary>Payload preview</summary>
                <pre>{JSON.stringify(payloadPreview, null, 2)}</pre>
              </details>
            </section>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default ConfirmacionPedido;
