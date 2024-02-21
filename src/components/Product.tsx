import { useShopContext } from "@/providers/ShopContext";

function Product({ product }: any) {
  const { cart, setCart } = useShopContext();

  let buttonStyle = "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none";
  let buttonText = "Add to cart";

  const addItemsToCart = () => {
    try {
      const productIndex = cart.findIndex((item: any) => item.id === product.id);

      if (productIndex === -1) {
        setCart([...cart, product]);
      } else {
        // If the product is already in the cart, remove it
        setCart((prevCart: any) => prevCart.filter((item: any) => item.id !== product.id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  if(cart.findIndex((item: any) => item._id === product._id) !== -1) {
    buttonStyle = "bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none";
    buttonText = "In cart";
  }

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
      <div className="product flex flex-col border p-4 mb-4">
        <img src={product.photo} alt={product.name} className="mx-auto mb-2" style={{ maxWidth: "200px", maxHeight: "200px", minHeight: "200px" }} />
        <h2 className="text-xl font-bold mb-2 text-center">{product.name}</h2>
        <p className="text-gray-600 mb-2 text-center">{product.description}</p>
        <p className="text-blue-700 font-bold mb-3 text-center">{product.price.toFixed(2)} pln</p>
        <button onClick={addItemsToCart} className={buttonStyle}>
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default Product;