import { useMemo, useState, type ReactNode } from 'react';
import type {
  ProductoCarrito,
  CrearPedidoRequest,
  CrearPedidoOpciones,
} from './cartTypes';
import { CartContext } from './useCart';

const DEFAULT_COMERCIO_ID = import.meta.env.VITE_COMERCIO_ID?.trim();

const obtenerClientePorDefecto = (): string => {
  const raw = localStorage.getItem('userDatos');
  if (!raw) {
    return 'Cliente';
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') {
      return 'Cliente';
    }

    const user = parsed as Record<string, unknown>;
    const nombre = typeof user.nombre === 'string' ? user.nombre.trim() : '';
    const familyName =
      typeof user.familyName === 'string' ? user.familyName.trim() : '';
    const username =
      typeof user.username === 'string' ? user.username.trim() : '';
    const nombreCompleto = `${nombre} ${familyName}`.trim();

    return nombreCompleto || username || 'Cliente';
  } catch {
    return 'Cliente';
  }
};

const obtenerUsuarioIdPorDefecto = (): number => {
  const raw = localStorage.getItem('userDatos');
  if (!raw) {
    return 0;
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') {
      return 0;
    }

    const user = parsed as Record<string, unknown>;
    const id = user.id;
    const usuarioId = user.usuarioId;
    const valor =
      typeof id === 'number'
        ? id
        : typeof usuarioId === 'number'
          ? usuarioId
          : Number(id ?? usuarioId);

    return Number.isFinite(valor) ? valor : 0;
  } catch {
    return 0;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [carrito, setCarrito] = useState<ProductoCarrito[]>([]);

  const agregarProducto = (producto: Omit<ProductoCarrito, 'cantidad'>) => {
    setCarrito((prev) => {
      const existe = prev.find(
        (item) => item.id === producto.id && item.storeId === producto.storeId
      );
      if (!existe) {
        return [...prev, { ...producto, cantidad: 1 }];
      }

      return prev.map((item) =>
        item.id === producto.id && item.storeId === producto.storeId
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
    });
  };

  const restarProducto = (id: number, storeId: string) => {
    setCarrito((prev) =>
      prev
        .map((item) =>
          item.id === id && item.storeId === storeId
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const montoCarrito = useMemo(
    () =>
      carrito.reduce(
        (acumulado, item) => acumulado + item.precio * item.cantidad,
        0
      ),
    [carrito]
  );

  const construirPedidoPayload = (
    opciones?: CrearPedidoOpciones
  ): CrearPedidoRequest => {
    if (carrito.length === 0) {
      throw new Error('El carrito esta vacio.');
    }

    const tiendasEnCarrito = new Set(carrito.map((item) => item.storeId));
    if (tiendasEnCarrito.size > 1) {
      throw new Error(
        'El carrito tiene productos de varios comercios. Debes comprar por separado.'
      );
    }

    const comercioId =
      opciones?.comercioId?.trim() || DEFAULT_COMERCIO_ID || carrito[0].storeId;
    const usuarioId =
      typeof opciones?.usuarioId === 'number' &&
      Number.isFinite(opciones.usuarioId)
        ? opciones.usuarioId
        : obtenerUsuarioIdPorDefecto();
    const cliente = opciones?.cliente?.trim() || obtenerClientePorDefecto();
    const direccion = opciones?.direccion?.trim() || '';
    const tel = opciones?.tel?.trim() || '';
    const notaDirecion = opciones?.notaDirecion?.trim() || '';
    const metodoPago = opciones?.metodoPago?.trim() || 'efectivo';

    return {
      comercioId,
      usuarioId,
      direccion,
      tel,
      notaDirecion,
      cliente,
      monto: montoCarrito,
      metodoPago,
      items: carrito.map((item) => ({
        id: item.id,
        cantidad: item.cantidad,
        nombre: item.nombre,
      })),
    };
  };

  return (
    <CartContext.Provider
      value={{
        carrito,
        montoCarrito,
        agregarProducto,
        restarProducto,
        vaciarCarrito,
        construirPedidoPayload,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
