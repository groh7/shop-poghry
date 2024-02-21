import { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiShoppingCart } from "react-icons/fi";
import { UserButton } from "@clerk/nextjs";
import { ShopContext } from "@/providers/ShopContext";
import { SignedIn } from "@clerk/nextjs";
import { SignedOut } from "@clerk/nextjs";
import TotalPrice from "./TotalPrice";

const Navbar = () => {
  const { user, cart } = useContext(ShopContext);
  const router = useRouter();

  const handleGoToProductsList = () => {
    localStorage.setItem("products", JSON.stringify(cart));
    router.push("/cart");
  };

  return (
    <div className="navbar flex justify-between items-center p-4">
      <div className="flex items-center">
        <Link href="/" className="relative link font-bold text-xl">
          <div className="w-80 ">SKLEP</div>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <SignedIn>
          <>
            <Link href="/add-product" className="relative link">
              Add Product
            </Link>
            <Link href="/update-products" className="relative link">
              Edit products
            </Link>
          </>
        </SignedIn>
        <SignedOut>
          <>
            <Link href="/sign-in" className="relative link">
              Sign In
            </Link>
            <Link href="/sign-up" className="relative link">
              Sign Up
            </Link>
          </>
        </SignedOut>
        <div className="ml-auto">
          <UserButton afterSignOutUrl="/" />
        </div>
        <div onClick={handleGoToProductsList}>
          <span className="cartIcon text-right text-white flex items-center justify-center">
            (
            <i>
              <FiShoppingCart size={24} />
            </i>
            {typeof cart === "string" ? JSON.parse(cart).length : cart.length})
            <TotalPrice />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
