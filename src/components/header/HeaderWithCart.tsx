"use client";

import Header from "./index";
import { useCart } from "../cart/CartProvider";

export default function HeaderWithCart() {
  const { openCart } = useCart();
  return <Header onCartClick={openCart} />;
}

