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
        };
      }
      return {
        ...prev,
        items: [...prev.items, { ...item, quantity: 1 }],
      };
    });
  };

  const removeItem = (item) => {
    setCart((prev) => ({
      ...prev,
      items: prev.items
        .map((i) => (i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0),
    }));
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