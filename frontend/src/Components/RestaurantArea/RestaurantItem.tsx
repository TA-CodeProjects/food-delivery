import { Link } from "react-router-dom";
import { RestaurantModel } from "../../Models/RestaurantModel";
import { useAppDispatch } from "../../app/hooks";
import { deleteRestaurant } from "../../features/restaurants/restaurantSlice";


interface RestaurantItemProps {
  restaurant: RestaurantModel;
}

function RestaurantItem(props: RestaurantItemProps) {
  const dispatch = useAppDispatch();
 
  return (
    <tr>
      <td>{props.restaurant.name}</td>
      <td>
        <img src={props.restaurant.image} alt={props.restaurant.name} className="image-table" />
      </td>
      <td>
        <button className="btn" onClick={() => dispatch(deleteRestaurant(props.restaurant.id))}>
          Delete
        </button>
      </td>
      <td>
        <button className="btn btn-reverse">
          <Link to={`/restaurant/${props.restaurant.id}`}>Menu</Link>
        </button>
      </td>
    </tr>
  );
}

export default RestaurantItem;
