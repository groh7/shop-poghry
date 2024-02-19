import { useShopContext } from "@/providers/ShopContext";

function Product({ product }: any) {
  const { cart, setCart } = useShopContext();

  const addItemsToCart = () => {
    const productIndex = cart.findIndex((item: any) => item.id === product.id);

    if (productIndex === -1) {
      setCart([...cart, product]);
    } else {
      setCart((prevCart: any) =>
        prevCart.map((item: any) => (item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item))
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
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Product;
