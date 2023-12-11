"use client";
import React, { useEffect, useState } from "react";

const ProductsList: React.FC<JSX.Element> = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("products");
    if (storedData) {
      setProducts(JSON.parse(storedData));
    }
  }, []);

  if (products === undefined || (Array.isArray(products) && products.length === 0))
    return <div>No products available</div>;

  return (
    //otypowac
    <div>
      {products.map((product: any, index: number) => (
        <div style={{ display: "flex" }}>
          <div>
            {index}.{product.name}
          </div>
          <button>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
