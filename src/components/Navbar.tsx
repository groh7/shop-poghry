import { useShopContext } from "@/providers/ShopContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiShoppingCart } from "react-icons/fi";

const Navbar = () => {
  const { cart, products, setUser } = useShopContext();

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
        <Link href="/add-product" className="relative">
          Add Product
        </Link>
        <button
          onClick={() => {
            setUser(null);
          }}
        >
          Log out
        </button>

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
