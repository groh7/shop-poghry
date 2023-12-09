import React from 'react';
import { useRecoilState } from 'recoil';
import { cartState } from "../atoms/cartState";

type ProductPropsType = {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    photo: string;
    availability: number;
  };
};

function Product({ product }: ProductPropsType) {
  const [cart, setCart] = useRecoilState(cartState);

  const addItemsToCart = () => {
    const productIndex = cart.findIndex(item => item.id === product.id);

    if (productIndex === -1) {
      setCart([...cart, product]);
    } else {
      setCart(prevCart => prevCart.map(item =>
        item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      ));
    }


  };

  return (
      <div className="flex flex-col border p-4 mb-4">
        <h2 className="text-xl font-bold mb-2">{product.name}</h2>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <button
          onClick={addItemsToCart}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
        >
          Add to Cart
        </button>
        <hr className="my-4 border-t" />
      </div>
    );
  };


export default Product;
