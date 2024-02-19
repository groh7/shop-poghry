"use client";

//import styles from './page.module.css'
import Navbar from "@/components/Navbar";
import Product from "@/components/Product";
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

  // if (user === null)
  //   return (
  //     <div
  //       style={{
  //         display: "flex",
  //         flexDirection: "column",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         textAlign: "center",
  //         height: "100vh",
  //         width: "100vw",
  //       }}
  //     >
  //       <p className="p-4">You have to log in</p>
  //       <button
  //         onClick={() => {
  //           setUser(true);
  //         }}
  //       >
  //         Log in
  //       </button>
  //     </div>
  //   );

  return (
    // <ShopProvider>
    <div>
      <Navbar />
      <div className=" main flex flex-wrap">
        {products.map((product, index) => (
          <Product product={product} key={index} />
        ))}
      </div>
    </div>
    // </ShopProvider>
  );
}
