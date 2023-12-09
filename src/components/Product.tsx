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

    // Other logic you want to perform when adding to the cart
  };

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <button onClick={addItemsToCart}>Add to cart</button>
      <hr />
    </div>
  );
}

export default Product;
