//interface CartListPropsType {
type CartListPropsType = {
  id: string;
  name: string;
  price: number;
  photo: string;
  quantity: number;
}

//function CartList(props: CartListPropsType) {
function CartList({id, name, price, photo, quantity}: CartListPropsType) {
  return (
    <div>
        <h2>{name}</h2>
        <p>{price}</p>
        <p>X {quantity}</p>
    </div>
  )
}

export default CartList