import { Link } from "react-router-dom";
import { MenuModel } from "../../Models/RestaurantModel";
import { useAppDispatch } from "../../app/hooks";
import { deleteMenuItem } from "../../features/menus/menuSlice";

interface MenuItemProps {
    menu: MenuModel
}

function MenuItem(props: MenuItemProps) {
    const dispatch = useAppDispatch();
    return (
      <tr>
        <td>{props.menu.item}</td>
        <td>{props.menu.description}</td>
        <td>{props.menu.price}</td>
        <td>{props.menu.image}</td>
        <td>
          <button className="btn btn-reverse">
            <Link to={`/restaurant/${props.menu.restaurant}/updateMenu/${props.menu.id}`}>
              Update
            </Link>
          </button>
        </td>
        <td>
          <button
            className="btn"
            onClick={() => dispatch(deleteMenuItem(props.menu.id))}
          >
            Delete
          </button>
        </td>
      </tr>
    );
}

export default MenuItem;