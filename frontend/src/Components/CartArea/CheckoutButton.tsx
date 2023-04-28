import { useAppSelector } from "../../app/hooks";
import { getTotal } from "../../Services/Utils";

function CheckoutButton() {
  const { cart } = useAppSelector((state) => state.cart);

  
  return (
    <>
      <button className="btn-cart">
        <p className="quantity-circle">{getTotal(cart).totalQuantity}</p>
        <p>Go to checkout</p>
        <p> ₪{getTotal(cart).totalPrice}</p>
      </button>
    </>
  );
}

export default CheckoutButton;
