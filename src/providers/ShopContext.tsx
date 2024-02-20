"use client";

import React, { createContext, useState, useContext } from "react";

export type ProductType = {
  id: string;
  name: string;
  description: string;
  price: number;
  photo: string;
  availability: number;
  quantity?: number;
};

// change any to cartProps etc.
export const ShopContext = createContext<any>([]);

export const ShopProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [user, setUser] = useState<null | true>(null);

  return (
    <ShopContext.Provider value={{ products, setProducts, cart, setCart, user, setUser }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShopContext = (): any => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
