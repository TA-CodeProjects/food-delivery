import { MenuModel } from "../../Models/RestaurantModel";

interface MenuItemProps {
    menu: MenuModel;
}

function MenuItem(props: MenuItemProps) {
  return (
    <div className="item-box">
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