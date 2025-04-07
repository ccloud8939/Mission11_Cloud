import { createContext, ReactNode, useContext, useState } from "react";
import { CartItem } from "../types/CartItem";

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (bookID: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      // Check if item already exists in cart
      const existingItem = prevCart.find((c) => c.bookID === item.bookID);

      if (existingItem) {
        // If it exists, increment the quantity 
        return prevCart.map((c) =>
          c.bookID === item.bookID
            ? {
                ...c,
                // keep price the same,
                // increase quantity by the item's quantity (or 1 if that's what you prefer)
                quantity: c.quantity + (item.quantity || 1),
              }
            : c
        );
      } else {
        // If it's a brand-new item, ensure we have a valid quantity (default to 1 if missing)
        const initialQuantity = item.quantity && item.quantity > 0 ? item.quantity : 1;
        return [...prevCart, { ...item, quantity: initialQuantity }];
      }
    });
  };

  const removeFromCart = (bookID: number) => {
    setCart((prevCart) => prevCart.filter((c) => c.bookID !== bookID));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};