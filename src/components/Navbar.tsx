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
        <div className="w-80">
          <Link href="/">Logo</Link>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Link href="/cart" className="relative">
          <div>
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">(
            <i><FiShoppingCart size={24} /></i>
            {cart.length})
          </span>
          </div>

        </Link>
      </div>
    </div>
  );
};

export default Navbar;
