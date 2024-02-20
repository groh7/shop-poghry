import { useContext } from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiShoppingCart } from "react-icons/fi";
import { UserButton } from "@clerk/nextjs";
import { ShopContext } from "@/providers/ShopContext";
//import { auth } from '@clerk/nextjs';

const Navbar = () => {
 // const { user } = auth();
  const { user, cart } = useContext(ShopContext); 
  const router = useRouter();

  const handleGoToProductsList = () => {
    localStorage.setItem("products", JSON.stringify(cart));
    router.push("/cart");
  };

  return (
    <div className="flex justify-between items-center p-4">
      <div className="flex items-center">
        <Link href="/" className="relative">
          <div className="w-80 ">SKLEP</div>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
      {user && (
        <>
          <Link href="/update-products" className="relative">
            Edit products
          </Link>
          <Link href="/add-product" className="relative">
            Add Product
          </Link>
        </>
      )}
        {!user && (
          <>
            <Link href='/sign-in' className="relative">
              Sign In
            </Link>
            <Link href='/sign-up' className="relative">
              Sign Up
            </Link>
          </>
        )}
        <div className="ml-auto">
          <UserButton afterSignOutUrl='/' />
        </div>
        <div onClick={handleGoToProductsList}>
          <span className="cartIcon text-right text-white flex items-center justify-center">
            (
            <i>
              <FiShoppingCart size={24} />
            </i>
            {cart.length})
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
