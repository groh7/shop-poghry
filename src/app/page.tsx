"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Product from "@/components/Product";
import { useShopContext } from "@/providers/ShopContext";

export default function Home() {
  const { user } = useShopContext();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="main flex flex-wrap">
        {products.map((product, index) => (
          <Product product={product} key={index} />
        ))}
      </div>
    </div>
  );
}