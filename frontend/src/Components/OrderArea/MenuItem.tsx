import { MenuModel } from "../../Models/RestaurantModel";
import { useAppDispatch } from "../../app/hooks";
import { addToCart } from "../../features/cart/cartSlice";

interface MenuItemProps {
    menu: MenuModel;
}

function MenuItem(props: MenuItemProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="item-box" onClick={() => dispatch(addToCart(props.menu))}>
      <div className="details">
        <h3>{props.menu.item}</h3>
        <p>{props.menu.description}</p>
        <p>₪ {props.menu.price}</p>
      </div>
      <img src={props.menu.image} alt={props.menu.item} />
    </div>
  );
}

export default MenuItem;