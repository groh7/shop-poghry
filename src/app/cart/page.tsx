"use client";
import React, { useEffect, useState } from "react";
import { useShopContext } from "@/providers/ShopContext";
import { ProductType } from "@/models/product";

const ProductsList: React.FC<JSX.Element> = () => {
  const [products, setProducts] = useState([]);
  const { cart, setCart } = useShopContext();

  useEffect(() => {
    const storedData = localStorage.getItem("products");
    if (storedData) {
      setCart(storedData);
      setProducts(JSON.parse(storedData));
    }
  }, []);

  const removeItemsFromCart = (productId:String, product:ProductType) => {
    console.log(cart);
    //const cartItems = Object.values(cart);
    //const  = cartItems.findIndex((item: any) => item.id === product.id && item.quantity === product.quantity);
    const productIndex:number = Number.parseInt(productId.toString());
    
    // if (productIndex === -1) {
    //   console.log("nie znaleziono");
    //   return;
    // }
  
    if (cart[productIndex].quantity > 1) {
      setCart((prevCart: any) =>
        prevCart.map((item: any) =>
          item.id === product.id && item.quantity === product.quantity
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    } else {
      setCart((prevCart: any) =>
        prevCart.filter((item: any) => item.id !== product.id || item.quantity !== product.quantity)
      );
    }
  };

  if (products === undefined || (Array.isArray(products) && products.length === 0))
    return <div>No products available</div>;

  return (
    //otypowac
    <div className=" cart flex flex-col items-center">
      {products.map((product: ProductType, index: number) => (
        <div key={index} className=" cartElement flex items-center justify-between w-full">
          <div>
            {index + 1}. {product.name}
          </div>
          <button className="ml-2" onClick={() => removeItemsFromCart(product.id, product)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default ProductsList;


//try


// "use client";
// import React, { useEffect, useState } from "react";
// import { useShopContext } from "@/providers/ShopContext";
// import { ProductType } from "@/models/product";

// const ProductsList: React.FC<JSX.Element> = () => {
//   const { cart, setCart } = useShopContext();
//   const [products, setProducts] = useState<any[]>([]);

//   useEffect(() => {
//     const storedData = localStorage.getItem("products");
//     if (storedData) {
//       setProducts(JSON.parse(storedData));
//     }
//   }, []);

//   if (products === undefined || (Array.isArray(products) && products.length === 0))
//     return <div>No products available</div>;

//   const removeItemsFromCart = (product: ProductType) => {
//     const productIndex = cart.findIndex(
//       (item: any) => item.id === product.id && item.quantity === product.quantity
//     );

//     if (productIndex === -1) {
//       return;
//     }

//     if (cart[productIndex].quantity > 1) {
//       setCart((prevCart: any) =>
//         prevCart.map((item: any) =>
//           item.id === product.id && item.quantity === product.quantity
//             ? { ...item, quantity: item.quantity - 1 }
//             : item
//         )
//       );
//     } else {
//       setCart((prevCart: any) =>
//         prevCart.filter(
//           (item: any) => item.id !== product.id || item.quantity !== product.quantity
//         )
//       );
//     }
//   };

//   return (
//     <div className=" cart flex flex-col items-center">
//       {products.map((product: any, index: number) => (
//         <div key={index} className=" cartElement flex items-center justify-between w-full">
//           <div>
//             {index + 1}. {product.name}
//           </div>
//           <button className="ml-2" onClick={() => removeItemsFromCart(product)}>
//             Remove
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProductsList;
