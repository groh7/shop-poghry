"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { loadStripe } from '@stripe/stripe-js';
import { ProductType } from "@/models/product";
import { useShopContext } from "@/providers/ShopContext";

const ProductsList: React.FC<JSX.Element> = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [totalPrice, setTotalPrice] = useState(0); // State for total price
  const { cart, setCart } = useShopContext();

  useEffect(() => {
    const storedData = localStorage.getItem("products");

    if (storedData) {
      setCart(typeof storedData === "string" ? JSON.parse(storedData) : storedData);
      setProducts(JSON.parse(storedData));
    }
  }, [cart]);

  useEffect(() => {
    // Calculate total price when products change
    const totalPrice = products.reduce((acc, curr) => acc + curr.price, 0);
    setTotalPrice(totalPrice);
  }, [products]);

  const removeItemsFromCart = (productId: string, product: ProductType) => {
    setCart((prev: any) => (Array.isArray(prev) ? prev?.filter(({ id }: { id: string }) => id !== productId) : prev));

    setProducts((prev) => {
      const newProducts: any = prev.filter(({ id }) => id !== productId);
      localStorage.setItem("products", JSON.stringify(newProducts));
      return newProducts;
    });
  };

  // stripe
  const createCheckoutSession = async () => {
    const stripe = await loadStripe("your_stripe_public_key");
    
    const body = {
      products: products
    };

    const headers = {
      'Content-Type': 'application/json'
    }

    try {
      const response = await fetch("http://localhost:3000/api/checkout", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
      });

      const session = await response.json();

      const result = stripe?.redirectToCheckout({
        sessionId: session.id
      });
    } catch(error) {
      console.log("Connection error");
      console.log(error);
    }
  }

  if (!products || products.length === 0) {
    return (
      <div>
        <Navbar/>
        <div className="cart cartEmpty flex flex-col items-center text-black text-bold text-2xl">No products available.</div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="cart-container">
        <div className="cart flex flex-col items-center">
          {products.map((product: ProductType, index: number) => (
            <div key={index} className="cart-item flex items-center justify-between w-full">
              <div>
                {index + 1}. {product.name} - {product.price}PLN
              </div>
              <button className="remove-button" onClick={() => removeItemsFromCart(product.id, product)}>
                Remove
              </button>
            </div>
          ))}
          <div className="line"></div> {}
          <div className="cart-summary">
            <div className="Total font-bold text-xl" style={{ marginLeft: 'auto' }}>Total Price: {totalPrice}PLN</div>
          </div>
          <div>
            <button className="checkout-button" onClick={createCheckoutSession}>Checkout</button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsList;