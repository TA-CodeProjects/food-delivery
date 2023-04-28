import { useAppDispatch, useAppSelector } from "../../app/hooks";

function Cart() {
  const dispatch = useAppDispatch();

  const { cart } = useAppSelector((state) => state.cart);

  return (
    <div>
      <h3>Shopping List</h3>
      {cart.map((item) => (
        <>
          <p>{item.item}</p>
          <p>{item.quantity}</p>
        </>
      ))}
    </div>
  );
}

export default Cart;
