import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getRestaurants, reset } from "../../features/orders/orderSlice";
import Spinner from "../../Services/Spinner";
import RestaurantCard from "./RestaurantCard";

function RestaurantList() {
  const dispatch = useAppDispatch();

  const { restaurants, isLoading, isError, message } = useAppSelector((state) => state.orders);

  useEffect(() => {
    if (restaurants.length === 0) {
      if (isError) {
        console.log(message);
      }

      dispatch(getRestaurants());

      // return () => {
      //   dispatch(reset());
      // };
    }
  }, [isError, message, dispatch, restaurants.length]);

  if (isLoading) {
    return <Spinner />;
  }

  console.log(restaurants.length);

  return (
    <>
      <section className="heading">
        <h1>Restaurant List</h1>
      </section>
      <section className="grid-container">
        {restaurants.map((restaurant) => (
          <RestaurantCard restaurant={restaurant} />
        ))}
      </section>
    </>
  );
}

export default RestaurantList;
