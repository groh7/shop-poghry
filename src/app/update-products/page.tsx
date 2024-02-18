"use client";

//import styles from './page.module.css'
import Navbar from "@/components/Navbar";
import ProductEdit from "@/components/Product-edit";
import { useShopContext } from "@/providers/ShopContext";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const { user, setUser } = useShopContext();

  async function getData() {
    const response = await fetch("http://localhost:3000/api/products", {
      method: "GET",
    });

    const data = await response.json();
    setProducts(data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    // <ShopProvider>
    <div>
      <Navbar />
      <div className=" main flex flex-wrap">
        {products.map((product, index) => (
          <ProductEdit product={product} key={index} />
        ))}
      </div>
    </div>
    // </ShopProvider>
  );
}
