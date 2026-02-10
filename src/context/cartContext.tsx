import { createContext, useContext, useState } from "react";

export type ProductoCarrito = {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  cantidad: number;
};

type CartContextType = {
  carrito: ProductoCarrito[];
  agregarProducto: (producto: Omit<ProductoCarrito, "cantidad">) => void;
  restarProducto: (id: number) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [carrito, setCarrito] = useState<ProductoCarrito[]>([]);

  const agregarProducto = (producto: Omit<ProductoCarrito, "cantidad">) => {
    setCarrito((prev) => {
      const existe = prev.find(p => p.id === producto.id);

      if (existe) {
        return prev.map(p =>
          p.id === producto.id
            ? { ...p, cantidad: p.cantidad + 1 }
            : p
        );
      }

      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const restarProducto = (id: number) => {
    setCarrito(prev =>
      prev
        .map(p =>
          p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p
        )
        .filter(p => p.cantidad > 0)
    );
  };

  return (
    <CartContext.Provider value={{ carrito, agregarProducto, restarProducto }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
};