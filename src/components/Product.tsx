import React from 'react';
import { useRecoilState } from 'recoil';
import { cartState } from '../atoms/cartState';
import { useState } from 'react';
import ReactDOM from "react-dom/client";
import { ProductType } from '../atoms/cartState';

type ProductPropsType = {
  product: ProductType
};

function Product({ product }: ProductPropsType) {
  const [cart, setCart] = useRecoilState(cartState);
  

  const addItemsToCart = () => {
    const productIndex = cart.findIndex(item => item.id === product.id);

    if (productIndex === -1) {
      setCart([...cart, product]);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        )
      );
    }
  };
  

  return (
    <div className="w-1/4 p-4">
      <div className="product flex flex-col border p-4 mb-4">
        <h2 className="text-xl font-bold mb-2 text-center">{product.name}</h2>
        <p className="text-gray-600 mb-4 text-center">{product.description}</p>
        <button
          onClick={addItemsToCart}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Product;
