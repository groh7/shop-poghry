"use client";
import { ProductType } from "@/models/product";
import { useShopContext } from "@/providers/ShopContext";
import React, { useEffect, useState } from "react";

const ProductsList: React.FC<JSX.Element> = () => {
  const [products, setProducts] = useState([]);
  const { cart, setCart } = useShopContext();

  useEffect(() => {
    const storedData = localStorage.getItem("products");

    if (storedData) {
      setCart(storedData);
      setProducts(JSON.parse(storedData));
    }
  }, [cart]);

  const removeItemsFromCart = (productId: String, product: ProductType) => {
    const duplicatedStorageData = localStorage.getItem("products");

    if (duplicatedStorageData) {
    }

    setCart((prev: any) => (Array.isArray(prev) ? prev?.filter(({ id }: { id: string }) => id !== productId) : prev));

    setProducts((prev) => {
      const newProducts: any = prev.filter(({ id }) => id !== productId);
      localStorage.setItem("products", JSON.stringify(newProducts));
      return newProducts;
    });
  };

  if (products === undefined || (Array.isArray(products) && products.length === 0)) return <div>No products available</div>;

  return (
    <div className=" cart flex flex-col items-center">
      {products.map((product: ProductType, index: number) => (
        <div key={index} className=" cartElement flex items-center justify-between w-full">
          <div>
            {index + 1}. {product.name}
          </div>
          <button className="ml-2" onClick={() => removeItemsFromCart(product.id, product)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
