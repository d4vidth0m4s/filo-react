import React, { useState } from 'react'
import './UserPerfil.css'
import BackBotton from '../../components/backBotton/BackBotton'
import {getUserData} from '../../Auth/auth'
import { api } from '../../api/Api'
import {useNavigate } from "react-router-dom";
import { logout } from "../../Auth/auth";
import HistorialUser from '../../components/historialUser/historialUser'
import  type {DetallePedido} from '../../components/historialUser/pedidoDetalles/PedidoDetalle'
import type { PedidoHistorial } from '../../components/historialUser/historialUser'
import DetallePedidoData  from '../../components/historialUser/pedidoDetalles/PedidoDetalle'

type Usuario = {
  id: number
  email: string
  username: string
  nombre: string
  familyName: string
  pictureUrl: string
  token: string
}

 type CodeRequest = {
  audience: string,
  expirationSeconds: number
}

type CodeResponse = {
  accessCode: string
  audience: string
  expiresIn: number
}
const PEDIDOS_FAKE: PedidoHistorial[] = [
  {
    id: 1,
    codigo: "#1240",
    fecha: "24 Feb 2026 · 12:45 PM",
    estado: "entregado",
    monto: "$31.20",
    items: [
      { id: 1, nombre: "1x Hamburguesa Clásica" },
      { id: 2, nombre: "1x Papas Medianas" },
    ],
  },
  {
    id: 2,
    codigo: "#1241",
    fecha: "23 Feb 2026 · 08:10 PM",
    estado: "preparando",
    monto: "$56.90",
    items: [
      { id: 1, nombre: "2x Pizza Hawaiana" },
      { id: 2, nombre: "1x Limonada 1L" },
    ],
  },
];
const DETALLE_FAKE: DetallePedido = {
  codigo: "#1240",
  fechaColocado: "12:45 PM",
  tiempoEstimado: "12-18 mins",
  horaEstimada: "1:25 PM",
  enHorario: true,
  repartidorNombre: "Carlos R.",
  repartidorFoto: "https://placehold.co/100/00c853/ffffff?text=C",
  repartidorCalificacion: 4.9,
  repartidorEntregas: 2400,
  mensajeEstado: "Carlos tiene tu pedido y está a 1.2 km. Llegada estimada: 1:15 PM.",
  pasos: [
    { id: 1, etiqueta: "Colocado",       estado: "completado" },
    { id: 2, etiqueta: "Preparando",     estado: "completado" },
    { id: 3, etiqueta: "En camino",      estado: "activo"     },
    { id: 4, etiqueta: "Entregado",      estado: "pendiente"  },
  ],
  items: [
    { id: 1, nombre: "Hamburguesa Clásica", cantidad: 1, precio: "$14.50" },
    { id: 2, nombre: "Papas Medianas",      cantidad: 1, precio: "$6.75"  },
    { id: 3, nombre: "Cola",                cantidad: 1, precio: "$3.25"  },
  ],
  subtotal:      "$24.50",
  costoEnvio:    "GRATIS",
  costoServicio: "$1.99",
  total:         "$26.49",
};

const AUTH_BRIDGE_URL =
  import.meta.env.VITE_AUTH_BRIDGE_URL?.trim() ?? "";
const AUTH_BRIDGE_ORIGIN =
  import.meta.env.VITE_AUTH_BRIDGE_ORIGIN?.trim() ?? "";

const UserPerfil: React.FC = () => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [usuario] = useState<Usuario | null>(() => {
    const userData = getUserData();
    
    return userData  ? userData as Usuario : null;
  })
  const [vistaActiva, setVistaActiva] = useState<"perfil" | "pedidos"|"detalle">("perfil");
  const [pedidoSeleccionadoId, setPedidoSeleccionadoId] = useState<number | null>(null);
 

  const codeAccess = async (data: CodeRequest): Promise<CodeResponse> => {
    const response = await api.post<CodeResponse>('/api/auth/bridge/code', data);
    return response.data;
  }

async function codeAccessHandler () {
  const data = await codeAccess({ audience: "ControlGastosClients", expirationSeconds: 100 })

const win = window.open(AUTH_BRIDGE_URL, "_blank");

setTimeout(() => {
  win?.postMessage(
    { code: data.accessCode },
    AUTH_BRIDGE_ORIGIN
  );
}, 500);

  console.log(data)
}

const handleLogout = () => {
  // Limpiar sesión
  localStorage.removeItem("token");
  logout();
  localStorage.clear();
  // Mostrar modal
  setShowLogoutModal(true);
  // Redirigir luego
  setTimeout(() => {
    navigate("/users/login", { replace: true });}, 2000);
};

  const filoAscii = `
 ________      ___          ___               ________     
|\\  _____\\    |\\  \\        |\\  \\             |\\   __  \\    
\\ \\  \\__/     \\ \\  \\       \\ \\  \\            \\ \\  \\|\\  \\   
 \\ \\   __\\     \\ \\  \\       \\ \\  \\            \\ \\  \\\\\\  \\  
  \\ \\  \\_|      \\ \\  \\       \\ \\  \\____        \\ \\  \\\\\\  \\ 
   \\ \\__\\        \\ \\__\\       \\ \\_______\\       \\ \\_______\\
    \\|__|         \\|__|        \\|_______|        \\|_______|
`

  return (
    <div className="user-perfil-container">
      <header className="perfil-header">
        <BackBotton modo="home" />
        <h2>Mi perfil</h2>
      </header>

      <div className="perfil-layout">
        {/* MENU TICKET - Ahora primero */}
        <aside className="ticket">
          <div className="ticket-inner">
            <div className="center">
              <div className="logo">MENU<br />INTEGRATE</div>
            </div>
            <hr />
            <div className="info center">
              <p>Nombre: {usuario?.nombre}</p>
              
            </div>
            <hr />

            <div className="grid perfil-opciones">
              <button className="opcion" onClick={() => setVistaActiva("pedidos")}>
                <span>Mis pedidos</span>
              </button>
              <button className="opcion">
                <span>Favoritos</span>
              </button>
              <button className="opcion" onClick={codeAccessHandler}>
                <span>Tu comercio</span>
              </button>
              <button className="opcion logout" onClick={handleLogout}>
                <span>Cerrar sesión</span>
              </button>
            </div>

            <hr />
            <div className="center">
                <pre className="ascii-logo">
              {filoAscii}
            </pre>
            </div>
          </div>
        </aside>

        {/* CARD USUARIO - Ahora segundo */}
    
      <section className="perfil-card">
        {vistaActiva === "perfil" && (
          <>
          <img
            className="foto-perfil"
            src={  `https://placehold.co/500/00c853/ffffff?text=${usuario?.nombre.charAt(0).toUpperCase()|| "U"}`}
            alt="Foto de perfil"
          />
          <h3 className="nombre-usuario">{usuario?.nombre} {usuario?.familyName}</h3>
          <p className="correo">{usuario?.email}</p>
          </>
           ) }
          {vistaActiva === "pedidos" && (
              <HistorialUser
              pedidos={PEDIDOS_FAKE}
              onVolver={() => setVistaActiva("perfil")}
              onVerDetalle={(id) =>{
                setPedidoSeleccionadoId(id);
                setVistaActiva("detalle");
              }} />
            )}
            {vistaActiva === "detalle" && (
              <DetallePedidoData
              idPedido={pedidoSeleccionadoId}
              pedido={DETALLE_FAKE}
              onVolver={() => setVistaActiva("pedidos")}
              onContactarSoporte={() => {}}
              onMensajearRepartidor={() => {}}
              onLlamarRepartidor={() => {}}
              />
            )}  
        </section>
      </div>
      {/* MODAL LOGOUT */}
        {showLogoutModal && (
          <div className="logout-overlay">
            <div className="logout-box">
              <div className="logout-icon">✓</div>
              <h3>Sesión cerrada</h3>
              <p>Has salido correctamente</p>
              <span>Redirigiendo...</span>
              <button className="logout-btn" onClick={() => navigate("/users/login")}>Ir al login</button>
            </div>
          </div>
        )}
    </div>
  )
}

export default UserPerfil
