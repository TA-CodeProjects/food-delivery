import { Link } from "react-router-dom";
import { RestaurantModel } from "../../Models/RestaurantModel";
import { MdOutlineDeliveryDining } from "react-icons/md";

interface RestaurantCardProps {
    restaurant: RestaurantModel;
}

function RestaurantCard(props: RestaurantCardProps) {
    return (
      <Link to={`/order/${props.restaurant.id}`}>
        <div className="item-card">
          <div className="card-image">
            <img src={props.restaurant.image} alt={props.restaurant.name} className="image" />
          </div>
          <div className="card-body">
            <div className="details">
              <h2>{props.restaurant.name}</h2>
              <p>{props.restaurant.description}</p>
            </div>
            <div className="delivery-time">
              <p>{props.restaurant.deliveryTime}</p>
              <p>min</p>
            </div>
          </div>
          <div className="card-footer">
            <MdOutlineDeliveryDining />
            <p> ₪ {props.restaurant.deliveryCost} </p>
          </div>
        </div>
      </Link>
    );
}

export default RestaurantCard;