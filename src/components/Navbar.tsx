import Link from 'next/link';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { cartState } from '../atoms/cartState';
import { FiShoppingCart } from 'react-icons/fi';


const Navbar = () => {
  const cart = useRecoilValue(cartState);

  return (
    <div className="flex justify-between items-center p-4">
      <div className="flex items-center">
        <div className="w-80 ">
          <Link className="text-white" href="/">SKLEP</Link>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        
        <Link href="/add-product" className="relative">
          Add Product
        </Link>
        
        <Link href="/cart" className="relative">
          <div>
          <span className="cart text-right text-white flex items-center justify-center">
            (<i><FiShoppingCart size={24} /></i>
            {cart.length})
          </span>
          </div>

        </Link>
      </div>
    </div>
  );
};

export default Navbar;
