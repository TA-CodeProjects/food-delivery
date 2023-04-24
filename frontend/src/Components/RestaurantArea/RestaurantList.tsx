import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getRestaurants, reset } from "../../features/restaurants/restaurantSlice";
import Spinner from "../../Services/Spinner";
import RestaurantItem from "./RestaurantItem";

function RestaurantList() {
    const dispatch = useAppDispatch();

    
    const { restaurants, isLoading, isError, message } = useAppSelector(
        (state) => state.restaurants
        );

  


    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        dispatch(getRestaurants());

        return () => {
            dispatch(reset())
        }
    }, [isError, message, dispatch])

    if (isLoading) {
        return <Spinner />
    }

    return (
      <>
        <p>Restaurant List</p>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((restaurant) => (
              <RestaurantItem key={restaurant.id} restaurant={restaurant} />
            ))}
          </tbody>
        </table>
      </>
    );
}

export default RestaurantList;