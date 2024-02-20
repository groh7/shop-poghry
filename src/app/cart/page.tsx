"use client";
import { ProductType } from "@/models/product";
import { useShopContext } from "@/providers/ShopContext";
import React, { useEffect, useState } from "react";
import {loadStripe} from '@stripe/stripe-js';

const ProductsList: React.FC<JSX.Element> = () => {
  const [products, setProducts] = useState([]);
  const { cart, setCart } = useShopContext();

  useEffect(() => {
    const storedData = localStorage.getItem("products");

    if (storedData) {
      setCart(typeof storedData === "string" ? JSON.parse(storedData) : storedData);
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

  // stripe
  const createCheckoutSession = async () => {
    const stripe = await loadStripe("pk_test_51OJu53BirogTRX6tgj8m5CDkhsMWIAKpGoda1AJfWxjnZV86IbTatK8Qq89fQe05pVDVB4n3UAZrqynFfmEoBBIb00RlmH5aSL");
    
    const productsArrayOfArrays = products.map((product:ProductType) => [product.name, product.price]);

    const body = {
      products: productsArrayOfArrays
    };

    const headers = {
      "Content-Type":"application/json"
    }

    console.log('Trying to connect to checkout');
  

    // {"products":[["iPhone 15",7700]]}
    console.log(JSON.stringify(body));
    const strigifiedBody = JSON.stringify(body);
    
    // try{
      const response = await fetch('http://localhost:3000/api/products',{
        method:"POST",
        headers:headers,
        body:strigifiedBody
      })

      const session = await response.json();

      const result = stripe?.redirectToCheckout({
        sessionId:session.id
      });
    // } catch(error) {
    //   console.log("Connection error");
    //   console.log(error);
    // }
  }

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
      <div>
        <button onClick={createCheckoutSession}>Checkout</button>
      </div>
    </div>
  );
};

export default ProductsList;
