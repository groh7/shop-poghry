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
    <div className=" cart flex flex-col items-center">
      {products.map((product: any, index: number) => (
        <div key={index} className=" cartElement flex items-center justify-between w-full">
          <div>
            {index + 1}. {product.name}
          </div>
          <button className="ml-2">Remove</button>
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
