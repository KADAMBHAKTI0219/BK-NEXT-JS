'use client';

import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [cart, setCart] = useState({ items: [], total: 0 });

  const addItem = (item) => {
    setCart((prev) => {
      const existingItem = prev.items.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          ...prev,
          items: prev.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
          total: prev.total + item.price,
        };
      }
      return {
        ...prev,
        items: [...prev.items, { ...item, quantity: 1 }],
        total: prev.total + item.price,
      };
    });
  };

  const removeItem = (item) => {
    setCart((prev) => {
      const existingItem = prev.items.find((i) => i.id === item.id);
      if (!existingItem) return prev;
      const newItems = prev.items
        .map((i) => (i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0);
      return {
        ...prev,
        items: newItems,
        total: prev.total - item.price,
      };
    });
  };

  const resetCart = () => {
    setCart({ items: [], total: 0 });
  };

  return (
    <AppContext.Provider value={{ cart, addItem, removeItem, resetCart }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}