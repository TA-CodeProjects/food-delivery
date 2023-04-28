import { FaTrashAlt } from "react-icons/fa";
import { MenuCartModel } from "../../Models/RestaurantModel";
import { useAppDispatch } from "../../app/hooks";
import { decrementQuantity } from "../../features/cart/cartSlice";
import { incrementQuantity } from "../../features/cart/cartSlice";
import { removeItem } from "../../features/cart/cartSlice";

interface CartModalQuantityProps {
  item: MenuCartModel;
  isShow: boolean;
}
function CartModalQuantity(props: CartModalQuantityProps) {
    const dispatch = useAppDispatch();

    return (
      <>
        {props.isShow ? (
          <div className="change-quantity">
            <p className="circle" onClick={() => dispatch(decrementQuantity(props.item.id))}>
              -
            </p>
            <p>{props.item.quantity}</p>
            <p className="circle" onClick={() => dispatch(incrementQuantity(props.item.id))}>
              +
            </p>
            <p onClick={() => dispatch(removeItem(props.item.id))}>
              <FaTrashAlt />
            </p>
          </div>
        ) : (
          <div className="quantity">{props.item.quantity}</div>
        )}
      </>
    );
}

export default CartModalQuantity;