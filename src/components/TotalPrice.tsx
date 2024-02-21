import { useContext } from "react";
import { ShopContext } from "@/providers/ShopContext";
import { ProductType } from "@/models/product";


const TotalPrice = () => {
  
    const { cart } = useContext(ShopContext);
    const cartType:ProductType[] = cart;


    let total = cartType.reduce((acc, product) => acc + product.price, 0)

    console.log("caty type:",cartType);

    return (
        <span className="navPrice p-2">
            {total.toFixed(2)} PLN
        </span>
    );
};

export default TotalPrice;
