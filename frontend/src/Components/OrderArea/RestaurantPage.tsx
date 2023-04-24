import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import { getRestaurant } from "../../features/orderRestaurant/orderRestaurantSlice";
import { reset } from "../../features/orderRestaurant/orderRestaurantSlice";
import Spinner from "../../Services/Spinner";
import { MdOutlineDeliveryDining } from "react-icons/md";
import MenuItem from "./MenuItem";

function RestaurantPage() {
  const dispatch = useAppDispatch();
  const params = useParams();
  const id = params.id || "";

  const { restaurant, isLoading, isError, message } = useAppSelector(
    (state) => state.orderRestaurant
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getRestaurant(id));

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch, id]);

  if (isLoading) {
    return <Spinner />;
  }

  console.log(restaurant);

  return (
    <>
      <div className="image-header">
        <div className="details">
          <h1>{restaurant.name}</h1>
          <p>{restaurant.description}</p>
          <p className="delivery">Delivery: ₪ {restaurant.deliveryCost} </p>
          <div className="delivery-time">
            <MdOutlineDeliveryDining />{" "}
            <p>The average delivery time is {restaurant.deliveryTime} min</p>
          </div>
        </div>
        <img src={restaurant.image} alt={restaurant.name} />
      </div>
      <div className="menu">
        <h2>Menu</h2>
        {restaurant.menus.map((menu) => (
            <MenuItem menu={menu} />
        ))}
      </div>
    </>
  );
}

export default RestaurantPage;
