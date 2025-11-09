"use client";

import { useState, createContext, useContext } from "react";
import Cart from "./index";

interface CartContextType {
  openCart: () => void;
  closeCart: () => void;
  isOpen: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  return (
    <CartContext.Provider value={{ openCart, closeCart, isOpen }}>
      <div className={isOpen ? "backdrop-blur-[2px] transition-all" : ""}>
        {children}
      </div>
      <Cart isOpen={isOpen} onClose={closeCart} />
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
