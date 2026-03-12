import { createContext, useContext } from 'react';
import type { CartContextType } from './cartTypes';

export const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart debe usarse dentro de CartProvider');
  }

  return ctx;
};
