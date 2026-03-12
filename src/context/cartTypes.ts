export type ProductoCarrito = {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  cantidad: number;
  storeId: string;
  storeName: string;
};

export type PedidoItemRequest = {
  id: number;
  cantidad: number;
  nombre: string;
};

export type CrearPedidoRequest = {
  comercioId: string;
  usuarioId: number;
  direccion: string;
  tel: string;
  notaDirecion: string;
  cliente: string;
  monto: number;
  metodoPago: string;
  items: PedidoItemRequest[];
};

export type CrearPedidoOpciones = {
  comercioId?: string;
  usuarioId?: number;
  cliente?: string;
  direccion?: string;
  tel?: string;
  notaDirecion?: string;
  metodoPago?: string;
};

export type CartContextType = {
  carrito: ProductoCarrito[];
  montoCarrito: number;
  agregarProducto: (producto: Omit<ProductoCarrito, 'cantidad'>) => void;
  restarProducto: (id: number, storeId: string) => void;
  vaciarCarrito: () => void;
  construirPedidoPayload: (
    opciones?: CrearPedidoOpciones
  ) => CrearPedidoRequest;
};
